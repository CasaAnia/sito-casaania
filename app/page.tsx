import Link from 'next/link'

const PHONE = '3427004345'
const PHONE_DISPLAY = '342 700 4345'
const WA_LINK = `https://wa.me/39${PHONE}`
const TEL_LINK = `tel:+39${PHONE}`

const rooms = [
  {
    name: 'Camera Singola',
    desc: 'Camera accogliente con letto singolo. Ideale per soggiorni brevi, con possibilità di aggiungere un letto supplementare.',
    price: 70,
    guests: '1–2 persone',
    img: '/camere/singola/foto1.jpg',
    href: '/camere/singola',
  },
  {
    name: 'Camera Matrimoniale Allegra',
    desc: 'Spaziosa camera matrimoniale con bagno condiviso. Perfetta per coppie o familiari in visita.',
    price: 80,
    guests: '2 persone',
    img: '/camere/allegra/foto1.jpg',
    href: '/camere/allegra',
  },
  {
    name: 'Camera Matrimoniale Ambra',
    desc: 'Camera matrimoniale luminosa con bagno condiviso. Ambiente tranquillo e confortevole.',
    price: 80,
    guests: '2 persone',
    img: '/camere/ambra/foto1.jpg',
    href: '/camere/ambra',
  },
  {
    name: 'Camera Lena',
    desc: 'La nostra camera più spaziosa con bagno privato esterno. Adatta anche a famiglie numerose con fino a 4 ospiti.',
    price: 90,
    guests: '2–4 persone',
    img: '/camere/lena/foto1.jpg',
    badge: 'Bagno privato',
    href: '/camere/lena',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-green-800">Casa Ania Rozzano</h1>
            <p className="text-xs text-gray-500">B&B a 140 metri da Humanitas</p>
          </div>
          <Link href="/prenota"
            className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
            Prenota ora
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-300 text-sm font-semibold uppercase tracking-widest mb-3">B&B a Rozzano</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            A pochi passi<br />da Humanitas
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
            Camere confortevoli e accoglienti a soli 140 metri dall'ospedale Humanitas di Rozzano. Il posto giusto per familiari e pazienti.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/prenota"
              className="bg-white text-green-800 font-bold px-6 py-3 rounded-full text-sm">
              🗓 Prenota online
            </Link>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="border border-white text-white font-bold px-6 py-3 rounded-full text-sm">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* PERCHÉ NOI */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Perché scegliere Casa Ania</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '📍', title: '140 metri', desc: "dall'ospedale Humanitas" },
              { icon: '🏠', title: '4 camere', desc: 'tranquille e pulite' },
              { icon: '🔑', title: 'Check-in', desc: 'flessibile 15:00–20:00' },
              { icon: '❌', title: 'Cancellazione', desc: 'gratuita fino a 3 giorni prima' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMERE */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Le nostre camere</h2>
          <p className="text-center text-gray-500 text-sm mb-8">Tutte le camere includono lenzuola, asciugamani e Wi-Fi gratuito</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rooms.map((room, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="h-56 rounded-2xl overflow-hidden">
                  <img src={room.img} alt={room.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-gray-800">{room.name}</h3>
                    {room.badge && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold ml-2 shrink-0">{room.badge}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{room.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">👥 {room.guests}</span>
                    <span className="font-bold text-green-700 text-lg">€{room.price}<span className="text-xs font-normal text-gray-400">/notte</span></span>
                  </div>
                  <Link href={room.href} className="mt-3 block text-center text-sm text-green-700 font-semibold border border-green-200 rounded-xl py-2 hover:bg-green-50">
                    Scopri di più →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOVE SIAMO */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Dove siamo</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 md:flex md:gap-8 md:items-center">
            <div className="md:flex-1 mb-6 md:mb-0">
              <p className="font-semibold text-gray-800 mb-1">📍 Via Liguria 26</p>
              <p className="text-gray-500 text-sm mb-4">Fizzonasco, Pieve Emanuele (MI) 20072</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✅ 140 metri dall'ospedale Humanitas (palazzina 8)</li>
                <li>✅ Zona tranquilla e residenziale</li>
                <li>✅ Parcheggio disponibile nelle vicinanze</li>
              </ul>
              <a href="https://maps.google.com/?q=Via+Liguria+26+Pieve+Emanuele+Milano" target="_blank" rel="noopener noreferrer"
                className="inline-block mt-4 text-sm text-green-700 font-semibold underline">
                Apri in Google Maps →
              </a>
            </div>
            <div className="md:flex-1 bg-green-50 rounded-xl h-48 flex items-center justify-center text-gray-400 text-sm">
              📍 Mappa
            </div>
          </div>
        </div>
      </section>

      {/* CONTATTI / PRENOTAZIONE */}
      <section className="py-12 px-4 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Prenota il tuo soggiorno</h2>
          <p className="text-green-200 text-sm mb-8">Contattaci direttamente — rispondiamo sempre in giornata</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-sm mx-auto">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="flex-1 bg-white text-green-800 font-bold py-4 rounded-2xl text-sm flex items-center justify-center gap-2">
              💬 WhatsApp
            </a>
            <a href={TEL_LINK}
              className="flex-1 border-2 border-white text-white font-bold py-4 rounded-2xl text-sm flex items-center justify-center gap-2">
              📞 Chiama
            </a>
          </div>
          <p className="text-green-300 text-xs mt-6">Check-in: 15:00–20:00 · Check-out: entro le 10:00</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-6 px-4 text-center text-xs">
        <p className="font-semibold text-white mb-1">Casa Ania Rozzano</p>
        <p>Via Liguria 26 – Fizzonasco, Pieve Emanuele (MI) · {PHONE_DISPLAY}</p>
        <p className="mt-2">© {new Date().getFullYear()} Casa Ania Rozzano</p>
      </footer>

    </main>
  )
}
