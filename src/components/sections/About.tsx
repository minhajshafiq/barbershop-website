"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { value: "14+", label: "ans d’expérience" },
  { value: "5000+", label: "clients accueillis" },
  { value: "30 min", label: "en moyenne par coupe" },
  { value: "4,9/5", label: "sur Google" },
];

const About = () => {
  return (
    <section
      id="about"
      className="scroll-mt-20 overflow-hidden bg-night py-20 sm:py-28"
      aria-labelledby="about-heading"
    >
      <div className="shell-wide">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Collage photo : deux images qui se chevauchent */}
          <div className="relative lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="relative aspect-[3/4] w-[85%] overflow-hidden"
            >
              <Image
                src="/salon4.webp"
                alt="Le canapé chesterfield, le violon et les fauteuils de barbier du salon"
                fill
                sizes="(min-width: 1024px) 35vw, 85vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="absolute -bottom-10 right-0 aspect-[4/3] w-[55%] overflow-hidden border-8 border-night sm:-right-4"
            >
              <Image
                src="/salon3.webp"
                alt="La moto vintage et la guitare accrochée au mur vert du salon"
                fill
                sizes="(min-width: 1024px) 20vw, 55vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Contenu éditorial */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mt-6 lg:col-span-7 lg:mt-0 lg:pl-8"
          >
            <p className="eyebrow mb-4">Depuis 2010</p>
            <h2
              id="about-heading"
              className="font-display max-w-2xl text-4xl leading-[1.08] font-bold uppercase sm:text-[2.6rem]"
            >
              Un salon de quartier construit autour de la confiance.
            </h2>

            <p className="mt-6 max-w-xl leading-relaxed text-smoke">
              Depuis plus de 14 ans, The Experts Barber Shop accueille ses clients au
              101 avenue Jean-Lolive, à Pantin. Six fauteuils, une déco inspirée des
              motos vintage, une ambiance musicale qui donne le ton — et des barbiers
              qui prennent le temps de comprendre ce que vous voulez avant de sortir
              la tondeuse.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-smoke">
              Ici, chaque coupe est adaptée au style, au visage et aux habitudes de
              la personne installée dans le fauteuil.
            </p>

            <blockquote className="mt-10 border-l-2 border-brand pl-6">
              <p className="font-display text-2xl leading-snug font-normal text-ivory sm:text-3xl">
                « Chaque client doit pouvoir se sentir à l’aise avant même de
                s’asseoir dans le fauteuil. »
              </p>
              <footer className="mt-3 text-sm text-smoke">L’équipe du salon</footer>
            </blockquote>

            {/* Chiffres éditoriaux, sans cartes */}
            <dl className="mt-12 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="border-l border-line-dark pl-4 sm:pl-5"
                >
                  <dd className="font-display text-3xl font-medium text-brand sm:text-4xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-xs tracking-wide text-smoke uppercase">
                    {stat.label}
                  </dt>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
