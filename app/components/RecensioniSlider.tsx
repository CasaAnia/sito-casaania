'use client'

import { useEffect, useRef, useState } from 'react'

type Testimonial = { name: string; rating: number; text: string }

/**
 * Slider delle recensioni, mobile-first.
 *
 * Su smartphone mostra UNA recensione alla volta: lo scorrimento usa lo
 * scroll nativo con scroll-snap, così lo swipe col dito resta fluido e
 * naturale (niente drag simulato in JS). Su desktop le card diventano tre
 * affiancate e l'eventuale quarta si raggiunge con gli stessi puntini.
 *
 * I puntini indicano la posizione: si aggiornano leggendo scrollLeft
 * (via requestAnimationFrame) e un tocco sul puntino porta alla card.
 */
export default function RecensioniSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [positions, setPositions] = useState(testimonials.length)

  // Quante "posizioni" di scorrimento esistono: su mobile una per card,
  // su desktop meno (tre card sono già in vista).
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => {
      const step = stepWidth(track)
      const extra = Math.round((track.scrollWidth - track.clientWidth) / step)
      // Mai più puntini che recensioni (misure a zero durante il layout
      // potrebbero gonfiare il conto).
      setPositions(Math.min(testimonials.length, Math.max(1, extra + 1)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    return () => ro.disconnect()
  }, [testimonials.length])

  // Il conto è banale e setState non fa nulla se il valore non cambia:
  // niente requestAnimationFrame (in schede nascoste non scatterebbe).
  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    setActive(Math.min(positions - 1, Math.round(track.scrollLeft / stepWidth(track))))
  }

  const goTo = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: i * stepWidth(track), behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none"
        style={{ WebkitOverflowScrolling: 'touch' }}>
        {testimonials.map((t, i) => (
          <figure
            key={i}
            className="snap-start shrink-0 w-full md:w-[calc((100%-3rem)/3)] bg-white rounded-2xl p-7 border border-black/[0.04] flex flex-col"
            style={{ boxShadow: '0 1px 3px rgba(31,61,47,0.04)' }}>
            <p style={{ color: '#2d6a4f', fontSize: '17px' }} className="tracking-[0.15em] mb-4" aria-label={`${t.rating} stelle su 5`}>
              {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
            </p>
            <blockquote className="text-[#3a3a35] text-[16px] leading-[1.65] mb-5">
              "{t.text}"
            </blockquote>
            <figcaption className="text-[14px] font-semibold mt-auto" style={{ color: '#1f3d2f' }}>
              — {t.name}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Puntini: visibili solo quando c'è davvero altro da scorrere */}
      {positions > 1 && (
        <div className="flex justify-center gap-1 mt-5">
          {Array.from({ length: positions }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Vai alla recensione ${i + 1}`}
              aria-current={i === active}
              className="p-1.5 group">
              <span
                className="block w-[7px] h-[7px] rounded-full transition-[background-color,transform] duration-200"
                style={{
                  backgroundColor: i === active ? '#2d6a4f' : 'rgba(45,106,79,0.25)',
                  transform: i === active ? 'scale(1.15)' : 'scale(1)',
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Larghezza di un "passo" di scorrimento: una card più il suo spazio.
function stepWidth(track: HTMLDivElement) {
  const card = track.firstElementChild as HTMLElement | null
  if (!card) return 1
  const gap = parseFloat(getComputedStyle(track).columnGap || '0') || 0
  return card.offsetWidth + gap
}
