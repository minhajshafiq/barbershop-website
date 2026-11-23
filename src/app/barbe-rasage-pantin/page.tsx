import type { Metadata } from "next";
import ContentPage, { Block, PriceList } from "@/components/pages/ContentPage";

export const metadata: Metadata = {
  title: "Barbe et rasage à l’ancienne à Pantin | The Experts Barber Shop",
  description:
    "Taille de barbe, contours et rasage traditionnel au coupe-chou à Pantin, 101 avenue Jean-Lolive. Dès 10 €, ouvert 7j/7. Réservation en ligne.",
  alternates: { canonical: "/barbe-rasage-pantin" },
};

export default function BarbeRasage() {
  return (
    <ContentPage
      current="/barbe-rasage-pantin"
      eyebrow="Barbe & rasage"
      title="Barbe et rasage à l’ancienne à Pantin"
      intro="Taille, contours et rasage traditionnel au coupe-chou, fini à la serviette chaude. Chez The Experts Barber Shop, au 101 avenue Jean-Lolive, la barbe est un vrai travail de barbier."
    >
      <Block title="Les prestations barbe et rasage">
        <PriceList
          items={[
            { name: "Taille de la barbe + rasage", duration: "20 min", price: "10 €" },
            { name: "Rasage traditionnel", duration: "20 min", price: "10 €" },
            { name: "Rasage du crâne traditionnel", duration: "30 min", price: "13 €" },
            { name: "Coupe + taille de la barbe", duration: "45 min", price: "22 €" },
          ]}
        />
        <p className="text-sm">Paiement par carte ou en espèces.</p>
      </Block>

      <Block title="Un rasage traditionnel">
        <p>
          Le rasage se fait au coupe-chou, avec blaireau, et se termine à la serviette chaude. Il
          prend le temps nécessaire : 20 minutes pour la barbe ou le rasage, 30 minutes pour le
          crâne.
        </p>
      </Block>

      <Block title="Qui s’en occupe">
        <p>
          Souhaib est le barbier du rasage traditionnel et du styling. L’équipe compte quatre
          barbiers, et vous pouvez choisir le vôtre au moment de réserver sur Planity.
        </p>
      </Block>

      <Block title="Barbier à Pantin, 7 jours sur 7">
        <p>
          Le salon est ouvert tous les jours, y compris le dimanche. Retrouvez les horaires et
          l’accès sur la page{" "}
          <a href="/acces-horaires-pantin" className="text-ivory underline-offset-4 hover:underline">
            accès et horaires
          </a>
          .
        </p>
      </Block>
    </ContentPage>
  );
}
