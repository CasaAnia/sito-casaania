import type { Metadata } from 'next'
import Link from 'next/link'
import { Car, Plane, TrainFront, Bus, MessageCircle } from 'lucide-react'

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

// Le 4 FAQ visibili in pagina: lo stesso array alimenta il FAQ structured data,
// così schema e contenuto reale non possono divergere.
const faqs: { q: string; a: string[] }[] = [
  {
    q: 'Quanto dista Casa Ania da Humanitas?',
    a: ['Casa Ania si trova a circa 140 metri dalla palazzina 8 di Humanitas, circa due minuti a piedi.'],
  },
  {
    q: 'Quanto tempo prima conviene prenotare?',
    a: [
      'Se conosci già le date di una visita, un intervento o un ricovero, ti consiglio di verificare la disponibilità appena possibile.',
      'Casa Ania ha solamente quattro camere, quindi in alcuni periodi possono riempirsi rapidamente.',
      "Se hai bisogno di una camera all'ultimo momento, scrivimi comunque: controllo subito la disponibilità.",
    ],
  },
  {
    q: "Posso arrivare in treno o in aereo senza noleggiare un'auto?",
    a: ['Sì. Puoi raggiungere Humanitas con i mezzi pubblici oppure chiedermi informazioni sul servizio transfer su richiesta da aeroporti, stazioni e terminal bus.'],
  },
  {
    q: 'Casa Ania è accessibile in carrozzina?',
    a: [
      "L'ingresso è superabile con una rampa mobile e l'appartamento è raggiungibile con ascensore.",
      "Le camere sono accessibili; il bagno privato della camera Amelia è l'unica eccezione e non è accessibile in carrozzina.",
      'Se utilizzi una carrozzina, scrivimi prima della prenotazione così possiamo scegliere insieme la sistemazione più adatta.',
    ],
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a.join(' ') },
  })),
}

const h2 = 'text-2xl font-semibold text-[#1f3d2f] mb-3'
const h3 = 'text-lg font-semibold text-[#1f3d2f] mb-2 flex items-center gap-2'
const p = 'text-[#3a3a35] leading-relaxed'
const iconProps = { size: 20, strokeWidth: 1.6, className: 'text-green-700 shrink-0', 'aria-hidden': true as const }

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
          <p className="justify-self-center text-xl font-semibold text-[#1f3d2f]">Guida</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="justify-self-end bg-green-700 hover:bg-green-800 transition-colors text-white text-xs font-semibold px-4 py-2 rounded-full tracking-widest uppercase whitespace-nowrap">
            WhatsApp
          </a>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#1f3d2f] mb-4 leading-tight">
          Dormire vicino a Humanitas Rozzano: una guida pratica per il tuo soggiorno
        </h1>

        <p className={`${p} text-lg mb-4`}>
          Se stai cercando dove dormire vicino a Humanitas Rozzano, probabilmente hai già molte cose a cui
          pensare: una visita, un intervento, un ricovero o una persona cara da accompagnare.
        </p>
        <p className={`${p} mb-4`}>
          Per questo ho raccolto qui le informazioni che vengono chieste più spesso: quanto dista
          l&apos;ospedale, quanto costa soggiornare, come arrivare, dove parcheggiare e cosa trovi a Casa Ania.
        </p>
        <p className={`${p} mb-10`}>
          L&apos;obiettivo è aiutarti a organizzarti con un po&apos; più di semplicità, anche se poi sceglierai
          di soggiornare altrove.
        </p>

        <section className="mb-10">
          <h2 className={h2}>Dove si trova Humanitas</h2>
          <p className={`${p} mb-3`}>
            Humanitas Research Hospital si trova in <strong className="font-bold">Via Manzoni 56</strong>{' '}a
            Rozzano, a sud di Milano. L&apos;ospedale è grande e suddiviso in diversi building o palazzine:
            prima di partire è utile controllare sulla documentazione dell&apos;appuntamento o del ricovero a
            quale edificio devi presentarti.
          </p>
          <p className={`${p} mb-3`}>
            Casa Ania si trova in <strong className="font-bold">Via Liguria 26, Fizzonasco – Pieve
            Emanuele</strong>, proprio al confine con Rozzano.
          </p>
          <p className={`${p} mb-3`}>
            La cosa importante, però, è la distanza reale dall&apos;ospedale:
          </p>
          <p className={`${p} mb-3`}>
            Casa Ania è a circa <strong className="font-bold">140 metri dalla palazzina 8</strong> di Humanitas.
          </p>
          <p className={p}>
            Sono circa <strong className="font-bold">due minuti a piedi</strong>{' '}e, una volta arrivato, non
            hai bisogno dell&apos;auto o dei mezzi pubblici per andare e tornare dall&apos;ospedale.
          </p>
        </section>

        <section className="mb-10">
          <h2 className={h2}>Perché essere così vicini può fare la differenza</h2>
          <p className={`${p} mb-3`}>
            Quando le giornate sono scandite dagli orari dell&apos;ospedale, poter tornare in camera in pochi
            minuti può essere davvero comodo.
          </p>
          <p className={`${p} mb-3`}>
            Tra una visita e l&apos;altra puoi rientrare, riposarti, fare una doccia o semplicemente avere un
            posto tranquillo in cui aspettare.
          </p>
          <p className={p}>
            Anche per chi accompagna un familiare, sapere di avere la camera a pochi passi permette di
            organizzare la giornata con molta più libertà, senza dover affrontare ogni volta spostamenti in
            auto o con i mezzi.
          </p>
        </section>

        <section className="mb-10">
          <h2 className={h2}>Quanto costa dormire da Casa Ania</h2>
          <p className={`${p} mb-3`}>
            I prezzi sono chiari e dipendono dalla camera e dal numero di persone:
          </p>
          <ul className={`${p} space-y-1 mb-3`}>
            <li>• Camera singola: <strong className="font-bold">70 €</strong> a notte</li>
            <li>• Camera matrimoniale: <strong className="font-bold">80 €</strong> a notte</li>
            <li>• 3 persone: <strong className="font-bold">90 €</strong> a notte</li>
            <li>• 4 persone: <strong className="font-bold">100 €</strong> a notte</li>
          </ul>
          <p className={p}>
            La prenotazione avviene direttamente con Casa Ania, senza commissioni di portali esterni.
          </p>
        </section>

        <section className="mb-10">
          <h2 className={`${h2} mb-4`}>Come arrivare</h2>

          <div className="mb-6">
            <h3 className={h3}><Car {...iconProps} /> In auto</h3>
            <p className={`${p} mb-3`}>
              Humanitas si trova in <strong className="font-bold">Via Manzoni 56, Rozzano</strong>.
            </p>
            <p className={`${p} mb-3`}>
              Dalle principali autostrade si raggiunge attraverso la Tangenziale Ovest; tra i percorsi di
              accesso indicati da Humanitas c&apos;è l&apos;uscita <strong className="font-bold">Quinto
              de&apos; Stampi / Via dei Missaglia (7 bis)</strong>, seguendo poi le indicazioni per
              l&apos;ospedale.
            </p>
            <p className={`${p} mb-3`}>
              Quando avrai confermato la prenotazione, potrai utilizzare direttamente l&apos;indirizzo di Casa Ania:
            </p>
            <p className={p}>
              <strong className="font-bold">Via Liguria 26, Fizzonasco – Pieve Emanuele (MI)</strong>.
            </p>
          </div>

          <div className="mb-6">
            <h3 className={h3}><Bus {...iconProps} /> Con i mezzi pubblici da Milano</h3>
            <p className={`${p} mb-3`}>
              Uno dei collegamenti più semplici è:
            </p>
            <p className={`${p} mb-3`}>
              <strong className="font-bold">Metropolitana M2 → Abbiategrasso → autobus 230 → fermata Via
              Manzoni (Ospedale)</strong>.
            </p>
            <p className={`${p} mb-3`}>
              La linea 230 collega il capolinea della M2 di Piazza Abbiategrasso con Humanitas.
            </p>
            <p className={`${p} mb-3`}>
              Dal centro di Milano è possibile utilizzare anche il <strong className="font-bold">tram
              15</strong> fino a Rozzano; dalla zona Via Grandi/Via Buozzi restano circa{' '}
              <strong className="font-bold">15 minuti a piedi</strong>{' '}per raggiungere l&apos;ospedale.
            </p>
            <p className={p}>
              Per arrivare direttamente davanti all&apos;ospedale, quindi, la combinazione M2 + 230 è
              generalmente più pratica.
            </p>
          </div>

          <div className="mb-6">
            <h3 className={h3}><TrainFront {...iconProps} /> Se arrivi in treno</h3>
            <p className={`${p} mb-3`}>
              Se arrivi a <strong className="font-bold">Milano Centrale</strong> o{' '}
              <strong className="font-bold">Milano Rogoredo</strong>, puoi proseguire verso Humanitas con i
              mezzi pubblici, in taxi oppure chiedermi informazioni sul servizio transfer.
            </p>
            <p className={p}>
              Per chi viaggia con valigie, arriva molto presto o molto tardi, oppure preferisce evitare diversi
              cambi, posso organizzare il trasferimento con uno dei nostri autisti di fiducia.
            </p>
          </div>

          <div className="mb-6">
            <h3 className={h3}><Plane {...iconProps} /> Se arrivi in aereo</h3>
            <p className={`${p} mb-3`}>
              Casa Ania può organizzare su richiesta il trasferimento da:
            </p>
            <p className={`${p} mb-3`}>
              <strong className="font-bold">Milano Linate, Milano Malpensa e Orio al Serio</strong>.
            </p>
            <p className={`${p} mb-3`}>
              Per conoscere disponibilità e prezzo, scrivimi su WhatsApp indicando aeroporto, data e orario di arrivo.
            </p>
            <p className={p}>
              Se puoi, contattami con <strong className="font-bold">qualche giorno di anticipo</strong>: è
              più facile organizzare il servizio e garantirti la disponibilità dell&apos;autista.
            </p>
          </div>

          <div>
            <h3 className={h3}><Bus {...iconProps} /> Se arrivi in autobus</h3>
            <p className={p}>
              Se il tuo viaggio termina ai terminal di <strong className="font-bold">San Donato</strong> o{' '}
              <strong className="font-bold">Lampugnano</strong>, puoi chiedermi anche in questo caso
              informazioni sul transfer fino a Casa Ania.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className={h2}>Dove parcheggiare</h2>
          <p className={`${p} mb-3`}>
            Humanitas dispone di diversi parcheggi a pagamento per pazienti e familiari.
          </p>
          <p className={`${p} mb-3`}>
            Attualmente la tariffa giornaliera dei parcheggi ordinari è di{' '}
            <strong className="font-bold">8 €</strong>{' '}per l&apos;intera giornata. Il P3, destinato alla
            sosta breve, ha una tariffa giornaliera differente, pari a{' '}
            <strong className="font-bold">15 €</strong>.
          </p>
          <p className={`${p} mb-3`}>
            Le tariffe possono cambiare nel tempo, quindi per gli aggiornamenti è sempre meglio consultare Humanitas.
          </p>
          <p className={`${p} mb-3`}>
            Se preferisci lasciare l&apos;auto gratuitamente, a circa{' '}
            <strong className="font-bold">150 metri</strong> da Casa Ania ci sono{' '}
            <strong className="font-bold">due aree di sosta pubblica gratuita</strong>, una su ciascun lato
            della strada.
          </p>
          <p className={`${p} mb-3`}>
            Sono parcheggi pubblici non custoditi e i posti non sono riservabili.
          </p>
          <p className={p}>
            Anche nelle strade residenziali della zona sono presenti altri posti auto gratuiti.
          </p>
        </section>

        <section className="mb-10">
          <h2 className={h2}>Cosa trovi a Casa Ania</h2>
          <p className={`${p} mb-3`}>
            Casa Ania è un affittacamere con quattro camere. L&apos;ambiente è semplice, tranquillo e pensato
            soprattutto per chi ha bisogno di avere Humanitas molto vicino.
          </p>
          <p className={`${p} mb-2`}>In camera trovi:</p>
          <ul className={`${p} space-y-1 mb-3`}>
            <li>• aria condizionata e riscaldamento</li>
            <li>• Wi-Fi gratuito</li>
            <li>• TV</li>
            <li>• piccolo frigorifero</li>
            <li>• biancheria e asciugamani</li>
            <li>• phon</li>
          </ul>
          <p className={`${p} mb-3`}>
            A disposizione degli ospiti ci sono inoltre un forno a microonde e una macchina del caffè.
          </p>
          <p className={`${p} mb-3`}>
            Preferisco essere chiara anche su ciò che non c&apos;è:
          </p>
          <p className={`${p} mb-3`}>
            <strong className="font-bold">non c&apos;è una cucina</strong> a disposizione degli ospiti,{' '}
            <strong className="font-bold">non serviamo la colazione</strong> e{' '}
            <strong className="font-bold">non c&apos;è una lavatrice</strong> utilizzabile dagli ospiti.
          </p>
          <p className={p}>
            Per soggiorni di più notti, lenzuola e asciugamani vengono cambiati{' '}
            <strong className="font-bold">ogni quattro notti</strong>, insieme alla pulizia completa della camera.
          </p>
        </section>

        <section id="accessibilita" className="mb-10 scroll-mt-24">
          <h2 className={h2}>Se utilizzi una carrozzina</h2>
          <p className={`${p} mb-3`}>
            L&apos;ingresso del palazzo presenta alcuni gradini che possono essere superati utilizzando una{' '}
            <strong className="font-bold">rampa mobile</strong>.
          </p>
          <p className={`${p} mb-3`}>
            La rampa non è motorizzata e serve quindi una persona che aiuti a spingere la carrozzina.
          </p>
          <p className={`${p} mb-3`}>
            Se mi comunichi l&apos;orario di arrivo <strong className="font-bold">il giorno
            precedente</strong>, posso organizzarmi per assisterti all&apos;ingresso.
          </p>
          <p className={`${p} mb-3`}>
            L&apos;appartamento si trova al quarto piano ed è raggiungibile con l&apos;ascensore.
            All&apos;interno, la carrozzina può muoversi nel corridoio e nelle camere.
          </p>
          <p className={`${p} mb-3`}>
            C&apos;è però un&apos;importante eccezione: la camera Amelia è accessibile, ma{' '}
            <strong className="font-bold">il suo bagno privato non è accessibile in carrozzina</strong>.
          </p>
          <p className={p}>
            Se hai esigenze particolari di mobilità, scrivimi prima di prenotare: posso aiutarti a capire quale
            camera è più adatta.
          </p>
        </section>

        <section className="mb-10">
          <h2 className={h2}>Check-in e check-out</h2>
          <p className={`${p} mb-3`}>
            Il check-in è dalle <strong className="font-bold">15:00 alle 20:00</strong> ed è flessibile. Se
            hai bisogno di arrivare prima o dopo,
            <strong className="font-bold"> scrivimi su WhatsApp</strong> e ci organizziamo insieme.
          </p>
          <p className={`${p} mb-3`}>
            <strong className="font-bold">Il giorno prima del tuo arrivo</strong>, comunicami anche
            l&apos;orario indicativo in cui pensi di arrivare, così posso organizzarmi al meglio per accoglierti.
          </p>
          <p className={p}>
            Il check-out è entro le <strong className="font-bold">10:00</strong>.
          </p>
        </section>

        <section className="mb-10">
          <h2 className={`${h2} mb-4`}>Domande frequenti</h2>
          <div className="space-y-5">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <h3 className="font-semibold text-[#1f3d2f] mb-1">{q}</h3>
                {a.map(par => (
                  <p key={par} className={`${p} mb-2 last:mb-0`}>{par}</p>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-gray-200 pt-8 text-center">
          <h2 className={`${h2} mb-2`}>Hai bisogno di una camera vicino a Humanitas?</h2>
          <p className={`${p} mb-3`}>
            Se conosci già le date del soggiorno, scrivimi su WhatsApp: controllo subito la disponibilità e ti
            rispondo direttamente.
          </p>
          <p className={`${p} mb-5`}>
            Nessun call center e nessun passaggio attraverso un portale: ti risponde Ania.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 transition active:scale-[0.97] text-white font-bold px-6 py-3 rounded-full">
              <MessageCircle size={18} strokeWidth={2} aria-hidden="true" /> Scrivimi su WhatsApp
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

      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="Scrivimi su WhatsApp"
        className="md:hidden fixed bottom-5 right-5 z-50 bg-green-700 hover:bg-green-800 transition-colors text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg wa-pulse">
        💬
      </a>
    </main>
  )
}
