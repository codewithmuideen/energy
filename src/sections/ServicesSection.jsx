import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Img from '../components/Img';
import SectionHeading from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { services } from '../data/services';
import { EASE } from '../animations/motionVariants';

/**
 * Desktop: an editorial index where hovering a service swaps the large sticky image.
 * Mobile: stacked image cards.
 */
export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section className="grain relative overflow-hidden bg-ink py-28 md:py-40" aria-labelledby="services-heading">
      <div className="pointer-events-none absolute left-1/3 top-0 h-[600px] w-[600px] rounded-full bg-gold/[0.06] blur-[140px]" aria-hidden="true" />
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            tone="light"
            eyebrow="What We Do"
            title={['Supporting the', <em key="e">Energy Value Chain.</em>]}
            intro="Our business is organised around focused areas of activity. Each reflects where we believe we can add genuine value, and each is pursued with the same discipline."
          />
          <Reveal>
            <Link to="/services" className="btn btn-ghost shrink-0" data-cursor="hover">
              All Services <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {/* Desktop interactive index */}
        <div className="mt-20 hidden gap-12 lg:grid lg:grid-cols-12">
          <ul className="lg:col-span-7" onMouseLeave={() => {}}>
            {services.map((s, i) => (
              <li key={s.slug} className="border-t border-white/10 last:border-b">
                <Link
                  to={`/services/${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[4rem_1fr_auto] items-start gap-4 py-7"
                  data-cursor="hover"
                >
                  <span className={`font-serif text-xl italic transition-colors duration-500 ${active === i ? 'text-gold' : 'text-white/35'}`}>{s.index}</span>
                  <span>
                    <span className={`block text-[clamp(1.4rem,2.2vw,2.15rem)] font-semibold tracking-tight transition-all duration-700 ${active === i ? 'translate-x-2 text-white' : 'text-white/55'}`}>
                      {s.title}
                    </span>
                    <motion.span
                      initial={false}
                      animate={{ height: active === i ? 'auto' : 0, opacity: active === i ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="block overflow-hidden"
                    >
                      <span className="block max-w-lg pt-3 pl-2 text-sm leading-relaxed text-mist">{s.short}</span>
                    </motion.span>
                  </span>
                  <span className={`mt-2 grid h-11 w-11 place-items-center rounded-full border transition-all duration-500 ${active === i ? 'rotate-0 border-gold bg-gold text-ink' : '-rotate-45 border-white/20 text-white/60'}`}>
                    <ArrowUpRight size={17} aria-hidden="true" />
                    <span className="sr-only">Learn more about {s.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-5">
            <div className="sticky top-32 aspect-[4/5] overflow-hidden rounded-[2px]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={current.slug}
                  className="absolute inset-0"
                  initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.15 }}
                  animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
                  exit={{ opacity: 0.4 }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Img name={current.image} alt={current.imageAlt} sizes="40vw" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
                <span className="font-serif text-6xl italic text-gold">{current.index}</span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/70">{String(services.length).padStart(2, '0')} focus areas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile cards */}
        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:hidden">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 2) * 0.08}>
              <Link to={`/services/${s.slug}`} className="group block">
                <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-[2px]">
                  <Img name={s.image} alt={s.imageAlt} sizes="(min-width:640px) 50vw, 100vw" />
                  <span className="absolute left-4 top-4 font-serif text-3xl italic text-gold drop-shadow">{s.index}</span>
                </div>
                <h3 className="h-card mt-5 text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
                  Learn more <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
