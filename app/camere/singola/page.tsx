'use client'
import Link from 'next/link'
import { useState } from 'react'

const PHONE = '3427004345'
const PHONE_DISPLAY = '342 700 4345'
const WA_LINK = `https://wa.me/39${PHONE}`
const TEL_LINK = `tel:+39${PHONE}`
const PHOTOS = [1, 2, 5, 3, 4, 6, 8, 7, 10, 11, 12]

export default function CameraSingola() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const lightboxIdx = lightbox !== null ? PHOTOS.indexOf(lightbox) : -1

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white text-3xl font-bold">✕</button>
          <button className="absolute left-4 text-white text-4xl font-bold px-2"
            onClick={e => { e.stopPropagation(); setLightbox(PHOTOS[lightboxIdx > 0 ? lightboxIdx - 1 : PHOTOS.length - 1]) }}>‹</button>
          <img src={`/camere/singola/foto${lightbox}.jpg`} alt=""
            className="max-w-full max-h-full object-contain rounded-xl"
            onClick={e => e.stopPropagation()} />
          <button className="absolute right-4 text-white text-4xl font-bold px-2"
            onClick={e => { e.stopPropagation(); setLightbox(PHOTOS[lightboxIdx < PHOTOS.length - 1 ? lightboxIdx + 1 : 0]) }}>›</button>
        </div>
      )}

      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-green-800 font-bold">
            ← Casa Ania Rozzano
          </Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
            Prenota ora
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-1">Camera Singola Amelia</h1>
        <p className="text-green-700 font-semibold text-lg mb-6">€70 / notte · 1–2 persone</p>

        <div className="rounded-2xl h-80 md:h-[500px] overflow-hidden mb-4 cursor-pointer"
          onClick={() => setLightbox(1)}>
          <img src="/camere/singola/foto1.jpg" alt="Camera Singola" className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-3 gap-2 mb-8">
          {[2, 5, 3, 4, 6, 8, 7, 10, 11, 12].map(n => (
            <div key={n} className="rounded-xl h-24 overflow-hidden cursor-pointer"
              onClick={() => setLightbox(n)}>
              <img src={`/camere/singola/foto${n}.jpg`} alt={`Camera Singola ${n}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Descrizione</h2>
          <p className="text-gray-600 leading-relaxed">
            Camera accogliente con letto singolo, ideale per soggiorni brevi o prolungati vicino all'ospedale Humanitas.
            Ambiente tranquillo e curato, con possibilità di aggiungere un letto supplementare per una seconda persona.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Cosa è incluso</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            {['✅ Lenzuola e asciugamani', '✅ Wi-Fi gratuito', '✅ Bagno condiviso', '✅ Riscaldamento', '✅ Finestra con vista giardino', '✅ Letto supplementare disponibile'].map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="bg-green-800 rounded-2xl p-6 text-white text-center">
          <p className="font-bold text-lg mb-1">Prenota questa camera</p>
          <p className="text-green-200 text-sm mb-4">Contattaci su WhatsApp o per telefono</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="bg-white text-green-800 font-bold px-6 py-3 rounded-full text-sm">
              💬 WhatsApp
            </a>
            <a href={TEL_LINK}
              className="border-2 border-white text-white font-bold px-6 py-3 rounded-full text-sm">
              📞 {PHONE_DISPLAY}
            </a>
          </div>
        </div>

      </div>
    </main>
  )
}
