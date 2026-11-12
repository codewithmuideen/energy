import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import SplitFeature from '../components/SplitFeature';
import SectionHeading from '../components/SectionHeading';
import GlassPanel from '../components/GlassPanel';
import ShaderBackground from '../components/ShaderBackground';
import { Reveal, RevealLines } from '../components/Reveal';
import PartnershipCTA from '../sections/PartnershipCTA';
import { approach, mission, values, vision } from '../data/content';
import { breadcrumbSchema } from '../utils/seo';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn who Apex Core Oil and Energy Resources Ltd is: a Lagos-based energy resources company guided by integrity, professionalism and a commitment to responsible business."
        path="/about"
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="About Apex Core"
        title={['A Company Built', <>on <em>Considered Ambition.</em></>]}
        intro="We are a Nigerian energy resources company with a simple conviction: that lasting success in energy comes from preparation, partnership and principle."
        image="offshore-crew"
        imageAlt="Crew transfer vessel alongside an offshore oil platform under a clear sky"
      />

      <SplitFeature
        id="who-we-are"
        eyebrow="Who We Are"
        title={['Grounded in Lagos.', <em key="e">Focused on Energy.</em>]}
        image="engineers-horizon"
        imageAlt="Engineers in hard hats looking out across an open project site"
      >
        <p className="lead !text-ink/85">
          Apex Core Oil and Energy Resources Ltd is a Lagos-headquartered company established to take part in the oil, gas and wider energy resources sector.
        </p>
        <p>
          Our work centres on the commercial side of energy: understanding markets, building relationships with credible partners and pursuing opportunities that
          make sense for the long term. We are deliberately measured in how we grow, because in this industry, reputation is earned slowly and lost quickly.
        </p>
        <p>
          We see Nigeria&rsquo;s energy sector as a place of real opportunity, and real responsibility. Both shape the way we operate.
        </p>
      </SplitFeature>

      {/* Corporate philosophy */}
      <section className="relative isolate overflow-hidden bg-ink py-28 md:py-40">
        <div className="absolute inset-0 -z-10 opacity-80">
          <ShaderBackground glow={0.8} />
        </div>
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">Our Corporate Philosophy</span>
          </Reveal>
          <RevealLines
            as="blockquote"
            className="mt-10 max-w-6xl text-[clamp(1.9rem,4.4vw,4.2rem)] font-medium leading-[1.12] tracking-tight text-white [&_em]:serif [&_em]:text-gold"
            lines={[
              <>&ldquo;Energy is a long game. We play it with</>,
              <><em>patience, preparation</em> and an</>,
              <>unwavering respect for our word.&rdquo;</>,
            ]}
          />
          <Reveal delay={0.3}>
            <p className="mt-12 max-w-2xl leading-relaxed text-mist">
              We would rather do fewer things properly than many things carelessly. That philosophy guides the opportunities we pursue, the partners we choose and the
              way we conduct ourselves when no one is watching.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vision & mission */}
      <section id="vision-mission" className="bg-sand py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow="Direction" title={['Our Vision', <em key="e">&amp; Mission.</em>]} />
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {[
              { label: 'Our Vision', text: vision, n: '01' },
              { label: 'Our Mission', text: mission, n: '02' },
            ].map((b, i) => (
              <Reveal key={b.label} delay={i * 0.12}>
                <div className={`relative h-full overflow-hidden rounded-[2px] p-10 md:p-14 ${i ? 'bg-ink text-white' : 'border border-ink/10 bg-white'}`}>
                  <span className={`font-serif text-7xl italic ${i ? 'text-gold/30' : 'text-gold-deep/25'}`}>{b.n}</span>
                  <h3 className={`mt-6 text-xs font-bold uppercase tracking-[0.28em] ${i ? 'text-gold' : 'text-gold-deep'}`}>{b.label}</h3>
                  <p className={`mt-5 text-[clamp(1.3rem,2vw,1.85rem)] font-medium leading-snug tracking-tight ${i ? 'text-white' : 'text-ink'}`}>{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core values */}
      <section id="values" className="grain relative overflow-hidden bg-deep-2 py-24 md:py-36">
        <div className="container-x">
          <SectionHeading tone="light" eyebrow="Our Core Values" title={['Six Principles.', <em key="e">One Standard.</em>]} />
          <ul className="mt-16 grid gap-px overflow-hidden rounded-[2px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={(i % 3) * 0.08} className="group bg-deep-2 p-8 transition-colors duration-700 hover:bg-ink md:p-10">
                <span className="font-serif text-3xl italic text-gold/70 transition group-hover:text-gold">{v.numeral}</span>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-white">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{v.text}</p>
                <span className="mt-8 block h-px w-10 bg-gold/40 transition-all duration-700 group-hover:w-full group-hover:bg-gold" aria-hidden="true" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach to business */}
      <section className="bg-white py-24 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <SectionHeading eyebrow="Our Approach to Business" title={['How We', <em key="e">Work.</em>]} intro="A disciplined, four-part approach that keeps every engagement grounded and accountable." />
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {approach.map((a, i) => (
              <Reveal as="li" key={a.step} delay={0.05} className={`grid grid-cols-[4.5rem_1fr] gap-4 py-10 ${i ? 'border-t hairline-dark' : ''}`}>
                <span className="font-serif text-5xl italic leading-none text-gold-deep">{a.step}</span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-ink">{a.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-strong">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Responsibility */}
      <section id="responsibility" className="relative isolate overflow-hidden bg-ink py-28 md:py-36">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              tone="light"
              eyebrow="Our Commitment to Responsibility"
              title={['Accountable to', <em key="e">More Than Profit.</em>]}
              intro="We recognise that energy activity affects people and places well beyond any single transaction. Our commitment is to make decisions that we would be comfortable explaining to the communities, partners and regulators they affect."
            />
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <GlassPanel className="rounded-[3px] p-8 md:p-10">
              <ul className="space-y-5 text-mist">
                {['Choosing partners with credible safety and compliance practices', 'Respecting environmental and community considerations in our planning', 'Being transparent about what we do and how we do it', 'Reporting honestly as our activities develop'].map((t) => (
                  <li key={t} className="flex gap-4">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </Reveal>
        </div>
      </section>

      <PartnershipCTA />
    </>
  );
}
