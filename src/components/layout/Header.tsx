"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BOOKING_URL = "https://www.planity.com/the-expert-93500-pantin-3v3";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Services", href: "#services" },
  { name: "Tarifs", href: "#tarifs" },
  { name: "Le salon", href: "#salon" },
  { name: "L’équipe", href: "#equipe" },
  { name: "Contact", href: "#contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled || isMenuOpen
          ? "border-b border-line-dark bg-coal/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell-wide">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="The Experts Barber Shop — Accueil">
            <Image
              src="/LOGO.jpg"
              alt="The Experts Barber Shop"
              width={56}
              height={56}
              className="rounded-full object-contain"
              priority
            />
            <span className="font-display hidden text-lg font-medium uppercase tracking-widest sm:block lg:hidden xl:block">
              The Experts
            </span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative text-sm font-semibold text-ivory/90 transition-colors duration-200 hover:text-ivory"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions à droite */}
          <div className="flex items-center gap-4">
            <a
              href="tel:0187000181"
              className="hidden items-center gap-2 text-sm font-semibold text-ivory/80 transition-colors hover:text-ivory md:flex"
            >
              <Phone className="h-4 w-4 text-brand" aria-hidden />
              01 87 00 01 81
            </a>
            <div className="hidden sm:block">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary min-h-11!"
              >
                Réserver un créneau
              </a>
            </div>

            {/* Bouton menu mobile */}
            <button
              className="-mr-2 flex h-11 w-11 items-center justify-center text-ivory lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile : panneau sous le header, pas de plein écran */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-line-dark bg-coal/95 backdrop-blur-md lg:hidden"
          >
            <nav className="shell flex flex-col py-4" aria-label="Navigation mobile">
              {navigation.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -8, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.03 * idx, duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="font-display block border-b border-line-dark py-3.5 text-lg uppercase tracking-wide text-ivory transition-colors hover:text-brand"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
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
                <a href="tel:0187000181" className="btn-ghost-dark px-4!" aria-label="Appeler le salon">
                  <Phone className="h-5 w-5" aria-hidden />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
