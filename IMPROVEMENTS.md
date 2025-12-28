# Améliorations du Composant Projects - Inspiration 3D Wheel

## Modifications apportées (inspirées du code de référence) :

### 1. **Effet 3D Amélioré**
- Profondeur accrue : `translateZ(-750px)` au lieu de `-500px`
- Flou plus dramatique : `blur(12px)` au lieu de `8px`
- Opacité plus extrême : `0.05` au lieu de `0.3`
- Échelle subtile : `scale(0.9)` pour les éléments hors focus
- Z-index dynamique basé sur la distance

### 2. **Gestion du Focus Améliorée**
- Détection plus précise de l'élément centré
- Classes CSS dynamiques : `is-focused` pour l'élément actif
- Effet de lueur pour l'élément focus :
  ```css
  shadow-[0_0_30px_rgba(255,255,255,0.15),_0_25px_50px_-12px_rgba(0,0,0,0.8)]
  ```

### 3. **Rotation des Cartes**
- **Seulement** les cartes focus peuvent être retournées
- Clic conditionnel : `onClick={() => isFocused && onToggleFlip(project.id)}`
- Réinitialisation automatique des cartes hors focus
- Attribution `data-color` pour le suivi

### 4. **Couleurs Dynamiques**
- Extraction de couleur dominante améliorée
- Dégradé à 4 nuances pour meilleur contraste
- Direction du dégradé : `135deg`
- Transparence optimisée pour le texte

### 5. **Synchronisation Scroll**
- Détection améliorée du centre
- Range de focus : `itemHeight / 3`
- Auto-centrage initial au chargement
- Scroll fluide vers l'élément cliqué

### 6. **UI/UX**
- Messages contextuels :
  - Focus : "Cliquez pour voir les détails →"
  - Hors focus : "Scroll pour centrer"
- Bordures dynamiques selon l'état focus
- Coins plus arrondis : `rounded-2xl`

## Résultat attendu :

1. **Navigation fluide** avec effet molette 3D prononcé
2. **Focus clair** sur l'élément centré avec effet de lueur
3. **Interaction intelligente** : seulement les cartes focus se retournent
4. **Couleurs dynamiques** basées sur les images
5. **Performance** optimisée avec des transitions CSS

## Pour tester :

1. Redémarrez le serveur : `npm run dev`
2. Allez dans la section Projets
3. Scrollez pour voir l'effet molette 3D
4. Cliquez sur la carte centrée pour la retourner
5. Observez la couleur dominante et l'effet de lueur
