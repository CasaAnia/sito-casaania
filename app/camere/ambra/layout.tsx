import { roomMetadata, RoomJsonLd, type RoomSeo } from '../roomSeo'

const room: RoomSeo = {
  slug: 'ambra',
  name: 'Ambra',
  summary: 'Camera matrimoniale luminosa dai toni caldi, tranquilla e confortevole, con bagno in camera.',
  description:
    "Ambra è una camera matrimoniale luminosa con bagno in camera, a 140 metri dall'ospedale Humanitas di Rozzano. Da 80 € a notte, fino a 3 persone con letto aggiuntivo.",
  image: '/camere/ambra/foto1.jpg',
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
