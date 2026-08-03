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
// Toglie ogni spazio, tabulazione e a capo, non solo alle estremità.
// Incollando una chiave nel pannello di Vercel può finirci dentro un a capo
// anche in mezzo (successo davvero: era alla posizione 15). La chiave viene
// poi messa in un'intestazione HTTP, che non ammette quei caratteri, e la
// richiesta fallisce con un errore che non lascia capire la causa.
// Le chiavi Supabase non contengono spazi, quindi rimuoverli è sicuro.
export function pulisciChiave(v: string | undefined): string {
  return (v ?? '').replace(/\s+/g, '')
}

export function createAdminClient() {
  const key = pulisciChiave(process.env.SUPABASE_SERVICE_ROLE_KEY)
  if (!key) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY mancante: aggiungila alle variabili ambiente su Vercel e in .env.local'
    )
  }

  const url = pulisciChiave(process.env.NEXT_PUBLIC_SUPABASE_URL)
  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL mancante')
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
