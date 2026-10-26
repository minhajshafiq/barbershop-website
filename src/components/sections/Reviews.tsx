const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=The+Experts+Barber+Shop+101+Av.+Jean+Lolive+93500+Pantin";

// Uniquement de vrais avis Google : copier le texte exact et le prénom depuis la fiche du salon.
// Tableau vide = seule la note s'affiche. Publier de faux avis est une pratique commerciale trompeuse.
const reviews: { text: string; author: string }[] = [];

// Fond bleu canard : note en crème (le chrome est réservé aux fonds noirs)
const Reviews = () => {
  return (
    <section
      id="avis"
      className="scroll-mt-20 bg-canard py-20 text-ivory sm:py-28"
      aria-labelledby="avis-heading"
    >
      <div className="shell-wide">
        <div className="reveal flex flex-wrap items-end justify-between gap-10">
          <div>
            <p className="eyebrow mb-4 text-ivory">Ils en parlent mieux que nous</p>
            <h2 id="avis-heading" className="font-display flex items-baseline gap-2">
              <span className="text-8xl leading-none font-bold sm:text-9xl">4,9</span>
              <span className="text-3xl font-medium text-ivory/85">/5</span>
              <span className="sr-only">sur Google</span>
            </h2>
            <p className="mt-4 text-xl tracking-[0.3em] text-ivory" aria-hidden>
              ★★★★★
            </p>
            <p className="mt-2 text-sm text-ivory/85">Plus de 150 avis Google</p>
          </div>

          <div className="max-w-sm">
            <p className="leading-relaxed text-ivory/85">
              Coupe, accueil, ambiance : les clients du salon le disent mieux que nous,
              directement sur Google.
            </p>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cream mt-6"
            >
              Lire les avis sur Google
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {reviews.length > 0 && (
          <ul className="mt-14 grid gap-10 border-t border-ivory/20 pt-14 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <li key={review.author} className="reveal">
                <blockquote>
                  <p className="font-display text-2xl leading-snug">« {review.text} »</p>
                  <footer className="mt-3 text-sm text-ivory/85">{review.author}, avis Google</footer>
                </blockquote>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Reviews;
