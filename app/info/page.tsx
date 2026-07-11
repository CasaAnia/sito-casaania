import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '../components/Logo'

const TITLE = 'Casa Ania · Informazioni per il tuo soggiorno'
const DESCRIPTION =
  'Tutte le informazioni utili per il tuo soggiorno a Casa Ania: come arrivare, orari di check-in e check-out, contatto WhatsApp.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/og-logo.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-logo.jpg'],
  },
}

const PHONE = '3427004354'
const PHONE_DISPLAY = '342 700 4354'
const WA_LINK = `https://wa.me/39${PHONE}`
const TEL_LINK = `tel:+39${PHONE}`

export default function Info() {
  return (
    <main className="min-h-screen text-gray-900" style={{ backgroundColor: '#f9f6f1' }}>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <Link href="/" className="justify-self-start text-green-800 font-bold hover:text-green-600 transition-colors whitespace-nowrap">
            ← Home
          </Link>
          <Link href="/" className="justify-self-center">
            <Logo compactOnMobile />
          </Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="justify-self-end bg-green-700 hover:bg-green-800 transition-colors text-white text-xs font-semibold px-4 py-2 rounded-full tracking-widest uppercase whitespace-nowrap">
            WhatsApp
          </a>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="font-display text-3xl font-semibold text-gray-800 mb-2">Informazioni per il tuo soggiorno</h1>
        <p className="text-[#6f6a5e] text-sm mb-10">
          Tutto quello che ti serve sapere, in una pagina sola.
        </p>

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold text-gray-800 mb-2">Come arrivare</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Casa Ania è a soli 140 metri dalla palazzina 8 di Humanitas: indicazioni per auto, treno, aereo,
            autobus e mezzi pubblici, oltre alle info sul parcheggio.
          </p>
          <Link href="/#come-arrivare" className="inline-block text-sm text-green-700 font-semibold underline">
            Vedi tutte le indicazioni →
          </Link>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold text-gray-800 mb-2">Check-in e check-out</h2>
          <p className="text-gray-700 leading-relaxed">
            Il check-in è dalle 15:00 alle 20:00, il check-out entro le 10:00. Se arrivi prima o dopo questi
            orari, scrivici su WhatsApp il giorno precedente: troviamo sempre una soluzione.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold text-gray-800 mb-2">Contattaci</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Per qualsiasi necessità durante il soggiorno — bagagli, navetta, richieste particolari — siamo
            raggiungibili su WhatsApp o per telefono.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="bg-green-700 hover:bg-green-800 transition-colors text-white font-bold px-6 py-3 rounded-full text-sm text-center">
              💬 WhatsApp
            </a>
            <a href={TEL_LINK}
              className="border border-gray-300 text-gray-800 font-bold px-6 py-3 rounded-full text-sm text-center">
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
    </main>
  )
}
