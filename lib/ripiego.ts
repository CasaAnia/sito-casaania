// Ripiego quando il gestionale non prende la richiesta: Ania va avvisata su
// DUE canali, Pushover ed email, con gli stessi dati. Partono entrambi in
// parallelo e indipendenti: se uno fallisce l'altro va comunque.
export const OGGETTO_RIPIEGO = 'Richiesta dal sito NON entrata nel gestionale'
export const TITOLO_PUSHOVER_RIPIEGO = '⚠️ Richiesta dal sito NON entrata nel gestionale'

export type DatiRipiego = {
  nome: string
  cognome: string
  periodo: string        // es. "22 → 24 ottobre"
  persone: number
  camera: string         // nome camera o "qualsiasi"
  telefono: string
  note?: string
  motivo: string         // es. "HTTP 401", "timeout"
  linkNuovaRichiesta: string
}

// Testo unico per Pushover ed email
export function testoRipiego(d: DatiRipiego): string {
  return [
    `${d.nome} ${d.cognome}`,
    `${d.periodo} · ${d.persone} ${d.persone === 1 ? 'ospite' : 'ospiti'}`,
    `Camera: ${d.camera}`,
    `📞 ${d.telefono}`,
    d.note ? `📝 ${d.note.slice(0, 200)}` : '',
    '',
    'Il gestionale non ha registrato la richiesta: inseriscila a mano da Richieste → Nuova richiesta.',
    d.linkNuovaRichiesta,
    `(motivo tecnico: ${d.motivo})`,
  ].filter(l => l !== '').join('\n')
}

export type Canali = {
  pushover: (titolo: string, testo: string, url: string) => Promise<unknown>
  email: (oggetto: string, testo: string) => Promise<{ inviata: boolean; motivo?: string }>
}

export async function avvisaRipiego(d: DatiRipiego, canali: Canali): Promise<{ pushover: boolean; email: boolean; motivoEmail?: string }> {
  const testo = testoRipiego(d)
  const [p, e] = await Promise.allSettled([
    canali.pushover(TITOLO_PUSHOVER_RIPIEGO, testo, d.linkNuovaRichiesta),
    canali.email(OGGETTO_RIPIEGO, testo),
  ])
  const email = e.status === 'fulfilled' ? e.value : { inviata: false, motivo: String((e as PromiseRejectedResult).reason?.message ?? 'errore') }
  return { pushover: p.status === 'fulfilled', email: email.inviata, motivoEmail: email.inviata ? undefined : email.motivo }
}
