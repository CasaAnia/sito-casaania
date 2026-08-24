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
// Ogni prenotazione ora fa due chiamate (verifica + conferma), quindi il
// tetto è più alto di prima.
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 10
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

// Richiesta recente (48h) ancora in attesa dallo stesso numero, con date che
// NON si toccano: quasi sempre è un ospite che ha sbagliato le date la prima
// volta e sta riprovando. Prima di creare una seconda prenotazione gli si
// chiede se è un soggiorno in più o un cambio. Le richieste già confermate
// da Ania non contano: chi ha prenotato e vuole un altro soggiorno è benvenuto.
const RECENT_PENDING_HOURS = 48

async function findRecentPending(
  supabase: AdminClient,
  phoneDigits: string
): Promise<Segment[] | null> {
  try {
    const cutoff = new Date(Date.now() - RECENT_PENDING_HOURS * 3600 * 1000).toISOString()
    const { data, error } = await supabase
      .from('bookings')
      .select('room_id, check_in, check_out, guests!inner(phone)')
      .eq('status', 'in_attesa')
      .gte('created_at', cutoff)
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

// Avviso WhatsApp ad Ania via CallMeBot (gratuito, per avvisi personali).
// Se le variabili non sono configurate o il servizio non risponde, si va
// avanti senza: la prenotazione è già salvata e c'è comunque la push.
async function sendWhatsAppAlert(text: string) {
  const phone = process.env.CALLMEBOT_PHONE
  const apikey = process.env.CALLMEBOT_APIKEY
  if (!phone || !apikey) return
  try {
    await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`,
      { signal: AbortSignal.timeout(8000) }
    )
  } catch {
    // CallMeBot non raggiungibile: pazienza, resta la notifica push
  }
}

// Avviso sonoro Pushover sul telefono di Ania (app "CasAnia" su pushover.net).
// Suona forte e insistente anche a telefono bloccato: è il canale per il solo
// evento urgente "nuova richiesta dal sito". Se le variabili mancano o il
// servizio non risponde, si va avanti: la prenotazione è già salvata.
async function sendPushoverAlert(message: string, url: string) {
  const token = process.env.PUSHOVER_TOKEN
  const user = process.env.PUSHOVER_USER
  if (!token || !user) return
  try {
    const form = new URLSearchParams({
      token,
      user,
      title: '🏡 Nuova prenotazione Casa Ania',
      message,
      priority: '1',
      sound: 'persistent',
      url,
      url_title: 'Apri nel gestionale',
    })
    await fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      body: form,
      signal: AbortSignal.timeout(8000),
    })
  } catch {
    // Pushover non raggiungibile: resta comunque la notifica push
  }
}

// Anti-doppioni: l'avviso Pushover parte una sola volta per prenotazione.
// Si "reclama" l'invio marcando pushover_notified_at solo dove è ancora NULL:
// se nessuna riga viene marcata, qualcun altro ha già avvisato e si tace.
// Finché la colonna non esiste su Supabase (migrazione a mano) l'update
// fallisce: in quel caso si invia lo stesso, perché questo è comunque
// l'unico punto del codice che manda l'avviso, e solo alla creazione.
async function claimPushoverAlert(supabase: AdminClient, ids: string[]): Promise<boolean> {
  if (ids.length === 0) return true
  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ pushover_notified_at: new Date().toISOString() })
      .in('id', ids)
      .is('pushover_notified_at', null)
      .select('id')
    if (error) return true
    return (data?.length ?? 0) > 0
  } catch {
    return true
  }
}

// Date della notifica come le direbbe Ania: "7 → 11 settembre",
// oppure "28 settembre → 2 ottobre" a cavallo di due mesi.
const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
  'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
function formatRangeIt(checkIn: string, checkOut: string): string {
  const [, mIn, dIn] = checkIn.split('-').map(Number)
  const [, mOut, dOut] = checkOut.split('-').map(Number)
  if (mIn === mOut) return `${dIn} → ${dOut} ${MESI[mIn - 1]}`
  return `${dIn} ${MESI[mIn - 1]} → ${dOut} ${MESI[mOut - 1]}`
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
  const { firstName, lastName, phone, numGuests, checkIn, checkOut, preferredRoomId, hp_check, checkOnly, notes } = body
  // Nota facoltativa dell'ospite: mai fidarsi della lunghezza dal client
  const guestNotes = typeof notes === 'string' ? notes.trim().slice(0, 500) : ''

  // Honeypot: il campo "hp_check" è invisibile agli umani. Se è pieno è un
  // bot: rispondiamo ok senza salvare nulla. Il vecchio campo "website" NON
  // va più controllato: l'autofill di Chrome lo riempiva di nascosto e i
  // clienti veri venivano scartati come bot (successo al primo test).
  if (typeof hp_check === 'string' && hp_check.trim() !== '') {
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

  // Richiesta recente in attesa con date diverse: si chiede all'ospite cosa
  // intende, e si va avanti solo col suo "è un altro soggiorno" esplicito
  const recentPending = await findRecentPending(supabase, phoneDigits)
  if (recentPending && body.secondStayOk !== true) {
    return NextResponse.json({ ok: true, needsIntent: true, recentPending })
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

  // Fase di sola verifica: dice al client quale sistemazione uscirebbe,
  // senza salvare nulla. Serve a chiedere conferma all'ospite quando la
  // camera assegnata non è quella che aveva scelto. "alternatives" conta le
  // camere libere per TUTTE le notti: così il client può dire "è rimasta
  // libera solo la..." soltanto quando è davvero l'unica.
  if (checkOnly) {
    const freeRooms = ROOMS
      .filter(r => r.maxGuests >= guests)
      .filter(r => nights.every(n => !occupiedByDate.get(n)?.has(r.id)))
    return NextResponse.json({
      ok: true,
      checkOnly: true,
      solution,
      multiRoom: solution.length > 1,
      alternatives: freeRooms.length,
      // Lista completa delle camere libere: il client la mostra al cliente
      // e lascia scegliere, invece di proporne una sola d'ufficio.
      freeRooms: freeRooms.map(r => ({ id: r.id, name: r.name })),
    })
  }

  // Ospite: guests.phone ha un vincolo UNIQUE (guests_phone_key), quindi un
  // cliente che ha già soggiornato NON va reinserito: si riusa la sua scheda,
  // altrimenti l'insert fallisce e il cliente di ritorno non può prenotare
  // (successo davvero: "Errore creazione ospite" al test di Ania).
  // La scheda esistente non viene rinominata: il nome digitato nel form viene
  // salvato sulla prenotazione (bookings.guest_name), che nel gestionale vince
  // sul nome della scheda per QUELLA prenotazione.
  const phoneTrimmed = String(phone).trim()
  const nomeForm = `${String(firstName).trim()} ${String(lastName).trim()}`.replace(/\s+/g, ' ')
  let guestId: string | null = null

  const { data: existingGuest } = await supabase
    .from('guests')
    .select('id')
    .eq('phone', phoneTrimmed)
    .maybeSingle()

  if (existingGuest) {
    guestId = existingGuest.id
  } else {
    const { data: newGuest, error: guestErr } = await supabase
      .from('guests')
      .insert({ full_name: nomeForm, phone: phoneTrimmed })
      .select('id')
      .single()
    if (newGuest) {
      guestId = newGuest.id
    } else if (guestErr?.code === '23505') {
      // due richieste simultanee con lo stesso numero: riprova la lettura
      const { data: raced } = await supabase.from('guests').select('id').eq('phone', phoneTrimmed).maybeSingle()
      guestId = raced?.id ?? null
    }
  }

  if (!guestId) {
    return NextResponse.json(
      { error: 'Non riesco a salvare i tuoi dati. Riprova o scrivici su WhatsApp.' },
      { status: 500 }
    )
  }

  // Create booking(s) — prezzi calcolati dal server (lib/rooms.ts), letto
  // aggiuntivo incluso: il client non decide mai gli importi.
  const bookingsToInsert = solution.map(seg => {
    const segNights = getDatesInRange(seg.checkIn, seg.checkOut).length
    const pricing = roomPricing(seg.roomId, guests)
    const basePerNight = pricing?.basePerNight ?? 0
    const extraPerNight = pricing?.extraPerNight ?? 0
    // extra_bed segue i letti FISICI in uso (es. Lena in 3: letto montato ma
    // gratis e invisibile al cliente), extra_bed_total solo quelli fatturati.
    return {
      guest_id: guestId,
      // Nome di QUESTA prenotazione, come digitato nel form: nel gestionale
      // vince sul nome della scheda cliente riusata per telefono
      guest_name: nomeForm,
      room_id: seg.roomId,
      check_in: seg.checkIn,
      check_out: seg.checkOut,
      num_guests: guests,
      status: 'in_attesa',
      source: 'sito_web',
      price_per_night: basePerNight,
      total_amount: (basePerNight + extraPerNight) * segNights,
      extra_bed: (pricing?.bedsUsed ?? 0) > 0,
      extra_bed_total: extraPerNight * segNights,
      bonifico: false,
      pagato: false,
      notes: guestNotes || null,
    }
  })

  let { data: insertedRows, error: bookErr } = await supabase
    .from('bookings').insert(bookingsToInsert).select('id')
  if (bookErr) {
    // Colonna guest_name non ancora migrata sul DB: si salva senza, come prima.
    // Meglio una prenotazione col solo nome della scheda che una persa.
    const senzaNome = bookingsToInsert.map(({ guest_name: _gn, ...rest }) => rest)
    ;({ data: insertedRows, error: bookErr } = await supabase
      .from('bookings').insert(senzaNome).select('id'))
  }
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
  // Ania ha solo 2 letti aggiuntivi in tutta la casa: la notifica le dice
  // subito quanti ne blocca questa prenotazione (il cliente non lo vede mai).
  const maxBedsUsed = Math.max(...solution.map(s => roomPricing(s.roomId, guests)?.bedsUsed ?? 0))
  const bedsNote = maxBedsUsed > 0
    ? `\n🛏 ${maxBedsUsed === 1 ? '1 letto aggiuntivo in uso' : `${maxBedsUsed} letti aggiuntivi in uso`}`
    : ''
  // L'ospite ha confermato che questa è una seconda richiesta voluta:
  // Ania lo deve sapere, coi dati dell'altra richiesta sott'occhio,
  // per non scambiarla per un doppione da cestinare
  const doubleNote = recentPending
    ? `\n⚠️ Ha un'altra richiesta in attesa: ${recentPending
        .map(s => `${s.roomName} ${s.checkIn}→${s.checkOut}`)
        .join(', ')} (ha confermato: è un soggiorno in più)`
    : ''
  const notesLine = guestNotes ? `\n📝 “${guestNotes}”` : ''
  const pushBody = multiRoom
    ? `${firstName} ${lastName}, ${numGuests} pers. · ${checkIn}→${checkOut}\n${roomDesc}\n📞 ${phone} ⚠️ Contatta il cliente${bedsNote}${doubleNote}${notesLine}`
    : `${firstName} ${lastName}, ${numGuests} pers. · ${checkIn}→${checkOut}\n${roomDesc} · 📞 ${phone}${bedsNote}${doubleNote}${notesLine}`

  const totale = bookingsToInsert.reduce((s, b) => s + b.total_amount, 0)
  const waText =
    `🏠 Nuova richiesta dal sito Casa Ania\n` +
    `${firstName} ${lastName}, ${numGuests} ${Number(numGuests) === 1 ? 'persona' : 'persone'}\n` +
    `${checkIn} → ${checkOut} · ${roomDesc} · ${totale} €\n` +
    `Tel: ${phone}\n` +
    `Chiama il cliente e poi conferma nel gestionale.${doubleNote}${notesLine}`

  // Avviso sonoro Pushover: testo essenziale (nome, camera, date, ospiti),
  // toccandolo si apre la prenotazione nel gestionale. Parte solo qui, alla
  // creazione, e una sola volta grazie a claimPushoverAlert.
  const insertedIds = (insertedRows ?? []).map(r => r.id)
  const gestionale = 'https://gestionale-bnb-tau.vercel.app'
  const pushoverUrl = insertedIds[0] ? `${gestionale}/prenotazioni/${insertedIds[0]}` : gestionale
  const pushoverMsg =
    `${firstName} ${lastName}\n` +
    `${roomDesc}\n` +
    `${formatRangeIt(checkIn, checkOut)}\n` +
    `${numGuests} ${Number(numGuests) === 1 ? 'ospite' : 'ospiti'}`

  const canAlert = await claimPushoverAlert(supabase, insertedIds)
  await Promise.all([
    sendPushNotification(supabase, pushTitle, pushBody),
    sendWhatsAppAlert(waText),
    canAlert ? sendPushoverAlert(pushoverMsg, pushoverUrl) : Promise.resolve(),
  ])

  return NextResponse.json({ ok: true, solution, multiRoom })
}
