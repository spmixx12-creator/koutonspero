import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1497211419994-14233120dbe4?q=80&w=600&auto=format&fit=crop";

const projectsData = [
  { id: 1, title: 'Post Instagram', client: 'Chrisnaud', category: 'Social Media', image: PLACEHOLDER_IMG, year: '2024' },
  { id: 2, title: 'Affiche Instagram', client: 'Chrisnaud', category: 'Social Media', image: PLACEHOLDER_IMG, year: '2024' },
  { id: 3, title: 'Bannière LinkedIn', client: 'Chrisnaud', category: 'Social Media', image: PLACEHOLDER_IMG, year: '2024' },
  { id: 4, title: 'Montage TikTok', client: 'Chrisnaud', category: 'Motion Design', image: PLACEHOLDER_IMG, year: '2024' },
  { id: 5, title: 'Montage YouTube Motion', client: 'Chrisnaud', category: 'Motion Design', image: PLACEHOLDER_IMG, year: '2024' },
  { id: 6, title: 'Présentation Site', client: 'Chrisnaud', category: 'Motion Design', image: PLACEHOLDER_IMG, year: '2024' },
  { id: 7, title: 'Montage YouTube', client: 'KOUTON Spéro', category: 'Motion Design', image: PLACEHOLDER_IMG, year: '2023' },
  { id: 8, title: 'Affiches Annonces', client: 'GAMPLAY', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2023' },
  { id: 9, title: 'Affiches Publicitaires', client: 'Novaflex', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2023' },
  { id: 10, title: 'Logo GAMPLAY', client: 'GAMPLAY', category: 'Branding', image: PLACEHOLDER_IMG, year: '2022' },
  { id: 11, title: 'Logo Snaki', client: 'Snaki', category: 'Branding', image: PLACEHOLDER_IMG, year: '2022' },
  { id: 12, title: 'Logo Blue Pastry', client: 'Blue Pastry', category: 'Branding', image: "/images/blue_pastry_logo.webp", year: '2022' },
  { id: 13, title: 'Logo Christ Milla', client: 'Christ Milla', category: 'Branding', image: PLACEHOLDER_IMG, year: '2022' },
  { id: 14, title: "Logo Lari's House", client: "Lari's House", category: 'Branding', image: PLACEHOLDER_IMG, year: '2022' },
  { id: 15, title: 'Logo Novaflex', client: 'Novaflex', category: 'Branding', image: PLACEHOLDER_IMG, year: '2022' },
  { id: 16, title: 'Menu Restaurant', client: 'Wadou Tasty', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2022' },
  { id: 17, title: 'Menu Restaurant', client: 'Zitawi', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2022' },
  { id: 18, title: 'Roue de la Fortune', client: 'Wadou Tasty', category: 'Interactive', image: PLACEHOLDER_IMG, year: '2022' },
  { id: 19, title: 'Salon Manucure', client: "Lari's House", category: 'Print Design', image: PLACEHOLDER_IMG, year: '2022' },
  { id: 20, title: 'Pub Spéciale', client: 'Kadox', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2021' },
  { id: 21, title: 'Pub Trading', client: 'Chancel', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2021' },
  { id: 22, title: 'Pub Shopify', client: 'Chancel', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2021' },
  { id: 23, title: 'Web Design', client: 'GAMPLAY', category: 'Web Design', image: PLACEHOLDER_IMG, year: '2021' },
  { id: 24, title: 'Web Design', client: 'Snaki', category: 'Web Design', image: PLACEHOLDER_IMG, year: '2021' }
];

const WheelItem = ({ project, containerRef, index, activeIndex, isFlipped, onToggleFlip }) => {
  const ref = useRef(null);

  // Create transforms based on scroll position relative to THIS item
  // We utilize the scrollYProgress of the item within the container
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start end", "end start"]
  });

  // These values might need tweaking to match the exact "focus center, fade edges" feel
  // center of viewport is roughly 0.5 scrollYProgress
  const distance = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 1]);

  // Z-position: 0 at center, -500 at edges
  const z = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [-500, 0, -500]);

  // Opacity: 1 at center, 0.3 at edges
  const opacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.3, 1, 0.3]);

  // Parallax Effect for Image
  // Moves the image slightly opposite to the scroll direction to create depth
  const yParallax = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  // Blur: 0 at center, 8px at edges
  const blurVal = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [8, 0, 8]);
  const filter = useMotionTemplate`blur(${blurVal}px)`;

  return (
    <motion.div
      ref={ref}
      style={{ z, opacity, filter, transformStyle: "preserve-3d" }}
      className="w-full h-[80vh] flex justify-center items-center py-8"
    >
      <div 
        className="relative w-full h-full max-w-4xl rounded-lg overflow-hidden border border-white/10 group cursor-pointer"
        style={{ 
          transformStyle: "preserve-3d",
          transition: "transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
        onClick={() => onToggleFlip(project.id)}
      >
        {/* FRONT SIDE - Visual Content */}
        <div 
          className="absolute inset-0 bg-cover bg-center rounded-lg overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          {/* Visual Content (Image) with Parallax */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.image})`, y: yParallax, scale: 1.1 }} // Scale needed to avoid edges showing during parallax
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Content (Subtle) */}
          <div className="absolute bottom-8 left-8 text-left z-10">
            <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-2">{project.title}</h3>
            <p className="text-sm font-['Inter'] text-gray-300 tracking-wide uppercase">{project.client} — {project.category}</p>
            <p className="text-xs font-['Inter'] text-gray-400 mt-2">Cliquez pour voir les détails →</p>
          </div>
        </div>

        {/* BACK SIDE - Project Details */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg overflow-hidden border border-white/10"
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="h-full flex flex-col justify-between p-8">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-['Space_Grotesk'] text-white uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-sm font-['Inter'] text-gray-400">
                  {project.year}
                </span>
              </div>
              
              <h3 className="text-4xl font-['Space_Grotesk'] font-bold text-white mb-4">
                {project.title}
              </h3>
              
              <p className="text-xl font-['Inter'] text-gray-300 mb-6">
                Client: {project.client}
              </p>
            </div>

            {/* Project Description */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-300 font-['Inter'] leading-relaxed max-w-md mx-auto">
                    Ce projet représente une création unique dans la catégorie {project.category.toLowerCase()}, 
                    développée spécifiquement pour les besoins de {project.client}.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">Design</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">Créativité</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">Innovation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className="text-xs font-['Inter'] text-gray-500">
                Cliquez pour retourner la carte
              </p>
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
  const containerRef = useRef(null);
  const listRef = useRef(null);

  const [filterRole, setFilterRole] = useState('All');
  const [sortType, setSortType] = useState('Default');

  // Logic
  const uniqueRoles = ['All', ...new Set(projectsData.map(p => p.category))];

  const processedProjects = useMemo(() => {
    let result = [...projectsData];
    if (filterRole !== 'All') result = result.filter(p => p.category === filterRole);
    if (sortType === 'Name') result.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortType === 'Year') result.sort((a, b) => b.year.localeCompare(a.year));
    return result;
  }, [filterRole, sortType]);

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
    setFlippedCards(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  // Auto-Center Left List active item
  useEffect(() => {
    if (listRef.current) {
      // We look for the div with the specific key or index
      // Since we map processedProjects, the children indices match
      const listItems = listRef.current.children;
      const activeItem = listItems[activeIndex];

      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeIndex]);


  // Scroll Hint Logic
  const showScrollHint = activeIndex < 3;

  return (
    <div className="h-screen w-full bg-[#0a0a0a] text-white overflow-hidden relative flex font-['Inter']">

      {/* --- LEFT PANEL (30vw) --- */}
      <div className="hidden md:flex flex-col w-[30vw] h-full bg-[#0a0a0a] relative z-20 border-r border-white/5">

        {/* Title */}
        <div className="p-8 pb-4">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-['Space_Grotesk'] font-bold text-white leading-tight">
            WORK
          </h1>
        </div>
        
        {/* Controls */}
        <div className="px-8 pb-6 space-y-4">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Affiner les projets</h3>
            <div className="flex space-x-2">
              <select 
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="bg-[#1a1a1a] text-white p-2 rounded-md border border-[#333] text-sm focus:ring-1 focus:ring-white"
              >
                {uniqueRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <select 
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="bg-[#1a1a1a] text-white p-2 rounded-md border border-[#333] text-sm focus:ring-1 focus:ring-white"
              >
                <option value="Default">Ordre</option>
                <option value="Name">Nom (A-Z)</option>
                <option value="Year">Année (Récent)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Project List - Scrollable */}
        <div ref={listRef} className="flex-grow overflow-y-auto pr-4 space-y-4 px-8">
          {processedProjects.map((project, index) => (
            <div
              key={project.id}
              className={`cursor-pointer transition-all duration-300 ${
                index === activeIndex 
                  ? 'opacity-100' 
                  : 'opacity-40'
              }`}
              onClick={() => {
                const itemToScroll = document.getElementById(`project-item-${index}`);
                if (itemToScroll) {
                  itemToScroll.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            >
              <div className="flex flex-col">
                <span className={`font-['Space_Grotesk'] text-xl md:text-2xl leading-tight transition-colors ${index === activeIndex ? 'text-white font-medium' : 'text-gray-400 font-light'}`}>
                  {project.title}
                </span>
                <span className="text-xs text-[#666] uppercase tracking-wider mt-1">{project.client}</span>
              </div>
            </div>
          ))}
          {processedProjects.length === 0 && (
            <div className="text-[#555] py-4">No projects found.</div>
          )}
        </div>
      </div>

      {/* --- RIGHT PANEL (70vw) - 3D WHEEL --- */}
      <div
        ref={containerRef}
        className="relative w-full md:w-[70vw] h-full overflow-y-scroll no-scrollbar perspective-container"
        style={{ perspective: "800px", perspectiveOrigin: "center center" }}
      >
        <div className="py-[10vh] flex flex-col items-center w-full transform-style-3d">
          {processedProjects.map((project, index) => (
            <div id={`project-item-${index}`} key={project.id} className="w-full flex justify-center project-item-wrapper">
              <WheelItem
                project={project}
                containerRef={containerRef}
                index={index}
                activeIndex={activeIndex}
                isFlipped={flippedCards[project.id] || false}
                onToggleFlip={toggleCardFlip}
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- SCROLL HINT (Bottom Right) --- */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-12 right-12 z-50 pointer-events-none text-white/40 flex flex-col items-center gap-2"
          >
            <div className="animate-bounce flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest font-['Space_Grotesk']">Scroll to discover</span>
              <ArrowDown size={14} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Projects;
