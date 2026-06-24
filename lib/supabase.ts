import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const ROOMS = [
  { id: 'fed43a69-5e19-4cf9-b1b3-64affa46f9b1', name: 'Singola Amelia', maxGuests: 2, price: 70 },
  { id: 'bfe8414c-97de-4aae-96c0-c6b0225d1a05', name: 'Matrimoniale Allegra', maxGuests: 2, price: 80 },
  { id: '6a8870ce-be2b-41d9-971e-5c833a85eb4a', name: 'Matrimoniale Ambra', maxGuests: 2, price: 80 },
  { id: '19ae4611-c0a4-42ae-8530-210f9a948e9e', name: 'Tripla Lena', maxGuests: 4, price: 80 },
]
