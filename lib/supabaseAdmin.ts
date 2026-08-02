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
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY mancante: aggiungila alle variabili ambiente su Vercel e in .env.local'
    )
  }

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
