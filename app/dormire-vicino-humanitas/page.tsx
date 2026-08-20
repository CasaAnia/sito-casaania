import type { Metadata } from 'next'
import Link from 'next/link'
import { Footprints, Car, Plane, TrainFront, Bus, MessageCircle } from 'lucide-react'

const PHONE = '3427004354'
const PHONE_DISPLAY = '342 700 4354'
const WA_LINK = `https://wa.me/39${PHONE}`
const TEL_LINK = `tel:+39${PHONE}`

const TITLE = 'Dormire vicino a Humanitas Rozzano: la guida per chi arriva da fuori'
const DESCRIPTION =
  "Quanto dista, quanto costa e come si arriva: la guida pratica per chi deve dormire vicino all'ospedale Humanitas di Rozzano per un ricovero, un intervento o un ciclo di visite."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/dormire-vicino-humanitas' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    locale: 'it_IT',
    type: 'article',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

const faqs = [
  {
    q: 'Quanto costa dormire vicino a Humanitas?',
    a: "Nella zona intorno all'ospedale una camera doppia costa in genere fra i 90 e i 120 euro a notte, e negli alberghi della zona si superano abitualmente i 100. Da Casa Ania una matrimoniale costa 80 euro, la singola 70, e si arriva a 100 euro solo per quattro persone nella camera più grande.",
  },
  {
    q: 'Conviene dormire a Rozzano o a Milano?',
    a: "Se la ragione del viaggio è l'ospedale, conviene quasi sempre stare vicino. Da Milano centro servono fra i 40 e i 60 minuti a tratta fra metropolitana e autobus, con orari che mal si conciliano con un ingresso in reparto alle sette del mattino o con una dimissione improvvisa.",
  },
  {
    q: 'Si può tornare a riposare fra una visita e l’altra?',
    a: "Sì, ed è uno dei motivi principali per cui conviene stare a due passi. Con l'ospedale a due minuti a piedi si può rientrare negli orari in cui le visite sono chiuse, riposare davvero e tornare.",
  },
  {
    q: 'Quanto tempo prima conviene prenotare?',
    a: "Per un ricovero programmato, il prima possibile: le strutture vicino all'ospedale sono poche e nei periodi pieni si esauriscono. Per un'urgenza vale sempre la pena chiedere lo stesso, perché le disdette dell'ultimo momento sono frequenti.",
  },
  {
    q: 'Serve la macchina?',
    a: "No, se si dorme vicino all'ospedale. Da Casa Ania si arriva a piedi in due minuti. La macchina serve semmai per raggiungere Rozzano dall'autostrada, ma per chi arriva in treno o in aereo esiste il servizio navetta.",
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

export default function DormireVicinoHumanitas() {
  return (
    <main className="min-h-screen text-[#3a3a35]" style={{ backgroundColor: '#f9f6f1' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <Link href="/" className="justify-self-start text-green-800 font-bold hover:text-green-600 transition-colors whitespace-nowrap">
            ← Home
          </Link>
          <p className="justify-self-center font-display text-xl font-semibold text-[#1f3d2f]">Guida</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="justify-self-end bg-green-700 hover:bg-green-800 transition-colors text-white text-xs font-semibold px-4 py-2 rounded-full tracking-widest uppercase whitespace-nowrap">
            WhatsApp
          </a>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-[#1f3d2f] mb-4 leading-tight">
          Dormire vicino a Humanitas Rozzano: la guida per chi arriva da fuori
        </h1>

        <p className="text-[#3a3a35] text-lg leading-relaxed mb-4">
          Se sei arrivato su questa pagina, con ogni probabilità non stai organizzando una vacanza. Qualcuno della
          tua famiglia ha un ricovero, un intervento o un ciclo di visite all&apos;ospedale Humanitas, e in poco
          tempo devi capire dove dormire, quanto costa e come ci si arriva.
        </p>
        <p className="text-[#3a3a35] leading-relaxed mb-10">
          Abbiamo messo insieme in una pagina sola le risposte che ci vengono chieste più spesso al telefono.
          Sono utili anche se poi sceglierai di dormire da un&apos;altra parte.
        </p>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-semibold text-[#1f3d2f] mb-3">Dov&apos;è esattamente l&apos;ospedale</h2>
          <p className="text-[#3a3a35] leading-relaxed mb-3">
            L&apos;IRCCS Humanitas Research Hospital si trova in Via Manzoni 56 a Rozzano, alle porte sud di Milano.
            È un ospedale grande, diviso in palazzine numerate: sulla lettera di convocazione è quasi sempre
            indicato a quale devi presentarti, e conviene guardarlo prima di partire, perché gli ingressi sono
            distanti fra loro.
          </p>
          <p className="text-[#3a3a35] leading-relaxed">
            La zona intorno è residenziale e tranquilla. Il confine fra i comuni di Rozzano e Pieve Emanuele passa
            proprio di lì: molte strutture che si presentano come &quot;di Rozzano&quot; hanno in realtà indirizzo a
            Pieve Emanuele, pur essendo a poche centinaia di metri dall&apos;ospedale. È il nostro caso.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-semibold text-[#1f3d2f] mb-3">Quanto costa dormire in zona</h2>
          <p className="text-[#3a3a35] leading-relaxed mb-3">
            I prezzi degli alloggi vicino a Humanitas cambiano in base al periodo e alla struttura. Da Casa Ania
            i prezzi sono semplici e chiari:
          </p>
          <ul className="text-[#3a3a35] leading-relaxed space-y-1 mb-3">
            <li>• camera singola: <strong>70 €</strong> a notte</li>
            <li>• camera matrimoniale: <strong>80 €</strong> a notte</li>
            <li>• tre persone: <strong>90 €</strong> a notte</li>
            <li>• quattro persone, nella camera più grande: <strong>100 €</strong> a notte</li>
          </ul>
          <p className="text-[#3a3a35] leading-relaxed mb-3">
            Sono prezzi da casa di famiglia, non da albergo: nessuna commissione a nessuno, perché si prenota
            direttamente con noi.
          </p>
          <p className="text-[#3a3a35] leading-relaxed">
            Per un soggiorno di una settimana o dieci giorni il prezzo resta questo. Per chi invece si ferma un mese
            o più — capita spesso a chi accompagna un familiare in una terapia lunga — riusciamo a scendere di
            qualche euro al giorno: è una cosa da concordare al telefono, guardando le date.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-semibold text-[#1f3d2f] mb-3">Perché la distanza conta più di tutto</h2>
          <p className="text-[#3a3a35] leading-relaxed mb-3">
            È la cosa che i nostri ospiti ci dicono più spesso, e quasi nessuno ci pensa prima di arrivare: le
            giornate in ospedale sono fatte di attese lunghe e di orari di visita spezzati. Se dormi a mezz&apos;ora
            di distanza, nelle ore morte non torni indietro: resti seduto in un corridoio.
          </p>
          <p className="text-[#3a3a35] leading-relaxed">
            Se invece sei a due minuti a piedi, torni in camera, ti stendi davvero, ti fai una doccia e riparti. Su
            un ricovero di dieci giorni è la differenza fra arrivare in fondo distrutti o arrivarci interi. Casa
            Ania è a <strong>140 metri dalla palazzina 8</strong>: due minuti di strada, senza auto e senza mezzi.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-semibold text-[#1f3d2f] mb-3">Come si arriva</h2>
          <ul className="text-[#3a3a35] leading-relaxed space-y-4">
            <li className="flex gap-3">
              <Footprints size={20} strokeWidth={1.6} className="text-green-700 shrink-0 mt-1" aria-hidden="true" />
              <span><strong>A piedi:</strong> dall&apos;ospedale alla nostra porta sono due minuti, l&apos;ingresso più vicino è quello della palazzina 8.</span>
            </li>
            <li className="flex gap-3">
              <Car size={20} strokeWidth={1.6} className="text-green-700 shrink-0 mt-1" aria-hidden="true" />
              <span><strong>In auto:</strong> dalla Tangenziale Ovest (A50) uscita Rozzano–Quinto de&apos; Stagni, oppure dalla A7 Milano–Genova uscita Assago/Milanofiori, poi si seguono le indicazioni per Humanitas.</span>
            </li>
            <li className="flex gap-3">
              <Plane size={20} strokeWidth={1.6} className="text-green-700 shrink-0 mt-1" aria-hidden="true" />
              <span><strong>In aereo:</strong> Linate è il più vicino, ma anche da Malpensa e Orio al Serio si arriva senza problemi. Per i nostri ospiti organizziamo il trasferimento con autisti di fiducia: si concorda su WhatsApp indicando data e orario, meglio con qualche giorno di anticipo.</span>
            </li>
            <li className="flex gap-3">
              <TrainFront size={20} strokeWidth={1.6} className="text-green-700 shrink-0 mt-1" aria-hidden="true" />
              <span><strong>In treno:</strong> la stazione più comoda è Milano Rogoredo, collegata a Milano Centrale in pochi minuti con la metropolitana M3. Da lì si prosegue con la nostra navetta oppure in taxi, 15-20 minuti.</span>
            </li>
            <li className="flex gap-3">
              <Bus size={20} strokeWidth={1.6} className="text-green-700 shrink-0 mt-1" aria-hidden="true" />
              <span><strong>In autobus:</strong> le autostazioni di San Donato e Lampugnano sono collegate a Casa Ania con il nostro servizio navetta su richiesta.</span>
            </li>
            <li className="flex gap-3">
              <Bus size={20} strokeWidth={1.6} className="text-green-700 shrink-0 mt-1" aria-hidden="true" />
              <span><strong>Con i mezzi pubblici:</strong> l&apos;autobus 230 parte dal capolinea della metropolitana M2 Abbiategrasso e arriva in Via Manzoni, davanti all&apos;ospedale. Fermano lì anche le linee 220 e 328. Il tram 15 arriva in centro a Rozzano, ma richiede circa 20 minuti a piedi.</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-semibold text-[#1f3d2f] mb-3">Il parcheggio</h2>
          <p className="text-[#3a3a35] leading-relaxed">
            Humanitas ha un parcheggio a pagamento, custodito 24 ore su 24: comodo, ma se ci si ferma molti giorni
            la spesa si sente. In alternativa, a circa 150 metri da noi ci sono due piazzole di sosta gratuite su
            entrambi i lati della strada, poco prima di arrivare. Nella zona residenziale intorno si trova quasi
            sempre posto senza pagare, con un po&apos; di pazienza.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-semibold text-[#1f3d2f] mb-3">Se ti fermi a lungo</h2>
          <p className="text-[#3a3a35] leading-relaxed mb-3">
            Chi accompagna un familiare in una terapia lunga ha bisogno di cose diverse da chi resta una notte:
            spendere meno, potersi organizzare i pasti, non sentirsi in albergo. Ecco cosa trovi da noi, detto
            chiaramente in modo che tu sappia già cosa aspettarti.
          </p>
          <ul className="text-[#3a3a35] leading-relaxed space-y-2">
            <li>• In ogni camera c&apos;è un <strong>piccolo frigorifero</strong>, dove tenere l&apos;acqua, la frutta e quello che si compra al supermercato.</li>
            <li>• C&apos;è un <strong>forno a microonde</strong> a disposizione per scaldare il cibo, e la <strong>macchina del caffè</strong> per cominciare la giornata.</li>
            <li>• <strong>Non c&apos;è una cucina</strong> a disposizione degli ospiti, e <strong>non serviamo la colazione</strong>: preferiamo dirlo prima piuttosto che farlo scoprire all&apos;arrivo.</li>
            <li>• <strong>Non c&apos;è una lavatrice</strong> per gli ospiti. Lenzuola e asciugamani li cambiamo noi ogni quattro notti, con la pulizia completa della camera.</li>
            <li>• Per i soggiorni di un mese o più il prezzo scende di qualche euro al giorno.</li>
          </ul>
        </section>

        <section id="accessibilita" className="mb-10 scroll-mt-24">
          <h2 className="font-display text-2xl font-semibold text-[#1f3d2f] mb-3">Se c&apos;è una carrozzina</h2>
          <p className="text-[#3a3a35] leading-relaxed">
            I gradini all&apos;ingresso del palazzo si superano con una rampa mobile: non è motorizzata, quindi serve
            qualcuno che spinga: se ci dici l&apos;orario di arrivo, troverai una persona ad aspettarti alla rampa.
            L&apos;appartamento è al quarto piano ed è servito dall&apos;ascensore, e all&apos;interno la carrozzina
            si muove liberamente nel corridoio e nelle camere. L&apos;unica limitazione riguarda la camera Amelia:
            la camera è accessibile, ma il suo bagno privato non è raggiungibile in carrozzina. In questo caso
            consigliamo di scegliere una delle altre camere.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-semibold text-[#1f3d2f] mb-4">Domande frequenti</h2>
          <div className="space-y-5">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <h3 className="font-display font-semibold text-[#1f3d2f] mb-1">{q}</h3>
                <p className="text-[#3a3a35] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-gray-200 pt-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-[#1f3d2f] mb-2">Casa Ania</h2>
          <p className="text-[#3a3a35] leading-relaxed mb-5">
            Casa Ania è un affittacamere con quattro camere a 140 metri da Humanitas, in una casa di famiglia. Se
            hai una data, scrivici: ti diciamo subito se siamo liberi, senza impegno.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 transition active:scale-[0.97] text-white font-bold px-6 py-3 rounded-full">
              <MessageCircle size={18} strokeWidth={2} aria-hidden="true" /> Scrivici su WhatsApp
            </a>
            <a href={TEL_LINK}
              className="inline-flex items-center justify-center border border-gray-300 text-[#1f3d2f] font-bold px-6 py-3 rounded-full">
              {PHONE_DISPLAY}
            </a>
          </div>
          <p className="text-sm text-[#6f6a5e] mb-2">
            Scopri le camere:{' '}
            <Link href="/camere/ambra" className="text-green-700 font-semibold underline">Ambra</Link>
            {' · '}
            <Link href="/camere/allegra" className="text-green-700 font-semibold underline">Allegra</Link>
            {' · '}
            <Link href="/camere/lena" className="text-green-700 font-semibold underline">Lena</Link>
            {' · '}
            <Link href="/camere/singola" className="text-green-700 font-semibold underline">Amelia</Link>
          </p>
          <p className="text-sm text-[#6f6a5e]">
            <Link href="/recensioni" className="text-green-700 font-semibold underline">Leggi le recensioni</Link>
          </p>
        </section>
      </article>

      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="Scrivici su WhatsApp"
        className="md:hidden fixed bottom-5 right-5 z-50 bg-green-700 hover:bg-green-800 transition-colors text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg wa-pulse">
        💬
      </a>
    </main>
  )
}
