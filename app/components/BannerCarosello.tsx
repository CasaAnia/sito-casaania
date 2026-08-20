'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react'

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
    <section className="relative min-h-72 md:h-[26rem] overflow-hidden bg-gray-100 flex items-center">
      {fotos.map((f, idx) => (
        <Image
          key={idx}
          src={f.src}
          alt={f.alt}
          fill
          sizes="100vw"
          preload={idx === 0}
          className={`object-cover ${reduce ? '' : 'kenburns'}`}
          style={{ opacity: idx === i ? 1 : 0, transition: 'opacity 900ms ease-in-out' }}
        />
      ))}
      {/* Scurimento leggero per far leggere il testo sulla foto (un po' più marcato su mobile) */}
      <div className="absolute inset-0 bg-black/45 md:bg-black/35" aria-hidden="true" />
      <div className="relative z-10 w-full hero-in">
        <div className="px-6 py-10 md:py-0 md:pl-[8%] md:pr-8 md:max-w-[50%]">
          <h1
            className="font-display font-bold text-white text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] max-w-[700px]"
            style={{ textShadow: '0 2px 14px rgba(0,0,0,0.4)' }}>
            Casa Ania, a soli 140 metri da Humanitas
          </h1>
          <p
            className="text-white text-[17px] md:text-[20px] leading-normal max-w-[620px] mt-[18px]"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}>
            Una casa accogliente e tranquilla dove sentirti vicino a chi ami, proprio quando ne hai più bisogno.
          </p>
          <p
            className="flex items-center gap-2 text-white font-semibold text-[15px] md:text-base mt-[18px]"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
            <MapPin size={18} strokeWidth={2.25} aria-hidden="true" />
            Circa 2 minuti a piedi da Humanitas
          </p>
          <Link href="/prenota"
            className="inline-flex items-center justify-center h-[52px] px-8 rounded-md bg-green-700 hover:bg-green-800 transition active:scale-[0.97] text-white font-semibold text-[15px] md:text-base tracking-wide mt-6">
            VERIFICA DISPONIBILITÀ
          </Link>
        </div>
      </div>
      {!reduce && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-[3px] w-24 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.35)', boxShadow: '0 1px 2px rgba(0,0,0,0.35)' }}>
          <div key={i} className="banner-progress-fill h-full rounded-full" style={{ background: '#ffffff' }} />
        </div>
      )}
    </section>
  )
}
