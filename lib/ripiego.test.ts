import { test } from 'node:test'
import assert from 'node:assert/strict'
import { avvisaRipiego, testoRipiego, OGGETTO_RIPIEGO, TITOLO_PUSHOVER_RIPIEGO } from './ripiego.ts'
import { inviaEmailRipiego, emailConfigurata } from './emailRipiego.ts'

const dati = { nome: 'Prova', cognome: 'Ripiego', periodo: '22 → 24 ottobre', persone: 2, camera: 'Singola Amelia', telefono: '+39 333 000 2222', note: 'ciao', motivo: 'HTTP 401', linkNuovaRichiesta: 'https://g.test/richieste/nuova' }

test('testo unico con tutti i dati e il motivo', () => {
  const t = testoRipiego(dati)
  for (const s of ['Prova Ripiego', '22 → 24 ottobre · 2 ospiti', 'Camera: Singola Amelia', '📞 +39 333 000 2222', '📝 ciao', 'Nuova richiesta', 'HTTP 401']) assert.ok(t.includes(s), s)
})

test('partono entrambi, con titolo e oggetto giusti', async () => {
  const chiamate: string[] = []
  const r = await avvisaRipiego(dati, {
    pushover: async (titolo) => { chiamate.push('pushover:' + titolo) },
    email: async (oggetto) => { chiamate.push('email:' + oggetto); return { inviata: true } },
  })
  assert.deepEqual(r, { pushover: true, email: true, motivoEmail: undefined })
  assert.deepEqual(chiamate.sort(), ['email:' + OGGETTO_RIPIEGO, 'pushover:' + TITOLO_PUSHOVER_RIPIEGO].sort())
})

test('se l\'email fallisce o esplode, il Pushover parte comunque', async () => {
  let pushover = 0
  const a = await avvisaRipiego(dati, { pushover: async () => { pushover++ }, email: async () => ({ inviata: false, motivo: 'Resend HTTP 500' }) })
  assert.deepEqual(a, { pushover: true, email: false, motivoEmail: 'Resend HTTP 500' })
  const b = await avvisaRipiego(dati, { pushover: async () => { pushover++ }, email: async () => { throw new Error('boom') } })
  assert.equal(b.pushover, true); assert.equal(b.email, false); assert.equal(b.motivoEmail, 'boom')
  assert.equal(pushover, 2)
})

test('se il Pushover esplode, l\'email parte comunque', async () => {
  const r = await avvisaRipiego(dati, { pushover: async () => { throw new Error('giù') }, email: async () => ({ inviata: true }) })
  assert.deepEqual(r, { pushover: false, email: true, motivoEmail: undefined })
})

test('email: senza configurazione non parte e lo dice; con Resend finto manda i campi giusti', async () => {
  assert.equal(emailConfigurata({}), false)
  const senza = await inviaEmailRipiego('o', 't', {})
  assert.equal(senza.inviata, false); assert.match(senza.motivo!, /non configurata/)
  const viste: { url: string; init: RequestInit }[] = []
  const ok = await inviaEmailRipiego(OGGETTO_RIPIEGO, 'corpo', { apiKey: 'k', a: 'ania@esempio.it', da: 'Casa Ania <sito@casaaniarozzano.it>', fetchFn: async (url, init) => { viste.push({ url, init }); return { ok: true, status: 200 } } })
  assert.deepEqual(ok, { inviata: true })
  assert.equal(viste[0].url, 'https://api.resend.com/emails')
  const corpo = JSON.parse(viste[0].init.body as string)
  assert.deepEqual(corpo, { from: 'Casa Ania <sito@casaaniarozzano.it>', to: ['ania@esempio.it'], subject: OGGETTO_RIPIEGO, text: 'corpo' })
  assert.equal((viste[0].init.headers as Record<string, string>).Authorization, 'Bearer k')
  const ko = await inviaEmailRipiego('o', 't', { apiKey: 'k', a: 'a@b.it', da: 'x@y.it', fetchFn: async () => ({ ok: false, status: 422 }) })
  assert.deepEqual(ko, { inviata: false, motivo: 'Resend HTTP 422' })
})
