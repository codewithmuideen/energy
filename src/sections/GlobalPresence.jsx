import SectionHeading from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import EnergyScene from '../three/EnergyScene';

function StaticGlobe() {
  return (
    <svg viewBox="0 0 400 400" className="mx-auto h-full max-h-[520px] w-full" aria-hidden="true">
      <defs>
        <radialGradient id="sg" cx="50%" cy="45%" r="55%">
          <stop offset="0" stopColor="#123550" />
          <stop offset="1" stopColor="#071725" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="170" fill="url(#sg)" stroke="rgba(22,182,164,.35)" />
      {[...Array(9)].map((_, i) => (
        <ellipse key={i} cx="200" cy="200" rx={170 * Math.cos((i - 4) * 0.33)} ry="170" fill="none" stroke="rgba(198,161,91,.18)" />
      ))}
      {[...Array(7)].map((_, i) => (
        <line key={i} x1="30" x2="370" y1={60 + i * 47} y2={60 + i * 47} stroke="rgba(198,161,91,.12)" />
      ))}
      <circle cx="196" cy="196" r="5" fill="#C6A15B" />
    </svg>
  );
}

export default function GlobalPresence() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-28 md:py-36" aria-labelledby="global-heading">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            tone="light"
            eyebrow="Global Perspective"
            title={['Rooted in Lagos.', <em key="e">Open to the World.</em>]}
            titleClass="!text-[clamp(2.1rem,4.2vw,4rem)]"
          />
          <Reveal delay={0.1}>
            <p className="lead mt-8 text-mist">
              Energy is a global industry. Prices, technology and opportunity move across borders, and the most valuable relationships often do too.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 leading-relaxed text-mist/90">
              From our base in Lagos, we follow international markets closely and welcome conversations with partners across Africa and beyond: companies exploring
              Nigeria, investors assessing the sector and suppliers seeking a dependable local counterpart.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[2px] border border-white/10 bg-white/10">
              <div className="bg-ink p-6">
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-gold">Head Office</dt>
                <dd className="mt-2 text-white">Surulere, Lagos</dd>
              </div>
              <div className="bg-ink p-6">
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-gold">Partnerships</dt>
                <dd className="mt-2 text-white">Local &amp; international</dd>
              </div>
            </dl>
          </Reveal>
        </div>
        <div className="relative lg:col-span-7">
          <EnergyScene scene="globe" className="aspect-square w-full" fallback={<StaticGlobe />} />
          <p className="mt-2 text-center text-[0.65rem] tracking-[0.12em] text-white/40">
            Abstract visualisation. Network lines are illustrative; the gold marker indicates our Lagos office.
          </p>
        </div>
      </div>
    </section>
  );
}
