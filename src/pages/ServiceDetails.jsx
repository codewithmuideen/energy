import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import Img from '../components/Img';
import GlassPanel from '../components/GlassPanel';
import SectionHeading from '../components/SectionHeading';
import { MaskReveal, Reveal } from '../components/Reveal';
import PartnershipCTA from '../sections/PartnershipCTA';
import NotFound from './NotFound';
import { getService, services } from '../data/services';
import { approach } from '../data/content';
import { breadcrumbSchema, serviceSchema } from '../utils/seo';

export default function ServiceDetails() {
  const { slug } = useParams();
  const s = getService(slug);
  if (!s) return <NotFound />;

  const idx = services.indexOf(s);
  const prev = services[(idx - 1 + services.length) % services.length];
  const next = services[(idx + 1) % services.length];
  const related = services.filter((x) => x !== s).slice(0, 3);
  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Our Services', to: '/services' },
    { label: s.title, to: `/services/${s.slug}` },
  ];

  return (
    <>
      <Seo title={s.title} description={s.short} path={`/services/${s.slug}`} image={`/images/${s.image}-1600.webp`} schema={[breadcrumbSchema(crumbs), serviceSchema(s)]} />
      <PageHero crumbs={crumbs} eyebrow={`Service ${s.index}`} title={[s.title]} intro={s.short} image={s.image} imageAlt={s.imageAlt} compact />

      <section className="bg-sand py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow eyebrow-dark">Overview</span>
              <p className="mt-6 text-[clamp(1.35rem,2.1vw,1.9rem)] font-medium leading-snug tracking-tight text-ink">{s.intro}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-14 text-xs font-bold uppercase tracking-[0.24em] text-ink">What the service involves</h2>
              <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
                {s.involves.map((x, i) => (
                  <li key={x} className="flex gap-5 py-5">
                    <span className="font-serif text-lg italic text-gold-deep">0{i + 1}</span>
                    <span className="leading-relaxed text-slate-strong">{x}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal className="sticky top-32">
              <div className="rounded-[2px] bg-ink p-8 text-white md:p-10">
                <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Potential applications</h2>
                <ul className="mt-6 space-y-4">
                  {s.applications.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-mist">
                      <Check size={16} className="mt-1 shrink-0 text-teal" aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>
                <Link to={`/contact?subject=${encodeURIComponent(s.title)}`} className="btn btn-gold mt-10 w-full" data-cursor="hover">
                  Enquire About This <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <p className="mt-5 text-xs leading-relaxed text-white/50">
                  Scope, capability and partner arrangements are confirmed for each engagement.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* How we deliver */}
      <section className="grain relative overflow-hidden bg-deep-2 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading tone="light" eyebrow="How We Deliver" title={['A Consistent', <em key="e">Way of Working.</em>]} />
          <ol className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {approach.map((a, i) => (
              <Reveal as="li" key={a.step} delay={i * 0.08}>
                <GlassPanel className="h-full rounded-[3px] p-7">
                  <span className="font-serif text-4xl italic text-gold">{a.step}</span>
                  <h3 className="mt-6 text-lg font-semibold text-white">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{a.text}</p>
                </GlassPanel>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Related Services" title={['Explore More']} />
            <div className="flex gap-3">
              <Link to={`/services/${prev.slug}`} className="btn btn-line !px-4" aria-label={`Previous service: ${prev.title}`}>
                <ArrowLeft size={16} aria-hidden="true" />
              </Link>
              <Link to={`/services/${next.slug}`} className="btn btn-ink" aria-label={`Next service: ${next.title}`}>
                Next <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal as="li" key={r.slug} delay={i * 0.08}>
                <Link to={`/services/${r.slug}`} className="group block" data-cursor="hover">
                  <MaskReveal className="img-zoom aspect-[4/3] rounded-[2px]">
                    <Img name={r.image} alt={r.imageAlt} sizes="(min-width:768px) 33vw, 100vw" />
                  </MaskReveal>
                  <span className="mt-5 block font-serif italic text-gold-deep">{r.index}</span>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-ink group-hover:text-gold-deep">{r.title}</h3>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <PartnershipCTA title={['Discuss Your', <em key="e">Requirements.</em>]} />
    </>
  );
}
