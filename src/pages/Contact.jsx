import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import QuoteForm from '../components/QuoteForm';
import { Reveal } from '../components/Reveal';
import { SITE } from '../data/site';
import { services } from '../data/services';
import { breadcrumbSchema } from '../utils/seo';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Contact', to: '/contact' },
];

export default function Contact() {
  const [params] = useSearchParams();
  const requested = params.get('service');
  const defaultService = services.find((s) => s.slug === requested)?.title || '';

  const cards = [
    { icon: Phone, label: 'Call us', value: SITE.phoneDisplay, href: `tel:${SITE.phoneHref}` },
    { icon: Mail, label: 'Email us', value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MapPin, label: 'Visit us', value: SITE.addressLine, href: SITE.mapsUrl, external: true },
    { icon: Clock, label: 'Working hours', value: SITE.hours },
  ];

  return (
    <>
      <Seo
        title="Contact Us & Get a Quote"
        description={`Request a free solar site survey and quotation from ApexCore Energy. Call ${SITE.phoneDisplay} or email ${SITE.email}.`}
        path="/contact"
        schema={[breadcrumbSchema(crumbs), { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact ApexCore Energy', url: `${SITE.url}/contact` }]}
      />
      <PageHero
        crumbs={crumbs}
        tag="Contact"
        title="Let's power your property with the sun"
        intro="Request a free site survey and quotation, or simply ask a question. Our energy advisors respond quickly."
        image="installer-roof"
        imageAlt="Installer fitting a solar panel on a roof"
      />

      <section className="relative z-10 -mt-12">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => {
            const Inner = (
              <>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-solar text-white">
                  <c.icon size={21} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted">{c.label}</span>
                  <span className="mt-0.5 block break-words font-display text-[0.95rem] font-bold text-navy">{c.value}</span>
                </span>
              </>
            );
            return (
              <Reveal key={c.label} delay={i * 0.06}>
                {c.href ? (
                  <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="card flex h-full items-start gap-4 p-6">
                    {Inner}
                  </a>
                ) : (
                  <div className="card flex h-full items-start gap-4 p-6">{Inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section pb-40 md:pb-48">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <span className="tag">Free quote</span>
            <h2 className="h-display mt-5">Request your free solar quote</h2>
            <p className="lead mt-4">Share a few details and we'll call to arrange your free site survey. Fields marked * are required.</p>
            <div className="mt-10">
              <QuoteForm defaultService={defaultService} />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-line">
              {SITE.features.mapEmbed ? (
                <iframe
                  title="ApexCore Energy office location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent('12 Shade Shomefun Street, Aguda, Surulere, Lagos, Nigeria')}&output=embed`}
                  className="aspect-square w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : null}
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 bg-paper p-5 text-sm font-semibold text-navy hover:text-solar-600">
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-solar" aria-hidden="true" /> {SITE.addressShort}
                </span>
                <span className="inline-flex items-center gap-1">
                  Directions <ArrowUpRight size={15} aria-hidden="true" />
                </span>
              </a>
            </div>
            {SITE.features.whatsapp && (
              <a href={`https://wa.me/${SITE.phoneHref.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
                <FaWhatsapp size={18} aria-hidden="true" /> Chat on WhatsApp
              </a>
            )}
            <div className="rounded-3xl bg-navy p-8 text-white/75">
              <h3 className="text-lg font-bold !text-white">What happens next?</h3>
              <ol className="mt-5 space-y-4 text-sm">
                {['We call to understand your needs', 'We visit for a free site survey and load audit', 'You receive a clear written proposal', 'We install, commission and support your system'].map(
                  (t, i) => (
                    <li key={t} className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-solar font-display text-xs font-bold text-white">{i + 1}</span>
                      {t}
                    </li>
                  )
                )}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
