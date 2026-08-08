import { NextRequest, NextResponse } from 'next/server'
import webpush from 'web-push'
import { ROOMS, roomPricing } from '@/lib/rooms'
import { createAdminClient } from '@/lib/supabaseAdmin'

if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    'mailto:amerigogranata@gmail.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  )
}

// Rate limit in memoria, per IP. Vive per la durata dell'istanza serverless:
// non è una difesa assoluta, ma ferma i submit a raffica e i bot più rozzi.
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const rateHits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const hits = (rateHits.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS)
  hits.push(now)
  rateHits.set(ip, hits)
  return hits.length > RATE_MAX
}

// "Oggi" nel fuso di casa: coi metodi UTC, tra mezzanotte e le 2 il sito
// rifiuterebbe (o accetterebbe) le date sbagliate.
function todayRome(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' }).format(new Date())
}

function getDatesInRange(checkIn: string, checkOut: string): string[] {
  const dates: string[] = []
  const d = new Date(checkIn)
  const end = new Date(checkOut)
  while (d < end) {
    dates.push(d.toISOString().slice(0, 10))
    d.setDate(d.getDate() + 1)
  }
  return dates
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

function validate(body: Record<string, unknown>): { error: string } | null {
  const { firstName, lastName, phone, numGuests, checkIn, checkOut } = body
  if (typeof firstName !== 'string' || !/\p{L}/u.test(firstName.trim()) || firstName.trim().length > 80) {
    return { error: 'Controlla il nome: sembra incompleto.' }
  }
  if (typeof lastName !== 'string' || !/\p{L}/u.test(lastName.trim()) || lastName.trim().length > 80) {
    return { error: 'Controlla il cognome: sembra incompleto.' }
  }
  const digits = typeof phone === 'string' ? phone.replace(/\D/g, '') : ''
  if (digits.length < 8 || digits.length > 15) {
    return { error: 'Controlla il numero di telefono: servono almeno 8 cifre per poterti richiamare.' }
  }
  const n = Number(numGuests)
  if (!Number.isInteger(n) || n < 1 || n > 4) {
    return { error: 'Numero di persone non valido.' }
  }
  if (typeof checkIn !== 'string' || typeof checkOut !== 'string' || !DATE_RE.test(checkIn) || !DATE_RE.test(checkOut)) {
    return { error: 'Date non valide.' }
  }
  if (checkIn < todayRome()) {
    return { error: 'La data di arrivo è già passata: controlla il check-in.' }
  }
  const nights = getDatesInRange(checkIn, checkOut)
  if (nights.length === 0) {
    return { error: 'Il check-out deve essere dopo il check-in.' }
  }
  if (nights.length > 30) {
    return { error: 'Per soggiorni oltre 30 notti scrivici direttamente su WhatsApp: troviamo la soluzione migliore insieme.' }
  }
  return null
}

type AdminClient = ReturnType<typeof createAdminClient>

// Returns which rooms are free for each date
async function getAvailabilityMap(supabase: AdminClient, checkIn: string, checkOut: string): Promise<Map<string, Set<string>>> {
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('room_id, check_in, check_out')
    .in('status', ['confermata', 'in_attesa'])
    .lt('check_in', checkOut)
    .gt('check_out', checkIn)

  // Se la lettura fallisce non si può proseguire: una lista vuota qui
  // significherebbe "tutte le camere libere" e si accetterebbero
  // prenotazioni su camere già occupate.
  if (error) {
    throw new Error(`lettura disponibilità fallita: ${error.message}`)
  }

  const nights = getDatesInRange(checkIn, checkOut)
  // date -> set of occupied room_ids
  const occupiedByDate = new Map<string, Set<string>>()
  for (const night of nights) {
    occupiedByDate.set(night, new Set())
  }
  for (const b of bookings || []) {
    const bNights = getDatesInRange(b.check_in, b.check_out)
    for (const night of bNights) {
      if (occupiedByDate.has(night)) {
        occupiedByDate.get(night)!.add(b.room_id)
      }
    }
  }
  return occupiedByDate
}

type Segment = { roomId: string; roomName: string; checkIn: string; checkOut: string }

function findSolution(
  nights: string[],
  occupiedByDate: Map<string, Set<string>>,
  numGuests: number,
  preferredRoomId?: string
): Segment[] | null {
  const eligibleRooms = ROOMS.filter(r => r.maxGuests >= numGuests)
  if (eligibleRooms.length === 0) return null

  // Try preferred room first, then all others
  const roomOrder = preferredRoomId
    ? [
        ...eligibleRooms.filter(r => r.id === preferredRoomId),
        ...eligibleRooms.filter(r => r.id !== preferredRoomId),
      ]
    : eligibleRooms

  // Try single room covering all nights
  for (const room of roomOrder) {
    const allFree = nights.every(n => !occupiedByDate.get(n)?.has(room.id))
    if (allFree) {
      return [{ roomId: room.id, roomName: room.name, checkIn: nights[0], checkOut: addDay(nights[nights.length - 1]) }]
    }
  }

  // Try multi-room: greedily assign rooms night by night
  const segments: Segment[] = []
  let i = 0
  while (i < nights.length) {
    // Find the room that covers the most consecutive nights from i
    let bestRoom = null
    let bestEnd = i
    for (const room of roomOrder) {
      let j = i
      while (j < nights.length && !occupiedByDate.get(nights[j])?.has(room.id)) {
        j++
      }
      if (j > bestEnd) {
        bestEnd = j
        bestRoom = room
      }
    }
    if (!bestRoom || bestEnd === i) return null // no solution
    segments.push({
      roomId: bestRoom.id,
      roomName: bestRoom.name,
      checkIn: nights[i],
      checkOut: addDay(nights[bestEnd - 1]),
    })
    i = bestEnd
  }
  return segments
}

function addDay(dateStr: string): string {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}

// Se lo stesso telefono ha già una richiesta attiva che si sovrappone alle
// stesse date, non creare un doppione: il back button + reinvio è il caso
// tipico. Se la query fallisce (es. relazione non disponibile) si prosegue
// senza dedupe: meglio un doppione che una prenotazione persa.
async function findExistingRequest(
  supabase: AdminClient,
  phoneDigits: string,
  checkIn: string,
  checkOut: string
): Promise<Segment[] | null> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('room_id, check_in, check_out, guests!inner(phone)')
      .in('status', ['confermata', 'in_attesa'])
      .lt('check_in', checkOut)
      .gt('check_out', checkIn)
    if (error || !data) return null
    const mine = data.filter(b => {
      const guest = Array.isArray(b.guests) ? b.guests[0] : b.guests
      const p = String((guest as { phone?: string } | null)?.phone || '').replace(/\D/g, '')
      return p.length > 0 && p === phoneDigits
    })
    if (mine.length === 0) return null
    return mine.map(b => ({
      roomId: b.room_id,
      roomName: ROOMS.find(r => r.id === b.room_id)?.name || 'Camera',
      checkIn: b.check_in,
      checkOut: b.check_out,
    }))
  } catch {
    return null
  }
}

async function sendPushNotification(supabase: AdminClient, title: string, body: string) {
  const { data: subs } = await supabase.from('push_subscriptions').select('subscription')
  if (!subs || subs.length === 0) return
  for (const sub of subs) {
    try {
      await webpush.sendNotification(
        JSON.parse(sub.subscription),
        JSON.stringify({ title, body, url: '/prenotazioni' })
      )
    } catch {
      // subscription scaduta
    }
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
  }
  const { firstName, lastName, phone, numGuests, checkIn, checkOut, preferredRoomId, website } = body

  // Honeypot: il campo "website" è invisibile agli umani. Se è pieno è un bot:
  // rispondiamo ok senza salvare nulla.
  if (typeof website === 'string' && website.trim() !== '') {
    return NextResponse.json({
      ok: true,
      solution: [{ roomId: '', roomName: 'Camera', checkIn, checkOut }],
      multiRoom: false,
    })
  }

  const ip = (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim()
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Hai fatto troppi tentativi di seguito. Aspetta qualche minuto o scrivici su WhatsApp.' },
      { status: 429 }
    )
  }

  if (!firstName || !lastName || !phone || !numGuests || !checkIn || !checkOut) {
    return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
  }
  const invalid = validate(body)
  if (invalid) {
    return NextResponse.json(invalid, { status: 400 })
  }

  const guests = Number(numGuests)
  const nights = getDatesInRange(checkIn, checkOut)
  const supabase = createAdminClient()
  const phoneDigits = String(phone).replace(/\D/g, '')

  // Richiesta già ricevuta per queste date? Niente doppioni.
  const existing = await findExistingRequest(supabase, phoneDigits, checkIn, checkOut)
  if (existing) {
    return NextResponse.json({ ok: true, duplicate: true, solution: existing, multiRoom: existing.length > 1 })
  }

  let occupiedByDate: Map<string, Set<string>>
  try {
    occupiedByDate = await getAvailabilityMap(supabase, checkIn, checkOut)
  } catch (e) {
    // I messaggi di errore possono contenere la chiave per intero (è successo:
    // undici la stampa dentro "invalid header value"). Va oscurata prima di
    // finire nei log, che restano archiviati.
    console.error('prenota:', String(e).replace(/sb_(secret|publishable)_[A-Za-z0-9_-]+/g, 'sb_$1_***'))
    return NextResponse.json(
      { error: 'Non riesco a verificare le disponibilità. Riprova tra poco o scrivici su WhatsApp.' },
      { status: 503 }
    )
  }

  const solution = findSolution(nights, occupiedByDate, guests, preferredRoomId)

  if (!solution) {
    return NextResponse.json({ error: 'Nessuna disponibilità per queste date' }, { status: 409 })
  }

  // Create guest
  const { data: guest, error: guestErr } = await supabase
    .from('guests')
    .insert({ full_name: `${String(firstName).trim()} ${String(lastName).trim()}`, phone: String(phone).trim() })
    .select('id')
    .single()

  if (guestErr || !guest) {
    return NextResponse.json({ error: 'Errore creazione ospite' }, { status: 500 })
  }

  // Create booking(s) — prezzi calcolati dal server (lib/rooms.ts), letto
  // aggiuntivo incluso: il client non decide mai gli importi.
  const bookingsToInsert = solution.map(seg => {
    const segNights = getDatesInRange(seg.checkIn, seg.checkOut).length
    const pricing = roomPricing(seg.roomId, guests)
    const basePerNight = pricing?.basePerNight ?? 0
    const extraPerNight = pricing?.extraPerNight ?? 0
    return {
      guest_id: guest.id,
      room_id: seg.roomId,
      check_in: seg.checkIn,
      check_out: seg.checkOut,
      num_guests: guests,
      status: 'in_attesa',
      source: 'sito_web',
      price_per_night: basePerNight,
      total_amount: (basePerNight + extraPerNight) * segNights,
      extra_bed: extraPerNight > 0,
      extra_bed_total: extraPerNight * segNights,
      bonifico: false,
      pagato: false,
    }
  })

  const { error: bookErr } = await supabase.from('bookings').insert(bookingsToInsert)
  if (bookErr) {
    return NextResponse.json({ error: 'Errore salvataggio prenotazione' }, { status: 500 })
  }

  // Push notification
  const multiRoom = solution.length > 1
  const roomDesc = multiRoom
    ? solution.map(s => `${s.roomName} (${s.checkIn}→${s.checkOut})`).join(', poi ')
    : solution[0].roomName
  const pushTitle = multiRoom
    ? `🏠 Nuova prenotazione (cambio camera!)`
    : `🏠 Nuova prenotazione dal sito`
  const pushBody = multiRoom
    ? `${firstName} ${lastName}, ${numGuests} pers. · ${checkIn}→${checkOut}\n${roomDesc}\n📞 ${phone} ⚠️ Contatta il cliente`
    : `${firstName} ${lastName}, ${numGuests} pers. · ${checkIn}→${checkOut}\n${roomDesc} · 📞 ${phone}`

  await sendPushNotification(supabase, pushTitle, pushBody)

  return NextResponse.json({ ok: true, solution, multiRoom })
}
