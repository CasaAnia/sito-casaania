import Link from 'next/link'

const loraStyle = { fontFamily: "'Lora', serif" }

const PHONE = '3427004345'
const PHONE_DISPLAY = '342 700 4345'
const WA_LINK = `https://wa.me/39${PHONE}`
const TEL_LINK = `tel:+39${PHONE}`

const rooms = [
  {
    name: 'Amelia',
    desc: 'Camera accogliente con letto singolo. Ideale per soggiorni brevi, con possibilità di aggiungere un letto supplementare.',
    prices: [
      { label: '1 persona', amount: 70 },
      { label: '2 persone (letto aggiuntivo)', amount: 75 },
    ],
    img: '/camere/singola/foto1.jpg',
    href: '/camere/singola',
  },
  {
    name: 'Camera Matrimoniale Allegra',
    desc: 'Camera matrimoniale con bagno in camera e balconcino tutto per sé. Comoda, luminosa, con quel tocco di spazio in più che fa la differenza.',
    prices: [
      { label: '1–2 persone', amount: 80 },
      { label: '3 persone (letto aggiuntivo)', amount: 90 },
    ],
    img: '/camere/allegra/foto1.jpg',
    href: '/camere/allegra',
  },
  {
    name: 'Camera Matrimoniale Ambra',
    desc: 'Camera matrimoniale luminosa con bagno condiviso. Ambiente tranquillo e confortevole.',
    prices: [
      { label: '1–2 persone', amount: 80 },
      { label: '3 persone (letto aggiuntivo)', amount: 90 },
    ],
    img: '/camere/ambra/foto1.jpg',
    href: '/camere/ambra',
  },
  {
    name: 'Camera Lena',
    desc: 'La nostra camera più spaziosa con bagno privato esterno. Adatta anche a famiglie numerose con fino a 4 ospiti.',
    prices: [
      { label: '1–2 persone', amount: 80 },
      { label: '3 persone (letto aggiuntivo)', amount: 90 },
      { label: '4 persone (quadrupla)', amount: 100 },
    ],
    img: '/camere/lena/foto1b.jpg',
    badge: 'Bagno privato esterno',
    href: '/camere/lena',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&display=swap');`}</style>

      {/* HEADER */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 style={loraStyle} className="text-lg font-semibold text-green-800">Casa Ania Rozzano</h1>
            <p className="text-xs text-gray-500">B&B a 140 metri da Humanitas</p>
          </div>
          <Link href="/prenota"
            className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
            Prenota ora
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative text-white pt-40 pb-12 px-4 overflow-hidden" style={{ minHeight: '420px', maxHeight: '560px' }}>
        <img src="/hero-humanitas.jpg" alt="Vista Humanitas dal balcone" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 40%' }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 style={loraStyle} className="text-3xl md:text-5xl font-semibold mb-4 leading-tight">
            Tu sei qui per Humanitas.<br />Noi siamo qui per te.
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Camere confortevoli, pulite e accoglienti a soli 140 metri dall'ospedale.
          </p>
        </div>
      </section>

      {/* CONTATTI RAPIDI */}
      <div className="bg-white px-4 py-5 flex flex-col sm:flex-row gap-3 justify-center border-b border-gray-100">
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
          className="bg-green-700 text-white font-bold px-6 py-3 rounded-full text-sm text-center">
          💬 WhatsApp
        </a>
        <a href={TEL_LINK}
          className="border border-gray-300 text-gray-800 font-bold px-6 py-3 rounded-full text-sm text-center">
          📞 {PHONE_DISPLAY}
        </a>
      </div>

      {/* PERCHÉ NOI */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 style={loraStyle} className="text-2xl font-semibold text-center mb-8 text-gray-800">Perché scegliere Casa Ania</h2>
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
          <h2 style={loraStyle} className="text-2xl font-semibold text-center mb-2 text-gray-800">Le nostre camere</h2>
          <p className="text-center text-gray-500 text-sm mb-8">Tutte le camere includono lenzuola, asciugamani e Wi-Fi gratuito</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rooms.map((room, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <Link href={room.href} className="block h-80 rounded-2xl overflow-hidden">
                  <img src={room.img} alt={room.name} className={`w-full h-full object-cover ${room.name === 'Camera Matrimoniale Allegra' ? 'scale-125' : room.name === 'Camera Singola' ? 'scale-[1.03]' : room.name === 'Camera Matrimoniale Ambra' ? '' : ''}`} style={room.name === 'Camera Matrimoniale Allegra' ? {transformOrigin: '65% center'} : {}} />
                </Link>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 style={loraStyle} className="font-semibold text-gray-800">{room.name}</h3>
                    {room.badge && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold ml-2 shrink-0">{room.badge}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{room.desc}</p>
                  <div className="border-t border-gray-100 pt-3 flex flex-wrap gap-3">
                    {room.prices.map((p, j) => (
                      <div key={j} className={j > 0 ? 'border-l border-gray-100 pl-3' : ''}>
                        <p className="text-xs text-gray-400 mb-0.5">{p.label}</p>
                        <p style={loraStyle} className="text-base font-semibold text-gray-800">€{p.amount} <span className="text-xs font-normal text-gray-400">/ notte</span></p>
                      </div>
                    ))}
                  </div>
                  <Link href={room.href} className="mt-3 block text-center text-base text-green-700 font-semibold py-2">
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
          <h2 style={loraStyle} className="text-2xl font-semibold text-center mb-8 text-gray-800">Dove siamo</h2>
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
          <h2 style={loraStyle} className="text-2xl font-semibold mb-2">Prenota il tuo soggiorno</h2>
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
