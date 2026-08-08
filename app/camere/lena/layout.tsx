import { roomMetadata, RoomJsonLd, type RoomSeo } from '../roomSeo'

const room: RoomSeo = {
  slug: 'lena',
  name: 'Lena',
  summary:
    'La camera più spaziosa di Casa Ania, con bagno privato esterno e balcone con vista su Humanitas. Fino a 4 ospiti.',
  description:
    "Lena è la camera più spaziosa di Casa Ania: bagno privato esterno, balcone con vista su Humanitas e posto fino a 4 persone. A 140 metri dall'ospedale, da 80 € a notte.",
  image: '/camere/lena/foto1b.jpg',
  maxGuests: 4,
  bed: 'Tre posti letto, con possibilità di letto aggiuntivo per la quarta persona',
  bathroom: 'Bagno privato esterno',
}

export const metadata = roomMetadata(room)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RoomJsonLd room={room} />
      {children}
    </>
  )
}
