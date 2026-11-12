import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import BackgroundVideo from '../components/BackgroundVideo';
import MagneticButton from '../components/MagneticButton';
import { RevealLines } from '../components/Reveal';
import { useGsap } from '../hooks/useGsap';
import { gsap } from '../animations/gsapConfig';
import { EASE } from '../animations/motionVariants';
import { scrollToTarget } from '../animations/gsapConfig';

export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  // Scroll parallax: video drifts and scales, copy lifts and fades.
  useGsap(ref, () => {
    const st = { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('[data-hero-media]', { yPercent: 22, scale: 1.12, ease: 'none', scrollTrigger: st });
    gsap.to('[data-hero-copy]', { yPercent: -18, opacity: 0.1, ease: 'none', scrollTrigger: st });
  });

  const fade = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, ease: EASE, delay },
  });

  return (
    <section ref={ref} aria-label="Introduction" className="grain relative isolate flex h-[100svh] min-h-[660px] items-end overflow-hidden bg-ink">
      <div data-hero-media className="absolute inset-0 -z-20 will-change-transform">
        <BackgroundVideo
          src="/videos/hero-1080.mp4"
          mobileSrc="/videos/hero-720.mp4"
          poster="/images/hero-poster.webp"
          controls
          eager
          label="hero video"
        />
      </div>
      {/* Navy grading */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      <div className="absolute inset-0 -z-10 bg-deep/30 mix-blend-multiply" />

      <div data-hero-copy className="container-x relative pb-24 md:pb-28">
        <motion.p {...fade(0.2)} className="eyebrow">
          Apex Core Oil and Energy Resources Ltd
        </motion.p>

        <RevealLines
          as="h1"
          animateOnMount
          delay={0.35}
          className="h-display mt-7 max-w-[15ch] text-white [&_em]:serif [&_em]:text-gold"
          lines={['Powering Progress.', 'Connecting Energy.', <>Building <em>Tomorrow.</em></>]}
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.p {...fade(0.9)} className="lead max-w-xl text-white/75 lg:col-span-6">
            Apex Core Oil and Energy Resources Ltd is focused on the evolving energy landscape, bringing together business ambition, industry knowledge and a
            commitment to responsible energy solutions.
          </motion.p>
          <motion.div {...fade(1.05)} className="flex flex-wrap gap-4 lg:col-span-6 lg:justify-end">
            <MagneticButton to="/business">Explore Our Business</MagneticButton>
            <MagneticButton to="/contact" variant="ghost">
              Contact Our Team
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        type="button"
        onClick={() => scrollToTarget('#intro', -40)}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.35em] text-white/60 hover:text-gold md:flex"
        aria-label="Scroll to content"
      >
        Scroll
        <span className="relative h-12 w-px overflow-hidden bg-white/15">
          <span className="animate-scroll-cue absolute inset-0 bg-gold" />
        </span>
      </button>

      {/* Location chip */}
      <motion.div {...fade(1.3)} className="glass glass-edge absolute bottom-24 right-10 hidden rounded-[3px] px-5 py-4 text-xs text-white/80 2xl:block">
        <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-gold">Head Office</span>
        <span className="mt-1.5 block">Surulere, Lagos · 6.49° N, 3.35° E</span>
      </motion.div>
    </section>
  );
}
