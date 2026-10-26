"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { BOOKING_URL, PHONE_INTL, PHONE, type NavItem } from "@/lib/site";

const Header = ({ navigation }: { navigation: NavItem[] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Échap ferme le menu mobile
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // Le menu devient inert : sans ça, le focus clavier retomberait sur <body>
      if (menuRef.current?.contains(document.activeElement)) menuButtonRef.current?.focus();
      setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-500 ${
        isScrolled || isMenuOpen
          ? "border-b border-line-dark bg-coal/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell-wide">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo : affiché petit, la source fait 150 px */}
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="The Experts Barber Shop — Accueil">
            <Image
              src="/LOGO.jpg"
              alt="The Experts Barber Shop"
              width={56}
              height={56}
              className="rounded-full object-contain"
              priority
            />
            <span className="font-display hidden text-lg font-medium tracking-widest uppercase sm:block lg:hidden xl:block">
              The Experts
            </span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group relative text-sm font-semibold text-ivory/90 transition-colors duration-200 hover:text-ivory"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-canard-light transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Actions à droite */}
          <div className="flex items-center gap-4">
            <a
              href={`tel:${PHONE_INTL}`}
              className="hidden items-center gap-2 text-sm font-semibold text-ivory/80 transition-colors hover:text-ivory md:flex"
            >
              <Phone className="h-4 w-4 text-canard-light" aria-hidden />
              {PHONE}
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden min-h-11 sm:inline-flex"
            >
              Réserver un créneau
            </a>

            {/* Bouton menu mobile */}
            <button
              ref={menuButtonRef}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-ivory lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="menu-mobile"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile : se déplie en CSS (grille 0fr → 1fr). Liens d’ancre natifs (balise a, pas le composant Link) :
          le navigateur déplace le point de départ du clavier vers la section visée.
          inert quand il est fermé : ses liens sortent du parcours clavier. */}
      <div
        id="menu-mobile"
        ref={menuRef}
        inert={!isMenuOpen}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="shell flex flex-col border-t border-line-dark py-4" aria-label="Navigation mobile">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-display block border-b border-line-dark py-3.5 text-lg tracking-wide text-ivory uppercase transition-colors hover:text-canard-light"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-5 pb-2">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Réserver un créneau
              </a>
              <a href={`tel:${PHONE_INTL}`} className="btn-ghost-dark px-4" aria-label="Appeler le salon">
                <Phone className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
