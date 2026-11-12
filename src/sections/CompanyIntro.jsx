import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Img from '../components/Img';
import SectionHeading from '../components/SectionHeading';
import { MaskReveal, Reveal } from '../components/Reveal';
import { useGsap } from '../hooks/useGsap';
import { gsap } from '../animations/gsapConfig';

const focus = ['Oil & petroleum resources', 'Energy solutions', 'Supply & distribution', 'Strategic partnerships'];

export default function CompanyIntro() {
  const ref = useRef(null);
  useGsap(ref, () => {
    gsap.to('[data-float-img]', {
      yPercent: -18,
      ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  return (
    <section id="intro" ref={ref} className="relative overflow-hidden bg-sand py-28 md:py-40">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Asymmetric image composition */}
        <div className="relative lg:col-span-6">
          <MaskReveal className="aspect-[4/5] w-[86%] rounded-[2px] md:aspect-[5/6]">
            <Img name="offshore-dusk" alt="Offshore production platform illuminated at dusk with a support vessel nearby" sizes="(min-width:1024px) 45vw, 90vw" />
          </MaskReveal>
          <div data-float-img className="absolute -bottom-10 right-0 w-[46%] border-[6px] border-sand shadow-2xl md:-bottom-16">
            <MaskReveal className="aspect-[4/5]" delay={0.25}>
              <Img name="engineers-plan" alt="Engineers reviewing project plans on site" sizes="(min-width:1024px) 22vw, 45vw" />
            </MaskReveal>
          </div>
          <span className="absolute -left-7 top-0 hidden rotate-180 text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-slate-strong [writing-mode:vertical-rl] xl:block" aria-hidden="true">
            Lagos · Nigeria
          </span>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <SectionHeading eyebrow="Who We Are" title={['Energy Expertise.', <em key="v">A Vision for Progress.</em>]} titleClass="!text-[clamp(2.1rem,4.2vw,4rem)]" />
          <Reveal delay={0.1}>
            <p className="lead mt-8 text-ink/85">
              Apex Core Oil and Energy Resources Ltd is an energy resources company headquartered in Lagos, created to participate in Nigeria&rsquo;s oil, gas and wider
              energy sector with professionalism and long-term intent.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 leading-relaxed text-slate-strong">
              We believe the energy industry rewards those who prepare carefully, choose partners wisely and honour their commitments. That belief shapes how we
              evaluate opportunities, how we work with others and how we intend to grow, steadily and responsibly, alongside the people and businesses we serve.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-10 grid grid-cols-2 border-t hairline-dark">
              {focus.map((f, i) => (
                <li key={f} className={`border-b hairline-dark py-4 text-sm font-semibold text-ink ${i % 2 === 0 ? 'pr-4' : 'border-l pl-5'}`}>
                  <span className="mr-2 font-serif text-gold-deep italic">0{i + 1}</span>
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.35} className="mt-10">
            <Link to="/about" className="btn btn-ink" data-cursor="hover">
              About Apex Core <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
