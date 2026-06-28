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

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&display=swap');`}</style>

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

        <h1 style={{ fontFamily: "'Lora', serif" }} className="text-3xl font-semibold text-gray-800 mb-2">Camera Singola Amelia</h1>
        <p style={{ fontFamily: "'Lora', serif" }} className="text-gray-500 italic text-lg mb-4">Piccola, curata, silenziosa — nel cuore di Casa Ania, con vista sulla clinica Humanitas.</p>
        <div className="flex flex-col gap-1 mb-6">
          <p className="text-green-700 text-base">€70 a notte · per una persona</p>
          <p className="text-green-700 text-base">€75 a notte · per due persone, con letto aggiuntivo</p>
        </div>

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
          <h2 style={{ fontFamily: "'Lora', serif" }} className="text-xl font-semibold mb-3 text-gray-800">Descrizione</h2>
          <p style={{ fontFamily: "'Lora', serif" }} className="text-gray-600 leading-relaxed mb-3">
            Amelia è la camera più piccola di Casa Ania — compatta, raccolta, ma curatissima in ogni dettaglio.
            Letto singolo con lenzuola stiratissime e profumate, bagno privato, e tutto il calore di una casa dove ci si sente subito a proprio agio.
          </p>
          <p style={{ fontFamily: "'Lora', serif" }} className="text-gray-600 leading-relaxed mb-3">
            Amelia e Lena condividono un balcone con vista sulla clinica Humanitas: uno spazio piccolo ma speciale,
            dove spesso nascono chiacchiere spontanee tra ospiti. Chi arriva da solo trova, senza cercarlo, un po' di compagnia.
            Capita di scambiare qualche parola con chi soggiorna nella camera accanto — momenti semplici, ma che rendono il soggiorno un po' più umano.
          </p>
          <p style={{ fontFamily: "'Lora', serif" }} className="text-gray-600 leading-relaxed">
            Si può aggiungere un secondo letto — la camera è intima, ma accogliente come tutto il resto della casa.
          </p>
        </div>

        <div className="mb-8">
          <h2 style={{ fontFamily: "'Lora', serif" }} className="text-xl font-semibold mb-3 text-gray-800">Ogni soggiorno include</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            {[
              '✅ Bagno privato',
              '✅ Aria condizionata e riscaldamento',
              '✅ Wi-Fi gratuito e veloce',
              '✅ TV',
              '✅ Piccolo frigorifero',
              '✅ Lenzuola e 3 asciugamani (telo doccia, viso e mani)',
              '✅ Cambio lenzuola e asciugamani ogni 4 notti',
              '✅ Letto supplementare su richiesta',
            ].map(s => (
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
