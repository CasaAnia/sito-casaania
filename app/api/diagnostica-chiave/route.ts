import { NextResponse } from 'next/server'

// TEMPORANEA — da cancellare appena il modulo di prenotazione funziona.
//
// Serve a capire perché Supabase rifiuta la chiave. Non restituisce mai il
// valore: solo lunghezza, prefisso del tipo, e quali caratteri "invisibili"
// contiene (spazi, a capo), che sono la causa sospettata.
export async function GET() {
  const raw = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

  // Posizioni dei caratteri non ammessi in un'intestazione HTTP.
  const invisibili: { posizione: number; codice: number }[] = []
  for (let i = 0; i < raw.length; i++) {
    const c = raw.charCodeAt(i)
    if (c < 33 || c === 127) invisibili.push({ posizione: i, codice: c })
  }

  return NextResponse.json({
    presente: raw.length > 0,
    lunghezza: raw.length,
    lunghezzaDopoTrim: raw.trim().length,
    tipo: raw.trim().startsWith('sb_secret_')
      ? 'secret key nuova'
      : raw.trim().startsWith('eyJ')
        ? 'chiave legacy JWT'
        : 'formato non riconosciuto',
    primi10: raw.trim().slice(0, 10),
    caratteriInvisibili: invisibili,
    urlLunghezza: (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').length,
    urlInvisibili: (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').length !==
      (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim().length,
  })
}
