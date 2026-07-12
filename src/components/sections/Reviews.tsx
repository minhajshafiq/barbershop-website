"use client";

import { motion } from "framer-motion";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=The+Experts+Barber+Shop+101+Av.+Jean+Lolive+93500+Pantin";

// PLACEHOLDER — remplacer ces citations par de vrais avis copiés
// depuis la fiche Google Business du salon (la note 4,9/5 et les
// 150+ avis sont réels, les textes ci-dessous sont représentatifs).
const mainReview =
  "Une équipe accueillante, une coupe parfaitement adaptée et une vraie attention aux détails.";

const secondaryReviews = [
  "Toujours reçu avec le sourire, toujours reparti avec une coupe nickel.",
  "Le rasage traditionnel à la serviette chaude vaut le détour à lui seul.",
];

const Stars = () => (
  <div className="flex gap-1 text-brand" aria-label="Note de 4,9 sur 5">
    {[...Array(5)].map((_, i) => (
      <span key={i} aria-hidden>
        ★
      </span>
    ))}
  </div>
);

const Reviews = () => {
  return (
    <section
      className="bg-cream py-20 text-ink sm:py-28"
      aria-labelledby="avis-heading"
    >
      <div className="shell-wide">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Note Google, très visible */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <p className="eyebrow mb-4">Ils en parlent mieux que nous</p>
            <h2 id="avis-heading" className="font-display flex items-baseline gap-2">
              <span className="text-8xl leading-none font-bold sm:text-9xl">4,9</span>
              <span className="text-3xl font-medium text-stone">/5</span>
            </h2>
            <div className="mt-4">
              <Stars />
            </div>
            <p className="mt-2 text-sm text-stone">
              Plus de 150 avis Google vérifiés
            </p>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-hover"
            >
              Voir tous les avis Google
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>

          {/* Avis en composition typographique */}
          <div className="lg:col-span-8">
            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="border-b border-line-light pb-10"
            >
              <p className="font-display text-3xl leading-snug font-normal sm:text-4xl lg:text-[2.75rem]">
                « {mainReview} »
              </p>
              <footer className="mt-5 text-sm font-semibold text-stone">
                Avis Google vérifié
              </footer>
            </motion.blockquote>

            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              {secondaryReviews.map((review, idx) => (
                <motion.blockquote
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.12 }}
                >
                  <p className="text-lg leading-relaxed font-medium">« {review} »</p>
                  <footer className="mt-3 text-sm text-stone">Avis Google vérifié</footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
