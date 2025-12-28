import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1497211419994-14233120dbe4?q=80&w=600&auto=format&fit=crop";

const baseProjectsData = [
  { id: 1, title: 'Post Instagram', client: 'Chrisnaud', category: 'Social Media', image: "/images/instagram_post.webp", year: '2024', imgColor: '#8b5cf6', description: 'Une campagne dynamique sur les réseaux sociaux pour booster l\'engagement.' },
  { id: 2, title: 'Affiche Instagram', client: 'Chrisnaud', category: 'Social Media', image: "/images/instagram_affiche.webp", year: '2024', imgColor: '#6d28d9', description: 'Affiches promotionnelles pour Instagram avec une typographie percutante.' },
  { id: 3, title: 'Bannière LinkedIn', client: 'Chrisnaud', category: 'Social Media', image: "/images/chrisnaud_linkedin_banner.webp", year: '2024', imgColor: '#2b23a5', description: 'Bannières professionnelles pour renforcer l\'identité corporate.' },
  { id: 4, title: 'Montage TikTok', client: 'Chrisnaud', category: 'Motion Design', image: PLACEHOLDER_IMG, year: '2024', imgColor: '#000000', description: 'Editions vidéo rapides et engageantes pour TikTok.' },
  { id: 5, title: 'Montage YouTube Motion', client: 'Chrisnaud', category: 'Motion Design', image: "/images/youtube_motion_preview.webp", year: '2024', imgColor: '#0f172a', description: 'Graphismes animés complexes pour contenus YouTube.' },
  { id: 6, title: 'Présentation Site', client: 'Chrisnaud', category: 'Motion Design', image: "/images/presentation_site_preview.webp", year: '2024', imgColor: '#0f172a', description: 'Présentation vidéo vitrine d\'un lancement de site web.' },
  { id: 7, title: 'Montage YouTube', client: 'KOUTON Spéro', category: 'Motion Design', image: PLACEHOLDER_IMG, year: '2023', imgColor: '#ff0000', description: 'Montage vidéo standard avec structure narrative claire.' },
  { id: 8, title: 'Affiches Annonces', client: 'GAMPLAY', category: 'Print Design', image: "/images/gamplay_annonces.webp", year: '2023', imgColor: '#9b1c1c', description: 'Affiches pour événements gaming locaux.' },
  { id: 9, title: 'Affiches Publicitaires', client: 'Novaflex', category: 'Print Design', image: "/images/novaflex_ad.webp", year: '2023', imgColor: '#6a0dad', description: 'Affiches publicitaires grand format pour le commerce.' },
  { id: 10, title: 'Logo GAMPLAY', client: 'GAMPLAY', category: 'Branding', image: "/images/gamplay_logo.webp", year: '2022', imgColor: '#e11d48', description: 'Design de logo capturant l\'esprit de l\'esport.' },
  { id: 11, title: 'Logo Snaki', client: 'Snaki', category: 'Branding', image: PLACEHOLDER_IMG, year: '2022', imgColor: '#f8e71c', description: 'Logo ludique et mémorable pour une marque de snacks.' },
  { id: 12, title: 'Logo Blue Pastry', client: 'Blue Pastry', category: 'Branding', image: "/images/blue_pastry_logo.webp", year: '2022', imgColor: '#4a90e2', description: 'Logo élégant pour une pâtisserie artisanale.' },
  { id: 13, title: 'Logo Christ Milla', client: 'Christ Milla', category: 'Branding', image: "/images/christ_milla_logo_new.webp", year: '2022', imgColor: '#b499e1', description: 'Design de logo pour branding personnel minimaliste.' },
  { id: 14, title: "Logo Lari's House", client: "Lari's House", category: 'Branding', image: "/images/laris_house_logo_new.webp", year: '2022', imgColor: '#8a6e3d', description: 'Identité chaleureuse pour un établissement d\'accueil.' },
  { id: 15, title: 'Logo Novaflex', client: 'Novaflex', category: 'Branding', image: "/images/novaflex_logo_new.webp", year: '2022', imgColor: '#FF0000', description: 'Logo d\'entreprise symbolisant l\'innovation.' },
  { id: 16, title: 'Menu Restaurant', client: 'Wadou Tasty', category: 'Print Design', image: "/images/wadou_tasty_menu_new.webp", year: '2022', imgColor: '#2d5a27', description: 'Mise en page de menu améliorant l\'expérience client.' },
  { id: 17, title: 'Menu Restaurant', client: 'Zitawi', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2022', imgColor: '#d0021b', description: 'Menu personnalisé reflétant le thème culinaire.' },
  { id: 18, title: 'Roue de la Fortune', client: 'Wadou Tasty', category: 'Interactive', image: "/images/wadou_tasty_wheel.webp", year: '2022', imgColor: '#ff8c00', description: 'Concept de jeu interactif pour engagement client.' },
  { id: 19, title: 'Salon Manucure', client: "Lari's House", category: 'Print Design', image: "/images/laris_house_offers.webp", year: '2022', imgColor: '#4a0e2e', description: 'Supports de marque pour un salon de manucure.' },
  { id: 20, title: 'Pub Spéciale', client: 'Kadox', category: 'Print Design', image: "/images/special_pub.webp", year: '2021', imgColor: '#0047ba', description: 'Matériel promotionnel pour ventes flash.' },
  { id: 21, title: 'Pub Trading', client: 'Chancel', category: 'Print Design', image: "/images/trading_pub.webp", year: '2021', imgColor: '#001d4a', description: 'Affiches informatives pour séminaires de trading.' },
  { id: 22, title: 'Pub Shopify', client: 'Chancel', category: 'Print Design', image: "/images/shopify_pub.webp", year: '2021', imgColor: '#95d600', description: 'Actifs numériques pour lancement de boutique Shopify.' },
  { id: 23, title: 'Web Design', client: 'GAMPLAY', category: 'Web Design', image: PLACEHOLDER_IMG, year: '2021', imgColor: '#4a90e2', description: 'Design web complet axé sur l\'expérience utilisateur.' },
  { id: 24, title: 'Web Design', client: 'Snaki', category: 'Web Design', image: PLACEHOLDER_IMG, year: '2021', imgColor: '#f5a623', description: 'UI/UX e-commerce pour simplifier l\'achat en ligne.' }
];

const projectsData = baseProjectsData.map(p => {
  const galleries = {
    1: [PLACEHOLDER_IMG, PLACEHOLDER_IMG, PLACEHOLDER_IMG, PLACEHOLDER_IMG],
    2: [PLACEHOLDER_IMG, PLACEHOLDER_IMG, PLACEHOLDER_IMG, PLACEHOLDER_IMG],
    3: [PLACEHOLDER_IMG, PLACEHOLDER_IMG, PLACEHOLDER_IMG, PLACEHOLDER_IMG],
    12: ["/images/20250904_1232_Réinventer Blue Pastry_remix_01k4a7v4tcfyzt49dr4zej3zwd (2).webp", "/images/20250904_1357_Logo Bleu Pastry_remix_01k4acpe58e10r1n690rss5nvn (1).webp"],
    13: ["/images/Christ Milla-Delights.webp", "/images/Christ Milla-Delights (1).webp"],
    14: ["/images/20250921_1310_Logo LARI'S HOUSE_remix_01k5p2sxw9fmwbr7dsdnc8wqcp.webp", "/images/laris_house_logo_new.webp"],
    15: ["/images/20250925_1245_Inspiration Logo NOVAFLEX_remix_01k60b0rrkf9xbgznv2wmrrt3t.webp", "/images/20250925_1249_Concept Logo NOVAFLEX_remix_01k60b9aqaes1vk2tkzw8f0na0.webp", "/images/novaflex_logo_new.webp"],
    16: ["/images/Wadou Tasty/Bienvenue chez WADOU TASTY spécialité.webp", "/images/wadou_tasty_menu_new.webp"]
  };
  return {
    ...p,
    galleryImages: galleries[p.id] || [PLACEHOLDER_IMG, PLACEHOLDER_IMG]
  };
});

const WheelItem = ({ project, containerRef, index, activeIndex, isFlipped, onToggleFlip, onShowGallery }) => {
  const ref = useRef(null);

  // Create transforms based on scroll position relative to THIS item
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start end", "end start"]
  });

  const z = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [-500, 0, -500]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.3, 1, 0.3]);
  const yParallax = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const blurVal = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [8, 0, 8]);
  const filter = useMotionTemplate`blur(${blurVal}px)`;

  return (
    <motion.div
      ref={ref}
      style={{ z, opacity, filter, transformStyle: "preserve-3d" }}
      className={`w-full h-[80vh] flex justify-center items-center py-8 project-item ${index === activeIndex ? 'is-focused' : ''}`}
    >
      <div
        className="visual-card relative w-full h-full max-w-4xl rounded-lg cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 1s cubic-bezier(0.4, 0.0, 0.2, 1)",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
        onClick={() => onToggleFlip(project.id)}
      >
        {/* Face Avant (Front) */}
        <div
          className="face-front absolute inset-0 rounded-lg overflow-hidden border border-white/10"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg) translateZ(1px)",
            zIndex: 2
          }}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.image})`, y: yParallax, scale: 1.1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 text-left z-10">
            <h3 className="text-4xl font-space font-bold text-beige mb-3">{project.title}</h3>
            <p className="text-base font-space text-beige/80 tracking-wide uppercase font-light">
              {project.client} <span className="mx-2 opacity-30">|</span> {project.category}
            </p>
            <div className="mt-6 flex items-center gap-2 group/btn">
              <span className="text-xs font-space text-beige/50 uppercase tracking-widest">clic pour en savoir plus</span>
              <div className="w-8 h-[1px] bg-white/30 transition-all group-hover/btn:w-12 group-hover/btn:bg-white" />
            </div>
          </div>
        </div>

        {/* Face Arrière (Back) */}
        <div
          className="face-back absolute inset-0 rounded-lg overflow-hidden border border-white/10"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "#0a0a0a",
            zIndex: 1
          }}
        >
          <div className="relative h-full flex flex-col justify-between p-12 text-beige z-10">
            <div>
              <div className="flex items-center justify-between mb-10">
                <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-space uppercase tracking-[0.2em]">
                  {project.category}
                </span>
                <span className="text-sm font-space opacity-50">
                  {project.year}
                </span>
              </div>
              <h3 className="text-6xl font-space font-bold mb-6 leading-[0.9]">
                {project.title}
              </h3>
              <div className="w-20 h-[1px] bg-white/40 mb-10" />
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest opacity-40">Client</span>
                <p className="text-3xl font-space font-medium">
                  {project.client}
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center max-w-2xl">
              <p className="text-beige text-2xl font-space leading-relaxed font-light mb-8">
                {project.description}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShowGallery(project);
                }}
                className="group/gallery w-fit flex items-center gap-4 px-8 py-4 bg-white/10 hover:bg-white text-beige hover:text-black transition-all duration-500 rounded-full border border-white/20 backdrop-blur-md"
              >
                <span className="text-xs font-space font-bold uppercase tracking-[0.2em]">Afficher les vues</span>
                <div className="w-8 h-[1px] bg-current transition-all group-hover/gallery:w-12" />
              </button>
            </div>

            <div className="mt-12 pt-10 border-t border-white/10 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest opacity-30">Portfolio</span>
                <span className="text-xs font-space font-bold">KOUTON SPÉRO PRÉCIEUX</span>
              </div>
              <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                <span className="text-[10px] uppercase tracking-widest">Retourner</span>
                <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});
  const [selectedGalleryProject, setSelectedGalleryProject] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const containerRef = useRef(null);
  const listRef = useRef(null);

  const [filterRole, setFilterRole] = useState('All');


  // Logic
  const uniqueRoles = ['All', ...new Set(projectsData.map(p => p.category))];

  const processedProjects = useMemo(() => {
    let result = [...projectsData];
    if (filterRole !== 'All') result = result.filter(p => p.category === filterRole);
    // Always sort by name (A-Z)
    result.sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [filterRole]);

  // Scroll Sync Detection
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const itemHeight = window.innerHeight * 0.8; // 80vh approx height
      // Center of the viewport calculation
      const scrollCenter = container.scrollTop + (container.clientHeight / 2);

      // Find which item is closest to center
      // Note: We have py-[45vh] padding, so the first item starts lower
      // Simplified Logic: Index based on scroll top adjusted for padding
      // Actually, getting center element via elementFromPoint or simple math is robust.

      // Let's use simple math based on known item heights.
      // Each item container is roughly 80vh height total including padding?
      // In the WheelItem, it's h-[80vh] + py-8 (which is inside).
      // Let's assume h-[80vh] is the block size.

      const children = container.querySelectorAll('.project-item-wrapper');
      let closestIndex = 0;
      let minDistance = Infinity;

      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        // Distance from center of screen
        const dist = Math.abs((rect.top + rect.height / 2) - (window.innerHeight / 2));
        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Initial call
      handleScroll();
    }
    return () => container && container.removeEventListener('scroll', handleScroll);
  }, [processedProjects]);

  const toggleCardFlip = (projectId) => {
    setFlippedCards(prev => {
      const newState = { ...prev, [projectId]: !prev[projectId] };

      // Ensure only the focused card can be flipped
      const focusedProject = processedProjects[activeIndex];
      if (focusedProject && focusedProject.id !== projectId) {
        return prev; // Don't flip if not the focused card
      }

      return newState;
    });
  };

  // Auto-Center Left List active item + Enhanced initial focus
  useEffect(() => {
    if (listRef.current) {
      const listItems = listRef.current.children;
      const activeItem = listItems[activeIndex];

      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeIndex]);

  const handleShowGallery = (project) => {
    setSelectedGalleryProject(prev => (prev && prev.id === project.id ? null : project));
  };

  // Reset flipped cards when active index changes
  useEffect(() => {
    setFlippedCards({});
  }, [activeIndex]);

  // Enhanced initial focus - center first item on load
  useEffect(() => {
    if (processedProjects.length > 0 && containerRef.current) {
      const firstItem = containerRef.current.querySelector('.project-item-wrapper');
      if (firstItem) {
        const itemTop = firstItem.offsetTop;
        const itemHeight = firstItem.offsetHeight;
        const scrollPosition = itemTop - (containerRef.current.clientHeight / 2) + (itemHeight / 2);

        containerRef.current.scrollTo({
          top: scrollPosition,
          behavior: 'instant'
        });
      }
    }
  }, [processedProjects.length]);


  // Scroll Hint Logic
  const showScrollHint = activeIndex < 3 && !selectedGalleryProject;

  return (
    <div className="h-screen w-full bg-[#050505] text-beige overflow-hidden relative flex font-space">

      {/* --- LEFT PANEL (30vw) --- */}
      <div className="hidden md:flex flex-col w-[30vw] h-full bg-[#050505] relative z-20 border-r border-white/5">
        <AnimatePresence mode="wait">
          {!selectedGalleryProject ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col h-full"
            >
              <div className="p-8 pb-4 shrink-0 bg-[#050505] z-30">
                <h1 className="font-space font-bold text-[6vw] leading-none tracking-tighter text-beige mb-2">
                  WORK
                </h1>
                <p className="text-beige/60 font-space text-sm tracking-wide mb-6">
                  Affiner les projets
                </p>

                <div className="flex flex-col gap-4 w-full">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-xs uppercase tracking-widest text-beige/40 font-space">Filter</span>
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="bg-transparent text-beige text-sm focus:outline-none cursor-pointer font-space text-right"
                    >
                      <option value="All">All Roles</option>
                      {uniqueRoles.filter(r => r !== 'All').map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>

                </div>
              </div>

              <div ref={listRef} className="flex-1 overflow-y-auto no-scrollbar px-8 pb-12 space-y-4">
                {processedProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`transition-all duration-300 ease-out cursor-pointer group select-none ${index === activeIndex
                      ? 'opacity-100 translate-x-2'
                      : 'opacity-40 hover:opacity-70'
                      }`}
                    onClick={() => {
                      const target = document.getElementById(`project-item-${index}`);
                      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                  >
                    <div className="flex flex-col">
                      <span className={`font-space text-xl md:text-2xl leading-tight transition-colors ${index === activeIndex ? 'text-beige font-medium' : 'text-gray-400 font-light'}`}>
                        {project.title}
                      </span>
                      <span className="text-xs text-beige/40 uppercase tracking-wider mt-1">{project.client}</span>
                    </div>
                  </div>
                ))}
                {processedProjects.length === 0 && (
                  <div className="text-beige/40 py-4">No projects found.</div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col h-full"
            >
              <div className="p-8 pb-4 shrink-0 bg-[#050505] z-30">
                <button
                  onClick={() => setSelectedGalleryProject(null)}
                  className="group flex items-center gap-3 text-beige/50 hover:text-beige transition-colors mb-8"
                >
                  <svg className="w-4 h-4 transform rotate-180 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span className="text-xs uppercase tracking-widest font-space">Retour aux projets</span>
                </button>

                <h2 className="font-space font-bold text-4xl leading-tight tracking-tight text-beige mb-2">
                  {selectedGalleryProject?.title}
                </h2>
                <p className="text-beige/60 font-space text-sm tracking-wide mb-8 uppercase">
                  Galerie · {selectedGalleryProject?.category}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar px-8 pb-12">
                <div className="grid grid-cols-2 gap-4">
                  {selectedGalleryProject?.galleryImages?.map((img, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative aspect-[4/5] rounded-lg overflow-hidden cursor-pointer border border-white/10 group"
                      onClick={() => setLightboxIndex(idx)}
                    >
                      <img
                        src={img}
                        alt={`${selectedGalleryProject?.title} ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- RIGHT PANEL (70vw) - 3D WHEEL --- */}
      <div
        ref={containerRef}
        className="relative w-full md:w-[70vw] h-full overflow-y-scroll no-scrollbar perspective-container snap-y snap-mandatory"
        style={{ perspective: "800px", perspectiveOrigin: "center center" }}
      >
        <div className="py-[10vh] flex flex-col items-center w-full transform-style-3d">
          {processedProjects.map((project, index) => (
            <div
              id={`project-item-${index}`}
              key={project.id}
              className="w-full flex justify-center project-item-wrapper snap-center"
              data-index={index}
            >
              <WheelItem
                project={project}
                containerRef={containerRef}
                index={index}
                activeIndex={activeIndex}
                isFlipped={flippedCards[project.id] || false}
                onToggleFlip={toggleCardFlip}
                onShowGallery={handleShowGallery}
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {lightboxIndex >= 0 && selectedGalleryProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4 md:p-12 select-none"
            onKeyDown={(e) => {
              if (e.key === 'Escape') setLightboxIndex(-1);
              if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev + 1) % selectedGalleryProject.galleryImages.length);
              if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev - 1 + selectedGalleryProject.galleryImages.length) % selectedGalleryProject.galleryImages.length);
            }}
            tabIndex={0}
            ref={(node) => node?.focus()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(-1)}
              className="absolute top-8 right-8 text-beige/50 hover:text-beige transition-colors z-[110]"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={() => setLightboxIndex(prev => (prev - 1 + selectedGalleryProject.galleryImages.length) % selectedGalleryProject.galleryImages.length)}
              className="absolute left-8 top-1/2 -translate-y-1/2 text-beige/30 hover:text-beige transition-colors hidden md:block"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setLightboxIndex(prev => (prev + 1) % selectedGalleryProject.galleryImages.length)}
              className="absolute right-8 top-1/2 -translate-y-1/2 text-beige/30 hover:text-beige transition-colors hidden md:block"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Container */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-full max-h-full flex items-center justify-center"
            >
              <img
                src={selectedGalleryProject?.galleryImages?.[lightboxIndex]}
                alt={`${selectedGalleryProject?.title} view ${lightboxIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              />

              {/* Counter */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs font-space tracking-[0.3em] uppercase opacity-50">
                {lightboxIndex + 1} / {selectedGalleryProject?.galleryImages?.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SCROLL HINT (Bottom Right) --- */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-12 right-12 z-50 pointer-events-none text-beige/40 flex flex-col items-center gap-2"
          >
            <div className="animate-bounce flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest font-space">Scroll to discover</span>
              <ArrowDown size={14} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Projects;
