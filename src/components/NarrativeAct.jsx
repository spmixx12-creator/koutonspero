import React from 'react';
import { motion } from 'framer-motion';

const NarrativeAct = ({
  children,
  bgColor = 'bg-beige',
  textColor = 'text-charcoal',
  className = '',
  isActive = false,
  onActivate,
  actNumber,
  title,
  description,
  ...props
}) => {
  return (
    <motion.div
      className={`relative min-h-screen w-full overflow-hidden ${bgColor} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.5 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      onClick={onActivate}
      {...props}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* Background texture and decorative elements */}
        <div className="absolute inset-0 bg-paper-texture opacity-20" />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          className="mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-sm font-space tracking-widest text-lightBrown">
            ACTE {actNumber}
          </span>
          <h2 className="text-4xl md:text-6xl font-cormorant font-bold mt-2">
            {title}
          </h2>
          <p className="mt-4 text-lg max-w-2xl">{description}</p>
        </motion.div>

        <div className="relative">
          {children}
        </div>
      </div>
      
      {isActive && (
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-lightBrown cursor-pointer hover:opacity-80 transition-opacity"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>Continuer</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            →
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NarrativeAct;
