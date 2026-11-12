import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Img from './Img';
import { readingTime } from '../data/insights';

export function PlaceholderBadge({ className = '' }) {
  return <span className={`placeholder-badge ${className}`}>Sample article</span>;
}

export default function InsightCard({ article, size = 'md', tone = 'dark' }) {
  const title = tone === 'dark' ? 'text-ink' : 'text-white';
  const meta = tone === 'dark' ? 'text-slate-strong' : 'text-mist';
  const large = size === 'lg';
  return (
    <article className="group h-full">
      <Link to={`/insights/${article.slug}`} className="flex h-full flex-col" data-cursor="hover">
        <div className={`img-zoom relative overflow-hidden rounded-[2px] ${large ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
          <Img name={article.image} alt={article.imageAlt} sizes={large ? '(min-width:1024px) 60vw, 100vw' : '(min-width:1024px) 30vw, 100vw'} />
          {article.placeholder && <PlaceholderBadge className="absolute left-4 top-4 bg-ink/70 text-gold-soft backdrop-blur" />}
        </div>
        <div className={`mt-6 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${meta}`}>
          <span className="text-gold-deep">{article.category}</span>
          <span className="h-px w-6 bg-current opacity-40" aria-hidden="true" />
          <span>{readingTime(article)} min read</span>
        </div>
        <h3 className={`mt-3 font-semibold leading-tight tracking-tight transition-colors group-hover:text-gold-deep ${title} ${large ? 'text-[clamp(1.6rem,2.6vw,2.4rem)]' : 'text-xl'}`}>
          {article.title}
        </h3>
        <p className={`mt-3 line-clamp-3 text-sm leading-relaxed ${meta}`}>{article.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">
          Read article <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </Link>
    </article>
  );
}
