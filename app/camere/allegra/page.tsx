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
const PHOTOS = [1, 2, 4, 3, 5, 7, 8, 9]

export default function CameraAllegra() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <main className="min-h-screen text-[#3a3a35]" style={{ backgroundColor: '#f9f6f1' }}>

      {/* LIGHTBOX */}
      <Lightbox photos={PHOTOS} current={lightbox} src={n => `/camere/allegra/foto${n}.jpg`}
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

        <h1 className="font-display text-3xl font-semibold text-[#3a3a35] mb-2 tracking-wide">Allegra</h1>
        <div className="flex gap-2 mb-3">
          <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full">🚿 Bagno in camera</span>
          <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full">🌿 Balconcino</span>
        </div>
        <p className="text-[#3a3a35] text-lg mb-5">Luminosa, con bagno in camera e balconcino tutto per sé.</p>
        <div className="border-t border-gray-200 pt-4 mb-8 grid grid-cols-2 gap-x-4">
          <p className="text-sm text-[#3a3a35]">1–2 persone</p>
          <p className="text-sm text-[#3a3a35]">3 persone (letto aggiuntivo)</p>
          <p className="text-2xl font-semibold text-[#1f3d2f] mt-1">€80 <span className="text-xs font-normal text-[#6f6a5e]">/ notte</span></p>
          <p className="text-2xl font-semibold text-[#1f3d2f] mt-1">€90 <span className="text-xs font-normal text-[#6f6a5e]">/ notte</span></p>
        </div>

        <div className="relative h-80 md:h-[500px] overflow-hidden mb-4 cursor-pointer -mx-4"
          onClick={() => setLightbox(1)}>
          <Image src="/camere/allegra/foto1.jpg" alt="Camera Allegra" fill preload sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
        </div>

        <div className="grid grid-cols-3 mb-8 -mx-4">
          {[2, 4, 3, 5, 7, 8, 9].map(n => (
            <div key={n} className="relative overflow-hidden cursor-pointer" style={{ aspectRatio: '1/1' }}
              onClick={() => setLightbox(n)}>
              <Image src={`/camere/allegra/foto${n}.jpg`} alt={`Camera Allegra ${n}`} fill sizes="(min-width: 896px) 300px, 33vw" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <Link href="/prenota?room=bfe8414c-97de-4aae-96c0-c6b0225d1a05"
            className="inline-block bg-green-700 hover:bg-green-800 transition-colors text-white font-bold px-8 py-3 rounded-full text-sm uppercase">
            Prenota ora
          </Link>
        </div>

        <div className="border-t border-gray-200 pt-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-3 text-[#3a3a35] tracking-wide">Descrizione</h2>
          <p className="text-[#3a3a35] leading-relaxed text-lg mb-3">
            Allegra è una camera matrimoniale luminosa e accogliente, con bagno privato in camera e un balconcino tutto per sé.
          </p>
          <p className="text-[#3a3a35] leading-relaxed text-lg mb-3">
            Il balconcino è ad uso esclusivo degli ospiti di Allegra: un piccolo spazio privato dove prendere un po' d'aria e concedersi un momento di tranquillità dopo una giornata fuori.
          </p>
          <p className="text-[#3a3a35] leading-relaxed text-lg">
            Il letto matrimoniale è preparato con biancheria fresca e curata e la camera può ospitare una o due persone; all'occorrenza è possibile aggiungere un terzo letto. Un ambiente semplice e confortevole, pensato per far sentire a casa fin dal primo momento.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-3 text-[#3a3a35] tracking-wide">Ogni soggiorno include</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#3a3a35] text-lg">
            {[
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
