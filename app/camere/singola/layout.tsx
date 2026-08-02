import { roomMetadata, RoomJsonLd, type RoomSeo } from '../roomSeo'

const room: RoomSeo = {
  slug: 'singola',
  name: 'Amelia',
  summary:
    'Camera singola curata e silenziosa, con bagno in camera e vista sulla clinica Humanitas.',
  description:
    "Amelia è la camera singola di Casa Ania: curata, silenziosa, con bagno in camera e vista su Humanitas. A 140 metri dall'ospedale, da 70 € a notte, ideale per soggiorni brevi.",
  image: '/camere/singola/foto1.jpg',
  maxGuests: 2,
  bed: 'Letto singolo con possibilità di letto aggiuntivo',
  bathroom: 'Bagno in camera',
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
