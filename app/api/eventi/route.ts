import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').replace(/\s+/g, ''),
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '').replace(/\s+/g, '')
)

const TIPI_AMMESSI = new Set(['visita', 'whatsapp', 'telefono'])

// Conteggio anonimo: si registrano solo il tipo di evento, la pagina e l'orario.
// Nessun cookie, nessun indirizzo IP, nessun identificativo dell'utente.
export async function POST(req: NextRequest) {
  // I bot non sono clienti e falserebbero i numeri. Lo user agent serve solo
  // per questo controllo e non viene salvato da nessuna parte.
  const ua = req.headers.get('user-agent') || ''
  if (/bot|crawl|spider|slurp|headless|preview|lighthouse|monitor/i.test(ua)) {
    return NextResponse.json({ ok: true })
  }

  let tipo = ''
  let pagina = ''
  let fonte: string | null = null
  let campagna: string | null = null
  try {
    const body = await req.json()
    tipo = String(body?.tipo ?? '')
    pagina = String(body?.pagina ?? '').slice(0, 200)
    fonte = body?.fonte ? String(body.fonte).slice(0, 80) : null
    campagna = body?.campagna ? String(body.campagna).slice(0, 80) : null
  } catch {
    return NextResponse.json({ ok: true })
  }

  if (!TIPI_AMMESSI.has(tipo)) {
    return NextResponse.json({ ok: true })
  }

  // Finché la tabella non è stata creata a mano su Supabase, il sito
  // deve continuare a funzionare come se niente fosse.
  let { error } = await supabase.from('site_events').insert({ tipo, pagina, fonte, campagna })

  // Le colonne fonte e campagna sono state aggiunte dopo: se su Supabase non
  // ci sono ancora, si registra almeno l'evento invece di perderlo.
  if (error && /column|schema cache/i.test(error.message)) {
    ;({ error } = await supabase.from('site_events').insert({ tipo, pagina }))
  }

  if (error) {
    console.warn('site_events non disponibile:', error.message)
  }

  return NextResponse.json({ ok: true })
}
