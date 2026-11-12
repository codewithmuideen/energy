import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useMediaQuery } from '../hooks/useMediaQuery';

/** Desktop-only cursor: a precise dot plus a trailing ring that expands over interactive elements. */
export default function CustomCursor() {
  const fine = useMediaQuery('(pointer: fine) and (min-width: 1024px)');
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const enabled = fine && !reduced;
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-custom-cursor');
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target.closest?.('a, button, [data-cursor="hover"], input, textarea, select, label');
      setHover(!!t);
    };
    const leave = () => setVisible(false);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0, transition: 'opacity .3s' }}>
      <motion.div className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" style={{ x, y }} />
      <motion.div
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/70 mix-blend-difference"
        style={{ x: rx, y: ry }}
        animate={{ width: hover ? 58 : 34, height: hover ? 58 : 34, backgroundColor: hover ? 'rgba(198,161,91,0.12)' : 'rgba(198,161,91,0)' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
