'use client'

import { useEffect, useState } from 'react'

// Foto del carosello (una per camera + il terrazzo con vista Humanitas).
// Facile da cambiare: basta modificare questa lista.
const fotos = [
  { src: '/camere/ambra/foto1.jpg', alt: 'Camera Ambra di Casa Ania' },
  { src: '/camere/lena/lena-banner.jpg', alt: 'Camera Lena di Casa Ania' },
  { src: '/camere/allegra/foto1.jpg', alt: 'Camera Allegra di Casa Ania' },
  { src: '/camere/singola/amelia-banner.jpg', alt: 'Camera Amelia di Casa Ania' },
  { src: '/camere/spazi-comuni/balcone-5.jpg', alt: 'Balcone con vista su Humanitas' },
  { src: '/camere/spazi-comuni/foto2.jpg', alt: 'Angolo caffè con macchina Nespresso' },
]

export default function BannerCarosello() {
  const [i, setI] = useState(0)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(m.matches)
    if (m.matches) return
    const t = setInterval(() => setI((x) => (x + 1) % fotos.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative h-72 md:h-[26rem] overflow-hidden bg-gray-100">
      {fotos.map((f, idx) => (
        <img
          key={idx}
          src={f.src}
          alt={f.alt}
          className={`absolute inset-0 w-full h-full object-cover ${reduce ? '' : 'kenburns'}`}
          style={{ opacity: idx === i ? 1 : 0, transition: 'opacity 900ms ease-in-out' }}
        />
      ))}
      {!reduce && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-1.5">
          {fotos.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Mostra foto ${idx + 1}`}
              onClick={() => setI(idx)}
              className="p-1.5"
            >
              <span
                className="block h-1 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: idx === i ? '18px' : '5px',
                  background: idx === i ? '#ffffff' : 'rgba(255,255,255,0.55)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.35)',
                }}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
