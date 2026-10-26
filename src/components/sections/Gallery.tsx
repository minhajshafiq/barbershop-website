import Image from "next/image";

const VISIBLE_COUNT = 8;

const Photo = ({ src }: { src: string }) => (
  <li className="relative aspect-[4/5] overflow-hidden bg-ink/5">
    <Image
      src={src}
      alt="Coupe réalisée chez The Experts Barber Shop"
      fill
      sizes="(min-width: 1024px) 25vw, 50vw"
      className="object-cover"
    />
  </li>
);

// Photos déposées dans public/galerie/ (voir README) : 8 visibles, le reste derrière un <details> natif
const Gallery = ({ photos }: { photos: string[] }) => {
  const visible = photos.slice(0, VISIBLE_COUNT);
  const rest = photos.slice(VISIBLE_COUNT);

  return (
    <section
      id="galerie"
      className="scroll-mt-20 bg-cream py-20 text-ink sm:py-28"
      aria-labelledby="galerie-heading"
    >
      <div className="shell-wide">
        <div className="reveal mb-14 max-w-2xl">
          <p className="eyebrow mb-4 text-canard">Galerie</p>
          <h2
            id="galerie-heading"
            className="font-display text-4xl leading-[1.05] font-bold uppercase sm:text-5xl lg:text-6xl"
          >
            Dans le fauteuil
          </h2>
          <p className="mt-5 text-stone">Les dernières coupes et barbes réalisées au salon.</p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {visible.map((src) => (
            <Photo key={src} src={src} />
          ))}
        </ul>

        {rest.length > 0 && (
          <details className="group">
            <summary className="btn-ghost-light mx-auto mt-10 flex w-fit list-none [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">
                {rest.length === 1 ? "Voir 1 autre photo" : `Voir les ${rest.length} autres photos`}
              </span>
              <span className="hidden group-open:inline">Masquer les photos</span>
            </summary>
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {rest.map((src) => (
                <Photo key={src} src={src} />
              ))}
            </ul>
          </details>
        )}
      </div>
    </section>
  );
};

export default Gallery;
