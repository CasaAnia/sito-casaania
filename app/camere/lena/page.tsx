import Link from 'next/link'

const PHONE = '3427004345'
const PHONE_DISPLAY = '342 700 4345'
const WA_LINK = `https://wa.me/39${PHONE}`
const TEL_LINK = `tel:+39${PHONE}`

export default function CameraLena() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

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

        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-bold text-gray-800">Camera Lena</h1>
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">Bagno privato</span>
        </div>
        <p className="text-green-700 font-semibold text-lg mb-6">€99 / notte · 2–4 persone</p>

        <div className="rounded-2xl h-64 md:h-96 overflow-hidden mb-4">
          <img src="/camere/Lena/foto1.jpg" alt="Camera Lena" className="w-full h-full object-cover" />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Descrizione</h2>
          <p className="text-gray-600 leading-relaxed">
            La nostra camera più spaziosa, con bagno privato esterno dedicato. Ideale per famiglie o gruppi
            fino a 4 persone. Ampia, confortevole e dotata di tutto il necessario per un soggiorno piacevole
            vicino all'ospedale Humanitas.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Cosa è incluso</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            {['✅ Lenzuola e asciugamani', '✅ Wi-Fi gratuito', '✅ Bagno privato esterno', '✅ Riscaldamento', '✅ Letto matrimoniale', '✅ Letti supplementari disponibili', '✅ Armadio grande', '✅ Ideale per famiglie'].map(s => (
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
