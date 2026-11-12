import { motion, useReducedMotion } from 'motion/react';
import { EASE, EASE_QUART } from '../animations/motionVariants';
import { ScrollTrigger } from '../animations/gsapConfig';

/** Route transition: an ink curtain sweeps across while content fades and settles. */
export default function PageTransition({ children }) {
  const reduced = useReducedMotion();
  return (
    <>
      <motion.main
        id="main"
        tabIndex={-1}
        className="outline-none"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: 0.25 } }}
        exit={reduced ? undefined : { opacity: 0, y: -16, transition: { duration: 0.45, ease: EASE_QUART } }}
        onAnimationComplete={() => ScrollTrigger.refresh()}
      >
        {children}
      </motion.main>
      {!reduced && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[90] origin-top bg-ink"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0, transition: { duration: 0.8, ease: EASE_QUART, delay: 0.05 } }}
            exit={{ scaleY: 0 }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[91] origin-bottom border-t-2 border-gold bg-ink"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: [0, 1, 1], transition: { duration: 0.5, ease: EASE_QUART, times: [0, 0.8, 1] } }}
          />
        </>
      )}
    </>
  );
}
