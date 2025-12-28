import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ArrowRight, Filter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1497211419994-14233120dbe4?q=80&w=600&auto=format&fit=crop";

const projectsData = [
  { id: 1, title: 'Post Instagram', client: 'Chrisnaud', category: 'Social Media', image: "/images/instagram_post.webp", year: '2024', description: 'Une campagne dynamique sur les réseaux sociaux pour booster l\'engagement.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 2, title: 'Affiche Instagram', client: 'Chrisnaud', category: 'Social Media', image: "/images/instagram_affiche.webp", year: '2024', description: 'Affiches promotionnelles pour Instagram avec une typographie percutante.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 3, title: 'Bannière LinkedIn', client: 'Chrisnaud', category: 'Social Media', image: "/images/chrisnaud_linkedin_banner.webp", year: '2024', description: 'Bannières professionnelles pour renforcer l\'identité corporate.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 4, title: 'Montage TikTok', client: 'Chrisnaud', category: 'Motion Design', image: PLACEHOLDER_IMG, year: '2024', description: 'Editions vidéo rapides et engageantes pour TikTok.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 5, title: 'Montage YouTube Motion', client: 'Chrisnaud', category: 'Motion Design', image: "/images/youtube_motion_preview.webp", year: '2024', description: 'Graphismes animés complexes pour contenus YouTube.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 6, title: 'Présentation Site', client: 'Chrisnaud', category: 'Motion Design', image: "/images/presentation_site_preview.webp", year: '2024', description: 'Présentation vidéo vitrine d\'un lancement de site web.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 7, title: 'Montage YouTube', client: 'KOUTON Spéro', category: 'Motion Design', image: PLACEHOLDER_IMG, year: '2023', description: 'Montage vidéo standard avec structure narrative claire.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 8, title: 'Affiches Annonces', client: 'GAMPLAY', category: 'Print Design', image: "/images/gamplay_annonces.webp", year: '2023', description: 'Affiches pour événements gaming locaux.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 9, title: 'Affiches Publicitaires', client: 'Novaflex', category: 'Print Design', image: "/images/novaflex_ad.webp", year: '2023', description: 'Affiches publicitaires grand format pour le commerce.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 10, title: 'Logo GAMPLAY', client: 'GAMPLAY', category: 'Branding', image: "/images/gamplay_logo.webp", year: '2022', description: 'Design de logo capturant l\'esprit de l\'esport.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 11, title: 'Logo Snaki', client: 'Snaki', category: 'Branding', image: PLACEHOLDER_IMG, year: '2022', description: 'Logo ludique et mémorable pour une marque de snacks.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 12, title: 'Logo Blue Pastry', client: 'Blue Pastry', category: 'Branding', image: "/images/blue_pastry_logo.webp", year: '2022', description: 'Logo élégant pour une pâtisserie artisanale.', galleryImages: ["/images/20250904_1232_Réinventer Blue Pastry_remix_01k4a7v4tcfyzt49dr4zej3zwd (2).webp", "/images/20250904_1357_Logo Bleu Pastry_remix_01k4acpe58e10r1n690rss5nvn (1).webp"] },
  { id: 13, title: 'Logo Christ Milla', client: 'Christ Milla', category: 'Branding', image: "/images/christ_milla_logo_new.webp", year: '2022', description: 'Design de logo pour branding personnel minimaliste.', galleryImages: ["/images/Christ Milla-Delights.webp", "/images/Christ Milla-Delights (1).webp"] },
  { id: 14, title: "Logo Lari's House", client: "Lari's House", category: 'Branding', image: "/images/laris_house_logo_new.webp", year: '2022', description: 'Identité chaleureuse pour un établissement d\'accueil.', galleryImages: ["/images/20250921_1310_Logo LARI'S HOUSE_remix_01k5p2sxw9fmwbr7dsdnc8wqcp.webp", "/images/laris_house_logo_new.webp"] },
  { id: 15, title: 'Logo Novaflex', client: 'Novaflex', category: 'Branding', image: "/images/novaflex_logo_new.webp", year: '2022', description: 'Logo d\'entreprise symbolisant l\'innovation.', galleryImages: ["/images/20250925_1245_Inspiration Logo NOVAFLEX_remix_01k60b0rrkf9xbgznv2wmrrt3t.webp", "/images/20250925_1249_Concept Logo NOVAFLEX_remix_01k60b9aqaes1vk2tkzw8f0na0.webp", "/images/novaflex_logo_new.webp"] },
  { id: 16, title: 'Menu Restaurant', client: 'Wadou Tasty', category: 'Print Design', image: "/images/wadou_tasty_menu_new.webp", year: '2022', description: 'Mise en page de menu améliorant l\'expérience client.', galleryImages: ["/images/Wadou Tasty/Bienvenue chez WADOU TASTY spécialité.webp", "/images/wadou_tasty_menu_new.webp"] },
  { id: 17, title: 'Menu Restaurant', client: 'Zitawi', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2022', description: 'Menu personnalisé reflétant le thème culinaire.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 18, title: 'Roue de la Fortune', client: 'Wadou Tasty', category: 'Interactive', image: "/images/wadou_tasty_wheel.webp", year: '2022', description: 'Concept de jeu interactif pour engagement client.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 19, title: 'Salon Manucure', client: "Lari's House", category: 'Print Design', image: "/images/laris_house_offers.webp", year: '2022', description: 'Supports de marque pour un salon de manucure.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 20, title: 'Pub Spéciale', client: 'Kadox', category: 'Print Design', image: "/images/special_pub.webp", year: '2021', description: 'Matériel promotionnel pour ventes flash.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 21, title: 'Pub Trading', client: 'Chancel', category: 'Print Design', image: "/images/trading_pub.webp", year: '2021', description: 'Affiches informatives pour séminaires de trading.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 22, title: 'Pub Shopify', client: 'Chancel', category: 'Print Design', image: "/images/shopify_pub.webp", year: '2021', description: 'Actifs numériques pour lancement de boutique Shopify.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 23, title: 'Web Design', client: 'GAMPLAY', category: 'Web Design', image: PLACEHOLDER_IMG, year: '2021', description: 'Design web complet axé sur l\'expérience utilisateur.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] },
  { id: 24, title: 'Web Design', client: 'Snaki', category: 'Web Design', image: PLACEHOLDER_IMG, year: '2021', description: 'UI/UX e-commerce pour simplifier l\'achat en ligne.', galleryImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG] }
];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Scroll-triggered reveal animation
    gsap.fromTo(card,
      {
        opacity: 0,
        y: 100,
        scale: 0.9,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 60%',
          scrub: 1,
        }
      }
    );

    // Parallax image effect
    gsap.to(imageRef.current, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      }
    });

    // Magnetic effect
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < 200) {
        gsap.to(card, {
          x: distanceX * 0.1,
          y: distanceY * 0.1,
          rotateY: distanceX * 0.02,
          rotateX: -distanceY * 0.02,
          duration: 0.5,
          ease: 'power2.out'
        });
      } else {
        gsap.to(card, {
          x: 0,
          y: 0,
          rotateY: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="project-card group relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Image Container with Parallax */}
      <div className="relative h-[400px] overflow-hidden">
        <div ref={imageRef} className="absolute inset-0 scale-110">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-space font-bold uppercase tracking-widest text-white/70">
            {project.category}
          </span>
          <span className="text-xs font-space text-white/40">{project.year}</span>
        </div>

        <h3 className="text-3xl md:text-4xl font-space font-black text-white mb-2 tracking-tight leading-none">
          {project.title}
        </h3>

        <p className="text-sm font-space text-white/60 uppercase tracking-wide mb-4">
          {project.client}
        </p>

        {/* Hover Reveal */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <p className="text-white/80 font-inter text-sm leading-relaxed mb-4 max-w-md">
            {project.description}
          </p>
          <div className="flex items-center gap-2 text-indigo-400">
            <span className="text-xs font-space font-bold uppercase tracking-widest">Voir le projet</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const headerRef = useRef(null);

  const categories = ['All', ...new Set(projectsData.map(p => p.category))];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  useEffect(() => {
    // Header entrance animation
    gsap.from(headerRef.current?.children || [], {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.3
    });
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white relative overflow-x-hidden">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.05]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Background Typography */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] z-0">
        <h1 className="text-[20vw] font-space font-black tracking-tighter leading-none text-white uppercase">
          WORK
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24">
        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-indigo-500" />
            <span className="text-xs font-space font-bold uppercase tracking-[0.3em] text-white/50">Portfolio 2025</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-space font-black tracking-tighter leading-none text-white mb-8 uppercase">
            PROJETS<span className="text-indigo-500">.</span>
          </h1>

          <p className="text-xl md:text-2xl font-inter text-white/60 max-w-2xl leading-relaxed">
            Une sélection de travaux qui fusionnent créativité stratégique et excellence technique.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-16">
          <div className="flex items-center gap-2 text-white/40 mr-4">
            <Filter size={16} />
            <span className="text-xs font-space font-bold uppercase tracking-widest">Filtrer</span>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-space text-xs font-bold uppercase tracking-widest transition-all duration-300 ${selectedCategory === cat
                  ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                onClick={() => setSelectedProject(project)}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Gallery Content */}
            <div className="max-w-6xl w-full">
              <div className="mb-8">
                <h2 className="text-5xl font-space font-black text-white mb-4">{selectedProject.title}</h2>
                <div className="flex items-center gap-4 text-white/60">
                  <span className="font-space text-sm uppercase tracking-widest">{selectedProject.client}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="font-space text-sm uppercase tracking-widest">{selectedProject.category}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="font-space text-sm">{selectedProject.year}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {selectedProject.galleryImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => setLightboxIndex(idx)}
                  >
                    <img
                      src={img}
                      alt={`${selectedProject.title} ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex >= 0 && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black flex items-center justify-center p-12"
            onClick={() => setLightboxIndex(-1)}
          >
            <button
              onClick={() => setLightboxIndex(-1)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedProject.galleryImages[lightboxIndex]}
              alt={`${selectedProject.title} view ${lightboxIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-space tracking-[0.3em] uppercase text-white/50">
              {lightboxIndex + 1} / {selectedProject.galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
