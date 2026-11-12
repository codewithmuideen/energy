import { Sun, Activity } from 'lucide-react';
import Img from './Img';
import Icon from './Icon';
import Counter from './Counter';
import SectionHeading from './SectionHeading';
import { Reveal, Stagger, StaggerItem, ClipReveal } from './Reveal';
import { process, whyUs } from '../data/content';

const STEP_IMAGES = ['engineer-meter', 'aerial-grid', 'installer-roof', 'electrician-panel'];

/** Four-step process: round photos on a dashed sun-path, alternating up/down on desktop. */
export function ProcessZigzag({ className = '' }) {
  return (
    <section className={`section relative overflow-hidden bg-paper ${className}`}>
      <div className="container-x">
        <SectionHeading
          center
          tag="Our working process"
          title="How we take you from generator noise to solar silence"
          intro="Four clear steps from your first call to clean power, with one accountable team throughout."
        />
        <div className="relative mt-16 lg:mt-20">
          <svg
            className="pointer-events-none absolute inset-x-0 top-[46%] hidden h-48 w-full -translate-y-1/2 lg:block"
            viewBox="0 0 1200 180"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path d="M0 120 C150 -10 300 -10 450 90 S750 200 900 90 S1120 0 1200 60" stroke="var(--color-solar)" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="7 9" />
          </svg>
          <ol className="relative grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {process.map((p, i) => {
              const flip = i % 2 === 1;
              return (
                <Reveal
                  as="li"
                  key={p.step}
                  direction={flip ? 'down' : 'up'}
                  delay={i * 0.12}
                  className={`group flex flex-col items-center text-center ${flip ? 'lg:flex-col-reverse lg:pt-24' : 'lg:pb-24'}`}
                >
                  <div className="relative w-full max-w-[250px] pb-7">
                    <div className="aspect-square overflow-hidden rounded-full border-[10px] border-white shadow-[0_30px_60px_-30px_rgba(11,21,16,0.55)]">
                      <Img name={STEP_IMAGES[i]} alt="" sizes="260px" className="transition duration-700 group-hover:scale-110" />
                    </div>
                    <span className="absolute bottom-0 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-flame font-display text-lg font-bold text-white ring-[6px] ring-paper transition group-hover:bg-navy">
                      {p.step}
                    </span>
                  </div>
                  <div className={flip ? 'mt-6 lg:mb-8 lg:mt-0' : 'mt-6'}>
                    <h3 className="text-xl font-bold">{p.title}</h3>
                    <p className="mx-auto mt-3 max-w-[290px] text-[0.95rem] leading-relaxed">{p.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Dark split: reasons on the left, photo + stat bento on the right. */
export function WhyChoose() {
  return (
    <section className="relative isolate overflow-hidden bg-navy py-20 md:py-28">
      <div className="lime-glow pointer-events-none absolute -left-48 -top-24 -z-10 h-[560px] w-[560px]" aria-hidden="true" />
      <div className="sun-glow pointer-events-none absolute -bottom-40 right-0 -z-10 h-[520px] w-[520px]" aria-hidden="true" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            dark
            tag="Why choose us"
            title="Switch to solar that is sustainable, affordable and reliable"
            intro="Solar is a long-term investment. We earn trust with honest sizing, genuine equipment and workmanship that lasts."
          />
          <Stagger className="mt-10 grid gap-4">
            {whyUs.map((w, i) => (
              <StaggerItem
                key={w.title}
                direction="left"
                className="spot flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-lime/40 hover:bg-white/[0.07]"
              >
                <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${i % 2 ? 'bg-lime text-navy' : 'bg-flame text-white'}`}>
                  <Icon name={w.icon} size={26} />
                </span>
                <div>
                  <h3 className="text-lg font-bold !text-white">{w.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-white/65">{w.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <ClipReveal className="aspect-[4/5] rounded-[1.75rem]">
            <Img name="partnership" alt="ApexCore advisor shaking hands with a client" sizes="(min-width:1024px) 25vw, 50vw" />
          </ClipReveal>
          <Reveal direction="zoom" delay={0.1} className="flex aspect-[4/5] flex-col justify-between rounded-[1.75rem] bg-lime p-5 text-navy sm:p-7">
            <Sun size={30} aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-navy/60">Up to</p>
              <p className="font-display text-[clamp(2.6rem,5vw,4rem)] font-extrabold leading-none tracking-tight">
                <Counter value={70} suffix="%" />
              </p>
              <p className="mt-3 text-sm font-medium leading-snug">less diesel and fuel spend with a well-sized hybrid system</p>
            </div>
          </Reveal>
          <Reveal direction="zoom" delay={0.2} className="flex aspect-[4/5] flex-col justify-between rounded-[1.75rem] bg-navy-3 p-5 ring-1 ring-white/10 sm:p-7">
            <span className="relative grid h-11 w-11 place-items-center rounded-full bg-flame text-white">
              <span className="animate-pulse-ring absolute inset-0 rounded-full bg-flame" aria-hidden="true" />
              <Activity size={20} className="relative" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-[clamp(2.6rem,5vw,4rem)] font-extrabold leading-none tracking-tight text-white">
                <Counter value={24} suffix="/7" />
              </p>
              <p className="mt-3 text-sm leading-snug text-white/70">remote monitoring on every system we commission</p>
            </div>
          </Reveal>
          <ClipReveal from="right" delay={0.15} className="aspect-[4/5] rounded-[1.75rem]">
            <Img name="installer-wiring" alt="Technician wiring solar panel connectors" sizes="(min-width:1024px) 25vw, 50vw" />
          </ClipReveal>
        </div>
      </div>
    </section>
  );
}
