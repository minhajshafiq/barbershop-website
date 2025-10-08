"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Instagram } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
          {/* Phone Number - Left */}
          <div className="flex items-center space-x-2 flex-1 lg:flex-none">
            <Phone className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-white">01 87 00 01 81</span>
          </div>

          {/* Centered Navigation with Logo */}
          <div className="hidden lg:flex flex-1 justify-center">
            <nav className="hidden lg:flex items-center space-x-8">
              {leftNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-amber-400 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Centered Logo */}
              <Link href="/" className="flex items-center mx-8">
                <Image 
                  src="/LOGO.jpg" 
                  alt="The Experts Barber Shop Logo" 
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
                  className="text-white hover:text-amber-400 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Instagram - Right */}
          <div className="flex items-center lg:flex-none">
            <Link
              href="https://www.instagram.com/the_experts_barbershop/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white hover:text-amber-400 transition-all duration-300 hover:scale-110"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden ml-4 flex items-center"
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
