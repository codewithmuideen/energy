import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin, Zap } from 'lucide-react';
import Img from './Img';
import Icon from './Icon';
import { formatDate } from '../data/insights';

export function ServiceCard({ service, index }) {
  return (
    <Link to={`/services/${service.slug}`} className="card group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Img name={service.image} alt={service.imageAlt} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="transition duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-display text-xs font-bold text-navy backdrop-blur">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="relative flex flex-1 flex-col p-7 pt-10">
        <span className="absolute -top-7 right-6 grid h-14 w-14 place-items-center rounded-2xl bg-solar text-white shadow-lg shadow-solar/30 transition group-hover:bg-navy">
          <Icon name={service.icon} size={26} />
        </span>
        <h3 className="text-xl font-bold leading-snug">{service.title}</h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed">{service.short}</p>
        <span className="link-arrow mt-6">
          Learn more <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function ProjectCard({ project, className = '' }) {
  return (
    <Link to={`/projects/${project.slug}`} className={`group relative block overflow-hidden rounded-2xl bg-navy ${className}`}>
      <div className="aspect-[4/3] overflow-hidden">
        <Img name={project.image} alt={project.imageAlt} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="transition duration-700 group-hover:scale-105" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
      <span className="absolute left-4 top-4 rounded-full bg-solar px-3 py-1 text-xs font-bold text-white">{project.category}</span>
      <div className="absolute bottom-0 left-0 right-12 flex items-end">
        <div className="bg-navy px-5 py-4 transition-colors group-hover:bg-solar-600">
          <h3 className="text-base font-bold !text-white md:text-lg">{project.title}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} aria-hidden="true" /> {project.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap size={14} aria-hidden="true" /> {project.capacity}
            </span>
          </p>
        </div>
        <span className="mb-0 h-6 w-6 shrink-0 bg-solar" aria-hidden="true" />
      </div>
    </Link>
  );
}

export function InsightCard({ post }) {
  return (
    <Link to={`/insights/${post.slug}`} className="card group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Img name={post.image} alt={post.imageAlt} sizes="(min-width:1024px) 33vw, 100vw" className="transition duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-solar-600">{post.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="flex items-center gap-2 text-xs font-semibold text-muted">
          <CalendarDays size={14} aria-hidden="true" /> {formatDate(post.date)} · {post.readTime}
          {post.placeholder && <span className="ml-auto rounded-full bg-paper px-2 py-0.5 text-[0.65rem] uppercase tracking-wider">Sample</span>}
        </p>
        <h3 className="mt-3 text-lg font-bold leading-snug transition group-hover:text-solar-600">{post.title}</h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed">{post.excerpt}</p>
        <span className="link-arrow mt-5">
          Read article <ArrowRight size={16} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
