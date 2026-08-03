import { createClient } from '@supabase/supabase-js'

// Client per le route server del sito (modulo di prenotazione).
//
// Serve la service role key perché queste operazioni girano senza nessun
// utente loggato: il cliente che prenota è un visitatore anonimo. Con le
// policy RLS attive sul database, la chiave pubblica non può né leggere le
// disponibilità né inserire ospiti e prenotazioni.
//
// Non va mai importato da un componente che finisce nel browser: niente
// prefisso NEXT_PUBLIC_, si usa solo dentro app/api/.
export function createAdminClient() {
  // trim() non è pedanteria: incollando una chiave nel pannello di Vercel è
  // facilissimo portarsi dietro uno spazio o un a capo, e la chiave finisce
  // in un'intestazione HTTP, che non può contenerli. Senza trim l'errore che
  // ne esce ("invalid header value") non fa capire la causa.
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!key) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY mancante: aggiungila alle variabili ambiente su Vercel e in .env.local'
    )
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL mancante')
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
