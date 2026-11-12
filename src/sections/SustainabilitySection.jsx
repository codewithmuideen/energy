import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Img from '../components/Img';
import GlassPanel from '../components/GlassPanel';
import SectionHeading from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { responsibility } from '../data/content';
import { useGsap } from '../hooks/useGsap';
import { gsap } from '../animations/gsapConfig';

export default function SustainabilitySection() {
  const ref = useRef(null);
  useGsap(ref, () => {
    gsap.fromTo('[data-sus-bg]', { yPercent: -12 }, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink py-28 md:py-40" aria-labelledby="sustain-heading">
      <div data-sus-bg className="absolute inset-[-14%_0] -z-20">
        <Img name="river-delta" alt="" aria-hidden="true" sizes="100vw" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-transparent to-ink/70" />

      <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <SectionHeading
            tone="light"
            eyebrow="Sustainability & Responsibility"
            title={['Energy Development', <em key="e">With Responsibility.</em>]}
            intro="Energy shapes landscapes, livelihoods and communities. We take that seriously, and we let it inform how we plan, who we partner with and the standards we set for ourselves."
          />
          <Reveal delay={0.2} className="mt-10">
            <Link to="/sustainability" className="btn btn-gold" data-cursor="hover">
              Our Commitment <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-5 lg:col-start-8">
          <GlassPanel className="rounded-[3px] p-2">
            <ul>
              {responsibility.map((r, i) => (
                <li key={r.title} className={`flex gap-5 px-6 py-5 ${i ? 'border-t border-white/10' : ''}`}>
                  <span className="mt-1 h-2 w-2 shrink-0 rotate-45 bg-teal" aria-hidden="true" />
                  <span>
                    <span className="block font-semibold text-white">{r.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-mist">{r.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </Reveal>
      </div>
    </section>
  );
}
