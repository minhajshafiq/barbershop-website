import Image from "next/image";
import { BOOKING_URL, OPENING_HOURS, PHONE_INTL, PHONE, type NavItem } from "@/lib/site";

// lucide-react 1.x a retiré les logos de marque : tracé Instagram de Lucide (licence ISC) en inline
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Footer = ({ navigation }: { navigation: NavItem[] }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-coal pb-24 lg:pb-0">
      {/* Le sol du salon */}
      <div className="tiles" aria-hidden />

      <div className="shell-wide pt-16 sm:pt-20">
        {/* Logo puis numéro dans un ruban chrome, comme en bas du logo */}
        <div className="flex flex-col items-center border-b border-line-dark pb-14 text-center">
          <Image
            src="/LOGO.jpg"
            alt="The Experts Barber Shop"
            width={72}
            height={72}
            className="rounded-full object-contain"
          />
          <a href={`tel:${PHONE_INTL}`} className="ribbon ribbon-chrome mt-6" aria-label={`Appeler le salon au ${PHONE}`}>
            {PHONE}
          </a>

          <p className="font-display mt-10 max-w-2xl text-3xl leading-tight font-bold uppercase sm:text-4xl">
            Une bonne coupe ne change pas qui vous êtes.{" "}
            <span className="text-canard-light">Elle le révèle.</span>
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8"
          >
            Réserver un créneau
            <span aria-hidden>→</span>
          </a>
        </div>

        {/* Colonnes */}
        <div className="grid gap-10 py-12 sm:grid-cols-3">
          <nav aria-label="Navigation pied de page">
            <h3 className="mb-4 text-xs font-bold tracking-[0.2em] text-smoke uppercase">
              Menu
            </h3>
            <ul className="space-y-2.5">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-ivory/85 transition-colors hover:text-canard-light"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-xs font-bold tracking-[0.2em] text-smoke uppercase">
              Le salon
            </h3>
            <address className="space-y-2.5 text-sm text-ivory/85 not-italic">
              <p>
                101 avenue Jean-Lolive
                <br />
                93500 Pantin
              </p>
              <ul>
                {OPENING_HOURS.map(({ days, hours }) => (
                  <li key={days}>
                    {days} · {hours}
                  </li>
                ))}
              </ul>
              <p>Barber shop de quartier, depuis 2010.</p>
            </address>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold tracking-[0.2em] text-smoke uppercase">
              Suivez-nous
            </h3>
            <a
              href="https://www.instagram.com/the_experts_barbershop/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-ivory/85 transition-colors hover:text-canard-light"
            >
              <InstagramIcon />
              @the_experts_barbershop
            </a>
          </div>
        </div>

        {/* Filet fin avant les mentions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-dark py-6 text-xs text-smoke">
          <p>© {currentYear} The Experts Barber Shop — Tous droits réservés.</p>
          <a href="/mentions-legales" className="transition-colors hover:text-ivory">
            Mentions légales
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
