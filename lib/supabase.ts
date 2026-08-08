import { createClient } from '@supabase/supabase-js'

// Vedi pulisciChiave in lib/supabaseAdmin.ts: un a capo incollato per sbaglio
// dentro la chiave fa fallire ogni richiesta.
const pulisci = (v: string | undefined) => (v ?? '').replace(/\s+/g, '')

const supabaseUrl = pulisci(process.env.NEXT_PUBLIC_SUPABASE_URL)
const supabaseAnonKey = pulisci(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Le camere e i prezzi vivono in lib/rooms.ts (condivisi con il form di /prenota).
