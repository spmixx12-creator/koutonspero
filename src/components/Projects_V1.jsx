import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { ArrowDown, X } from 'lucide-react';

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1497211419994-14233120dbe4?q=80&w=400&auto=format&fit=crop";

const projectsData = [
    { id: 1, title: 'Post Instagram', client: 'Chrisnaud', category: 'Social Media', image: PLACEHOLDER_IMG, year: '2024', description: 'A vibrant social media campaign designed to boost engagement through dynamic visuals and strategic storytelling.' },
    { id: 2, title: 'Affiche Instagram', client: 'Chrisnaud', category: 'Social Media', image: PLACEHOLDER_IMG, year: '2024', description: 'Promotional posters created for Instagram stories and feeds, focusing on high-impact typography and brand colors.' },
    { id: 3, title: 'Bannière LinkedIn', client: 'Chrisnaud', category: 'Social Media', image: "/images/chrisnaud_linkedin_banner.webp", year: '2024', description: 'Professional LinkedIn banner design created to strengthen corporate identity and personal branding.' },
    { id: 4, title: 'Montage TikTok', client: 'Chrisnaud', category: 'Motion Design', image: PLACEHOLDER_IMG, year: '2024', description: 'Fast-paced, engaging video editing for TikTok, utilizing trending audio and visual effects to capture audience attention.' },
    { id: 5, title: 'Montage YouTube Motion', client: 'Chrisnaud', category: 'Motion Design', image: PLACEHOLDER_IMG, year: '2024', description: 'Complex motion graphics and video editing for YouTube content, adding professional polish and narrative flow.' },
    { id: 6, title: 'Présentation Site', client: 'Chrisnaud', category: 'Motion Design', image: PLACEHOLDER_IMG, year: '2024', description: 'Video presentation showcasing the features and design of a new website launch.' },
    { id: 7, title: 'Montage YouTube', client: 'KOUTON Spéro', category: 'Motion Design', image: PLACEHOLDER_IMG, year: '2023', description: 'Standard YouTube video editing focusing on clear narrative structure and clean cuts.' },
    { id: 8, title: 'Affiches Annonces', client: 'GAMPLAY', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2023', description: 'Series of print advertisements designed for local distribution to promote upcoming gaming events.' },
    { id: 9, title: 'Affiches Publicitaires', client: 'Novaflex', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2023', description: 'Large-scale advertising posters for retail environments, emphasizing product features and brand benefits.' },
    { id: 10, title: 'Logo GAMPLAY', client: 'GAMPLAY', category: 'Branding', image: PLACEHOLDER_IMG, year: '2022', description: 'Logo design for a gaming community, capturing the energy and competitive spirit of esports.' },
    { id: 11, title: 'Logo Snaki', client: 'Snaki', category: 'Branding', image: PLACEHOLDER_IMG, year: '2022', description: 'Playful and memorable logo design for a snack brand, utilizing bold shapes and appetizing colors.' },
    { id: 12, title: 'Logo Blue Pastry', client: 'Blue Pastry', category: 'Branding', image: PLACEHOLDER_IMG, year: '2022', description: 'Elegant and sophisticated logo for a boutique pastry shop, reflecting artisanal quality.' },
    { id: 13, title: 'Logo Christ Milla', client: 'Christ Milla', category: 'Branding', image: "/images/christ_milla_logo_new.webp", year: '2022', description: 'Personal branding logo design, focusing on minimalism and professional appeal.' },
    { id: 14, title: "Logo Lari's House", client: "Lari's House", category: 'Branding', image: "/images/laris_house_logo_new.webp", year: '2022', description: 'Welcoming and warm logo identity for a hospitality business.' },
    { id: 15, title: 'Logo Novaflex', client: 'Novaflex', category: 'Branding', image: "/images/20250925_1253_Inspiration Logo NOVAFLEX_remix_01k60benbcfvsr854y361t7wqg.webp", year: '2022', description: 'Corporate logo design symbolizing flexibility and innovation in business solutions.' },
    { id: 16, title: 'Menu Restaurant', client: 'Wadou Tasty', category: 'Print Design', image: "/images/wadou_tasty_menu_new.webp", year: '2022', description: 'Menu layout and design that enhances the dining experience through clear typography and appetizing imagery.' },
    { id: 17, title: 'Menu Restaurant', client: 'Zitawi', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2022', description: 'Custom menu design reflecting the cultural theme and culinary style of the restaurant.' },
    { id: 18, title: 'Roue de la Fortune', client: 'Wadou Tasty', category: 'Interactive', image: PLACEHOLDER_IMG, year: '2022', description: 'Interactive game concept and design used for customer engagement and promotional giveaways.' },
    { id: 19, title: 'Salon Manucure', client: "Lari's House", category: 'Print Design', image: PLACEHOLDER_IMG, year: '2022', description: 'Branding materials including business cards and price lists for a nail salon.' },
    { id: 20, title: 'Pub Spéciale', client: 'Kadox', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2021', description: 'Special edition promotional material for a holiday sales event.' },
    { id: 21, title: 'Pub Trading', client: 'Chancel', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2021', description: 'Informational flyers and posters for a trading seminar.' },
    { id: 22, title: 'Pub Shopify', client: 'Chancel', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2021', description: 'Digital and print assets created to promote a new Shopify e-commerce store launch.' },
    { id: 23, title: 'Web Design', client: 'GAMPLAY', category: 'Web Design', image: PLACEHOLDER_IMG, year: '2021', description: 'Full website design focusing on user experience and conversion for a gaming platform.' },
    { id: 24, title: 'Web Design', client: 'Snaki', category: 'Web Design', image: PLACEHOLDER_IMG, year: '2021', description: 'E-commerce website UI/UX design to facilitate easy browsing and purchasing of snack products.' }
];

const ProjectItem = ({ project, containerRef, hasSelection, isSelected, onClick }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        container: containerRef,
        offset: ["start end", "end start"]
    });

    // Physics Logic
    const z = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [-500, 0, -500]);
    const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.8, 1, 0.8]);
    const opacityBase = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.1, 1, 0.1]);
    const blurValueBase = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [8, 0, 8]);

    // Derived transforms for selection state
    // If selection exists but THIS item is not selected, fade it out deeply
    const opacity = useTransform(() => {
        const base = opacityBase.get();
        if (hasSelection && !isSelected) return base * 0.1; // Dim non-selected
        if (hasSelection && isSelected) return 1; // Highlight selected
        return base;
    });

    const blur = useTransform(() => {
        const base = blurValueBase.get();
        if (hasSelection && !isSelected) return base + 5; // Extra blur for non-selected
        if (hasSelection && isSelected) return 0; // Sharp for selected
        return base;
    });

    const filter = useMotionTemplate`blur(${blur}px)`;

    return (
        <motion.div
            ref={ref}
            style={{ z, scale, opacity, filter, transformStyle: "preserve-3d" }}
            className="w-full flex justify-center items-center py-8 transform-gpu snap-center snap-always"
        >
            <div
                onClick={onClick}
                className={`w-full max-w-4xl relative flex items-center justify-between group cursor-pointer h-[150px] px-8 border-b transition-colors duration-300 ${isSelected ? 'border-white' : 'border-[#1a1a1a] hover:border-white/20'}`}
                data-role={project.category}
                data-year={project.year}
                data-project-name={project.title}
            >
                {/* Client */}
                <span className={`w-[30%] text-left font-['Space_Grotesk'] text-4xl md:text-5xl font-bold tracking-tight transition-colors ${isSelected ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>
                    {project.client}
                </span>

                {/* Role */}
                <span className="w-[40%] text-center font-['Inter'] text-sm md:text-base font-light tracking-wide text-[#888] uppercase">
                    {project.category}
                </span>

                {/* Title/Type */}
                <span className="w-[30%] text-right font-['Inter'] text-sm md:text-base font-medium text-[#555]">
                    {project.title}
                </span>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [filterRole, setFilterRole] = useState('All');
    const [sortType, setSortType] = useState('Default');
    const [selectedProject, setSelectedProject] = useState(null);
    const containerRef = useRef(null);

    // Logic
    const uniqueRoles = ['All', ...new Set(projectsData.map(p => p.category))];

    const processedProjects = useMemo(() => {
        let result = [...projectsData];
        if (filterRole !== 'All') result = result.filter(p => p.category === filterRole);
        if (sortType === 'Name') result.sort((a, b) => a.title.localeCompare(b.title));
        else if (sortType === 'Year') result.sort((a, b) => b.year.localeCompare(a.year));
        return result;
    }, [filterRole, sortType]);

    const selectedProjectData = useMemo(() =>
        projectsData.find(p => p.id === selectedProject),
        [selectedProject]);

    // Scroll Hint Logic
    const { scrollY } = useScroll({ container: containerRef });
    const hintOpacity = useTransform(scrollY, [0, 800], [1, 0]); // Fade out after approx 4 items

    // Initial Center Scroll & Reset on Filter Change
    useEffect(() => {
        if (containerRef.current && processedProjects.length > 0) {
            containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [filterRole, sortType]);

    return (
        <div className="h-screen w-full bg-[#0a0a0a] text-white overflow-hidden relative flex font-['Inter'] selection:bg-white/20">

            {/* --- LEFT PANEL (30%) --- */}
            <div className="hidden md:flex flex-col w-[30vw] h-full border-r border-[#1a1a1a] bg-[#0a0a0a] relative z-20 p-12 justify-center">
                <AnimatePresence mode="wait">
                    {!selectedProject ? (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col h-full justify-center"
                        >
                            {/* Massive Title */}
                            <h1 className="font-['Space_Grotesk'] font-bold text-[8vw] leading-none tracking-tighter text-white mb-12">
                                WORK
                            </h1>

                            {/* Controls */}
                            <div className="flex flex-col gap-6 w-full max-w-xs">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase tracking-widest text-[#555] font-['Space_Grotesk']">Filter</label>
                                    <select
                                        value={filterRole}
                                        onChange={(e) => setFilterRole(e.target.value)}
                                        className="bg-transparent text-white border-b border-[#333] pb-2 focus:outline-none focus:border-white cursor-pointer text-lg font-['Space_Grotesk']"
                                    >
                                        <option value="All">All Roles</option>
                                        {uniqueRoles.filter(r => r !== 'All').map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase tracking-widest text-[#555] font-['Space_Grotesk']">Sort By</label>
                                    <select
                                        value={sortType}
                                        onChange={(e) => setSortType(e.target.value)}
                                        className="bg-transparent text-white border-b border-[#333] pb-2 focus:outline-none focus:border-white cursor-pointer text-lg font-['Space_Grotesk']"
                                    >
                                        <option value="Default">Default</option>
                                        <option value="Name">Name (A-Z)</option>
                                        <option value="Year">Year (Newest)</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col h-full justify-between py-12"
                        >
                            {/* Detail Content */}
                            <div className="overflow-y-auto pr-4 custom-scrollbar">
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="mb-8 p-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                <div className="space-y-8">
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                        <span className="text-xs uppercase tracking-widest text-[#555] font-['Space_Grotesk'] block mb-2">Client</span>
                                        <h2 className="text-5xl font-['Space_Grotesk'] font-bold leading-none">{selectedProjectData.client}</h2>
                                    </motion.div>

                                    <div className="flex gap-8">
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                            <span className="text-xs uppercase tracking-widest text-[#555] font-['Space_Grotesk'] block mb-1">Year</span>
                                            <span className="text-xl font-['Space_Grotesk']">{selectedProjectData.year}</span>
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                            <span className="text-xs uppercase tracking-widest text-[#555] font-['Space_Grotesk'] block mb-1">Role</span>
                                            <span className="text-xl font-['Space_Grotesk']">{selectedProjectData.category}</span>
                                        </motion.div>
                                    </div>

                                    <motion.div className="w-12 h-[1px] bg-white/20 my-8" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4 }}></motion.div>

                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                                        <span className="text-xs uppercase tracking-widest text-[#555] font-['Space_Grotesk'] block mb-3">About The Project</span>
                                        <p className="text-lg text-[#aaa] font-light leading-relaxed">
                                            {selectedProjectData.description}
                                        </p>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Action / Link */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-8 px-8 py-4 bg-white text-black font-['Space_Grotesk'] font-bold uppercase tracking-wide hover:bg-[#ccc] transition-colors w-full"
                            >
                                View Case Study
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* --- RIGHT PANEL (70%) - WHEEL --- */}
            <div
                ref={containerRef}
                className="relative w-full md:w-[70vw] h-full overflow-y-scroll no-scrollbar perspective-800 snap-y snap-mandatory"
                style={{ perspective: "800px", perspectiveOrigin: "center center" }}
            >
                <div className="py-[45vh] flex flex-col items-center w-full" style={{ transformStyle: "preserve-3d" }}>
                    <AnimatePresence mode='popLayout'>
                        {processedProjects.map((project) => (
                            <ProjectItem
                                key={project.id}
                                project={project}
                                containerRef={containerRef}
                                hasSelection={!!selectedProject}
                                isSelected={selectedProject === project.id}
                                onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                            />
                        ))}
                    </AnimatePresence>

                    {processedProjects.length === 0 && (
                        <div className="text-center text-[#555] py-20 font-['Space_Grotesk']">No projects found for {filterRole}.</div>
                    )}
                </div>
            </div>

            {/* --- SCROLL HINT (Restored & Fixed) --- */}
            <motion.div
                style={{ opacity: hintOpacity }}
                className="fixed bottom-12 right-12 z-50 pointer-events-none text-white/30 flex flex-col items-center gap-2 animate-bounce"
            >
                <span className="text-[10px] uppercase tracking-widest font-['Space_Grotesk']">Scroll to discover</span>
                <ArrowDown size={14} />
            </motion.div>

        </div>
    );
};

export default Projects;
