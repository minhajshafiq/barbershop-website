# Refonte du site The Experts Barber Shop : identité logo + salon

Date : 2026-10-26 · Statut : à valider

## Objectif

Le site doit ressembler au salon et à son logo. Critère de réussite : le gérant ouvre le site et reconnaît son salon.

- **Du logo** : noir et crème, lettrage Clarendon, rubans, cadre ornemental à double filet et losanges.
- **Du salon** : le bleu canard du mur principal, le chrome des fauteuils, les carreaux de ciment noir et blanc du sol.
- **Le ton** : barbier de quartier chaleureux, pas salon de luxe.

## Décisions prises

| Sujet | Décision |
| --- | --- |
| Direction visuelle | A · Bleu canard & chrome (maquette validée) |
| Format | Une seule page, réservation via Planity |
| Structure | 10 blocs (maquette validée), détail ci-dessous |
| Galerie | Section dans la page, alimentée par le dossier `public/galerie/` (le développeur dépose les photos) |
| Logo | Pas de version HD : affiché uniquement en petit (en-tête 56 px, pied de page 72 px). Son style est repris en CSS, le logo n'est pas redessiné. |

## Hors périmètre

À traiter avec le client, en dehors de cette refonte : mentions légales (SIRET), nom officiel, validation des tarifs, vrais avis Google, portraits de l'équipe, photos HD, logo HD.

## Système graphique

### Couleurs (`src/app/globals.css`)

| Token | Valeur | Rôle |
| --- | --- | --- |
| `night` | `#11100f` | Fond sombre des sections |
| `coal` | `#090909` | En-tête, pied de page |
| `cream` | `#f3ede1` | Fond clair « papier » |
| `ink` | `#171513` | Texte sur crème |
| `ivory` | `#f7f4ef` | Texte sur fonds sombres et bleu canard |
| `smoke` | `#a9a39b` | Texte secondaire sur noir |
| `stone` | `#6e675e` | Texte secondaire sur crème |
| `canard` | `#176579` | Bleu canard : fonds, boutons, texte d'accent sur crème |
| `canard-deep` | `#0d3f4c` | Ombre des rubans, survol des boutons |
| `canard-light` | `#7fc4d4` | Texte d'accent sur fonds sombres |
| `chrome` | `#c9cdd1` | Chiffres, ruban du pied de page, détails sur noir |

Les couleurs bleu canard sont nommées `canard`, et non `teal`, parce que Tailwind fournit déjà une palette `teal` (`teal-50` à `teal-950`) qui prêterait à confusion. Les tokens `brand`, `brand-hover`, `brand-deep` et `wood` (orange et bois) sont supprimés.

**Règles de contraste (mesurées) :**

| Fond | Texte principal | Accent | Secondaire | À éviter |
| --- | --- | --- | --- | --- |
| Noir (`night`/`coal`) | `ivory` | `canard-light` (9,7:1), `chrome` (11,9:1) | `smoke` (7,6:1) | `canard` en texte (2,9:1) |
| Crème | `ink` (15,6:1) | `canard` (5,7:1) | `stone` (4,8:1) | |
| Bleu canard | `ivory` (6,0:1) | `chrome` en grands titres seulement (4,1:1) | `ivory/85` minimum (4,9:1) | `smoke` (2,7:1), `canard-light` sous 24 px (3,4:1) |

**Boutons :**
- Sur noir ou sur crème : bouton principal bleu canard avec texte ivoire.
- Sur bleu canard : bouton principal crème avec texte noir.

### Typographie

Inchangée : Besley pour les titres (Clarendon, comme le lettrage du logo) et Manrope pour le texte. Les textes des rubans et les petits labels sont en Besley capitales, avec un espacement des lettres large.

### Ornements (classes CSS dans `globals.css`, sans composant React)

- **`.ribbon`** : banderole aux pointes en V, comme les rubans du logo. Texte HTML réel (lisible, sélectionnable) et pointes en pseudo-éléments `clip-path`. Variantes : bleu canard (hero) et `.ribbon-chrome` (pied de page).
- **`.ornate-frame`** : double filet avec un losange en haut et en bas, au centre. Remplace le double cadre et le séparateur SVG actuels de la carte des tarifs.
- **`.tiles`** : bande de carreaux de ciment, avec un motif SVG en data URI (cercles en coin et fleur à 4 pétales). Elle sert de séparateur sous le hero et en haut du pied de page.
- **`.medallion`** : cadre en arche à double filet (bordure plus `outline` décalé) pour les portraits de l'équipe.
- **Losanges `◆`** en `aria-hidden` comme séparateurs dans le bandeau de chiffres.

### Animations

framer-motion est **supprimé** :
- **Hero** : animations d'entrée CSS (déjà en place).
- **Apparition au scroll** : classes `.reveal` (fondu montant) et `.reveal-image` (dévoilement par `clip-path`). Elles utilisent les animations CSS liées au scroll (`animation-timeline: view()`) dans un `@supports`. Sans support, le contenu s'affiche directement, sans animation.
- **Menu mobile, barre de réservation mobile, bouton retour en haut** : transitions CSS déclenchées par une classe d'état.
- **Accessibilité** : tout est désactivé avec `prefers-reduced-motion: reduce`.

Conséquence : toutes les sections deviennent des composants serveur, sauf l'en-tête (menu), la barre de réservation mobile, le bouton retour en haut et la carte Google (chargement au clic). `MotionProvider.tsx` est supprimé.

## Structure de la page

Fonds dans l'ordre : photo, noir, crème, bleu canard, noir, crème, bleu canard, noir, noir.

| # | Section | Fichier | Fond | Contenu |
| --- | --- | --- | --- | --- |
| 1 | En-tête | `layout/Header.tsx` | `coal` translucide | Logo, nav, téléphone, bouton Réserver |
| 2–3 | Hero + bandeau | `sections/Hero.tsx` | photo + `night` | Ruban « Les Experts · Pantin », titre, 2 boutons, bande `.tiles`, chiffres séparés par des losanges en `chrome` |
| 4 | La carte `#carte` | `sections/Services.tsx` (réécrit, absorbe `Pricing.tsx`) | `cream` | 4 catégories (Coupe, Barbe, Soins, Techniques), chacune avec sa phrase de description puis ses prix, dans `.ornate-frame`. Encart « Vous hésitez ? » en bleu canard. |
| 5 | Le salon `#salon` | `sections/About.tsx` (réécrit, absorbe l'ancienne `Gallery.tsx`) | `canard` | Histoire, citation, chiffres, collage des 4 photos du salon |
| 6 | L'équipe `#equipe` | `sections/Team.tsx` | `night` | 4 `.medallion`, initiale tant qu'il n'y a pas de photo, plus de mention « Portrait à venir ». Un seul bouton « Choisir son barbier sur Planity » remplace les liens « Réserver avec X ». |
| 7 | Dans le fauteuil `#galerie` | `sections/Gallery.tsx` (réécrit) | `cream` | Galerie des coupes, voir ci-dessous |
| 8 | Avis `#avis` | `sections/Reviews.tsx` | `canard` | Note 4,9 en crème, lien vers les avis Google. Les citations s'affichent seulement si le tableau `reviews` est rempli (vide par défaut, faux avis retirés). |
| 9 | Contact `#contact` | `sections/Contact.tsx` | `night` | Infos inchangées. Carte Google chargée au clic, via le composant client `ui/MapEmbed.tsx`. |
| 10 | Pied de page | `layout/Footer.tsx` | `coal` | Bande `.tiles`, logo, `.ribbon-chrome` avec le téléphone, colonnes actuelles |

Navigation (`src/lib/site.ts`) : Accueil, La carte, Le salon, L'équipe, Galerie, Contact.

**Petites corrections de contenu faites au passage :**
- « 14+ ans » devient « Depuis 2010 ».
- « Voir les tarifs » pointe vers `#carte`.

Fichiers supprimés : `sections/Pricing.tsx`, `components/MotionProvider.tsx`.

## Galerie « Dans le fauteuil »

**Données** : `src/lib/gallery.ts` expose `getGalleryPhotos(dir = public/galerie)`. La fonction :
- renvoie `[]` si le dossier n'existe pas ;
- garde les `.jpg`, `.jpeg`, `.png`, `.webp` et `.avif` (sans tenir compte des majuscules) ;
- trie par nom de fichier décroissant ;
- renvoie des chemins `/galerie/<fichier>`.

Elle est lue au build : la page reste statique.

**Convention de nommage** (expliquée dans le README) : `AAAA-MM-JJ-description.jpg`. Les plus récentes s'affichent en premier.

**Affichage :**
- Grille de vignettes 4:5 (`next/image` en `fill`, `object-cover`), 2 colonnes sur mobile et 4 sur desktop.
- Les 8 premières photos sont visibles. Le reste est dans un `<details>` natif dont le résumé est « Voir les N autres photos » : aucun JavaScript, chargement différé natif.
- Texte alternatif : « Coupe réalisée chez The Experts Barber Shop ».

**Section vide** : si `getGalleryPhotos()` renvoie `[]`, la section n'est pas rendue et le lien « Galerie » disparaît de la navigation. `page.tsx` filtre la navigation et la passe à `Header` et `Footer`.

**Pas d'agrandissement des photos au clic** dans cette version. À ajouter si le client le demande.

**Droit à l'image** : le README rappelle que les personnes reconnaissables sur les photos doivent avoir donné leur accord.

## Vérification

- `pnpm lint` et `pnpm build` passent.
- Un test : `src/lib/gallery.test.mjs`, lancé avec `node --test` (script `pnpm test`). Il couvre le dossier absent, le filtrage des extensions et l'ordre de tri.
- `framer-motion` n'apparaît plus dans `package.json` ni dans `src/`.
- Le HTML généré ne contient plus de styles `opacity:0` inline, donc le contenu est visible sans JavaScript.
- Revue visuelle avec `pnpm dev`, sur mobile (375 px) et desktop (1440 px), par le développeur. Chrome n'est pas installé pour Playwright sur ce poste.
