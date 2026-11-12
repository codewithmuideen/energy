import { Link } from 'react-router-dom';
import { ChevronRight, Sun } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import Img from './Img';
import { EASE } from './Reveal';

/** Inner-page banner: dark ink panel with sun glow, breadcrumb pill, title and an arch-framed photo. */
export default function PageHero({ crumbs = [], tag, title, intro, image = 'farm-sky', imageAlt = '' }) {
  const reduced = useReducedMotion();
  const anim = (d = 0, from = { y: 24 }) =>
    reduced ? {} : { initial: { opacity: 0, ...from }, animate: { opacity: 1, x: 0, y: 0, scale: 1 }, transition: { duration: 0.9, ease: EASE, delay: d } };
  return (
    <section className="relative isolate overflow-hidden rounded-b-[2rem] bg-navy pb-16 pt-32 md:rounded-b-[3.5rem] md:pb-24 md:pt-44">
      {/* Photo wash behind everything on small screens */}
      <div className="absolute inset-0 -z-20 lg:hidden">
        <Img name={image} alt="" priority sizes="100vw" className="opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/50" />
      </div>
      <div className="sun-glow pointer-events-none absolute -right-40 -top-40 -z-10 h-[640px] w-[640px]" aria-hidden="true" />
      <div className="cell-grid-light pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_right,black,transparent_70%)]" aria-hidden="true" />

      <div className="container-x grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {crumbs.length > 0 && (
            <motion.nav aria-label="Breadcrumb" {...anim(0)}>
              <ol className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm text-white/70 backdrop-blur">
                {crumbs.map((c, i) => (
                  <li key={c.to} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight size={14} className="text-lime" aria-hidden="true" />}
                    {i < crumbs.length - 1 ? (
                      <Link to={c.to} className="hover:text-white">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="font-semibold text-white" aria-current="page">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </motion.nav>
          )}
          {tag && (
            <motion.p className="tag tag-dark mt-8" {...anim(0.05)}>
              {tag}
            </motion.p>
          )}
          <motion.h1 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,5.6vw,4.6rem)] font-extrabold leading-[1.02] tracking-[-0.04em] !text-white" {...anim(0.1)}>
            {title}
          </motion.h1>
          {intro && (
            <motion.p className="lead mt-6 max-w-2xl text-white/70" {...anim(0.2)}>
              {intro}
            </motion.p>
          )}
        </div>

        <div className="relative hidden lg:col-span-5 lg:block">
          <motion.div {...anim(0.15, { scale: 0.92, y: 30 })} className="arch relative ml-auto aspect-[4/5] max-h-[440px] w-[82%] overflow-hidden ring-1 ring-white/15">
            <Img name={image} alt={imageAlt} priority sizes="35vw" />
          </motion.div>
          <motion.div {...anim(0.4, { scale: 0.5 })} className="absolute bottom-10 left-0 grid h-24 w-24 place-items-center rounded-full bg-lime text-navy shadow-xl">
            <span className="animate-spin-slow absolute inset-1.5 rounded-full border-2 border-dashed border-navy/30" aria-hidden="true" />
            <Sun size={30} aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
