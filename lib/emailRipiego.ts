// Email di ripiego ad Ania (richiesta dal sito NON entrata nel gestionale).
// Nel sito non esisteva alcun invio email: si usa l'API HTTP di Resend
// (https://resend.com), senza librerie. Si attiva solo con le variabili:
//   RESEND_API_KEY      chiave API di Resend
//   EMAIL_RIPIEGO_A     destinatario (l'email di Ania)
//   EMAIL_RIPIEGO_DA    mittente verificato su Resend (es. "Casa Ania <sito@casaaniarozzano.it>")
// Senza, non parte nulla e lo si dichiara nel log: il Pushover resta.

export type FetchLike = (url: string, init: RequestInit) => Promise<{ ok: boolean; status: number }>

export type ConfigEmail = { apiKey?: string; a?: string; da?: string; fetchFn?: FetchLike; timeoutMs?: number }

export function emailConfigurata(c: Pick<ConfigEmail, 'apiKey' | 'a' | 'da'>): boolean {
  return !!(c.apiKey && c.a && c.da)
}

export async function inviaEmailRipiego(oggetto: string, testo: string, c: ConfigEmail): Promise<{ inviata: boolean; motivo?: string }> {
  if (!emailConfigurata(c)) return { inviata: false, motivo: 'email non configurata (RESEND_API_KEY, EMAIL_RIPIEGO_A, EMAIL_RIPIEGO_DA)' }
  const fetchFn: FetchLike = c.fetchFn ?? ((u, i) => fetch(u, i))
  try {
    const r = await fetchFn('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${c.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: c.da, to: [c.a], subject: oggetto, text: testo }),
      signal: AbortSignal.timeout(c.timeoutMs ?? 8000),
    })
    if (!r.ok) return { inviata: false, motivo: `Resend HTTP ${r.status}` }
    return { inviata: true }
  } catch (e) {
    return { inviata: false, motivo: (e as Error)?.message?.slice(0, 80) ?? 'errore' }
  }
}
