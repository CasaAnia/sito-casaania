import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Nunito_Sans } from "next/font/google";
import ConditionalFooter from "./components/ConditionalFooter";
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

const lodgingJsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Casa Ania Rozzano",
  description:
    "Affittacamere a conduzione familiare a 140 metri dall'ospedale Humanitas di Rozzano. Camere con bagno privato, check-in flessibile e servizio navetta da aeroporti e stazioni.",
  url: "https://www.casaaniarozzano.it/",
  telephone: "+393427004354",
  priceRange: "€70-€100",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Liguria 26",
    addressLocality: "Fizzonasco, Pieve Emanuele",
    addressRegion: "MI",
    postalCode: "20072",
    addressCountry: "IT",
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
      </body>
    </html>
  );
}
