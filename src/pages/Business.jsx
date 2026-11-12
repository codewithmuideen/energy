import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import SplitFeature from '../components/SplitFeature';
import SectionHeading from '../components/SectionHeading';
import Img from '../components/Img';
import { MaskReveal, Reveal, RevealLines } from '../components/Reveal';
import PartnershipCTA from '../sections/PartnershipCTA';
import { breadcrumbSchema } from '../utils/seo';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Our Business', to: '/business' },
];

const opportunities = [
  { title: 'Downstream supply', text: 'Reliable product supply for commercial and industrial users who cannot afford interruptions.' },
  { title: 'Commercial facilitation', text: 'Bringing buyers, sellers and service providers together around clear, well-documented terms.' },
  { title: 'Market entry support', text: 'Helping international organisations understand and approach the Nigerian energy market.' },
  { title: 'Procurement for operators', text: 'Simplifying how energy businesses source equipment, materials and specialist services.' },
];

const valueCreation = [
  { k: 'For partners', v: 'A dependable, transparent counterpart that prepares thoroughly and follows through.' },
  { k: 'For clients', v: 'Solutions shaped around real operational needs rather than generic offers.' },
  { k: 'For the sector', v: 'Professional standards that contribute to a more trusted, better-functioning industry.' },
  { k: 'For communities', v: 'Decisions that consider the people and places energy activity touches.' },
];

export default function Business() {
  return (
    <>
      <Seo
        title="Our Business"
        description="How Apex Core approaches the energy business: our philosophy, industry perspective, commercial opportunities, strategic relationships and commitment to responsible practice."
        path="/business"
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Our Business"
        title={['Commercial Discipline.', <em key="e">Long-Term Thinking.</em>]}
        intro="An overview of how we see the energy industry, where we focus our attention and the principles that shape every business decision we make."
        video="/videos/refinery-aerial.mp4"
        image="refinery-aerial"
      />

      {/* Business philosophy */}
      <section className="bg-sand py-24 md:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <span className="eyebrow eyebrow-dark">Business Philosophy</span>
          </Reveal>
          <div className="lg:col-span-9">
            <RevealLines
              as="p"
              className="text-[clamp(1.7rem,3.6vw,3.3rem)] font-medium leading-[1.15] tracking-tight text-ink [&_em]:serif [&_em]:text-gold-deep"
              lines={[
                <>We believe good business in energy is</>,
                <>built on <em>three things:</em> sound judgement,</>,
                <>trusted relationships and the patience</>,
                <>to do things <em>properly.</em></>,
              ]}
            />
            <Reveal delay={0.25}>
              <div className="mt-12 grid gap-8 text-slate-strong md:grid-cols-2">
                <p className="leading-relaxed">
                  We evaluate every opportunity on its merits: commercial viability, the credibility of the people involved, regulatory requirements and the wider
                  impact. If an opportunity does not meet our standards, we are comfortable walking away.
                </p>
                <p className="leading-relaxed">
                  When we commit, we commit fully, with careful preparation, clear communication and a determination to deliver what was agreed.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SplitFeature
        tone="ink"
        eyebrow="Energy Industry Perspective"
        title={['A Sector in', <em key="e">Transition.</em>]}
        image="pumpjack"
        imageAlt="Oil pump jack working against a bright sky at an oil field"
      >
        <p>
          Nigeria&rsquo;s energy landscape is evolving. Reform, new investment and a growing focus on efficiency and responsibility are reshaping how the industry
          operates, and creating space for disciplined, well-run businesses.
        </p>
        <p>
          At the same time, the global energy mix is changing. We believe conventional energy will remain essential for years to come, even as new solutions grow
          alongside it. Our role is to operate responsibly within that reality and to stay alert to where it is heading.
        </p>
      </SplitFeature>

      {/* Commercial opportunities */}
      <section className="bg-white py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow="Commercial Opportunities" title={['Where We', <em key="e">Focus Attention.</em>]} intro="Areas where we see genuine demand and where a professional, dependable counterpart can make a meaningful difference." />
          <ol className="mt-16 grid gap-px overflow-hidden rounded-[2px] border border-ink/10 bg-ink/10 md:grid-cols-2">
            {opportunities.map((o, i) => (
              <Reveal as="li" key={o.title} delay={(i % 2) * 0.08} className="group bg-white p-8 transition-colors duration-700 hover:bg-sand md:p-12">
                <span className="font-serif text-xl italic text-gold-deep">0{i + 1}</span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink">{o.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-slate-strong">{o.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <SplitFeature
        reverse
        eyebrow="Strategic Relationships"
        title={['Partnerships Built', <em key="e">to Last.</em>]}
        image="engineers-site"
        imageAlt="Engineers in hard hats meeting at an industrial facility"
      >
        <p>
          The energy industry runs on relationships. We are building ours carefully, with operators, suppliers, logistics providers, investors and advisers who share
          our commitment to doing things properly.
        </p>
        <p>
          <strong>We value partners who are transparent, technically capable and serious about safety and compliance.</strong> In return, we offer preparation,
          straightforward communication and reliability.
        </p>
      </SplitFeature>

      {/* Value creation: sticky heading */}
      <section className="grain relative overflow-hidden bg-ink py-24 md:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <SectionHeading tone="light" eyebrow="Value Creation" title={['Value That', <em key="e">Is Shared.</em>]} />
            <MaskReveal className="mt-10 hidden aspect-[4/3] rounded-[2px] lg:block">
              <Img name="terminal-night" alt="Port terminal and logistics yard illuminated at night" sizes="35vw" />
            </MaskReveal>
          </div>
          <dl className="lg:col-span-6 lg:col-start-7">
            {valueCreation.map((v, i) => (
              <Reveal key={v.k} className={`py-10 ${i ? 'border-t border-white/10' : ''}`}>
                <dt className="text-xs font-bold uppercase tracking-[0.26em] text-gold">{v.k}</dt>
                <dd className="mt-4 text-[clamp(1.35rem,2.2vw,2rem)] font-medium leading-snug tracking-tight text-white">{v.v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <SplitFeature
        eyebrow="Responsible Business Practices"
        title={['Doing Business', <em key="e">the Right Way.</em>]}
        image="port-terminal"
        imageAlt="Aerial view of a busy commercial port with cranes and container ships"
        tone="white"
      >
        <p>
          Responsible business is not a department. It is a set of everyday choices: complying with applicable laws and regulations, keeping accurate records,
          refusing to cut corners on safety and treating partners and employees fairly.
        </p>
        <p>We expect these standards of ourselves, and we look for them in everyone we work with.</p>
      </SplitFeature>

      <PartnershipCTA />
    </>
  );
}
