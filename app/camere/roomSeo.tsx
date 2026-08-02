import type { Metadata } from 'next'

export type RoomSeo = {
  slug: string
  name: string
  summary: string
  description: string
  image: string
  maxGuests: number
  bed: string
  bathroom: string
}

const SUFFIX = 'Casa Ania, a 140 m da Humanitas Rozzano'

export function roomMetadata(room: RoomSeo): Metadata {
  const title = `Camera ${room.name} – ${SUFFIX}`
  return {
    title,
    description: room.description,
    alternates: { canonical: `/camere/${room.slug}` },
    openGraph: {
      title,
      description: room.description,
      locale: 'it_IT',
      type: 'website',
      images: [{ url: room.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: room.description,
      images: [room.image],
    },
  }
}

export function RoomJsonLd({ room }: { room: RoomSeo }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: `Camera ${room.name}`,
    description: room.summary,
    url: `https://www.casaaniarozzano.it/camere/${room.slug}`,
    image: `https://www.casaaniarozzano.it${room.image}`,
    containedInPlace: { '@id': 'https://www.casaaniarozzano.it/#struttura' },
    occupancy: { '@type': 'QuantitativeValue', maxValue: room.maxGuests, unitCode: 'C62' },
    bed: room.bed,
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: room.bathroom, value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Aria condizionata', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi gratuito', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'TV', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Frigorifero', value: true },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
