import { motion, useReducedMotion } from 'motion/react';
import { EASE, viewport } from '../animations/motionVariants';

/** Fade-and-rise on scroll into view. */
export function Reveal({ children, delay = 0, y = 36, className = '', as = 'div', ...rest }) {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 1.1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/**
 * Headline that reveals line by line from behind a mask.
 * `lines` is an array of strings or React nodes, one per visual line.
 */
export function RevealLines({ lines, as = 'h2', className = '', delay = 0, animateOnMount = false }) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  // The trigger lives on the (visible) parent: masked children are clipped to zero area,
  // so an IntersectionObserver on them would never fire. Variants propagate to each line.
  const trigger = animateOnMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -8% 0px' } };
  return (
    <Tag className={className} initial={reduced ? false : 'hidden'} {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.16em] -mb-[0.16em]">
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: { y: '108%' },
              show: { y: '0%', transition: { duration: 1.3, ease: EASE, delay: delay + i * 0.11 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Image container revealed with a clip-path wipe. */
export function MaskReveal({ children, className = '', direction = 'up', delay = 0 }) {
  const reduced = useReducedMotion();
  const from = {
    up: 'inset(100% 0% 0% 0%)',
    left: 'inset(0% 100% 0% 0%)',
    right: 'inset(0% 0% 0% 100%)',
  }[direction];
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={reduced ? false : { clipPath: from }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={viewport}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduced ? false : { scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={viewport}
        transition={{ duration: 2, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
