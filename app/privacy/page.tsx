import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Casa Ania Rozzano',
  description:
    "Informativa sulla privacy di Casa Ania Rozzano: dati raccolti tramite il modulo di prenotazione, finalità del trattamento e diritti dell'interessato.",
}

const WA_LINK = 'https://wa.me/393427004354'

export default function Privacy() {
  return (
    <main className="min-h-screen text-gray-900" style={{ backgroundColor: '#f9f6f1' }}>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-green-800 font-bold hover:text-green-600 transition-colors">
            ← Indietro
          </Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="bg-green-700 hover:bg-green-800 transition-colors text-white text-xs font-semibold px-4 py-2 rounded-full tracking-widest uppercase">
            Prenota ora
          </a>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="font-display text-3xl font-semibold text-gray-800 mb-2">Privacy Policy</h1>
        <p className="text-[#6f6a5e] text-sm mb-8">Ultimo aggiornamento: luglio 2026</p>

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold text-gray-800 mb-2">Titolare del trattamento</h2>
          <p className="text-gray-700 leading-relaxed">
            Il Titolare del trattamento dei dati raccolti tramite questo sito è <strong>Sawicka Anna Janina</strong>,
            con sede in Via Liguria 26, Fizzonasco di Pieve Emanuele (MI) 20072. Per qualsiasi richiesta relativa
            al trattamento dei dati personali è possibile contattare il Titolare al numero di telefono{' '}
            <a href="tel:+393427004354" className="text-green-700 font-semibold underline">342 700 4354</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold text-gray-800 mb-2">Dati raccolti</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Attraverso il modulo di prenotazione presente sul sito raccogliamo i seguenti dati: nome e cognome,
            numero di telefono, numero di ospiti, date di check-in e check-out ed eventuale camera preferita.
            Questi dati sono necessari per verificare la disponibilità delle camere e gestire la richiesta di
            prenotazione.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Non è richiesto alcun indirizzo email: le comunicazioni relative alla prenotazione avvengono tramite
            WhatsApp o telefono, ai recapiti forniti dall&apos;ospite.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold text-gray-800 mb-2">Finalità e base giuridica del trattamento</h2>
          <p className="text-gray-700 leading-relaxed mb-3">I dati vengono trattati per:</p>
          <ul className="text-gray-700 leading-relaxed space-y-2 list-disc pl-5 mb-3">
            <li>gestire la richiesta di prenotazione e verificare la disponibilità delle camere;</li>
            <li>contattare l&apos;ospite, via WhatsApp o telefono, per confermare il soggiorno;</li>
            <li>adempiere agli obblighi di legge connessi all&apos;attività ricettiva, ad esempio le comunicazioni alle autorità di pubblica sicurezza e gli adempimenti fiscali.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            La base giuridica del trattamento è l&apos;esecuzione di misure precontrattuali adottate su richiesta
            dell&apos;interessato (art. 6.1.b GDPR) e l&apos;adempimento di obblighi legali (art. 6.1.c GDPR).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold text-gray-800 mb-2">Modalità del trattamento e conservazione</h2>
          <p className="text-gray-700 leading-relaxed">
            I dati sono trattati con strumenti informatici e conservati sulla piattaforma cloud Supabase, che
            agisce in qualità di responsabile del trattamento per conto del Titolare, con misure di sicurezza
            tecniche e organizzative adeguate a prevenire accessi non autorizzati. I dati relativi alle
            prenotazioni sono conservati per il tempo necessario a gestire il soggiorno e per adempiere agli
            obblighi di legge in materia fiscale e di pubblica sicurezza previsti per le strutture ricettive.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold text-gray-800 mb-2">Servizi di terze parti</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Il sito utilizza i seguenti servizi di terze parti:
          </p>
          <ul className="text-gray-700 leading-relaxed space-y-2 list-disc pl-5 mb-3">
            <li>
              <strong>Google Maps</strong> — per mostrare la posizione della struttura è incorporata una mappa di
              Google (iframe). L&apos;utilizzo della mappa comporta l&apos;interazione con i server di Google LLC,
              soggetta all&apos;informativa privacy di Google, consultabile su{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-green-700 font-semibold underline">policies.google.com/privacy</a>.
            </li>
            <li>
              <strong>WhatsApp</strong> — i contatti avviati tramite i pulsanti WhatsApp del sito avvengono
              sull&apos;applicazione WhatsApp (Meta), soggetta alla relativa informativa privacy.
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Il sito non utilizza cookie di profilazione, né servizi di analisi statistica (analytics) o
            pubblicitari di terze parti. Per maggiori dettagli sui cookie consulta la nostra{' '}
            <Link href="/cookie" className="text-green-700 font-semibold underline">Cookie Policy</Link>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold text-gray-800 mb-2">Diritti dell&apos;interessato</h2>
          <p className="text-gray-700 leading-relaxed">
            In qualsiasi momento è possibile esercitare i diritti previsti dagli artt. 15-22 del GDPR: accesso,
            rettifica, cancellazione, limitazione del trattamento, opposizione e portabilità dei dati, scrivendo
            al Titolare ai contatti indicati sopra. È inoltre possibile proporre reclamo al Garante per la
            protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-green-700 font-semibold underline">www.garanteprivacy.it</a>).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-800 mb-2">Aggiornamenti</h2>
          <p className="text-gray-700 leading-relaxed">
            La presente informativa può essere aggiornata nel tempo; la versione in vigore è sempre quella
            pubblicata su questa pagina.
          </p>
        </section>
      </div>

      <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
        className="md:hidden fixed bottom-5 right-5 z-50 bg-green-700 hover:bg-green-800 transition-colors text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg">
        💬
      </a>
    </main>
  )
}
