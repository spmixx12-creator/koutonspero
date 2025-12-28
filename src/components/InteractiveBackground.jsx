
import React, { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

const InteractiveBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  // Radial gradient mask for the focus effect that follows the cursor
  const maskImage = useMotionTemplate`radial-gradient(circle 400px at ${mouseX}px ${mouseY}px, black, transparent)`;

  const TextLayer = ({ isFocusLayer }) => (
    <div className="relative w-full h-full flex items-center justify-center">
       <span className={`text-[20vw] font-cormorant font-bold leading-none absolute top-[5%] left-[-2%] rotate-[-5deg] mix-blend-multiply transition-all duration-1000
         ${isFocusLayer ? 'text-charcoal/10 blur-0' : 'text-charcoal/5 blur-[8px]'}`}>
            KOUTON
       </span>
       <span className={`text-[20vw] font-cormorant font-bold leading-none absolute bottom-[15%] right-[-2%] rotate-[5deg] z-0 mix-blend-multiply transition-all duration-1000
         ${isFocusLayer ? 'text-lightBrown/20 blur-0' : 'text-lightBrown/10 blur-[8px]'}`}>
            Spéro.P
       </span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full"
      >
        {/* Background Layer (Blurred/Default - Always Visible) */}
        <div className="absolute inset-0">
           <TextLayer isFocusLayer={false} />
        </div>

        {/* Foreground Layer (Focused/Active - Revealed by Cursor Mask) */}
        <motion.div 
            className="absolute inset-0"
            style={{ maskImage, WebkitMaskImage: maskImage }}
        >
            <TextLayer isFocusLayer={true} />
        </motion.div>
      </motion.div>
      
      {/* Global Noise Overlay integrated here */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" 
      />
    </div>
  );
};

export default InteractiveBackground;
