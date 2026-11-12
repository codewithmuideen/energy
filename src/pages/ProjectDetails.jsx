import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, BatteryCharging, ChevronRight, Clock, MapPin, Zap } from 'lucide-react';
import Seo from '../components/Seo';
import Img from '../components/Img';
import { Reveal, EASE } from '../components/Reveal';
import { ProjectCard } from '../components/Cards';
import { getProject, projects } from '../data/projects';
import { breadcrumbSchema } from '../utils/seo';
import NotFound from './NotFound';

export default function ProjectDetails() {
  const { slug } = useParams();
  const reduced = useReducedMotion();
  const project = getProject(slug);
  if (!project) return <NotFound />;

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Projects', to: '/projects' },
    { label: project.title, to: `/projects/${project.slug}` },
  ];
  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const anim = (d = 0) => (reduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: EASE, delay: d } });

  return (
    <>
      <Seo title={project.title} description={project.summary} path={`/projects/${project.slug}`} schema={[breadcrumbSchema(crumbs)]} />

      {/* Split hero */}
      <section className="relative overflow-hidden bg-white pt-[76px] lg:pt-[116px]">
        <div className="absolute inset-x-0 top-0 h-[116px] bg-navy" aria-hidden="true" />
        <div className="container-x relative grid gap-10 pb-16 pt-12 lg:grid-cols-2 lg:items-center lg:pt-16">
          <div>
            <motion.nav aria-label="Breadcrumb" {...anim(0)}>
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
                {crumbs.map((c, i) => (
                  <li key={c.to} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight size={14} className="text-solar" aria-hidden="true" />}
                    {i < crumbs.length - 1 ? (
                      <Link to={c.to} className="hover:text-navy">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="font-semibold text-navy" aria-current="page">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </motion.nav>
            <motion.span className="tag mt-8" {...anim(0.05)}>
              {project.category}
            </motion.span>
            <motion.h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.05]" {...anim(0.1)}>
              {project.title}
            </motion.h1>
            <motion.p className="lead mt-6 max-w-xl" {...anim(0.2)}>
              {project.summary}
            </motion.p>
          </div>
          <motion.div className="relative" {...anim(0.15)}>
            <div className="overflow-hidden rounded-3xl">
              <div className="aspect-[4/3]">
                <Img name={project.image} alt={project.imageAlt} priority sizes="(min-width:1024px) 50vw, 100vw" />
              </div>
            </div>
            <div className="relative -mt-12 ml-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-solar-600 text-white shadow-xl md:ml-12">
              <div className="flex items-center gap-3 bg-solar p-5">
                <MapPin size={22} className="shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-white/75">Location</p>
                  <p className="font-display text-sm font-bold">{project.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-solar p-5">
                <Zap size={22} className="shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-white/75">Typical capacity</p>
                  <p className="font-display text-sm font-bold">{project.capacity}</p>
                </div>
              </div>
            </div>
            <span className="absolute -right-3 top-8 h-6 w-6 bg-solar" aria-hidden="true" />
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="pb-40 md:pb-48">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <Reveal className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white/75 md:p-12 lg:col-span-7">
            <div className="cell-grid-light absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <h2 className="inline-block border-b-4 border-solar pb-2 text-2xl font-extrabold uppercase tracking-wide !text-white">About</h2>
              <h3 className="mt-8 text-lg font-bold !text-white">The challenge</h3>
              <p className="mt-3 leading-relaxed">{project.challenge}</p>
              <h3 className="mt-8 text-lg font-bold !text-white">Our solution</h3>
              <p className="mt-3 leading-relaxed">{project.solution}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 lg:col-span-5">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line">
              {[
                { icon: Zap, k: 'Category', v: project.category },
                { icon: Clock, k: 'Typical delivery', v: project.duration },
                { icon: Zap, k: 'Solar capacity', v: project.capacity },
                { icon: BatteryCharging, k: 'Storage', v: project.storage },
              ].map((d) => (
                <div key={d.k} className="bg-white p-6">
                  <dt className="flex items-center gap-2 text-sm font-semibold text-muted">
                    <d.icon size={15} className="text-solar" aria-hidden="true" /> {d.k}
                  </dt>
                  <dd className="mt-2 font-display text-lg font-bold text-navy">{d.v}</dd>
                </div>
              ))}
            </dl>
            <div className="rounded-3xl bg-paper p-7 md:p-8">
              <h3 className="text-lg font-bold">Scope of work</h3>
              <ul className="mt-5 space-y-3.5">
                {project.scope.map((s) => (
                  <li key={s} className="flex gap-3 font-medium text-navy">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rotate-45 bg-solar" aria-hidden="true" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/contact" className="btn btn-primary w-full">
              Discuss a Similar Project <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="container-x mt-24">
          <h2 className="h-display">More solutions</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
