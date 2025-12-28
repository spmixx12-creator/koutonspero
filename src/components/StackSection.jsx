import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const jobTitles = [
    "UX/UI Designer", "Graphic Designer", "Motion Designer",
    "Montage video Youtube", "Montage video Tiktok",
    "Réalisateur de Logo", "Brand Designer", "Web Designer"
];

const steps = [
    {
        number: "01",
        title: "STRATÉGIE",
        description: "Analyse des besoins, architecture de l'information et design thinking pour poser des fondations solides.",
        details: "Research • User Flows • Sitemap"
    },
    {
        number: "02",
        title: "DESIGN",
        description: "Création d'interfaces haute fidélité, micro-interactions et esthétique immersive pour une expérience unique.",
        details: "UI Design • Prototyping • Motion"
    },
    {
        number: "03",
        title: "DÉVELOPPEMENT",
        description: "Ingénierie frontend optimisée avec React et Three.js pour des performances et une fluidité irréprochables.",
        details: "Clean Code • Performance • SEO"
    }
];

const tools = [
    "Canva", "Pinterest", "Dribbble", "ChatGPT", "Gemini",
    "Hostinger", "Flow", "Figma", "Antigravity", "3D",
    "Tailwind", "React", "Next.js", "Vite", "Blender"
];

const WorkflowStep = ({ step, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 1, 1, 0.2]);
    const fillY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity }}
            className="relative py-24 md:py-40 flex flex-col items-start gap-6 group"
        >
            {/* Background Number (Outline with Charter Style) */}
            <div className="absolute -left-12 md:-left-24 top-0 select-none pointer-events-none z-0">
                <span className="text-[15vw] md:text-[20vw] text-outline-arch opacity-20">
                    {step.number}
                </span>
                {/* Fill Animation Overlay */}
                <motion.span
                    className="absolute inset-0 text-[15vw] md:text-[20vw] font-black text-indigo-500/20 overflow-hidden"
                    style={{ clipPath: `inset(${fillY} 0 0 0)` }}
                >
                    {step.number}
                </motion.span>
            </div>

            <div className="relative z-10 space-y-4 max-w-xl ml-4 md:ml-0">
                <span className="font-mono text-indigo-500 text-sm tracking-widest bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
                    {step.details}
                </span>
                <h3 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none drop-shadow-lg">
                    {step.title}
                </h3>
                <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light max-w-md drop-shadow-md">
                    {step.description}
                </p>
            </div>
        </motion.div>
    );
};

const StackSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        // Removed bg-[#050505] and grain overlay to allow transparency
        <section ref={containerRef} className="relative min-h-screen text-white selection:bg-indigo-500/30 pt-12 md:pt-0">

            {/* Job Titles Marquee - Inserted as requested */}
            <div className="w-full overflow-hidden py-12 border-y border-white/5 bg-black/20 backdrop-blur-sm mb-12 md:mb-24">
                <div className="flex animate-marquee whitespace-nowrap">
                    {[...jobTitles, ...jobTitles].map((title, i) => (
                        <div key={i} className="flex items-center gap-8 mx-8">
                            <span className="text-outline-arch text-4xl md:text-7xl uppercase opacity-40 hover:opacity-100 transition-opacity duration-500">
                                {title}
                            </span>
                            <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.6)]" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
                <div className="relative min-h-[150vh] md:min-h-0">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
                        {/* Sticky Left Column */}
                        <div className="md:col-span-5 mb-24 md:mb-0 relative py-12 md:py-0">
                            <div className="sticky top-1/2 -translate-y-1/2">
                                {/* Header Label */}
                                <div className="mb-8">
                                    <span className="font-mono text-xs tracking-[0.3em] text-zinc-400 uppercase bg-black/40 px-3 py-1 rounded border border-white/10 backdrop-blur-md">
                                        02 / PROCESSUS
                                    </span>
                                </div>
                                <div className="overflow-visible pr-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    >
                                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-white uppercase drop-shadow-2xl">
                                            COMMENT JE <br className="hidden md:block" />
                                            <span className="text-indigo-500" style={{ textShadow: "0 0 30px rgba(99,102,241,0.3)" }}>TRAVAILLE ?</span>
                                        </h2>
                                        <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent mt-6 max-w-[150px]" />
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-8 flex items-center gap-4"
                                >
                                    <div className="w-12 h-[1px] bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                                    <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest text-outline-arch" style={{ fontSize: '0.7rem', WebkitTextStroke: '0px' }}>
                                        MÉTHODOLOGIE ÉDITORIALE
                                    </span>
                                </motion.div>

                                <div className="mt-12 max-w-xs backdrop-blur-sm bg-black/10 p-4 rounded-lg border border-white/5">
                                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                                        Une fusion d'esthétique éditoriale et de précision technique pour créer des produits numériques haut de gamme.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Container (Cols 6-12) */}
                        <div className="md:col-span-1 hidden md:flex justify-center relative">
                            {/* Blueprint line style */}
                            <div className="w-[1px] h-full bg-white/10 absolute top-0 fx-blueprint-stroke border-l border-none border-r-0" />
                            <div className="w-[1px] h-full absolute top-0 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                            <motion.div
                                style={{ scaleY, originY: 0 }}
                                className="w-[2px] h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.6)] flex flex-col justify-end relative z-10"
                            >
                                <div className="w-3 h-3 bg-indigo-500 rounded-full -ml-[4.5px] -mb-1 animate-pulse shadow-[0_0_15px_rgba(99,102,241,1)]" />
                            </motion.div>
                        </div>

                        {/* Content Steps (Cols 7-12) */}
                        <div className="md:col-span-6 space-y-0 text-white">
                            {steps.map((step, index) => (
                                <WorkflowStep key={step.number} step={step} index={index} />
                            ))}

                            {/* Typographic Tool Grid */}
                            <div className="py-32 border-t border-white/5 mt-24">
                                <div className="mb-12">
                                    <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">TECHNOLOGIES</span>
                                </div>
                                <div className="flex flex-wrap gap-4 md:gap-6">
                                    {tools.map((tool) => (
                                        <div
                                            key={tool}
                                            className="px-6 py-3 border-[0.5px] border-white/10 bg-white/5 backdrop-blur-md text-zinc-300 font-bold tracking-tight hover:border-indigo-500 hover:text-white hover:bg-indigo-500/10 hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)] transition-all duration-300 cursor-default uppercase text-sm md:text-base rounded-sm"
                                        >
                                            {tool}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Section */}
                            <div className="pt-32 pb-12 flex flex-col md:flex-row justify-between items-end gap-12 border-t border-white/5 mt-32">
                                <div>
                                    <button className="group relative px-10 py-5 bg-white text-black font-black text-xl rounded-full overflow-hidden transition-transform active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)]">
                                        <span className="relative z-10 flex items-center gap-4">
                                            DÉMARRER UN PROJET
                                            <div className="w-8 h-[1px] bg-black group-hover:w-12 transition-all" />
                                        </span>
                                        <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    </button>
                                </div>
                                <div className="text-right">
                                    <p className="text-[8px] font-mono tracking-[0.5em] text-zinc-500 uppercase">
                                        © 2025 KOUTON SPÉRO PRÉCIEUX • TOUS DROITS RÉSERVÉS • DESIGNED WITH ANTIGRAVITY
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StackSection;
