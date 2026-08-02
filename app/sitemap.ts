import type { MetadataRoute } from 'next'

const BASE = 'https://www.casaaniarozzano.it'

// Aggiornare quando cambiano i contenuti delle pagine, non a ogni build:
// una data che cambia da sola a ogni deploy non dice niente a Google.
const LAST_UPDATE = new Date('2026-08-02')

const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/dormire-vicino-humanitas', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/camere/ambra', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/camere/allegra', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/camere/lena', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/camere/singola', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/prenota', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/recensioni', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/info', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/cookie', priority: 0.2, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified: LAST_UPDATE,
    changeFrequency,
    priority,
  }))
}
