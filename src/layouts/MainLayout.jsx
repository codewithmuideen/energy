import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { EASE } from '../components/Reveal';

/** Scrolls to top on route change, or to the #hash target once the lazy page has rendered. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    let tries = 0;
    const id = setInterval(() => {
      const el = document.querySelector(hash);
      if (el || ++tries > 20) {
        clearInterval(id);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
    return () => clearInterval(id);
  }, [pathname, hash]);
  return null;
}

/** Feeds the pointer position to .card / .spot elements for the hover spotlight. */
function useSpotlight() {
  useEffect(() => {
    const onMove = (e) => {
      const el = e.target.closest?.('.card, .spot');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
      el.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-solar to-sun" style={{ scaleX }} />;
}

export default function MainLayout({ children }) {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  useSpotlight();

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-navy">
        Skip to content
      </a>
      <ScrollManager />
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <motion.div
          key={pathname}
          initial={reduced ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none', transform: 'none' } }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {children}
        </motion.div>
      </main>
      {/* Route curtain: a navy panel with the solar accent sweeps up on every navigation */}
      <AnimatePresence>
        {!reduced && (
          <motion.div
            key={pathname}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[70] origin-top border-b-4 border-solar bg-navy"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          />
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
}
