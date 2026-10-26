import Image from "next/image";

const stats = [
  { value: "2010", label: "ouverture du salon" },
  { value: "5000+", label: "clients accueillis" },
  { value: "30 min", label: "en moyenne par coupe" },
  { value: "4,9/5", label: "sur Google" },
];

const photos = [
  {
    src: "/salon1.webp",
    alt: "Vue d’ensemble du salon : fauteuils de barbier vintage noir et blanc, mur bleu canard et carreaux de ciment",
    wide: true,
  },
  {
    src: "/salon3.webp",
    alt: "La moto noire garée dans le salon, sous la guitare et les vinyles du mur vert",
  },
  {
    src: "/salon4.webp",
    alt: "Le coin attente : canapé chesterfield en cuir, violon et horloge murale",
  },
  {
    src: "/salon2.webp",
    alt: "L’enfilade des postes de coiffage, miroirs et fauteuils alignés",
  },
];

// Fond bleu canard : on entre dans la grande salle
const About = () => {
  return (
    <section
      id="salon"
      className="scroll-mt-20 bg-canard py-20 text-ivory sm:py-28"
      aria-labelledby="salon-heading"
    >
      <div className="shell-wide grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow mb-4 text-ivory">Depuis 2010</p>
          <h2
            id="salon-heading"
            className="font-display text-4xl leading-[1.05] font-bold uppercase sm:text-5xl"
          >
            Un salon de quartier, construit autour de la confiance.
          </h2>

          <p className="mt-6 leading-relaxed text-ivory/85">
            Depuis 2010, The Experts Barber Shop accueille ses clients au 101 avenue
            Jean-Lolive, à Pantin. Six fauteuils, une déco inspirée des motos
            vintage, une ambiance musicale qui donne le ton — et des barbiers qui
            prennent le temps de comprendre ce que vous voulez avant de sortir la
            tondeuse.
          </p>
          <p className="mt-4 leading-relaxed text-ivory/85">
            Ici, chaque coupe est adaptée au style, au visage et aux habitudes de la
            personne installée dans le fauteuil.
          </p>

          <blockquote className="mt-10 border-l-2 border-ivory/60 pl-6">
            <p className="font-display text-2xl leading-snug">
              « Chaque client doit pouvoir se sentir à l’aise avant même de s’asseoir
              dans le fauteuil. »
            </p>
            <footer className="mt-3 text-sm text-ivory/85">L’équipe du salon</footer>
          </blockquote>

          {/* dt avant dd pour les lecteurs d'écran, chiffre affiché au-dessus */}
          <dl className="mt-12 grid grid-cols-2 gap-y-8 sm:grid-cols-4 lg:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse border-l border-ivory/25 pl-4">
                <dt className="mt-1 text-xs tracking-wide text-ivory/85 uppercase">{stat.label}</dt>
                <dd className="font-display text-3xl font-medium text-chrome">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Collage : la grande salle en large, trois détails dessous */}
        <div className="grid grid-cols-3 gap-3 lg:col-span-7">
          {photos.map((photo) => (
            <figure
              key={photo.src}
              className={`reveal-image relative overflow-hidden ${
                photo.wide ? "col-span-3 aspect-[5/3]" : "aspect-[4/5]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={photo.wide ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 18vw, 33vw"}
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
