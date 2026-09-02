// Invio delle richieste del modulo /prenota al gestionale (pezzo 5B).
// Logica pura e testabile: costruzione del corpo, classificazione della
// risposta, traduzione degli errori. La rete la fa inviaAlGestionale, con
// fetch iniettabile per i test.

export const GESTIONALE_URL_DEFAULT = 'https://gestionale-bnb-tau.vercel.app'
export const TIMEOUT_MS = 8000
export const ORIGINE_MAX = 40

// id delle camere (lib/rooms.ts) → slug della pagina del sito, come lo
// capisce il gestionale (mappaCamera accetta id, nome o slug)
export const SLUG_BY_ROOM_ID: Record<string, string> = {
  'fed43a69-5e19-4cf9-b1b3-64affa46f9b1': 'singola',
  'bfe8414c-97de-4aae-96c0-c6b0225d1a05': 'allegra',
  '6a8870ce-be2b-41d9-971e-5c833a85eb4a': 'ambra',
  '19ae4611-c0a4-42ae-8530-210f9a948e9e': 'lena',
}

export type CorpoGestionale = {
  nome: string
  cognome: string
  arrivo: string
  partenza: string
  persone: number
  camera: string
  telefono: string
  email: string
  note: string
  origine: string
}

const pulisci = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '')

// "google" · "google/brand" · "diretto" se non c'è utm_source
export function origineDa(utmSource?: unknown, utmCampaign?: unknown): string {
  const s = pulisci(utmSource, ORIGINE_MAX).toLowerCase()
  if (!s) return 'diretto'
  const c = pulisci(utmCampaign, ORIGINE_MAX).toLowerCase()
  return (c ? `${s}/${c}` : s).slice(0, ORIGINE_MAX)
}

export function costruisciCorpo(input: {
  firstName: unknown; lastName: unknown; phone: unknown; numGuests: number
  checkIn: string; checkOut: string; preferredRoomId?: unknown; notes?: unknown
  email?: unknown; utmSource?: unknown; utmCampaign?: unknown
}): CorpoGestionale {
  const roomId = typeof input.preferredRoomId === 'string' ? input.preferredRoomId : ''
  return {
    nome: pulisci(input.firstName, 60),
    cognome: pulisci(input.lastName, 60),
    arrivo: input.checkIn,
    partenza: input.checkOut,
    persone: input.numGuests,
    camera: SLUG_BY_ROOM_ID[roomId] ?? '',
    telefono: pulisci(input.phone, 30),
    email: pulisci(input.email, 120),
    note: typeof input.notes === 'string' ? input.notes.trim().slice(0, 500) : '',
    origine: origineDa(input.utmSource, input.utmCampaign),
  }
}

export type EsitoGestionale =
  | { tipo: 'successo'; id: string; doppione: boolean }
  | { tipo: 'errore_cliente'; messaggio: string }
  | { tipo: 'ripiego'; motivo: string }

// 201/200 → successo · 400 → errore da mostrare al cliente ·
// 401, 429, 5xx, timeout, rete, risposta illeggibile → ripiego
export function classificaRisposta(stato: number | 'timeout' | 'rete', corpo: unknown): EsitoGestionale {
  if (stato === 'timeout' || stato === 'rete') return { tipo: 'ripiego', motivo: stato }
  const c = (corpo && typeof corpo === 'object' ? corpo : {}) as { id?: unknown; doppione?: unknown; error?: unknown }
  if (stato === 201 || stato === 200) {
    if (typeof c.id !== 'string' || !c.id) return { tipo: 'ripiego', motivo: `risposta ${stato} senza id` }
    return { tipo: 'successo', id: c.id, doppione: c.doppione === true }
  }
  if (stato === 400) return { tipo: 'errore_cliente', messaggio: traduciErrore(typeof c.error === 'string' ? c.error : '') }
  return { tipo: 'ripiego', motivo: `HTTP ${stato}` }
}

// Dal messaggio tecnico del gestionale alla frase per il cliente
export function traduciErrore(messaggio: string): string {
  const m = messaggio.toLowerCase()
  if (m.includes('arrivo non valida') || m.includes('partenza non valida') || m.includes('aaaa-mm-gg')) return 'Controlla le date: qualcosa non torna.'
  if (m.includes('dopo l')) return 'Il check-out deve essere dopo il check-in.'
  if (m.includes('passato')) return 'La data di arrivo è già passata: controlla il check-in.'
  if (m.includes('persone')) return 'Numero di persone non valido.'
  if (m.includes('telefono')) return 'Controlla il numero di telefono: servono almeno 8 cifre per poterti richiamare.'
  if (m.includes('nome') && !m.includes('cognome')) return 'Controlla il nome: sembra incompleto.'
  if (m.includes('cognome')) return 'Controlla il cognome: sembra incompleto.'
  if (m.includes('email')) return 'Controlla l’indirizzo email.'
  return messaggio || 'Controlla i dati inseriti.'
}

export type FetchLike = (url: string, init: RequestInit) => Promise<{ status: number; json: () => Promise<unknown> }>

export async function inviaAlGestionale(
  corpo: CorpoGestionale,
  opzioni: { url?: string; segreto: string; fetchFn?: FetchLike; timeoutMs?: number } ,
): Promise<EsitoGestionale> {
  const base = (opzioni.url || GESTIONALE_URL_DEFAULT).replace(/\/$/, '')
  const fetchFn: FetchLike = opzioni.fetchFn ?? ((u, i) => fetch(u, i))
  if (!opzioni.segreto) return { tipo: 'ripiego', motivo: 'RICHIESTE_WEB_SECRET mancante' }
  try {
    const r = await fetchFn(`${base}/api/richieste/web`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${opzioni.segreto}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo),
      signal: AbortSignal.timeout(opzioni.timeoutMs ?? TIMEOUT_MS),
    })
    let json: unknown = null
    try { json = await r.json() } catch { json = null }
    return classificaRisposta(r.status, json)
  } catch (e) {
    const nome = (e as { name?: string })?.name
    return { tipo: 'ripiego', motivo: nome === 'TimeoutError' || nome === 'AbortError' ? 'timeout' : 'rete' }
  }
}
