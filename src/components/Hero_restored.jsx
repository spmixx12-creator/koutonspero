import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, User, Mail, FileText } from 'lucide-react';
import TypingText from '@/components/TypingText';
import BlurRevealText from '@/components/BlurRevealText';
import NavigationBlocks from '@/components/NavigationBlocks';
import {
  PencilStroke,
  CircleDoodle,
  Scribble,
  Tape,
  DotsPattern,
  SquiggleLine,
  PushPin
} from '@/components/Doodles';

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

        {/* Mobile: Background Image behind buttons */}
        <div className="md:hidden absolute inset-0 flex items-end justify-center z-20 order-2 mb-4">
          {showContent && (
            <motion.img
              src="/images/Gemini_Generated_Image_2imtvm2imtvm2imt-removebg-preview.webp"
              alt="KOUTON Spéro Précieux"
              className="h-[55vh] w-auto object-contain drop-shadow-2xl filter contrast-110"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>

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
                K
              </motion.div>
              <div className="relative drop-shadow-md">
                <BlurRevealText
                  text="KOUTON"
                  className="text-6xl md:text-7xl font-cormorant font-bold text-charcoal leading-none"
                  delay={1500}
                />
                <BlurRevealText
                  text="Spéro.P"
                  className="text-5xl md:text-6xl font-cormorant font-bold text-charcoal leading-none mt-2"
                  delay={2000}
                />
              </div>
              <TypingText
                text="Designer & Creative Thinker"
                className="text-lg md:text-xl font-space text-lightBrown/80 mt-4 block"
                delay={2500}
                speed={50}
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

        {/* Center/Main: Portrait Image - Desktop only */}
        <div className="hidden md:block relative z-10 flex items-center justify-center pointer-events-auto">
          {/* Wrapper to anchor mobile text to image */}
          <div className="relative w-fit h-fit flex justify-center group">
            <motion.img
              src="/images/Gemini_Generated_Image_2imtvm2imtvm2imt-removebg-preview.webp"
              alt="KOUTON Spéro Précieux"
              className="h-[60vh] md:h-[85vh] w-auto object-contain drop-shadow-2xl relative z-10 filter contrast-110"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Mobile Name Overlay - removed, now only in top section */}

          </div>

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
        </div>

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
