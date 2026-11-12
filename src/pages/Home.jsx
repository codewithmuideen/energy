import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight, CheckCircle2, Leaf, Phone, Play, Sun, Zap } from 'lucide-react';
import Seo from '../components/Seo';
import Img from '../components/Img';
import Icon from '../components/Icon';
import Faq from '../components/Faq';
import Counter from '../components/Counter';
import QuoteForm from '../components/QuoteForm';
import BackgroundVideo from '../components/BackgroundVideo';
import SectionHeading from '../components/SectionHeading';
import { Reveal, Stagger, StaggerItem, ClipReveal, WordReveal, EASE } from '../components/Reveal';
import { ServiceCard, ProjectCard, InsightCard } from '../components/Cards';
import { LogoMark } from '../components/Logo';
import { services } from '../data/services';
import { projects } from '../data/projects';
import { insights } from '../data/insights';
import { faqs, highlights, process, specialties, technologies, whyUs } from '../data/content';
import { SITE } from '../data/site';
import { organizationSchema, websiteSchema } from '../utils/seo';

/* ---------------- Hero ---------------- */
function Hero() {
  const reduced = useReducedMotion();
  const a = (d) => (reduced ? {} : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: EASE, delay: d } });
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy pb-36 pt-36 md:pb-44">
      <div className="absolute inset-0 -z-10">
        <BackgroundVideo src="/videos/solar-installers.mp4" mobileSrc="/videos/solar-installers-mobile.mp4" poster="/images/solar-installers-poster.webp" eager controls controlsClass="top-24 right-4 md:top-auto md:bottom-40 md:right-8" label="hero video" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/70 to-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/50" />
      </div>
      <div className="container-x">
        <motion.p {...a(0.1)} className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-white backdrop-blur">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-sun text-navy">
            <Sun size={15} aria-hidden="true" />
          </span>
          Solar & renewable energy for Nigeria
        </motion.p>
        <WordReveal
          as="h1"
          animateOnMount
          delay={0.15}
          text="Clean power. Every hour of the day."
          className="mt-7 max-w-4xl font-display text-[clamp(2.6rem,6.4vw,5.4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] !text-white"
          wordClass={(w) => (w === 'Every' || w === 'hour' ? 'bg-gradient-to-r from-solar-400 to-sun-soft bg-clip-text text-transparent' : '')}
        />
        <motion.p {...a(0.32)} className="mt-7 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
          We design, install and maintain solar and battery systems that keep homes and businesses running, without the noise, fumes and fuel bills of generators.
        </motion.p>
        <motion.div {...a(0.44)} className="mt-10 flex flex-wrap items-center gap-4">
          <Link to="/contact" className="btn btn-primary !px-7 !py-4 text-base">
            Get a Free Quote <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/services" className="btn btn-outline-light !px-7 !py-4 text-base">
            Explore Solutions
          </Link>
        </motion.div>
        <motion.ul {...a(0.56)} className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-white/80">
          {['Free site survey', 'Tier-1 equipment', 'Lithium battery storage', '24/7 monitoring'].map((t) => (
            <li key={t} className="inline-flex items-center gap-2">
              <CheckCircle2 size={17} className="text-solar-400" aria-hidden="true" /> {t}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ---------------- Highlights strip (overlaps hero) ---------------- */
function Highlights() {
  return (
    <section className="relative z-10 -mt-24 md:-mt-28">
      <div className="container-x">
        <Stagger className="grid overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-30px_rgba(10,31,51,0.35)] sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <StaggerItem key={h.text} direction="bounce" className={`relative p-7 md:p-8 ${i ? 'border-t border-line sm:border-t-0 sm:border-l' : ''} ${i === 2 ? 'sm:border-l-0 sm:border-t lg:border-l lg:border-t-0' : ''} ${i === 3 ? 'sm:border-t lg:border-t-0' : ''}`}>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{h.label}</p>
              <p className="mt-2 font-display text-[2.6rem] font-extrabold leading-none tracking-tight text-navy">
                <Counter value={h.value} suffix={h.suffix} />
              </p>
              <p className="mt-3 text-sm leading-relaxed">{h.text}</p>
              <span className="absolute right-6 top-7 h-2 w-2 rounded-full bg-solar" aria-hidden="true" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  return (
    <section className="section overflow-hidden">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <Reveal direction="left" className="relative">
          <div className="cell-grid absolute -left-6 -top-6 h-48 w-48 rounded-2xl" aria-hidden="true" />
          <div className="relative grid h-[420px] grid-cols-5 grid-rows-6 gap-4 sm:h-[540px]">
            <ClipReveal className="col-span-3 row-span-6 rounded-3xl">
              <Img name="engineer-portrait" alt="Nigerian solar technician in a hard hat standing beside an electrical installation" sizes="(min-width:1024px) 30vw, 60vw" />
            </ClipReveal>
            <ClipReveal from="top" delay={0.15} className="col-span-2 row-span-3 rounded-3xl">
              <Img name="installer-roof" alt="Installer fitting a solar panel on a roof" sizes="20vw" />
            </ClipReveal>
            <ClipReveal from="right" delay={0.3} className="col-span-2 row-span-3 rounded-3xl">
              <Img name="wind-sunset" alt="Wind turbines at sunset" sizes="20vw" />
            </ClipReveal>
          </div>
          {/* Rotating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.08, rotate: 8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="absolute left-[60%] top-1/2 -ml-16 -mt-16 grid h-32 w-32 place-items-center rounded-full bg-white shadow-xl md:-ml-[72px] md:-mt-[72px] md:h-36 md:w-36"
          >
            <svg viewBox="0 0 120 120" className="animate-spin-slow absolute inset-1.5" aria-hidden="true">
              <defs>
                <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
              </defs>
              <text className="fill-navy font-display text-[10.5px] font-bold uppercase tracking-[0.22em]">
                <textPath href="#badge-circle">Clean energy · Save the planet · </textPath>
              </text>
            </svg>
            <LogoMark className="h-12 w-12" />
          </motion.div>
        </Reveal>

        <div>
          <SectionHeading
            tag="About ApexCore"
            title="Powering a brighter, cleaner Nigeria with the sun"
            intro="Nigeria has some of the best sunshine in the world, yet millions of homes and businesses still depend on generators. ApexCore Energy exists to change that, with properly engineered solar and storage systems that deliver reliable power and real savings."
          />
          <Reveal delay={0.1} direction="right">
            <p className="mt-8 font-display text-sm font-bold text-navy">Our solar energy specialties:</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {specialties.map((s) => (
                <li key={s} className="flex items-center gap-3 font-medium text-navy">
                  <CheckCircle2 size={19} className="shrink-0 text-solar" aria-hidden="true" /> {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-6">
            <Link to="/about" className="btn btn-navy">
              More About Us <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a href={`tel:${SITE.phoneHref}`} className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-solar-50 text-solar-600">
                <Phone size={19} aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs text-muted">Speak to an energy advisor</span>
                <span className="block font-display font-bold text-navy">{SITE.phoneDisplay}</span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
function Services() {
  return (
    <section className="relative overflow-hidden bg-navy pb-24 pt-20 md:pb-32 md:pt-28">
      <div className="absolute inset-x-0 top-0 h-[460px]" aria-hidden="true">
        <Img name="wind-hills" alt="" sizes="100vw" className="opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 to-navy" />
      </div>
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading dark tag="Our Services" title="Complete solar solutions, from design to lifetime support" intro="One accountable partner for every stage: audit, engineering, installation, storage, monitoring and maintenance." />
          <Reveal>
            <Link to="/services" className="btn btn-outline-light">
              All Services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <StaggerItem key={s.slug} direction={i % 3 === 0 ? 'left' : i % 3 === 2 ? 'right' : 'up'} className="h-full">
              <ServiceCard service={s} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------------- Why us + quote form ---------------- */
function WhyUs() {
  return (
    <section className="section bg-paper">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading tag="Why Choose Us" title="Reasons Nigerians trust ApexCore with their power" intro="Solar is a long-term investment. We earn trust with honest advice, quality equipment and workmanship that lasts." />
          <Stagger className="mt-12 grid gap-8 sm:grid-cols-2">
            {whyUs.map((w) => (
              <StaggerItem key={w.title} direction="bounce" className="flex gap-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-solar shadow-sm ring-1 ring-line">
                  <Icon name={w.icon} size={26} />
                </span>
                <div>
                  <h3 className="text-lg font-bold">{w.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed">{w.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-12 flex flex-wrap gap-2">
            {technologies.map((t) => (
              <span key={t} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy">
                {t}
              </span>
            ))}
          </Reveal>
        </div>
        <Reveal className="lg:col-span-5" delay={0.1} direction="right">
          <div id="quote" className="relative scroll-mt-28 overflow-hidden rounded-3xl bg-navy p-7 md:p-9">
            <div className="cell-grid-light pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <span className="tag tag-dark">Free site survey</span>
              <h3 className="mt-4 text-2xl font-bold !text-white md:text-3xl">Book your free energy assessment</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">Tell us what you need. An energy advisor will call you to schedule a survey, with no cost and no obligation.</p>
              <div className="mt-7">
                <QuoteForm dark compact />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Video band ---------------- */
function VideoBand() {
  return (
    <section className="relative isolate overflow-hidden bg-navy py-28 md:py-40">
      <div className="absolute inset-0 -z-10">
        <BackgroundVideo src="/videos/solar-hero.mp4" mobileSrc="/videos/solar-hero-mobile.mp4" poster="/images/solar-hero-poster.webp" controls label="solar farm video" />
        <div className="absolute inset-0 bg-navy/70" />
      </div>
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal direction="left">
          <span className="tag tag-dark">How we work</span>
          <h2 className="h-display mt-5 !text-white">Engineered properly. Installed safely. Built to last 25 years.</h2>
          <p className="lead mt-6 max-w-xl text-white/75">
            Our certified crews follow strict safety and workmanship standards on every rooftop and switchboard, because a solar system is only as good as its installation.
          </p>
          <Link to="/about" className="btn btn-primary mt-9">
            Our Approach <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: Zap, title: 'Fast installation', text: 'Most homes are installed within 1–3 days.' },
            { icon: Leaf, title: 'Zero emissions', text: 'Silent, fume-free power for your property.' },
            { icon: Sun, title: 'More output', text: 'Optimised tilt, orientation and shading analysis.' },
            { icon: Play, title: 'Live monitoring', text: 'Track production and savings from your phone.' },
          ].map((f) => (
            <StaggerItem key={f.title} direction="zoom" className="spot rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
              <f.icon size={24} className="text-solar-400" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold !text-white">{f.title}</h3>
              <p className="mt-1.5 text-sm text-white/70">{f.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------------- Projects ---------------- */
function Projects() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading tag="Solutions in Action" title="Solar systems for every kind of property" intro="From family homes to factories, clinics and whole communities, see how we approach each type of project." />
          <Reveal>
            <Link to="/projects" className="btn btn-outline">
              View All Projects <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <StaggerItem key={p.slug} direction="zoom">
              <ProjectCard project={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------------- Process (sticky stacking cards) ---------------- */
const STEP_IMAGES = ['engineer-meter', 'team-office', 'roof-team', 'electrician-panel'];

function ProcessCard({ step, index, isLast }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, isLast ? 1 : 0.4]);
  return (
    <li ref={ref} className="relative mb-6 md:mb-0 md:h-[78vh] md:min-h-[520px]">
      <div className="md:sticky md:top-28" style={{ zIndex: index + 1 }}>
        <motion.div style={{ scale, opacity }} className="grid overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_80px_-40px_rgba(10,31,51,0.45)] ring-1 ring-line md:grid-cols-2">
          <div className="flex flex-col justify-between p-8 md:p-12">
            <div>
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-solar text-white">
                  <Icon name={step.icon} size={30} />
                </span>
                <span className="font-display text-6xl font-extrabold text-navy/10">{step.step}</span>
              </div>
              <h3 className="mt-8 text-2xl font-bold md:text-3xl">{step.title}</h3>
              <p className="lead mt-4">{step.text}</p>
            </div>
            <p className="mt-8 font-display text-sm font-bold uppercase tracking-[0.18em] text-solar-600">
              Step {index + 1} of {process.length}
            </p>
          </div>
          <ClipReveal from="right" className="min-h-[240px] md:min-h-[440px]">
            <Img name={STEP_IMAGES[index]} alt="" sizes="(min-width:768px) 40vw, 100vw" />
          </ClipReveal>
        </motion.div>
      </div>
    </li>
  );
}

function Process() {
  return (
    <section className="section relative bg-paper">
      <div className="container-x">
        <SectionHeading center tag="Our Process" title="Going solar is simple with ApexCore" intro="Four clear steps from your first call to clean power, with one team accountable throughout." />
        <ol className="mx-auto mt-16 max-w-5xl">
          {process.map((p, i) => (
            <ProcessCard key={p.step} step={p} index={i} isLast={i === process.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Impact band ---------------- */
function Impact() {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-[560px]">
          <BackgroundVideo src="/videos/wind-sunset.mp4" poster="/images/wind-sunset-poster.webp" label="wind farm video" />
        </div>
        <div className="relative flex items-center px-5 py-20 md:px-14 lg:py-24">
          <div className="cell-grid-light pointer-events-none absolute inset-0" aria-hidden="true" />
          <Reveal direction="right" className="relative max-w-xl">
            <span className="tag tag-dark">Sustainability</span>
            <h2 className="h-display mt-5 !text-white">Every system we install is a step toward a net-zero future</h2>
            <p className="lead mt-6 text-white/75">
              Replacing generator hours with sunshine cuts carbon emissions, improves air quality and reduces noise in our neighbourhoods. Solar is good business, and good for the planet.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Lower carbon footprint', 'Cleaner urban air', 'Quieter communities', 'Energy access for all'].map((t) => (
                <li key={t} className="flex items-center gap-3 font-medium text-white">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-solar/20 text-solar-400">
                    <Leaf size={15} aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Link to="/sustainability" className="link-arrow mt-10 !text-solar-400">
              Our sustainability commitment <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FaqSection() {
  return (
    <section className="section">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading tag="FAQ" title="Questions people ask before going solar" intro="Straight answers to the most common questions. Can't find yours? Our advisors are a phone call away." />
          <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-3xl">
            <div className="relative aspect-[4/3]">
              <Img name="team-office" alt="ApexCore team reviewing a solar design on a laptop" sizes="(min-width:1024px) 35vw, 100vw" />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl bg-white/95 p-4 backdrop-blur">
                <div>
                  <p className="text-xs text-muted">Still have questions?</p>
                  <p className="font-display font-bold text-navy">{SITE.phoneDisplay}</p>
                </div>
                <Link to="/contact" className="btn btn-primary !px-4 !py-2.5 text-sm">
                  Contact <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-7" delay={0.1}>
          <Faq items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Insights ---------------- */
function LatestInsights() {
  return (
    <section className="section bg-paper pb-40 md:pb-48">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading tag="Insights" title="Solar guides & energy articles" />
          <Reveal>
            <Link to="/insights" className="btn btn-outline">
              All Articles <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {insights.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <InsightCard post={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo path="/" schema={[organizationSchema(), websiteSchema()]} />
      <Hero />
      <Highlights />
      <About />
      <Services />
      <WhyUs />
      <VideoBand />
      <Projects />
      <Process />
      <Impact />
      <FaqSection />
      <LatestInsights />
    </>
  );
}
