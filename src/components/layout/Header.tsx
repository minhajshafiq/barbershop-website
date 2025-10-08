"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const leftNavigation = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "#about" },
  ];

  const rightNavigation = [
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 w-full bg-black/60 backdrop-blur-md z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Phone Number - Left (hidden on mobile) */}
          <div className="hidden lg:flex items-center space-x-2 w-48 group cursor-pointer">
            <Phone className="w-4 h-4 text-amber-400 transition-all duration-300 group-hover:scale-110 group-hover:text-amber-300" />
            <span className="text-sm font-medium text-white transition-all duration-300 group-hover:text-amber-400">01 87 00 01 81</span>
          </div>

          {/* Centered Navigation with Logo */}
          <div className="flex-1 flex justify-center">
            <nav className="flex items-center space-x-8">
              {leftNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-white hover:text-amber-400 transition-all duration-300 font-medium group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></div>
                </Link>
              ))}
              
              {/* Centered Logo */}
              <Link href="/" className="flex items-center mx-8">
                <Image 
                  src="/LOGO.jpg" 
                  alt="The Experts Barber Shop - Logo du salon de coiffure masculine à Pantin" 
                  width={60}
                  height={60}
                  className="object-contain"
                  priority
                />
              </Link>
              
              {rightNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-white hover:text-amber-400 transition-all duration-300 font-medium group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Instagram - Right */}
          <div className="flex items-center space-x-4 w-48 justify-end">
            <Link
              href="https://www.instagram.com/the_experts_barbershop/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white hover:text-amber-400 transition-all duration-300 hover:scale-110 group relative p-2 rounded-full hover:bg-amber-400/10"
            >
              <Instagram className="w-5 h-5 transition-all duration-300 group-hover:rotate-12" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/20 to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            {/* Mobile menu button */}
            <button
              className="lg:hidden flex items-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Ouvrir le menu"
            >
              <motion.span
                initial={false}
                animate={{ rotate: isMenuOpen ? 90 : 0, scale: isMenuOpen ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="inline-block"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-white" />
                )}
              </motion.span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-gray-700 overflow-hidden"
            >
              <nav className="flex flex-col space-y-4 py-4">
                {[...leftNavigation, ...rightNavigation].map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.03 * idx }}
                  >
                    <Link
                      href={item.href}
                      className="text-white hover:text-amber-400 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 border-t border-gray-700">
                  <Link
                    href="https://www.instagram.com/the_experts_barbershop/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-white hover:text-amber-400 transition-colors duration-200"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="text-sm font-medium">Instagram</span>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
