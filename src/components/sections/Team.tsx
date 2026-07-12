"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const BOOKING_URL = "https://www.planity.com/the-expert-93500-pantin-3v3";

// Pour afficher un vrai portrait : déposer la photo dans /public
// (ex. /team-wael.jpg) puis renseigner `image` ci-dessous.
const teamMembers: {
  name: string;
  specialty: string;
  image?: string;
}[] = [
  { name: "Wael", specialty: "Coupes & dégradés précis" },
  { name: "Souhaib", specialty: "Rasage traditionnel & styling" },
  { name: "Hamza", specialty: "Coupes modernes & finitions" },
  { name: "Med Amine", specialty: "Conseil & transformations" },
];

const Team = () => {
  return (
    <section
      id="equipe"
      className="scroll-mt-20 bg-night py-20 sm:py-28"
      aria-labelledby="equipe-heading"
    >
      <div className="shell-wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="eyebrow mb-4">L’équipe</p>
          <h2
            id="equipe-heading"
            className="font-display text-4xl leading-[1.05] font-bold uppercase sm:text-5xl lg:text-6xl"
          >
            Quatre barbiers,
            <br />
            quatre styles.
          </h2>
          <p className="mt-5 max-w-lg text-smoke">
            Chacun a sa spécialité. Tous ont la même exigence sur le geste et la
            finition.
          </p>
        </motion.div>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {teamMembers.map((member, idx) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (idx % 2) * 0.12 }}
              className={`group ${idx % 2 === 1 ? "sm:mt-12" : ""}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden transition-transform duration-500 lg:group-hover:-translate-y-2">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={`${member.name}, barbier chez The Experts Barber Shop — ${member.specialty}`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  /* Placeholder assumé en attendant le portrait — monogramme encadré façon badge, pas d'icône générique */
                  <div className="absolute inset-0 bg-gradient-to-br from-wood/70 via-night to-coal">
                    <div className="grain absolute inset-0" aria-hidden />
                    <div className="absolute inset-4 border border-ivory/15" aria-hidden />
                    <div className="absolute inset-6 border border-ivory/10" aria-hidden />
                    <span
                      aria-hidden
                      className="font-display absolute inset-0 flex items-center justify-center text-[9rem] leading-none font-bold text-ivory/10 select-none sm:text-[11rem]"
                    >
                      {member.name.charAt(0)}
                    </span>
                    <span className="absolute right-10 bottom-10 text-[10px] font-bold tracking-[0.2em] text-ivory/60 uppercase">
                      Portrait à venir
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line-dark pt-4">
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-wide uppercase">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-smoke">{member.specialty}</p>
                </div>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-hover"
                >
                  Réserver avec {member.name}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover/link:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
