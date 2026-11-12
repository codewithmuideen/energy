import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: 'expo.out', duration: 1.2 });

let lenis = null;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Start Lenis smooth scrolling and drive it from GSAP's ticker so ScrollTrigger stays in sync. */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis;
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, anchors: { offset: -110 } });
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  lenis.__raf = raf;
  return lenis;
}

export function destroySmoothScroll() {
  if (!lenis) return;
  gsap.ticker.remove(lenis.__raf);
  lenis.destroy();
  lenis = null;
}

export const getLenis = () => lenis;

export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate, force: true });
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}

export function scrollToTarget(target, offset = -110) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.4 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' });
}

export { gsap, ScrollTrigger };
