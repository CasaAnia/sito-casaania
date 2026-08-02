import type { Metadata } from 'next'
import { Suspense } from 'react'
import PrenotaClient from './PrenotaClient'

const TITLE = 'Prenota una camera – Casa Ania, a 140 m da Humanitas Rozzano'
const DESCRIPTION =
  "Verifica la disponibilità e prenota una delle quattro camere di Casa Ania, a 140 metri dall'ospedale Humanitas di Rozzano. Da 70 € a notte, risposta anche su WhatsApp."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/prenota' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function Prenota() {
  return (
    <Suspense fallback={null}>
      <PrenotaClient />
    </Suspense>
  )
}
