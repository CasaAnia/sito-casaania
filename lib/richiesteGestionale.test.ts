import { test } from 'node:test'
import assert from 'node:assert/strict'
import { costruisciCorpo, origineDa, classificaRisposta, traduciErrore, inviaAlGestionale, type FetchLike } from './richiesteGestionale.ts'

const base = { firstName: ' Prova ', lastName: 'Sito', phone: '+39 333 000 0000', numGuests: 2, checkIn: '2026-09-22', checkOut: '2026-09-24' }

test('corpo: slug della camera, origine, campi ripuliti', () => {
  const c = costruisciCorpo({ ...base, preferredRoomId: 'fed43a69-5e19-4cf9-b1b3-64affa46f9b1', notes: ' ciao ', utmSource: 'Google', utmCampaign: 'Brand' })
  assert.deepEqual(c, { nome: 'Prova', cognome: 'Sito', arrivo: '2026-09-22', partenza: '2026-09-24', persone: 2, camera: 'singola', telefono: '+39 333 000 0000', email: '', note: 'ciao', origine: 'google/brand' })
  assert.equal(costruisciCorpo({ ...base, preferredRoomId: '' }).camera, '')
  assert.equal(costruisciCorpo({ ...base, preferredRoomId: 'sconosciuta' }).camera, '')
  assert.equal(costruisciCorpo(base).origine, 'diretto')
})

test('origine: diretto senza utm, taglio a 40 caratteri', () => {
  assert.equal(origineDa(undefined, undefined), 'diretto')
  assert.equal(origineDa('', 'x'), 'diretto')
  assert.equal(origineDa('facebook'), 'facebook')
  assert.equal(origineDa('a'.repeat(50), 'b').length, 40)
})

test('classificazione: successo, doppione, 400 tradotto, ripiego', () => {
  assert.deepEqual(classificaRisposta(201, { id: 'x' }), { tipo: 'successo', id: 'x', doppione: false })
  assert.deepEqual(classificaRisposta(200, { id: 'x', doppione: true }), { tipo: 'successo', id: 'x', doppione: true })
  assert.deepEqual(classificaRisposta(400, { error: 'La data di arrivo è nel passato' }), { tipo: 'errore_cliente', messaggio: 'La data di arrivo è già passata: controlla il check-in.' })
  assert.deepEqual(classificaRisposta(401, { error: 'Non autorizzato' }), { tipo: 'ripiego', motivo: 'HTTP 401' })
  assert.deepEqual(classificaRisposta(429, {}), { tipo: 'ripiego', motivo: 'HTTP 429' })
  assert.deepEqual(classificaRisposta(503, null), { tipo: 'ripiego', motivo: 'HTTP 503' })
  assert.deepEqual(classificaRisposta('timeout', null), { tipo: 'ripiego', motivo: 'timeout' })
  assert.deepEqual(classificaRisposta(201, {}), { tipo: 'ripiego', motivo: 'risposta 201 senza id' })
  assert.equal(traduciErrore('Numero di telefono mancante o troppo corto'), 'Controlla il numero di telefono: servono almeno 8 cifre per poterti richiamare.')
  assert.equal(traduciErrore('Qualcosa di strano'), 'Qualcosa di strano')
})

test('inviaAlGestionale: intestazioni, successo, 400, 5xx, timeout, rete, segreto mancante', async () => {
  const corpo = costruisciCorpo(base)
  const chiamate: { url: string; init: RequestInit }[] = []
  const finto = (status: number, json: unknown): FetchLike => async (url, init) => { chiamate.push({ url, init }); return { status, json: async () => json } }
  const ok = await inviaAlGestionale(corpo, { segreto: 'S', fetchFn: finto(201, { id: 'abc' }), url: 'https://g.test/' })
  assert.deepEqual(ok, { tipo: 'successo', id: 'abc', doppione: false })
  assert.equal(chiamate[0].url, 'https://g.test/api/richieste/web')
  assert.equal((chiamate[0].init.headers as Record<string, string>).Authorization, 'Bearer S')
  assert.equal(JSON.parse(chiamate[0].init.body as string).cognome, 'Sito')
  assert.equal((await inviaAlGestionale(corpo, { segreto: 'S', fetchFn: finto(400, { error: 'Manca il cognome' }) })).tipo, 'errore_cliente')
  assert.deepEqual(await inviaAlGestionale(corpo, { segreto: 'S', fetchFn: finto(500, null) }), { tipo: 'ripiego', motivo: 'HTTP 500' })
  const timeout: FetchLike = async () => { const e = new Error('t'); e.name = 'TimeoutError'; throw e }
  assert.deepEqual(await inviaAlGestionale(corpo, { segreto: 'S', fetchFn: timeout }), { tipo: 'ripiego', motivo: 'timeout' })
  const rete: FetchLike = async () => { throw new Error('ECONNREFUSED') }
  assert.deepEqual(await inviaAlGestionale(corpo, { segreto: 'S', fetchFn: rete }), { tipo: 'ripiego', motivo: 'rete' })
  assert.deepEqual(await inviaAlGestionale(corpo, { segreto: '', fetchFn: finto(201, { id: 'x' }) }), { tipo: 'ripiego', motivo: 'RICHIESTE_WEB_SECRET mancante' })
})
