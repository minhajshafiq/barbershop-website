# Refonte identité logo + salon : plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal :** Refaire le design du site one-page The Experts Barber Shop autour du logo (noir, crème, Clarendon, rubans, cadre ornemental) et du salon (bleu canard, chrome, carreaux de ciment), et ajouter une galerie de coupes alimentée par un dossier.

**Architecture :** Next.js 16 App Router, une page statique. Le système graphique (couleurs, boutons, ornements, animations) vit dans `src/app/globals.css`. Les sections sont des composants serveur. Seuls l'en-tête, la barre de réservation mobile, le bouton retour en haut et la carte Google sont des composants client. framer-motion est retiré au profit d'animations CSS. La galerie lit `public/galerie/` au build via `src/lib/gallery.ts`.

**Tech Stack :** Next.js 16.4, React 19.3, TypeScript 6.0, Tailwind CSS 4.3, lucide-react 1.x, pnpm 11, Node 24 (`node --test` pour le seul test).

**Spec :** `docs/superpowers/specs/2026-10-26-refonte-identite-design.md`

## Global Constraints

- Gestionnaire de paquets : **pnpm**. Aucune nouvelle dépendance. framer-motion est **supprimé** (tâche 12).
- Couleurs Tailwind : `night` `#11100f`, `coal` `#090909`, `cream` `#f3ede1`, `ink` `#171513`, `ivory` `#f7f4ef`, `smoke` `#a9a39b`, `stone` `#6e675e`, `canard` `#176579`, `canard-deep` `#0d3f4c`, `canard-light` `#7fc4d4`, `chrome` `#c9cdd1`.
- Contraste, sur fond noir : texte d'accent en `canard-light` ou `chrome`, **jamais `canard`** (2,9:1).
- Contraste, sur fond crème : accent en `canard`, secondaire en `stone`.
- Contraste, sur fond `canard` : texte `ivory`, secondaire `ivory/85` minimum (pas `smoke`), `chrome` seulement en texte de 30 px et plus.
- Boutons : `.btn-primary` (bleu canard) sur fond noir ou crème. `.btn-cream` sur fond bleu canard.
- Logo `/LOGO.jpg` (150 px) affiché à **72 px maximum**.
- Les textes sont repris tels quels, sauf : « 14+ ans » / « Depuis plus de 14 ans » deviennent « 2010 » / « Depuis 2010 », les faux avis sont retirés, et les liens « Réserver avec X » sont remplacés par un seul bouton « Choisir son barbier sur Planity ».
- Respect de `prefers-reduced-motion: reduce` pour toute animation ou transition ajoutée.
- Commits sur la branche `refonte-identite`. Chaque message se termine par la ligne `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Photos d'iPhone en HEIC** (ou tout format non affichable) déposées dans `public/galerie/` : elles ne s'affichent pas. Le build doit le **signaler** au lieu de les ignorer en silence. Test : tâche 2.
2. **Fichiers cachés macOS** (`._photo.jpg`, `.DS_Store`) copiés depuis une clé USB : ils ne doivent jamais apparaître comme une image cassée. Test : tâche 2.
3. **Exactement 8 ou 9 photos** :
   - 8 photos : pas de bouton « Voir plus ».
   - 9 photos : le bouton dit « Voir 1 autre photo », au singulier.

   Vérification : tâche 6.
4. **Dossier galerie vide ou absent** : ni section, ni lien « Galerie » dans l'en-tête ou le pied de page. Vérification : tâche 6.
5. **Navigateur sans JavaScript ou sans animations liées au scroll** (Firefox, anciens Safari) : tout le contenu reste visible. Aucun `opacity:0` en style inline, et `.reveal` n'est appliqué que dans `@supports`. Vérification : tâche 12.

---

## Carte des fichiers

| Fichier | Rôle | Tâche |
| --- | --- | --- |
| `src/app/globals.css` | Système graphique : tokens, boutons, `.ribbon`, `.ornate-frame`, `.tiles`, `.medallion`, `.reveal` | 1, 4, 12 |
| `src/lib/gallery.ts` | `getGalleryPhotos(dir?)` : liste des photos de `public/galerie/` | 2 |
| `src/lib/gallery.test.mjs` | Test `node --test` de `getGalleryPhotos` | 2 |
| `src/lib/site.ts` | Constantes + `navigation` typée `NavItem[]` | 4, 6 |
| `src/components/sections/Hero.tsx` | Hero + bandeau de chiffres | 3 |
| `src/components/sections/Services.tsx` | « La carte » (fusion Services + Tarifs) | 4 |
| `src/components/sections/About.tsx` | « Le salon » (fusion À propos + photos du salon) | 5 |
| `src/components/sections/Gallery.tsx` | « Dans le fauteuil » (galerie des coupes) | 6 |
| `src/components/sections/Team.tsx` | L'équipe en médaillons | 7 |
| `src/components/sections/Reviews.tsx` | Avis | 8 |
| `src/components/sections/Contact.tsx` + `src/components/ui/MapEmbed.tsx` | Contact, carte chargée au clic | 9 |
| `src/components/layout/Header.tsx` | En-tête, menu mobile en CSS | 6, 10 |
| `src/components/layout/Footer.tsx` | Pied de page | 6, 11 |
| `src/components/ui/StickyBooking.tsx`, `src/components/ui/BackToTop.tsx` | Transitions CSS | 12 |
| `src/app/page.tsx` | Ordre des sections, navigation filtrée | 4, 5, 6 |
| `src/app/layout.tsx` | Retrait de `MotionProvider` | 12 |
| Supprimés : `src/components/sections/Pricing.tsx` (tâche 4), `src/components/MotionProvider.tsx` (tâche 12) | | |

Commandes de vérification, valables pour toutes les tâches :

```bash
pnpm lint && pnpm build
```

Attendu : `eslint` ne remonte rien, et le build se termine par `○ /` et `(Static) prerendered as static content`.

---

### Task 0 : Préparer la branche

**Files :**
- Modify: `.gitignore`

État de départ : des corrections qualité sont indexées, la mise à jour des dépendances ne l'est pas (`package.json`, `pnpm-lock.yaml`, `src/components/layout/Footer.tsx`), et la spec et ce plan ne sont pas suivis par git.

- [ ] **Step 1 : Créer la branche**

```bash
git switch -c refonte-identite
```

- [ ] **Step 2 : Commiter les corrections qualité déjà indexées**

```bash
git commit -m "fix: contraste, image de partage, hero sans JS, config pnpm, nettoyage" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 3 : Commiter la mise à jour des dépendances**

```bash
git add package.json pnpm-lock.yaml src/components/layout/Footer.tsx
git commit -m "chore: mise à jour des dépendances (Next 16.4, React 19.3, TS 6.0, lucide 1.x)" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 4 : Ignorer la config locale du détecteur de design**

À la fin de `.gitignore`, sous le bloc `/.superpowers/`, ajouter :

```
/.impeccable/
```

- [ ] **Step 5 : Commiter spec, plan et `.gitignore`**

```bash
git add .gitignore docs/superpowers
git commit -m "docs: spec et plan de la refonte identité" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git status --short
```

Attendu : `git status --short` n'affiche plus rien.

---

### Task 1 : Système graphique

**Files :**
- Modify: `src/app/globals.css` (réécriture complète)

**Interfaces :**
- Produit les utilitaires Tailwind `bg-/text-/border-` × `canard`, `canard-deep`, `canard-light`, `chrome` (en plus de `night`, `coal`, `cream`, `ink`, `ivory`, `smoke`, `stone`, `line-dark`, `line-light`).
- Produit les classes `.btn-primary`, `.btn-cream`, `.btn-ghost-dark`, `.btn-ghost-light`, `.ribbon`, `.ribbon-chrome`, `.ornate-frame` (variable `--frame-bg`), `.tiles`, `.medallion`, `.reveal`, `.reveal-image`, `.eyebrow` (sans couleur : chaque section la fixe).
- Ces classes sont dans `@layer components` : un utilitaire Tailwind les surcharge sans `!`.
- Les anciens tokens `brand`, `brand-hover`, `brand-deep`, `wood` et la classe `.btn-ink` restent jusqu'aux tâches 4 et 12, pour que le site compile entre les tâches.

- [ ] **Step 1 : Remplacer tout le contenu de `src/app/globals.css`**

```css
@import "tailwindcss";

/* Tailwind scanne tout le dépôt : on exclut les docs, dont les exemples de classes gonfleraient le CSS */
@source not "../../docs";

:root {
  --background-dark: #11100f;
  --background-darker: #090909;
  --background-light: #f3ede1;
  /* Bleu canard : le mur de la grande salle */
  --canard: #176579;
  --canard-deep: #0d3f4c;
  --canard-light: #7fc4d4;
  /* Chrome : les fauteuils de barbier */
  --chrome: #c9cdd1;
  --chrome-shade: #8e9398;
  --text-light: #f7f4ef;
  --text-dark: #171513;
  --text-muted: #a9a39b;
  --text-muted-on-light: #6e675e;
  --border-dark: rgba(255, 255, 255, 0.12);
  --border-light: rgba(17, 16, 15, 0.12);
  /* Anciennes couleurs : supprimées à la tâche 12, quand plus aucun composant ne les utilise */
  --primary-orange: #d96827;
  --primary-orange-hover: #ed7a35;
  --primary-orange-deep: #a84a1a;
  --wood-brown: #5b3829;
}

@theme inline {
  --color-night: var(--background-dark);
  --color-coal: var(--background-darker);
  --color-cream: var(--background-light);
  --color-canard: var(--canard);
  --color-canard-deep: var(--canard-deep);
  --color-canard-light: var(--canard-light);
  --color-chrome: var(--chrome);
  --color-ivory: var(--text-light);
  --color-ink: var(--text-dark);
  --color-smoke: var(--text-muted);
  --color-stone: var(--text-muted-on-light);
  --color-line-dark: var(--border-dark);
  --color-line-light: var(--border-light);
  --font-sans: var(--font-manrope);
  --font-display: var(--font-besley);
  /* Anciennes couleurs (tâche 12) */
  --color-brand: var(--primary-orange);
  --color-brand-hover: var(--primary-orange-hover);
  --color-brand-deep: var(--primary-orange-deep);
  --color-wood: var(--wood-brown);
}

/* Entrée du hero en CSS : le texte s'affiche sans attendre l'hydratation */
@theme {
  --animate-fade-up: fade-up 0.7s ease-out var(--delay, 0s) both;
  --animate-fade-in: fade-in 1s ease-out var(--delay, 0s) both;
  --animate-scroll-line: scroll-line 2s ease-in-out infinite;

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }

  @keyframes scroll-line {
    0%,
    100% {
      transform: scaleY(0.3);
    }
    50% {
      transform: scaleY(1);
    }
  }
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  background: var(--background-dark);
  color: var(--text-light);
  font-family: var(--font-manrope), system-ui, sans-serif;
}

::selection {
  background: var(--canard);
  color: var(--text-light);
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--background-darker);
}

::-webkit-scrollbar-thumb {
  background: var(--canard-deep);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--canard);
}

/* Apparition au scroll sans JavaScript (animations liées au scroll).
   Navigateur sans support ou animations réduites : le contenu s'affiche directement. */
@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
}

@keyframes reveal-clip {
  from {
    clip-path: inset(0 0 100% 0);
  }
}

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .reveal {
      animation: reveal-up linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 60%;
    }

    .reveal-image {
      animation: reveal-clip linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 70%;
    }
  }
}

@layer components {
  /* Conteneurs */
  .shell {
    @apply mx-auto w-full max-w-6xl px-5 sm:px-8;
  }

  .shell-wide {
    @apply mx-auto w-full max-w-7xl px-5 sm:px-8;
  }

  /* Micro-label précédé d'un filet court. Couleur fixée par la section :
     text-canard sur crème, text-canard-light sur noir, text-ivory sur bleu canard. */
  .eyebrow {
    @apply inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em];
  }

  .eyebrow::before {
    content: "";
    width: 1.75rem;
    height: 1px;
    background: currentColor;
  }

  /* Boutons */
  .btn-primary,
  .btn-cream,
  .btn-ghost-dark,
  .btn-ghost-light,
  .btn-ink {
    @apply inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-sm px-6 text-sm font-bold tracking-wide transition-colors duration-200;
  }

  /* Anneau de focus double (noir + bleu clair) : visible sur fond noir, crème ou bleu canard */
  .btn-primary:focus-visible,
  .btn-cream:focus-visible,
  .btn-ghost-dark:focus-visible,
  .btn-ghost-light:focus-visible,
  .btn-ink:focus-visible {
    outline: 2px solid transparent;
    box-shadow:
      0 0 0 2px var(--background-darker),
      0 0 0 4px var(--canard-light);
  }

  /* Sur fond noir ou crème */
  .btn-primary {
    @apply bg-canard text-ivory hover:bg-canard-deep;
  }

  /* Sur fond bleu canard */
  .btn-cream {
    @apply bg-cream text-ink hover:bg-ivory;
  }

  .btn-ghost-dark {
    @apply border border-ivory/30 text-ivory hover:border-ivory/60 hover:bg-ivory/5;
  }

  .btn-ghost-light {
    @apply border border-ink/30 text-ink hover:border-ink/60 hover:bg-ink/5;
  }

  /* Utilisé uniquement par Pricing.tsx, supprimé à la tâche 4 */
  .btn-ink {
    @apply bg-ink text-ivory hover:bg-coal;
  }

  /* Ruban à pointes en V, repris du logo (« Les Experts », numéro de téléphone) */
  .ribbon {
    --ribbon-bg: var(--canard);
    --ribbon-tail: var(--canard-deep);
    --ribbon-text: var(--text-light);
    position: relative;
    display: inline-block;
    margin-inline: 1.25rem;
    padding: 0.45rem 1.1rem;
    background: var(--ribbon-bg);
    color: var(--ribbon-text);
    font-family: var(--font-besley), Georgia, serif;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 0.25em;
    text-transform: uppercase;
  }

  /* Pointes décalées vers le bas, côte à côte avec la bande : effet de ruban replié */
  .ribbon::before,
  .ribbon::after {
    content: "";
    position: absolute;
    top: 0.35rem;
    bottom: -0.35rem;
    width: 1.25rem;
    background: var(--ribbon-tail);
  }

  .ribbon::before {
    right: 100%;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0.5rem 50%);
  }

  .ribbon::after {
    left: 100%;
    clip-path: polygon(0 0, 100% 0, calc(100% - 0.5rem) 50%, 100% 100%, 0 100%);
  }

  .ribbon-chrome {
    --ribbon-bg: var(--chrome);
    --ribbon-tail: var(--chrome-shade);
    --ribbon-text: var(--text-dark);
  }

  /* Double filet + losanges en haut et en bas, comme le cadre du logo.
     --frame-bg = couleur de fond de la section (crème par défaut) : elle « coupe » les filets. */
  .ornate-frame {
    position: relative;
    border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
    outline: 1px solid color-mix(in srgb, currentColor 30%, transparent);
    outline-offset: -7px;
  }

  .ornate-frame::before,
  .ornate-frame::after {
    content: "";
    position: absolute;
    left: 50%;
    width: 0.5rem;
    height: 0.5rem;
    background: var(--canard);
    box-shadow: 0 0 0 0.375rem var(--frame-bg, var(--background-light));
    transform: translateX(-50%) rotate(45deg);
  }

  .ornate-frame::before {
    top: -0.25rem;
  }

  .ornate-frame::after {
    bottom: -0.25rem;
  }

  /* Bande de carreaux de ciment : le sol du salon */
  .tiles {
    height: 1.5rem;
    background-size: 1.5rem 1.5rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23f3ede1'/%3E%3Cg fill='%23171513'%3E%3Ccircle r='11'/%3E%3Ccircle cx='48' r='11'/%3E%3Ccircle cy='48' r='11'/%3E%3Ccircle cx='48' cy='48' r='11'/%3E%3Cpath d='M24 9c5 7 5 9 0 15c-5-6-5-8 0-15zM24 39c5-7 5-9 0-15c-5 6-5 8 0 15zM9 24c7-5 9-5 15 0c-6 5-8 5-15 0zM39 24c-7-5-9-5-15 0c6 5 8 5 15 0z'/%3E%3C/g%3E%3C/svg%3E");
  }

  /* Médaillon en arche à double filet pour les portraits */
  .medallion {
    position: relative;
    overflow: hidden;
    border: 1px solid rgb(247 244 239 / 0.35);
    border-radius: 999px 999px 0.375rem 0.375rem;
    outline: 1px solid rgb(247 244 239 / 0.15);
    outline-offset: 4px;
  }

  /* Grain photographique discret */
  .grain {
    pointer-events: none;
    opacity: 0.35;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  }
}
```

- [ ] **Step 2 : Vérifier lint et build**

Run : `pnpm lint && pnpm build`
Attendu : lint sans erreur, build statique OK.

- [ ] **Step 3 : Vérifier que les classes sont générées**

```bash
for c in '.ribbon' '.ornate-frame' '.tiles' '.medallion' '.btn-cream' '.reveal' 'animation-timeline:view()'; do
  grep -qF "$c" .next/static/chunks/*.css && echo "ok     $c" || echo "MANQUE $c"
done
```

Attendu : sept lignes `ok …`, aucune ligne `MANQUE`.

- [ ] **Step 4 : Commit**

```bash
git add src/app/globals.css
git commit -m "feat: système graphique bleu canard, rubans, cadre, carreaux de ciment" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2 : Données de la galerie

**Files :**
- Create: `src/lib/gallery.ts`
- Test: `src/lib/gallery.test.mjs`
- Modify: `package.json` (script `test`)

**Interfaces :**
- Produit : `getGalleryPhotos(dir?: string): string[]`. Elle renvoie des chemins publics (`/galerie/<fichier>`), triés par nom décroissant. Par défaut, `dir` vaut `<cwd>/public/galerie`.
- Effet de bord : un `console.warn` unique liste les fichiers ignorés (formats non supportés). Les fichiers cachés sont ignorés sans avertissement.

- [ ] **Step 1 : Ajouter le script de test dans `package.json`**

Dans `"scripts"`, après `"lint": "eslint"`, ajouter une virgule et :

```json
    "test": "node --test"
```

- [ ] **Step 2 : Écrire le test qui échoue, `src/lib/gallery.test.mjs`**

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { getGalleryPhotos } from "./gallery.ts";

// Dossier temporaire rempli de fichiers vides
const folderWith = (files) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "galerie-"));
  for (const file of files) fs.writeFileSync(path.join(dir, file), "");
  return dir;
};

test("dossier absent : aucune photo", () => {
  assert.deepEqual(getGalleryPhotos(path.join(os.tmpdir(), "galerie-inexistante")), []);
});

test("garde les images, quelle que soit la casse de l'extension", () => {
  const dir = folderWith(["a.jpg", "b.JPEG", "c.png", "d.webp", "e.avif"]);
  assert.deepEqual(getGalleryPhotos(dir), [
    "/galerie/e.avif",
    "/galerie/d.webp",
    "/galerie/c.png",
    "/galerie/b.JPEG",
    "/galerie/a.jpg",
  ]);
});

test("ignore les fichiers cachés macOS sans avertir", (t) => {
  const warn = t.mock.method(console, "warn", () => {});
  const dir = folderWith([".DS_Store", "._coupe.jpg", "coupe.jpg"]);
  assert.deepEqual(getGalleryPhotos(dir), ["/galerie/coupe.jpg"]);
  assert.equal(warn.mock.callCount(), 0);
});

test("signale au build les formats non supportés (HEIC d'iPhone)", (t) => {
  const warn = t.mock.method(console, "warn", () => {});
  const dir = folderWith(["IMG_1234.HEIC", "notes.txt", "coupe.jpg"]);
  assert.deepEqual(getGalleryPhotos(dir), ["/galerie/coupe.jpg"]);
  assert.equal(warn.mock.callCount(), 1);
  assert.match(warn.mock.calls[0].arguments[0], /IMG_1234\.HEIC/);
});

test("les plus récentes d'abord (nom AAAA-MM-JJ-…)", () => {
  const dir = folderWith(["2026-01-05-degrade.jpg", "2026-10-20-barbe.jpg", "2025-12-31-coupe.jpg"]);
  assert.deepEqual(getGalleryPhotos(dir), [
    "/galerie/2026-10-20-barbe.jpg",
    "/galerie/2026-01-05-degrade.jpg",
    "/galerie/2025-12-31-coupe.jpg",
  ]);
});
```

- [ ] **Step 3 : Lancer le test pour le voir échouer**

Run : `pnpm test`
Attendu : FAIL, avec `Cannot find module '.../src/lib/gallery.ts'` (`ERR_MODULE_NOT_FOUND`).

- [ ] **Step 4 : Implémenter `src/lib/gallery.ts`**

```ts
import fs from "node:fs";
import path from "node:path";

const GALLERY_DIR = path.join(process.cwd(), "public", "galerie");
const IMAGE_FILE = /\.(jpe?g|png|webp|avif)$/i;

// Photos de la galerie, lues au build. Nommer les fichiers AAAA-MM-JJ-description.jpg :
// le tri par nom décroissant affiche les plus récentes en premier.
export function getGalleryPhotos(dir: string = GALLERY_DIR): string[] {
  if (!fs.existsSync(dir)) return [];

  // Fichiers cachés (.DS_Store, ._photo.jpg de macOS) : jamais affichés
  const files = fs.readdirSync(dir).filter((file) => !file.startsWith("."));

  const ignored = files.filter((file) => !IMAGE_FILE.test(file));
  if (ignored.length > 0) {
    console.warn(
      `Galerie : fichiers ignorés, formats acceptés jpg, png, webp, avif (convertir les HEIC d'iPhone en JPG) : ${ignored.join(", ")}`,
    );
  }

  return files
    .filter((file) => IMAGE_FILE.test(file))
    .sort()
    .reverse()
    .map((file) => `/galerie/${file}`);
}
```

- [ ] **Step 5 : Relancer les tests**

Run : `pnpm test`
Attendu : `ℹ tests 5`, `ℹ pass 5`, `ℹ fail 0`. Node peut afficher un avertissement « Type Stripping is an experimental feature » : il est sans conséquence.

- [ ] **Step 6 : Lint et build**

Run : `pnpm lint && pnpm build`
Attendu : OK. `gallery.ts` n'est encore importé par aucune page.

- [ ] **Step 7 : Commit**

```bash
git add package.json src/lib/gallery.ts src/lib/gallery.test.mjs
git commit -m "feat: lecture des photos de la galerie depuis public/galerie" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3 : Hero et bandeau de chiffres

**Files :**
- Modify: `src/components/sections/Hero.tsx` (réécriture complète)

**Interfaces :**
- Consomme : `BOOKING_URL` (`@/lib/site`), classes `.ribbon`, `.tiles`, `.btn-primary`, `.btn-ghost-dark` et `.grain` (tâche 1).
- Le bouton « Voir la carte » pointe vers `#carte`, une ancre créée à la tâche 4.

- [ ] **Step 1 : Remplacer `src/components/sections/Hero.tsx`**

```tsx
import Image from "next/image";
import { BOOKING_URL } from "@/lib/site";

const proofs = [
  { value: "4,9/5", label: "sur Google" },
  { value: "5000+", label: "clients accueillis" },
  { value: "7j/7", label: "de 9h30 à 20h" },
  { value: "2010", label: "année d’ouverture" },
];

const Hero = () => {
  return (
    <>
      <section className="relative flex min-h-[92svh] items-end overflow-hidden">
        {/* Photo unique et forte : l’équipe dans le salon */}
        <Image
          src="/hero.jpg"
          alt="L’équipe de The Experts Barber Shop réunie sur le canapé chesterfield du salon, à Pantin"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_30%]"
        />
        {/* Voile bleu canard très sombre : la couleur du salon, visages préservés */}
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-canard-deep/45 to-coal/10" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-canard-deep/80 via-canard-deep/20 to-transparent" aria-hidden />
        <div className="grain absolute inset-0" aria-hidden />

        {/* Contenu bas-gauche */}
        <div className="shell-wide relative z-10 pt-36 pb-16 sm:pb-20">
          <div className="max-w-4xl">
            {/* Ruban « Les Experts », comme en haut du logo */}
            <p className="ribbon mb-6 motion-safe:animate-fade-up [--delay:100ms]">
              Les Experts · Pantin
            </p>

            <h1 className="font-display text-[clamp(2.25rem,5.4vw,4.25rem)] leading-[1.04] font-bold uppercase motion-safe:animate-fade-up [--delay:200ms]">
              Une coupe précise.
              <br />
              Une équipe qui{" "}
              <span className="whitespace-nowrap text-canard-light">vous connaît.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg motion-safe:animate-fade-up [--delay:350ms]">
              Barber shop de quartier depuis 2010. Coupe, barbe et soins dans une
              ambiance conviviale, avec une attention particulière portée à chaque
              détail.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 motion-safe:animate-fade-up [--delay:500ms]">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Réserver un créneau
                <span aria-hidden>→</span>
              </a>
              <a href="#carte" className="btn-ghost-dark">
                Voir la carte
              </a>
            </div>
          </div>
        </div>

        {/* Indicateur de scroll discret */}
        <div
          className="absolute right-8 bottom-8 z-10 hidden flex-col items-center gap-3 lg:flex motion-safe:animate-fade-in [--delay:1200ms]"
          aria-hidden
        >
          <span className="text-[10px] font-bold tracking-[0.3em] text-ivory/60 uppercase [writing-mode:vertical-rl]">
            Défiler
          </span>
          <span className="h-12 w-px origin-top bg-canard-light motion-safe:animate-scroll-line" />
        </div>
      </section>

      {/* Le sol du salon */}
      <div className="tiles" aria-hidden />

      {/* Bandeau de chiffres, séparés par des losanges comme sur le cadre du logo */}
      <div className="bg-coal">
        <ul className="shell-wide grid grid-cols-2 gap-y-5 py-6 lg:grid-cols-4">
          {proofs.map((proof, idx) => (
            <li key={proof.value} className="relative flex items-baseline gap-2 lg:justify-center">
              {idx > 0 && (
                <span
                  className="absolute top-1/2 left-0 hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-chrome/60 lg:block"
                  aria-hidden
                />
              )}
              <span className="font-display text-2xl font-medium text-chrome">{proof.value}</span>
              <span className="text-xs tracking-wide text-smoke uppercase">{proof.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Hero;
```

- [ ] **Step 2 : Lint et build**

Run : `pnpm lint && pnpm build`
Attendu : OK.

- [ ] **Step 3 : Vérifier le HTML**

```bash
grep -o 'class="ribbon[^"]*"' .next/server/app/index.html
grep -c 'class="tiles"' .next/server/app/index.html
```

Attendu :
- Une classe commençant par `ribbon mb-6`.
- La valeur `1` : une seule bande `tiles` pour l'instant, le pied de page arrive à la tâche 11.

- [ ] **Step 4 : Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: hero bleu canard avec ruban et carreaux de ciment" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4 : La carte (fusion Services + Tarifs)

**Files :**
- Modify: `src/components/sections/Services.tsx` (réécriture complète)
- Delete: `src/components/sections/Pricing.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/lib/site.ts` (navigation)
- Modify: `src/app/globals.css` (retrait de `.btn-ink`)

**Interfaces :**
- Produit : la section `id="carte"`.
- Produit : `export type NavItem = { name: string; href: string }` et `export const navigation: NavItem[]` dans `@/lib/site`.

- [ ] **Step 1 : Remplacer `src/components/sections/Services.tsx`**

```tsx
import { BOOKING_URL } from "@/lib/site";

// Une seule source pour les prestations : description de la catégorie, puis les prix.
// Les prix sont aussi dans les données structurées de src/app/layout.tsx.
const menu = [
  {
    category: "Coupe",
    description:
      "Coupe classique, dégradé, coiffage ou rasage du crâne à l’ancienne. Shampoing compris.",
    items: [
      { name: "Shampoing + coupe + coiffage", duration: "30 min", price: "15 €" },
      { name: "Rasage du crâne traditionnel", duration: "30 min", price: "13 €" },
      { name: "Coupe + taille de barbe", duration: "45 min", price: "22 €" },
    ],
  },
  {
    category: "Barbe",
    description:
      "Taille, contours et rasage traditionnel au coupe-chou, fini à la serviette chaude.",
    items: [
      { name: "Taille de barbe + rasage", duration: "20 min", price: "10 €" },
      { name: "Rasage traditionnel", duration: "20 min", price: "10 €" },
    ],
  },
  {
    category: "Soins",
    description:
      "Gommage capillaire, black mask ou masque à l’argile. Le cuir chevelu respire, le visage aussi.",
    items: [
      { name: "Gommage capillaire + black mask", duration: "45 min", price: "22 €" },
      { name: "Gommage capillaire + masque à l’argile", duration: "30 min", price: "22 €" },
    ],
  },
  {
    category: "Techniques",
    description:
      "Lissage brésilien, coloration, nouveau style ou changement complet. On en parle, puis on le fait.",
    items: [
      { name: "Lissage brésilien + coupe + coiffage", duration: "1 h 30", price: "22 €" },
      { name: "Coloration + coupe + coiffage", duration: "1 h 30", price: "22 €" },
    ],
  },
];

const Services = () => {
  return (
    <section
      id="carte"
      className="scroll-mt-20 bg-cream py-20 text-ink sm:py-28"
      aria-labelledby="carte-heading"
    >
      <div className="shell-wide">
        <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4 text-canard">Prestations &amp; tarifs</p>
            <h2
              id="carte-heading"
              className="font-display text-4xl leading-[1.05] font-bold uppercase sm:text-5xl lg:text-6xl"
            >
              La carte
            </h2>
          </div>
          <p className="text-sm text-stone">Paiement par carte ou en espèces.</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Carte imprimée dans un cadre ornemental, comme le logo */}
          <div className="ornate-frame p-7 sm:p-11 lg:col-span-8">
            <p className="font-display text-center text-sm font-medium tracking-[0.3em] text-ink/70 uppercase">
              Les Experts · Pantin
            </p>
            <div className="mt-9 grid gap-10 sm:grid-cols-2 sm:gap-x-12">
              {menu.map((section) => (
                <div key={section.category} className="reveal">
                  <h3 className="font-display flex items-center gap-3 text-xl font-medium tracking-[0.15em] uppercase">
                    <span className="h-px w-6 shrink-0 bg-canard" aria-hidden />
                    {section.category}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{section.description}</p>
                  <ul className="mt-5 space-y-4">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-semibold sm:text-[15px]">{item.name}</span>
                          <span
                            className="mx-1 flex-1 border-b border-dotted border-ink/35"
                            aria-hidden
                          />
                          <span className="font-display shrink-0 text-lg font-medium whitespace-nowrap text-canard tabular-nums">
                            {item.price}
                          </span>
                        </div>
                        <span className="text-xs text-stone">{item.duration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Encart bleu canard */}
          <div className="flex items-center lg:col-span-4">
            <div className="reveal w-full bg-canard p-8 text-ivory sm:p-10">
              <h3 className="font-display text-3xl leading-tight font-bold uppercase">
                Vous hésitez sur la prestation ?
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ivory/85 sm:text-base">
                Réservez une coupe classique et précisez votre besoin une fois sur
                place. L’équipe s’adapte.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cream mt-7 w-full"
              >
                Choisir un créneau
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
```

- [ ] **Step 2 : Supprimer l'ancienne section Tarifs**

```bash
git rm src/components/sections/Pricing.tsx
```

- [ ] **Step 3 : Remplacer `src/app/page.tsx`**

```tsx
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Gallery from "@/components/sections/Gallery";
import Team from "@/components/sections/Team";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import StickyBooking from "@/components/ui/StickyBooking";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Team />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <StickyBooking />
    </div>
  );
}
```

- [ ] **Step 4 : Mettre à jour la navigation dans `src/lib/site.ts`**

Remplacer le bloc `export const navigation = [ ... ];` par :

```ts
export type NavItem = { name: string; href: string };

export const navigation: NavItem[] = [
  { name: "Accueil", href: "/" },
  { name: "La carte", href: "#carte" },
  { name: "Le salon", href: "#salon" },
  { name: "L’équipe", href: "#equipe" },
  { name: "Contact", href: "#contact" },
];
```

- [ ] **Step 5 : Retirer `.btn-ink` de `src/app/globals.css`**

Ce n'est plus utilisé nulle part :
- Supprimer `.btn-ink` dans le sélecteur de base (`.btn-primary, .btn-cream, .btn-ghost-dark, .btn-ghost-light, .btn-ink {`), avec sa virgule.
- Supprimer `.btn-ink:focus-visible` dans le sélecteur de focus, avec sa virgule.
- Supprimer le bloc commenté `/* Utilisé uniquement par Pricing.tsx, supprimé à la tâche 4 */` et sa règle `.btn-ink { ... }`.

- [ ] **Step 6 : Vérifier**

```bash
pnpm lint && pnpm build
grep -rn "btn-ink\|Pricing\|#tarifs\|#services" src || echo "aucune référence restante"
grep -c 'id="carte"' .next/server/app/index.html
```

Attendu : build OK, `aucune référence restante`, et `1`.

- [ ] **Step 7 : Commit**

```bash
git add -A src
git commit -m "feat: la carte, fusion des services et des tarifs dans un cadre ornemental" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5 : Le salon (fusion À propos + photos du salon)

**Files :**
- Modify: `src/components/sections/About.tsx` (réécriture complète)
- Modify: `src/app/page.tsx` (retrait de l'ancienne `Gallery` des photos du salon)

**Interfaces :**
- Produit : la section `id="salon"` sur fond `canard`.
- Après cette tâche, `src/components/sections/Gallery.tsx` (ancienne galerie du salon) n'est plus importé. Il est réécrit à la tâche 6.

- [ ] **Step 1 : Remplacer `src/components/sections/About.tsx`**

```tsx
import Image from "next/image";

const stats = [
  { value: "2010", label: "ouverture du salon" },
  { value: "5000+", label: "clients accueillis" },
  { value: "30 min", label: "en moyenne par coupe" },
  { value: "4,9/5", label: "sur Google" },
];

const photos = [
  {
    src: "/salon1.webp",
    alt: "Vue d’ensemble du salon : fauteuils de barbier vintage noir et blanc, mur bleu canard et carreaux de ciment",
    wide: true,
  },
  {
    src: "/salon3.webp",
    alt: "La moto noire garée dans le salon, sous la guitare et les vinyles du mur vert",
  },
  {
    src: "/salon4.webp",
    alt: "Le coin attente : canapé chesterfield en cuir, violon et horloge murale",
  },
  {
    src: "/salon2.webp",
    alt: "L’enfilade des postes de coiffage, miroirs et fauteuils alignés",
  },
];

// Fond bleu canard : on entre dans la grande salle
const About = () => {
  return (
    <section
      id="salon"
      className="scroll-mt-20 bg-canard py-20 text-ivory sm:py-28"
      aria-labelledby="salon-heading"
    >
      <div className="shell-wide grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow mb-4 text-ivory">Depuis 2010</p>
          <h2
            id="salon-heading"
            className="font-display text-4xl leading-[1.05] font-bold uppercase sm:text-5xl"
          >
            Un salon de quartier, construit autour de la confiance.
          </h2>

          <p className="mt-6 leading-relaxed text-ivory/85">
            Depuis 2010, The Experts Barber Shop accueille ses clients au 101 avenue
            Jean-Lolive, à Pantin. Six fauteuils, une déco inspirée des motos
            vintage, une ambiance musicale qui donne le ton — et des barbiers qui
            prennent le temps de comprendre ce que vous voulez avant de sortir la
            tondeuse.
          </p>
          <p className="mt-4 leading-relaxed text-ivory/85">
            Ici, chaque coupe est adaptée au style, au visage et aux habitudes de la
            personne installée dans le fauteuil.
          </p>

          <blockquote className="mt-10 border-l-2 border-ivory/60 pl-6">
            <p className="font-display text-2xl leading-snug">
              « Chaque client doit pouvoir se sentir à l’aise avant même de s’asseoir
              dans le fauteuil. »
            </p>
            <footer className="mt-3 text-sm text-ivory/85">L’équipe du salon</footer>
          </blockquote>

          {/* dt avant dd pour les lecteurs d'écran, chiffre affiché au-dessus */}
          <dl className="mt-12 grid grid-cols-2 gap-y-8 sm:grid-cols-4 lg:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse border-l border-ivory/25 pl-4">
                <dt className="mt-1 text-xs tracking-wide text-ivory/85 uppercase">{stat.label}</dt>
                <dd className="font-display text-3xl font-medium text-chrome">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Collage : la grande salle en large, trois détails dessous */}
        <div className="grid grid-cols-3 gap-3 lg:col-span-7">
          {photos.map((photo) => (
            <figure
              key={photo.src}
              className={`reveal-image relative overflow-hidden ${
                photo.wide ? "col-span-3 aspect-[5/3]" : "aspect-[4/5]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={photo.wide ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 18vw, 33vw"}
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
```

- [ ] **Step 2 : Retirer l'ancienne galerie de `src/app/page.tsx`**

Supprimer la ligne `import Gallery from "@/components/sections/Gallery";` et la ligne `<Gallery />`.

- [ ] **Step 3 : Vérifier**

```bash
pnpm lint && pnpm build
grep -c 'id="salon"' .next/server/app/index.html
grep -o 'salon[1-4]\.webp' .next/server/app/index.html | sort -u
```

Attendu : build OK, `1`, et les quatre `salon1.webp` à `salon4.webp`.

- [ ] **Step 4 : Commit**

```bash
git add src/components/sections/About.tsx src/app/page.tsx
git commit -m "feat: section le salon sur fond bleu canard avec collage photo" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6 : Galerie « Dans le fauteuil »

**Files :**
- Modify: `src/components/sections/Gallery.tsx` (réécriture complète)
- Modify: `src/app/page.tsx` (réécriture complète)
- Modify: `src/lib/site.ts` (entrée Galerie)
- Modify: `src/components/layout/Header.tsx` (navigation en prop)
- Modify: `src/components/layout/Footer.tsx` (navigation en prop)
- Modify: `README.md` (section Galerie)

**Interfaces :**
- Consomme : `getGalleryPhotos(): string[]` (tâche 2), `NavItem` et `navigation` (tâche 4).
- Produit : `Gallery({ photos }: { photos: string[] })`, `Header({ navigation }: { navigation: NavItem[] })`, `Footer({ navigation }: { navigation: NavItem[] })`.

- [ ] **Step 1 : Remplacer `src/components/sections/Gallery.tsx`**

```tsx
import Image from "next/image";

const VISIBLE_COUNT = 8;

const Photo = ({ src }: { src: string }) => (
  <li className="relative aspect-[4/5] overflow-hidden bg-ink/5">
    <Image
      src={src}
      alt="Coupe réalisée chez The Experts Barber Shop"
      fill
      sizes="(min-width: 1024px) 25vw, 50vw"
      className="object-cover"
    />
  </li>
);

// Photos déposées dans public/galerie/ (voir README) : 8 visibles, le reste derrière un <details> natif
const Gallery = ({ photos }: { photos: string[] }) => {
  const visible = photos.slice(0, VISIBLE_COUNT);
  const rest = photos.slice(VISIBLE_COUNT);

  return (
    <section
      id="galerie"
      className="scroll-mt-20 bg-cream py-20 text-ink sm:py-28"
      aria-labelledby="galerie-heading"
    >
      <div className="shell-wide">
        <div className="reveal mb-14 max-w-2xl">
          <p className="eyebrow mb-4 text-canard">Galerie</p>
          <h2
            id="galerie-heading"
            className="font-display text-4xl leading-[1.05] font-bold uppercase sm:text-5xl lg:text-6xl"
          >
            Dans le fauteuil
          </h2>
          <p className="mt-5 text-stone">Les dernières coupes et barbes réalisées au salon.</p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {visible.map((src) => (
            <Photo key={src} src={src} />
          ))}
        </ul>

        {rest.length > 0 && (
          <details className="group">
            <summary className="btn-ghost-light mx-auto mt-10 flex w-fit list-none [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">
                {rest.length === 1 ? "Voir 1 autre photo" : `Voir les ${rest.length} autres photos`}
              </span>
              <span className="hidden group-open:inline">Masquer les photos</span>
            </summary>
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {rest.map((src) => (
                <Photo key={src} src={src} />
              ))}
            </ul>
          </details>
        )}
      </div>
    </section>
  );
};

export default Gallery;
```

- [ ] **Step 2 : Ajouter l'entrée Galerie dans `src/lib/site.ts`**

Dans `navigation`, insérer entre `L’équipe` et `Contact` :

```ts
  { name: "Galerie", href: "#galerie" },
```

- [ ] **Step 3 : Passer la navigation en prop dans `src/components/layout/Header.tsx`**

Remplacer la ligne d'import de `@/lib/site` par :

```tsx
import { BOOKING_URL, PHONE_INTL, PHONE, type NavItem } from "@/lib/site";
```

Remplacer `const Header = () => {` par :

```tsx
const Header = ({ navigation }: { navigation: NavItem[] }) => {
```

- [ ] **Step 4 : Même chose dans `src/components/layout/Footer.tsx`**

Remplacer la ligne d'import de `@/lib/site` par :

```tsx
import { BOOKING_URL, PHONE_INTL, PHONE, type NavItem } from "@/lib/site";
```

Remplacer `const Footer = () => {` par :

```tsx
const Footer = ({ navigation }: { navigation: NavItem[] }) => {
```

- [ ] **Step 5 : Remplacer `src/app/page.tsx`**

```tsx
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import Gallery from "@/components/sections/Gallery";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import StickyBooking from "@/components/ui/StickyBooking";
import { getGalleryPhotos } from "@/lib/gallery";
import { navigation } from "@/lib/site";

export default function Home() {
  const photos = getGalleryPhotos();
  // Sans photo, ni section galerie ni lien « Galerie » dans les menus
  const nav = photos.length > 0 ? navigation : navigation.filter((item) => item.href !== "#galerie");

  return (
    <div className="min-h-screen">
      <Header navigation={nav} />
      <main>
        <Hero />
        <Services />
        <About />
        <Team />
        {photos.length > 0 && <Gallery photos={photos} />}
        <Reviews />
        <Contact />
      </main>
      <Footer navigation={nav} />
      <BackToTop />
      <StickyBooking />
    </div>
  );
}
```

- [ ] **Step 6 : Documenter la galerie dans `README.md`**

Dans `README.md`, insérer avant `## Design` :

```markdown
## Galerie des coupes

Déposer les photos dans `public/galerie/`, puis redéployer : elles apparaissent dans la section « Dans le fauteuil ».

- Nommer les fichiers `AAAA-MM-JJ-description.jpg` (ex. `2026-10-26-degrade-barbe.jpg`) : les plus récentes s'affichent en premier.
- Formats acceptés : jpg, png, webp, avif. Les photos HEIC d'iPhone doivent être converties en JPG. Le build liste les fichiers ignorés.
- Pas besoin de redimensionner : Next.js optimise les images.
- 8 photos visibles, le reste derrière « Voir les N autres photos ».
- Dossier vide ou absent : la section et le lien « Galerie » sont masqués.
- Droit à l'image : n'utiliser que des photos de personnes qui ont donné leur accord.

```

- [ ] **Step 7 : Vérifier sans photo (Review Focus 4)**

```bash
pnpm lint && pnpm build
grep -c 'id="galerie"\|href="#galerie"' .next/server/app/index.html
```

Attendu : `0`. Pas de section, pas de lien dans l'en-tête ni dans le pied de page.

- [ ] **Step 8 : Vérifier avec 8 puis 9 photos (Review Focus 3)**

```bash
mkdir -p public/galerie
for i in 1 2 3 4 5 6 7 8; do cp public/salon1.webp "public/galerie/2026-10-0$i-test.webp"; done
pnpm build >/dev/null && grep -c 'id="galerie"' .next/server/app/index.html && (grep -c '<summary' .next/server/app/index.html || true)
cp public/salon2.webp public/galerie/2026-10-09-test.webp
pnpm build >/dev/null && grep -o 'Voir 1 autre photo' .next/server/app/index.html
rm -r public/galerie
```

Attendu :
- Avec 8 photos : `1` (section présente), puis `0` (pas de `<summary>`).
- Avec 9 photos : `Voir 1 autre photo`.
- Le dossier de test est supprimé à la fin.

- [ ] **Step 9 : Rebuild propre et commit**

```bash
pnpm build >/dev/null && git status --short
git add src/components/sections/Gallery.tsx src/app/page.tsx src/lib/site.ts src/components/layout/Header.tsx src/components/layout/Footer.tsx README.md
git commit -m "feat: galerie des coupes alimentée par public/galerie" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Attendu : `git status --short` ne liste pas `public/galerie`.

---

### Task 7 : L'équipe en médaillons

**Files :**
- Modify: `src/components/sections/Team.tsx` (réécriture complète)

**Interfaces :**
- Consomme : `BOOKING_URL`, `.medallion`, `.btn-primary` et `.eyebrow`.

- [ ] **Step 1 : Remplacer `src/components/sections/Team.tsx`**

```tsx
import Image from "next/image";
import { BOOKING_URL } from "@/lib/site";

// Pour afficher un vrai portrait : déposer la photo dans /public
// (ex. /team-wael.jpg) puis renseigner `image` ci-dessous.
const teamMembers: {
  name: string;
  specialty: string;
  image?: string;
}[] = [
  { name: "Wael", specialty: "Coupes & dégradés précis" },
  { name: "Souhaib", specialty: "Rasage traditionnel & styling" },
  { name: "Hamza", specialty: "Coupes modernes & finitions" },
  { name: "Med Amine", specialty: "Conseil & transformations" },
];

const Team = () => {
  return (
    <section
      id="equipe"
      className="scroll-mt-20 bg-night py-20 sm:py-28"
      aria-labelledby="equipe-heading"
    >
      <div className="shell-wide">
        <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4 text-canard-light">L’équipe</p>
            <h2
              id="equipe-heading"
              className="font-display text-4xl leading-[1.05] font-bold uppercase sm:text-5xl lg:text-6xl"
            >
              Quatre barbiers,
              <br />
              quatre styles.
            </h2>
            <p className="mt-5 max-w-lg text-smoke">
              Chacun a sa spécialité. Tous ont la même exigence sur le geste et la
              finition.
            </p>
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Choisir son barbier sur Planity
            <span aria-hidden>→</span>
          </a>
        </div>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <li key={member.name} className="reveal">
              {/* Médaillon en arche, comme les cadres anciens */}
              <div className="medallion aspect-[3/4]">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={`${member.name}, barbier chez The Experts Barber Shop`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-canard-deep to-coal"
                    aria-hidden
                  >
                    <span className="font-display text-7xl font-bold text-ivory/20 select-none sm:text-8xl">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-display mt-5 text-2xl font-medium tracking-wide uppercase">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-smoke">{member.specialty}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Team;
```

- [ ] **Step 2 : Vérifier**

```bash
pnpm lint && pnpm build
grep -c 'Portrait à venir\|Réserver avec' .next/server/app/index.html || true
grep -c 'class="medallion' .next/server/app/index.html
```

Attendu : build OK, puis `0`, puis `4`.

- [ ] **Step 3 : Commit**

```bash
git add src/components/sections/Team.tsx
git commit -m "feat: équipe en médaillons, un seul bouton Planity" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8 : Avis

**Files :**
- Modify: `src/components/sections/Reviews.tsx` (réécriture complète)

- [ ] **Step 1 : Remplacer `src/components/sections/Reviews.tsx`**

```tsx
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=The+Experts+Barber+Shop+101+Av.+Jean+Lolive+93500+Pantin";

// Uniquement de vrais avis Google : copier le texte exact et le prénom depuis la fiche du salon.
// Tableau vide = seule la note s'affiche. Publier de faux avis est une pratique commerciale trompeuse.
const reviews: { text: string; author: string }[] = [];

// Fond bleu canard : note en crème (le chrome est réservé aux fonds noirs)
const Reviews = () => {
  return (
    <section
      id="avis"
      className="scroll-mt-20 bg-canard py-20 text-ivory sm:py-28"
      aria-labelledby="avis-heading"
    >
      <div className="shell-wide">
        <div className="reveal flex flex-wrap items-end justify-between gap-10">
          <div>
            <p className="eyebrow mb-4 text-ivory">Ils en parlent mieux que nous</p>
            <h2 id="avis-heading" className="font-display flex items-baseline gap-2">
              <span className="text-8xl leading-none font-bold sm:text-9xl">4,9</span>
              <span className="text-3xl font-medium text-ivory/85">/5</span>
              <span className="sr-only">sur Google</span>
            </h2>
            <p className="mt-4 text-xl tracking-[0.3em] text-ivory" aria-hidden>
              ★★★★★
            </p>
            <p className="mt-2 text-sm text-ivory/85">Plus de 150 avis Google</p>
          </div>

          <div className="max-w-sm">
            <p className="leading-relaxed text-ivory/85">
              Coupe, accueil, ambiance : les clients du salon le disent mieux que nous,
              directement sur Google.
            </p>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cream mt-6"
            >
              Lire les avis sur Google
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {reviews.length > 0 && (
          <ul className="mt-14 grid gap-10 border-t border-ivory/20 pt-14 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <li key={review.author} className="reveal">
                <blockquote>
                  <p className="font-display text-2xl leading-snug">« {review.text} »</p>
                  <footer className="mt-3 text-sm text-ivory/85">{review.author}, avis Google</footer>
                </blockquote>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Reviews;
```

- [ ] **Step 2 : Vérifier**

```bash
pnpm lint && pnpm build
grep -c 'Avis Google vérifié\|Toujours reçu avec le sourire' .next/server/app/index.html || true
grep -c 'id="avis"' .next/server/app/index.html
```

Attendu : build OK, puis `0` (faux avis retirés), puis `1`.

- [ ] **Step 3 : Commit**

```bash
git add src/components/sections/Reviews.tsx
git commit -m "feat: section avis sur bleu canard, faux avis retirés" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9 : Contact et carte chargée au clic

**Files :**
- Create: `src/components/ui/MapEmbed.tsx`
- Modify: `src/components/sections/Contact.tsx` (réécriture complète)

**Interfaces :**
- Produit : `MapEmbed()`, un composant client sans props. Il affiche un bouton, puis l'iframe Google Maps une fois cliqué.

- [ ] **Step 1 : Créer `src/components/ui/MapEmbed.tsx`**

```tsx
"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

const MAP_SRC =
  "https://maps.google.com/maps?q=101+Av.+Jean+Lolive,+93500+Pantin&z=16&output=embed";

// La carte Google dépose des cookies : elle ne se charge qu'après un clic (CNIL)
const MapEmbed = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    return (
      <iframe
        src={MAP_SRC}
        className="h-[420px] w-full lg:h-full lg:min-h-[520px]"
        style={{ border: 0 }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        title="Plan d’accès — The Experts Barber Shop, 101 avenue Jean-Lolive, 93500 Pantin"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsLoaded(true)}
      className="flex h-[420px] w-full cursor-pointer flex-col items-center justify-center gap-3 bg-coal px-6 text-center text-ivory transition-colors hover:bg-black focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-canard-light lg:h-full lg:min-h-[520px]"
    >
      <MapPin className="h-8 w-8 text-canard-light" aria-hidden />
      <span className="font-display text-lg tracking-wide uppercase">Afficher la carte</span>
      <span className="max-w-xs text-sm text-smoke">
        Carte fournie par Google, qui peut déposer des cookies.
      </span>
    </button>
  );
};

export default MapEmbed;
```

- [ ] **Step 2 : Remplacer `src/components/sections/Contact.tsx`**

```tsx
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import MapEmbed from "@/components/ui/MapEmbed";
import { BOOKING_URL, PHONE_INTL, PHONE } from "@/lib/site";

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=101+Av.+Jean+Lolive,+93500+Pantin";

const details = [
  {
    icon: Clock,
    title: "Horaires",
    lines: ["Ouvert tous les jours", "9h30 – 20h00"],
  },
  {
    icon: Phone,
    title: "Téléphone",
    lines: [PHONE],
  },
  {
    icon: MapPin,
    title: "Accès",
    lines: ["Métro ligne 5 · station Hoche", "Bus 249 · arrêt Jean Lolive"],
  },
];

const Contact = () => {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-night py-20 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="shell-wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Infos et conversion — 40 % */}
          <div className="reveal lg:col-span-5">
            <p className="eyebrow mb-4 text-canard-light">Contact</p>
            <h2
              id="contact-heading"
              className="font-display text-4xl leading-[1.08] font-bold uppercase sm:text-5xl"
            >
              Votre prochain créneau commence ici.
            </h2>

            <address className="mt-6 text-lg text-ivory not-italic">
              101 avenue Jean-Lolive, 93500 Pantin
              <span className="mt-1 block text-sm text-smoke">
                À quelques minutes du métro Hoche, aux portes de Paris.
              </span>
            </address>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Réserver maintenant
                <span aria-hidden>→</span>
              </a>
              <a href={`tel:${PHONE_INTL}`} className="btn-ghost-dark">
                <Phone className="h-4 w-4" aria-hidden />
                Appeler le salon
              </a>
            </div>

            <dl className="mt-12 space-y-6 border-t border-line-dark pt-8">
              {details.map((detail) => (
                <div key={detail.title} className="flex gap-4">
                  <detail.icon className="mt-1 h-5 w-5 shrink-0 text-canard-light" aria-hidden />
                  <div>
                    <dt className="text-sm font-bold tracking-wide text-ivory uppercase">
                      {detail.title}
                    </dt>
                    {detail.lines.map((line) => (
                      <dd key={line} className="text-sm leading-relaxed text-smoke">
                        {line}
                      </dd>
                    ))}
                  </div>
                </div>
              ))}
            </dl>

            {/* Actions rapides mobile */}
            <div className="mt-10 grid grid-cols-3 gap-3 sm:hidden">
              <a href={`tel:${PHONE_INTL}`} className="btn-ghost-dark flex-col gap-1 py-3 text-xs">
                <Phone className="h-4 w-4" aria-hidden />
                Appeler
              </a>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-dark flex-col gap-1 py-3 text-xs"
              >
                <Navigation className="h-4 w-4" aria-hidden />
                Itinéraire
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-col gap-1 py-3 text-xs"
              >
                <Clock className="h-4 w-4" aria-hidden />
                Réserver
              </a>
            </div>
          </div>

          {/* Carte — 60 %, chargée au clic */}
          <div className="reveal overflow-hidden rounded-sm border border-line-dark lg:col-span-7">
            <MapEmbed />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
```

- [ ] **Step 3 : Vérifier qu'aucune requête Google ne part au chargement**

```bash
pnpm lint && pnpm build
grep -c 'maps.google.com/maps?q=' .next/server/app/index.html || true
grep -o 'Afficher la carte' .next/server/app/index.html
```

Attendu : build OK. Le premier compteur vaut `0` : l'URL de l'iframe n'est pas dans le HTML, elle n'existe que dans le JS chargé au clic. Puis `Afficher la carte`.

- [ ] **Step 4 : Commit**

```bash
git add src/components/ui/MapEmbed.tsx src/components/sections/Contact.tsx
git commit -m "feat: contact, carte Google chargée au clic (pas de cookies sans action)" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10 : En-tête et menu mobile en CSS

**Files :**
- Modify: `src/components/layout/Header.tsx` (réécriture complète)

**Interfaces :**
- Consomme : `NavItem`, `BOOKING_URL`, `PHONE`, `PHONE_INTL` (`@/lib/site`), prop `navigation` (tâche 6).

- [ ] **Step 1 : Remplacer `src/components/layout/Header.tsx`**

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { BOOKING_URL, PHONE_INTL, PHONE, type NavItem } from "@/lib/site";

const Header = ({ navigation }: { navigation: NavItem[] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Échap ferme le menu mobile
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-500 ${
        isScrolled || isMenuOpen
          ? "border-b border-line-dark bg-coal/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell-wide">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo : affiché petit, la source fait 150 px */}
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="The Experts Barber Shop — Accueil">
            <Image
              src="/LOGO.jpg"
              alt="The Experts Barber Shop"
              width={56}
              height={56}
              className="rounded-full object-contain"
              priority
            />
            <span className="font-display hidden text-lg font-medium tracking-widest uppercase sm:block lg:hidden xl:block">
              The Experts
            </span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative text-sm font-semibold text-ivory/90 transition-colors duration-200 hover:text-ivory"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-canard-light transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions à droite */}
          <div className="flex items-center gap-4">
            <a
              href={`tel:${PHONE_INTL}`}
              className="hidden items-center gap-2 text-sm font-semibold text-ivory/80 transition-colors hover:text-ivory md:flex"
            >
              <Phone className="h-4 w-4 text-canard-light" aria-hidden />
              {PHONE}
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden min-h-11 sm:inline-flex"
            >
              Réserver un créneau
            </a>

            {/* Bouton menu mobile */}
            <button
              className="-mr-2 flex h-11 w-11 items-center justify-center text-ivory lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="menu-mobile"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile : se déplie en CSS (grille 0fr → 1fr).
          inert quand il est fermé : ses liens sortent du parcours clavier. */}
      <div
        id="menu-mobile"
        inert={!isMenuOpen}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="shell flex flex-col border-t border-line-dark py-4" aria-label="Navigation mobile">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-display block border-b border-line-dark py-3.5 text-lg tracking-wide text-ivory uppercase transition-colors hover:text-canard-light"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-5 pb-2">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Réserver un créneau
              </a>
              <a href={`tel:${PHONE_INTL}`} className="btn-ghost-dark px-4" aria-label="Appeler le salon">
                <Phone className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
```

Note : `hidden sm:inline-flex` sur le bouton Réserver remplace l'ancien `<div className="hidden sm:block">` qui l'enveloppait. Comme les boutons sont dans `@layer components`, les utilitaires `hidden` et `min-h-11` s'appliquent sans `!`.

- [ ] **Step 2 : Vérifier**

```bash
pnpm lint && pnpm build
grep -o 'id="menu-mobile"[^>]*inert[^>]*\|inert=""[^>]*id="menu-mobile"' .next/server/app/index.html | head -1
grep -c 'framer-motion' src/components/layout/Header.tsx || true
```

Attendu :
- Build OK.
- La balise `menu-mobile` porte l'attribut `inert` (menu fermé au rendu serveur).
- Le compteur `framer-motion` vaut `0`.

- [ ] **Step 3 : Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: en-tête bleu canard, menu mobile en CSS avec inert et Échap" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11 : Pied de page

**Files :**
- Modify: `src/components/layout/Footer.tsx` (réécriture complète)

**Interfaces :**
- Consomme : `NavItem`, `BOOKING_URL`, `PHONE`, `PHONE_INTL`, `.tiles`, `.ribbon`, `.ribbon-chrome`, `.btn-primary`.

- [ ] **Step 1 : Remplacer `src/components/layout/Footer.tsx`**

```tsx
import Link from "next/link";
import Image from "next/image";
import { BOOKING_URL, PHONE_INTL, PHONE, type NavItem } from "@/lib/site";

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
                  <Link
                    href={item.href}
                    className="text-sm text-ivory/85 transition-colors hover:text-canard-light"
                  >
                    {item.name}
                  </Link>
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
              <p>Tous les jours · 9h30 – 20h</p>
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
        <div className="border-t border-line-dark py-6">
          <p className="text-xs text-smoke">
            © {currentYear} The Experts Barber Shop — Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 2 : Vérifier**

```bash
pnpm lint && pnpm build
grep -c 'class="tiles"' .next/server/app/index.html
grep -o 'class="ribbon ribbon-chrome[^"]*"' .next/server/app/index.html
```

Attendu : build OK, `2` (sous le hero et en haut du pied de page), puis la classe du ruban chrome.

- [ ] **Step 3 : Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: pied de page avec carreaux de ciment et ruban chrome du téléphone" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 12 : Retrait de framer-motion, nettoyage et vérification finale

**Files :**
- Modify: `src/components/ui/StickyBooking.tsx` (réécriture complète)
- Modify: `src/components/ui/BackToTop.tsx` (réécriture complète)
- Modify: `src/app/layout.tsx` (retrait de `MotionProvider`)
- Delete: `src/components/MotionProvider.tsx`
- Modify: `package.json`, `pnpm-lock.yaml` (retrait de framer-motion)
- Modify: `src/app/globals.css` (retrait des anciens tokens)
- Modify: `README.md`

- [ ] **Step 1 : Remplacer `src/components/ui/StickyBooking.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { BOOKING_URL, PHONE_INTL, PHONE } from "@/lib/site";

// Barre de réservation mobile : apparaît une fois le hero dépassé.
// inert quand elle est masquée : ses liens sortent du parcours clavier.
const StickyBooking = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      inert={!isVisible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-coal/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transition-none lg:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-3">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex-1"
        >
          Réserver un créneau
        </a>
        <a
          href={`tel:${PHONE_INTL}`}
          className="btn-ghost-dark px-4"
          aria-label={`Appeler le salon au ${PHONE}`}
        >
          <Phone className="h-5 w-5" aria-hidden />
        </a>
      </div>
    </div>
  );
};

export default StickyBooking;
```

- [ ] **Step 2 : Remplacer `src/components/ui/BackToTop.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      inert={!isVisible}
      onClick={scrollToTop}
      aria-label="Retour en haut de la page"
      className={`fixed right-6 bottom-6 z-40 hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-canard text-ivory transition-[opacity,translate,background-color] duration-200 hover:bg-canard-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canard-light motion-reduce:transition-none lg:flex ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

export default BackToTop;
```

- [ ] **Step 3 : Retirer `MotionProvider` de `src/app/layout.tsx`**

Supprimer la ligne `import MotionProvider from "@/components/MotionProvider";`, puis remplacer :

```tsx
        <MotionProvider>{children}</MotionProvider>
```

par :

```tsx
        {children}
```

- [ ] **Step 4 : Supprimer le fichier et la dépendance**

```bash
git rm src/components/MotionProvider.tsx
pnpm remove framer-motion
grep -rn "framer-motion" src package.json || echo "framer-motion absent"
```

Attendu : `framer-motion absent`. S'il reste une occurrence, c'est l'ancien `Gallery.tsx` qui n'aurait pas été réécrit : revoir la tâche 6.

- [ ] **Step 5 : Retirer les anciennes couleurs de `src/app/globals.css`**

Supprimer dans `:root` le commentaire `/* Anciennes couleurs : ... */` et les quatre lignes `--primary-orange`, `--primary-orange-hover`, `--primary-orange-deep` et `--wood-brown`.

Supprimer dans `@theme inline` le commentaire `/* Anciennes couleurs (tâche 12) */` et les quatre lignes `--color-brand`, `--color-brand-hover`, `--color-brand-deep` et `--color-wood`.

```bash
grep -rn "brand\|wood\|primary-orange" src || echo "anciennes couleurs absentes"
```

Attendu : `anciennes couleurs absentes`.

- [ ] **Step 6 : Mettre à jour `README.md`**

Dans `## Stack`, remplacer la ligne `- Framer Motion (animations au scroll), Lucide (icônes)` par :

```markdown
- Animations en CSS uniquement (entrée du hero, apparition au scroll via `animation-timeline`), Lucide (icônes)
```

Dans `## Démarrage`, ajouter après `pnpm lint` :

```bash
pnpm test     # test de la galerie
```

Dans le tableau `## Où modifier quoi`, remplacer les lignes `Tarifs` et `Services` par :

```markdown
| Prestations et tarifs (« La carte ») | `src/components/sections/Services.tsx` |
| Photos de la galerie | `public/galerie/` (voir « Galerie des coupes ») |
```

Remplacer tout le contenu de la section `## Design` par :

```markdown
## Design

Identité tirée du logo (noir et crème, police Clarendon/Besley, rubans, cadre ornemental) et du salon (mur bleu canard, fauteuils chrome, carreaux de ciment).

- Couleurs : noir `#11100f`, crème `#f3ede1`, bleu canard `#176579`, chrome `#c9cdd1`.
- Sur fond noir, le texte d'accent est en `canard-light` (`#7fc4d4`) ou en `chrome`, jamais en `canard` (contraste insuffisant).
- Sur fond bleu canard : bouton `.btn-cream` et texte secondaire `ivory/85` minimum.
- Ornements dans `src/app/globals.css` : `.ribbon` (+ `.ribbon-chrome`), `.ornate-frame`, `.tiles`, `.medallion`, `.reveal`.
```

- [ ] **Step 7 : Vérification finale complète (Review Focus 5)**

```bash
pnpm test && pnpm lint && pnpm build
grep -c 'opacity:0' .next/server/app/index.html || true
grep -qF 'animation-timeline:view()' .next/static/chunks/*.css && echo "ok reveal sous @supports"
grep -o 'inert=""' .next/server/app/index.html | wc -l
```

Attendu :
- Tests 5/5, lint et build OK.
- `0` : aucun contenu caché en style inline.
- `ok reveal sous @supports` : `.reveal` n'existe que dans le bloc `@supports`, déjà vérifié à la tâche 1.
- `inert` au moins `3` (menu mobile, barre de réservation, bouton retour en haut, au rendu serveur).

- [ ] **Step 8 : Revue visuelle par le développeur**

Run : `pnpm dev`, puis ouvrir http://localhost:3000 :
- En largeur 375 px : menu mobile (ouverture, fermeture, Échap), barre « Réserver » après le hero, ruban et carreaux visibles.
- En 1440 px : alternance des fonds sans photo dans la galerie, soit noir (chiffres), crème (carte), bleu canard (salon), noir (équipe), bleu canard (avis), noir (contact). Cadre ornemental de la carte avec ses losanges. Médaillons. « Afficher la carte » charge Google Maps.
- Pour voir la galerie : copier 2 ou 3 photos dans `public/galerie/`, recharger, puis supprimer le dossier.
- Avec « réduire les animations » activé dans le système : aucune animation.

- [ ] **Step 9 : Commit**

```bash
git add -A
git status --short
git commit -m "refactor: retrait de framer-motion, animations et transitions en CSS" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Attendu avant le commit : `git status --short` ne montre que les fichiers de cette tâche.
