# The Experts Barber Shop

Site vitrine one-page du salon The Experts Barber Shop, 101 avenue Jean-Lolive, 93500 Pantin.
La réservation passe par Planity.

## Stack

- Next.js 16 (App Router, Turbopack), page entièrement statique
- React 19, TypeScript
- Tailwind CSS v4
- Framer Motion (animations au scroll), Lucide (icônes)
- Polices Manrope (texte) et Besley (titres), auto-hébergées via `next/font`

## Démarrage

Le projet utilise **pnpm**.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # build de production
pnpm lint
```

## Où modifier quoi

| Contenu | Fichier |
| --- | --- |
| Lien Planity, téléphone, menu de navigation | `src/lib/site.ts` |
| Tarifs | `src/components/sections/Pricing.tsx` |
| Services | `src/components/sections/Services.tsx` |
| Équipe (photos à déposer dans `public/`) | `src/components/sections/Team.tsx` |
| Avis clients | `src/components/sections/Reviews.tsx` |
| Horaires, adresse, accès | `src/components/sections/Contact.tsx`, `src/components/layout/Footer.tsx` |
| SEO, Open Graph, données structurées | `src/app/layout.tsx` |
| Couleurs et polices | `src/app/globals.css` |

Les tarifs et le téléphone apparaissent aussi dans les données structurées de `src/app/layout.tsx` : les mettre à jour aux deux endroits.

## Galerie des coupes

Déposer les photos dans `public/galerie/`, puis redéployer : elles apparaissent dans la section « Dans le fauteuil ».

- Nommer les fichiers `AAAA-MM-JJ-description.jpg` (ex. `2026-10-26-degrade-barbe.jpg`) : les plus récentes s'affichent en premier.
- Formats acceptés : jpg, png, webp, avif. Les photos HEIC d'iPhone doivent être converties en JPG. Le build liste les fichiers ignorés.
- Pas besoin de redimensionner : Next.js optimise les images.
- 8 photos visibles, le reste derrière « Voir les N autres photos ».
- Dossier vide ou absent : la section et le lien « Galerie » sont masqués.
- Droit à l'image : n'utiliser que des photos de personnes qui ont donné leur accord.

## Design

- Fond sombre `#11100f`, sections crème `#f2eee7`, orange `#d96827`
- Sur fond crème, le texte orange utilise `text-brand-deep` (`#a84a1a`) pour rester lisible

## Déploiement

Vercel, sans configuration particulière.
