export const EASE = [0.16, 1, 0.3, 1];
export const EASE_QUART = [0.76, 0, 0.24, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE, delay: i * 0.08 } }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({ opacity: 1, transition: { duration: 1, ease: EASE, delay: i * 0.08 } }),
};

export const stagger = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Masked line reveal: parent must have overflow hidden. */
export const lineReveal = {
  hidden: { y: '110%' },
  show: (i = 0) => ({ y: '0%', transition: { duration: 1.25, ease: EASE, delay: i * 0.1 } }),
};

export const viewport = { once: true, margin: '0px 0px -12% 0px' };
