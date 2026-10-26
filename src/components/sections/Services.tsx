import { BOOKING_URL } from "@/lib/site";

// Une seule source pour les prestations : description de la catégorie, puis les prix.
// Les prix sont aussi dans les données structurées de src/app/layout.tsx.
const menu = [
  {
    category: "Coupe",
    description:
      "Coupe classique, dégradé, coiffage ou rasage du crâne à l’ancienne. Shampoing compris.",
    items: [
      { name: "Shampoing + coupe + coiffage", duration: "30 min", price: "15 €" },
      { name: "Rasage du crâne traditionnel", duration: "30 min", price: "13 €" },
      { name: "Coupe + taille de barbe", duration: "45 min", price: "22 €" },
    ],
  },
  {
    category: "Barbe",
    description:
      "Taille, contours et rasage traditionnel au coupe-chou, fini à la serviette chaude.",
    items: [
      { name: "Taille de barbe + rasage", duration: "20 min", price: "10 €" },
      { name: "Rasage traditionnel", duration: "20 min", price: "10 €" },
    ],
  },
  {
    category: "Soins",
    description:
      "Gommage capillaire, black mask ou masque à l’argile. Le cuir chevelu respire, le visage aussi.",
    items: [
      { name: "Gommage capillaire + black mask", duration: "45 min", price: "22 €" },
      { name: "Gommage capillaire + masque à l’argile", duration: "30 min", price: "22 €" },
    ],
  },
  {
    category: "Techniques",
    description:
      "Lissage brésilien, coloration, nouveau style ou changement complet. On en parle, puis on le fait.",
    items: [
      { name: "Lissage brésilien + coupe + coiffage", duration: "1 h 30", price: "22 €" },
      { name: "Coloration + coupe + coiffage", duration: "1 h 30", price: "22 €" },
    ],
  },
];

const Services = () => {
  return (
    <section
      id="carte"
      className="scroll-mt-20 bg-cream py-20 text-ink sm:py-28"
      aria-labelledby="carte-heading"
    >
      <div className="shell-wide">
        <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4 text-canard">Prestations &amp; tarifs</p>
            <h2
              id="carte-heading"
              className="font-display text-4xl leading-[1.05] font-bold uppercase sm:text-5xl lg:text-6xl"
            >
              La carte
            </h2>
          </div>
          <p className="text-sm text-stone">Paiement par carte ou en espèces.</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Carte imprimée dans un cadre ornemental, comme le logo */}
          <div className="ornate-frame p-7 sm:p-11 lg:col-span-8">
            <p className="font-display text-center text-sm font-medium tracking-[0.3em] text-ink/70 uppercase">
              Les Experts · Pantin
            </p>
            <div className="mt-9 grid gap-10 sm:grid-cols-2 sm:gap-x-12">
              {menu.map((section) => (
                <div key={section.category} className="reveal">
                  <h3 className="font-display flex items-center gap-3 text-xl font-medium tracking-[0.15em] uppercase">
                    <span className="h-px w-6 shrink-0 bg-canard" aria-hidden />
                    {section.category}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{section.description}</p>
                  <ul className="mt-5 space-y-4">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-semibold sm:text-[15px]">{item.name}</span>
                          <span
                            className="mx-1 flex-1 border-b border-dotted border-ink/35"
                            aria-hidden
                          />
                          <span className="font-display shrink-0 text-lg font-medium whitespace-nowrap text-canard tabular-nums">
                            {item.price}
                          </span>
                        </div>
                        <span className="text-xs text-stone">{item.duration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Encart bleu canard */}
          <div className="flex items-center lg:col-span-4">
            <div className="reveal w-full bg-canard p-8 text-ivory sm:p-10">
              <h3 className="font-display text-3xl leading-tight font-bold uppercase">
                Vous hésitez sur la prestation ?
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ivory/85 sm:text-base">
                Réservez une coupe classique et précisez votre besoin une fois sur
                place. L’équipe s’adapte.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cream mt-7 w-full"
              >
                Choisir un créneau
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
