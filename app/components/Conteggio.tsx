'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

function invia(tipo: string, pagina: string) {
  const corpo = JSON.stringify({ tipo, pagina })
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
