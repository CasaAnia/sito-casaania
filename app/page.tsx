import Link from 'next/link'

const PHONE = '3427004354'
const PHONE_DISPLAY = '342 700 4354'
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
    roomId: 'bfe8414c-97de-4aae-96c0-c6b0225d1a05',
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
    roomId: '6a8870ce-be2b-41d9-971e-5c833a85eb4a',
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
    roomId: '19ae4611-c0a4-42ae-8530-210f9a948e9e',
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
    roomId: 'fed43a69-5e19-4cf9-b1b3-64affa46f9b1',
  },
]

const testimonials = [
  {
    name: 'Antonella P.',
    rating: 5,
    text: 'Ottima struttura, ottima esperienza, qualità prezzo il top. La signora Ania una splendida persona.',
  },
  {
    name: 'Rosanna C.',
    rating: 5,
    text: 'Ottima la nostra esperienza in Casa Granata. La signora Ania è stata accogliente e disponibile e molto empatica.',
  },
  {
    name: 'Lulu R.',
    rating: 5,
    text: 'Ottima struttura, ottima posizione, molto pulita e proprietario molto disponibile e attento alle esigenze dei clienti.',
  },
  {
    name: 'Martina M.',
    rating: 4,
    text: "Camera pulita e dotata di un terrazzino. Personale cordiale e disponibile... a pochi minuti dall'Humanitas.",
  },
]

const faqs = [
  {
    q: "Quanto dista Casa Ania dall'ospedale Humanitas?",
    a: "Casa Ania si trova a 140 metri dall'ingresso della palazzina 8 dell'ospedale Humanitas di Rozzano: circa 2 minuti a piedi.",
  },
  {
    q: "C'è un parcheggio vicino a Casa Ania?",
    a: "Sì. A circa 150 metri ci sono due piazzole di sosta gratuite, su entrambi i lati della strada. In alternativa c'è il parcheggio a pagamento di Humanitas, custodito 24 ore su 24.",
  },
  {
    q: "Come arrivo a Casa Ania dall'aeroporto?",
    a: "Offriamo un servizio navetta su richiesta da Malpensa, Linate e Orio al Serio, oltre che dalle stazioni di Milano Centrale e Rogoredo e dalle autostazioni di San Donato e Lampugnano. Scrivici su WhatsApp con data e orario e ti confermiamo subito prezzo e disponibilità.",
  },
  {
    q: 'Posso tornare in camera a riposare tra una visita e l’altra?',
    a: "Certo. Con l'ospedale a 2 minuti a piedi, molti nostri ospiti tornano in camera durante la giornata: è uno dei motivi per cui le famiglie ci scelgono.",
  },
  {
    q: 'Casa Ania è a Rozzano o a Pieve Emanuele?',
    a: "L'indirizzo è Via Liguria 26, Fizzonasco di Pieve Emanuele, esattamente al confine con Rozzano: l'ospedale Humanitas, che si trova a Rozzano, è a soli 140 metri.",
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function Home() {
  return (
    <main className="min-h-screen text-gray-900" style={{backgroundColor: '#faf9f6'}}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HEADER */}
      <header className="bg-white sticky top-0 z-50" style={{boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 style={{textShadow: '0 2px 4px rgba(0,0,0,0.25)'}} className="font-display text-lg font-semibold tracking-wide whitespace-nowrap">
              <span className="text-green-700">Casa </span><span style={{color: '#2d6a4f'}}>Ania </span><span className="text-green-700">Rozzano</span>
            </h1>
            <p className="text-sm text-gray-700">140 metri da Humanitas</p>
          </div>
          <Link href="/prenota"
            style={{fontSize: '0.75rem', letterSpacing: '0.05em'}}
            className="bg-green-700 hover:bg-green-800 transition-colors text-white font-semibold px-4 py-3 rounded-full uppercase whitespace-nowrap">
            Prenota ora
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="px-4 pt-10 pb-8 text-center" style={{ backgroundColor: '#f9f6f1' }}>
        <div className="max-w-2xl mx-auto">
          <h2 style={{ color: '#1f3d2f' }} className="font-display text-3xl md:text-5xl font-semibold mb-4 leading-tight tracking-wide">
            Tu sei qui per Humanitas.<br />Noi siamo qui per te.
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Camere confortevoli a 140 metri dall&apos;ospedale
          </p>
          <Link href="/prenota"
            className="inline-block bg-green-700 hover:bg-green-800 transition-colors text-white font-semibold px-8 py-3 rounded-full uppercase whitespace-nowrap">
            Prenota ora
          </Link>
        </div>
      </section>

      {/* STRISCIA FOTO */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-1">
        <div className="col-span-2 md:col-span-1 h-64 md:h-80">
          <img src="/hero-camera.jpg" alt="Camera di Casa Ania" className="w-full h-full object-cover" />
        </div>
        <div className="h-40 md:h-80">
          <img src="/hero-dettaglio.jpg" alt="Dettaglio letto e biancheria di Casa Ania" className="w-full h-full object-cover" />
        </div>
        <div className="h-40 md:h-80">
          <img src="/hero-mobile.jpg" alt="Vista dal balcone di Casa Ania" className="w-full h-full object-cover" style={{ objectPosition: 'center 50%' }} />
        </div>
      </section>

      {/* RECENSIONI */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={{textUnderlineOffset: '6px'}} className="text-center text-gray-700 text-xl font-semibold uppercase tracking-wider mb-10 underline">Cosa dicono di noi</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-2.5 shadow-sm">
                <p style={{color: '#2d6a4f'}} className="text-xs mb-0.5">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</p>
                <p className="text-gray-700 text-sm italic leading-tight mb-1 line-clamp-2">"{t.text}"</p>
                <p className="text-xs font-semibold text-gray-800">{t.name}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[#3a3a35] text-xs mt-2">Recensioni raccolte su TripAdvisor</p>
        </div>
      </section>

      {/* CAMERE */}
      <section className="pt-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <p style={{textUnderlineOffset: '6px'}} className="text-center text-gray-700 text-xl font-semibold uppercase tracking-wider mb-14 px-4 underline">Scegli la tua camera</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.map((room, i) => (
              <div key={i} className="overflow-hidden flex flex-col h-full">
                <Link href={room.href} className="block h-80 overflow-hidden bg-gray-100">
                  <img src={room.img} alt={room.name} className={room.name === 'Lena' ? 'w-full h-full object-contain' : 'w-full h-full object-cover'} />
                </Link>
                <div className={`px-4 pb-2 flex flex-col flex-1 ${room.name === 'Lena' ? 'pt-4' : 'pt-9'}`}>
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-display text-xl font-semibold text-gray-700 tracking-wide">{room.name}</h3>
                    {room.badge && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold ml-2 shrink-0">{room.badge}</span>
                    )}
                  </div>
                  <p className="text-base text-gray-700 mb-3">{room.desc}</p>
                  <div className="border-t border-gray-100 pt-3 grid grid-cols-2 gap-3 mt-auto">
                    {room.prices.map((p, j) => (
                      <div key={j} className={j % 2 === 1 ? 'border-l border-gray-100 pl-3' : ''}>
                        <p className="text-xs text-[#3a3a35] mb-0.5 leading-tight min-h-[2rem] flex items-start">{p.label}</p>
                        <p className="text-base font-semibold text-gray-800">€{p.amount} <span className="text-xs font-normal text-[#3a3a35]">/ notte</span></p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <Link href={room.href} className="text-base text-green-700 font-semibold py-2">
                      Scopri di più →
                    </Link>
                    <Link href={`/prenota?room=${room.roomId}`} className="bg-green-700 hover:bg-green-800 transition-colors text-white font-bold px-5 py-2 rounded-full text-sm uppercase whitespace-nowrap">
                      Prenota ora
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h2 className="font-display text-2xl font-semibold text-center mt-20 text-gray-800 px-4">Quando desideri stare vicino a chi ami nei momenti difficili.</h2>
        </div>
      </section>

      {/* CHECK-IN FLESSIBILE */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p style={{textUnderlineOffset: '6px'}} className="text-gray-700 text-lg uppercase tracking-wider mb-6 underline">Check-in flessibile</p>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-4">
            Il check-in ufficiale è dalle 15:00 alle 20:00.
          </p>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-4">
            Qualora la camera fosse pronta in anticipo (cosa che accade spesso già nelle prime ore del mattino), ti invieremo un messaggio per informarti che potrai accedere alla struttura anche prima dell'orario previsto.
          </p>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-4">
            Se desideri lasciare i bagagli prima del check-in, ti chiediamo semplicemente di avvisarci il giorno precedente, così da organizzare al meglio la tua accoglienza.
          </p>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Se invece prevedi di arrivare dopo le 20:00, è sufficiente comunicarcelo il giorno prima e faremo il possibile per rendere il tuo arrivo semplice e agevole.
          </p>
        </div>
      </section>

      {/* SERVIZIO NAVETTA */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p style={{textUnderlineOffset: '6px'}} className="text-gray-700 text-lg uppercase tracking-wider mb-6 underline">Servizio navetta</p>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Veniamo a prenderti noi — da tutti gli aeroporti di Milano, da Centrale, Rogoredo e dai terminal bus.
            Autisti di fiducia, prezzo in base alla tratta. Scrivici su WhatsApp con data e orario: rispondiamo subito.
          </p>
        </div>
      </section>

      {/* CTA INTERMEDIA */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-block bg-green-700 hover:bg-green-800 transition-colors text-white font-bold px-8 py-3 rounded-full text-sm">
            💬 Scrivici su WhatsApp
          </a>
        </div>
      </section>

      {/* DOVE SIAMO */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={{textUnderlineOffset: '6px'}} className="text-center text-gray-700 text-lg uppercase tracking-wider mb-8 underline">Dove siamo</p>
          <div className="md:flex md:gap-8 md:items-center">
            <div className="md:flex-1 mb-6 md:mb-0">
              <p className="font-semibold text-gray-800 mb-1">📍 Via Liguria 26</p>
              <p className="text-gray-700 mb-4">Fizzonasco, Pieve Emanuele (MI) 20072</p>
              <ul className="text-gray-700 leading-relaxed space-y-2">
                <li>140 metri dall'ospedale Humanitas (palazzina 8)</li>
                <li>Zona tranquilla e residenziale</li>
                <li>Due piazzole di sosta gratuite a circa 150 metri da Casa Ania, poco prima di arrivare, su entrambi i lati della strada</li>
                <li>In alternativa, il parcheggio di Humanitas (a pagamento), custodito 24 ore su 24</li>
              </ul>
              <a href="https://maps.google.com/?q=Via+Liguria+26+Pieve+Emanuele+Milano" target="_blank" rel="noopener noreferrer"
                className="inline-block mt-4 text-sm text-green-700 font-semibold underline">
                Apri in Google Maps →
              </a>
              <br />
              <a href="#come-arrivare"
                className="inline-block mt-2 text-sm text-green-700 font-semibold underline">
                Come arrivare a Humanitas: tutte le indicazioni →
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

      {/* COME ARRIVARE */}
      <section id="come-arrivare" className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={{textUnderlineOffset: '6px'}} className="text-center text-gray-700 text-lg uppercase tracking-wider mb-8 underline">Come arrivare</p>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6 text-center">
            Casa Ania è a soli 140 metri dalla palazzina 8 di Humanitas: due minuti a piedi, senza bisogno di auto, taxi o mezzi pubblici.
          </p>
          <ul className="text-gray-700 leading-relaxed space-y-4 max-w-2xl mx-auto">
            <li><strong>🚶 A piedi (2 minuti):</strong> l&apos;ingresso più vicino è quello della palazzina 8. Molti ospiti tornano in camera durante gli orari di chiusura delle visite.</li>
            <li><strong>🚗 In auto:</strong> dalla Tangenziale Ovest (A50) uscita Rozzano–Quinto de&apos; Stagni, oppure dalla A7 Milano–Genova uscita Assago/Milanofiori, poi indicazioni per Humanitas/Via Manzoni. Parcheggio: due piazzole gratuite a 150 metri, oppure il parcheggio Humanitas a pagamento, custodito 24 ore su 24.</li>
            <li><strong>✈️ In aereo:</strong> Viaggiare per una visita medica è già abbastanza faticoso. Al trasferimento pensiamo noi: i nostri autisti di fiducia ti aspettano a Malpensa, Linate, Orio al Serio o alla stazione, e ti portano direttamente da noi. Scrivici su WhatsApp con data e orario di arrivo e ti confermiamo subito prezzo e posto. Meglio con qualche giorno di anticipo.</li>
            <li><strong>🚆 In treno:</strong> Milano Rogoredo è la stazione più comoda, collegata a Milano Centrale in pochi minuti (metropolitana M3). Da lì puoi richiedere la nostra navetta o proseguire in taxi (15–20 minuti).</li>
            <li><strong>🚌 In autobus:</strong> le autostazioni di San Donato e Lampugnano sono collegate a Casa Ania con il nostro servizio navetta su richiesta.</li>
            <li><strong>🚇 Con i mezzi pubblici:</strong> bus 230 da M2 Abbiategrasso fino a Via Manzoni (Ospedale); fermano anche le linee 220 e 328. Il tram 15 arriva in centro, ma richiede circa 20 minuti a piedi.</li>
          </ul>
          <div className="text-center mt-6">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-block bg-green-700 hover:bg-green-800 transition-colors text-white font-bold px-6 py-3 rounded-full text-sm">
              💬 Richiedi la navetta su WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={{textUnderlineOffset: '6px'}} className="text-center text-gray-700 text-lg uppercase tracking-wider mb-8 underline">Domande frequenti</p>
          <div className="space-y-5 max-w-2xl mx-auto">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <h3 className="font-display font-semibold text-gray-800 mb-1">{q}</h3>
                <p className="text-gray-700 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATTI / PRENOTAZIONE */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p style={{color: '#2d6a4f'}} className="text-xl font-semibold uppercase tracking-wider mb-6">Prenota il tuo soggiorno</p>
          <p className="text-gray-700 text-sm mb-8">Contattaci direttamente — rispondiamo sempre in giornata</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-sm mx-auto">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="flex-1 bg-green-700 hover:bg-green-800 transition-colors text-white font-bold py-4 rounded-2xl text-sm flex items-center justify-center gap-2">
              💬 WhatsApp
            </a>
            <a href={TEL_LINK}
              className="flex-1 border border-gray-300 text-gray-700 font-bold py-4 rounded-2xl text-sm flex items-center justify-center gap-2">
              📞 Chiama
            </a>
          </div>
          <p className="text-[#3a3a35] text-xs mt-6">Check-in: 15:00–20:00 · Check-out: entro le 10:00</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-gray-200 py-6 px-4 text-center text-xs" style={{backgroundColor: '#2d6a4f'}}>
        <p className="font-semibold text-white mb-1 uppercase tracking-widest">Casa Ania Rozzano</p>
        <p>Via Liguria 26 – Fizzonasco, Pieve Emanuele (MI)</p>
        <p>{PHONE_DISPLAY}</p>
        <p className="mt-2">© {new Date().getFullYear()} Casa Ania Rozzano</p>
      </footer>

      {/* WHATSAPP FLOTTANTE */}
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
        className="md:hidden fixed bottom-5 right-5 z-50 bg-green-700 hover:bg-green-800 transition-colors text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg">
        💬
      </a>

    </main>
  )
}
