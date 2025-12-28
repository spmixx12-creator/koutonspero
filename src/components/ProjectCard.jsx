import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{
        y: -10,
        boxShadow: '0 20px 40px rgba(28, 28, 28, 0.15)'
      }}
      className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-lightBrown/20 cursor-pointer group"
    >
      <div className="flex flex-col gap-3">
        <span className="text-xs font-space tracking-widest text-lightBrown uppercase">
          {project.category}
        </span>
        <h3 className="text-2xl font-cormorant font-semibold text-charcoal group-hover:text-lightBrown transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm font-space text-charcoal/70">
          {project.client}
        </p>
      </div>
      
      <motion.div
        className="mt-4 pt-4 border-t border-lightBrown/20"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-xs font-space text-charcoal/50 uppercase tracking-wider">
          Voir le projet →
        </span>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;