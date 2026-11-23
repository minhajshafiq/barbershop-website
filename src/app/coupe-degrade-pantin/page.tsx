import type { Metadata } from "next";
import ContentPage, { Block, PriceList } from "@/components/pages/ContentPage";

export const metadata: Metadata = {
  title: "Coupe homme et dégradé à Pantin | The Experts Barber Shop",
  description:
    "Coupe classique, dégradé et coiffage pour homme à Pantin, 101 avenue Jean-Lolive. Shampoing compris, dès 15 €, ouvert 7j/7. Réservation en ligne.",
  alternates: { canonical: "/coupe-degrade-pantin" },
};

export default function CoupeDegrade() {
  return (
    <ContentPage
      current="/coupe-degrade-pantin"
      eyebrow="Coupe & dégradé"
      title="Coupe homme et dégradé à Pantin"
      intro="Coupe classique, dégradé ou coiffage : shampoing compris, finitions soignées. The Experts Barber Shop vous accueille au 101 avenue Jean-Lolive, à Pantin."
    >
      <Block title="Les prestations coupe">
        <PriceList
          items={[
            { name: "Shampoing + coupe + coiffage", duration: "30 min", price: "15 €" },
            { name: "Coupe + taille de la barbe", duration: "45 min", price: "22 €" },
            { name: "Rasage du crâne traditionnel", duration: "30 min", price: "13 €" },
          ]}
        />
        <p className="text-sm">Paiement par carte ou en espèces.</p>
      </Block>

      <Block title="Choisir son barbier">
        <ul className="space-y-1">
          <li>
            <strong className="text-ivory">Wael</strong> : coupes et dégradés précis
          </li>
          <li>
            <strong className="text-ivory">Hamza</strong> : coupes modernes et finitions
          </li>
          <li>
            <strong className="text-ivory">Simo</strong> : conseil et transformations
          </li>
          <li>
            <strong className="text-ivory">Souhaib</strong> : rasage traditionnel et styling
          </li>
        </ul>
        <p>Vous choisissez votre barbier au moment de réserver sur Planity.</p>
      </Block>

      <Block title="Le salon">
        <p>
          Six fauteuils, une déco inspirée des motos et des vieux salons de barbier. Les clients
          citent souvent l’accueil et la propreté du salon dans leurs avis Google.
        </p>
      </Block>

      <Block title="Avec la barbe">
        <p>
          Pour une coupe et une barbe dans le même passage, voir la page{" "}
          <a href="/barbe-rasage-pantin" className="text-ivory underline-offset-4 hover:underline">
            barbe et rasage à Pantin
          </a>
          .
        </p>
      </Block>
    </ContentPage>
  );
}
