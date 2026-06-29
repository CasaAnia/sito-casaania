'use client'
import Link from 'next/link'
import { useState } from 'react'

const PHONE = '3427004345'
const PHONE_DISPLAY = '342 700 4345'
const WA_LINK = `https://wa.me/39${PHONE}`
const TEL_LINK = `tel:+39${PHONE}`
const PHOTOS = [1, 2, 4, 3, 5, 7, 8, 9]

export default function CameraAllegra() {
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
          <img src={`/camere/allegra/foto${lightbox}.jpg`} alt=""
            className="max-w-full max-h-full object-contain"
            onClick={e => e.stopPropagation()} />
          <button className="absolute right-4 text-white text-4xl font-bold px-2"
            onClick={e => { e.stopPropagation(); setLightbox(PHOTOS[lightboxIdx < PHOTOS.length - 1 ? lightboxIdx + 1 : 0]) }}>›</button>
        </div>
      )}

      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 text-gray-400 hover:text-gray-600 text-sm" style={{fontFamily: "'Lora', serif"}}>
            ← Indietro
          </Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            style={{fontFamily: "'Lora', serif"}} className="bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-full tracking-widest uppercase">
            Prenota ora
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">

        <h1 style={{ fontFamily: "'Lora', serif" }} className="text-3xl font-semibold text-gray-500 mb-2 uppercase tracking-widest">Camera Matrimoniale Allegra</h1>
        <div className="flex gap-2 mb-3">
          <span style={{ fontFamily: "'Lora', serif" }} className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full">🚿 Bagno in camera</span>
          <span style={{ fontFamily: "'Lora', serif" }} className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full">🌿 Balconcino</span>
        </div>
        <p style={{ fontFamily: "'Lora', serif" }} className="text-gray-500 italic text-lg mb-5">Luminosa, con bagno in camera e balconcino tutto per sé.</p>
        <div className="border-t border-gray-200 pt-4 mb-8 grid grid-cols-2 gap-x-4">
          <p style={{ fontFamily: "'Lora', serif" }} className="text-sm text-gray-500">1–2 persone</p>
          <p style={{ fontFamily: "'Lora', serif" }} className="text-sm text-gray-500">3 persone (letto aggiuntivo)</p>
          <p style={{ fontFamily: "'Lora', serif" }} className="text-2xl font-semibold text-gray-800 mt-1">€80 <span className="text-sm font-normal text-gray-500">/ notte</span></p>
          <p style={{ fontFamily: "'Lora', serif" }} className="text-2xl font-semibold text-gray-800 mt-1">€90 <span className="text-sm font-normal text-gray-500">/ notte</span></p>
        </div>

        <div className="h-80 md:h-[500px] overflow-hidden mb-4 cursor-pointer -mx-4"
          onClick={() => setLightbox(1)}>
          <img src="/camere/allegra/foto1.jpg" alt="Camera Allegra" className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-3 mb-8 -mx-4">
          {[2, 4, 3, 5, 7, 8, 9].map(n => (
            <div key={n} className="overflow-hidden cursor-pointer" style={{ aspectRatio: '1/1' }}
              onClick={() => setLightbox(n)}>
              <img src={`/camere/allegra/foto${n}.jpg`} alt={`Camera Allegra ${n}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 style={{ fontFamily: "'Lora', serif" }} className="text-xl font-semibold mb-3 text-gray-800">Descrizione</h2>
          <p style={{ fontFamily: "'Lora', serif" }} className="text-gray-600 leading-relaxed mb-3">
            Allegra è una camera matrimoniale comoda e luminosa, con bagno privato all'interno della stanza.
            Letto matrimoniale con lenzuola stiratissime e profumate, tutto il calore di una casa dove ci si sente subito a proprio agio.
          </p>
          <p style={{ fontFamily: "'Lora', serif" }} className="text-gray-600 leading-relaxed">
            Ha un balconcino privato — tutto per sé, senza condivisione. Un angolo tranquillo dove prendere un po' d'aria dopo una giornata in ospedale.
          </p>
        </div>

        <div className="mb-8">
          <h2 style={{ fontFamily: "'Lora', serif" }} className="text-xl font-semibold mb-3 text-gray-800">Ogni soggiorno include</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
            {[
              '✓ Aria condizionata e riscaldamento',
              '✓ WiFi veloce gratuito',
              '✓ TV',
              '✓ Piccolo frigorifero',
              '✓ Phon',
              '✓ Lenzuola e 3 asciugamani (telo doccia, viso e mani)',
              '✓ Cambio lenzuola e asciugamani ogni 4 notti con pulizia completa della camera',
              '✓ Bagno schiuma, sapone e carta igienica',
              '✓ Letto supplementare su richiesta',
            ].map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 text-center">
          <p style={{ fontFamily: "'Lora', serif" }} className="text-xl font-semibold text-gray-800 mb-2">Verifica la disponibilità</p>
          <p className="text-sm text-gray-500 mb-5">Contattaci su WhatsApp o per telefono</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="bg-green-700 text-white font-bold px-6 py-3 rounded-full text-sm">
              💬 WhatsApp
            </a>
            <a href={TEL_LINK}
              className="border border-gray-300 text-gray-800 font-bold px-6 py-3 rounded-full text-sm">
              📞 {PHONE_DISPLAY}
            </a>
          </div>
        </div>

      </div>
    </main>
  )
}
