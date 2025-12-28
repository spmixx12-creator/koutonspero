import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TypingText from '@/components/TypingText';
import NavigationBlocks from '@/components/NavigationBlocks';
import BlurRevealText from '@/components/BlurRevealText';

// Custom SVG Components for Doodles and Pins
const PushPin = ({ color = "#C7B9A3", rotation = 0, className = "" }) => (
  <svg
    viewBox="0 0 100 100"
    className={`w-12 h-12 drop-shadow-md ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <circle cx="50" cy="50" r="20" fill={color} className="drop-shadow-sm" />
    <path d="M50 50 L80 80" stroke="#888" strokeWidth="2" />
    <circle cx="55" cy="45" r="5" fill="rgba(255,255,255,0.4)" />
  </svg>
);

const PencilStroke = ({ className = "" }) => (
  <svg viewBox="0 0 200 100" className={`absolute w-64 h-32 opacity-60 ${className}`}>
    <path
      d="M10,50 Q50,10 90,50 T180,50"
      fill="none"
      stroke="#1C1C1C"
      strokeWidth="2"
      strokeDasharray="4 4"
    />
  </svg>
);

const CircleDoodle = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={`absolute w-32 h-32 opacity-40 ${className}`}>
    <path
      d="M50 10 C 20 10, 10 40, 10 50 C 10 80, 40 90, 50 90 C 80 90, 90 60, 90 50 C 90 20, 60 10, 50 10"
      fill="none"
      stroke="#C7B9A3"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const Scribble = ({ className = "" }) => (
  <svg viewBox="0 0 100 50" className={`absolute w-48 h-24 opacity-30 ${className}`}>
    <path
      d="M10,25 Q30,5 50,25 T90,25"
      fill="none"
      stroke="#1C1C1C"
      strokeWidth="4"
    />
  </svg>
);

const Tape = ({ className = "", rotation = 0 }) => (
  <div
    className={`absolute w-32 h-8 bg-white/40 backdrop-blur-sm shadow-sm ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
  />
);

const DotsPattern = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={`absolute w-24 h-24 opacity-20 ${className}`}>
    <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="2" fill="#1C1C1C" />
    </pattern>
    <rect width="100" height="100" fill="url(#dots)" />
  </svg>
);

const SquiggleLine = ({ className = "" }) => (
  <svg viewBox="0 0 200 20" className={`absolute w-40 h-8 opacity-40 ${className}`}>
    <path
      d="M0,10 Q20,20 40,10 T80,10 T120,10 T160,10 T200,10"
      fill="none"
      stroke="#C7B9A3"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const Hero = ({ setCurrentPage }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full w-full relative flex flex-col md:justify-end overflow-hidden">

      {/* --- DOODLES LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <PencilStroke className="top-[20%] left-[10%] rotate-12" />
          <CircleDoodle className="top-[15%] right-[20%]" />
          <Scribble className="bottom-[30%] left-[15%] rotate-[-10deg]" />

          <div className="absolute top-[40%] right-[10%] w-1 h-32 bg-charcoal/20 rotate-45 rounded-full" />
          <div className="absolute top-[30%] left-[25%] w-32 h-1 bg-lightBrown/40 rotate-12 rounded-full" />

          {/* New Decorative Elements */}
          <Tape className="top-[5%] left-[40%]" rotation={-5} />
          <DotsPattern className="bottom-[15%] right-[5%]" />
          <SquiggleLine className="top-[60%] left-[5%] rotate-[-45deg]" />
          <Tape className="bottom-[10%] right-[35%]" rotation={10} />
        </motion.div>
      </div>

      {/* --- MAIN CONTENT LAYER --- */}
      <div className="relative z-10 w-full h-[85vh] max-w-7xl mx-auto flex flex-col md:block">

        {/* Mobile: Top Section (Designer Text) */}
        <div className="md:hidden pt-8 pb-4 text-center z-20 order-1">
          {showContent && (
            <TypingText
              text="Designer & Creative Thinker"
              className="text-xl font-space font-medium tracking-wide text-charcoal/80"
              delay={500}
              speed={50}
            />
          )}
        </div>

        {/* Mobile: Background Image behind buttons - REMOVED */}

        {/* Desktop: Floating Name (Left Side) */}
        <div className="hidden md:block absolute top-[25%] left-[2%] z-20 max-w-md pointer-events-auto">
          {showContent && (
            <div className="relative pl-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 }}
                className="absolute -left-2 -top-12 text-6xl text-lightBrown/20 font-serif"
              >
                "
              </motion.div>

              <div className="mb-6 flex flex-col justify-start items-start gap-0">
                <BlurRevealText
                  text="KOUTON"
                  className="text-6xl lg:text-7xl font-cormorant font-bold text-charcoal leading-none tracking-tight py-0"
                />
                <BlurRevealText
                  text="Spéro.P"
                  className="text-6xl lg:text-7xl font-cormorant font-bold text-charcoal leading-none tracking-tight ml-3 py-0"
                />
              </div>

              <TypingText
                text="Designer & Creative Thinker"
                className="text-2xl font-space font-medium tracking-wide text-charcoal/80 block mb-4 ml-2"
                delay={1500}
                speed={80}
              />
              <TypingText
                text="Bienvenue dans mon atelier typographique."
                className="text-lg font-cormorant italic text-charcoal/60 block ml-2"
                delay={2500}
                speed={50}
              />
              <PushPin className="absolute -top-16 -left-8" rotation={-15} color="#1C1C1C" />
            </div>
          )}
        </div>

        {/* Center/Main: Portrait Image - Desktop only - REMOVED */}

        {/* Desktop Only Pins */}
        <div className="hidden md:block">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, type: "spring" }}
              className="absolute top-[10%] right-[25%] z-20"
            >
              <PushPin rotation={15} color="#C7B9A3" />
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.7, type: "spring" }}
              className="absolute bottom-[20%] left-[25%] z-20"
            >
              <PushPin rotation={-25} color="#1C1C1C" />
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-gradient-to-t from-beige via-transparent to-transparent z-0 hidden md:block" />

        {/* Desktop: Right Side Info */}
        <div className="hidden md:block absolute top-[30%] right-[5%] z-20 max-w-xs text-right pointer-events-auto">
          {showContent && (
            <div className="relative">
              <TypingText
                text="Identité Visuelle"
                className="text-xl font-space text-lightBrown block mb-2"
                delay={3000}
                speed={60}
              />
              <TypingText
                text="Motion Design"
                className="text-xl font-space text-lightBrown block mb-2"
                delay={3200}
                speed={60}
              />
              <TypingText
                text="Direction Artistique"
                className="text-xl font-space text-lightBrown block"
                delay={3400}
                speed={60}
              />
              <div className="absolute -right-8 top-1/2 w-1 h-24 bg-charcoal/10 rotate-12" />
            </div>
          )}
        </div>
      </div>

      {/* --- NAVIGATION LAYER --- */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="w-full z-30 px-8 pointer-events-auto mt-auto md:mt-0"
      >
        <div className="max-w-4xl mx-auto">
          <NavigationBlocks setCurrentPage={setCurrentPage} />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
