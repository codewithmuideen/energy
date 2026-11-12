import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items, tone = 'light' }) {
  const base = tone === 'light' ? 'text-white/60' : 'text-slate-strong';
  const current = tone === 'light' ? 'text-white' : 'text-ink';
  return (
    <nav aria-label="Breadcrumb" className="text-xs font-medium tracking-[0.12em] uppercase">
      <ol className={`flex flex-wrap items-center gap-2 ${base}`}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.to} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={current}>
                  {item.label}
                </span>
              ) : (
                <>
                  <Link to={item.to} className="link-line hover:text-gold">
                    {item.label}
                  </Link>
                  <ChevronRight size={12} aria-hidden="true" className="opacity-60" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
