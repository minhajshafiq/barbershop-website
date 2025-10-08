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
  title: "The Experts Barber Shop - Coiffure masculine d'exception",
  description: "Salon de coiffure masculine professionnel depuis 2010. Coupes classiques et modernes, rasage traditionnel. Expertise et tradition au service de votre style.",
  keywords: "barbershop, coiffure masculine, rasage, coupe homme, salon de coiffure, Paris",
  authors: [{ name: "The Experts Barber Shop" }],
  openGraph: {
    title: "The Experts Barber Shop",
    description: "L'art de la coiffure masculine depuis 2010. Expertise, tradition et style moderne.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
