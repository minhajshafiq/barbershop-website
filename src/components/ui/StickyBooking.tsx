"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const BOOKING_URL = "https://www.planity.com/the-expert-93500-pantin-3v3";

// Barre de réservation mobile : apparaît une fois le hero dépassé.
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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-coal/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
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
              href="tel:0187000181"
              className="btn-ghost-dark px-4!"
              aria-label="Appeler le salon au 01 87 00 01 81"
            >
              <Phone className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBooking;
