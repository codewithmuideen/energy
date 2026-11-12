import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Eye, Target } from 'lucide-react';
import Seo from '../components/Seo';
import Img from '../components/Img';
import Icon from '../components/Icon';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import BackgroundVideo from '../components/BackgroundVideo';
import { Reveal } from '../components/Reveal';
import { ProcessZigzag, WhyChoose } from '../components/Sections';
import { mission, values, vision } from '../data/content';
import { breadcrumbSchema } from '../utils/seo';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
];

const commitments = [
  { label: 'System sized from a real load audit', pct: 100 },
  { label: 'Installations tested and commissioned on site', pct: 100 },
  { label: 'Systems connected to remote monitoring', pct: 100 },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="ApexCore Energy is a Lagos-based solar and renewable energy company delivering solar, battery storage and mini-grid solutions across Nigeria."
        path="/about"
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        crumbs={crumbs}
        tag="About ApexCore"
        title="A solar company built on engineering, honesty and service"
        intro="We help Nigerian homes, businesses and communities move from expensive, unreliable power to clean energy they control."
        image="farm-clouds"
        imageAlt="Solar panels in a field under a cloudy sky"
      />

      {/* Who we are */}
      <section id="who-we-are" className="section scroll-mt-24">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="arch relative overflow-hidden">
              <div className="aspect-[4/5]">
                <Img name="roof-team" alt="Installation crew carrying solar panels across a large roof" sizes="(min-width:1024px) 45vw, 100vw" />
              </div>
            </div>
            <div className="absolute -bottom-8 right-3 max-w-[240px] md:-right-8 rounded-2xl bg-lime p-6 text-navy shadow-xl">
              <p className="font-display text-4xl font-extrabold">Lagos</p>
              <p className="mt-1 text-sm text-navy/75">Head office in Surulere, serving clients nationwide.</p>
            </div>
            
          </Reveal>
          <div>
            <SectionHeading tag="Who we are" title="A glimpse closer at ApexCore Energy" />
            <Reveal delay={0.1} className="mt-6 space-y-5 leading-relaxed">
              <p>
                ApexCore Energy is the solar and renewable energy business of Apex Core Oil and Energy Resources Ltd, headquartered in Surulere, Lagos. We design, supply, install and
                maintain solar power, battery storage and mini-grid systems for residential, commercial, industrial and community clients.
              </p>
              <p>
                Our team combines electrical engineering expertise with hands-on installation experience. We believe the right solar system starts with listening: understanding how you use
                power, then engineering a solution that delivers on its promise for decades.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 space-y-5">
              {commitments.map((c) => (
                <div key={c.label}>
                  <div className="flex justify-between text-sm font-semibold text-navy">
                    <span>{c.label}</span>
                    <span>{c.pct}%</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-line">
                    <div className="h-full rounded-full bg-gradient-to-r from-solar to-lime" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </Reveal>
            <Reveal delay={0.2}>
              <Link to="/contact" className="btn btn-navy mt-10">
                Talk to Our Team <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section id="vision-mission" className="relative scroll-mt-24 overflow-hidden bg-navy py-24 md:py-32">
        <div className="absolute inset-0 opacity-30">
          <BackgroundVideo src="/videos/solar-aerial.mp4" poster="/images/solar-aerial-poster.webp" label="solar farm video" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 to-navy/95" />
        <div className="container-x relative">
          <SectionHeading dark center tag="Vision & Mission" title="Where we are going, and how we will get there" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              { icon: Eye, title: 'Our Vision', text: vision },
              { icon: Target, title: 'Our Mission', text: mission },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1} className="rounded-3xl border border-white/15 bg-white/[0.07] p-8 backdrop-blur-md md:p-10">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-lime text-navy">
                  <v.icon size={26} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-2xl font-bold !text-white">{v.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-white/75">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="section scroll-mt-24">
        <div className="container-x">
          <SectionHeading center tag="Core Values" title="The principles behind every installation" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.08} className="card p-8">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-flame-soft text-flame">
                  <Icon name={v.icon} size={26} />
                </span>
                <h3 className="mt-6 text-xl font-bold">{v.title}</h3>
                <p className="mt-3 leading-relaxed">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessZigzag />

      <WhyChoose />

      {/* Promise band */}
      <section id="responsibility" className="scroll-mt-24 pb-40 pt-16 md:pb-48 md:pt-20">
        <div className="container-x">
          <Reveal className="flex flex-wrap justify-center gap-3">
            {['Safety-first installations', 'Genuine manufacturer warranties', 'Transparent quotations', 'Responsive after-sales support'].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-navy">
                <CheckCircle2 size={17} className="text-flame" aria-hidden="true" /> {t}
              </span>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
