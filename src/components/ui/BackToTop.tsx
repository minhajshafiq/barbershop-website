"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      inert={!isVisible}
      onClick={scrollToTop}
      aria-label="Retour en haut de la page"
      className={`fixed right-6 bottom-6 z-40 hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-canard text-ivory transition-[opacity,translate,background-color] duration-200 hover:bg-canard-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canard-light motion-reduce:transition-none lg:flex ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

export default BackToTop;
