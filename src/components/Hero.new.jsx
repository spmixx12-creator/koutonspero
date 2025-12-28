import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypingText from '@/components/TypingText';

// Composant pour la texture de papier
const PaperTexture = ({ className = '' }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    <div className="absolute inset-0 bg-[#f8f5f0] opacity-100" />
    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMxYTFhMWEiIHN0cm9rZS13aWR0aD0iMC41Ii8+Cjwvc3ZnPg==')]" />
  </div>
);

// Composant pour les lettres flottantes
const FloatingLetters = ({ count = 10, className = '' }) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const rotation = Math.random() * 360;
        const opacity = Math.random() * 0.1 + 0.02;
        const blur = Math.random() * 3 + 1;
        
        return (
          <motion.div
            key={i}
            className="absolute text-gray-400 font-serif"
            style={{
              left: `${posX}%`,
              top: `${posY}%`,
              fontSize: `${size}rem`,
              opacity,
              filter: `blur(${blur}px)`,
              transform: `rotate(${rotation}deg)`
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, 5, 0],
              rotate: [rotation, rotation + 5, rotation]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          >
            {randomLetter()}
          </motion.div>
        );
      })}
    </div>
  );
};

// Lignes de repère typographiques
const GuideLines = () => (
  <div className="absolute inset-0 pointer-events-none opacity-5">
    <div className="container mx-auto h-full relative">
      <div className="absolute left-1/4 w-px h-full bg-gray-800" />
      <div className="absolute left-2/4 w-px h-full bg-gray-800" />
      <div className="absolute left-3/4 w-px h-full bg-gray-800" />
      <div className="absolute top-1/3 w-full h-px bg-gray-800" />
      <div className="absolute top-2/3 w-full h-px bg-gray-800" />
    </div>
  </div>
);

// Bouton Continuer
const ContinueButton = ({ onClick, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`mt-12 px-6 py-2 rounded-full border border-amber-800 text-amber-800 hover:bg-amber-50 transition-colors duration-300 flex items-center gap-2 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <span>Continuer</span>
      <motion.span
        animate={{
          x: isHovered ? 5 : 0,
        }}
        transition={{
          repeat: isHovered ? Infinity : 0,
          repeatType: 'reverse',
          duration: 0.5
        }}
      >
        →
      </motion.span>
    </motion.button>
  );
};

// Acte 1: Introduction
const Act1 = ({ onNext }) => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#f8f5f0]">
      <PaperTexture />
      <FloatingLetters count={15} />
      <GuideLines />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' }
          }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-amber-900 mb-6">
            <TypingText 
              text="Atelier Typographique Vivant" 
              speed={50}
              className="block"
            />
          </h1>
          <div className="h-px w-24 bg-amber-800/30 mx-auto my-6" />
          <h2 className="text-2xl md:text-3xl font-light text-amber-800/80">
            <TypingText 
              text="Narration chronologique" 
              speed={50}
              delay={1500}
              className="block"
            />
          </h2>
        </motion.div>
        
        <motion.div
          className="text-lg text-amber-900/70 leading-relaxed mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 1, duration: 0.8, ease: 'easeOut' }
          }}
        >
          <p>Bienvenue dans mon univers typographique, où chaque lettre raconte une histoire et chaque espace respire la créativité.</p>
        </motion.div>
        
        <ContinueButton onClick={onNext} />
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-10 text-xs text-amber-800/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p>Acte I • L'ouverture</p>
      </motion.div>
    </div>
  );
};

// Acte 2: Exploration
const Act2 = ({ onNext, onPrev }) => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#f5efe6]">
      <PaperTexture />
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-amber-100/20" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' }
          }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-amber-900 mb-8">
            <TypingText 
              text="Exploration & Découverte" 
              speed={40}
              className="block"
            />
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
            <motion.div 
              className="bg-white/30 backdrop-blur-sm p-6 rounded-lg border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-serif text-amber-800 mb-3">Formation</h3>
              <p className="text-amber-900/80">Apprentissage des bases de la typographie et de la mise en page.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/30 backdrop-blur-sm p-6 rounded-lg border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ y: -5 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-serif text-amber-800 mb-3">Expérimentation</h3>
              <p className="text-amber-900/80">Essais et découvertes des différentes familles typographiques.</p>
            </motion.div>
          </div>
        </motion.div>
        
        <div className="flex justify-center gap-4 mt-12">
          <button 
            onClick={onPrev}
            className="px-4 py-2 text-amber-700 hover:text-amber-900 transition-colors"
          >
            ← Précédent
          </button>
          <ContinueButton onClick={onNext} />
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 right-10 text-xs text-amber-800/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p>Acte II • L'exploration</p>
      </motion.div>
    </div>
  );
};

// Acte 3: Maîtrise
const Act3 = ({ onNext, onPrev }) => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#f0e9de]">
      <PaperTexture />
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/10 to-amber-100/5" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, ease: 'easeOut' }
            }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-6">
              <TypingText 
                text="Maîtrise & Expertise" 
                speed={40}
                className="block"
              />
            </h2>
            
            <p className="text-amber-900/80 mb-8 leading-relaxed">
              L'aboutissement d'un parcours, la maturité d'un style. Chaque projet est une opportunité de pousser les limites de la typographie et de créer des expériences mémorables.
            </p>
            
            <div className="space-y-4">
              {['Typographie expressive', 'Hiérarchie visuelle', 'Équilibre & rythme', 'Détails minutieux'].map((skill, i) => (
                <motion.div 
                  key={skill}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.5 + (i * 0.1), duration: 0.5 }
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-amber-600" />
                  <span className="text-amber-900/90">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.3, duration: 0.8, ease: 'easeOut' }
            }}
          >
            <div className="relative z-10 bg-white p-2 shadow-xl">
              <div className="border border-amber-100 p-1">
                <div className="h-64 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                  <span className="text-amber-900/30 font-serif text-lg">Projet en vedette</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-amber-200 -z-10" />
          </motion.div>
        </div>
        
        <div className="flex justify-center gap-4 mt-16">
          <button 
            onClick={onPrev}
            className="px-4 py-2 text-amber-700 hover:text-amber-900 transition-colors"
          >
            ← Précédent
          </button>
          <ContinueButton onClick={onNext} />
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 right-10 text-xs text-amber-800/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p>Acte III • La maîtrise</p>
      </motion.div>
    </div>
  );
};

// Acte 4: Vision
const Act4 = ({ onPrev }) => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#f0ece4]">
      <PaperTexture />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' }
          }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-amber-900 mb-8">
            <TypingText 
              text="Vision & Perspectives" 
              speed={40}
              className="block"
            />
          </h2>
          
          <p className="text-amber-900/80 text-lg leading-relaxed mb-8">
            L'avenir s'écrit ici, une lettre à la fois. Je continue d'explorer de nouvelles frontières dans le domaine de la typographie et de la conception graphique.
          </p>
          
          <motion.div 
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="#contact" 
              className="inline-block bg-amber-800 hover:bg-amber-900 text-white font-medium px-8 py-3 rounded-full transition-colors duration-300"
            >
              Travaillons ensemble
            </a>
          </motion.div>
        </motion.div>
        
        <div className="flex justify-center mt-16">
          <button 
            onClick={onPrev}
            className="px-4 py-2 text-amber-700 hover:text-amber-900 transition-colors"
          >
            ← Retour
          </button>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 right-10 text-xs text-amber-800/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p>Acte IV • La vision</p>
      </motion.div>
    </div>
  );
};

// Composant Hero principal
const Hero = () => {
  const [currentAct, setCurrentAct] = useState(0);
  
  const nextAct = () => {
    if (currentAct < 3) {
      setCurrentAct(prev => prev + 1);
    }
  };
  
  const prevAct = () => {
    if (currentAct > 0) {
      setCurrentAct(prev => prev - 1);
    }
  };
  
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {currentAct === 0 && <Act1 key="act1" onNext={nextAct} />}
        {currentAct === 1 && <Act2 key="act2" onNext={nextAct} onPrev={prevAct} />}
        {currentAct === 2 && <Act3 key="act3" onNext={nextAct} onPrev={prevAct} />}
        {currentAct === 3 && <Act4 key="act4" onPrev={prevAct} />}
      </AnimatePresence>
      
      {/* Indicateur de progression */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => setCurrentAct(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentAct === i ? 'bg-amber-700 w-8' : 'bg-amber-300/50 hover:bg-amber-400/70'
            }`}
            aria-label={`Aller à l'acte ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
