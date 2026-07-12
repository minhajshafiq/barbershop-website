"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const photos = [
  {
    src: "/salon1.webp",
    alt: "Vue d’ensemble du salon : fauteuils de barbier vintage noir et blanc, mur bleu canard et carreaux de ciment",
    className: "col-span-2 lg:col-span-8 aspect-[16/9]",
  },
  {
    src: "/salon3.webp",
    alt: "La moto noire garée dans le salon, sous la guitare et les vinyles du mur vert",
    className: "col-span-1 lg:col-span-4 aspect-[3/4] lg:aspect-auto",
  },
  {
    src: "/salon4.webp",
    alt: "Le coin attente : canapé chesterfield en cuir, violon et horloge murale",
    className: "col-span-1 lg:col-span-4 aspect-[3/4] lg:aspect-[4/5]",
  },
  {
    src: "/hero.jpg",
    alt: "L’équipe du salon, spontanée, réunie sur le canapé en cuir",
    className: "col-span-2 lg:col-span-5 aspect-[16/10] lg:aspect-auto",
  },
  {
    src: "/salon2.webp",
    alt: "L’enfilade des postes de coiffage, miroirs et fauteuils alignés",
    className: "col-span-2 lg:col-span-3 aspect-[16/10] lg:aspect-auto",
  },
];

const Gallery = () => {
  return (
    <section
      id="salon"
      className="scroll-mt-20 bg-coal py-20 sm:py-28"
      aria-labelledby="salon-heading"
    >
      <div className="shell-wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-wrap items-end justify-between gap-x-12 gap-y-4"
        >
          <h2
            id="salon-heading"
            className="font-display text-4xl leading-[1.05] font-bold uppercase sm:text-5xl lg:text-6xl"
          >
            Le salon,
            <br />
            sans mise en scène.
          </h2>
          <p className="max-w-xs pb-1 text-sm leading-relaxed text-smoke">
            Une ambiance de quartier.
            <br />
            Une précision de professionnel.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
          {photos.map((photo, idx) => (
            <motion.figure
              key={photo.src}
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: (idx % 3) * 0.12,
                ease: [0.33, 1, 0.68, 1],
              }}
              className={`group relative min-h-48 overflow-hidden ${photo.className}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
