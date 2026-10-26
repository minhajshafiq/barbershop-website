// Infos du salon partagées par plusieurs composants : à modifier ici uniquement.
export const BOOKING_URL = "https://www.planity.com/the-expert-93500-pantin-3v3";

export const PHONE = "01 87 00 01 81";
export const PHONE_INTL = "+33187000181";

export type NavItem = { name: string; href: string };

export const navigation: NavItem[] = [
  { name: "Accueil", href: "/" },
  { name: "La carte", href: "#carte" },
  { name: "Le salon", href: "#salon" },
  { name: "L’équipe", href: "#equipe" },
  { name: "Contact", href: "#contact" },
];
