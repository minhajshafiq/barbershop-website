"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { BOOKING_URL, PHONE_INTL, PHONE } from "@/lib/site";

// Barre de réservation mobile : apparaît une fois le hero dépassé.
// inert quand elle est masquée : ses liens sortent du parcours clavier.
const StickyBooking = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      inert={!isVisible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-coal/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transition-none lg:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-3">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex-1"
        >
          Réserver un créneau
        </a>
        <a
          href={`tel:${PHONE_INTL}`}
          className="btn-ghost-dark px-4"
          aria-label={`Appeler le salon au ${PHONE}`}
        >
          <Phone className="h-5 w-5" aria-hidden />
        </a>
      </div>
    </div>
  );
};

export default StickyBooking;
