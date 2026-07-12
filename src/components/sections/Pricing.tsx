"use client";

import { motion } from "framer-motion";

const BOOKING_URL = "https://www.planity.com/the-expert-93500-pantin-3v3";

const menu = [
  {
    category: "Coupe",
    items: [
      { name: "Shampoing + coupe + coiffage", duration: "30 min", price: "15 €" },
      { name: "Rasage du crâne traditionnel", duration: "30 min", price: "13 €" },
      { name: "Coupe + taille de barbe", duration: "45 min", price: "22 €" },
    ],
  },
  {
    category: "Barbe",
    items: [
      { name: "Taille de barbe + rasage", duration: "20 min", price: "10 €" },
      { name: "Rasage traditionnel", duration: "20 min", price: "10 €" },
    ],
  },
  {
    category: "Soins",
    items: [
      { name: "Gommage capillaire + black mask", duration: "45 min", price: "22 €" },
      { name: "Gommage capillaire + masque à l’argile", duration: "30 min", price: "22 €" },
    ],
  },
  {
    category: "Techniques",
    items: [
      { name: "Lissage brésilien + coupe + coiffage", duration: "1 h 30", price: "22 €" },
      { name: "Coloration + coupe + coiffage", duration: "1 h 30", price: "22 €" },
    ],
  },
];

const Pricing = () => {
  return (
    <section
      id="tarifs"
      className="scroll-mt-20 bg-cream py-20 text-ink sm:py-28"
      aria-labelledby="tarifs-heading"
    >
      <div className="shell-wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <p className="eyebrow mb-4">Tarifs</p>
            <h2
              id="tarifs-heading"
              className="font-display text-4xl leading-[1.05] font-bold uppercase sm:text-5xl lg:text-6xl"
            >
              La carte des prestations
            </h2>
          </div>
          <p className="text-sm text-stone">Paiement par carte ou en espèces.</p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Menu imprimé */}
          <div className="border border-ink/15 p-6 sm:p-10 lg:col-span-8">
            <div className="border border-ink/10 p-5 sm:p-8">
              {/* En-tête façon carte imprimée, écho du ruban « Les Experts » du logo */}
              <p className="font-display text-center text-sm font-medium tracking-[0.3em] text-ink/70 uppercase">
                Les Experts · Pantin
              </p>
              <div className="mt-4 mb-9 flex items-center gap-4 text-brand" aria-hidden>
                <span className="h-px flex-1 bg-ink/15" />
                <svg width="72" height="12" viewBox="0 0 72 12" fill="none" className="shrink-0">
                  <path d="M0 6h26m20 0h26" stroke="currentColor" strokeWidth="1" />
                  <path d="M36 1.5 40.5 6 36 10.5 31.5 6Z" stroke="currentColor" strokeWidth="1" />
                </svg>
                <span className="h-px flex-1 bg-ink/15" />
              </div>
              <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-12">
              {menu.map((section, sectionIdx) => (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: sectionIdx * 0.1 }}
                >
                  <h3 className="font-display mb-5 flex items-baseline gap-3 text-xl font-medium tracking-[0.15em] uppercase">
                    <span className="h-px w-6 shrink-0 self-center bg-brand" aria-hidden />
                    {section.category}
                  </h3>
                  <ul className="space-y-4">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-semibold sm:text-[15px]">
                            {item.name}
                          </span>
                          <span
                            className="mx-1 flex-1 border-b border-dotted border-ink/35"
                            aria-hidden
                          />
                          <span className="font-display shrink-0 text-lg font-medium whitespace-nowrap tabular-nums">
                            {item.price}
                          </span>
                        </div>
                        <span className="text-xs text-stone">{item.duration}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
              </div>
            </div>
          </div>

          {/* Carte CTA — volontairement différente du reste */}
          <div className="flex items-center lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 24, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full bg-brand p-8 text-ink sm:p-10"
            >
              <h3 className="font-display text-3xl leading-tight font-bold uppercase">
                Vous hésitez sur la prestation ?
              </h3>
              <p className="mt-4 text-sm leading-relaxed font-semibold sm:text-base">
                Réservez une coupe classique et précisez votre besoin une fois sur
                place. L’équipe s’adapte.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink mt-7 w-full"
              >
                Choisir un créneau
                <span aria-hidden>→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
