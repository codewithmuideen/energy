import { useLayoutEffect } from 'react';
import { gsap, prefersReducedMotion } from '../animations/gsapConfig';

/**
 * Runs GSAP setup inside a scoped context and reverts it (killing ScrollTriggers) on unmount.
 * The callback is skipped entirely when the user prefers reduced motion.
 */
export function useGsap(scopeRef, setup, deps = []) {
  useLayoutEffect(() => {
    if (!scopeRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => setup(scopeRef.current), scopeRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
