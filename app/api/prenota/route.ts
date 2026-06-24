import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { ROOMS } from '@/lib/supabase'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function getDatesInRange(checkIn: string, checkOut: string): string[] {
  const dates: string[] = []
  const d = new Date(checkIn)
  const end = new Date(checkOut)
  while (d < end) {
    dates.push(d.toISOString().slice(0, 10))
    d.setDate(d.getDate() + 1)
  }
  return dates
}

// Returns which rooms are free for each date
async function getAvailabilityMap(checkIn: string, checkOut: string): Promise<Map<string, Set<string>>> {
  const { data: bookings } = await supabase
    .from('bookings')
    .select('room_id, check_in, check_out')
    .in('status', ['confermata', 'in_attesa'])
    .lt('check_in', checkOut)
    .gt('check_out', checkIn)

  const nights = getDatesInRange(checkIn, checkOut)
  // date -> set of occupied room_ids
  const occupiedByDate = new Map<string, Set<string>>()
  for (const night of nights) {
    occupiedByDate.set(night, new Set())
  }
  for (const b of bookings || []) {
    const bNights = getDatesInRange(b.check_in, b.check_out)
    for (const night of bNights) {
      if (occupiedByDate.has(night)) {
        occupiedByDate.get(night)!.add(b.room_id)
      }
    }
  }
  return occupiedByDate
}

type Segment = { roomId: string; roomName: string; checkIn: string; checkOut: string }

function findSolution(
  nights: string[],
  occupiedByDate: Map<string, Set<string>>,
  numGuests: number,
  preferredRoomId?: string
): Segment[] | null {
  const eligibleRooms = ROOMS.filter(r => r.maxGuests >= numGuests)
  if (eligibleRooms.length === 0) return null

  // Try preferred room first, then all others
  const roomOrder = preferredRoomId
    ? [
        ...eligibleRooms.filter(r => r.id === preferredRoomId),
        ...eligibleRooms.filter(r => r.id !== preferredRoomId),
      ]
    : eligibleRooms

  // Try single room covering all nights
  for (const room of roomOrder) {
    const allFree = nights.every(n => !occupiedByDate.get(n)?.has(room.id))
    if (allFree) {
      return [{ roomId: room.id, roomName: room.name, checkIn: nights[0], checkOut: addDay(nights[nights.length - 1]) }]
    }
  }

  // Try multi-room: greedily assign rooms night by night
  const segments: Segment[] = []
  let i = 0
  while (i < nights.length) {
    // Find the room that covers the most consecutive nights from i
    let bestRoom = null
    let bestEnd = i
    for (const room of roomOrder) {
      let j = i
      while (j < nights.length && !occupiedByDate.get(nights[j])?.has(room.id)) {
        j++
      }
      if (j > bestEnd) {
        bestEnd = j
        bestRoom = room
      }
    }
    if (!bestRoom || bestEnd === i) return null // no solution
    segments.push({
      roomId: bestRoom.id,
      roomName: bestRoom.name,
      checkIn: nights[i],
      checkOut: addDay(nights[bestEnd - 1]),
    })
    i = bestEnd
  }
  return segments
}

function addDay(dateStr: string): string {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}

async function sendWhatsApp(message: string) {
  const phone = process.env.CALLMEBOT_PHONE
  const apikey = process.env.CALLMEBOT_APIKEY
  if (!phone || !apikey) return
  const encoded = encodeURIComponent(message)
  await fetch(`https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encoded}&apikey=${apikey}`)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { firstName, lastName, phone, numGuests, checkIn, checkOut, preferredRoomId } = body

  if (!firstName || !lastName || !phone || !numGuests || !checkIn || !checkOut) {
    return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
  }

  const nights = getDatesInRange(checkIn, checkOut)
  if (nights.length === 0) {
    return NextResponse.json({ error: 'Date non valide' }, { status: 400 })
  }

  const occupiedByDate = await getAvailabilityMap(checkIn, checkOut)
  const solution = findSolution(nights, occupiedByDate, Number(numGuests), preferredRoomId)

  if (!solution) {
    return NextResponse.json({ error: 'Nessuna disponibilità per queste date' }, { status: 409 })
  }

  // Create guest
  const { data: guest, error: guestErr } = await supabase
    .from('guests')
    .insert({ full_name: `${firstName} ${lastName}`, phone })
    .select('id')
    .single()

  if (guestErr || !guest) {
    return NextResponse.json({ error: 'Errore creazione ospite' }, { status: 500 })
  }

  // Create booking(s)
  const bookingsToInsert = solution.map(seg => ({
    guest_id: guest.id,
    room_id: seg.roomId,
    check_in: seg.checkIn,
    check_out: seg.checkOut,
    num_guests: Number(numGuests),
    status: 'in_attesa',
    source: 'sito_web',
    price_per_night: ROOMS.find(r => r.id === seg.roomId)?.price || 0,
    total_amount: ROOMS.find(r => r.id === seg.roomId)?.price! * getDatesInRange(seg.checkIn, seg.checkOut).length,
    extra_bed: false,
    extra_bed_total: 0,
    bonifico: false,
    pagato: false,
  }))

  const { error: bookErr } = await supabase.from('bookings').insert(bookingsToInsert)
  if (bookErr) {
    return NextResponse.json({ error: 'Errore salvataggio prenotazione' }, { status: 500 })
  }

  // WhatsApp notification
  const multiRoom = solution.length > 1
  const roomDesc = solution.map(s => `${s.roomName} (${s.checkIn} → ${s.checkOut})`).join(', poi ')
  const msg = multiRoom
    ? `🏠 NUOVA PRENOTAZIONE (cambio camera)\n${firstName} ${lastName}, ${numGuests} pers.\nDal ${checkIn} al ${checkOut}\n📍 ${roomDesc}\n📞 ${phone}\n⚠️ Soggiorno diviso - contatta il cliente`
    : `🏠 NUOVA PRENOTAZIONE\n${firstName} ${lastName}, ${numGuests} pers.\nDal ${checkIn} al ${checkOut}\n📍 ${solution[0].roomName}\n📞 ${phone}`

  await sendWhatsApp(msg)

  return NextResponse.json({ ok: true, solution, multiRoom })
}
