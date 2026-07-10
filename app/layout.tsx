import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Nunito_Sans } from "next/font/google";
import Link from "next/link";
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
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Casa Ania – Affittacamere a 140 m da Humanitas Rozzano",
  description:
    "Camere con bagno privato a 140 metri dall'ospedale Humanitas di Rozzano. Check-in flessibile, navetta aeroporti, da €70/notte. Prenota su WhatsApp senza commissioni.",
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

        <footer className="text-gray-200 py-6 px-4 text-center text-xs" style={{ backgroundColor: "#2d6a4f" }}>
          <p className="font-semibold text-white mb-1 uppercase tracking-widest">Casa Ania Rozzano</p>
          <p>Via Liguria 26 – Fizzonasco, Pieve Emanuele (MI)</p>
          <p>342 700 4354</p>
          <p className="mt-2 space-x-3">
            <Link href="/privacy" className="underline hover:text-white transition-colors">Privacy</Link>
            <span>·</span>
            <Link href="/cookie" className="underline hover:text-white transition-colors">Cookie</Link>
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Casa Ania Rozzano</p>
        </footer>
      </body>
    </html>
  );
}
