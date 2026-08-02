import { roomMetadata, RoomJsonLd, type RoomSeo } from '../roomSeo'

const room: RoomSeo = {
  slug: 'allegra',
  name: 'Allegra',
  summary: 'Camera matrimoniale luminosa con bagno in camera e balconcino privato.',
  description:
    "Allegra è una camera matrimoniale con bagno in camera e balconcino privato, a 140 metri dall'ospedale Humanitas di Rozzano. Da 80 € a notte, fino a 3 persone con letto aggiuntivo.",
  image: '/camere/allegra/foto1.jpg',
  maxGuests: 3,
  bed: 'Letto matrimoniale',
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
