'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Comparsa morbida allo scroll (fade + salita leggera), stile Emil Kowalski.
 *
 * Sicurezza prima di tutto: il contenuto è visibile di default nell'HTML. Solo
 * dopo il montaggio del JS aggiungiamo `reveal-ready` (che lo nasconde) e poi
 * `reveal-in` quando entra in vista. Perché nulla resti MAI invisibile:
 *  - se il movimento è ridotto o l'osservatore non esiste → si mostra subito;
 *  - se l'elemento è già in vista al montaggio → si mostra subito;
 *  - una rete di sicurezza lo rivela comunque entro 1,8s (copre gli scroll che
 *    "saltano" oltre l'elemento, dove l'osservatore potrebbe non scattare).
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li'
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      el.classList.add('reveal-ready', 'reveal-in')
      return
    }

    el.classList.add('reveal-ready')
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)

    let done = false
    let safety: ReturnType<typeof setTimeout>
    const reveal = () => {
      if (done) return
      done = true
      el.classList.add('reveal-in')
      io.disconnect()
      clearTimeout(safety)
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) reveal()
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)

    // Già in vista (o sopra) al montaggio: rivela subito.
    if (el.getBoundingClientRect().top < window.innerHeight) reveal()
    // Rete di sicurezza: non lasciare mai nascosto.
    safety = setTimeout(reveal, 1800)

    return () => {
      io.disconnect()
      clearTimeout(safety)
    }
  }, [delay])

  return (
    <Tag ref={ref as never} className={`reveal ${className}`}>
      {children}
    </Tag>
  )
}
