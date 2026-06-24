import Link from 'next/link'
import Image from 'next/image'

const PHONE = '3427004345'
const PHONE_DISPLAY = '342 700 4345'
const WA_LINK = `https://wa.me/39${PHONE}`
const TEL_LINK = `tel:+39${PHONE}`

const photos = [
  '/camere/singola/foto1.jpg',
  '/camere/singola/foto2.jpg',
  '/camere/singola/foto3.jpg',
]

export default function CameraSingola() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
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

        {/* TITOLO */}
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Camera Singola</h1>
        <p className="text-green-700 font-semibold text-lg mb-6">€60 / notte · 1–2 persone</p>

        {/* FOTO PRINCIPALE */}
        <div className="bg-green-50 rounded-2xl h-64 md:h-96 flex items-center justify-center text-6xl mb-4 overflow-hidden">
          🛏
        </div>

        {/* GALLERIA */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-green-50 rounded-xl h-24 flex items-center justify-center text-3xl">
              🛏
            </div>
          ))}
        </div>

        {/* DESCRIZIONE */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Descrizione</h2>
          <p className="text-gray-600 leading-relaxed">
            Camera accogliente con letto singolo, ideale per soggiorni brevi o prolungati vicino all'ospedale Humanitas.
            Ambiente tranquillo e curato, con possibilità di aggiungere un letto supplementare per una seconda persona.
          </p>
        </div>

        {/* SERVIZI */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Cosa è incluso</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            {['✅ Lenzuola e asciugamani', '✅ Wi-Fi gratuito', '✅ Bagno condiviso', '✅ Riscaldamento', '✅ Finestra con vista giardino', '✅ Letto supplementare disponibile'].map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        {/* PRENOTA */}
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
