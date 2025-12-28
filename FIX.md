# Correction des erreurs - Page Projets

## Problème identifié :
- Boucle infinie dans le useEffect à cause de la dépendance `onToggleFlip`
- Cette dépendance créait des re-rendus infinis

## Correction appliquée :
- Suppression de `onToggleFlip` des dépendances du useEffect
- Simplification de la détection de focus
- Maintien des fonctionnalités principales

## Pour tester :
1. Redémarrez le serveur : `npm run dev`
2. Allez dans la section Projets
3. La page devrait maintenant s'afficher correctement

## Fonctionnalités préservées :
- Effet 3D wheel
- Extraction des couleurs dominantes
- Rotation des cartes focus
- Synchronisation scroll

Si la page ne s'affiche toujours pas, vérifiez la console du navigateur pour d'éventuelles erreurs JavaScript.
