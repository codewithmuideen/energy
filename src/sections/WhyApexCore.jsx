import { useState } from 'react';
import { motion } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import EnergyScene from '../three/EnergyScene';
import { LogoMark } from '../components/Logo';
import { values } from '../data/content';
import { EASE } from '../animations/motionVariants';

function StaticDrop() {
  return (
    <div className="grid h-full place-items-center">
      <div className="relative">
        <div className="absolute inset-0 scale-150 rounded-full bg-gold/20 blur-3xl" />
        <LogoMark className="relative h-48 w-48 md:h-64 md:w-64" />
      </div>
    </div>
  );
}

export default function WhyApexCore() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative overflow-hidden bg-deep-2 py-28 md:py-40" aria-labelledby="why-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(198,161,91,.12),transparent_55%),radial-gradient(ellipse_at_90%_90%,rgba(22,182,164,.10),transparent_50%)]" aria-hidden="true" />
      <div className="container-x relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading tone="light" eyebrow="Why Apex Core" title={['Built Around Trust.', <em key="e">Driven by Purpose.</em>]} titleClass="!text-[clamp(2.1rem,4.2vw,4rem)]" />
          <Reveal delay={0.1}>
            <p className="lead mt-8 max-w-md text-mist">
              Principles only matter when they guide real decisions. These are the standards we hold ourselves to, and the ones we look for in every organisation we
              work with.
            </p>
          </Reveal>
          <EnergyScene scene="liquid" className="mt-6 h-[340px] md:h-[440px]" fallback={<StaticDrop />} />
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <ul className="border-t border-white/10">
            {values.map((v, i) => {
              const isOpen = open === i;
              return (
                <Reveal as="li" key={v.title} delay={i * 0.05} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    onMouseEnter={() => setOpen(i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-baseline gap-6 py-7 text-left"
                  >
                    <span className={`w-10 shrink-0 font-serif text-lg italic transition-colors duration-500 ${isOpen ? 'text-gold' : 'text-white/30'}`}>{v.numeral}</span>
                    <span className="flex-1">
                      <span className={`block text-[clamp(1.5rem,2.6vw,2.4rem)] font-semibold tracking-tight transition-colors duration-500 ${isOpen ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}>
                        {v.title}
                      </span>
                      <motion.span
                        initial={false}
                        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="block overflow-hidden"
                      >
                        <span className="block max-w-lg pt-3 leading-relaxed text-mist">{v.text}</span>
                      </motion.span>
                    </span>
                    <span className={`h-px w-10 self-center transition-all duration-700 ${isOpen ? 'w-16 bg-gold' : 'bg-white/20'}`} aria-hidden="true" />
                  </button>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
