# The Experts Barber Shop

Site vitrine moderne et responsive pour un salon de coiffure masculine professionnel.

## 🚀 Technologies utilisées

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique pour JavaScript
- **Tailwind CSS v4** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides
- **GSAP** - Animations avancées
- **Lucide React** - Icônes modernes

## 🏗️ Structure du projet

```
src/
├── app/                    # App Router Next.js
│   ├── globals.css        # Styles globaux et thème
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── components/            # Composants réutilisables
│   ├── layout/           # Composants de layout
│   │   ├── Header.tsx    # Navigation principale
│   │   └── Footer.tsx    # Pied de page
│   ├── sections/         # Sections de contenu
│   │   ├── Hero.tsx      # Section héro
│   │   ├── Services.tsx  # Section services
│   │   ├── About.tsx     # Section à propos
│   │   └── Contact.tsx   # Section contact
│   └── ui/               # Composants UI de base
│       ├── Button.tsx     # Bouton réutilisable
│       ├── Card.tsx      # Carte de contenu
│       └── Section.tsx    # Wrapper de section
└── lib/                  # Utilitaires
    └── utils.ts          # Fonctions utilitaires
```

## 🎨 Design System

### Couleurs
- **Primaire** : Amber 600 (#d97706) - Couleur principale du barbershop
- **Secondaire** : Gray 50 (#f9fafb) - Arrière-plans subtils
- **Accent** : Amber 100 (#fef3c7) - Éléments d'accentuation

### Typographie
- **Police principale** : Geist Sans (Google Fonts)
- **Police mono** : Geist Mono (Google Fonts)

## 🚀 Démarrage rapide

1. **Installation des dépendances**
   ```bash
   npm install
   ```

2. **Lancement du serveur de développement**
   ```bash
   npm run dev
   ```

3. **Ouverture dans le navigateur**
   Ouvrez [http://localhost:3000](http://localhost:3000) pour voir le site.

## 📱 Fonctionnalités

- ✅ **Design responsive** - Optimisé pour mobile, tablette et desktop
- ✅ **Animations fluides** - Framer Motion pour des transitions élégantes
- ✅ **Navigation moderne** - Header fixe avec menu mobile
- ✅ **Sections modulaires** - Hero, Services, About, Contact
- ✅ **SEO optimisé** - Métadonnées complètes et structure sémantique
- ✅ **Accessibilité** - Navigation au clavier et lecteurs d'écran
- ✅ **Performance** - Optimisations Next.js et images

## 🛠️ Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Vérification du code
```

## 🎯 Personnalisation

### Modifier les couleurs
Éditez `src/app/globals.css` pour personnaliser le thème :

```css
:root {
  --primary: #d97706;        /* Couleur principale */
  --primary-foreground: #ffffff;
  /* ... autres variables */
}
```

### Ajouter de nouvelles sections
1. Créez un nouveau composant dans `src/components/sections/`
2. Importez-le dans `src/app/page.tsx`
3. Ajoutez-le à la structure de la page

### Modifier le contenu
- **Services** : Éditez `src/components/sections/Services.tsx`
- **Informations de contact** : Éditez `src/components/sections/Contact.tsx`
- **Métadonnées** : Éditez `src/app/layout.tsx`

## 📦 Déploiement

Le projet est prêt pour le déploiement sur :
- **Vercel** (recommandé pour Next.js)
- **Netlify**
- **AWS Amplify**
- **Tout hébergeur supportant Node.js**

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
