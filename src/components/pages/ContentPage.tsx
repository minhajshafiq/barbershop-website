import type { ReactNode } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import StickyBooking from "@/components/ui/StickyBooking";
import { BOOKING_URL, PHONE, PHONE_INTL, navigation } from "@/lib/site";
import { contentPages } from "@/lib/pages";

// Pas de lecture du dossier galerie ici : le lien « Galerie » est simplement omis
const nav = navigation.filter((item) => item.href !== "/#galerie");

type Props = {
  current: string;
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

// Gabarit commun des pages de contenu : titre, texte, appel à l'action, liens vers les autres pages
const ContentPage = ({ current, eyebrow, title, intro, children }: Props) => (
  <div className="min-h-screen">
    <Header navigation={nav} />
    <main className="shell max-w-3xl pt-32 pb-20 sm:pt-40">
      <p className="eyebrow mb-4 text-canard-light">{eyebrow}</p>
      <h1 className="font-display mb-6 text-4xl leading-[1.05] font-bold uppercase sm:text-5xl">
        {title}
      </h1>
      <p className="mb-10 text-lg leading-relaxed text-smoke">{intro}</p>

      {children}

      <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-line-dark pt-10">
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Réserver sur Planity
          <span aria-hidden>→</span>
        </a>
        <a href={`tel:${PHONE_INTL}`} className="btn-ghost-dark">
          Appeler le {PHONE}
        </a>
      </div>

      <nav aria-label="Autres pages" className="mt-12">
        <p className="mb-3 text-xs font-bold tracking-[0.2em] text-smoke uppercase">À lire aussi</p>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="text-ivory underline-offset-4 hover:underline">
              Accueil, carte et tarifs
            </Link>
          </li>
          {contentPages
            .filter((p) => p.href !== current)
            .map((p) => (
              <li key={p.href}>
                <a href={p.href} className="text-ivory underline-offset-4 hover:underline">
                  {p.name}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </main>
    <Footer navigation={nav} />
    <BackToTop />
    <StickyBooking />
  </div>
);

export const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="border-t border-line-dark py-8">
    <h2 className="font-display text-xl font-medium tracking-wide uppercase">{title}</h2>
    <div className="mt-4 space-y-3 leading-relaxed text-smoke">{children}</div>
  </section>
);

export const PriceList = ({ items }: { items: { name: string; duration: string; price: string }[] }) => (
  <ul className="divide-y divide-line-dark">
    {items.map((item) => (
      <li key={item.name} className="flex items-baseline justify-between gap-4 py-3">
        <span className="text-ivory">
          {item.name} <span className="text-sm text-smoke">· {item.duration}</span>
        </span>
        <span className="font-display text-lg text-chrome">{item.price}</span>
      </li>
    ))}
  </ul>
);

export default ContentPage;
