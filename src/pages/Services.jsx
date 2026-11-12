import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';
import Faq from '../components/Faq';
import { Reveal } from '../components/Reveal';
import { ServiceCard } from '../components/Cards';
import { services } from '../data/services';
import { faqs, process } from '../data/content';
import { breadcrumbSchema } from '../utils/seo';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
];

export default function Services() {
  return (
    <>
      <Seo
        title="Solar Services"
        description="Residential and commercial solar, battery storage, mini-grids, energy audits and solar maintenance across Nigeria from ApexCore Energy."
        path="/services"
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        crumbs={crumbs}
        tag="Our Services"
        title="Solar & renewable energy solutions"
        intro="Everything you need to generate, store and manage your own clean power, delivered by one experienced team."
        image="panels-aerial"
        imageAlt="Aerial view of solar panels on green grass"
      />
      <section className="section">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08} className="h-full">
                <ServiceCard service={s} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-navy">
        <div className="container-x">
          <SectionHeading dark center tag="How it works" title="From first call to clean power in four steps" />
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal as="li" key={p.step} delay={i * 0.08} className="rounded-3xl border border-white/10 bg-white/[0.05] p-8">
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-solar text-white">
                    <Icon name={p.icon} size={26} />
                  </span>
                  <span className="font-display text-4xl font-extrabold text-white/10">{p.step}</span>
                </div>
                <h3 className="mt-6 text-lg font-bold !text-white">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-white/65">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section pb-40 md:pb-48">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading tag="FAQ" title="Common questions" intro="If you have a question that isn't answered here, call or message us. We're happy to help." />
          </div>
          <Reveal className="lg:col-span-8">
            <Faq items={faqs} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
