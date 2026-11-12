import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin, Zap } from 'lucide-react';
import Img from './Img';
import Icon from './Icon';
import { formatDate } from '../data/insights';

export function ServiceCard({ service, index }) {
  return (
    <Link to={`/services/${service.slug}`} className="card group flex h-full flex-col p-3">
      <div className="relative aspect-[16/11] overflow-hidden rounded-[1.35rem]">
        <Img name={service.image} alt={service.imageAlt} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="transition duration-700 group-hover:scale-105" />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 font-display text-xs font-bold text-navy backdrop-blur">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="relative flex flex-1 flex-col px-4 pb-4 pt-9">
        <span className="absolute -top-7 left-4 grid h-14 w-14 place-items-center rounded-full bg-flame text-white ring-[6px] ring-white transition duration-500 group-hover:rotate-[360deg] group-hover:bg-navy">
          <Icon name={service.icon} size={24} />
        </span>
        <h3 className="text-xl font-bold leading-snug">{service.title}</h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed">{service.short}</p>
        <span className="mt-6 flex items-center justify-between border-t border-line pt-4 font-display text-sm font-semibold text-navy">
          Learn more
          <span className="grid h-10 w-10 place-items-center rounded-full bg-paper transition duration-500 group-hover:-rotate-45 group-hover:bg-lime">
            <ArrowRight size={16} aria-hidden="true" />
          </span>
        </span>
      </div>
    </Link>
  );
}

export function ProjectCard({ project, className = '' }) {
  return (
    <Link to={`/projects/${project.slug}`} className={`group relative block overflow-hidden rounded-[1.75rem] bg-navy ${className}`}>
      <div className="aspect-[4/5] overflow-hidden sm:aspect-[4/4.4]">
        <Img name={project.image} alt={project.imageAlt} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="transition duration-700 group-hover:scale-105" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-transparent" />
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy backdrop-blur">{project.category}</span>
      <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-lime text-navy transition duration-500 group-hover:rotate-45">
        <ArrowUpRight size={18} aria-hidden="true" />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="text-xl font-bold leading-tight !text-white">{project.title}</h3>
        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/75">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} aria-hidden="true" /> {project.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap size={14} aria-hidden="true" /> {project.capacity}
          </span>
        </p>
      </div>
    </Link>
  );
}

export function InsightCard({ post }) {
  return (
    <Link to={`/insights/${post.slug}`} className="card group flex h-full flex-col p-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem]">
        <Img name={post.image} alt={post.imageAlt} sizes="(min-width:1024px) 33vw, 100vw" className="transition duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-lime px-3 py-1 text-xs font-bold text-navy">{post.category}</span>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
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
