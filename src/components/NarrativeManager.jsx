import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NarrativeAct from './NarrativeAct';

const NarrativeManager = ({ children }) => {
  const [currentAct, setCurrentAct] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const acts = [
    {
      id: 'act1',
      bgColor: 'bg-beige',
      title: 'L\'Atelier Typographique Vivant',
      description: 'Là où chaque lettre raconte une histoire et chaque espace respire la créativité.'
    },
    {
      id: 'act2',
      bgColor: 'bg-lightBeige',
      title: 'Narration Chronologique',
      description: 'Un voyage à travers le temps qui révèle l\'évolution de ma passion pour la typographie.'
    },
    {
      id: 'act3',
      bgColor: 'bg-warmBeige',
      title: 'Maîtrise & Expertise',
      description: 'L\'aboutissement d\'un parcours, la maturité d\'un style.'
    },
    {
      id: 'act4',
      bgColor: 'bg-paleBlue',
      title: 'Vision & Perspectives',
      description: 'L\'avenir s\'écrit ici, une lettre à la fois.'
    }
  ];

  const handleNextAct = () => {
    if (isTransitioning || currentAct >= acts.length - 1) return;
    setIsTransitioning(true);
    setCurrentAct(prev => prev + 1);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const handlePrevAct = () => {
    if (isTransitioning || currentAct <= 0) return;
    setIsTransitioning(true);
    setCurrentAct(prev => prev - 1);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNextAct();
      } else if (e.key === 'ArrowLeft') {
        handlePrevAct();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentAct, isTransitioning]);

  // Auto-advance after delay (for demo purposes)
  useEffect(() => {
    if (currentAct < acts.length - 1) {
      const timer = setTimeout(handleNextAct, 10000); // 10 seconds per act
      return () => clearTimeout(timer);
    }
  }, [currentAct]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        {acts.map((act, index) => (
          currentAct === index && (
            <NarrativeAct
              key={act.id}
              actNumber={index + 1}
              title={act.title}
              description={act.description}
              bgColor={act.bgColor}
              isActive={currentAct === index}
              onActivate={handleNextAct}
            >
              {React.Children.toArray(children)[index]}
            </NarrativeAct>
          )
        ))}
      </AnimatePresence>
      
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-3">
        {acts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentAct(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentAct === index 
                ? 'bg-lightBrown scale-125' 
                : 'bg-gray-300 hover:bg-lightBrown/50'
            }`}
            aria-label={`Aller à l'acte ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default NarrativeManager;
