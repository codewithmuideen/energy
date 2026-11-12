import { motion, useReducedMotion } from 'motion/react';

export const EASE = [0.16, 1, 0.3, 1];

/** Fade-and-rise on scroll into view. */
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div', ...rest }) {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
