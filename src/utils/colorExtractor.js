// Utilitaire pour extraire la couleur dominante d'une image

/**
 * Extrait la couleur dominante d'une image en utilisant Canvas API
 * @param {string} imageUrl - URL de l'image à analyser
 * @param {Object} options - Options de configuration
 * @returns {Promise<string>} - Couleur dominante au format hex
 */
export const getDominantColor = (imageUrl, options = {}) => {
  const {
    sampleSize = 50, // Taille de l'échantillon pour l'analyse
    ignoreWhite = true, // Ignorer les couleurs très claires
    ignoreBlack = true, // Ignorer les couleurs très foncées
    threshold = 30 // Seuil pour ignorer les couleurs extrêmes
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Pour les images externes

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Redimensionner pour l'analyse plus rapide
        canvas.width = sampleSize;
        canvas.height = sampleSize;
        
        // Dessiner l'image redimensionnée
        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
        
        // Récupérer les données de pixels
        const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
        const pixels = imageData.data;
        
        // Compter les couleurs
        const colorMap = {};
        let maxCount = 0;
        let dominantColor = '#000000';
        
        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];
          
          // Ignorer les pixels transparents
          if (a < 128) continue;
          
          // Ignorer les couleurs extrêmes si demandé
          if (ignoreWhite && r > 255 - threshold && g > 255 - threshold && b > 255 - threshold) continue;
          if (ignoreBlack && r < threshold && g < threshold && b < threshold) continue;
          
          // Grouper les couleurs similaires (réduction de palette)
          const roundedR = Math.round(r / 16) * 16;
          const roundedG = Math.round(g / 16) * 16;
          const roundedB = Math.round(b / 16) * 16;
          
          const colorKey = `${roundedR},${roundedG},${roundedB}`;
          
          if (!colorMap[colorKey]) {
            colorMap[colorKey] = { count: 0, r: roundedR, g: roundedG, b: roundedB };
          }
          colorMap[colorKey].count++;
          
          // Suivre la couleur la plus fréquente
          if (colorMap[colorKey].count > maxCount) {
            maxCount = colorMap[colorKey].count;
            dominantColor = rgbToHex(roundedR, roundedG, roundedB);
          }
        }
        
        resolve(dominantColor);
      } catch (error) {
        console.error('Erreur lors de l\'extraction de la couleur:', error);
        resolve('#1a1a1a'); // Couleur par défaut
      }
    };

    img.onerror = () => {
      console.error('Erreur de chargement de l\'image:', imageUrl);
      resolve('#1a1a1a'); // Couleur par défaut
    };

    img.src = imageUrl;
  });
};

/**
 * Convertit RGB en hexadécimal
 * @param {number} r 
 * @param {number} g 
 * @param {number} b 
 * @returns {string}
 */
const rgbToHex = (r, g, b) => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

/**
 * Crée un dégradé basé sur la couleur dominante
 * @param {string} dominantColor - Couleur dominante en hex
 * @param {string} direction - Direction du dégradé
 * @returns {string} - CSS gradient
 */
export const createGradientFromColor = (dominantColor, direction = '135deg') => {
  // Convertir hex en RGB
  const hex = dominantColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Créer des variations plus foncées pour un meilleur contraste
  const mid = rgbToHex(
    Math.max(0, r - 30),
    Math.max(0, g - 30), 
    Math.max(0, b - 30)
  );
  
  const dark = rgbToHex(
    Math.max(0, r - 60),
    Math.max(0, g - 60),
    Math.max(0, b - 60)
  );
  
  const darker = rgbToHex(
    Math.max(0, r - 90),
    Math.max(0, g - 90),
    Math.max(0, b - 90)
  );
  
  return `linear-gradient(${direction}, ${dominantColor}, ${mid}, ${dark}, ${darker})`;
};

/**
 * Cache pour stocker les couleurs déjà extraites
 */
const colorCache = new Map();

/**
 * Version avec cache de getDominantColor
 * @param {string} imageUrl 
 * @param {Object} options 
 * @returns {Promise<string>}
 */
export const getCachedDominantColor = async (imageUrl, options = {}) => {
  if (colorCache.has(imageUrl)) {
    return colorCache.get(imageUrl);
  }
  
  const color = await getDominantColor(imageUrl, options);
  colorCache.set(imageUrl, color);
  return color;
};
