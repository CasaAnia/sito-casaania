'use client'

import { useEffect } from 'react'

/**
 * Parallax leggero e performante per le foto con [data-parallax] (dentro un
 * riquadro overflow-hidden). Muove l'immagine di pochi pixel in base allo scroll,
 * solo quando è in vista, con requestAnimationFrame. Disattivo se il movimento
 * è ridotto: in quel caso il CSS riporta l'immagine ferma e piena.
 */
export default function ParallaxController() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    if (!els.length) return

    let ticking = false
    const update = () => {
      ticking = false
      const vh = window.innerHeight
      for (const el of els) {
        const frame = el.parentElement
        if (!frame) continue
        const rect = frame.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > vh) continue
        const progress = (vh - rect.top) / (vh + rect.height) // 0 → 1 mentre attraversa
        const py = -60 + progress * 30 // da -60 a -30 px (movimento ~30px, sempre coprente)
        el.style.transform = `translateY(${py}px)`
      }
    }
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update) }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return null
}
