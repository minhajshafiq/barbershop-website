"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const BOOKING_URL = "https://www.planity.com/the-expert-93500-pantin-3v3";

const proofs = [
  { value: "4,9/5", label: "sur Google" },
  { value: "5000+", label: "clients accueillis" },
  { value: "7j/7", label: "de 9h30 à 20h" },
  { value: "2010", label: "année d’ouverture" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const Hero = () => {
  return (
    <>
      <section className="relative flex min-h-[92svh] items-end overflow-hidden">
        {/* Photo unique et forte : l’équipe dans le salon */}
        <Image
          src="/hero.jpg"
          alt="L’équipe de The Experts Barber Shop réunie sur le canapé chesterfield du salon, à Pantin"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_30%]"
        />
        {/* Overlay sombre progressif : plus dense en bas et à gauche, visages préservés */}
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/35 to-coal/15" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-coal/70 via-transparent to-transparent" aria-hidden />
        <div className="grain absolute inset-0" aria-hidden />

        {/* Contenu bas-gauche */}
        <div className="shell-wide relative z-10 pt-36 pb-16 sm:pb-20">
          <div className="max-w-4xl">
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="eyebrow mb-5"
            >
              The Experts Barber Shop · Pantin
            </motion.p>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-[clamp(2.25rem,5.4vw,4.25rem)] leading-[1.04] font-bold uppercase"
            >
              Une coupe précise.
              <br />
              Une équipe qui{" "}
              <span className="text-brand whitespace-nowrap">vous connaît.</span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg"
            >
              Barber shop de quartier depuis 2010. Coupe, barbe et soins dans une
              ambiance conviviale, avec une attention particulière portée à chaque
              détail.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Réserver un créneau
                <span aria-hidden>→</span>
              </a>
              <a href="#tarifs" className="btn-ghost-dark">
                Voir les tarifs
              </a>
            </motion.div>
          </div>
        </div>

        {/* Indicateur de scroll discret */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute right-8 bottom-8 z-10 hidden flex-col items-center gap-3 lg:flex"
          aria-hidden
        >
          <span className="text-[10px] font-bold tracking-[0.3em] text-ivory/60 uppercase [writing-mode:vertical-rl]">
            Défiler
          </span>
          <motion.span
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-12 w-px origin-top bg-brand"
          />
        </motion.div>
      </section>

      {/* Bandeau de preuves sociales */}
      <div className="border-y border-line-dark bg-coal">
        <div className="shell-wide grid grid-cols-2 lg:grid-cols-4">
          {proofs.map((proof, idx) => (
            <div
              key={proof.value}
              className={`flex items-baseline gap-2 border-line-dark px-2 py-5 sm:px-6 ${
                idx > 0 ? "lg:border-l" : ""
              } ${idx % 2 === 1 ? "border-l lg:border-l" : ""}`}
            >
              <span className="font-display text-2xl font-medium text-brand">
                {proof.value}
              </span>
              <span className="text-xs tracking-wide text-smoke uppercase">
                {proof.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
