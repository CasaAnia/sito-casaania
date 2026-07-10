import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | Casa Ania Rozzano',
  description:
    'Cookie Policy di Casa Ania Rozzano: il sito non utilizza cookie di profilazione né analytics di terze parti, ad eccezione della mappa Google Maps incorporata.',
}

const WA_LINK = 'https://wa.me/393427004354'

export default function Cookie() {
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
        <h1 className="font-display text-3xl font-semibold text-gray-800 mb-2">Cookie Policy</h1>
        <p className="text-[#6f6a5e] text-sm mb-8">Ultimo aggiornamento: luglio 2026</p>

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold text-gray-800 mb-2">Cosa sono i cookie</h2>
          <p className="text-gray-700 leading-relaxed">
            I cookie sono piccoli file di testo che i siti visitati inviano al dispositivo dell&apos;utente, dove
            vengono memorizzati per poi essere ritrasmessi agli stessi siti in visite successive.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold text-gray-800 mb-2">Cookie utilizzati da questo sito</h2>
          <p className="text-gray-700 leading-relaxed">
            Questo sito <strong>non utilizza cookie di profilazione</strong>, cookie statistici o di analisi
            (analytics) né cookie pubblicitari di terze parti. Non sono presenti strumenti di tracciamento come
            Google Analytics, Meta Pixel o simili, e il sito non installa alcun cookie proprio (tecnico o di
            altro tipo) sul dispositivo dell&apos;utente.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold text-gray-800 mb-2">Cookie di terze parti — Google Maps</h2>
          <p className="text-gray-700 leading-relaxed">
            Nella sezione &quot;Dove siamo&quot; della homepage è incorporata una mappa di Google Maps tramite
            iframe, per mostrare la posizione della struttura. Il caricamento della mappa può comportare
            l&apos;impostazione di cookie da parte di Google LLC, secondo le finalità e le modalità descritte
            nell&apos;informativa privacy di Google (
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-green-700 font-semibold underline">policies.google.com/privacy</a>
            ) e nella relativa policy sui cookie (
            <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-green-700 font-semibold underline">policies.google.com/technologies/cookies</a>
            ). Questi cookie non sono controllati né accessibili dal Titolare di questo sito.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold text-gray-800 mb-2">Come gestire i cookie</h2>
          <p className="text-gray-700 leading-relaxed">
            È possibile gestire o eliminare i cookie in qualsiasi momento tramite le impostazioni del proprio
            browser. Disabilitare i cookie di terze parti potrebbe impedire la corretta visualizzazione della
            mappa incorporata, senza compromettere nessun&apos;altra funzionalità del sito.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-gray-800 mb-2">Titolare del trattamento</h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>Sawicka Anna Janina</strong>, Via Liguria 26, Fizzonasco di Pieve Emanuele (MI) 20072.
            Contatto: <a href="tel:+393427004354" className="text-green-700 font-semibold underline">342 700 4354</a>.
            Per informazioni sul trattamento dei dati personali raccolti tramite il modulo di prenotazione
            consulta la nostra <Link href="/privacy" className="text-green-700 font-semibold underline">Privacy Policy</Link>.
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
