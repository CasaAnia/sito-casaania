import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Nunito_Sans } from "next/font/google";
import ConditionalFooter from "./components/ConditionalFooter";
import Conteggio from "./components/Conteggio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  weight: ["400", "600"],
  subsets: ["latin"],
});

const title = "Casa Ania – Affittacamere a 140 m da Humanitas Rozzano";
const description =
  "Affittacamere a 140 m dall'ospedale Humanitas di Rozzano: ascensore, rampa all'ingresso, check-in flessibile e servizio navetta.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.casaaniarozzano.it"),
  title,
  description,
  verification: {
    google: "YvneWjnzh3O0HJUhCxm1yVo1xLe9T9120vGDZgip7Fk",
  },
  openGraph: {
    title,
    description,
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
};

const GOOGLE_MAPS_URL = "https://maps.google.com/?cid=12687762198889638693";

const lodgingJsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": "https://www.casaaniarozzano.it/#struttura",
  name: "Casa Ania Rozzano",
  description:
    "Affittacamere a conduzione familiare a 140 metri dall'ospedale Humanitas di Rozzano. Camere con bagno privato, check-in flessibile e servizio navetta da aeroporti e stazioni.",
  url: "https://www.casaaniarozzano.it/",
  telephone: "+393427004354",
  priceRange: "€70-€100",
  currenciesAccepted: "EUR",
  numberOfRooms: 4,
  image: [
    "https://www.casaaniarozzano.it/og-image.jpg",
    "https://www.casaaniarozzano.it/camere/ambra/foto1.jpg",
    "https://www.casaaniarozzano.it/camere/allegra/foto1.jpg",
    "https://www.casaaniarozzano.it/camere/lena/foto1b.jpg",
  ],
  hasMap: GOOGLE_MAPS_URL,
  sameAs: [GOOGLE_MAPS_URL],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Liguria 26",
    addressLocality: "Fizzonasco, Pieve Emanuele",
    addressRegion: "MI",
    postalCode: "20072",
    addressCountry: "IT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.374534,
    longitude: 9.168671,
  },
  checkinTime: "15:00",
  checkoutTime: "10:00",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Bagno privato", value: true },
    { "@type": "LocationFeatureSpecification", name: "Wi-Fi gratuito", value: true },
    { "@type": "LocationFeatureSpecification", name: "Aria condizionata", value: true },
    { "@type": "LocationFeatureSpecification", name: "Servizio navetta", value: true },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingJsonLd) }}
        />
        {children}

        <ConditionalFooter />
        <Conteggio />
      </body>
    </html>
  );
}
