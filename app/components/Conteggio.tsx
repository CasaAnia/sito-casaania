'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const NOSTRI_DOMINI = ['casaaniarozzano.it']

// Da dove arriva chi sta guardando la pagina: il sito che l'ha mandato qui,
// oppure l'etichetta della campagna se il link arriva da un annuncio.
// Nessun dato della persona, solo la provenienza del clic.
function origine(): { fonte: string; campagna: string | null } {
  const params = new URLSearchParams(window.location.search)
  const campagna = (params.get('utm_campaign') || '').slice(0, 80) || null

  const utmSource = params.get('utm_source')
  if (utmSource) return { fonte: utmSource.toLowerCase().slice(0, 80), campagna }
  if (params.get('gclid')) return { fonte: 'google-ads', campagna }

  const ref = document.referrer
  if (!ref) return { fonte: 'diretto', campagna }

  try {
    const host = new URL(ref).hostname.replace(/^www\./, '').toLowerCase()
    if (NOSTRI_DOMINI.includes(host)) return { fonte: 'interno', campagna }
    return { fonte: host.slice(0, 80), campagna }
  } catch {
    return { fonte: 'sconosciuto', campagna }
  }
}

function invia(tipo: string, pagina: string) {
  const { fonte, campagna } = origine()
  const corpo = JSON.stringify({ tipo, pagina, fonte, campagna })
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/eventi', new Blob([corpo], { type: 'application/json' }))
      return
    }
    fetch('/api/eventi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: corpo,
      keepalive: true,
    })
  } catch {
    // Il conteggio non deve mai disturbare chi sta navigando.
  }
}

export default function Conteggio() {
  const pathname = usePathname()

  useEffect(() => {
    invia('visita', pathname)

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      const link = target?.closest?.('a')
      if (!link) return
      const href = link.getAttribute('href') || ''
      if (href.startsWith('https://wa.me/')) invia('whatsapp', pathname)
      else if (href.startsWith('tel:')) invia('telefono', pathname)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [pathname])

  return null
}
