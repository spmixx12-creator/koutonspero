import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowUpRight, ArrowLeft, ChevronRight } from 'lucide-react';

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1497211419994-14233120dbe4?q=80&w=600&auto=format&fit=crop";

const printDesignImages = [
  "/images/Print Design/Bienvenue chez WADOU TASTY spécialité  choucouya de mouton bio Tacos (5).webp",
  "/images/Print Design/Bienvenue chez WADOU TASTY spécialité.webp",
  "/images/Print Design/Blue Pastry (2).webp",
  "/images/Print Design/Blue Pastry (3).webp",
  "/images/Print Design/Christ Milla-Delights (1).webp",
  "/images/Print Design/Christ Milla-Delights.webp",
  "/images/Print Design/Deviens un Trader Rentable (2).webp",
  "/images/Print Design/Deviens un Trader Rentable (702 x 260 px).webp",
  "/images/Print Design/E-Commerce & Dropshipping (1).webp",
  "/images/Print Design/E-Commerce & Dropshipping (702 x 260 px) (1).webp",
  "/images/Print Design/NETFLIX (1).webp",
  "/images/Print Design/NETFLIX (5).webp",
  "/images/Print Design/NETFLIX (7).webp",
  "/images/Print Design/WhatsApp Image 2025-12-20 at 19.30.14 (1).webp",
  "/images/Print Design/WhatsApp Image 2025-12-20 at 19.30.14.webp",
  "/images/Print Design/laris_house_offers.webp",
  "/images/Print Design/special_pub.webp",
  "/images/Print Design/wadou_tasty_wheel.webp",
  "/images/print_design_1.webp",
  "/images/print_design_2.webp",
  "/images/print_design_3.webp"
];

const socialMediaImages = [
  "/images/Social media/0.webp",
  "/images/Social media/1.webp",
  "/images/Social media/2.webp",
  "/images/Social media/3.webp",
  "/images/Social media/4.webp",
  "/images/Social media/Bannière LinkedIn Professionnel Finances Formes Blanc Indigo Orange Épuré (1).webp",
  "/images/Social media/Bannière LinkedIn Professionnel Finances Formes Blanc Indigo Orange Épuré (2).webp",
  "/images/Social media/Bannière LinkedIn Professionnel Finances Formes Blanc Indigo Orange Épuré.webp",
  "/images/Social media/WhatsApp Image 2025-12-20 at 19.33.30 (1).webp",
  "/images/Social media/WhatsApp Image 2025-12-20 at 19.33.30 (2).webp",
  "/images/Social media/WhatsApp Image 2025-12-20 at 19.33.30 (3).webp",
  "/images/Social media/WhatsApp Image 2025-12-20 at 19.33.30 (4).webp",
  "/images/Social media/WhatsApp Image 2025-12-20 at 19.33.30.webp",
  "/images/Social media/WhatsApp Image 2025-12-20 at 19.33.31 (2).webp",
  "/images/Social media/WhatsApp Image 2025-12-20 at 19.33.31 (3).webp",
  "/images/Social media/WhatsApp Image 2025-12-20 at 19.33.31.webp",
  "/images/Social media/gamplay_annonces.webp",
  "/images/Social media/WhatsApp Image 2025-12-20 at 19.30.14 (1).webp"
];

const brandingImages = [
  "/images/gamplay_logo.webp",
  "/images/blue_pastry_logo.webp",
  "/images/christ_milla_logo_new.webp",
  "/images/laris_house_logo_new.webp",
  "/images/novaflex_logo_new.webp",
  "/images/branding_1.webp",
  "/images/branding_2.webp",
  "/images/branding_3.webp"
];

const motionDesignImages = [
  { type: 'gif', path: '/images/Motion 6.gif' },
  { type: 'local-video', path: '/images/Motion Design/videoplayback (2).mp4' },
  { type: 'local-video', path: '/images/Motion Design/videoplayback.mp4' },
  { type: 'local-video', path: '/images/Motion Design/videoplayback (1).mp4' }
];

const webDesignImages = [
  "/images/Web design/1.webp",
  "/images/Web design/2.webp",
  "/images/Web design/3.webp",
  "/images/Web design/4.webp",
  "/images/Web design/5.webp",
  "/images/Web design/6.webp",
  "/images/Web design/7.webp",
  "/images/Web design/8.webp"
];

const motionImages = [
  "/images/@whodatvillain.webp",
  "/images/Angular Geometry.webp",
  "/images/téléchargement (17).webp",
  "/images/téléchargement (18).webp",
  "/images/téléchargement (19).webp",
  "/images/téléchargement (20).webp",
  "/images/téléchargement (24).webp",
  "/images/téléchargement (26).webp"
];

const categoryData = {
  'Branding': {
    images: brandingImages,
    next: 'Social Media'
  },
  'Social Media': {
    images: socialMediaImages,
    next: 'Motion Design'
  },
  'Motion Design': {
    images: motionDesignImages,
    next: 'Print Design'
  },
  'Print Design': {
    images: printDesignImages,
    next: 'Web Design'
  },
  'Web Design': {
    images: webDesignImages,
    next: 'Motion'
  },
  'Motion': {
    images: motionImages,
    next: null
  }
};

const categoryColors = {
  'Branding': 'rgba(99, 102, 241, 0.4)', // Indigo
  'Social Media': 'rgba(236, 72, 153, 0.4)', // Pink
  'Motion Design': 'rgba(168, 85, 247, 0.4)', // Purple
  'Print Design': 'rgba(59, 130, 246, 0.4)', // Blue
  'Web Design': 'rgba(34, 197, 94, 0.4)', // Green
  'Motion': 'rgba(251, 146, 100, 0.4)', // Warm Purple/Orange for distinction
};

const CategoryCard = ({ category, count, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-transparent backdrop-blur-[2px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-4xl md:text-5xl font-space font-black text-white mb-4 tracking-tight uppercase">
          {category}
        </h3>
        <p className="text-sm font-space text-white/40 uppercase tracking-widest">
          {count} {count > 1 ? 'visuels' : 'visuel'}
        </p>
        <div className="absolute bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ChevronRight size={24} className="text-white/60" />
        </div>
      </div>
    </motion.div>
  );
};

const CategoryGallery = ({ category, onBack, onNextCategory, setCurrentPage }) => {
  const data = categoryData[category];
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#050505] overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between p-6 md:p-12 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 md:border-none md:bg-transparent md:backdrop-blur-none">
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-space uppercase tracking-widest">Retour</span>
        </button>

        <h2 className="text-xl md:text-4xl font-space font-black text-white tracking-tight uppercase">
          {category}
        </h2>

        <div className="w-24 hidden md:block" /> {/* Spacer */}
      </div>

      <div
        data-lenis-prevent
        className="h-full w-full overflow-y-auto md:overflow-y-hidden md:flex md:items-center px-4 md:px-12 pt-24 md:pt-16 pb-32 md:pb-0 touch-auto"
      >
        <div className="w-full md:overflow-x-auto md:snap-x md:snap-mandatory scrollbar-hide md:h-[75vh]">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 md:h-full pb-8 md:pb-8">
            {data.images.map((item, idx) => {
              const isYouTube = typeof item === 'object' && item.type === 'video';
              const isLocalVideo = typeof item === 'object' && item.type === 'local-video';
              const isGif = typeof item === 'object' && item.type === 'gif';

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className={`flex-shrink-0 w-full md:snap-center 
                    ${(isYouTube || isLocalVideo || isGif) ? 'aspect-video md:w-[85vw] md:w-[70vw] lg:w-[60vw] md:aspect-auto md:h-full' : 'aspect-auto md:h-full md:w-auto'} 
                    rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-3xl bg-black/40`}
                >
                  {isYouTube ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${item.id}?rel=0&modestbranding=1&origin=${window.location.origin}`}
                      title={`${category} video ${idx + 1}`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : isLocalVideo ? (
                    <video
                      src={item.path}
                      className="w-full h-full object-contain"
                      controls
                      playsInline
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : isGif ? (
                    <img
                      src={item.path}
                      alt={`${category} ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={item}
                      alt={`${category} ${idx + 1}`}
                      className="w-full h-auto md:h-full md:w-auto object-contain"
                    />
                  )}
                </motion.div>
              );
            })}

            {/* Next Category Trigger */}
            {data.next && (
              <motion.div
                className="flex-shrink-0 w-full h-[300px] md:h-full md:w-auto md:min-w-[400px] md:snap-center flex flex-col items-center justify-center px-12 md:px-32 group cursor-pointer border border-white/5 bg-white/5 rounded-2xl md:rounded-3xl"
                onClick={() => onNextCategory(data.next)}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <p className="text-white/40 font-space uppercase tracking-widest mb-4">Suivant</p>
                <h3 className="text-3xl md:text-6xl font-space font-black text-white group-hover:text-indigo-400 transition-colors uppercase text-center">
                  {data.next}
                </h3>
                <ChevronRight size={48} className="text-white/20 group-hover:text-white mt-8 md:mt-12 transition-all group-hover:translate-x-2" />
              </motion.div>
            )}

            {/* Contact Trigger (Specifically for Motion category) */}
            {category === 'Motion' && (
              <motion.div
                className="flex-shrink-0 w-full h-[300px] md:h-full md:w-auto md:min-w-[400px] md:snap-center flex flex-col items-center justify-center px-12 md:px-32 group cursor-pointer border border-indigo-500/20 bg-indigo-500/5 rounded-2xl md:rounded-3xl"
                onClick={() => setCurrentPage('contact')}
                whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.1)", borderColor: "rgba(99, 102, 241, 0.4)" }}
              >
                <p className="text-indigo-400/60 font-space uppercase tracking-[0.3em] mb-4 text-xs">Un projet en tête ?</p>
                <h3 className="text-3xl md:text-6xl font-space font-black text-white group-hover:text-indigo-400 transition-colors uppercase text-center">
                  Contactez-moi
                </h3>
                <div className="mt-8 md:mt-12 p-6 rounded-full border border-indigo-500/30 group-hover:scale-110 transition-transform">
                  <ChevronRight size={32} className="text-indigo-400" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Hint - Mobile: Scroll Down / Desktop: Scroll Horizontal */}
      <div className="fixed bottom-10 left-0 right-0 flex justify-center md:justify-end md:right-12 md:bottom-12 md:left-auto pointer-events-none z-30">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-600/90 md:bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 flex items-center gap-3 shadow-2xl"
        >
          <span className="text-[10px] md:text-xs font-space font-bold uppercase tracking-widest text-white">
            <span className="md:hidden">Défilez vers le bas</span>
            <span className="hidden md:inline">Scroll horizontal</span>
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronRight size={16} className="hidden md:block text-white" />
            <ArrowUpRight size={16} className="md:hidden rotate-90 text-white" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProjectMarquee = () => (
  <div className="fixed bottom-0 left-0 right-0 py-6 border-t border-white/5 bg-black/50 backdrop-blur-md overflow-hidden z-20">
    <div className="flex animate-marquee whitespace-nowrap">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-12 px-6">
          <span className="text-[10px] font-space text-white/20 tracking-[0.4em] uppercase">Portfolio 2025</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/30" />
          <span className="text-[10px] font-space text-white/20 tracking-[0.4em] uppercase">Mes Réalisations</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/30" />
          <span className="text-[10px] font-space text-white/20 tracking-[0.4em] uppercase">Creative Design</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/30" />
        </div>
      ))}
    </div>
  </div>
);

const Projects = ({ setCurrentPage }) => {
  const [view, setView] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = Object.keys(categoryData);

  return (
    <div className="min-h-screen md:h-screen w-full bg-[#050505] text-white relative overflow-y-auto md:overflow-hidden">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.05]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Color Filter Background Glow */}
      <AnimatePresence>
        {hoveredCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-30 blur-[120px]"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${categoryColors[hoveredCategory] || 'rgba(99, 102, 241, 0.4)'} 0%, transparent 70%)`
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {view === 'categories' && (
          <motion.div
            key="categories"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 pt-32 pb-12 md:py-12 md:h-full flex flex-col md:justify-center"
          >
            <div className="mb-12">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-space font-black tracking-tighter text-white mb-4 uppercase">
                PROJETS<span className="text-indigo-500">.</span>
              </h1>
              <p className="text-lg md:text-xl font-inter text-white/60 max-w-2xl">
                Explorez mes travaux par catégorie
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {categories.map((category) => (
                <CategoryCard
                  key={category}
                  category={category}
                  count={categoryData[category].images.length}
                  onClick={() => {
                    setSelectedCategory(category);
                    setView('gallery');
                  }}
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {view === 'gallery' && selectedCategory && (
          <CategoryGallery
            key={`gallery-${selectedCategory}`}
            category={selectedCategory}
            onBack={() => setView('categories')}
            onNextCategory={(next) => {
              setSelectedCategory(next);
              setHoveredCategory(next);
            }}
            setCurrentPage={setCurrentPage}
          />
        )}
      </AnimatePresence>

      <ProjectMarquee />

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Projects;
