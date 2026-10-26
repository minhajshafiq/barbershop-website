// Infos du salon partagées par plusieurs composants : à modifier ici uniquement.
export const BOOKING_URL = "https://www.planity.com/the-expert-93500-pantin-3v3";

export const PHONE = "01 87 00 01 81";
export const PHONE_INTL = "+33187000181";

// Horaires repris de Planity (vérifiés le 26/10/2026). Mêmes horaires dans les données
// structurées de src/app/layout.tsx (format schema.org) : les mettre à jour aux deux endroits.
export const OPENING_HOURS = [
  { days: "Lundi", hours: "10h – 20h30" },
  { days: "Mardi – jeudi", hours: "9h30 – 20h30" },
  { days: "Vendredi – samedi", hours: "9h – 21h" },
  { days: "Dimanche", hours: "10h – 20h" },
];

// Liens en /#section : ils fonctionnent depuis l'accueil comme depuis /mentions-legales
export type NavItem = { name: string; href: string };

export const navigation: NavItem[] = [
  { name: "Accueil", href: "/#top" },
  { name: "La carte", href: "/#carte" },
  { name: "Le salon", href: "/#salon" },
  { name: "L’équipe", href: "/#equipe" },
  { name: "Galerie", href: "/#galerie" },
  { name: "Contact", href: "/#contact" },
];
