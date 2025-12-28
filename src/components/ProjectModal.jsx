
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-charcoal/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        layoutId={`project-${project.index}`}
        className="w-full max-w-4xl bg-beige rounded-lg overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-charcoal/10 hover:bg-charcoal/20 rounded-full transition-colors"
        >
          <X className="text-charcoal" size={24} />
        </button>

        <div className="h-64 bg-charcoal relative overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-6xl font-cormorant font-bold text-beige/10 rotate-[-5deg] select-none">
              {project.client}
            </h2>
          </div>
          <div className="absolute bottom-8 left-8">
            <span className="text-lightBrown font-space text-sm tracking-widest uppercase mb-2 block">
              {project.category}
            </span>
            <motion.h2
              layoutId={`title-${project.index}`}
              className="text-4xl md:text-5xl font-cormorant font-bold text-beige"
            >
              {project.title}
            </motion.h2>
          </div>
        </div>

        <div className="p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h3 className="text-2xl font-cormorant font-semibold text-charcoal">À propos du projet</h3>
              <p className="text-charcoal/80 font-space leading-relaxed">
                Ce projet pour {project.client} a été conçu avec une attention particulière aux détails typographiques et à l'identité visuelle de la marque. L'objectif était de créer une présence forte et mémorable.
              </p>
              <div className="space-y-4">
                <div className="h-48 bg-charcoal/5 rounded-lg flex items-center justify-center border border-charcoal/10 relative overflow-hidden group">
                  <span className="text-charcoal/30 font-space text-sm relative z-10">Aperçu du visuel 1</span>
                  <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-charcoal/10 transition-colors duration-500" />
                </div>
                <div className="h-48 bg-charcoal/5 rounded-lg flex items-center justify-center border border-charcoal/10 relative overflow-hidden group">
                  <span className="text-charcoal/30 font-space text-sm relative z-10">Aperçu du visuel 2</span>
                  <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-charcoal/10 transition-colors duration-500" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-4 bg-white/50 rounded-lg border border-lightBrown/20">
                <h4 className="text-sm font-space text-charcoal/50 uppercase tracking-wider mb-2">Client</h4>
                <p className="text-lg font-cormorant text-charcoal font-semibold">{project.client}</p>
              </div>
              <div className="p-4 bg-white/50 rounded-lg border border-lightBrown/20">
                <h4 className="text-sm font-space text-charcoal/50 uppercase tracking-wider mb-2">Service</h4>
                <p className="text-lg font-cormorant text-charcoal font-semibold">{project.category}</p>
              </div>
              <div className="p-4 bg-white/50 rounded-lg border border-lightBrown/20">
                <h4 className="text-sm font-space text-charcoal/50 uppercase tracking-wider mb-2">Année</h4>
                <p className="text-lg font-cormorant text-charcoal font-semibold">2025</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
