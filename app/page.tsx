import Link from 'next/link'
import Image from 'next/image'
import Logo from './components/Logo'
import Reveal from './components/Reveal'
import RecensioniSlider from './components/RecensioniSlider'
import BannerCarosello from './components/BannerCarosello'
import ParallaxController from './components/ParallaxController'
import WhatsAppFab from './components/WhatsAppFab'
import { MapPin, MessageCircle, Footprints, Car, Bus, Accessibility, Clock } from 'lucide-react'

const PHONE = '3427004354'
const WA_LINK = `https://wa.me/39${PHONE}`
// Stesso meccanismo dei messaggi precompilati di PrenotaClient: WA_LINK + ?text= + encodeURIComponent
const WA_CHECKIN_LINK = `${WA_LINK}?text=${encodeURIComponent('Ciao Ania! Ho una prenotazione a Casa Ania e penso di arrivare dopo le 20:00. Possiamo organizzarci per il check-in? Grazie!')}`
const TEL_LINK = `tel:+39${PHONE}`

const rooms = [
  {
    name: 'Ambra',
    desc: 'Camera matrimoniale luminosa e raccolta, dai toni caldi, pensata per un soggiorno tranquillo e confortevole.',
    prices: [
      { label: '1–2 persone', amount: 80 },
      { label: '3 persone (letto aggiuntivo)', amount: 90 },
    ],
    img: '/camere/ambra/foto1.jpg',
    href: '/camere/ambra',
    roomId: '6a8870ce-be2b-41d9-971e-5c833a85eb4a',
  },
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
    name: 'Lena',
    desc: 'La nostra camera più spaziosa, con bagno privato esterno. Ideale anche per famiglie o piccoli gruppi, fino a 4 ospiti.',
    prices: [
      { label: '1–2 persone', amount: 80 },
      { label: '3 persone', amount: 90 },
      { label: '4 persone (letto aggiuntivo)', amount: 100 },
    ],
    img: '/camere/lena/foto1b.jpg',
    badge: 'Bagno privato esterno',
    href: '/camere/lena',
    roomId: '19ae4611-c0a4-42ae-8530-210f9a948e9e',
  },
  {
    name: 'Amelia',
    desc: 'Camera singola accogliente e funzionale, ideale per chi viaggia da solo, con possibilità di aggiungere un secondo letto.',
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
    name: 'Francesca F.',
    rating: 5,
    text: "Ottima struttura, vicino all'ospedale Humanitas. Struttura pulitissima, accogliente e proprietaria gentilissima e disponibile. Consigliatissimo.",
  },
  {
    name: 'Antonio C.',
    rating: 5,
    text: 'Ottima posizione, ho alloggiato per un lungo periodo e sono stato benissimo. Stanza pulita e confortevole. La signora Ania gentilissima.',
  },
  {
    name: 'Giovanna R.',
    rating: 5,
    text: 'Stanze perfette, pulitissime, ottimo rapporto qualità prezzo. La signora Ania gentilissima e disponibile.',
  },
  {
    name: 'Lina L.',
    rating: 5,
    text: 'Ho soggiornato diverse volte e mi son trovata sempre bene. Le camere sono spaziose, pulite, comode e confortevoli... il terrazzo è grazioso, con vista panoramica.',
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

export const metadata = {
  title: 'Casa Ania – Affittacamere a 140 m da Humanitas Rozzano',
  description:
    "Casa Ania è un affittacamere a 140 metri dall'Ospedale Humanitas di Rozzano. Camere accoglienti, parcheggio gratuito e servizio transfer su richiesta.",
  alternates: { canonical: '/' },
}

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
    <main className="min-h-screen text-[#3a3a35]" style={{backgroundColor: '#f9f6f1'}}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ParallaxController />

      {/* HEADER */}
      <header className="bg-white sticky top-0 z-50" style={{boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
        {/* Header mobile: invariato */}
        <div className="md:hidden max-w-4xl mx-auto px-5 sm:px-4 py-4 flex items-center justify-between">
          <Logo header />
          <Link href="/prenota"
            style={{fontSize: '0.75rem', letterSpacing: '0.05em'}}
            className="bg-green-700 hover:bg-green-800 transition active:scale-[0.97] text-white font-semibold px-4 py-3 rounded-full uppercase whitespace-nowrap">
            Prenota ora
          </Link>
        </div>
        {/* Header desktop: logo · navigazione leggera · WhatsApp */}
        <div className="hidden md:flex max-w-[clamp(1240px,92vw,1560px)] mx-auto px-8 py-3 items-center justify-between gap-8">
          <Link href="/" aria-label="Casa Ania — torna all'inizio">
            <Logo header />
          </Link>
          <nav aria-label="Navigazione principale" className="flex items-center gap-8 text-[15px] font-medium text-[#3a3a35]">
            <a href="#camere" className="transition-colors duration-150 hover:text-green-700 py-2">Camere</a>
            <Link href="/recensioni" className="transition-colors duration-150 hover:text-green-700 py-2">Recensioni</Link>
            <a href="#dove-siamo" className="transition-colors duration-150 hover:text-green-700 py-2">Dove siamo</a>
            <Link href="/info" className="transition-colors duration-150 hover:text-green-700 py-2">Info utili</Link>
          </nav>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 transition active:scale-[0.97] text-white font-semibold px-5 py-2.5 rounded-full text-sm whitespace-nowrap">
            <MessageCircle size={17} strokeWidth={2} aria-hidden="true" /> Scrivi ad Ania
          </a>
        </div>
      </header>

      {/* HERO MOBILE (carosello foto + testo sovrapposto): invariato, solo sotto md */}
      <BannerCarosello />

      {/* HERO DESKTOP: composizione editoriale a due colonne — testo su crema
          a sinistra, fotografia reale a destra, benefit in coda alla hero. */}
      <section className="hidden md:block">
        <div className="max-w-[clamp(1240px,92vw,1560px)] mx-auto px-8 pt-14 pb-9 hero-in">
          {/* Testo ~40% · fotografia ~60%: la foto è la presenza principale */}
          <div className="grid grid-cols-[2fr_3fr] gap-12 lg:gap-14 items-center">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: '#2d6a4f' }}>
                A 140 metri da Humanitas
              </p>
              <h1 className="font-medium text-[42px] lg:text-[48px] leading-[1.12] tracking-[-0.02em]" style={{ color: '#2b2a25' }}>
                Vicino a chi ami.
                <span className="font-display italic block mt-2 text-[46px] lg:text-[53px] leading-[1.1]" style={{ color: '#2d6a4f', fontWeight: 500 }}>
                  Come a casa.
                </span>
              </h1>
              <p className="text-[18px] leading-[1.6] text-[#3a3a35] max-w-[46ch] mt-6">
                Una casa accogliente e tranquilla dove sentirti vicino a chi ami, proprio quando ne hai più bisogno.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <Link href="/prenota"
                  className="inline-flex items-center justify-center h-[50px] px-6 rounded-lg bg-green-700 hover:bg-green-800 transition active:scale-[0.97] text-white font-semibold text-[15px] tracking-wide whitespace-nowrap">
                  VERIFICA DISPONIBILITÀ
                </Link>
                <Link href="#camere"
                  style={{ borderColor: '#2d6a4f', color: '#2d6a4f' }}
                  className="inline-flex items-center justify-center h-[50px] px-5 rounded-lg border font-semibold text-[15px] hover:bg-green-50 transition active:scale-[0.97] whitespace-nowrap">
                  Scopri le camere
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src="/camere/ambra/foto1.jpg"
                alt="Camera Ambra di Casa Ania"
                fill
                sizes="(min-width: 768px) 800px, 100vw"
                preload
                className="object-cover"
              />
            </div>
          </div>
          {/* Benefit: parte della hero, niente card — icone verdi e testo */}
          <div className="mt-12 pt-8 grid grid-cols-4 gap-6 border-t" style={{ borderColor: '#e7e2d6' }}>
            {[
              { Icon: MapPin, label: '140 metri da Humanitas' },
              { Icon: Car, label: 'Parcheggio gratuito' },
              { Icon: Bus, label: 'Navetta su richiesta' },
              { Icon: Accessibility, label: 'Ascensore e accesso senza barriere' },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#e8f0ea' }}>
                  <Icon size={19} strokeWidth={2} className="text-green-700" aria-hidden="true" />
                </span>
                <span className="text-[15px] font-semibold leading-snug" style={{ color: '#1f3d2f' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENSIONI (mobile: invariata; su desktop la sezione ariosa sta dopo le camere) */}
      <section className="md:hidden pt-14 pb-2 px-5">
        <div className="max-w-4xl md:max-w-5xl mx-auto">
          <div className="text-center mb-9 md:mb-11">
            <p className="text-[15px] md:text-base font-medium text-[#1f3d2f] mb-3">
              <span style={{ color: '#2d6a4f' }}>★★★★★</span> <span className="font-semibold">5,0 su Google</span>
            </p>
            <h2 className="font-medium text-[24px] md:text-[34px] leading-[1.2] tracking-[-0.01em]" style={{ color: '#2b2a25' }}>
              Le parole dei nostri ospiti
            </h2>
          </div>
          <Reveal>
            <RecensioniSlider testimonials={testimonials} />
          </Reveal>
          <div className="text-center mt-7">
            <a href="https://maps.google.com/?cid=12687762198889638693" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full border text-sm font-semibold uppercase tracking-wide bg-transparent hover:bg-green-50 transition active:scale-[0.97]"
              style={{ borderColor: '#2d6a4f', color: '#2d6a4f' }}>
              Leggi tutte le recensioni su Google
            </a>
            <p className="text-sm mt-3">
              <Link href="/recensioni" className="inline-block underline py-2" style={{ color: '#6f6a5e', textUnderlineOffset: '4px' }}>
                Recensioni anche su TripAdvisor →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* CAMERE (mobile: invariata) */}
      <section className="md:hidden pt-10 pb-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display italic font-medium text-center px-5 mx-auto max-w-md md:max-w-xl mb-7 md:mb-8 text-[28px] md:text-[36px] leading-[1.15]" style={{ color: '#2d6a4f' }}>
            Non un albergo. Una casa.
          </h2>
          <div className="px-7 sm:px-8 mx-auto max-w-[700px] mb-10 md:mb-12">
            <p className="text-[17px] font-normal leading-[1.6] text-left text-[#3a3a35] mb-5">
              Qui trovi la tranquillità di un ambiente curato, la libertà di sentirti a tuo agio e soprattutto una persona su cui poter contare.
            </p>
            <p className="text-[17px] font-medium leading-[1.6] text-left text-[#3a3a35]">
              Perché quando sei lontano da casa per stare vicino a chi ami, anche le piccole attenzioni fanno la differenza.
            </p>
          </div>
          <div className="px-7 mb-10 md:mb-12">
            <h2 className="font-medium text-center text-[26px] md:text-[34px] leading-[1.2] tracking-[-0.01em] mb-3" style={{ color: '#2b2a25' }}>
              Le nostre camere
            </h2>
            <p className="text-center text-[16px] font-normal leading-[1.5] text-[#3a3a35] max-w-md md:max-w-xl mx-auto">
              Quattro camere, ognuna diversa. Scegli quella più adatta al tuo soggiorno.
            </p>
          </div>
          <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-8 md:gap-y-0">
            {rooms.map((room, i) => (
              <div key={i} className="overflow-hidden flex flex-col h-full md:grid md:grid-rows-subgrid md:row-span-4 md:pb-8">
                <Link href={room.href} className="group relative block h-80 overflow-hidden bg-gray-100 rounded-2xl mx-4 md:mx-0">
                  {room.name === 'Lena' ? (
                    <Image src={room.img} alt={room.name} fill sizes="(min-width: 768px) 448px, 100vw" className="object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-105 motion-safe:group-active:scale-105" />
                  ) : (
                    <div className="parallax-wrap relative" data-parallax>
                      <Image src={room.img} alt={room.name} fill sizes="(min-width: 768px) 448px, 100vw" className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-105 motion-safe:group-active:scale-105" />
                    </div>
                  )}
                </Link>
                <Link href={room.href} className={`group/desc block px-4 ${room.name === 'Lena' ? 'pt-0 md:pt-4' : 'pt-5 md:pt-9'}`}>
                  <div className="flex items-start justify-between mb-3 md:mb-6">
                    <h3 className="text-[22px] md:text-xl font-semibold leading-[1.2] tracking-[-0.01em] transition-colors group-hover/desc:text-green-700" style={{ color: '#2d6a4f' }}>{room.name}</h3>
                    {room.badge && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold ml-2 shrink-0">{room.badge}</span>
                    )}
                  </div>
                  <p className="text-base leading-[1.6] text-[#3a3a35] mb-4">{room.desc}</p>
                </Link>
                <div className="mx-4 border-t border-gray-100 pt-3 grid grid-cols-2 gap-3">
                  {room.prices.map((p, j) => (
                    <div key={j} className={j % 2 === 1 ? 'border-l border-gray-100 pl-3' : ''}>
                      <p className="text-xs text-ink mb-0.5 leading-tight min-h-[2rem] flex items-start">{p.label}</p>
                      <p className="text-xl font-semibold text-forest">€{p.amount} <span className="text-xs font-normal text-clay">/ notte</span></p>
                    </div>
                  ))}
                </div>
                <div className="mx-4 mt-5 pb-2 flex flex-col gap-2 md:flex-row-reverse md:items-center md:justify-between md:gap-3">
                  <Link href={`/prenota?room=${room.roomId}`} className="inline-flex items-center justify-center w-[88%] self-center md:w-auto md:self-auto h-[52px] md:h-auto rounded-lg bg-green-700 hover:bg-green-800 transition active:scale-[0.97] text-white font-semibold text-[15px] md:text-sm tracking-wide md:px-5 md:py-3 whitespace-nowrap">
                    VERIFICA DISPONIBILITÀ
                  </Link>
                  <Link href={room.href} className="group self-center md:self-auto text-[15px] text-green-700 font-medium py-2 inline-flex items-center gap-1">
                    Scopri la camera <span className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out group-hover:translate-x-1 group-active:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          </Reveal>
          <p className="font-display italic text-center mt-20 md:mt-12 px-4" style={{ fontSize: '22px', color: '#2d6a4f' }}>
            Quando desideri stare vicino a chi ami nei momenti difficili.
          </p>
        </div>
      </section>

      {/* CAMERE DESKTOP: subito dopo hero e benefit — il visitatore vede
          subito cosa può prenotare. Griglia editoriale con le 4 camere reali. */}
      <section id="camere" className="hidden md:block">
        <div className="max-w-[clamp(1240px,92vw,1560px)] mx-auto px-8 pt-8 pb-12">
          <div className="mb-9">
            <h2 className="font-medium text-[30px] leading-[1.2] tracking-[-0.01em]" style={{ color: '#2b2a25' }}>
              Le nostre camere
            </h2>
            <p className="text-[16px] leading-[1.5] text-[#3a3a35] mt-2">
              Quattro camere, ognuna diversa. Scegli quella più adatta al tuo soggiorno.
            </p>
          </div>
          <Reveal>
            <div className="grid grid-cols-4 gap-8">
              {rooms.map((room) => (
                <div key={room.name} className="flex flex-col">
                  {/* 6/5 invece di 4/3: foto più alte e con più presenza,
                      senza appesantire le card (le foto native sono 4/3) */}
                  <Link href={room.href} className="group relative block aspect-[6/5] rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      // La foto verticale di Amelia nel riquadro orizzontale
                      // subirebbe un crop estremo: qui si usa la sua foto
                      // orizzontale reale, già in uso nel carosello mobile.
                      src={room.name === 'Amelia' ? '/camere/singola/amelia-banner.jpg' : room.img}
                      alt={room.name}
                      fill
                      sizes="(min-width: 768px) 300px, 100vw"
                      className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex items-start justify-between gap-2 mt-4 mb-2">
                    <h3 className="text-[19px] font-semibold tracking-[-0.01em]" style={{ color: '#2d6a4f' }}>{room.name}</h3>
                    {room.badge && (
                      <span className="text-[11px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold shrink-0 mt-1">{room.badge}</span>
                    )}
                  </div>
                  <p className="text-[14.5px] leading-[1.6] text-[#3a3a35]">{room.desc}</p>
                  <div className="mt-auto pt-4">
                    <div className="border-t pt-3 flex items-baseline justify-between" style={{ borderColor: '#e7e2d6' }}>
                      <p className="text-[13px] text-clay">
                        da <span className="text-[20px] font-semibold text-forest">€{room.prices[0].amount}</span> / notte
                      </p>
                      <Link href={room.href} className="group text-[14px] text-green-700 font-medium inline-flex items-center gap-1">
                        Scopri la camera <span className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="text-center mt-12">
            <Link href="/prenota"
              className="inline-flex items-center justify-center h-[52px] px-8 rounded-lg bg-green-700 hover:bg-green-800 transition active:scale-[0.97] text-white font-semibold text-base tracking-wide">
              VERIFICA DISPONIBILITÀ
            </Link>
          </div>
        </div>
      </section>

      {/* BLOCCO EMOZIONALE (solo desktop): dopo le camere, prima dei servizi */}
      <section className="hidden md:block">
        <div className="max-w-[720px] mx-auto px-8 pt-6 pb-14">
          <h2 className="font-display italic font-medium text-center text-[34px] leading-[1.15] mb-7" style={{ color: '#2d6a4f' }}>
            Non un albergo. Una casa.
          </h2>
          <div className="max-w-[640px] mx-auto">
            <p className="text-[17px] leading-[1.6] text-[#3a3a35] mb-4">
              Qui trovi la tranquillità di un ambiente curato, la libertà di sentirti a tuo agio e soprattutto una persona su cui poter contare.
            </p>
            <p className="text-[17px] font-medium leading-[1.6] text-[#3a3a35]">
              Perché quando sei lontano da casa per stare vicino a chi ami, anche le piccole attenzioni fanno la differenza.
            </p>
          </div>
          <p className="font-display italic text-center mt-9" style={{ fontSize: '21px', color: '#2d6a4f' }}>
            Quando desideri stare vicino a chi ami nei momenti difficili.
          </p>
        </div>
      </section>

      {/* SERVIZI (solo desktop): fascia orizzontale con i servizi reali del
          sito; sotto md restano le sezioni verticali originali. Arriva dopo
          camere e blocco emozionale: prima il visitatore vede cosa prenotare. */}
      <section className="hidden md:block bg-white">
        <div className="max-w-[clamp(1240px,92vw,1560px)] mx-auto px-8 py-14">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.14em] mb-11" style={{ color: '#2d6a4f' }}>I nostri servizi</h2>
          <div className="grid grid-cols-5 gap-10">
            <div className="flex flex-col items-start gap-3">
              <Clock size={22} strokeWidth={1.8} className="text-green-700" aria-hidden="true" />
              <h3 className="text-[16px] font-semibold" style={{ color: '#1f3d2f' }}>Check-in flessibile</h3>
              <p className="text-[14px] leading-[1.6] text-[#3a3a35]">
                Check-in dalle 15:00 alle 20:00. Quando possibile puoi entrare anche in anticipo, senza costi aggiuntivi.
              </p>
              <a href={WA_CHECKIN_LINK} target="_blank" rel="noopener noreferrer"
                className="group mt-auto text-[14px] font-semibold text-green-700 inline-flex items-center gap-1">
                Arrivi dopo le 20:00? <span className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out group-hover:translate-x-1">→</span>
              </a>
            </div>
            <div className="flex flex-col items-start gap-3">
              <Bus size={22} strokeWidth={1.8} className="text-green-700" aria-hidden="true" />
              <h3 className="text-[16px] font-semibold" style={{ color: '#1f3d2f' }}>Servizio navetta</h3>
              <p className="text-[14px] leading-[1.6] text-[#3a3a35]">
                Veniamo a prenderti noi — da tutti gli aeroporti di Milano, da Centrale, Rogoredo e dai terminal bus.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <Accessibility size={22} strokeWidth={1.8} className="text-green-700" aria-hidden="true" />
              <h3 className="text-[16px] font-semibold" style={{ color: '#1f3d2f' }}>Accessibilità</h3>
              <p className="text-[14px] leading-[1.6] text-[#3a3a35]">
                Casa Ania dispone di rampa di accesso e ascensore.
              </p>
              <Link href="/dormire-vicino-humanitas#accessibilita"
                className="group mt-auto text-[14px] font-semibold text-green-700 inline-flex items-center gap-1">
                Tutti i dettagli <span className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div className="flex flex-col items-start gap-3">
              <Footprints size={22} strokeWidth={1.8} className="text-green-700" aria-hidden="true" />
              <h3 className="text-[16px] font-semibold" style={{ color: '#1f3d2f' }}>Due passi da Humanitas</h3>
              <p className="text-[14px] leading-[1.6] text-[#3a3a35]">
                A soli 140 metri dalla palazzina 8: raggiungi l&apos;ingresso in circa 2 minuti a piedi.
              </p>
              <a href="#dove-siamo"
                className="group mt-auto text-[14px] font-semibold text-green-700 inline-flex items-center gap-1">
                Dove siamo <span className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out group-hover:translate-x-1">→</span>
              </a>
            </div>
            <div className="flex flex-col items-start gap-3">
              <MessageCircle size={22} strokeWidth={1.8} className="text-green-700" aria-hidden="true" />
              <h3 className="text-[16px] font-semibold" style={{ color: '#1f3d2f' }}>Assistenza WhatsApp</h3>
              <p className="text-[14px] leading-[1.6] text-[#3a3a35]">
                Scrivici su WhatsApp: rispondiamo subito. Oppure chiamaci al{' '}
                <a href={TEL_LINK} className="font-semibold text-green-700 whitespace-nowrap">342 700 4354</a>.
              </p>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="group mt-auto text-[14px] font-semibold text-green-700 inline-flex items-center gap-1">
                Scrivi ad Ania <span className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RECENSIONI DESKTOP: orizzontale e ariosa, separatori sottili */}
      <section className="hidden md:block">
        <div className="max-w-[clamp(1240px,92vw,1560px)] mx-auto px-8 pt-12 pb-16">
          <div className="text-center mb-11">
            <p className="text-base font-medium text-[#1f3d2f] mb-3">
              <span style={{ color: '#2d6a4f' }}>★★★★★</span> <span className="font-semibold">5,0 su Google</span>
            </p>
            <h2 className="font-medium text-[34px] leading-[1.2] tracking-[-0.01em]" style={{ color: '#2b2a25' }}>
              Le parole dei nostri ospiti
            </h2>
          </div>
          <Reveal>
            <RecensioniSlider testimonials={testimonials} variant="aria" />
          </Reveal>
          <div className="text-center mt-9">
            <a href="https://maps.google.com/?cid=12687762198889638693" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full border text-sm font-semibold uppercase tracking-wide bg-transparent hover:bg-green-50 transition active:scale-[0.97]"
              style={{ borderColor: '#2d6a4f', color: '#2d6a4f' }}>
              Leggi tutte le recensioni su Google
            </a>
            <p className="text-sm mt-3">
              <Link href="/recensioni" className="inline-block underline py-2" style={{ color: '#6f6a5e', textUnderlineOffset: '4px' }}>
                Recensioni anche su TripAdvisor →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* CHECK-IN FLESSIBILE (mobile: su desktop è nella fascia servizi) */}
      <section className="md:hidden pt-8 pb-4 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-center text-[13px] md:text-sm font-semibold uppercase tracking-[0.14em] mb-5" style={{ color: '#2d6a4f' }}>Check-in flessibile</h2>
          <p className="text-left text-[#3a3a35] text-[18px] font-semibold leading-[1.4] mb-2">
            Check-in dalle 15:00 alle 20:00
          </p>
          <p className="text-left text-[#3a3a35] text-[16px] leading-[1.55] mb-4">
            Se la camera è pronta prima, ti avvisiamo noi: quando possibile puoi entrare anche in anticipo, <strong className="font-bold">senza costi aggiuntivi</strong>.
          </p>
          <p className="text-left text-green-700 text-[17px] font-semibold leading-[1.4] mb-2">
            Pensi di arrivare dopo le 20:00?
          </p>
          <p className="text-left text-[#3a3a35] text-[16px] leading-[1.55] mb-3">
            Nessun problema: avvisaci in anticipo e organizzeremo con te la modalità di accesso.
          </p>
          <a href={WA_CHECKIN_LINK} target="_blank" rel="noopener noreferrer"
            className="group inline-block py-2 text-left text-green-700 text-[15px] font-semibold">
            Arrivi dopo le 20:00? Scrivi ad Ania su <span className="whitespace-nowrap">WhatsApp <span className="inline-block motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out group-hover:translate-x-1 group-active:translate-x-1">→</span></span>
          </a>
        </div>
      </section>

      {/* SERVIZIO NAVETTA (mobile: su desktop è nella fascia servizi) */}
      <section className="md:hidden py-4 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-center text-[13px] md:text-sm font-semibold uppercase tracking-[0.14em] mb-5" style={{ color: '#2d6a4f' }}>Servizio navetta</h2>
          <p className="text-left text-[#3a3a35] leading-relaxed">
            Veniamo a prenderti noi — da tutti gli aeroporti di Milano, da Centrale, Rogoredo e dai terminal bus.
            Autisti di fiducia, prezzo in base alla tratta. Scrivici su WhatsApp con data e orario: rispondiamo subito.
          </p>
        </div>
      </section>

      {/* A DUE PASSI DA HUMANITAS */}
      <section id="dove-siamo" className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-medium text-[24px] md:text-[32px] leading-[1.2] tracking-[-0.01em] mb-4" style={{ color: '#2b2a25' }}>
            A due passi da Humanitas.
          </h2>
          <p className="text-[#3a3a35] leading-relaxed max-w-md mx-auto mb-5">
            Casa Ania si trova a soli <span className="font-bold text-[#1f3d2f]">140 metri</span> dalla palazzina 8 di Humanitas.
            In circa <span className="font-bold text-[#1f3d2f]">2 minuti a piedi</span>{' '}raggiungi l&apos;ingresso, senza bisogno di auto, taxi o mezzi pubblici.
          </p>
          <div className="flex items-center justify-center gap-6 mb-6 text-sm font-semibold text-[#1f3d2f]">
            <span className="flex items-center gap-1.5"><MapPin size={16} strokeWidth={2} className="text-green-700 shrink-0" aria-hidden="true" /> 140 metri</span>
            <span className="flex items-center gap-1.5"><Footprints size={16} strokeWidth={2} className="text-green-700 shrink-0" aria-hidden="true" /> 2 minuti a piedi</span>
          </div>
          <div className="rounded-xl overflow-hidden h-52 md:h-72">
            <iframe
              src="https://www.google.com/maps?q=Via+Liguria+26+Pieve+Emanuele+Milano&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mappa Casa Ania Rozzano"
            />
          </div>
          <a href="https://maps.google.com/?q=Via+Liguria+26+Pieve+Emanuele+Milano" target="_blank" rel="noopener noreferrer"
            style={{ textUnderlineOffset: '4px' }}
            className="inline-block mt-4 text-sm text-green-700 font-semibold underline">
            Apri in Google Maps →
          </a>
          <p className="text-sm text-[#3a3a35] mt-3">Parcheggio gratuito a circa 150 metri.</p>
          <p className="mt-2">
            <Link href="/dormire-vicino-humanitas" style={{ textUnderlineOffset: '4px' }}
              className="text-sm text-green-700 font-semibold underline">
              Come arrivare a Casa Ania →
            </Link>
          </p>
        </div>
      </section>

      {/* ACCESSIBILITÀ (mobile: su desktop è nella fascia servizi) */}
      <section id="accessibilita" className="md:hidden pt-4 pb-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-center text-[13px] md:text-sm font-semibold uppercase tracking-[0.14em] mb-5" style={{ color: '#2d6a4f' }}>Accessibilità</h2>
          <p className="text-left text-[#3a3a35] text-[16px] leading-[1.55] mb-4">
            Casa Ania dispone di <strong className="font-bold">rampa di accesso</strong> e <strong className="font-bold">ascensore</strong>. La carrozzina può accedere alle camere e ai relativi bagni, <strong className="font-bold">ad eccezione del bagno privato della camera Amelia</strong>.
          </p>
          <p className="text-left text-[#3a3a35] text-[16px] leading-[1.55] mb-5">
            Se hai esigenze specifiche di mobilità, scrivici prima del soggiorno: ti aiutiamo a scegliere la camera più adatta.
          </p>
          <Link href="/dormire-vicino-humanitas#accessibilita" style={{ textUnderlineOffset: '4px' }}
            className="group inline-block text-sm text-green-700 font-semibold underline">
            Scopri tutti i dettagli sull&apos;accessibilità <span className="inline-block motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out group-hover:translate-x-1 group-active:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* CTA INTERMEDIA */}
      <section className="pt-8 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 transition active:scale-[0.97] text-white font-semibold px-8 py-3 rounded-full text-sm">
            <MessageCircle size={18} strokeWidth={2} aria-hidden="true" /> Scrivici su WhatsApp
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-center text-[13px] md:text-sm font-semibold uppercase tracking-[0.14em] mb-8" style={{ color: '#2d6a4f' }}>Domande frequenti</h2>
          <div className="text-left space-y-5">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <h3 className="font-semibold text-[#2b2a25] mb-1.5">{q}</h3>
                <p className="text-[#3a3a35] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHIUSURA: A 140 PASSI DA CHI AMI */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-display italic mb-3" style={{ fontSize: '22px', color: '#2d6a4f' }}>
            A 140 passi da chi ami.
          </p>
          <p className="text-[#3a3a35] leading-relaxed max-w-md mx-auto mb-6">
            Quattro camere, una casa tranquilla e Humanitas a due minuti a piedi.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 transition active:scale-[0.97] text-white font-semibold px-8 py-3 rounded-full text-sm">
            <MessageCircle size={18} strokeWidth={2} aria-hidden="true" /> Scrivici su WhatsApp
          </a>
          <p className="text-sm text-[#6f6a5e] mt-4">
            Oppure chiamaci al{' '}
            <a href={TEL_LINK} style={{ textUnderlineOffset: '4px' }} className="text-green-700 font-semibold underline whitespace-nowrap">
              342 700 4354
            </a>
          </p>
        </div>
      </section>

      {/* SEI GIÀ STATO NOSTRO OSPITE? */}
      <section className="pb-10 px-4">
        <div className="max-w-2xl mx-auto text-center border-t border-gray-200 pt-8">
          <p className="text-lg font-semibold text-[#2b2a25] mb-2">Sei già stato nostro ospite?</p>
          <p className="text-sm text-[#6f6a5e] max-w-md mx-auto mb-4">
            La tua recensione può essere utile a chi sta cercando un posto vicino a Humanitas.
          </p>
          <a href="https://maps.google.com/?cid=12687762198889638693" target="_blank" rel="noopener noreferrer"
            style={{ borderColor: '#2d6a4f', color: '#2d6a4f', textUnderlineOffset: '4px' }}
            className="inline-block border hover:bg-green-50 transition px-6 py-2.5 rounded-full text-sm font-semibold">
            Lascia una recensione su Google
          </a>
          <div className="hidden md:flex flex-col items-center mt-4">
            <Image src="/qr-recensioni.png" alt="QR code per recensione Google" width={110} height={110} />
            <p className="text-[#6f6a5e] text-xs mt-1">oppure inquadra col telefono</p>
          </div>
        </div>
      </section>

      {/* WHATSAPP FLOTTANTE */}
      <WhatsAppFab href={WA_LINK} />

    </main>
  )
}
