import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { ArrowRight, ArrowUpRight, BatteryCharging, CheckCircle2, ClipboardCheck, MapPin, Phone, Play, Sun, X, Zap } from 'lucide-react';
import Seo from '../components/Seo';
import Img from '../components/Img';
import Faq from '../components/Faq';
import QuoteForm from '../components/QuoteForm';
import BackgroundVideo from '../components/BackgroundVideo';
import SectionHeading from '../components/SectionHeading';
import { ProcessZigzag, WhyChoose } from '../components/Sections';
import { Reveal, Stagger, StaggerItem, ClipReveal, WordReveal, EASE } from '../components/Reveal';
import { InsightCard } from '../components/Cards';
import { services } from '../data/services';
import { projects } from '../data/projects';
import { insights } from '../data/insights';
import { faqs, specialties, technologies } from '../data/content';
import { SITE } from '../data/site';
import { organizationSchema, websiteSchema } from '../utils/seo';

/* ---------------- Hero: copy left, arch-shaped video window right ---------------- */
function Hero() {
  const reduced = useReducedMotion();
  const a = (d, from = { y: 30 }) => (reduced ? {} : { initial: { opacity: 0, ...from }, animate: { opacity: 1, x: 0, y: 0, scale: 1 }, transition: { duration: 1, ease: EASE, delay: d } });
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-40">
      {/* Full-bleed background video */}
      <div className="absolute inset-0">
        <BackgroundVideo
          src="/videos/solar-installers.mp4"
          mobileSrc="/videos/solar-installers-mobile.mp4"
          poster="/images/solar-installers-poster.webp"
          eager
          controls
          controlsClass="bottom-6 right-5 md:bottom-8 md:right-8"
          label="hero video"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/25" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" aria-hidden="true" />
      <div className="lime-glow pointer-events-none absolute -left-40 bottom-0 h-[520px] w-[520px]" aria-hidden="true" />
      <p
        aria-hidden="true"
        className="text-outline-light pointer-events-none absolute -bottom-6 left-1/2 opacity-60 -translate-x-1/2 select-none whitespace-nowrap font-display text-[clamp(6rem,20vw,19rem)] font-extrabold uppercase leading-none tracking-tighter"
      >
        Solar
      </p>

      <div className="container-x relative z-10 grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <motion.p {...a(0.05)} className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-1.5 pr-4 text-sm font-semibold text-white/90 backdrop-blur">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-lime text-navy">
              <Sun size={15} aria-hidden="true" />
            </span>
            Solar & renewable energy · Nigeria
          </motion.p>
          <WordReveal
            as="h1"
            animateOnMount
            delay={0.12}
            text="Harvest the sun. Power everything."
            className="mt-7 font-display text-[clamp(2.7rem,7vw,5.6rem)] font-extrabold leading-[0.98] tracking-[-0.045em] !text-white"
            wordClass={(w) => (w.startsWith('Power') || w.startsWith('everything') ? 'text-lime' : '')}
          />
          <motion.p {...a(0.3)} className="mt-7 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            We design, install and maintain solar and lithium battery systems for homes, businesses and communities, so the lights stay on without generator noise, fumes or fuel bills.
          </motion.p>
          <motion.div {...a(0.42)} className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/contact" className="btn btn-lime">
              Get a Free Quote <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/services" className="btn btn-outline-light">
              Explore Solutions
            </Link>
          </motion.div>
          <motion.div {...a(0.54)} className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {['wind-solar', 'home-dusk', 'panel-close'].map((n) => (
                <span key={n} className="h-11 w-11 overflow-hidden rounded-full ring-[3px] ring-navy">
                  <Img name={n} alt="" sizes="44px" />
                </span>
              ))}
              <span className="grid h-11 w-11 place-items-center rounded-full bg-flame text-white ring-[3px] ring-navy">
                <Zap size={17} aria-hidden="true" />
              </span>
            </div>
            <p className="text-sm leading-snug text-white/70">
              <span className="block font-semibold text-white">Free site survey & load audit</span>
              Lagos and nationwide
            </p>
          </motion.div>
        </div>

        {/* Floating badges over the video */}
        <div className="pointer-events-none relative hidden min-h-[480px] lg:col-span-6 lg:block">
          {/* Warranty disc */}
          <motion.div {...a(0.6, { scale: 0.5 })} className="absolute right-[38%] top-[6%]">
            <div className="relative grid h-28 w-28 place-items-center rounded-full bg-flame text-center text-white shadow-[0_20px_40px_-12px_rgba(255,91,46,0.6)] sm:h-32 sm:w-32">
              <span className="animate-spin-slow absolute inset-1.5 rounded-full border-2 border-dashed border-white/50" aria-hidden="true" />
              <span>
                <span className="block font-display text-4xl font-extrabold leading-none">25</span>
                <span className="mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.16em]">yr panel
                  <br />
                  warranty</span>
              </span>
            </div>
          </motion.div>

          {/* Monitoring widget */}
          <motion.div {...a(0.75, { x: 40 })} className="absolute bottom-[8%] right-0 w-[230px] rounded-2xl border border-white/15 bg-navy/60 p-4 text-white shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs text-white/70">
              <span className="inline-flex items-center gap-1.5">
                <span className="relative h-2 w-2 rounded-full bg-lime">
                  <span className="animate-pulse-ring absolute inset-0 rounded-full bg-lime" />
                </span>
                Live monitoring
              </span>
              <BatteryCharging size={16} className="text-lime" aria-hidden="true" />
            </div>
            <div className="mt-3 flex h-14 items-end gap-1.5" aria-hidden="true">
              {[35, 55, 72, 90, 100, 84, 60].map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 origin-bottom rounded-sm bg-gradient-to-t from-solar to-lime"
                  style={{ height: `${h}%` }}
                  initial={reduced ? false : { scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 + i * 0.07, ease: EASE }}
                />
              ))}
            </div>
            <p className="mt-2 text-[0.7rem] text-white/60">Solar yield, sunrise to sunset</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Crossed marquee bands ---------------- */
function Ticker() {
  const items = [...specialties, ...technologies.slice(0, 4)];
  const Row = ({ reverse }) => (
    <div className="flex w-max animate-marquee" style={reverse ? { animationDirection: 'reverse' } : undefined}>
      {[...items, ...items].map((t, i) => (
        <span key={i} className="flex items-center gap-6 whitespace-nowrap px-6 font-display text-lg font-bold md:text-2xl">
          <Sun size={20} className="shrink-0" aria-hidden="true" /> {t}
        </span>
      ))}
    </div>
  );
  return (
    <section aria-label="What solar gives you" className="relative h-36 overflow-hidden md:h-44">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3deg] bg-navy py-4 text-white/60" aria-hidden="true">
        <Row reverse />
      </div>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[2deg] bg-lime py-4 text-navy shadow-[0_20px_40px_-20px_rgba(11,21,16,0.5)]">
        <Row />
      </div>
    </section>
  );
}

/* ---------------- About: overlapping photos + warranty disc ---------------- */
function About() {
  return (
    <section className="section overflow-hidden">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-xl pb-14 pr-4 sm:pr-8">
          <ClipReveal className="aspect-[4/5] w-[78%] rounded-[2rem]">
            <Img name="roof-building" alt="Solar array installed across a pitched building roof" sizes="(min-width:1024px) 35vw, 75vw" />
          </ClipReveal>
          <ClipReveal from="right" delay={0.2} className="absolute bottom-0 right-0 aspect-square w-[54%] rounded-[2rem] border-[8px] border-white shadow-[0_30px_60px_-25px_rgba(11,21,16,0.5)]">
            <Img name="home-dusk" alt="Family home powered at dusk" sizes="(min-width:1024px) 25vw, 50vw" />
          </ClipReveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.4 }}
            className="absolute right-2 top-4 grid h-28 w-28 place-items-center rounded-full bg-white shadow-xl sm:right-6 sm:h-32 sm:w-32"
          >
            <span className="animate-spin-slow absolute inset-2 rounded-full border-2 border-dashed border-solar/40" aria-hidden="true" />
            <span className="grid h-20 w-20 place-items-center rounded-full bg-navy text-center text-white sm:h-24 sm:w-24">
              <span>
                <Sun size={20} className="mx-auto text-lime" aria-hidden="true" />
                <span className="mt-1 block text-[0.6rem] font-bold uppercase leading-tight tracking-[0.14em]">Tier-1
                  <br />
                  equipment</span>
              </span>
            </span>
          </motion.div>
          <div className="animate-float absolute -left-1 bottom-20 flex items-center gap-3 rounded-2xl bg-lime px-4 py-3 text-navy shadow-lg sm:-left-6">
            <ClipboardCheck size={22} aria-hidden="true" />
            <span className="text-sm font-bold leading-tight">
              100% free
              <br />
              site survey
            </span>
          </div>
        </div>

        <div>
          <SectionHeading
            tag="About ApexCore"
            title="We strive to lead Nigeria's switch to solar energy"
            intro="Nigeria has some of the best sunshine in the world, yet millions of homes and businesses still depend on generators. ApexCore Energy exists to change that, with properly engineered solar and storage systems that deliver reliable power and real savings."
          />
          <Reveal delay={0.1}>
            <ul className="mt-8 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
              {specialties.map((s) => (
                <li key={s} className="flex items-center gap-3 font-semibold text-navy">
                  <CheckCircle2 size={20} className="shrink-0 text-flame" aria-hidden="true" /> {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <blockquote className="mt-9 rounded-r-2xl border-l-4 border-lime bg-paper px-6 py-5">
              <p className="font-display text-lg font-semibold leading-snug text-navy">“Size for the life you want to live during an outage, not for a package price.”</p>
              <footer className="mt-2 text-sm text-muted">The ApexCore engineering team</footer>
            </blockquote>
          </Reveal>
          <Reveal delay={0.2} className="mt-9 flex flex-wrap items-center gap-6">
            <Link to="/about" className="btn btn-navy">
              More About Us <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a href={`tel:${SITE.phoneHref}`} className="group flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-flame-soft text-flame transition group-hover:bg-flame group-hover:text-white">
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

/* ---------------- Services: editorial list with cursor-following preview ---------------- */
function ServicesList() {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28 });
  const sy = useSpring(y, { stiffness: 260, damping: 28 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };
  return (
    <section className="section">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading tag="Our services" title="Complete solar solutions, from design to lifetime support" />
          <Reveal>
            <Link to="/services" className="btn btn-outline">
              All Services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <ul ref={ref} onPointerMove={onMove} onPointerLeave={() => setActive(null)} className="relative mt-14 border-t border-line">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 0.05} onPointerEnter={() => setActive(i)}>
              <Link
                to={`/services/${s.slug}`}
                className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-line py-5 md:grid-cols-[64px_minmax(0,1.1fr)_minmax(0,1fr)_auto] md:gap-8 md:py-8"
              >
                <span className="font-display text-sm font-bold text-muted transition group-hover:text-flame">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex items-center gap-4">
                  <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl md:hidden">
                    <Img name={s.image} alt="" sizes="56px" />
                  </span>
                  <h3 className="text-lg font-bold leading-tight transition duration-500 group-hover:translate-x-2 group-hover:text-solar-600 sm:text-xl md:text-[1.9rem]">{s.title}</h3>
                </span>
                <p className="hidden text-[0.95rem] leading-relaxed md:block">{s.short}</p>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-line text-navy transition duration-500 group-hover:-rotate-45 group-hover:border-lime group-hover:bg-lime md:h-14 md:w-14">
                  <ArrowRight size={18} aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
          <motion.div style={{ x: sx, y: sy }} className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block" aria-hidden="true">
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: -4 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative -mt-24 ml-8 h-48 w-64 overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white"
                >
                  {services.map((s, i) => (
                    <Img key={s.slug} name={s.image} alt="" sizes="256px" className={`absolute inset-0 transition-opacity duration-300 ${active === i ? 'opacity-100' : 'opacity-0'}`} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Video banner with hollow marquee + modal player ---------------- */
function VideoBanner() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <section className="pb-6 pt-16 md:pb-10 md:pt-24">
      <div className="container-x">
        <Reveal direction="zoom" className="relative isolate h-[480px] overflow-hidden rounded-[2rem] md:h-[600px] md:rounded-[3rem]">
          <Img name="panels-aerial" alt="Aerial view of rows of solar panels" sizes="100vw" className="absolute inset-0 -z-10" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/55 to-navy/30" />
          <div className="absolute inset-x-0 top-[38%] -translate-y-1/2 overflow-hidden" aria-hidden="true">
            <div className="flex w-max animate-marquee">
              {[0, 1, 2, 3].map((k) => (
                <span key={k} className="text-outline-light whitespace-nowrap px-8 font-display text-[clamp(4rem,11vw,10rem)] font-extrabold uppercase leading-none tracking-tight">
                  Watch us work ·
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group absolute left-1/2 top-[38%] grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-flame text-white md:h-28 md:w-28"
            aria-label="Play installation video"
          >
            <span className="animate-pulse-ring absolute inset-0 rounded-full bg-flame" aria-hidden="true" />
            <span className="animate-pulse-ring absolute inset-0 rounded-full bg-flame [animation-delay:1.2s]" aria-hidden="true" />
            <Play size={30} className="relative ml-1 fill-white transition group-hover:scale-110" aria-hidden="true" />
          </button>
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-12">
            <h2 className="max-w-xl font-display text-2xl font-bold leading-tight !text-white md:text-4xl">Engineered properly. Installed safely. Built to last 25 years.</h2>
            <ul className="flex flex-wrap gap-2">
              {['1–3 day home installs', 'Zero emissions', 'Live app monitoring'].map((t) => (
                <li key={t} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-navy/90 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Installation video"
          >
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} transition={{ duration: 0.4, ease: EASE }} className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <video src="/videos/solar-installers.mp4" poster="/images/solar-installers-poster.webp" controls autoPlay playsInline className="aspect-video w-full rounded-2xl bg-black object-cover" />
              <button type="button" onClick={() => setOpen(false)} className="absolute -top-14 right-0 grid h-11 w-11 place-items-center rounded-full bg-white text-navy" aria-label="Close video">
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- Projects bento ---------------- */
function ProjectTile({ project, big = false, className = '' }) {
  return (
    <Link to={`/projects/${project.slug}`} className={`group relative block h-full overflow-hidden rounded-[1.75rem] bg-navy ${className}`}>
      <Img name={project.image} alt={project.imageAlt} sizes={big ? '(min-width:1024px) 58vw, 100vw' : '(min-width:1024px) 42vw, 100vw'} className="absolute inset-0 transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
      <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy backdrop-blur">{project.category}</span>
      <span className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-lime text-navy transition duration-500 group-hover:rotate-45">
        <ArrowUpRight size={20} aria-hidden="true" />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <h3 className={`font-bold leading-tight !text-white ${big ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`}>{project.title}</h3>
        <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/75">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} aria-hidden="true" /> {project.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap size={14} aria-hidden="true" /> {project.capacity}
          </span>
        </p>
        {big && <p className="mt-4 hidden max-w-lg leading-relaxed text-white/70 sm:block">{project.summary}</p>}
      </div>
    </Link>
  );
}

function Projects() {
  const [first, second, third] = projects;
  return (
    <section className="section bg-paper">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading tag="Solutions in action" title="Solar systems for every kind of property" intro="From family homes to factories, clinics and whole communities, see how we approach each type of project." />
          <Reveal>
            <Link to="/projects" className="btn btn-navy">
              View All Projects <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-5 lg:h-[640px] lg:grid-cols-12 lg:grid-rows-2">
          <StaggerItem direction="left" className="h-[420px] lg:col-span-7 lg:row-span-2 lg:h-auto">
            <ProjectTile project={first} big />
          </StaggerItem>
          <StaggerItem direction="right" className="h-[320px] lg:col-span-5 lg:h-auto">
            <ProjectTile project={second} />
          </StaggerItem>
          <StaggerItem direction="right" className="h-[320px] lg:col-span-5 lg:h-auto">
            <ProjectTile project={third} />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

/* ---------------- Savings estimator + survey form ---------------- */
const naira = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', notation: 'compact', maximumFractionDigits: 1 });

function Estimator() {
  const [spend, setSpend] = useState(250000);
  const { low, high } = useMemo(() => ({ low: spend * 12 * 0.5, high: spend * 12 * 0.7 }), [spend]);
  const pct = ((spend - 20000) / (3000000 - 20000)) * 100;
  return (
    <section className="section">
      <div className="container-x grid gap-6 lg:grid-cols-2">
        <Reveal direction="left" className="relative overflow-hidden rounded-[2rem] bg-navy p-7 text-white md:p-10">
          <div className="sun-glow pointer-events-none absolute -right-24 -top-24 h-80 w-80" aria-hidden="true" />
          <div className="relative">
            <span className="tag tag-dark">Savings estimator</span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight !text-white md:text-4xl">What could solar save you?</h2>
            <p className="mt-3 text-white/65">Slide to your typical monthly spend on generator fuel and prepaid electricity.</p>

            <label htmlFor="spend" className="mt-9 flex items-baseline justify-between text-sm text-white/70">
              Monthly energy spend
              <span className="font-display text-2xl font-bold text-white">{naira.format(spend)}</span>
            </label>
            <input
              id="spend"
              type="range"
              min={20000}
              max={3000000}
              step={10000}
              value={spend}
              onChange={(e) => setSpend(Number(e.target.value))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full accent-lime"
              style={{ background: `linear-gradient(90deg, var(--color-lime) ${pct}%, rgb(255 255 255 / 0.15) ${pct}%)` }}
            />

            <div className="mt-9 space-y-4" aria-hidden="true">
              <div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>Today</span>
                  <span>{naira.format(spend * 12)}/yr</span>
                </div>
                <div className="mt-1.5 h-3 rounded-full bg-flame" />
              </div>
              <div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>With a well-sized hybrid system</span>
                  <span>
                    {naira.format(spend * 12 * 0.3)} – {naira.format(spend * 12 * 0.5)}/yr
                  </span>
                </div>
                <div className="mt-1.5 h-3 w-[40%] rounded-full bg-gradient-to-r from-solar to-lime" />
              </div>
            </div>

            <div className="mt-9 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10">
              <p className="text-sm text-white/65">Estimated yearly savings</p>
              <p className="mt-1 font-display text-3xl font-extrabold text-lime md:text-4xl" aria-live="polite">
                {naira.format(low)} – {naira.format(high)}
              </p>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-white/45">Indicative only, assuming 50–70% offset. Your free site survey gives exact figures, equipment and payback.</p>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <div id="quote" className="h-full scroll-mt-28 rounded-[2rem] bg-paper p-7 md:p-10">
            <span className="tag">Free site survey</span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">Book your free energy assessment</h2>
            <p className="mt-3">Tell us what you need. An energy advisor will call to schedule a survey, with no cost and no obligation.</p>
            <div className="mt-7">
              <QuoteForm compact />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FaqSection() {
  return (
    <section className="section bg-paper">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading tag="FAQ" title="Questions people ask before going solar" intro="Straight answers to the most common questions. Can't find yours? Our advisors are a phone call away." />
          <Reveal delay={0.1} className="relative mt-10 max-w-sm">
            <div className="arch relative aspect-[4/5] overflow-hidden ring-1 ring-line">
              <BackgroundVideo src="/videos/wind-sunset.mp4" poster="/images/wind-sunset-poster.webp" controls controlsClass="right-4 top-[42%]" label="wind farm video" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
            </div>
            <a href={`tel:${SITE.phoneHref}`} className="absolute -right-2 bottom-8 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-xl sm:-right-10">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-flame text-white">
                <Phone size={18} aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs text-muted">Still have questions?</span>
                <span className="block font-display font-bold text-navy">{SITE.phoneDisplay}</span>
              </span>
            </a>
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
    <section className="section pb-40 md:pb-48">
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
      <Ticker />
      <About />
      <ProcessZigzag />
      <ServicesList />
      <WhyChoose />
      <VideoBanner />
      <Projects />
      <Estimator />
      <FaqSection />
      <LatestInsights />
    </>
  );
}
