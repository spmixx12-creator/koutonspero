import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import TypingText from '@/components/TypingText';

// Background texture component with paper grain effect
const PaperTexture = ({ className = '' }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    <div className="absolute inset-0 bg-beige opacity-100" />
    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjRjRGMUVCIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNDN0I5QTMiIHN0cm9rZS13aWR0aD0iMC41Ii8+Cjwvc3ZnPg==')]" />
  </div>
);

// Floating letters for background decoration
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
            className="absolute text-charcoal/5 font-accent italic"
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

// Typography guide lines
const GuideLines = () => (
  <div className="absolute inset-0 pointer-events-none opacity-5">
    <div className="container mx-auto h-full relative">
      <div className="absolute left-1/4 w-px h-full bg-charcoal/5" />
      <div className="absolute left-2/4 w-px h-full bg-charcoal/5" />
      <div className="absolute left-3/4 w-px h-full bg-charcoal/5" />
      <div className="absolute top-1/3 w-full h-px bg-charcoal/5" />
      <div className="absolute top-2/3 w-full h-px bg-charcoal/5" />
    </div>
  </div>
);

// Continue button component
const ContinueButton = ({ onClick, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`mt-12 px-6 py-2 rounded-full border border-lightBrown text-charcoal hover:bg-charcoal hover:text-beige transition-colors duration-300 flex items-center gap-2 font-cormorant ${className}`}
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

// Act 1: Welcome / Attitude - Artistic Direction
const Act1 = ({ onNext }) => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-beige">
      {/* Background DESIGNER - Very large, low opacity */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <h1
          className="font-cormorant text-[20vw] md:text-[18vw] lg:text-[16vw] font-bold text-charcoal/[0.06] tracking-tight leading-none whitespace-nowrap"
          style={{ letterSpacing: '-0.02em' }}
        >
          DESIGNER
        </h1>
      </motion.div>

      {/* Space for future photo that will partially hide DESIGNER */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-dashed border-lightBrown/30 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {/* Photo placeholder - will be replaced later */}
        <div className="w-full h-full rounded-full bg-lightBrown/10 flex items-center justify-center">
          <span className="text-lightBrown/40 text-xs font-space">Photo</span>
        </div>
      </motion.div>

      {/* Main content layer */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* "Bienvenue sur mon" - Small size, elegant */}
        <motion.p
          className="font-space text-sm md:text-base text-charcoal/60 tracking-widest uppercase mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Bienvenue sur mon
        </motion.p>

        {/* PORTFOLIO - Main focus with typing effect */}
        <motion.div
          className="relative mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h1 className="font-cormorant text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold text-charcoal tracking-tight">
            <TypingText
              text="PORTFOLIO"
              speed={100}
              delay={1000}
              className="inline-block"
              showCursor={true}
            />
          </h1>

          {/* Underline accent */}
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-lightBrown rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '40%' }}
            transition={{
              delay: 2.5,
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
          />
        </motion.div>

        {/* "je suis votre" - Small and elegant */}
        <motion.p
          className="font-space text-sm md:text-base text-charcoal/60 tracking-widest uppercase mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
        >
          je suis votre
        </motion.p>

        {/* "Détendez-vous…" - Smooth sliding animation */}
        <motion.div
          className="mt-16 md:mt-20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 4,
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <p className="font-cormorant text-xl md:text-2xl italic text-lightBrown">
            Détendez-vous…
          </p>
          <motion.p
            className="font-space text-sm md:text-base text-charcoal/50 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5, duration: 1 }}
          >
            Vous êtes au bon endroit.
          </motion.p>
        </motion.div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.5, duration: 0.8 }}
          className="mt-12 md:mt-16"
        >
          <motion.button
            onClick={onNext}
            className="px-8 py-3 rounded-full border-2 border-charcoal text-charcoal font-space text-sm tracking-wider uppercase hover:bg-charcoal hover:text-beige transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Découvrir →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

// Geometric Decorations Component
const GeometricDecorations = () => (
  <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
    {/* Point - Top Left */}
    <motion.div
      className="absolute top-8 left-8 md:top-12 md:left-12 opacity-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3, rotate: 360 }}
      transition={{ opacity: { duration: 1 }, rotate: { duration: 60, repeat: Infinity, ease: "linear" } }}
    >
      <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-charcoal rounded-full" />
    </motion.div>

    {/* Cross - Top Right */}
    <motion.div
      className="absolute top-8 right-8 md:top-12 md:right-12 opacity-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3, rotate: -360 }}
      transition={{ opacity: { duration: 1 }, rotate: { duration: 80, repeat: Infinity, ease: "linear" } }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" className="text-charcoal">
        <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </motion.div>

    {/* Line - Bottom Left */}
    <motion.div
      className="absolute bottom-24 left-8 md:bottom-28 md:left-12 opacity-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3, rotate: 360 }}
      transition={{ opacity: { duration: 1 }, rotate: { duration: 70, repeat: Infinity, ease: "linear" } }}
    >
      <div className="w-8 h-[0.5px] md:w-12 bg-charcoal" />
    </motion.div>

    {/* Cross (Small) - Bottom Right */}
    <motion.div
      className="absolute bottom-24 right-8 md:bottom-28 md:right-12 opacity-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3, rotate: 360 }}
      transition={{ opacity: { duration: 1 }, rotate: { duration: 90, repeat: Infinity, ease: "linear" } }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" className="text-charcoal">
        <line x1="5" y1="0" x2="5" y2="10" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </motion.div>

    {/* --- NEW ELEMENTS BELOW --- */}

    {/* Large Dashed Circle - Rotating slowly */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] border border-dashed border-charcoal/10 rounded-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.2, rotate: 180 }}
      transition={{ opacity: { duration: 2 }, rotate: { duration: 120, repeat: Infinity, ease: "linear" } }}
    />

    {/* Floating Plus - Middle Left area */}
    <motion.div
      className="absolute top-[35%] left-[15%] opacity-10"
      animate={{ y: [0, -10, 0], rotate: 45 }}
      transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" className="text-charcoal">
        <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </motion.div>

    {/* Tiny Square - Middle Right area */}
    <motion.div
      className="absolute top-[60%] right-[10%] opacity-10"
      animate={{ y: [0, 15, 0], rotate: 15 }}
      transition={{ y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
    >
      <div className="w-2 h-2 border border-charcoal" />
    </motion.div>

  </div>
);

// Act 2: Identité / Présence - Signature Personnelle
const Act2 = ({ onNext, onPrev }) => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const skills = [
    'UX Design',
    'Web Design',
    'Design Promotionnel/Affiche',
    'Direction artistique',
    'Interfaces modernes',
    'Montage Tiktok',
    'Montage Youtube'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [skills.length]);

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-beige">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-beige via-beige/95 to-beige" />

      {/* Decorations */}
      <GeometricDecorations />

      {/* === LAYER 1: KOUTON in full-screen background === */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <h1
          className="font-cormorant text-[28vw] md:text-[24vw] lg:text-[20vw] font-bold text-charcoal/[0.06] tracking-tighter leading-none whitespace-nowrap uppercase"
          style={{ letterSpacing: '-0.03em' }}
        >
          KOUTON
        </h1>
      </motion.div>

      {/* === LAYER 2: Your photo (centered, in front) === */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-20"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative h-[75vh] md:h-[80vh] max-h-[700px]">
          {/* Photo with elegant styling */}
          <img
            src="/images/Gemini_Generated_Image_2imtvm2imtvm2imt-removebg-preview.webp"
            alt="KOUTON Spéro Précieux"
            className="h-full w-auto object-cover object-top"
          />
          {/* Subtle fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-beige to-transparent" />
        </div>
      </motion.div>

      {/* === LAYER 3: Name and title below === */}
      <div className="absolute bottom-32 md:bottom-36 left-0 right-0 z-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="relative inline-block"
        >
          {/* Highlighter effect behind text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left center' }}
          >
            <svg
              viewBox="0 0 400 60"
              className="absolute w-full h-full"
              preserveAspectRatio="none"
              style={{ top: '15%', height: '70%' }}
            >
              <path
                d="M5,30 Q20,15 60,28 T120,32 T180,26 T240,30 T300,28 T360,32 T395,30"
                fill="none"
                stroke="#C7B9A3"
                strokeWidth="75"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
                style={{
                  filter: 'url(#roughen)'
                }}
              />
              <defs>
                <filter id="roughen" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
            </svg>
          </motion.div>

          {/* Text on top */}
          <h2 className="relative z-10 font-cormorant text-3xl md:text-4xl lg:text-5xl font-light text-charcoal tracking-wide px-4">
            <span className="italic">Spéro</span>
            <span className="mx-3 text-lightBrown">•</span>
            <span className="font-medium">Précieux</span>
          </h2>
        </motion.div>

        {/* Skills - Vertical scrolling carousel */}
        <motion.div
          className="mt-4 h-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSkill}
              className="font-space text-lg md:text-xl text-lightBrown tracking-[0.2em] uppercase"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {skills[currentSkill]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Description - Very breathing, elegant */}
        <motion.p
          className="mt-6 font-space text-sm md:text-base text-charcoal/60 max-w-lg mx-auto px-6 leading-relaxed tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 1.2, ease: 'easeOut' }}
        >
          Je conçois des expériences digitales où l'élégance
          <br className="hidden md:block" />
          rencontre la précision.
        </motion.p>
      </div>

      {/* Navigation buttons - fixed at bottom center */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center items-center gap-12 z-50">
        <motion.button
          onClick={onPrev}
          className="px-6 py-2 text-charcoal/60 hover:text-lightBrown transition-colors font-space text-sm uppercase tracking-wider"
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Précédent
        </motion.button>
        <motion.button
          onClick={onNext}
          className="px-6 py-2 text-charcoal/60 hover:text-lightBrown transition-colors font-space text-sm uppercase tracking-wider"
          whileHover={{ scale: 1.05, x: 3 }}
          whileTap={{ scale: 0.95 }}
        >
          Suivant →
        </motion.button>
      </div>
    </div>
  );
};

// Act 3: Parcours / Philosophie - Méthodologie UX
const Act3 = ({ onNext, onPrev }) => {
  const steps = [
    {
      number: "01",
      title: "Comprendre",
      quote: "Chaque projet commence par l’écoute.",
      description: "J’analyse le besoin, le contexte et les objectifs avant toute création.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-lightBrown mb-6" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="20" cy="20" r="15" strokeDasharray="4 2" className="opacity-50" />
          <path d="M15 20h10M20 15v10" strokeLinecap="round" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Concevoir",
      quote: "Le design est une réponse, pas une décoration.",
      description: "Je conçois des interfaces claires, utiles et cohérentes.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-lightBrown mb-6" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="10" y="10" width="20" height="20" className="opacity-50" />
          <path d="M10 10l20 20M30 10l-20 20" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Affiner",
      quote: "Les détails font la différence.",
      description: "J’ajuste, j’optimise et je teste pour garantir une expérience fluide et durable.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-lightBrown mb-6" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M20 5l15 30H5z" className="opacity-50" />
          <circle cx="20" cy="25" r="3" fill="currentColor" className="opacity-80" />
        </svg>
      )
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-beige">
      {/* Background GIF - Subtle */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply brightness-110 contrast-125 saturate-0">
        <img
          src="/images/téléchargement (26).webp"
          alt="Background texture"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Background decorations - very subtle */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lightBrown/5 via-transparent to-transparent opacity-50 z-[1]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6"> {/* Start of main content wrapper */}
        <motion.h2
          className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-charcoal font-light italic text-center mb-16 md:mb-20 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Comment je travaille, et <span className="underline decoration-1 underline-offset-8 decoration-lightBrown">pourquoi</span> ?
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-80 md:gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center md:items-start text-center md:text-left group relative" // Removed bg-beige
            >
              {/* Icon abstract */}
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 45 }}
                transition={{ duration: 0.5 }}
                className="relative z-10" // Removed bg-beige
              >
                {step.icon}
              </motion.div>

              {/* Number */}
              <h3 className="font-cormorant text-xl text-lightBrown/80 mb-2 font-italic tracking-wider">
                {step.number} — {step.title}
              </h3>

              {/* Quote (Main phrase) */}
              <p className="font-cormorant text-2xl md:text-3xl text-charcoal font-semibold mb-4 leading-tight">
                {step.quote}
              </p>

              {/* Description */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-lightBrown/30 hidden md:block origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700" />
                <p className="font-space text-sm md:text-base text-charcoal/60 leading-relaxed md:pl-4 transition-all duration-500">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div> {/* End of main content wrapper */}

      {/* Navigation buttons - fixed HIGHER at bottom-16 as requested */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center items-center gap-12 z-50">
        <motion.button
          onClick={onPrev}
          className="px-6 py-2 text-charcoal/60 hover:text-lightBrown transition-colors font-space text-sm uppercase tracking-wider"
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Précédent
        </motion.button>
        <motion.button
          onClick={onNext}
          className="px-6 py-2 text-charcoal/60 hover:text-lightBrown transition-colors font-space text-sm uppercase tracking-wider"
          whileHover={{ scale: 1.05, x: 3 }}
          whileTap={{ scale: 0.95 }}
        >
          Suivant →
        </motion.button>
      </div>

      <motion.div
        className="absolute bottom-16 right-10 text-xs text-charcoal/40 hidden md:block" // Also updated position
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p>Acte III • La Méthode</p>
      </motion.div>
    </div>
  );
};

// Act 4: La Porte / Le Seuil
const Act4 = ({ onPrev, onNext }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-beige">
      <PaperTexture />

      {/* Nom en arrière-plan discret */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
      >
        <h1 className="text-9xl font-black text-charcoal/5 whitespace-nowrap font-cormorant opacity-20">
          KOUTON Spéro Précieux
        </h1>
      </motion.div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-bold text-charcoal mb-8">
            <TypingText
              text="Assez parlé."
              speed={30}
              className="block"
            />
            <TypingText
              text="Voyons ce que je fais."
              speed={30}
              delay={1500}
              className="block mt-4"
            />
          </h2>
        </motion.div>

        <motion.div
          className="relative"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={onNext}
        >
          {/* Porte visuelle abstraite */}
          <motion.div
            className="relative mx-auto w-1 h-64 bg-charcoal/10"
            initial={{ height: 0 }}
            animate={{ height: '16rem' }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute left-1/2 top-0 w-0.5 h-full bg-lightBrown"
              animate={{ height: isHovered ? '100%' : '0%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Bouton d'entrée */}
          <motion.button
            className="mt-12 px-8 py-4 rounded-full bg-charcoal text-beige hover:bg-lightBrown hover:text-charcoal transition-colors duration-300 text-lg font-medium flex items-center gap-3 mx-auto font-cormorant"
            whileHover={{
              backgroundColor: '#C7B9A3',
              scale: 1.05
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <span>Entrer dans le portfolio</span>
            <motion.span
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* Navigation button - fixed at bottom center */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center">
        <motion.button
          onClick={onPrev}
          className="px-6 py-2 text-charcoal/60 hover:text-lightBrown transition-colors font-space text-sm uppercase tracking-wider"
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Retour
        </motion.button>
      </div>

      <motion.div
        className="absolute bottom-16 right-10 text-xs text-charcoal/40"
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
const Hero = ({ setCurrentPage }) => {
  const [currentAct, setCurrentAct] = useState(0);

  const nextAct = () => {
    if (currentAct < 3) {
      setCurrentAct(prev => prev + 1);
    } else {
      // Si on est au dernier acte, on redirige vers la page projets
      setCurrentPage('projets');
    }
  };

  const prevAct = () => {
    if (currentAct > 0) {
      setCurrentAct(prev => prev - 1);
    } else {
      // Si on est au premier acte, on redirige vers la page à propos
      setCurrentPage('apropos');
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {currentAct === 0 && <Act1 key="act1" onNext={nextAct} />}
        {currentAct === 1 && <Act2 key="act2" onNext={nextAct} onPrev={prevAct} />}
        {currentAct === 2 && <Act3 key="act3" onNext={nextAct} onPrev={prevAct} />}
        {currentAct === 3 && (
          <Act4
            key="act4"
            onPrev={prevAct}
            onNext={() => setCurrentPage('projets')}
          />
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => setCurrentAct(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentAct === i ? 'bg-lightBrown w-8' : 'bg-charcoal/20 hover:bg-charcoal/40'
              }`}
            aria-label={`Aller à l'acte ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
