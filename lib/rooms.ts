// Camere, capienze e prezzi: unica fonte di verità, condivisa tra il form
// di /prenota e l'API. Il prezzo a notte è il TOTALE per quel numero di
// persone (letto aggiuntivo incluso); extraBedPerNight dice quanto di quel
// totale è il supplemento letto, così l'API può salvare nel gestionale
// price_per_night (base) ed extra_bed_total separati.

export type RoomInfo = {
  id: string
  name: string
  maxGuests: number
  pricePerNight: Record<number, number>
  extraBedPerNight: Record<number, number>
}

export const ROOMS: RoomInfo[] = [
  {
    id: 'fed43a69-5e19-4cf9-b1b3-64affa46f9b1',
    name: 'Singola Amelia',
    maxGuests: 2,
    pricePerNight: { 1: 70, 2: 75 },
    extraBedPerNight: { 1: 0, 2: 5 },
  },
  {
    id: 'bfe8414c-97de-4aae-96c0-c6b0225d1a05',
    name: 'Matrimoniale Allegra',
    maxGuests: 3,
    pricePerNight: { 1: 80, 2: 80, 3: 90 },
    extraBedPerNight: { 1: 0, 2: 0, 3: 10 },
  },
  {
    id: '6a8870ce-be2b-41d9-971e-5c833a85eb4a',
    name: 'Matrimoniale Ambra',
    maxGuests: 3,
    pricePerNight: { 1: 80, 2: 80, 3: 90 },
    extraBedPerNight: { 1: 0, 2: 0, 3: 10 },
  },
  {
    id: '19ae4611-c0a4-42ae-8530-210f9a948e9e',
    name: 'Tripla Lena',
    maxGuests: 4,
    pricePerNight: { 1: 80, 2: 80, 3: 90, 4: 100 },
    extraBedPerNight: { 1: 0, 2: 0, 3: 0, 4: 10 },
  },
]

export type RoomPricing = {
  room: RoomInfo
  totalPerNight: number
  basePerNight: number
  extraPerNight: number
  extraBed: boolean
}

export function roomPricing(roomId: string, numGuests: number): RoomPricing | null {
  const room = ROOMS.find(r => r.id === roomId)
  if (!room || numGuests < 1 || numGuests > room.maxGuests) return null
  const totalPerNight = room.pricePerNight[numGuests]
  if (!totalPerNight) return null
  const extraPerNight = room.extraBedPerNight[numGuests] ?? 0
  return {
    room,
    totalPerNight,
    basePerNight: totalPerNight - extraPerNight,
    extraPerNight,
    extraBed: extraPerNight > 0,
  }
}
