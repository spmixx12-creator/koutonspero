
import React from 'react';
import { motion } from 'framer-motion';

const BlurRevealText = ({ text, className = "" }) => {
  // We use a functional variant to access the index (i) for staggered animation
  const letterVariants = {
    // The continuous "breathing" animation
    animate: (i) => ({
      filter: ["blur(0px)", "blur(1.5px)", "blur(0px)"], // Very subtle blur (max 1.5px)
      opacity: [1, 0.85, 1], // Subtle opacity dip
      transition: {
        duration: 3, // Slow, relaxed pace
        repeat: Infinity,
        repeatType: "reverse", // Smoothly back and forth
        ease: "easeInOut",
        delay: i * 0.15, // Creates the "gentle wave" flow across the text
      }
    }),
    // Snap to sharp focus on hover
    hover: {
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    initial: {
      filter: "blur(0px)",
      opacity: 1
    }
  };

  return (
    <motion.div 
      className={`relative flex flex-wrap justify-center md:justify-start overflow-visible cursor-default ${className}`}
      whileHover="hover"
      initial="initial"
      animate="animate"
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i} // Pass index to variants
          variants={letterVariants}
          className="inline-block origin-center will-change-[filter,opacity]"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default BlurRevealText;
