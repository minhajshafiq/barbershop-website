import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { navigation, PHONE, PHONE_INTL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales | The Experts Barber Shop",
  description: "Mentions légales du site de The Experts Barber Shop, salon de coiffure masculine à Pantin.",
  // Sans ça, la page hériterait du canonical de l'accueil
  alternates: { canonical: "/mentions-legales" },
};

// Pas de lecture du dossier galerie ici : le lien « Galerie » est simplement omis
const nav = navigation.filter((item) => item.href !== "/#galerie");

const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="border-t border-line-dark py-8">
    <h2 className="font-display text-xl font-medium tracking-wide uppercase">{title}</h2>
    <div className="mt-4 space-y-2 leading-relaxed text-smoke">{children}</div>
  </section>
);

// Informations issues du registre des entreprises (societe.com), vérifiées le 26/10/2026
export default function MentionsLegales() {
  return (
    <div className="min-h-screen">
      <Header navigation={nav} />
      <main className="shell max-w-3xl pt-32 pb-20 sm:pt-40">
        <p className="eyebrow mb-4 text-canard-light">Informations légales</p>
        <h1 className="font-display mb-12 text-4xl leading-[1.05] font-bold uppercase sm:text-5xl">
          Mentions légales
        </h1>

        <Block title="Éditeur du site">
          <p>
            THE EXPERTS, société par actions simplifiée (SAS) au capital de 1 000 €,
            exploitant le salon The Experts Barber Shop.
          </p>
          <p>Siège social : 101 avenue Jean-Lolive, 93500 Pantin</p>
          <p>RCS Bobigny 980 485 304 · SIRET 980 485 304 00011</p>
          <p>TVA intracommunautaire : FR85980485304</p>
          <p>
            Téléphone :{" "}
            <a href={`tel:${PHONE_INTL}`} className="text-ivory underline-offset-4 hover:underline">
              {PHONE}
            </a>
          </p>
        </Block>

        <Block title="Directeur de la publication">
          <p>Naoufel Jebabli, président de THE EXPERTS.</p>
        </Block>

        <Block title="Hébergement">
          <p>Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis</p>
          <p>
            <a
              href="https://www.cloudflare.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory underline-offset-4 hover:underline"
            >
              cloudflare.com
            </a>
          </p>
        </Block>

        <Block title="Données personnelles et cookies">
          <p>
            Ce site ne dépose aucun cookie et ne contient ni formulaire ni outil de
            mesure d’audience : l’éditeur n’y collecte aucune donnée personnelle.
          </p>
          <p>
            La carte Google Maps de la page d’accueil ne se charge que si vous cliquez
            sur « Afficher la carte ». Google peut alors déposer des cookies, selon sa
            propre politique de confidentialité.
          </p>
          <p>
            Les réservations se font sur Planity, qui traite vos données selon sa propre
            politique de confidentialité.
          </p>
        </Block>

        <Block title="Propriété intellectuelle">
          <p>
            Les textes, photos et logo de ce site sont la propriété de THE EXPERTS.
            Toute reproduction sans autorisation écrite est interdite.
          </p>
        </Block>
      </main>
      <Footer navigation={nav} />
    </div>
  );
}
