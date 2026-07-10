'use client'
import Link from 'next/link'
import Logo from '../../components/Logo'
import { useState } from 'react'

const PHONE = '3427004354'
const PHONE_DISPLAY = '342 700 4354'
const WA_LINK = `https://wa.me/39${PHONE}`
const TEL_LINK = `tel:+39${PHONE}`
const PHOTOS = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15]

export default function CameraLena() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const lightboxIdx = lightbox !== null ? PHOTOS.indexOf(lightbox) : -1

  return (
    <main className="min-h-screen text-gray-900" style={{ backgroundColor: '#f9f6f1' }}>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white text-3xl font-bold">✕</button>
          <button className="absolute left-4 text-white text-4xl font-bold px-2"
            onClick={e => { e.stopPropagation(); setLightbox(PHOTOS[lightboxIdx > 0 ? lightboxIdx - 1 : PHOTOS.length - 1]) }}>‹</button>
          <img src={`/camere/lena/foto${lightbox === 1 ? '1b' : lightbox}.jpg`} alt=""
            className="max-w-full max-h-full object-contain"
            onClick={e => e.stopPropagation()} />
          <button className="absolute right-4 text-white text-4xl font-bold px-2"
            onClick={e => { e.stopPropagation(); setLightbox(PHOTOS[lightboxIdx < PHOTOS.length - 1 ? lightboxIdx + 1 : 0]) }}>›</button>
        </div>
      )}

      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <Link href="/" className="justify-self-start text-green-800 font-bold hover:text-green-600 transition-colors whitespace-nowrap">
            ← Indietro
          </Link>
          <Link href="/" className="justify-self-center">
            <Logo compactOnMobile />
          </Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="justify-self-end bg-green-700 hover:bg-green-800 transition-colors text-white text-xs font-semibold px-4 py-2 rounded-full tracking-widest uppercase whitespace-nowrap">
            Prenota ora
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">

        <h1 className="font-display text-3xl font-semibold text-gray-700 mb-2 tracking-wide">Lena</h1>
        <div className="flex gap-2 mb-3">
          <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full">🚿 Bagno esterno</span>
          <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full">🌿 Balcone condiviso</span>
        </div>
        <p className="text-[#3a3a35] text-lg mb-5">La più spaziosa di Casa Ania — con bagno privato esterno e balcone con vista su Humanitas.</p>
        <div className="border-t border-gray-200 pt-4 mb-8 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4">
          <div>
            <p className="text-sm text-gray-700">1–2 persone</p>
            <p className="text-2xl font-semibold text-[#1f3d2f] mt-1">€80 <span className="text-xs font-normal text-[#6f6a5e]">/ notte</span></p>
          </div>
          <div>
            <p className="text-sm text-gray-700">3 persone (letto aggiuntivo)</p>
            <p className="text-2xl font-semibold text-[#1f3d2f] mt-1">€90 <span className="text-xs font-normal text-[#6f6a5e]">/ notte</span></p>
          </div>
          <div>
            <p className="text-sm text-gray-700">4 persone (due letti aggiuntivi)</p>
            <p className="text-2xl font-semibold text-[#1f3d2f] mt-1">€100 <span className="text-xs font-normal text-[#6f6a5e]">/ notte</span></p>
          </div>
        </div>

        <div className="h-80 md:h-[500px] overflow-hidden mb-4 cursor-pointer -mx-4 bg-gray-100"
          onClick={() => setLightbox(1)}>
          <img src="/camere/lena/foto1b.jpg" alt="Camera Lena" className="w-full h-full object-contain" />
        </div>

        <div className="grid grid-cols-2 mb-8 -mx-4">
          {[2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(n => (
            <div key={n} className="overflow-hidden cursor-pointer" style={{ aspectRatio: '1/1' }}
              onClick={() => setLightbox(n)}>
              <img src={`/camere/lena/foto${n}.jpg`} alt={`Camera Lena ${n}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <Link href="/prenota?room=19ae4611-c0a4-42ae-8530-210f9a948e9e"
            className="inline-block bg-green-700 hover:bg-green-800 transition-colors text-white font-bold px-8 py-3 rounded-full text-sm uppercase">
            Prenota ora
          </Link>
        </div>

        <div className="border-t border-gray-200 pt-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-3 text-gray-700 tracking-wide">Descrizione</h2>
          <p className="text-[#3a3a35] leading-relaxed text-lg mb-3">
            Lena è la camera più grande di Casa Ania — spaziosa, luminosa, con tutto lo spazio che serve anche quando si è in più persone.
            Letto matrimoniale con lenzuola curate nei minimi dettagli, morbide e profumate di fresco, e tutto il calore di una casa che accoglie.
          </p>
          <p className="text-[#3a3a35] leading-relaxed text-lg mb-3">
            Ha un bagno privato esterno — a un metro dalla stanza, chiuso a chiave, riservato esclusivamente a chi soggiorna in Lena.
          </p>
          <p className="text-[#3a3a35] leading-relaxed text-lg">
            Lena e Amelia condividono un balcone con vista sulla clinica Humanitas: uno spazio piccolo ma speciale,
            dove spesso nascono chiacchiere spontanee tra ospiti. Chi arriva da solo trova, senza cercarlo, un po' di compagnia.
            Capita di scambiare qualche parola con chi soggiorna nella camera accanto — momenti semplici, ma che rendono il soggiorno un po' più umano.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-3 text-gray-700 tracking-wide">Ogni soggiorno include</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#3a3a35] text-lg">
            {[
              '✓ Bagno privato esterno (esclusivo)',
              '✓ Balcone con vista su Humanitas',
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
          <p className="text-sm text-gray-700 mb-5">Contattaci su WhatsApp o per telefono</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="bg-green-700 hover:bg-green-800 transition-colors text-white font-bold px-6 py-3 rounded-full text-lg">
              💬 WhatsApp
            </a>
            <a href={TEL_LINK}
              className="border border-gray-300 text-gray-800 font-bold px-6 py-3 rounded-full text-lg">
              📞 {PHONE_DISPLAY}
            </a>
          </div>
        </div>

      </div>

      <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
        className="md:hidden fixed bottom-5 right-5 z-50 bg-green-700 hover:bg-green-800 transition-colors text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg">
        💬
      </a>
    </main>
  )
}
