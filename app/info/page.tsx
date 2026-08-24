import type { Metadata } from 'next'
import Link from 'next/link'

const TITLE = 'Informazioni per il tuo soggiorno · a 140 metri da Humanitas'
const DESCRIPTION =
  'Tutte le informazioni utili per il tuo soggiorno: come arrivare, orari di check-in e check-out, contatto WhatsApp.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/info' },
  robots: { index: false, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/og-info.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-info.jpg'],
  },
}

const PHONE = '3427004354'
const PHONE_DISPLAY = '342 700 4354'
const WA_LINK = `https://wa.me/39${PHONE}`
const TEL_LINK = `tel:+39${PHONE}`

export default function Info() {
  return (
    <main className="min-h-screen text-[#3a3a35]" style={{ backgroundColor: '#f9f6f1' }}>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <Link href="/" className="justify-self-start text-green-800 font-bold hover:text-green-600 transition-colors whitespace-nowrap">
            ← Home
          </Link>
          <p className="justify-self-center font-display text-xl font-semibold text-[#1f3d2f]">
            Benvenuti
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="justify-self-end bg-green-700 hover:bg-green-800 transition-colors text-white text-xs font-semibold px-4 py-2 rounded-full tracking-widest uppercase whitespace-nowrap">
            WhatsApp
          </a>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="font-display text-3xl font-semibold text-[#1f3d2f] mb-2">Informazioni per il tuo soggiorno</h1>
        <p className="text-[#6f6a5e] text-sm mb-10">
          Tutto quello che ti serve sapere, in una pagina sola.
        </p>

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold text-[#1f3d2f] mb-2">Come arrivare</h2>
          <p className="text-[#3a3a35] leading-relaxed mb-3">
            Siamo a soli 140 metri dalla palazzina 8 di Humanitas: indicazioni per auto, treno, aereo,
            autobus e mezzi pubblici, oltre alle info sul parcheggio.
          </p>
          <Link href="/dormire-vicino-humanitas" className="inline-block text-sm text-green-700 font-semibold underline">
            Dormire vicino a Humanitas: la guida completa →
          </Link>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold text-[#1f3d2f] mb-2">Check-in e check-out</h2>
          <p className="text-[#3a3a35] leading-relaxed mb-3">
            Il check-in è dalle <strong className="font-bold">15:00 alle 20:00</strong> ed è flessibile. Se hai bisogno di arrivare prima o dopo,
            <strong className="font-bold"> scrivimi su WhatsApp</strong> e ci organizziamo insieme.
          </p>
          <p className="text-[#3a3a35] leading-relaxed mb-3">
            <strong className="font-bold">Il giorno prima del tuo arrivo</strong>, comunicami anche l&apos;orario indicativo in cui pensi di arrivare,
            così posso organizzarmi al meglio per accoglierti.
          </p>
          <p className="text-[#3a3a35] leading-relaxed">
            Il check-out è entro le <strong className="font-bold">10:00</strong>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold text-[#1f3d2f] mb-2">Hai bisogno di qualcosa?</h2>
          <p className="text-[#3a3a35] leading-relaxed mb-4">
            Per qualsiasi necessità durante il soggiorno — bagagli, navetta o richieste particolari — puoi
            scrivermi su WhatsApp o chiamarmi.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="bg-green-700 hover:bg-green-800 transition-colors text-white font-bold px-6 py-3 rounded-full text-sm text-center">
              💬 WhatsApp
            </a>
            <a href={TEL_LINK}
              className="border border-gray-300 text-[#1f3d2f] font-bold px-6 py-3 rounded-full text-sm text-center">
              📞 {PHONE_DISPLAY}
            </a>
          </div>
        </section>

        <section className="border-t border-gray-200 pt-8">
          <Link href="/" className="text-sm text-green-700 font-semibold underline">
            ← Torna alla home
          </Link>
        </section>
      </div>

      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="Scrivici su WhatsApp"
        className="md:hidden fixed bottom-5 right-5 z-50 bg-green-700 hover:bg-green-800 transition-colors text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg wa-pulse">
        💬
      </a>
    </main>
  )
}
