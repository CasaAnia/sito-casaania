import { NextRequest, NextResponse } from 'next/server'
import { ROOMS } from '@/lib/rooms'
import { createAdminClient } from '@/lib/supabaseAdmin'
import { costruisciCorpo, inviaAlGestionale, GESTIONALE_URL_DEFAULT } from '@/lib/richiesteGestionale'

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

// Richieste APERTE del gestionale (tabella richieste, canale web) dello stesso
// telefono: dal pezzo 5B le richieste del sito vivono lì, non più in bookings.
type RichiestaAperta = { camera_id: string | null; arrivo: string; partenza: string; telefono: string | null; created_at: string }
async function richiesteAperteDelTelefono(supabase: AdminClient, phoneDigits: string): Promise<RichiestaAperta[]> {
  try {
    const { data, error } = await supabase
      .from('richieste')
      .select('camera_id, arrivo, partenza, telefono, created_at')
      .in('stato', ['in_attesa', 'proposta_inviata'])
    if (error || !data) return []
    return (data as RichiestaAperta[]).filter(r => {
      const p = String(r.telefono || '').replace(/\D/g, '')
      return p.length > 0 && p === phoneDigits
    })
  } catch {
    return []
  }
}
const segmentoDaRichiesta = (r: RichiestaAperta): Segment => ({
  roomId: r.camera_id || '',
  roomName: r.camera_id ? (ROOMS.find(x => x.id === r.camera_id)?.name || 'Camera') : 'Camera a scelta',
  checkIn: r.arrivo,
  checkOut: r.partenza,
})

// Se lo stesso telefono ha già una richiesta aperta (o una prenotazione
// confermata) che si sovrappone alle stesse date, non creare un doppione: il
// back button + reinvio è il caso tipico. Se la query fallisce si prosegue
// senza dedupe: meglio un doppione che una richiesta persa.
async function findExistingRequest(
  supabase: AdminClient,
  phoneDigits: string,
  checkIn: string,
  checkOut: string
): Promise<Segment[] | null> {
  const aperte = (await richiesteAperteDelTelefono(supabase, phoneDigits))
    .filter(r => r.arrivo < checkOut && r.partenza > checkIn)
  if (aperte.length > 0) return aperte.map(segmentoDaRichiesta)
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
  const cutoff = new Date(Date.now() - RECENT_PENDING_HOURS * 3600 * 1000).toISOString()
  const aperte = (await richiesteAperteDelTelefono(supabase, phoneDigits)).filter(r => r.created_at >= cutoff)
  if (aperte.length > 0) return aperte.map(segmentoDaRichiesta)
  try {
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

// Avviso sonoro Pushover sul telefono di Ania (app "CasAnia" su pushover.net).
// Dal pezzo 5B lo manda il gestionale per le richieste entrate; qui resta
// SOLO per il ripiego (richiesta non entrata nel gestionale). Se le variabili
// mancano o il servizio non risponde, si va avanti.
async function sendPushoverAlert(message: string, url: string, title = '🏡 Nuova prenotazione Casa Ania') {
  const token = process.env.PUSHOVER_TOKEN
  const user = process.env.PUSHOVER_USER
  if (!token || !user) return
  try {
    const form = new URLSearchParams({
      token,
      user,
      title,
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

  // ── Invio al gestionale (pezzo 5B) ──────────────────────────────────────
  // La richiesta non diventa più una prenotazione «in attesa» su Supabase:
  // entra nella sezione Richieste del gestionale, che avvisa Ania (push +
  // Pushover) e le fa preparare la proposta. Il cliente vede lo stesso
  // messaggio di sempre.
  const multiRoom = solution.length > 1
  const preferita = ROOMS.find(r => r.id === preferredRoomId)
  const corpo = costruisciCorpo({
    firstName, lastName, phone, numGuests: guests, checkIn, checkOut, preferredRoomId, notes: guestNotes,
    utmSource: body.utm_source, utmCampaign: body.utm_campaign,
  })
  const esito = await inviaAlGestionale(corpo, {
    url: process.env.GESTIONALE_URL || GESTIONALE_URL_DEFAULT,
    segreto: (process.env.RICHIESTE_WEB_SECRET ?? '').replace(/\s+/g, ''),
  })

  if (esito.tipo === 'errore_cliente') {
    console.warn(`prenota: ${new Date().toISOString()} rifiutata dal gestionale (400)`)
    return NextResponse.json({ error: esito.messaggio }, { status: 400 })
  }

  if (esito.tipo === 'ripiego') {
    // Il gestionale non ha preso la richiesta (segreto, limite, guasto, rete):
    // il cliente NON deve vedere un errore. Ania riceve i dati su Pushover e
    // la inserisce a mano da Richieste → Nuova richiesta. Nel log solo il motivo.
    console.error(`prenota: ${new Date().toISOString()} ripiego, gestionale non raggiunto (${esito.motivo})`)
    const testo =
      `${corpo.nome} ${corpo.cognome}\n` +
      `${formatRangeIt(checkIn, checkOut)} · ${guests} ${guests === 1 ? 'ospite' : 'ospiti'}\n` +
      `Camera: ${preferita ? preferita.name : 'qualsiasi'}\n` +
      `📞 ${corpo.telefono}` +
      (corpo.note ? `\n📝 ${corpo.note.slice(0, 120)}` : '')
    await sendPushoverAlert(testo, `${(process.env.GESTIONALE_URL || GESTIONALE_URL_DEFAULT).replace(/\/$/, '')}/richieste/nuova`, '⚠️ Richiesta dal sito NON entrata nel gestionale')
    return NextResponse.json({ ok: true, solution, multiRoom })
  }

  // Successo: nessun avviso da qui, lo manda già il gestionale (push + Pushover)
  return NextResponse.json({ ok: true, solution, multiRoom, duplicate: esito.doppione })
}
