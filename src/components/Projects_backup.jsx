
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectBand from '@/components/ProjectBand';
import ProjectModal from '@/components/ProjectModal';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    { title: 'Post Instagram', client: 'Chrisnaud', category: 'Social Media' },
    { title: 'Affiche Instagram', client: 'Chrisnaud', category: 'Social Media' },
    { title: 'Bannière LinkedIn', client: 'Chrisnaud', category: 'Social Media' },
    { title: 'Montage TikTok', client: 'Chrisnaud', category: 'Motion Design' },
    { title: 'Montage YouTube Motion Design', client: 'Chrisnaud', category: 'Motion Design' },
    { title: 'Montage YouTube Site Presentation', client: 'Chrisnaud', category: 'Motion Design' },
    { title: 'Montage YouTube', client: 'KOUTON Spéro Précieux', category: 'Motion Design' },
    { title: 'Affiches Annonces', client: 'GAMPLAY', category: 'Print Design' },
    { title: 'Affiches Publicitaires', client: 'Novaflex', category: 'Print Design' },
    { title: 'Logo GAMPLAY', client: 'GAMPLAY', category: 'Branding' },
    { title: 'Logo Snaki', client: 'Snaki', category: 'Branding' },
    { title: 'Logo Blue Pastry', client: 'Blue Pastry', category: 'Branding' },
    { title: 'Logo Christ Milla', client: 'Christ Milla', category: 'Branding' },
    { title: "Logo Lari's House", client: "Lari's House", category: 'Branding' },
    { title: 'Logo Novaflex', client: 'Novaflex', category: 'Branding' },
    { title: 'Affiche Menu Restaurant', client: 'Wadou Tasty', category: 'Print Design' },
    { title: 'Affiche Menu Restaurant', client: 'Zitawi', category: 'Print Design' },
    { title: 'Roue de la Fortune', client: 'Wadou Tasty', category: 'Interactive' },
    { title: 'Affiche Salon Manucure', client: "Lari's House", category: 'Print Design' },
    { title: 'Affiche Pub Spéciale', client: 'Kadox', category: 'Print Design' },
    { title: 'Affiche Pub Trading', client: 'Chancel', category: 'Print Design' },
    { title: 'Affiche Pub Shopify', client: 'Chancel', category: 'Print Design' },
    { title: 'Web Design GAMPLAY', client: 'GAMPLAY', category: 'Web Design' },
    { title: 'Web Design Snaki', client: 'Snaki', category: 'Web Design' }
  ];

  return (
    <div className="h-full w-full overflow-y-auto relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-32">
        {/* Header */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4 relative"
          >
            {/* Backdrop blur to ensure readability against dynamic background */}
            <div className="absolute -inset-4 bg-beige/80 backdrop-blur-sm -z-10 rounded-xl" />
            
            <h1 className="text-6xl md:text-8xl font-cormorant font-bold text-charcoal tracking-tight">
              PROJETS
            </h1>
            <div className="h-1 w-24 bg-lightBrown" />
            <p className="max-w-xl text-lg font-space text-charcoal/60 mt-4">
              Une collection de travaux sélectionnés explorant l'identité de marque, le design numérique et la direction artistique.
            </p>
          </motion.div>
        </div>

        {/* Project List */}
        <div className="flex flex-col gap-4 pb-20 relative">
          <div className="absolute -inset-4 bg-beige/60 backdrop-blur-sm -z-10 rounded-xl h-full" />
          {projects.map((project, index) => (
            <ProjectBand 
              key={index} 
              project={project} 
              index={index} 
              onClick={() => setSelectedProject({ ...project, index })} 
            />
          ))}
        </div>
      </div>

      {/* Modal Expansion */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
