import type { Metadata } from "next";
import { Manrope, Besley } from "next/font/google";
import { BOOKING_URL, PHONE, PHONE_INTL } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

// Besley : serif clarendon, écho direct du lettrage du badge du salon
const besley = Besley({
  variable: "--font-besley",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theexperts-barbershop.fr"),
  // « barbier » et « coiffeur homme » : ce que les gens tapent sur Google. 60 caractères max, sinon coupé
  title: "The Experts Barber Shop · Barbier et coiffeur homme à Pantin",
  description: `Salon de coiffure masculine professionnel à Pantin depuis 2023. Coupes modernes, rasage traditionnel, soins capillaires. Réservez votre rendez-vous au ${PHONE}. Ouvert 7j/7.`,
  keywords: "barbershop Pantin, coiffure masculine Pantin, rasage traditionnel, coupe homme, salon de coiffure 93, coiffeur Pantin, barber shop Paris, coiffure homme professionnel, The Experts Barber Shop",
  authors: [{ name: "The Experts Barber Shop" }],
  creator: "The Experts Barber Shop",
  publisher: "The Experts Barber Shop",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "The Experts Barber Shop - Coiffure Masculine d'Exception à Pantin",
    description: "Salon de coiffure masculine professionnel depuis 2023. Coupes modernes, rasage traditionnel, soins capillaires. Expertise et tradition au service de votre style.",
    type: "website",
    locale: "fr_FR",
    url: "https://theexperts-barbershop.fr",
    siteName: "The Experts Barber Shop",
    images: [
      {
        url: "/hero.jpg",
        width: 1080,
        height: 720,
        alt: "L’équipe de The Experts Barber Shop dans le salon, à Pantin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Experts Barber Shop - Coiffure Masculine à Pantin",
    description: "Salon de coiffure masculine professionnel depuis 2023. Expertise et tradition au service de votre style.",
    images: ["/hero.jpg"],
  },
  alternates: {
    canonical: "https://theexperts-barbershop.fr",
  },
  category: "Beauty & Personal Care",
  classification: "Business",
  other: {
    "geo.region": "FR-93",
    "geo.placename": "Pantin",
    "geo.position": "48.8924;2.4087",
    "ICBM": "48.8924, 2.4087",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "The Experts Barber Shop",
    "description": "Salon de coiffure masculine professionnel depuis 2023. Coupes modernes, rasage traditionnel, soins capillaires.",
    "url": "https://theexperts-barbershop.fr",
    "telephone": PHONE_INTL,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "101 Av. Jean Lolive",
      "addressLocality": "Pantin",
      "postalCode": "93500",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.8924",
      "longitude": "2.4087"
    },
    "openingHours": ["Mo-Th 09:30-20:00", "Fr 09:30-12:30", "Fr 14:00-20:00", "Sa 09:30-20:00", "Su 10:00-20:00"],
    "priceRange": "€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Cash, Credit Card",
    "image": "https://theexperts-barbershop.fr/hero.jpg",
    "logo": "https://theexperts-barbershop.fr/LOGO.jpg",
    "foundingDate": "2023",
    "areaServed": {
      "@type": "City",
      "name": "Pantin"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "48.8924",
        "longitude": "2.4087"
      },
      "geoRadius": "10000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de Coiffure",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Coupe et Coiffage",
            "description": "Shampoing + Coupe + Coiffage"
          },
          "price": "15",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Rasage Traditionnel",
            "description": "Rasage traditionnel avec blaireau et rasoir"
          },
          "price": "10",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Coupe + Taille de Barbe",
            "description": "Coupe complète avec taille de barbe"
          },
          "price": "22",
          "priceCurrency": "EUR"
        }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/the_experts_barbershop/",
      BOOKING_URL
    ]
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${manrope.variable} ${besley.variable} bg-night text-ivory antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
