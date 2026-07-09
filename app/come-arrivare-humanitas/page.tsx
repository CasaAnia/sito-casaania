import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Come arrivare all'Humanitas di Rozzano | Casa Ania a 140 m",
  description:
    "Casa Ania è a 140 metri dall'ospedale Humanitas di Rozzano: 2 minuti a piedi. Indicazioni da aeroporti, stazioni e autostrade, con servizio navetta su richiesta.",
}

const PHONE = '3427004354'
const PHONE_DISPLAY = '342 700 4354'
const WA_LINK = `https://wa.me/39${PHONE}`
const TEL_LINK = `tel:+39${PHONE}`

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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{ textUnderlineOffset: '6px', color: '#1f3d2f' }}
      className="font-display text-lg tracking-wide mb-4 underline"
    >
      {children}
    </h2>
  )
}

export default function ComeArrivare() {
  return (
    <main className="min-h-screen text-gray-900" style={{ backgroundColor: '#f9f6f1' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 text-[#6f6a5e] hover:text-[#3a3a35] text-sm">
            ← Indietro
          </Link>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-700 hover:bg-green-800 transition-colors text-white text-xs font-semibold px-4 py-2 rounded-full tracking-widest uppercase"
          >
            Prenota ora
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="font-display text-3xl font-semibold text-gray-800 mb-4 leading-snug">
          Come arrivare all&apos;ospedale Humanitas da Casa Ania
        </h1>

        <p className="text-[#3a3a35] leading-relaxed mb-3">
          <strong>Casa Ania si trova a 140 metri dall&apos;ospedale Humanitas di Rozzano: dalla porta di
          casa all&apos;ingresso della palazzina 8 bastano 2 minuti a piedi.</strong> Se cerchi un
          affittacamere vicino a Humanitas per un ricovero, una visita o per assistere una persona
          cara, da noi non avrai bisogno di auto, taxi o mezzi pubblici per raggiungere
          l&apos;ospedale: esci e sei arrivato.
        </p>
        <p className="text-[#3a3a35] leading-relaxed mb-6">
          Qui trovi tutte le indicazioni per raggiungere prima Casa Ania — in auto, in treno, in
          aereo o con i mezzi pubblici — e poi l&apos;ospedale a piedi.
        </p>

        <div className="bg-white rounded-2xl p-5 mb-10">
          <p className="text-sm text-gray-700 mb-1">
            📍 <strong>Casa Ania</strong> — Via Liguria 26, Fizzonasco, Pieve Emanuele (MI) 20072
          </p>
          <p className="text-sm text-gray-700 mb-3">
            🏥 <strong>Ospedale Humanitas</strong> — Via Manzoni 56, Rozzano (MI)
          </p>
          <a
            href="https://maps.google.com/?q=Via+Liguria+26+Pieve+Emanuele+Milano"
            target="_blank"
            rel="noopener noreferrer"
           
            className="text-sm text-green-700 font-semibold underline"
          >
            Apri il percorso in Google Maps →
          </a>
        </div>

        <section className="mb-10">
          <SectionTitle>Da Casa Ania a Humanitas: 2 minuti a piedi</SectionTitle>
          <p className="text-[#3a3a35] leading-relaxed mb-3">
            L&apos;ingresso dell&apos;ospedale più vicino a Casa Ania è quello della palazzina 8, a
            soli 140 metri. Al tuo arrivo ti mostriamo il percorso di persona: è semplice, comodo e
            senza barriere.
          </p>
          <p className="text-[#3a3a35] leading-relaxed">
            La vicinanza fa la differenza per chi si sposta più volte al giorno tra la camera e il
            reparto: molti nostri ospiti tornano a riposare in camera durante gli orari di chiusura
            delle visite.
          </p>
        </section>

        <section className="mb-10">
          <SectionTitle>In auto</SectionTitle>
          <ul className="text-[#3a3a35] leading-relaxed space-y-2 list-disc pl-5 mb-4">
            <li>
              <strong>Dalla Tangenziale Ovest di Milano (A50):</strong> uscita Rozzano – Quinto
              de&apos; Stagni, poi segui le indicazioni per Humanitas / Via Manzoni. Casa Ania è in
              Via Liguria 26, a 140 metri dall&apos;ospedale.
            </li>
            <li>
              <strong>Dall&apos;autostrada A7 Milano–Genova:</strong> esci ad Assago / Milanofiori e
              prosegui verso Rozzano / Humanitas.
            </li>
          </ul>
          <p className="text-[#3a3a35] leading-relaxed">
            <strong>Parcheggio:</strong> a circa 150 metri da Casa Ania ci sono due piazzole di
            sosta gratuite, su entrambi i lati della strada. In alternativa puoi usare il parcheggio
            di Humanitas, a pagamento e custodito 24 ore su 24.
          </p>
        </section>

        <section className="mb-10">
          <SectionTitle>In aereo — Malpensa, Linate e Orio al Serio</SectionTitle>
          <p className="text-[#3a3a35] leading-relaxed mb-3">
            Offriamo un servizio navetta con autisti di fiducia da tutti e tre gli aeroporti di
            Milano: Linate (il più vicino, circa 25 minuti), Malpensa e Orio al Serio (circa
            un&apos;ora). Il costo varia in base alla tratta: scrivici su WhatsApp con data, orario
            e aeroporto di arrivo e ti diciamo subito prezzo e disponibilità. Ti consigliamo di
            prenotare la navetta con qualche giorno di anticipo.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-700 hover:bg-green-800 transition-colors text-white font-bold px-6 py-3 rounded-full text-sm"
          >
            💬 Richiedi la navetta su WhatsApp
          </a>
        </section>

        <section className="mb-10">
          <SectionTitle>In treno — Milano Centrale e Rogoredo</SectionTitle>
          <p className="text-[#3a3a35] leading-relaxed">
            Milano Rogoredo è la stazione più comoda: è collegata a Milano Centrale in pochi minuti
            (treni frequenti e metropolitana M3) ed è la più vicina a Rozzano. Da entrambe le
            stazioni puoi richiedere la nostra navetta oppure proseguire in taxi (da Rogoredo circa
            15–20 minuti).
          </p>
        </section>

        <section className="mb-10">
          <SectionTitle>In autobus — San Donato e Lampugnano</SectionTitle>
          <p className="text-[#3a3a35] leading-relaxed">
            Se arrivi con Flixbus o altre linee a lunga percorrenza, le autostazioni di San Donato e
            Lampugnano sono entrambe collegate a Casa Ania con il nostro servizio navetta su
            richiesta.
          </p>
        </section>

        <section className="mb-10">
          <SectionTitle>Con i mezzi pubblici da Milano</SectionTitle>
          <ul className="text-[#3a3a35] leading-relaxed space-y-2 list-disc pl-5">
            <li>
              <strong>Bus 230</strong> — dalla fermata M2 Abbiategrasso (metropolitana verde) fino
              alla fermata Via Manzoni (Ospedale), a pochi minuti a piedi da Casa Ania. È il
              collegamento pubblico più diretto con il centro di Milano.
            </li>
            <li>Vicino all&apos;ospedale fermano anche le linee 220 e 328.</li>
            <li>
              <strong>Tram 15</strong> — collega il centro di Milano a Rozzano, ma dalla fermata
              servono circa 20 minuti a piedi: con i bagagli meglio il bus 230 o la navetta.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <SectionTitle>Domande frequenti</SectionTitle>
          <div className="space-y-5">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <h3 className="font-display font-semibold text-gray-800 mb-1">
                  {q}
                </h3>
                <p className="text-[#3a3a35] leading-relaxed">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-2xl p-6 text-center bg-white">
          <p style={{ color: '#2d6a4f' }} className="text-lg font-semibold uppercase tracking-widest mb-2">
            Prenota il tuo soggiorno vicino a Humanitas
          </p>
          <p className="text-base text-[#6f6a5e] mb-5">
            Camere confortevoli da €70 a notte, check-in flessibile e accoglienza familiare a 140
            metri dall&apos;ospedale.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-700 hover:bg-green-800 transition-colors text-white font-bold px-6 py-3 rounded-full text-sm"
            >
              💬 WhatsApp
            </a>
            <a
              href={TEL_LINK}
              className="border border-gray-300 text-gray-800 font-bold px-6 py-3 rounded-full text-sm"
            >
              📞 {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed bottom-5 right-5 z-50 bg-green-700 hover:bg-green-800 transition-colors text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg"
      >
        💬
      </a>
    </main>
  )
}
