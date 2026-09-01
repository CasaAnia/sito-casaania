'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { aggiornaEsclusione, sendSiteEvent } from '@/lib/siteEvents'

export default function Conteggio() {
  const pathname = usePathname()

  useEffect(() => {
    // Link segreto per i telefoni di casa: ?noconta=1 esclude, ?noconta=0 riattiva.
    const esito = aggiornaEsclusione()
    if (esito === 'esclusa') window.alert('Fatto: da ora le visite da questo telefono non vengono contate.')
    if (esito === 'riattivata') window.alert('Fatto: le visite da questo telefono tornano a essere contate.')

    sendSiteEvent('visita', pathname)

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      const link = target?.closest?.('a')
      if (!link) return
      const href = link.getAttribute('href') || ''
      if (href.startsWith('https://wa.me/')) sendSiteEvent('whatsapp', pathname)
      else if (href.startsWith('tel:')) sendSiteEvent('telefono', pathname)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [pathname])

  return null
}
