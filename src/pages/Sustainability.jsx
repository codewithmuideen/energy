import { HardHat, Leaf, Scale, Sprout, Users } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import SplitFeature from '../components/SplitFeature';
import SectionHeading from '../components/SectionHeading';
import GlassPanel from '../components/GlassPanel';
import Img from '../components/Img';
import { Reveal, RevealLines } from '../components/Reveal';
import PartnershipCTA from '../sections/PartnershipCTA';
import { breadcrumbSchema } from '../utils/seo';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Sustainability', to: '/sustainability' },
];

const pillars = [
  { icon: Leaf, title: 'Environmental awareness', text: 'Factoring environmental considerations into how we plan, whom we partner with and how products are handled.' },
  { icon: HardHat, title: 'Health & safety', text: 'Treating safe working practices as non-negotiable, for our people and for every contractor we engage.' },
  { icon: Users, title: 'Community engagement', text: 'Respecting and listening to communities where energy activity takes place.' },
  { icon: Scale, title: 'Responsible operations', text: 'Complying with applicable regulations, documenting our work and owning our decisions.' },
  { icon: Sprout, title: 'Long-term perspective', text: 'Measuring success by the durability of what we build, not the speed of individual transactions.' },
];

export default function Sustainability() {
  return (
    <>
      <Seo
        title="Sustainability"
        description="Apex Core's approach to responsibility: environmental awareness, health and safety, community engagement, responsible operations and a long-term perspective on energy."
        path="/sustainability"
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Sustainability"
        title={['Responsibility,', <em key="e">Practised Daily.</em>]}
        intro="Energy and environment are inseparable. We approach sustainability not as a slogan but as a series of everyday decisions about how we operate and whom we work with."
        video="/videos/jungle-river.mp4"
        image="jungle-river"
      />

      {/* Our responsibility */}
      <section className="bg-sand py-24 md:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <span className="eyebrow eyebrow-dark">Our Responsibility</span>
          </Reveal>
          <div className="lg:col-span-9">
            <RevealLines
              as="p"
              className="text-[clamp(1.7rem,3.6vw,3.3rem)] font-medium leading-[1.15] tracking-tight text-ink [&_em]:serif [&_em]:text-gold-deep"
              lines={[<>Energy powers progress. It also carries</>, <>a <em>duty of care</em> to the people, places</>, <>and ecosystems it touches.</>]}
            />
            <Reveal delay={0.25}>
              <p className="mt-10 max-w-3xl leading-relaxed text-slate-strong">
                As a growing company, we are building responsibility into our foundations rather than adding it later. We do not publish environmental performance
                figures or certifications until they can be properly measured and verified. When we report, we will report honestly.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative isolate overflow-hidden bg-ink py-24 md:py-36">
        <div className="absolute inset-0 -z-20 opacity-40">
          <Img name="forest" alt="" aria-hidden="true" sizes="100vw" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/85 to-ink" />
        <div className="container-x">
          <SectionHeading tone="light" eyebrow="Our Commitments" title={['Five Areas of', <em key="e">Focus.</em>]} />
          <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 3) * 0.08} className={i === 0 ? 'lg:row-span-2' : ''}>
                <GlassPanel className="flex h-full flex-col rounded-[3px] p-8">
                  <p.icon size={26} strokeWidth={1.4} className="text-teal" aria-hidden="true" />
                  <h3 className={`mt-auto pt-10 font-semibold tracking-tight text-white ${i === 0 ? 'text-3xl' : 'text-xl'}`}>{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-mist">{p.text}</p>
                </GlassPanel>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <SplitFeature eyebrow="Environmental Awareness" title={['Respect for', <em key="e">Land and Water.</em>]} image="river-aerial" imageAlt="Aerial view of a calm river bordered by dense green forest">
        <p>
          Petroleum products demand careful handling. Spills, leaks and improper disposal can harm ecosystems and livelihoods for years. We prioritise partners with
          proper storage, transport and handling practices, and we treat prevention as far preferable to remediation.
        </p>
        <p>Where environmental considerations affect a decision, we take them seriously, even when doing so is less convenient.</p>
      </SplitFeature>

      <SplitFeature reverse tone="white" eyebrow="Health & Safety" title={['Everyone Goes', <em key="e">Home Safely.</em>]} image="engineers-plant" imageAlt="Engineers wearing hard hats and high-visibility vests at a power facility">
        <p>
          Safety is the first consideration in every engagement. We expect clear procedures, appropriate protective equipment and a culture in which anyone can raise a
          concern or stop unsafe work.
        </p>
        <p>We hold our partners and contractors to the same expectation, and we regard safety performance as a key factor when choosing whom to work with.</p>
      </SplitFeature>

      <SplitFeature tone="ink" eyebrow="Community Engagement" title={['Good Neighbours,', <em key="e">Wherever We Work.</em>]} image="river-delta" imageAlt="Winding river through wetlands seen from above">
        <p>
          Energy activity happens in real places, among real communities. We believe in respectful engagement, listening to concerns and considering local impact
          when planning activities.
        </p>
        <p>As our business develops, we intend to explore community initiatives that are meaningful, practical and sustained over time.</p>
      </SplitFeature>

      <SplitFeature eyebrow="Responsible Operations" title={['Accountability', <em key="e">by Design.</em>]} image="engineer-corridor" imageAlt="Technician walking through an industrial equipment corridor">
        <p>
          Responsible operations rest on simple disciplines: complying with applicable laws and regulations, maintaining accurate documentation and being honest about
          what we do.
        </p>
        <p>We aim to make accountability part of how the business is built, so that it scales naturally as we grow.</p>
      </SplitFeature>

      {/* Long-term perspective */}
      <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-ink py-28">
        <div className="absolute inset-0 -z-20">
          <Img name="landscape" alt="" aria-hidden="true" sizes="100vw" />
        </div>
        <div className="absolute inset-0 -z-10 bg-ink/70" />
        <div className="container-x max-w-5xl text-center">
          <Reveal>
            <span className="eyebrow justify-center">Our Long-Term Perspective</span>
          </Reveal>
          <RevealLines
            className="mt-8 text-[clamp(2rem,4.6vw,4.4rem)] font-medium leading-[1.1] tracking-tight text-white [&_em]:serif [&_em]:text-gold"
            lines={[<>We want to build a business that</>, <>the <em>next generation</em> would be</>, <>proud to inherit.</>]}
          />
        </div>
      </section>

      <PartnershipCTA title={['Share Our', <em key="e">Standards?</em>]} text="We welcome conversations with organisations that take responsibility as seriously as we do." />
    </>
  );
}
