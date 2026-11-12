import { Link } from 'react-router-dom';
import { ArrowRight, Factory, HeartPulse, Leaf, Recycle, ShieldCheck, Users, Volume2, Wind } from 'lucide-react';
import Seo from '../components/Seo';
import Img from '../components/Img';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import BackgroundVideo from '../components/BackgroundVideo';
import { Reveal } from '../components/Reveal';
import { breadcrumbSchema } from '../utils/seo';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Sustainability', to: '/sustainability' },
];

const benefits = [
  { icon: Factory, title: 'Lower emissions', text: 'Every kilowatt-hour from the sun replaces fuel that would otherwise be burned in a generator.' },
  { icon: HeartPulse, title: 'Healthier air', text: 'Fewer generator fumes around homes, schools, clinics and markets.' },
  { icon: Volume2, title: 'Quieter communities', text: 'Solar and batteries are silent, so streets and homes get their peace back.' },
  { icon: Users, title: 'Energy access', text: 'Mini-grids and affordable systems bring reliable power to more people.' },
];

const commitments = [
  { icon: ShieldCheck, title: 'Safe, quality installations', text: 'Correct cabling, protection and earthing so systems are safe for families, workers and property.' },
  { icon: Recycle, title: 'Responsible end-of-life', text: 'We guide clients on the responsible handling and recycling of old batteries and equipment.' },
  { icon: Leaf, title: 'Right-sized systems', text: 'No oversized packages: right-sizing means less material, less waste and better value.' },
  { icon: Wind, title: 'Hybrid by design', text: 'Where generators remain, our designs minimise their run-hours and fuel use.' },
];

export default function Sustainability() {
  return (
    <>
      <Seo
        title="Sustainability"
        description="How ApexCore Energy's solar and renewable solutions reduce emissions, improve air quality and widen energy access in Nigeria."
        path="/sustainability"
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        crumbs={crumbs}
        tag="Sustainability"
        title="Clean energy for people and the planet"
        intro="Solar is more than a cost saving. It is cleaner air, quieter neighbourhoods and a more secure energy future for Nigeria."
        image="wind-solar"
        imageAlt="Wind turbine and solar panels under a clear blue sky"
      />

      <section className="section">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading tag="Why it matters" title="Turning abundant sunshine into a cleaner future" />
            <Reveal delay={0.1} className="mt-6 space-y-5 leading-relaxed">
              <p>
                Nigeria receives strong sunshine all year round, yet much of our power still comes from small fossil-fuel generators. That costs households and businesses dearly,
                and it costs our environment and our health too.
              </p>
              <p>Every solar system we install replaces generator hours with clean energy. Added together, these systems make a real difference to emissions and to the air we all breathe.</p>
            </Reveal>
          </div>
          <Reveal className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] overflow-hidden rounded-3xl">
              <Img name="offshore-wind" alt="Offshore wind turbines at sea" sizes="25vw" />
            </div>
            <div className="mt-12 aspect-[3/4] overflow-hidden rounded-3xl">
              <Img name="panel-close" alt="Close-up of solar panels in a field" sizes="25vw" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-x">
          <SectionHeading center tag="Impact" title="The difference solar makes" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08} className="card p-8">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-solar text-white">
                  <b.icon size={26} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-bold">{b.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed">{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy py-28 md:py-36">
        <div className="absolute inset-0 -z-10">
          <BackgroundVideo src="/videos/solar-aerial.mp4" poster="/images/solar-aerial-poster.webp" controls label="solar farm video" />
          <div className="absolute inset-0 bg-navy/75" />
        </div>
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <span className="tag tag-dark">Our pledge</span>
            <p className="mt-6 font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-bold leading-snug text-white">
              &ldquo;We measure our success not only in kilowatts installed, but in generators switched off and communities with cleaner air.&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pb-40 md:pb-48">
        <div className="container-x">
          <SectionHeading tag="Our commitments" title="How we hold ourselves accountable" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {commitments.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 0.08} className="flex gap-6 rounded-3xl border border-line p-8">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-solar-50 text-solar-600">
                  <c.icon size={26} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">{c.title}</h3>
                  <p className="mt-2 leading-relaxed">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <Link to="/contact" className="btn btn-primary">
              Start Your Solar Journey <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
