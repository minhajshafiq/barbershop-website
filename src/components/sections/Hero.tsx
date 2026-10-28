import Image from "next/image";
import { BOOKING_URL } from "@/lib/site";

const proofs = [
  { value: "90+", label: "avis Google" },
  { value: "5000+", label: "clients accueillis" },
  { value: "7j/7", label: "ouvert tous les jours" },
  { value: "2023", label: "année d’ouverture" },
];

const Hero = () => {
  return (
    <>
      <section className="relative flex min-h-[92svh] items-end overflow-hidden">
        {/* Photo unique et forte : l’équipe dans le salon */}
        <Image
          src="/hero.jpg"
          alt="L’équipe de The Experts Barber Shop réunie sur le canapé chesterfield du salon, à Pantin"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[62%_30%]"
        />
        {/* Voile bleu canard très sombre : la couleur du salon, visages préservés */}
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-canard-deep/45 to-coal/10" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-canard-deep/80 via-canard-deep/20 to-transparent" aria-hidden />
        <div className="grain absolute inset-0" aria-hidden />

        {/* Contenu bas-gauche */}
        <div className="shell-wide relative z-10 pt-36 pb-16 sm:pb-20">
          <div className="max-w-4xl">
            {/* Ruban au nom du salon, comme en haut du logo */}
            <p className="ribbon mb-6 motion-safe:animate-fade-up [--delay:100ms]">
              The Experts · Pantin
            </p>

            <h1 className="font-display text-[clamp(2.25rem,5.4vw,4.25rem)] leading-[1.04] font-bold uppercase motion-safe:animate-fade-up [--delay:200ms]">
              Une coupe précise.
              <br />
              Une équipe qui{" "}
              <span className="sm:whitespace-nowrap text-canard-light">vous connaît.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg motion-safe:animate-fade-up [--delay:350ms]">
              Barber shop de quartier depuis 2023. Coupe, barbe et soins dans une
              ambiance conviviale, avec une attention particulière portée à chaque
              détail.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 motion-safe:animate-fade-up [--delay:500ms]">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Réserver un créneau
                <span aria-hidden>→</span>
              </a>
              <a href="#carte" className="btn-ghost-dark">
                Voir la carte
              </a>
            </div>

            {/* Note Google juste sous les boutons : la preuve au moment de réserver */}
            <a
              href="#avis"
              className="group mt-8 inline-flex items-center gap-3 motion-safe:animate-fade-up [--delay:650ms]"
            >
              <span className="text-lg tracking-[0.15em] text-canard-light" aria-hidden>
                ★★★★★
              </span>
              <span className="text-sm text-ivory/85">
                <strong className="font-display text-xl font-bold text-ivory">4,9/5</strong>{" "}
                sur Google
                <span className="ml-2 underline-offset-4 group-hover:underline">Voir les avis</span>
              </span>
            </a>
          </div>
        </div>

        {/* Indicateur de scroll discret */}
        <div
          className="absolute right-8 bottom-8 z-10 hidden flex-col items-center gap-3 lg:flex motion-safe:animate-fade-in [--delay:1200ms]"
          aria-hidden
        >
          <span className="text-[10px] font-bold tracking-[0.3em] text-ivory/60 uppercase [writing-mode:vertical-rl]">
            Défiler
          </span>
          <span className="h-12 w-px origin-top bg-canard-light motion-safe:animate-scroll-line" />
        </div>
      </section>

      {/* Le sol du salon */}
      <div className="tiles" aria-hidden />

      {/* Bandeau de chiffres, séparés par des losanges comme sur le cadre du logo */}
      <div className="bg-coal">
        <ul className="shell-wide grid grid-cols-2 gap-y-5 py-6 lg:grid-cols-4">
          {proofs.map((proof, idx) => (
            <li key={proof.value} className="relative flex items-baseline gap-2 lg:justify-center">
              {idx > 0 && (
                <span
                  className="absolute top-1/2 left-0 hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-chrome/60 lg:block"
                  aria-hidden
                />
              )}
              <span className="font-display text-2xl font-medium text-chrome">{proof.value}</span>
              <span className="text-xs tracking-wide text-smoke uppercase">{proof.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Hero;
