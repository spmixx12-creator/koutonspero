import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Monitor, PenTool, Youtube, Send, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// --- HELPER COMPONENTS ---

const Tag = ({ children }) => (
  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/10 rounded-full bg-white/5 backdrop-blur-sm text-white/60">
    {children}
  </span>
);
const BentoBlock = ({ children, className = "", id = "" }) => (
  <div
    id={id}
    className={`relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.03] backdrop-blur-[12px] transition-shadow duration-500 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)] ${className}`}
  >
    {children}
  </div>
);

// --- BLOCKS ---

const HeaderBlock = () => (
  <div className="col-span-4 min-h-screen md:min-h-0 py-20 relative flex flex-col items-center justify-center text-center overflow-hidden bento-item">
    <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] md:text-[12vw] font-black opacity-[0.04] pointer-events-none select-none font-space uppercase text-white whitespace-nowrap">
      HISTOIRE
    </h2>
    <div className="relative z-10 space-y-6 px-6">
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-[1px] bg-indigo-500 mb-2" />
        <p className="text-indigo-400 font-space text-xs tracking-[0.3em] uppercase">
          L'évolution d'un créatif
        </p>
      </div>

      <h1 className="text-5xl md:text-8xl font-space font-black tracking-tighter leading-[0.9] text-white uppercase">
        De Paint à <br />
        <span className="text-outline-white opacity-40 md:hidden">l'UX Moderne.</span>
        <span className="hidden md:inline text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">l'UX Moderne.</span>
      </h1>

      <div className="max-w-xs mx-auto pt-4">
        <p className="text-white/40 font-inter text-[10px] tracking-widest uppercase leading-relaxed">
          PORTFOLIO V2.0 — CONCEPT BENTO
        </p>
      </div>

      <div className="pt-10">
        <a
          href="/images/Mon CV Designer.pdf"
          download="Kouton_Spero_Precieux_CV.pdf"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 group"
        >
          <span className="font-space font-bold text-sm tracking-widest text-white uppercase">Télécharger mon CV</span>
          <Download size={16} className="text-indigo-400 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </div>
  </div>
);

const Block01_Etincelle = () => (
  <BentoBlock className="col-span-4 md:col-span-2 row-span-2 min-h-screen md:min-h-0 p-8 md:p-12 flex flex-col justify-center md:justify-between group bento-item border-none md:border-solid bg-transparent md:bg-white/[0.03]" id="block-01">
    {/* CRT Effect - Desktop Only */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_2px,3px_100%] hidden md:block" />

    <div className="max-w-md mx-auto md:mx-0 space-y-10 md:space-y-6 relative z-20">
      <div className="space-y-4">
        <div className="flex items-center gap-4 text-indigo-400 font-space text-[10px] tracking-[0.2em] font-black uppercase">
          <Monitor size={16} />
          <span className="md:hidden">EST. 2000s</span>
          <span className="hidden md:inline">ANNÉES 2000</span>
        </div>
        <h3 className="text-4xl md:text-5xl font-space font-black leading-none text-white uppercase tracking-tighter">
          L'Étincelle : <br />
          <span className="text-white/20 md:hidden">Pixel Perf.</span>
          <span className="hidden md:inline font-pixel text-2xl lowercase italic">Pixel Perfection sur Paint</span>
        </h3>
      </div>

      <p className="text-white/60 text-lg md:text-lg leading-relaxed font-inter font-light">
        Tout a commencé en 5ème. Mon premier PC est devenu mon atelier. Pas de jeux, juste des nuits blanches à dompter chaque pixel sur <span className="text-white font-medium">Microsoft Paint</span>. C'est là que j'ai compris : créer est ma plus grande liberté.
      </p>

      {/* Retro UI - Desktop Only */}
      <div className="mt-12 relative h-32 w-full border border-white/5 rounded-xl bg-black/40 overflow-hidden group-hover:border-indigo-500/30 transition-colors shadow-inner hidden md:block">
        <div className="absolute top-0 left-0 w-8 h-full bg-white/5 border-r border-white/5 flex flex-col p-1 gap-1">
          {[...Array(6)].map((_, i) => <div key={i} className="w-full aspect-square bg-white/10 rounded-sm" />)}
        </div>
        <div className="ml-10 h-full flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-dashed border-white/40 animate-spin-slow"></div>
        </div>
      </div>

      {/* Bottom Line - Mobile Only */}
      <div className="pt-8 opacity-20 group-hover:opacity-40 transition-opacity md:hidden">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
    </div>
  </BentoBlock>
);

const Block02_Artisan = () => {
  const svgRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(svgRef.current,
      { strokeDasharray: 500, strokeDashoffset: 500 },
      {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#block-02",
          start: "top 80%",
        }
      }
    );
  });

  return (
    <BentoBlock className="col-span-4 md:col-span-1 row-span-2 min-h-screen md:min-h-0 p-8 md:p-8 flex flex-col justify-center bento-item border-none md:border-solid bg-transparent md:bg-white/[0.03]" id="block-02">
      <div className="max-w-md mx-auto md:mx-0 space-y-12 md:space-y-6 text-center md:text-left h-full flex flex-col justify-center md:justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-400/50 md:text-white/30 font-space md:font-bold text-[10px] md:text-xs tracking-widest md:tracking-tighter font-black md:uppercase">
            <PenTool size={14} className="md:size-4" />
            <span className="md:hidden">Artisanat</span>
            <span className="hidden md:inline">L'Artisanat</span>
          </div>
          <h3 className="text-4xl md:text-2xl font-space font-black md:font-bold text-white uppercase md:capitalize tracking-tighter md:tracking-normal">
            Le Papier <br className="md:hidden" />
            <span className="text-outline-white opacity-20 md:hidden">avant l'écran</span>
            <span className="hidden md:inline">avant l'Écran</span>
          </h3>
          <p className="hidden md:block text-sm leading-relaxed text-white/60 font-inter">
            En 3ème, j'ai réalisé mes premières invitations de baptême. Le design n'était plus un hobby, c'était un service, une émotion partagée. Chaque trait comptait.
          </p>
        </div>

        <p className="text-white/60 text-lg leading-relaxed font-inter font-light italic md:hidden">
          "En 3ème, j'ai réalisé mes premières invitations de baptême. Le design n'était plus un hobby, c'était un service."
        </p>

        <div className="relative flex justify-center py-10 md:py-0 md:mt-8">
          <svg width="140" height="140" viewBox="0 0 100 100" className="opacity-10 absolute animate-spin-slow md:hidden">
            <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="4 4" />
          </svg>
          <svg width="140" height="140" viewBox="0 0 100 100" className="relative z-10 opacity-40 md:opacity-20">
            <path
              ref={svgRef}
              d="M10 50 C20 20, 80 20, 90 50 C80 80, 20 80, 10 50 Z"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </svg>
          <span className="hidden md:block font-pixel text-[10px] absolute -bottom-4 left-1/2 -translate-x-1/2 uppercase opacity-40">Sketch Process</span>
        </div>
      </div>
    </BentoBlock>
  );
};

const Block03_Metamorphose = () => (
  <BentoBlock className="col-span-4 md:col-span-1 row-span-2 min-h-screen md:min-h-0 p-8 md:p-8 flex flex-col justify-center bento-item border-none md:border-solid bg-transparent md:bg-white/[0.03]" id="block-03">
    <div className="max-w-md mx-auto md:mx-0 space-y-10 md:space-y-6 flex flex-col justify-center h-full">
      <div className="flex justify-center md:justify-start">
        <div className="w-16 h-16 md:w-auto md:h-auto rounded-2xl md:bg-transparent flex items-center justify-center md:border-none group-hover:border-indigo-500/50 transition-colors">
          <Youtube className="text-white/40 md:text-red-500/80 group-hover:text-red-500 transition-colors" size={32} />
        </div>
      </div>

      <div className="text-center md:text-left space-y-4">
        <h3 className="text-4xl md:text-2xl font-space font-black md:font-bold leading-tight text-white uppercase md:capitalize tracking-tighter md:tracking-normal">
          La <br className="md:hidden" />
          <span className="text-indigo-500 md:text-white">Métamorphose</span>
        </h3>
        <p className="text-white/60 text-lg md:text-sm leading-relaxed font-inter font-light">
          "YouTube a été mon université. Autoformation intense, premières collaborations (Gameplay, Snaki)."
          <span className="hidden md:inline"> Le début de l'ère stratégique.</span>
        </p>
      </div>

      <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-2">
        {["Branding", "Motion", "UX Design", "Vite"].map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  </BentoBlock>
);

const Block04_Skills = () => {
  const [hoveredCategory, setHoveredCategory] = React.useState(null);
  const containerRef = useRef(null);
  const spotlightRef = useRef(null);

  const skills = [
    {
      category: "UI/UX Design",
      level: 95,
      tools: ["Figma", "User Research", "Prototyping", "IA Prompting", "System Design", "3D"]
    },
    {
      category: "Motion Design",
      level: 85,
      tools: ["After Effects", "Filmora", "Capcut", "Twinmotion", "Storytelling"]
    },
    {
      category: "Visual Identity",
      level: 90,
      tools: ["Photoshop", "Branding", "Typography", "Illustrator", "Layout"]
    },
    {
      category: "Development",
      level: 75,
      tools: ["HTML/CSS", "React", "Python", "Vite", "Tailwind"]
    }
  ];

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    // Spotlight Logic
    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          x: x,
          y: y,
          duration: 0.2,
          ease: "power2.out"
        });
      }
    };

    el.addEventListener("mousemove", onMouseMove);

    // Skill Progress Animation
    const skillCircles = gsap.utils.toArray('.skill-circle');
    skillCircles.forEach(circle => {
      const progress = circle.querySelector('.skill-progress');
      const level = circle.getAttribute('data-level');

      gsap.to(progress, {
        strokeDashoffset: 300 - (300 * level / 100),
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: circle,
          start: "top 85%",
        }
      });
    });

    return () => el.removeEventListener("mousemove", onMouseMove);
  }, { scope: containerRef });

  return (
    <BentoBlock className="col-span-4 min-h-screen md:min-h-0 p-6 md:p-12 flex flex-col justify-center bento-item group relative overflow-hidden" id="block-04">

      {/* Ref Container for Mouse Tracking */}
      <div ref={containerRef} className="absolute inset-0 z-20" />

      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-900/10 via-[#050505] to-purple-900/10 opacity-50" />
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />

      {/* Spotlight Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          ref={spotlightRef}
          className="absolute w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none">
        <div className="mb-16 flex flex-col items-center md:items-end md:flex-row md:justify-between md:text-left border-b border-white/10 pb-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-2 mb-4">
              <div className="w-12 h-[1px] bg-indigo-500 mb-2" />
              <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-xs">
                <Monitor size={16} />
                <span>Expertise</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-space font-bold text-white uppercase tracking-tighter">
              Compétences
            </h2>
          </div>
          <div className="hidden md:block">
            <p className="text-white/40 font-pixel text-[10px] uppercase tracking-[0.3em] text-right">
              Hard Skills &<br />Creative Stack
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-x-12 md:gap-y-16 items-start">
          {skills.map((skillGroup, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center md:items-start space-y-8 md:space-y-6 transition-all duration-700 pointer-events-auto
                                ${hoveredCategory && hoveredCategory !== skillGroup.category ? 'opacity-20 scale-95 blur-[4px]' : 'opacity-100 scale-100 blur-0'}
                           `}
              onMouseEnter={() => setHoveredCategory(skillGroup.category)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Premium Circular Indicator - Unified */}
              <div className="relative w-32 h-32 md:w-28 md:h-28 flex items-center justify-center group/circle skill-circle" data-level={skillGroup.level}>
                <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  <circle cx="50%" cy="50%" r="48%" stroke="currentColor" strokeWidth="1" fill="transparent" className="text-white/[0.03]" />
                  <circle cx="50%" cy="50%" r="48%" stroke="currentColor" strokeWidth="2.5" fill="transparent"
                    strokeDasharray={300} strokeDashoffset={300}
                    className="skill-progress text-indigo-500 transition-all duration-300 group-hover/circle:stroke-[3.5px]"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-0.5">
                  <span className="text-2xl md:text-xl font-space font-black text-white">{skillGroup.level}%</span>
                  <span className="text-[7px] font-space text-white/20 uppercase tracking-widest hidden md:block">Mastery</span>
                </div>
              </div>

              <div className="text-center md:text-left space-y-4 w-full">
                <div className="space-y-1">
                  <h3 className="text-sm font-space font-black uppercase tracking-[0.2em] text-white">
                    {skillGroup.category}
                  </h3>
                  <div className="h-[1px] w-8 bg-indigo-500/30 mx-auto md:mx-0" />
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {skillGroup.tools.map((tool, i) => (
                    <div
                      key={i}
                      className="px-2.5 py-1 rounded-sm border border-white/[0.05] bg-white/[0.02] text-[9px] font-space text-white/40 uppercase tracking-widest hover:border-indigo-500/30 hover:text-white transition-all cursor-crosshair"
                    >
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
               @keyframes shimmer {
                   0% { transform: translateX(-100%); }
                   100% { transform: translateX(100%); }
               }
               .animate-shimmer {
                   animation: shimmer 1s cubic-bezier(0.4, 0, 0.2, 1);
               }
           `}</style>
    </BentoBlock>
  );
};

// --- GLOBAL ELEMENTS ---

const ProgressBar = () => {
  const barRef = useRef(null);

  useGSAP(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      }
    });
  });

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-[100] origin-left overflow-hidden">
      <div ref={barRef} className="w-full h-full bg-indigo-500 scale-x-0 origin-left" />
    </div>
  );
};


const KineticMarquee = () => (
  <div className="fixed bottom-0 left-0 right-0 py-6 border-t border-white/5 bg-black/50 backdrop-blur-md overflow-hidden z-20">
    <div className="flex animate-marquee whitespace-nowrap">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-12 px-6">
          <span className="text-[10px] font-space text-white/20 tracking-[0.4em] uppercase">Qui suis-je ?</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/30" />
          <span className="text-[10px] font-space text-white/20 tracking-[0.4em] uppercase">Mon Parcours</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/30" />
          <span className="text-[10px] font-space text-white/20 tracking-[0.4em] uppercase">Vision & Design</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/30" />
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN COMPONENT ---

const About = ({ setCurrentPage }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const items = gsap.utils.toArray('.bento-item');

    items.forEach((item, i) => {
      // Entry animation
      gsap.from(item, {
        opacity: 0,
        y: 60,
        scale: 0.98,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          toggleActions: "play none none reverse",
        }
      });

      // Continuous Parallax Effect - Only on Desktop for readability
      if (window.innerWidth >= 768) {
        gsap.to(item, {
          y: i % 2 === 0 ? -100 : -150,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }
    });
  }, { scope: containerRef });

  return (
    <div className="min-h-screen text-white font-inter selection:bg-indigo-500/20 overflow-x-hidden relative">
      <ProgressBar />

      {/* Background Image Container */}
      <div className="fixed inset-0 z-0">
        <img
          src="/images/téléchargement (20).webp"
          alt="Background"
          className="w-full h-full object-cover opacity-20 grayscale brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      <main ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 auto-rows-min">
          <HeaderBlock />
          <Block01_Etincelle />
          <Block02_Artisan />
          <Block03_Metamorphose />
          <Block04_Skills />
        </div>
      </main>

      <KineticMarquee />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default About;
