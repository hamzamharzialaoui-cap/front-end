# EnergyBot - Page d'Accueil Commerciale

Une page d'accueil moderne et professionnelle pour présenter votre service de chatbot IA spécialisé dans l'énergie.

## 🚀 Fonctionnalités

### Page d'Accueil Commerciale (`index.html`)
- **Hero Section** - Présentation claire du service avec appels à l'action
- **Section Fonctionnalités** - 6 cartes détaillant les avantages du bot
- **Guide d'Intégration** - Instructions visuelles en 3 étapes avec exemple de code
- **Tarification** - 3 plans tarifaires (Starter, Professional, Enterprise)
- **Formulaire de Contact** - Demande de démo et contact commercial
- **Design Responsive** - Optimisé pour mobile, tablette et desktop

### Améliorations JavaScript (`script.js`)
- **Navigation fluide** - Défilement smooth entre les sections
- **Gestion du formulaire** - Validation et simulation d'envoi
- **Animations au scroll** - Apparition progressive des éléments
- **Copie de code** - Bouton pour copier le code d'intégration
- **Notifications** - Système de notifications pour les actions utilisateur
- **Header dynamique** - Effet de transparence et masquage au scroll

## 📁 Structure des Fichiers

```
bot-front/
├── index.html              # Page d'accueil commerciale (NOUVEAU)
├── script.js               # JavaScript pour l'interactivité (NOUVEAU)
├── demo.html               # Page de démonstration technique
├── chatbot-widget.js       # Widget chatbot intégrable
└── README.md               # Documentation technique du widget
```

## 🎨 Design & UX

### Palette de Couleurs
- **Primaire** : Dégradé violet-bleu (#667eea → #764ba2)
- **Secondaire** : Blanc, gris clair (#f8fafc)
- **Texte** : Gris foncé (#1a1a1a, #6b7280)
- **Succès** : Vert (#10b981)
- **Erreur** : Rouge (#ef4444)

### Typographie
- **Police** : Inter (Google Fonts)
- **Hiérarchie** : Titres en gras, texte en regular
- **Tailles** : Responsive avec clamp() pour la fluidité

### Composants Réutilisables
- **Boutons CTA** : Dégradé avec effets hover
- **Cartes** : Ombre douce avec animation hover
- **Formulaires** : Champs avec backdrop-filter
- **Code blocks** : Style VS Code dark theme

## 🚀 Utilisation

### Développement Local
```bash
# Servir les fichiers via HTTP
cd bot-front
python -m http.server 8000
# ou
npx http-server -p 8000
```

Puis ouvrir : `http://localhost:8000/index.html`

### Déploiement
1. **Héberger les fichiers** sur votre serveur web ou CDN
2. **Configurer le domaine** dans le script d'intégration
3. **Tester** sur différents appareils et navigateurs

## 📱 Responsive Design

### Breakpoints
- **Mobile** : < 768px
- **Tablette** : 768px - 1024px  
- **Desktop** : > 1024px

### Adaptations Mobile
- Navigation simplifiée
- Grille en une colonne
- Boutons empilés verticalement
- Texte et espacements réduits

## 🔧 Personnalisation

### Couleurs
Modifiez les variables CSS dans `index.html` :
```css
/* Couleur primaire */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Couleurs secondaires */
background: #f8fafc; /* Gris clair */
color: #1a1a1a;      /* Texte principal */
```

### Contenu
- **Textes** : Modifiez directement dans le HTML
- **Images** : Remplacez les icônes SVG par vos propres assets
- **Sections** : Ajoutez/supprimez des sections selon vos besoins

### Intégration
Personnalisez le code d'intégration dans la section correspondante :
```html
<script src="https://votre-cdn.com/widget.js" 
        data-domain="votre-domaine.com"></script>
```

## 📊 Analytics & Tracking

Le JavaScript inclut des hooks pour ajouter facilement :
- **Google Analytics** - Tracking des événements
- **Hotjar** - Heatmaps et enregistrements
- **Pixel Facebook** - Conversion tracking

## 🔒 Sécurité

- **Validation côté client** pour les formulaires
- **Échappement HTML** pour éviter les injections
- **HTTPS requis** pour la production
- **CSP headers** recommandés

## 📈 Performance

### Optimisations Incluses
- **CSS inline** pour éviter les requêtes supplémentaires
- **Fonts preload** pour Google Fonts
- **Images optimisées** (SVG pour les icônes)
- **JavaScript vanilla** (pas de dépendances)

### Métriques Cibles
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1
- **Time to Interactive** : < 3s

## 🌐 Compatibilité Navigateurs

- ✅ Chrome (dernière version)
- ✅ Firefox (dernière version)  
- ✅ Safari (dernière version)
- ✅ Edge (dernière version)
- ✅ Navigateurs mobiles (iOS/Android)

## 📞 Support

Pour toute question sur l'implémentation ou la personnalisation de la page d'accueil, consultez la documentation technique ou contactez l'équipe de développement.
