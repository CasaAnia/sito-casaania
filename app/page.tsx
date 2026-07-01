'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const loraStyle = { fontFamily: "'Lora', serif" }

const PHONE = '3427004345'
const PHONE_DISPLAY = '342 700 4345'
const WA_LINK = `https://wa.me/39${PHONE}`
const TEL_LINK = `tel:+39${PHONE}`

const rooms = [
  {
    name: 'Allegra',
    desc: 'Camera matrimoniale con bagno in camera e balconcino tutto per sé. Comoda, luminosa, con quel tocco di spazio in più che fa la differenza.',
    prices: [
      { label: '1–2 persone', amount: 80 },
      { label: '3 persone (letto aggiuntivo)', amount: 90 },
    ],
    img: '/camere/allegra/foto1.jpg',
    href: '/camere/allegra',
  },
  {
    name: 'Ambra',
    desc: 'Camera matrimoniale luminosa dai toni caldi, tranquilla e confortevole.',
    prices: [
      { label: '1–2 persone', amount: 80 },
      { label: '3 persone (letto aggiuntivo)', amount: 90 },
    ],
    img: '/camere/ambra/foto1.jpg',
    href: '/camere/ambra',
  },
  {
    name: 'Lena',
    desc: 'La nostra camera più spaziosa con bagno privato esterno. Adatta anche a famiglie numerose con fino a 4 ospiti.',
    prices: [
      { label: '1–2 persone', amount: 80 },
      { label: '3 persone (letto aggiuntivo)', amount: 90 },
      { label: '4 persone (due letti aggiuntivi)', amount: 100 },
    ],
    img: '/camere/lena/foto1b.jpg',
    badge: 'Bagno privato esterno',
    href: '/camere/lena',
  },
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
]

export default function Home() {
  const [isWide, setIsWide] = useState(false)
  useEffect(() => {
    const check = () => setIsWide(window.innerWidth >= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <main className="min-h-screen text-gray-900" style={{backgroundColor: '#f9f6f1'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Raleway:wght@300;400&display=swap');`}</style>

      {/* HEADER */}
      <header className="bg-white sticky top-0 z-50" style={{boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 style={{...loraStyle, textShadow: '0 1px 3px rgba(0,0,0,0.12)'}} className="text-lg font-semibold tracking-widest uppercase whitespace-nowrap">
              <span className="text-green-700">Casa </span><span style={{color: '#007f5b'}}>Ania </span><span className="text-green-700">Rozzano</span>
            </h1>
            <p style={loraStyle} className="text-sm text-gray-500">140 metri da Humanitas</p>
          </div>
          <Link href="/prenota"
            style={{...loraStyle, fontSize: '0.65rem', letterSpacing: '0.05em'}}
            className="bg-green-700 text-white font-semibold px-3 py-1.5 rounded-full uppercase whitespace-nowrap">
            Prenota ora
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative text-white px-4 overflow-hidden" style={{ minHeight: '420px', maxHeight: '560px' }}>
        <img src="/hero-mobile.jpg" alt="Vista dal balcone di Casa Ania" className="absolute inset-0 w-full h-full object-cover md:hidden" style={{ objectPosition: 'center 50%' }} />
        <img src="/hero-desktop.jpg" alt="Vista Humanitas" className="absolute inset-0 w-full h-full object-cover hidden md:block" style={{ objectPosition: 'center 45%' }} />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute w-full text-center px-4" style={{ left: 0, top: isWide ? '58%' : '22%' }}>
          <h2 style={{fontFamily: "'Raleway', sans-serif", color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.7)'}} className="text-3xl md:text-5xl font-semibold mb-4 leading-tight uppercase tracking-widest">
            Tu sei qui per Humanitas.<br />Noi siamo qui per te.
          </h2>
        </div>
        <div className="absolute w-full text-center px-4" style={{ left: 0, bottom: '8%' }}>
          <p style={{ fontFamily: "'Lora', serif", color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.7)', fontSize: '0.9rem', letterSpacing: '0.03em', fontWeight: '700' }}>
            Camere confortevoli, pulite e accoglienti a soli <span style={{ textDecoration: 'underline', fontSize: '1.15rem' }}>140 metri dall&apos;ospedale.</span>
          </p>
        </div>
      </section>


      {/* CAMERE */}
      <section className="pt-16 pb-8">
        <div className="max-w-4xl mx-auto">
          <h2 style={loraStyle} className="text-2xl font-semibold text-center mb-12 text-gray-800 px-4">Quando desideri stare vicino a chi ami nei momenti difficili.</h2>
          <p style={loraStyle} className="text-center text-gray-500 text-lg uppercase tracking-widest mb-6 px-4">Le nostre camere</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.map((room, i) => (
              <div key={i} className="overflow-hidden">
                <Link href={room.href} className="block h-80 overflow-hidden bg-gray-100">
                  <img src={room.img} alt={room.name} className={room.name === 'Lena' ? 'w-full h-full object-contain' : 'w-full h-full object-cover'} />
                </Link>
                <div className="px-4 pt-4 pb-2">
                  <div className="flex items-start justify-between mb-1">
                    <h3 style={loraStyle} className="text-xl font-semibold text-gray-500 uppercase tracking-widest">{room.name}</h3>
                    {room.badge && (
                      <span style={loraStyle} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold ml-2 shrink-0">{room.badge}</span>
                    )}
                  </div>
                  <p style={loraStyle} className="text-sm text-gray-500 mb-3">{room.desc}</p>
                  <div className="border-t border-gray-100 pt-3 grid grid-cols-2 gap-3">
                    {room.prices.map((p, j) => (
                      <div key={j} className={j % 2 === 1 ? 'border-l border-gray-100 pl-3' : ''}>
                        <p style={loraStyle} className="text-xs text-gray-400 mb-0.5">{p.label}</p>
                        <p style={loraStyle} className="text-base font-semibold text-gray-800">€{p.amount} <span className="text-xs font-normal text-gray-400">/ notte</span></p>
                      </div>
                    ))}
                  </div>
                  <Link href={room.href} style={loraStyle} className="mt-3 block text-center text-base text-green-700 font-semibold py-2">
                    Scopri di più →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECK-IN FLESSIBILE */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p style={loraStyle} className="text-gray-500 text-lg uppercase tracking-widest mb-4">Check-in flessibile</p>
          <p style={loraStyle} className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Il check-in ufficiale va dalle 15:00 alle 20:00, ma facciamo sempre il possibile per accoglierti prima.
            Non appena la camera è pronta — spesso già di mattina — ti scriviamo subito, così puoi sistemarti con calma.
            Se arrivi dopo le 20:00, ci basta saperlo in anticipo per organizzarci insieme.
          </p>
        </div>
      </section>

      {/* DOVE SIAMO */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={loraStyle} className="text-center text-gray-500 text-lg uppercase tracking-widest mb-8">Dove siamo</p>
          <div className="md:flex md:gap-8 md:items-center">
            <div className="md:flex-1 mb-6 md:mb-0">
              <p style={loraStyle} className="font-semibold text-gray-800 mb-1">📍 Via Liguria 26</p>
              <p style={loraStyle} className="text-gray-500 text-sm mb-4">Fizzonasco, Pieve Emanuele (MI) 20072</p>
              <ul style={loraStyle} className="text-sm text-gray-600 space-y-2">
                <li>140 metri dall'ospedale Humanitas (palazzina 8)</li>
                <li>Zona tranquilla e residenziale</li>
                <li>Parcheggio disponibile nelle vicinanze</li>
              </ul>
              <a href="https://maps.google.com/?q=Via+Liguria+26+Pieve+Emanuele+Milano" target="_blank" rel="noopener noreferrer"
                style={loraStyle} className="inline-block mt-4 text-sm text-green-700 font-semibold underline">
                Apri in Google Maps →
              </a>
            </div>
            <div className="md:flex-1 rounded-xl overflow-hidden h-48">
              <iframe
                src="https://www.google.com/maps?q=Via+Liguria+26+Pieve+Emanuele+Milano&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa Casa Ania Rozzano"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTATTI / PRENOTAZIONE */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p style={{...loraStyle, color: '#007f5b'}} className="text-lg font-semibold uppercase tracking-widest mb-2">Prenota il tuo soggiorno</p>
          <p style={loraStyle} className="text-gray-500 text-sm mb-8">Contattaci direttamente — rispondiamo sempre in giornata</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-sm mx-auto">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="flex-1 bg-green-700 text-white font-bold py-4 rounded-2xl text-sm flex items-center justify-center gap-2">
              💬 WhatsApp
            </a>
            <a href={TEL_LINK}
              className="flex-1 border border-gray-300 text-gray-700 font-bold py-4 rounded-2xl text-sm flex items-center justify-center gap-2">
              📞 Chiama
            </a>
          </div>
          <p style={loraStyle} className="text-gray-400 text-xs mt-6">Check-in: 15:00–20:00 · Check-out: entro le 10:00</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-gray-200 py-6 px-4 text-center text-xs" style={{backgroundColor: '#007f5b'}}>
        <p style={loraStyle} className="font-semibold text-white mb-1 uppercase tracking-widest">Casa Ania Rozzano</p>
        <p style={loraStyle}>Via Liguria 26 – Fizzonasco, Pieve Emanuele (MI)</p>
        <p style={loraStyle}>{PHONE_DISPLAY}</p>
        <p style={loraStyle} className="mt-2">© {new Date().getFullYear()} Casa Ania Rozzano</p>
      </footer>

    </main>
  )
}
