"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Coupe",
    description:
      "Coupe classique, dégradé, coiffage ou rasage du crâne à l’ancienne. Shampoing compris.",
    price: "dès 13 €",
    image: "/salon1.webp",
    imageAlt: "Les fauteuils de barbier vintage du salon",
  },
  {
    number: "02",
    title: "Barbe",
    description:
      "Taille, contours et rasage traditionnel au coupe-chou, fini à la serviette chaude.",
    price: "dès 10 €",
    image: "/salon2.webp",
    imageAlt: "Le poste de travail et les miroirs du salon",
  },
  {
    number: "03",
    title: "Soins",
    description:
      "Gommage capillaire, black mask ou masque à l’argile. Le cuir chevelu respire, le visage aussi.",
    price: "dès 22 €",
    image: "/salon4.webp",
    imageAlt: "Le canapé chesterfield et l’espace d’attente du salon",
  },
  {
    number: "04",
    title: "Transformation",
    description:
      "Lissage brésilien, coloration, nouveau style ou changement complet. On en parle, puis on le fait.",
    price: "dès 22 €",
    image: "/salon3.webp",
    imageAlt: "La moto vintage et la guitare qui décorent le salon",
  },
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="services"
      className="scroll-mt-20 bg-night py-20 sm:py-28"
      aria-labelledby="services-heading"
    >
      <div className="shell-wide">
        {/* Titre aligné à gauche */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="eyebrow mb-4">Ce qu’on fait</p>
          <h2
            id="services-heading"
            className="font-display text-4xl leading-[1.05] font-bold uppercase sm:text-5xl lg:text-6xl"
          >
            Quatre gestes,
            <br />
            un seul niveau d’exigence.
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Liste éditoriale */}
          <ul className="lg:col-span-7">
            {services.map((service, index) => (
              <motion.li
                key={service.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onMouseEnter={() => setActiveIndex(index)}
                className="group border-t border-line-dark last:border-b"
              >
                <div className="flex items-baseline gap-5 py-7 sm:gap-8 sm:py-9">
                  <span className="font-display w-14 shrink-0 text-3xl font-medium text-brand sm:text-4xl">
                    {service.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="font-display text-2xl font-medium tracking-wide uppercase transition-transform duration-300 sm:text-3xl lg:group-hover:translate-x-2">
                        {service.title}
                      </h3>
                      <span className="text-sm font-semibold text-smoke tabular-nums">
                        {service.price}
                      </span>
                    </div>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-smoke sm:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Image contextuelle — change au survol sur desktop */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="relative aspect-[4/5] overflow-hidden lg:sticky lg:top-28"
            >
              {services.map((service, index) => (
                <Image
                  key={service.number}
                  src={service.image}
                  alt={index === activeIndex ? service.imageAlt : ""}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className={`object-cover transition-opacity duration-500 ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-night/50 to-transparent" aria-hidden />
              <span className="font-display absolute bottom-4 left-5 text-sm tracking-[0.2em] text-ivory/80 uppercase">
                {services[activeIndex].title}
              </span>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          <a
            href="#tarifs"
            className="group inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-hover"
          >
            Découvrir toutes les prestations
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
