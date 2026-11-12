import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import Seo from '../components/Seo';
import Img from '../components/Img';
import Icon from '../components/Icon';
import PageHero from '../components/PageHero';
import QuoteForm from '../components/QuoteForm';
import { Reveal } from '../components/Reveal';
import { getService, services } from '../data/services';
import { SITE } from '../data/site';
import { breadcrumbSchema, serviceSchema } from '../utils/seo';
import NotFound from './NotFound';

export default function ServiceDetails() {
  const { slug } = useParams();
  const service = getService(slug);
  if (!service) return <NotFound />;

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: service.title, to: `/services/${service.slug}` },
  ];

  return (
    <>
      <Seo title={service.title} description={service.short} path={`/services/${service.slug}`} schema={[breadcrumbSchema(crumbs), serviceSchema(service)]} />
      <PageHero crumbs={crumbs} tag="Service" title={service.title} intro={service.short} image={service.image} imageAlt={service.imageAlt} />

      <section className="section pb-40 md:pb-48">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          {/* Sidebar */}
          <aside className="order-2 space-y-6 lg:order-1 lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <nav aria-label="Services" className="rounded-3xl bg-paper p-4">
                <p className="px-3 pb-2 pt-2 font-display text-sm font-bold text-navy">All services</p>
                <ul className="space-y-1">
                  {services.map((s) => {
                    const active = s.slug === service.slug;
                    return (
                      <li key={s.slug}>
                        <Link
                          to={`/services/${s.slug}`}
                          aria-current={active ? 'page' : undefined}
                          className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                            active ? 'bg-solar text-white' : 'bg-white text-navy hover:text-solar-600'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <Icon name={s.icon} size={18} /> {s.title}
                          </span>
                          <ArrowRight size={15} aria-hidden="true" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white">
                <div className="cell-grid-light absolute inset-0" aria-hidden="true" />
                <div className="relative">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-solar">
                    <Phone size={22} aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-white/70">Need help choosing?</p>
                  <a href={`tel:${SITE.phoneHref}`} className="mt-1 block font-display text-2xl font-bold">
                    {SITE.phoneDisplay}
                  </a>
                  <p className="mt-3 text-sm text-white/60">{SITE.hours}</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <article className="order-1 lg:order-2 lg:col-span-8">
            <Reveal className="overflow-hidden rounded-3xl">
              <div className="aspect-[16/9]">
                <Img name={service.image} alt={service.imageAlt} sizes="(min-width:1024px) 60vw, 100vw" />
              </div>
            </Reveal>
            <Reveal>
              <h2 className="h-display mt-12 !text-[clamp(1.7rem,3vw,2.4rem)]">Overview</h2>
              <p className="lead mt-5">{service.intro}</p>
            </Reveal>

            <Reveal>
              <h2 className="mt-12 text-2xl font-bold">Key benefits</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.benefits.map((b) => (
                  <li key={b} className="flex gap-3 rounded-2xl bg-paper p-5">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-solar" aria-hidden="true" />
                    <span className="text-navy">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-line p-7">
                <h3 className="text-xl font-bold">What's included</h3>
                <ul className="mt-5 space-y-3">
                  {service.includes.map((x) => (
                    <li key={x} className="flex items-center gap-3">
                      <span className="h-2 w-2 shrink-0 rotate-45 bg-solar" aria-hidden="true" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-line p-7">
                <h3 className="text-xl font-bold">Ideal for</h3>
                <ul className="mt-5 space-y-3">
                  {service.idealFor.map((x) => (
                    <li key={x} className="flex items-center gap-3">
                      <span className="h-2 w-2 shrink-0 rotate-45 bg-sun" aria-hidden="true" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal className="mt-12 rounded-3xl bg-paper p-7 md:p-10">
              <h2 className="text-2xl font-bold">Request a quote for {service.title.toLowerCase()}</h2>
              <p className="mt-2">Free survey, written proposal, no obligation.</p>
              <div className="mt-8">
                <QuoteForm defaultService={service.title} />
              </div>
            </Reveal>
          </article>
        </div>
      </section>
    </>
  );
}
