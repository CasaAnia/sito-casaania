import Link from 'next/link'
import Logo from '../components/Logo'

export const metadata = {
  title: 'Recensioni – Casa Ania | Affittacamere a 140 m da Humanitas Rozzano',
  description:
    "Cosa dicono i nostri ospiti: recensioni raccolte su Google e su TripAdvisor. Camere pulite e accoglienti a 140 metri dall'ospedale Humanitas di Rozzano.",
}

const googleReviews = [
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
    text: 'Ho soggiornato diverse volte e mi son trovata sempre bene. Le camere sono spaziose, pulite, comode e confortevoli, dotate di accessori, frigo, tv... il terrazzo è grazioso, con vista panoramica.',
  },
  {
    name: 'Caterina L.',
    rating: 5,
    text: 'Disponibilità eccezionale, camere eccellenti, pulite e accoglienti. Ania persona eccezionale, disponibilissima, ci ha aiutati tantissimo nel momento di bisogno.',
  },
  {
    name: 'Maria Giovanna F.',
    rating: 5,
    text: "Comodissima, vicina all'Humanitas per qualsiasi bisogno. La stanza molto pulita e il personale molto disponibile e accogliente. Lo consiglio.",
  },
  {
    name: 'Francesco P.',
    rating: 5,
    text: 'Perla di Rozzano. Ospitalità top. Ania merita 7 stelle!!!',
  },
  {
    name: 'Irena S.',
    rating: 5,
    text: 'Bellissimo posto, ambiente pulito e profumato, ottima accoglienza da parte della gentilissima proprietaria Ania.',
  },
  {
    name: 'Dorota',
    rating: 5,
    text: 'B&B ottima struttura, perfetta posizione. Camere pulite e accoglienti. La signora Anna molto gentile e professionale.',
  },
  {
    name: 'Antonino V.',
    rating: 5,
    text: 'Titolare molto disponibile e gentile, struttura molto bella e comoda, da consigliare per chi va in Humanitas.',
  },
  {
    name: 'Gianvito O.',
    rating: 5,
    text: 'Camere pulite, ottima posizione, personale molto disponibile e affidabile. Vivamente consigliato.',
  },
  {
    name: 'Giovanna F.',
    rating: 5,
    text: "B&B molto pulito, accogliente, vicinissimo per chi deve recarsi all'Humanitas. La padrona di casa molto disponibile a soddisfare le esigenze del cliente.",
  },
  {
    name: 'Raffaella O.',
    rating: 5,
    text: "Vicinissima all'ospedale Humanitas, la pulizia è ottima e il personale è molto cordiale e disponibile.",
  },
  {
    name: 'Anna E. J.',
    rating: 5,
    text: 'Ottima posizione, ottimo servizio, Ania molto disponibile e accogliente. Torniamo sicuramente.',
  },
  {
    name: 'Salvatore S.',
    rating: 5,
    text: 'Casa accogliente e pulita e la signora Ania persona gentilissima.',
  },
  {
    name: 'Michela B.',
    rating: 5,
    text: 'Ottima struttura e camere molto pulite.',
  },
  {
    name: 'Sandro T.',
    rating: 5,
    text: 'Ottima struttura.',
  },
]

const tripadvisorReviews = [
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

function ReviewCard({ name, rating, text }: { name: string; rating: number; text: string }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <p style={{ color: '#2d6a4f' }} className="text-xs mb-1">
        {'★'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </p>
      <p className="text-gray-700 text-sm italic leading-relaxed mb-2">"{text}"</p>
      <p className="text-xs font-semibold text-gray-800">{name}</p>
    </div>
  )
}

export default function Recensioni() {
  return (
    <main className="min-h-screen text-gray-900" style={{ backgroundColor: '#f9f6f1' }}>
      {/* HEADER */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <Link href="/" className="justify-self-start text-green-800 font-bold hover:text-green-600 transition-colors whitespace-nowrap">
            ← Indietro
          </Link>
          <Link href="/" className="justify-self-center">
            <Logo compactOnMobile />
          </Link>
          <Link href="/prenota"
            className="justify-self-end bg-green-700 hover:bg-green-800 transition-colors text-white text-xs font-semibold px-4 py-2 rounded-full tracking-widest uppercase whitespace-nowrap">
            Prenota ora
          </Link>
        </div>
      </header>

      {/* TITOLO */}
      <section className="pt-10 pb-4 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 style={{ color: '#1f3d2f' }} className="font-display text-3xl md:text-4xl font-semibold mb-3 leading-tight tracking-wide">
            Cosa dicono di noi
          </h2>
          <p className="text-gray-700">
            <span style={{ color: '#2d6a4f' }}>★★★★★</span> <strong>5,0 su Google</strong>
          </p>
        </div>
      </section>

      {/* RECENSIONI GOOGLE */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={{ textUnderlineOffset: '6px' }} className="text-center text-gray-700 text-lg font-semibold uppercase tracking-wider mb-8 underline">
            Recensioni raccolte su Google
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {googleReviews.map((r, i) => (
              <ReviewCard key={i} {...r} />
            ))}
          </div>
          <div className="text-center mt-6">
            <a
              href="https://maps.google.com/?cid=12687762198889638693"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-700 font-semibold underline"
            >
              Vedi tutte le recensioni su Google Maps →
            </a>
          </div>
        </div>
      </section>

      {/* RECENSIONI TRIPADVISOR */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <p style={{ textUnderlineOffset: '6px' }} className="text-center text-gray-700 text-lg font-semibold uppercase tracking-wider mb-8 underline">
            Recensioni raccolte su TripAdvisor
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tripadvisorReviews.map((r, i) => (
              <ReviewCard key={i} {...r} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA LASCIA RECENSIONE */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display text-xl font-semibold text-gray-700 mb-2">Sei già stato nostro ospite?</p>
          <p className="text-[#3a3a35] text-sm max-w-md mx-auto mb-4">
            Se ti sei trovato bene, racconta la tua esperienza su Google: aiuterai altre famiglie a trovare un posto accogliente a due passi dall'ospedale.
          </p>
          <a
            href="https://maps.google.com/?cid=12687762198889638693"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: '#2d6a4f' }}
            className="inline-block hover:opacity-90 transition-opacity text-white font-semibold px-6 py-2.5 rounded-full text-sm"
          >
            Lascia una recensione su Google
          </a>
          <div className="mt-8">
            <Link href="/" className="text-sm text-green-700 font-semibold underline">
              ← Torna alla home
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
