import { useId } from 'react';

// Geometry shared with the brand asset generator (brand/gen.js): faceted apex "A" + oil-drop core.
export const MARK_PATHS = {
  left: 'M100 20 L100 86 L60 174 L26 174 Z',
  right: 'M100 20 L174 174 L140 174 L100 86 Z',
  drop: 'M100 99 C100 99 119 123 119 140 A19 19 0 1 1 81 140 C81 123 100 99 100 99 Z',
};

export function LogoMark({ className = 'h-10 w-10', mono, title }) {
  const id = useId().replace(/:/g, '');
  const fills = mono
    ? { l: mono, r: mono, d: mono }
    : { l: `url(#${id}L)`, r: `url(#${id}R)`, d: `url(#${id}D)` };
  return (
    <svg viewBox="22 16 156 162" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      {!mono && (
        <defs>
          <linearGradient id={`${id}L`} x1="0.2" y1="0" x2="0.6" y2="1">
            <stop offset="0" stopColor="#F6E3B0" />
            <stop offset="0.45" stopColor="#D9B672" />
            <stop offset="1" stopColor="#B08A45" />
          </linearGradient>
          <linearGradient id={`${id}R`} x1="0.8" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="#C6A15B" />
            <stop offset="0.55" stopColor="#9C7838" />
            <stop offset="1" stopColor="#6F5224" />
          </linearGradient>
          <linearGradient id={`${id}D`} x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0" stopColor="#5BEBD8" />
            <stop offset="0.5" stopColor="#16B6A4" />
            <stop offset="1" stopColor="#0A7469" />
          </linearGradient>
        </defs>
      )}
      <path d={MARK_PATHS.left} fill={fills.l} />
      <path d={MARK_PATHS.right} fill={fills.r} />
      <path d={MARK_PATHS.drop} fill={fills.d} />
    </svg>
  );
}

/** Horizontal lockup. tone="light" for dark backgrounds, "dark" for light backgrounds. */
export default function Logo({ tone = 'light', tagline = true, className = '' }) {
  const apex = tone === 'light' ? 'text-white' : 'text-ink';
  const tag = tone === 'light' ? 'text-mist' : 'text-deep';
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-10 w-10 shrink-0 md:h-11 md:w-11" />
      <span className="inline-grid leading-none">
        <span className={`font-logo text-[1.32rem] font-bold tracking-[0.06em] md:text-[1.45rem] ${apex}`}>
          APEX <span className="text-gold">CORE</span>
        </span>
        {tagline && (
          <span
            className={`mt-[5px] border-t border-gold/70 pt-[5px] font-logo text-[0.43rem] font-semibold md:text-[0.47rem] ${tag}`}
            style={{ textAlign: 'justify', textAlignLast: 'justify', letterSpacing: '0.18em' }}
          >
            OIL AND ENERGY RESOURCES LTD
          </span>
        )}
      </span>
    </span>
  );
}
