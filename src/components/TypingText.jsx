import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypingText = ({ text, className = '', delay = 0, speed = 80, showCursor = true }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex === 0) {
      const startTimer = setTimeout(() => {
        setCurrentIndex(1);
      }, delay);
      return () => clearTimeout(startTimer);
    }

    if (currentIndex > 0 && currentIndex <= text.length) {
      // Human-like irregular speed: base speed +/- random variance
      const variance = Math.random() * 60;
      const currentSpeed = speed + (Math.random() > 0.5 ? variance : -variance);

      // Ensure speed isn't too fast or too slow
      const finalSpeed = Math.max(30, Math.min(currentSpeed, 150));

      const timer = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex));
        setCurrentIndex(currentIndex + 1);
      }, finalSpeed);
      return () => clearTimeout(timer);
    } else if (currentIndex > text.length) {
      setIsComplete(true);
    }
  }, [currentIndex, text, delay, speed]);

  return (
    <span className={className}>
      {displayedText.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0
          }}
          className="inline-block hover:text-lightBrown transition-colors duration-200"
          whileHover={{
            y: -2,
            textShadow: '0 0 8px rgba(199, 185, 163, 0.5)'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      {showCursor && !isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block ml-1 text-lightBrown"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

export default TypingText;