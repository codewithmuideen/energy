import { motion, useReducedMotion } from 'motion/react';

export const EASE = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' };

// Entrance directions: blurred slide/zoom, plus a springy "bounce".
const DIRS = {
  up: { y: 64, blur: 6 },
  down: { y: -64, blur: 6 },
  left: { x: -140, blur: 6 },
  right: { x: 140, blur: 6 },
  zoom: { scale: 0.7, blur: 6 },
  bounce: { y: 90 },
};

const hidden = (d, y) => ({ opacity: 0, x: d.x ?? 0, y: y ?? d.y ?? 0, scale: d.scale ?? 1, filter: `blur(${d.blur ?? 0}px)` });
const shown = { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' };
const trans = (dir, delay = 0, duration = 1.2) =>
  dir === 'bounce' ? { type: 'spring', stiffness: 240, damping: 11, mass: 0.9, delay } : { duration, ease: EASE, delay };

/** Blur-and-slide entrance on scroll into view. */
export function Reveal({ children, delay = 0, y, direction = 'up', className = '', as = 'div', ...rest }) {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  const d = DIRS[direction] || DIRS.up;
  return (
    <Comp className={className} initial={reduced ? false : hidden(d, y)} whileInView={shown} viewport={VIEWPORT} transition={trans(direction, delay)} {...rest}>
      {children}
    </Comp>
  );
}

/** Container that staggers its <StaggerItem> children into view. */
export function Stagger({ children, className = '', stagger = 0.14, as = 'div', ...rest }) {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduced ? false : 'hidden'}
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ children, className = '', direction = 'up', as = 'div', ...rest }) {
  const Comp = motion[as];
  const d = DIRS[direction] || DIRS.up;
  return (
    <Comp className={className} variants={{ hidden: hidden(d), show: { ...shown, transition: trans(direction, 0, 1.1) } }} {...rest}>
      {children}
    </Comp>
  );
}

/** Image wrapper revealed with a clip-path wipe and a gentle settle-in zoom. */
export function ClipReveal({ children, className = '', delay = 0, from = 'bottom' }) {
  const reduced = useReducedMotion();
  const start = { bottom: 'inset(100% 0 0 0)', top: 'inset(0 0 100% 0)', left: 'inset(0 100% 0 0)', right: 'inset(0 0 0 100%)' }[from];
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={reduced ? false : { clipPath: start }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={VIEWPORT}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduced ? false : { scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.6, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Headline that reveals word by word, each rising from behind a mask. */
export function WordReveal({ text, className = '', delay = 0, as = 'h2', animateOnMount = false, wordClass = () => '' }) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  const trigger = animateOnMount ? { animate: 'show' } : { whileInView: 'show', viewport: VIEWPORT };
  const words = text.split(' ');
  return (
    <Tag className={className} initial={reduced ? false : 'hidden'} {...trigger} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom" aria-hidden="true">
          <motion.span
            className={`inline-block ${wordClass(w, i)}`}
            variants={{ hidden: { y: '110%', rotate: 4 }, show: { y: '0%', rotate: 0, transition: { duration: 1, ease: EASE } } }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
