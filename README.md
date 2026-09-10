# FC 4R 70 — Compositions

Site statique (HTML/CSS/JS), aucune dépendance serveur. Les données (effectif, compositions) sont stockées uniquement dans le navigateur de l'utilisateur (localStorage).

## Mettre en ligne sur GitHub Pages

1. Crée un nouveau dépôt GitHub (ex. `fc4r-compo`).
2. Ajoute tous les fichiers de ce dossier **à la racine** du dépôt (`index.html` doit être à la racine, pas dans un sous-dossier) :
   - `index.html`
   - `styles.css`
   - `app.js`
   - `manifest.json`
   - `assets/` (logo, favicon, icônes)
3. Dans le dépôt GitHub : **Settings → Pages → Source : Deploy from a branch**, choisis la branche `main` et le dossier `/ (root)`.
4. Le site sera disponible sous quelques minutes à `https://<ton-pseudo-github>.github.io/<nom-du-depot>/`.

## Icônes générées

- `assets/favicon.ico` — icône d'onglet navigateur
- `assets/icon-192.png` / `assets/icon-512.png` — icône si le site est ajouté à l'écran d'accueil (Android/PWA)
- `assets/apple-touch-icon.png` — icône si ajouté à l'écran d'accueil iOS

## Mise à jour du logo

Si tu changes le logo plus tard, remplace `assets/logo.png` puis régénère les icônes (favicon, apple-touch-icon, icon-192/512) à la même taille/format à partir du nouveau fichier.
