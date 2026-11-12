import { useRef } from 'react';
import Img from '../components/Img';
import SectionHeading from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { approach } from '../data/content';
import { useGsap } from '../hooks/useGsap';
import { gsap, ScrollTrigger } from '../animations/gsapConfig';

/**
 * Desktop (lg+): the section pins and the four steps travel horizontally as you scroll.
 * Smaller screens and reduced motion: a vertical editorial timeline.
 */
export default function BusinessApproach() {
  const ref = useRef(null);
  const track = useRef(null);

  useGsap(ref, () => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const el = track.current;
      const distance = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      gsap.to('[data-progress]', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: () => `+=${distance()}`, scrub: true },
      });
      // Images inside panels counter-drift for depth.
      gsap.utils.toArray('[data-panel-img]').forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -8 },
          { xPercent: 8, ease: 'none', scrollTrigger: { trigger: img, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } }
        );
      });
      return () => ScrollTrigger.refresh();
    });
    return () => mm.revert();
  });

  return (
    <section ref={ref} className="relative overflow-hidden bg-sand" aria-labelledby="approach-heading">
      <div className="lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <div className="container-x pt-28 lg:pt-24">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Our Approach" title={['Responsible Thinking.', <em key="e">Professional Execution.</em>]} titleClass="!text-[clamp(2rem,4vw,3.8rem)]" />
            <div className="hidden w-64 lg:block">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-strong">Scroll to explore</span>
              <div className="mt-3 h-px w-full bg-ink/15">
                <div data-progress className="h-px origin-left scale-x-0 bg-gold-deep" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pb-28 lg:mt-12 lg:pb-0">
          <ol ref={track} className="container-x flex flex-col gap-16 lg:w-max lg:max-w-none lg:flex-row lg:gap-10 lg:pr-[10vw]">
            {approach.map((a, i) => (
              <li key={a.step} className="relative grid gap-8 lg:w-[min(64vw,980px)] lg:grid-cols-2 lg:items-center">
                <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[2px] lg:aspect-[4/5]">
                  <div data-panel-img className="absolute inset-[-10%]">
                    <Img name={a.image} alt={a.imageAlt} sizes="(min-width:1024px) 32vw, 100vw" />
                  </div>
                  <span className="absolute left-5 top-4 font-serif text-[5rem] italic leading-none text-white drop-shadow-lg md:text-[7rem]">{a.step}</span>
                </Reveal>
                <Reveal delay={0.1} className="lg:pr-6">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold-deep">Step {a.step} / 04</span>
                  <h3 className="mt-4 text-[clamp(1.7rem,2.6vw,2.6rem)] font-semibold leading-tight tracking-tight text-ink">{a.title}</h3>
                  <p className="mt-5 max-w-md leading-relaxed text-slate-strong">{a.text}</p>
                  {i < approach.length - 1 && <span className="mt-8 hidden h-px w-24 bg-gold-deep/60 lg:block" aria-hidden="true" />}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
