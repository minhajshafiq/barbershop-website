"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white" style={{ backgroundColor: '#151515' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
          {/* Left Section - Contact Info */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3 justify-center">
              <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white">101 Av. Jean Lolive, 93500 Pantin</p>
                <p className="text-white text-sm mt-1">Ouvert tous les jours de 9h30 à 20h (7/7)</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 justify-center">
              <Phone className="w-5 h-5 text-white" />
              <span className="text-white">01 87 00 01 81</span>
            </div>
            
            <button 
              className="button-primary px-6 py-2 mx-auto"
              onClick={() => window.open('https://www.planity.com/the-expert-93500-pantin-3v3', '_blank')}
            >
              Réserve maintenant
            </button>
          </div>

          {/* Center Section - Logo & Social */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex justify-center">
              <Image 
                src="/LOGO.jpg" 
                alt="The Experts Barber Shop - Logo du salon de coiffure masculine professionnel à Pantin" 
                width={128}
                height={128}
                className="object-contain"
              />
            </div>
            
            {/* Social Media Icons */}
            <div className="flex justify-center space-x-4">
              <a href="https://www.instagram.com/the_experts_barbershop/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-amber-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-amber-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Right Section - Menu */}
          <div className="md:text-left">
            <h3 className="text-lg font-bold text-white mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white hover:text-amber-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-white hover:text-amber-400 transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-white hover:text-amber-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-white text-sm">
            @ {currentYear} The Experts Barber Shop. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
