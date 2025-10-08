import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Experts Barber Shop - Salon de Coiffure Masculine à Pantin | Depuis 2010",
  description: "Salon de coiffure masculine professionnel à Pantin depuis 2010. Coupes modernes, rasage traditionnel, soins capillaires. Réservez votre rendez-vous au 01 87 00 01 81. Ouvert 7j/7.",
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
    description: "Salon de coiffure masculine professionnel depuis 2010. Coupes modernes, rasage traditionnel, soins capillaires. Expertise et tradition au service de votre style.",
    type: "website",
    locale: "fr_FR",
    url: "https://theexperts-barbershop.fr",
    siteName: "The Experts Barber Shop",
    images: [
      {
        url: "/LOGO.jpg",
        width: 1200,
        height: 630,
        alt: "The Experts Barber Shop - Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Experts Barber Shop - Coiffure Masculine à Pantin",
    description: "Salon de coiffure masculine professionnel depuis 2010. Expertise et tradition au service de votre style.",
    images: ["/LOGO.jpg"],
  },
  alternates: {
    canonical: "https://theexperts-barbershop.fr",
  },
  category: "Beauty & Personal Care",
  classification: "Business",
  other: {
    "geo.region": "FR-93",
    "geo.placename": "Pantin",
    "geo.position": "48.8964;2.4093",
    "ICBM": "48.8964, 2.4093",
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
    "description": "Salon de coiffure masculine professionnel depuis 2010. Coupes modernes, rasage traditionnel, soins capillaires.",
    "url": "https://theexperts-barbershop.fr",
    "telephone": "+33187000181",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "101 Av. Jean Lolive",
      "addressLocality": "Pantin",
      "postalCode": "93500",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.8964",
      "longitude": "2.4093"
    },
    "openingHours": "Mo-Su 09:30-20:00",
    "priceRange": "€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Cash, Credit Card",
    "image": "https://theexperts-barbershop.fr/LOGO.jpg",
    "logo": "https://theexperts-barbershop.fr/LOGO.jpg",
    "foundingDate": "2010",
    "areaServed": {
      "@type": "City",
      "name": "Pantin"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "48.8964",
        "longitude": "2.4093"
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150"
    },
    "sameAs": [
      "https://www.instagram.com/the_experts_barbershop/",
      "https://www.planity.com/the-expert-93500-pantin-3v3"
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
