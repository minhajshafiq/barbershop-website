"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

const BOOKING_URL = "https://www.planity.com/the-expert-93500-pantin-3v3";
const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=101+Av.+Jean+Lolive,+93500+Pantin";

const details = [
  {
    icon: Clock,
    title: "Horaires",
    lines: ["Ouvert tous les jours", "9h30 – 20h00"],
  },
  {
    icon: Phone,
    title: "Téléphone",
    lines: ["01 87 00 01 81"],
  },
  {
    icon: MapPin,
    title: "Accès",
    lines: ["Métro ligne 5 · station Hoche", "Bus 249 · arrêt Jean Lolive"],
  },
];

const Contact = () => {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-night py-20 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="shell-wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Infos et conversion — 40 % */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <p className="eyebrow mb-4">Contact</p>
            <h2
              id="contact-heading"
              className="font-display text-4xl leading-[1.08] font-bold uppercase sm:text-5xl"
            >
              Votre prochain créneau commence ici.
            </h2>

            <address className="mt-6 text-lg text-ivory not-italic">
              101 avenue Jean-Lolive, 93500 Pantin
              <span className="mt-1 block text-sm text-smoke">
                À quelques minutes du métro Hoche, aux portes de Paris.
              </span>
            </address>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Réserver maintenant
                <span aria-hidden>→</span>
              </a>
              <a href="tel:0187000181" className="btn-ghost-dark">
                <Phone className="h-4 w-4" aria-hidden />
                Appeler le salon
              </a>
            </div>

            <dl className="mt-12 space-y-6 border-t border-line-dark pt-8">
              {details.map((detail) => (
                <div key={detail.title} className="flex gap-4">
                  <detail.icon className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  <div>
                    <dt className="text-sm font-bold tracking-wide text-ivory uppercase">
                      {detail.title}
                    </dt>
                    {detail.lines.map((line) => (
                      <dd key={line} className="text-sm leading-relaxed text-smoke">
                        {line}
                      </dd>
                    ))}
                  </div>
                </div>
              ))}
            </dl>

            {/* Actions rapides mobile */}
            <div className="mt-10 grid grid-cols-3 gap-3 sm:hidden">
              <a href="tel:0187000181" className="btn-ghost-dark flex-col gap-1 py-3 text-xs">
                <Phone className="h-4 w-4" aria-hidden />
                Appeler
              </a>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-dark flex-col gap-1 py-3 text-xs"
              >
                <Navigation className="h-4 w-4" aria-hidden />
                Itinéraire
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-col gap-1 py-3 text-xs"
              >
                <Clock className="h-4 w-4" aria-hidden />
                Réserver
              </a>
            </div>
          </motion.div>

          {/* Carte — 60 % */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="overflow-hidden rounded-sm border border-line-dark lg:col-span-7"
          >
            <iframe
              src="https://maps.google.com/maps?q=101+Av.+Jean+Lolive,+93500+Pantin&z=16&output=embed"
              className="h-[420px] w-full grayscale-[35%] lg:h-full lg:min-h-[520px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Plan d’accès — The Experts Barber Shop, 101 avenue Jean-Lolive, 93500 Pantin"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
