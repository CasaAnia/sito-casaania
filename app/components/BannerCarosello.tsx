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
    <>
      <section className="relative h-[340px] md:h-[26rem] overflow-hidden bg-gray-100 flex items-end md:items-center">
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
        {/* Su mobile sfumatura solo in basso dietro al titolo; su desktop gradiente laterale dietro al testo */}
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_55%,rgba(0,0,0,0.18)_80%,rgba(0,0,0,0.38)_100%)] md:bg-[linear-gradient(90deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.32)_35%,rgba(0,0,0,0.08)_70%,rgba(0,0,0,0.02)_100%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 w-full hero-in">
          <div className="px-7 pb-8 md:py-0 md:pl-[8%] md:pr-8 md:max-w-[50%]">
            <h1
              className="font-semibold text-white text-[30px] leading-[1.15] tracking-[-0.02em] md:text-[44px] md:leading-[1.12] max-w-[700px] [text-shadow:0_2px_8px_rgba(0,0,0,0.20)] md:[text-shadow:0_1px_3px_rgba(0,0,0,0.45),0_2px_16px_rgba(0,0,0,0.45)]">
              {/* Lo spazio unificatore tiene "da Humanitas" sulla stessa riga:
                  su mobile spezza in "A soli 140 metri / da Humanitas" */}
              A soli 140 metri da&nbsp;Humanitas
            </h1>
            <div className="hidden md:block">
              <p
                className="text-white text-[20px] leading-normal max-w-[620px] mt-[18px]"
                style={{ textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}>
                Una casa accogliente e tranquilla dove sentirti vicino a chi ami, proprio quando ne hai più bisogno.
              </p>
              <p
                className="flex items-center gap-2 text-white font-semibold text-base mt-[18px]"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
                <MapPin size={18} strokeWidth={2} aria-hidden="true" />
                Circa 2 minuti a piedi da Humanitas
              </p>
              <Link href="/prenota"
                className="inline-flex items-center justify-center h-[52px] px-8 rounded-lg bg-green-700 hover:bg-green-800 transition active:scale-[0.97] text-white font-semibold text-base tracking-wide mt-6">
                VERIFICA DISPONIBILITÀ
              </Link>
            </div>
          </div>
        </div>
        {!reduce && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-[3px] w-24 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.35)', boxShadow: '0 1px 2px rgba(0,0,0,0.35)' }}>
            <div key={i} className="banner-progress-fill h-full rounded-full" style={{ background: '#ffffff' }} />
          </div>
        )}
      </section>
      {/* Su mobile il resto del testo sta sotto la foto, così la camera resta luminosa */}
      <div className="md:hidden px-7 pt-5 pb-1 hero-in" style={{ backgroundColor: '#f9f6f1' }}>
        <p className="text-[#3a3a35] text-[18px] font-normal leading-[1.55]">
          Una casa accogliente e tranquilla dove sentirti vicino a chi ami, proprio quando ne hai più bisogno.
        </p>
        <p className="flex items-center gap-2 text-[#1f3d2f] font-semibold text-[15px] mt-[26px]">
          <MapPin size={18} strokeWidth={2} aria-hidden="true" />
          Circa 2 minuti a piedi da Humanitas
        </p>
        <Link href="/prenota"
          className="inline-flex items-center justify-center h-[52px] px-8 rounded-lg bg-green-700 hover:bg-green-800 transition active:scale-[0.97] text-white font-semibold text-[15px] tracking-wide mt-[18px]">
          VERIFICA DISPONIBILITÀ
        </Link>
      </div>
    </>
  )
}
