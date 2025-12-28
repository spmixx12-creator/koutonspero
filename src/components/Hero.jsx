import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ setCurrentPage }) => {
  const containerRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const marqueeLeftRef = useRef(null);
  const marqueeRightRef = useRef(null);
  const buttonRef = useRef(null);
  const projectsBtnRef = useRef(null);
  const portraitRef = useRef(null);
  const nameLeftRef = useRef(null);
  const nameRightRef = useRef(null);
  const skillsRef = useRef([]);
  const skillsInnerRef = useRef([]);

  const skills = [
    'UX Design', 'Web Design', 'GSAP Motion',
    'React', 'Branding', 'UI Expert', 'Product Design'
  ];

  // Random positions for scattered skills
  const getSkillPosition = (i) => {
    const isMobile = window.innerWidth < 768; // Check if mobile
    // Further fine-tuned distances: increased mobile for space, reduced desktop for containment
    const baseRadius = isMobile ? 170 : 350;
    const angle = (i / skills.length) * Math.PI * 2;
    const radius = baseRadius + Math.random() * (isMobile ? 60 : 100);

    let x = Math.cos(angle) * radius;
    let y = Math.sin(angle) * radius;

    // Shift "UX Design" (index 0) down slightly as requested
    if (i === 0) {
      y += isMobile ? 40 : 80;
    }

    return { x, y };
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ... (rest of animation setup - logic inside getSkillPosition handles resizing on load)
      // Note: To handle resize dynamically, we'd need a window resize listener, 
      // but for initial load this works. Mobile usually doesn't resize width much.

      // 1. Entrance Animations for Section 1
      gsap.from(".stagger-item", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5
      });

      // 2. Section 1 Background Marquee Parallax
      gsap.to(marqueeLeftRef.current, {
        xPercent: -50,
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(marqueeRightRef.current, {
        xPercent: 50,
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      // 3. Pinning Section 1 and Transitioning to Section 2
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=220%", // Slightly increased to allow for button reveal space
          pin: true,
          scrub: 1,
        }
      });

      // Reveal Section 2 (Transition)
      tl.to(section1Ref.current, {
        opacity: 0,
        y: -100,
        scale: 0.9,
        ease: "power2.inOut"
      }, 0);

      tl.fromTo(section2Ref.current, {
        opacity: 0,
        y: 100,
      }, {
        opacity: 1,
        y: 0,
        ease: "power2.inOut"
      }, 0.1);

      // 4. Parallax Depth in Section 2
      // IDENTITY text in far background
      tl.fromTo(".bg-identity", {
        scale: 0.8,
        opacity: 0
      }, {
        scale: 1,
        opacity: 0.05,
        duration: 2
      }, 0.2);

      // Portrait focus
      tl.to(portraitRef.current, {
        y: -30,
        scale: 1.05,
        ease: "none"
      }, 0.5);

      // Split Name Motion - Framing the portrait with Brutalist style
      tl.fromTo(nameLeftRef.current, {
        x: -200,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.out"
      }, 0.4);

      tl.fromTo(nameRightRef.current, {
        x: 200,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.out"
      }, 0.4);

      // Skills: Emergence and Floating
      skillsRef.current.forEach((el, i) => {
        if (!el) return;
        const pos = getSkillPosition(i);

        // Emergence - Controlled by ScrollTrigger
        tl.fromTo(el, {
          x: 0,
          y: 0,
          scale: 0,
          opacity: 0,
        }, {
          x: pos.x,
          y: pos.y,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.7)"
        }, 0.3 + i * 0.1);

        // Persistent floating (bobbing) motion - Independent of ScrollTrigger
        const inner = skillsInnerRef.current[i];
        if (inner) {
          gsap.to(inner, {
            y: "random(-20, 20)",
            x: "random(-15, 15)",
            rotation: "random(-10, 10)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2
          });
        }
      });

      // Reveal Final PROJETS button at the bottom
      tl.fromTo(".final-cta-container", {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }, 1.8);

      // Maintain visibility until the end of the scroll sequence
      tl.to({}, { duration: 0.5 });

      // Fade out scroll hint at the end
      tl.to(".scroll-hint", {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      }, 1.5);

      // 5. Magnetic Button (only for main hero button, not projects button)
      const handleMouseMove = (e) => {
        const btn = buttonRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        if (distance < 100) {
          gsap.to(btn, { x: distanceX * 0.4, y: distanceY * 0.4, duration: 0.4 });
        } else {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        }
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#050505]">
      {/* Local Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.05]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* SECTION 1: HERO */}
      <div ref={section1Ref} className="absolute inset-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center px-4">
        <div className="absolute inset-0 flex flex-col justify-center pointer-events-none opacity-20">
          <div ref={marqueeLeftRef} className="whitespace-nowrap flex">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="text-[25vw] font-black text-transparent stroke-white stroke-[1px] pr-20 uppercase" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>PORTFOLIO</span>
            ))}
          </div>
          <div ref={marqueeRightRef} className="whitespace-nowrap flex mt-[-5vw]">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="text-[25vw] font-black text-transparent stroke-white stroke-[1px] pr-20 uppercase" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>PORTFOLIO</span>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center">
          <p className="stagger-item font-space text-xs md:text-sm text-white/50 tracking-[0.3em] md:tracking-[0.5em] mb-4 md:mb-6 uppercase">CREATIVE PORTFOLIO 2025</p>
          <h1 className="stagger-item text-4xl md:text-8xl lg:text-[9rem] font-space font-black leading-[0.9] tracking-tighter text-white mb-8 md:mb-10 uppercase">L'ART DE <br /> L'INTERFACE.</h1>
          <div className="stagger-item max-w-xl mx-auto mb-12 px-4">
            <p className="font-inter text-sm md:text-lg text-white/60 font-light leading-relaxed">Designer d'interfaces immersives et développeur passionné par le mouvement.</p>
          </div>
          <div className="stagger-item">
            {/* Subtle Welcome Text */}
            <div className="relative inline-block">
              {/* Main Text */}
              <h2 className="relative text-lg md:text-2xl font-space font-medium tracking-wide leading-tight">
                <span className="inline-block bg-gradient-to-r from-white/80 via-white/60 to-white/80 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  Bienvenue dans mon Univers
                </span>
              </h2>

              {/* Subtle Underline */}
              <div className="mt-3 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer bg-[length:200%_auto]" />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: IDENTITY - SPLIT FRAMING NAME */}
      <div ref={section2Ref} className="absolute inset-0 w-full h-screen flex items-center justify-center px-4 overflow-hidden" style={{ opacity: 0 }}>

        {/* Background "IDENTITY" */}
        <div className="bg-identity absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <h2 className="text-[25vw] font-space font-black text-white uppercase tracking-tighter">
            IDENTITY
          </h2>
        </div>

        <div className="relative flex items-center justify-center w-full max-w-7xl">
          {/* Left Name Block */}
          <div ref={nameLeftRef} className="hidden lg:block absolute left-0 z-30">
            <h3 className="text-8xl xl:text-9xl font-space font-black text-white tracking-tighter opacity-90">
              KOUTON
            </h3>
          </div>

          {/* Portrait Focus */}
          <div ref={portraitRef} className="relative w-[80vw] md:w-[450px] aspect-[4/5] z-40 flex flex-col items-center">
            <img
              src="/images/Gemini_Generated_Image_2imtvm2imtvm2imt-removebg-preview.webp"
              alt="Portrait"
              className="w-full h-full object-contain object-bottom drop-shadow-2xl"
            />
            {/* Mobile / Fallback Name */}
            <div className="lg:hidden mt-4 md:mt-8 text-center px-4">
              <h3 className="text-4xl md:text-6xl font-space font-black text-white tracking-tighter">
                KOUTON <span className="text-indigo-500">Spéro.P</span>
              </h3>
            </div>
            {/* Final CTA: Mon travail */}
            <div className="final-cta-container mt-8 z-[60] flex flex-col items-center">
              <button
                onClick={() => setCurrentPage('projets')}
                className="group px-8 py-4 bg-white text-black rounded-full font-space text-sm font-bold tracking-[0.15em] uppercase flex items-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] shadow-2xl pointer-events-auto"
              >
                Mon travail
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>

          {/* Right Name Block */}
          <div ref={nameRightRef} className="hidden lg:block absolute right-0 z-30 text-right">
            <h3 className="text-8xl xl:text-9xl font-space font-black text-indigo-500 tracking-tighter opacity-90">
              Spéro.P
            </h3>
          </div>
        </div>

        {/* Scattered Skills Container */}
        <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
          {skills.map((skill, i) => (
            <div
              key={i}
              ref={el => skillsRef.current[i] = el}
              className="absolute"
            >
              <div
                ref={el => skillsInnerRef.current[i] = el}
                className="px-4 py-2 border border-white/20 bg-black/60 backdrop-blur-sm rounded-full font-space text-[10px] md:text-xs font-bold text-white/80 uppercase tracking-widest whitespace-nowrap"
              >
                {skill}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Scroll Hint */}
      <div className="scroll-hint fixed bottom-10 left-1/2 -translate-x-1/2 z-[30] opacity-30 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
