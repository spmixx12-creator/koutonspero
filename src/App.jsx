import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Quote from '@/components/Quote';

function App() {
  const [currentPage, setCurrentPage] = useState('hero');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const pages = {
    hero: <Hero setCurrentPage={navigate} />,
    projets: <Projects setCurrentPage={navigate} />,
    apropos: <About setCurrentPage={navigate} />,
    contact: <Contact setCurrentPage={navigate} />,
    devis: <Quote setCurrentPage={navigate} />
  };

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Atelier Typographique Vivant - KOUTON Spéro Précieux</title>
        <meta name="description" content="Portfolio of KOUTON Spéro Précieux - Designer & Creative Thinker showcasing creative projects and design work" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Libre+Baskerville:ital,wght@0,400..700;1,400..700&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Space+Grotesk:wght@300..700&family=Inter:wght@300..700&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="min-h-screen w-screen relative bg-[#050505] text-white">
        {currentPage !== 'hero' && <Navigation currentPage={currentPage} setCurrentPage={navigate} />}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentPage}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="w-full h-full"
          >
            {React.cloneElement(pages[currentPage], { setCurrentPage: navigate })}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
