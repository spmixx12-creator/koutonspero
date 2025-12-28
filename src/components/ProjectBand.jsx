
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import TypingText from '@/components/TypingText';
import { ArrowUpRight } from 'lucide-react';

const ProjectBand = ({ project, index, onClick }) => {
  const ref = useRef(null);
  
  return (
    <motion.div
      ref={ref}
      layoutId={`project-${index}`}
      initial={{ opacity: 0, y: 100, skewY: 3 }}
      whileInView={{ opacity: 1, y: 0, skewY: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.02,
        zIndex: 10,
        backgroundColor: "rgba(28, 28, 28, 1)" // darker charcoal
      }}
      onClick={() => onClick(project)}
      className="group relative w-full min-h-[180px] md:min-h-[220px] cursor-pointer overflow-hidden rounded-lg bg-charcoal/90 border border-white/5 shadow-lg transform transition-colors duration-500"
    >
      {/* Background Texture & Parallax Effect */}
      <motion.div 
        className="absolute inset-0 opacity-20 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Decorative Gradient Blob */}
      <motion.div 
        className="absolute -right-20 -top-20 w-64 h-64 bg-lightBrown/10 rounded-full blur-3xl"
        whileHover={{ scale: 1.5, opacity: 0.3 }}
        transition={{ duration: 0.8 }}
      />

      <div className="relative z-10 h-full flex flex-col md:flex-row items-start md:items-center justify-between p-8 md:p-12">
        <div className="flex flex-col gap-3 max-w-3xl">
          <div className="flex items-center gap-3 overflow-hidden">
             <span className="text-lightBrown/60 font-space text-xs tracking-[0.2em] uppercase">
              {String(index + 1).padStart(2, '0')} — {project.category}
            </span>
            <motion.div 
              className="h-[1px] bg-lightBrown/40 w-12"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ delay: 0.5 }}
            />
          </div>
          
          <motion.div layoutId={`title-${index}`} className="relative inline-block">
             <TypingText
              text={project.title}
              className="text-3xl md:text-5xl font-cormorant font-medium text-beige group-hover:text-white transition-colors duration-300 block"
              delay={200}
              speed={50}
              showCursor={false}
            />
            {/* Underline Animation */}
            <motion.div 
              className="absolute -bottom-2 left-0 h-[1px] bg-lightBrown"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          <p className="text-charcoal/60 font-space text-sm group-hover:text-beige/60 transition-colors duration-300 mt-2">
             Client: <span className="text-lightBrown">{project.client}</span>
          </p>
        </div>

        {/* Arrow Interaction */}
        <motion.div 
          className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/10 text-white/50 group-hover:bg-lightBrown group-hover:text-charcoal group-hover:border-transparent transition-all duration-300"
          whileHover={{ rotate: 45 }}
        >
          <ArrowUpRight size={24} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectBand;
