"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

const MAP_SRC =
  "https://maps.google.com/maps?q=101+Av.+Jean+Lolive,+93500+Pantin&z=16&output=embed";

// La carte Google dépose des cookies : elle ne se charge qu'après un clic (CNIL)
const MapEmbed = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    return (
      <iframe
        src={MAP_SRC}
        className="h-[420px] w-full lg:h-full lg:min-h-[520px]"
        style={{ border: 0 }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        title="Plan d’accès — The Experts Barber Shop, 101 avenue Jean-Lolive, 93500 Pantin"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsLoaded(true)}
      className="flex h-[420px] w-full cursor-pointer flex-col items-center justify-center gap-3 bg-coal px-6 text-center text-ivory transition-colors hover:bg-black focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-canard-light lg:h-full lg:min-h-[520px]"
    >
      <MapPin className="h-8 w-8 text-canard-light" aria-hidden />
      <span className="font-display text-lg tracking-wide uppercase">Afficher la carte</span>
      <span className="max-w-xs text-sm text-smoke">
        Carte fournie par Google, qui peut déposer des cookies.
      </span>
    </button>
  );
};

export default MapEmbed;
