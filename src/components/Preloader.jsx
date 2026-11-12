import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MARK_PATHS } from './Logo';
import { EASE, EASE_QUART } from '../animations/motionVariants';

const KEY = 'apexcore-intro-seen';

/**
 * Liquid logo reveal: gold "fills" the apex mark like a rising liquid, the teal core drops in,
 * the wordmark resolves, then a curtain lifts. Plays once per browser session.
 */
export default function Preloader({ onDone }) {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem(KEY);
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!show) {
      onDone?.();
      return;
    }
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {
        /* storage unavailable */
      }
      setShow(false);
    }, reduced ? 600 : 2500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = '';
        onDone?.();
      }}
    >
      {show && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading Apex Core"
          className="fixed inset-0 z-[200] grid place-items-center bg-ink"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 1.1, ease: EASE_QUART }}
          style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        >
          <div className="flex flex-col items-center gap-7">
            <svg viewBox="22 16 156 162" className="h-24 w-24 md:h-28 md:w-28" aria-hidden="true">
              <defs>
                <clipPath id="pl-clip">
                  <path d={MARK_PATHS.left} />
                  <path d={MARK_PATHS.right} />
                </clipPath>
                <linearGradient id="pl-gold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#F6E3B0" />
                  <stop offset="0.5" stopColor="#C6A15B" />
                  <stop offset="1" stopColor="#7C5E2A" />
                </linearGradient>
                <linearGradient id="pl-teal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#5BEBD8" />
                  <stop offset="1" stopColor="#0A7469" />
                </linearGradient>
              </defs>
              {/* outline ghost of the mark */}
              <path d={MARK_PATHS.left} fill="none" stroke="rgba(198,161,91,.25)" strokeWidth="1.2" />
              <path d={MARK_PATHS.right} fill="none" stroke="rgba(198,161,91,.25)" strokeWidth="1.2" />
              {/* rising liquid with a travelling wave crest */}
              <g clipPath="url(#pl-clip)">
                <motion.g initial={{ y: 170 }} animate={{ y: reduced ? 0 : -14 }} transition={{ duration: reduced ? 0 : 1.6, ease: [0.45, 0, 0.2, 1] }}>
                  <g className="animate-wave-svg">
                    <path
                      d="M0 20 Q 25 8 50 20 T 100 20 T 150 20 T 200 20 T 250 20 T 300 20 T 350 20 T 400 20 V 220 H 0 Z"
                      fill="url(#pl-gold)"
                    />
                  </g>
                </motion.g>
              </g>
              {/* the core: a drop that falls into place */}
              <motion.path
                d={MARK_PATHS.drop}
                fill="url(#pl-teal)"
                initial={{ y: reduced ? 0 : -90, opacity: 0, scale: 0.6 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                style={{ transformOrigin: '100px 140px' }}
                transition={{ delay: reduced ? 0 : 1.15, duration: 0.9, ease: EASE }}
              />
            </svg>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: reduced ? 0 : 1.3, duration: 1, ease: EASE }}
                className="text-center font-logo leading-none"
              >
                <span className="block text-2xl font-bold tracking-[0.22em] text-white md:text-3xl">
                  APEX <span className="text-gold">CORE</span>
                </span>
                <span className="mt-3 block text-[0.6rem] font-semibold tracking-[0.42em] text-mist">OIL AND ENERGY RESOURCES</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
