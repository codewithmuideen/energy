import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Info } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import Img from '../components/Img';
import { MaskReveal, Reveal } from '../components/Reveal';
import PartnershipCTA from '../sections/PartnershipCTA';
import { services } from '../data/services';
import { breadcrumbSchema, serviceSchema } from '../utils/seo';
import { scrollToTarget } from '../animations/gsapConfig';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Our Services', to: '/services' },
];

export default function Services() {
  return (
    <>
      <Seo
        title="Our Services"
        description="Explore Apex Core's focus areas across petroleum and oil resources, energy solutions, commercial services, supply and distribution, energy trading, procurement and partnerships."
        path="/services"
        schema={[breadcrumbSchema(crumbs), ...services.map(serviceSchema)]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Our Services"
        title={['Focused Where', <>We Add <em>Real Value.</em></>]}
        intro="Seven connected areas of activity across the energy value chain, each approached with the same preparation, care and accountability."
        image="refinery-night"
        imageAlt="Refinery towers and flare stacks illuminated at night"
      />

      {/* Index strip */}
      <nav aria-label="Service areas" className="sticky top-0 z-30 hidden border-b border-ink/10 bg-sand/90 backdrop-blur-md lg:block">
        <ul className="container-x flex gap-8 overflow-x-auto py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-strong">
          {services.map((s) => (
            <li key={s.slug} className="shrink-0">
              <a
                href={`#${s.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget(`#${s.slug}`, -60);
                }}
                className="link-line hover:text-ink"
              >
                <span className="mr-1.5 font-serif normal-case italic text-gold-deep">{s.index}</span>
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="bg-sand pb-10 pt-20">
        <div className="container-x">
          <Reveal>
            <p className="flex max-w-3xl gap-3 border-l-2 border-gold pl-4 text-sm leading-relaxed text-slate-strong">
              <Info size={18} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
              These service areas describe the intended scope of Apex Core&rsquo;s business. Specific capabilities, licences and partner arrangements are confirmed on an
              engagement-by-engagement basis. Please contact us to discuss your requirements.
            </p>
          </Reveal>
        </div>
      </section>

      {services.map((s, i) => {
        const reverse = i % 2 === 1;
        return (
          <section key={s.slug} id={s.slug} className={`scroll-mt-24 py-20 md:py-28 ${i % 2 ? 'bg-white' : 'bg-sand'}`} aria-labelledby={`${s.slug}-title`}>
            <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
              <div className={`relative lg:col-span-6 ${reverse ? 'lg:order-2 lg:col-start-7' : ''}`}>
                <MaskReveal direction={reverse ? 'right' : 'left'} className="aspect-[5/4] rounded-[2px]">
                  <Img name={s.image} alt={s.imageAlt} sizes="(min-width:1024px) 48vw, 100vw" />
                </MaskReveal>
                <span className={`pointer-events-none absolute -top-10 font-serif text-[clamp(5rem,10vw,9rem)] italic leading-none text-gold/25 ${reverse ? '-left-2' : '-right-2'}`} aria-hidden="true">
                  {s.index}
                </span>
              </div>
              <div className={`lg:col-span-5 ${reverse ? 'lg:order-1' : 'lg:col-start-8'}`}>
                <Reveal>
                  <span className="eyebrow eyebrow-dark">Service {s.index}</span>
                  <h2 id={`${s.slug}-title`} className="mt-5 text-[clamp(2rem,3.4vw,3.2rem)] font-semibold leading-[1.05] tracking-tight text-ink">
                    {s.title}
                  </h2>
                  <p className="mt-6 leading-relaxed text-slate-strong">{s.intro}</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-ink">What it involves</h3>
                  <ul className="mt-4 space-y-2.5">
                    {s.involves.slice(0, 3).map((x) => (
                      <li key={x} className="flex gap-3 text-sm leading-relaxed text-slate-strong">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-deep" aria-hidden="true" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-ink">Potential applications</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.applications.map((a) => (
                      <li key={a} className="rounded-[2px] border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink/80">
                        {a}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
                  <Link to={`/services/${s.slug}`} className="btn btn-ink" data-cursor="hover">
                    Learn More <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link to={`/contact?subject=${encodeURIComponent(s.title)}`} className="btn btn-line" data-cursor="hover">
                    Enquire <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      <PartnershipCTA title={['Have a Requirement', <em key="e">in Mind?</em>]} text="Tell us what you are working on. We will respond with a considered view of how, and whether, we can help." />
    </>
  );
}
