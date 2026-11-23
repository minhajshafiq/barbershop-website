import type { Metadata } from "next";
import ContentPage, { Block } from "@/components/pages/ContentPage";
import MapEmbed from "@/components/ui/MapEmbed";
import { OPENING_HOURS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accès et horaires | Barbier à Pantin, The Experts Barber Shop",
  description:
    "The Experts Barber Shop, 101 avenue Jean-Lolive, 93500 Pantin : adresse, plan d’accès, horaires 7j/7 et réservation en ligne.",
  alternates: { canonical: "/acces-horaires-pantin" },
};

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=101+Av.+Jean+Lolive,+93500+Pantin";

export default function Acces() {
  return (
    <ContentPage
      current="/acces-horaires-pantin"
      eyebrow="Accès & horaires"
      title="Accès et horaires du barbier à Pantin"
      intro="The Experts Barber Shop se trouve au 101 avenue Jean-Lolive, à Pantin. Le salon est ouvert tous les jours."
    >
      <Block title="Adresse">
        <address className="not-italic">
          The Experts Barber Shop
          <br />
          101 avenue Jean-Lolive
          <br />
          93500 Pantin
        </address>
        <p>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ivory underline-offset-4 hover:underline"
          >
            Calculer l’itinéraire sur Google Maps
          </a>
        </p>
      </Block>

      <Block title="Horaires">
        <ul className="divide-y divide-line-dark">
          {OPENING_HOURS.map(({ days, hours }) => (
            <li key={days} className="flex justify-between gap-4 py-2">
              <span className="text-ivory">{days}</span>
              <span>{hours}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Plan d’accès">
        <div className="overflow-hidden rounded-sm border border-line-dark">
          <MapEmbed />
        </div>
      </Block>

      <Block title="Nos prestations">
        <p>
          <a href="/coupe-degrade-pantin" className="text-ivory underline-offset-4 hover:underline">
            Coupe et dégradé
          </a>
          {" · "}
          <a href="/barbe-rasage-pantin" className="text-ivory underline-offset-4 hover:underline">
            Barbe et rasage
          </a>
        </p>
      </Block>
    </ContentPage>
  );
}
