# The Experts Barber Shop

Site vitrine one-page du salon The Experts Barber Shop, 101 avenue Jean-Lolive, 93500 Pantin.
La réservation passe par Planity.

## Stack

- Next.js 16 (App Router, Turbopack), page entièrement statique
- React 19, TypeScript
- Tailwind CSS v4
- Animations en CSS uniquement (entrée du hero, apparition au scroll via `animation-timeline`), Lucide (icônes)
- Polices Manrope (texte) et Besley (titres), auto-hébergées via `next/font`

## Démarrage

Le projet utilise **pnpm**.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # build de production
pnpm lint
pnpm test     # test de la galerie
```

## Où modifier quoi

| Contenu | Fichier |
| --- | --- |
| Lien Planity, téléphone, horaires, menu de navigation | `src/lib/site.ts` |
| Prestations et tarifs (« La carte ») | `src/components/sections/Services.tsx` |
| Photos de la galerie | `public/galerie/` (voir « Galerie des coupes ») |
| Équipe (photos à déposer dans `public/`) | `src/components/sections/Team.tsx` |
| Avis clients | `src/components/sections/Reviews.tsx` |
| Adresse, accès | `src/components/sections/Contact.tsx`, `src/components/layout/Footer.tsx` |
| Mentions légales (éditeur, hébergeur) | `src/app/mentions-legales/page.tsx` |
| SEO, Open Graph, données structurées | `src/app/layout.tsx` |
| Couleurs et polices | `src/app/globals.css` |

Les tarifs, le téléphone et les horaires apparaissent aussi dans les données structurées de `src/app/layout.tsx` : les mettre à jour aux deux endroits. Tarifs et horaires de référence : la page Planity du salon.

## Galerie des coupes

Déposer les photos dans `public/galerie/`, puis redéployer : elles apparaissent dans la section « Dans le fauteuil ».

- Nommer les fichiers `AAAA-MM-JJ-description.jpg` (ex. `2026-10-26-degrade-barbe.jpg`) : les plus récentes s'affichent en premier.
- Formats acceptés : jpg, png, webp, avif. Les photos HEIC d'iPhone doivent être converties en JPG. Le build liste les fichiers ignorés.
- Pas besoin de redimensionner : Next.js optimise les images.
- 8 photos visibles, le reste derrière « Voir les N autres photos ».
- Dossier vide ou absent : la section et le lien « Galerie » sont masqués.
- Droit à l'image : n'utiliser que des photos de personnes qui ont donné leur accord.

## Design

Identité tirée du logo (noir et crème, police Clarendon/Besley, rubans, cadre ornemental) et du salon (mur bleu canard, fauteuils chrome, carreaux de ciment).

- Couleurs : noir `#11100f`, crème `#f3ede1`, bleu canard `#176579`, chrome `#c9cdd1`.
- Sur fond noir, le texte d'accent est en `canard-light` (`#7fc4d4`) ou en `chrome`, jamais en `canard` (contraste insuffisant).
- Sur fond bleu canard : bouton `.btn-cream` et texte secondaire `ivory/85` minimum.
- Ornements dans `src/app/globals.css` : `.ribbon` (+ `.ribbon-chrome`), `.ornate-frame`, `.tiles`, `.medallion`, `.reveal`.

## Déploiement

Vercel, sans configuration particulière.
