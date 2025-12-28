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
    </div>
  );
};

export default Hero;
