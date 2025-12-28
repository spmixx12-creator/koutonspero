# Instructions pour voir les modifications

## Étapes à suivre :

1. **Ouvrir un terminal** dans votre dossier Portfolio_Designer
2. **Lancer le serveur de développement** avec :
   ```bash
   npm run dev
   ```
3. **Ouvrir votre navigateur** sur l'adresse indiquée (généralement http://localhost:3000)

## Modifications apportées :

### 1. Fichier créé : `src/utils/colorExtractor.js`
- Utilitaire pour extraire la couleur dominante des images
- Crée des dégradés personnalisés basés sur la couleur extraite
- Inclut un système de cache pour optimiser les performances

### 2. Fichier modifié : `src/components/Projects.jsx`
- Import de l'utilitaire d'extraction de couleur
- Ajout d'états pour stocker la couleur dominante et le dégradé
- Modification du fond arrière des cartes pour utiliser le dégradé
- Amélioration de l'opacité de la face avant pour éviter la transparence

## Résultat attendu :
- Les cartes de projets auront un fond arrière uniforme avec la couleur dominante de chaque image
- Les informations de la face avant ne seront plus visibles à travers
- Effet de rotation 3D préservé

## Si le serveur ne démarre pas :
1. Vérifiez que Node.js est installé
2. Exécutez `npm install` pour installer les dépendances
3. Essayez `npm run dev` à nouveau

## Test rapide :
Allez dans la section "Projets" et cliquez sur une carte pour la faire tourner. Vous devriez voir le fond arrière avec une couleur inspirée de l'image.
