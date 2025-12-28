import React from 'react';
import { motion } from 'framer-motion';
import TypingText from '@/components/TypingText';

const NavigationBlocks = ({ setCurrentPage }) => {
  const navItems = [
    { id: 'projets', label: 'PROJETS', delay: 0 },
    { id: 'apropos', label: 'À PROPOS', delay: 400 },
    { id: 'contact', label: 'CONTACT', delay: 800 },
    { id: 'cv', label: 'CV', delay: 1200 }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      {navItems.map((item, index) => (
        <motion.button
          key={item.id}
          onClick={() => setCurrentPage(item.id)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: item.delay / 1000, duration: 0.5 }}
          whileHover={{
            y: -5,
            rotate: index % 2 === 0 ? 2 : -2,
            scale: 1.02,
            boxShadow: '0 10px 20px rgba(28, 28, 28, 0.15)'
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-charcoal/90 backdrop-blur-sm text-beige px-3 py-3 sm:px-4 sm:py-4 md:py-5 rounded-sm font-space text-xs sm:text-sm md:text-base tracking-widest hover:bg-lightBrown hover:text-charcoal transition-all duration-300 shadow-lg border-b-2 border-r-2 border-charcoal/20"
        >
          <TypingText
            text={item.label}
            delay={item.delay + 3000} 
            speed={80}
            showCursor={false}
          />
        </motion.button>
      ))}
    </div>
  );
};

export default NavigationBlocks;