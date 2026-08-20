'use client'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../components/Logo'
import Lightbox from '../../components/Lightbox'
import { useState } from 'react'

const PHONE = '3427004354'
const PHONE_DISPLAY = '342 700 4354'
const WA_LINK = `https://wa.me/39${PHONE}`
const TEL_LINK = `tel:+39${PHONE}`
const PHOTOS = [1, 2, 5, 3, 6, 8, 7, 10, 11, 12]

export default function CameraSingola() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <main className="min-h-screen text-[#3a3a35]" style={{ backgroundColor: '#f9f6f1' }}>

      {/* LIGHTBOX */}
      <Lightbox photos={PHOTOS} current={lightbox} src={n => `/camere/singola/foto${n}.jpg`}
        onClose={() => setLightbox(null)} onChange={setLightbox} />

      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <Link href="/" className="justify-self-start text-green-800 font-bold hover:text-green-600 transition-colors whitespace-nowrap">
            ← Indietro
          </Link>
          <Link href="/" className="justify-self-center">
            <Logo compactOnMobile />
          </Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="justify-self-end bg-green-700 hover:bg-green-800 transition-colors text-white text-xs font-semibold px-4 py-3 rounded-full tracking-widest uppercase whitespace-nowrap">
            Prenota ora
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">

        <h1 className="font-display text-3xl font-semibold text-[#3a3a35] mb-2 tracking-wide">Amelia</h1>
        <div className="flex gap-2 mb-3">
          <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full">🚿 Bagno in camera</span>
          <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full">🌿 Balcone condiviso</span>
        </div>
        <p className="text-[#3a3a35] text-lg mb-5">Piccola, curata, silenziosa — nel cuore di Casa Ania, con vista sulla clinica Humanitas.</p>
        <div className="border-t border-gray-200 pt-4 mb-8 grid grid-cols-2 gap-x-4">
          <p className="text-sm text-[#3a3a35]">1 persona</p>
          <p className="text-sm text-[#3a3a35]">2 persone (letto aggiuntivo)</p>
          <p className="text-2xl font-semibold text-[#1f3d2f] mt-1">€70 <span className="text-xs font-normal text-[#6f6a5e]">/ notte</span></p>
          <p className="text-2xl font-semibold text-[#1f3d2f] mt-1">€75 <span className="text-xs font-normal text-[#6f6a5e]">/ notte</span></p>
        </div>

        <div className="relative h-80 md:h-[500px] overflow-hidden mb-4 cursor-pointer -mx-4"
          onClick={() => setLightbox(1)}>
          <Image src="/camere/singola/foto1.jpg" alt="Camera Amelia" fill preload sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
        </div>

        <div className="grid grid-cols-3 mb-8 -mx-4">
          {[2, 5, 3, 6, 8, 7, 10, 11, 12].map(n => (
            <div key={n} className="relative overflow-hidden cursor-pointer" style={{ aspectRatio: '1/1' }}
              onClick={() => setLightbox(n)}>
              <Image src={`/camere/singola/foto${n}.jpg`} alt={`Camera Amelia ${n}`} fill sizes="(min-width: 896px) 300px, 33vw" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <Link href="/prenota?room=fed43a69-5e19-4cf9-b1b3-64affa46f9b1"
            className="inline-block bg-green-700 hover:bg-green-800 transition-colors text-white font-bold px-8 py-3 rounded-full text-sm uppercase">
            Prenota ora
          </Link>
        </div>

        <div className="border-t border-gray-200 pt-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-3 text-[#3a3a35] tracking-wide">Descrizione</h2>
          <p className="text-[#3a3a35] leading-relaxed text-lg mb-3">
            Amelia è la camera più piccola e raccolta di Casa Ania, pensata soprattutto per chi viaggia da solo e cerca un ambiente tranquillo, semplice e curato.
          </p>
          <p className="text-[#3a3a35] leading-relaxed text-lg mb-3">
            Ha un letto singolo e bagno privato direttamente in camera, con tutto ciò che serve per un soggiorno comodo e indipendente. All'occorrenza è possibile aggiungere un secondo letto: lo spazio diventa più intimo, ma rimane accogliente e funzionale.
          </p>
          <p className="text-[#3a3a35] leading-relaxed text-lg mb-3">
            Amelia condivide con Lena il balcone con vista sulla clinica Humanitas, dove è possibile uscire per prendere un po' d'aria durante la giornata.
          </p>
          <p className="text-[#3a3a35] leading-relaxed text-lg">
            Piccola nelle dimensioni, ma preparata con la stessa attenzione delle altre camere: biancheria fresca, ordine, pulizia e quella cura dei dettagli che caratterizza Casa Ania.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-3 text-[#3a3a35] tracking-wide">Ogni soggiorno include</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#3a3a35] text-lg">
            {[
              '✓ Bagno privato',
              '✓ Aria condizionata e riscaldamento',
              '✓ WiFi veloce gratuito',
              '✓ TV',
              '✓ Piccolo frigorifero',
              '✓ Phon',
              '✓ Lenzuola e 3 asciugamani (telo doccia, viso e mani)',
              '✓ Bagno schiuma, sapone mani e carta igienica',
              '✓ Cambio lenzuola e asciugamani ogni 4 notti con pulizia completa della camera',
            ].map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl p-6 text-center">
          <p style={{ color: '#2d6a4f' }} className="text-lg font-semibold uppercase tracking-wider mb-2">Verifica la disponibilità</p>
          <p className="text-sm text-[#3a3a35] mb-5">Contattaci su WhatsApp o per telefono</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="bg-green-700 hover:bg-green-800 transition-colors text-white font-bold px-6 py-3 rounded-full text-lg">
              💬 WhatsApp
            </a>
            <a href={TEL_LINK}
              className="border border-gray-300 text-[#1f3d2f] font-bold px-6 py-3 rounded-full text-lg">
              📞 {PHONE_DISPLAY}
            </a>
          </div>
        </div>

      </div>

      <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
        className="md:hidden fixed bottom-5 right-5 z-50 bg-green-700 hover:bg-green-800 transition-colors text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg wa-pulse">
        💬
      </a>
    </main>
  )
}
