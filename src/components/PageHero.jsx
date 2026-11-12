import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import Img from './Img';
import { EASE } from './Reveal';

/** Inner-page banner: photo, navy overlay, breadcrumb trail and title. */
export default function PageHero({ crumbs = [], tag, title, intro, image = 'farm-sky', imageAlt = '' }) {
  const reduced = useReducedMotion();
  const anim = (d = 0) => (reduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: EASE, delay: d } });
  return (
    <section className="relative isolate overflow-hidden bg-navy pb-20 pt-40 md:pb-28 md:pt-52">
      <div className="absolute inset-0 -z-10">
        <Img name={image} alt={imageAlt} priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
      </div>
      {/* Decorative solar cells */}
      <div className="pointer-events-none absolute bottom-0 right-0 hidden grid-cols-3 gap-1 md:grid" aria-hidden="true">
        <span className="h-8 w-8" />
        <span className="h-8 w-8 bg-white/15" />
        <span className="h-8 w-8 bg-solar" />
        <span className="h-8 w-8 bg-white/10" />
        <span className="h-8 w-8 bg-solar/60" />
        <span className="h-8 w-8 bg-white" />
      </div>
      <div className="container-x">
        {crumbs.length > 0 && (
          <motion.nav aria-label="Breadcrumb" {...anim(0)}>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
              {crumbs.map((c, i) => (
                <li key={c.to} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight size={14} className="text-solar-400" aria-hidden="true" />}
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
          <motion.span className="tag tag-dark mt-8" {...anim(0.05)}>
            {tag}
          </motion.span>
        )}
        <motion.h1 className="mt-5 max-w-4xl font-display text-[clamp(2.3rem,5.5vw,4.2rem)] font-bold leading-[1.05] !text-white" {...anim(0.1)}>
          {title}
        </motion.h1>
        {intro && (
          <motion.p className="lead mt-6 max-w-2xl text-white/75" {...anim(0.2)}>
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}
