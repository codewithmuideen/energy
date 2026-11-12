import { useRef } from 'react';
import Breadcrumbs from './Breadcrumbs';
import Img from './Img';
import BackgroundVideo from './BackgroundVideo';
import ShaderBackground from './ShaderBackground';
import { Reveal, RevealLines } from './Reveal';
import { useGsap } from '../hooks/useGsap';
import { gsap } from '../animations/gsapConfig';

/**
 * Cinematic page header shared by inner pages. Background can be an image, a video or the shader.
 * `title` is an array of lines; use <em> for serif accents.
 */
export default function PageHero({ eyebrow, title, intro, crumbs, image, imageAlt = '', video, shader = false, children, compact = false }) {
  const ref = useRef(null);
  useGsap(ref, () => {
    gsap.to('[data-hero-bg]', {
      yPercent: 18,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
    });
  });

  return (
    <section ref={ref} className={`grain relative isolate flex overflow-hidden bg-ink ${compact ? 'min-h-[68svh]' : 'min-h-[86svh]'} items-end`}>
      <div data-hero-bg className="absolute inset-0 -z-20 will-change-transform">
        {shader ? (
          <ShaderBackground />
        ) : video ? (
          <BackgroundVideo src={video} poster={`/images/${image}-poster.webp`} eager />
        ) : (
          <Img name={image} alt={imageAlt} priority sizes="100vw" />
        )}
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />

      <div className="container-x relative pb-16 pt-44 md:pb-24">
        {crumbs && (
          <Reveal className="mb-10">
            <Breadcrumbs items={crumbs} />
          </Reveal>
        )}
        {eyebrow && (
          <Reveal>
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
        )}
        <RevealLines as="h1" animateOnMount delay={0.35} lines={title} className="h-display mt-6 max-w-6xl text-white [&_em]:serif [&_em]:text-gold" />
        {intro && (
          <Reveal delay={0.6}>
            <p className="lead mt-8 max-w-2xl text-white/75">{intro}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
