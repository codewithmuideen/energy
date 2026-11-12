import { useId } from 'react';

/**
 * ApexCore mark: an "A" built from solar-panel cells (three tiers, split down the middle)
 * with the sun rising behind its right shoulder. Geometry is mirrored in scripts/brand.py.
 */
export function LogoMark({ className = 'h-10 w-10', title }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3CC274" />
          <stop offset="1" stopColor="#127040" />
        </linearGradient>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD27A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <mask id={`${id}m`} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          <rect width="64" height="64" fill="#fff" />
          <circle cx="48" cy="15" r="12.5" fill="#000" />
          <path d="M27 45 L33.6 58 H20.4 Z" fill="#000" />
          <rect x="0" y="22" width="64" height="2.6" fill="#000" />
          <rect x="0" y="34" width="64" height="2.6" fill="#000" />
          <rect x="25.8" y="0" width="2.4" height="46" fill="#000" />
        </mask>
      </defs>
      <circle cx="48" cy="15" r="9" fill={`url(#${id}s)`} />
      <path d="M27 6 L52 58 H2 Z" fill={`url(#${id}g)`} mask={`url(#${id}m)`} />
    </svg>
  );
}

/** Horizontal lockup. tone="light" for dark backgrounds, "dark" for light backgrounds. */
export default function Logo({ tone = 'dark', className = '' }) {
  const word = tone === 'light' ? 'text-white' : 'text-navy';
  const sub = tone === 'light' ? 'text-white/60' : 'text-muted';
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-10 w-10 shrink-0 md:h-11 md:w-11" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.4rem] font-extrabold tracking-[-0.03em] md:text-[1.55rem] ${word}`}>
          Apex<span className="text-solar">Core</span>
        </span>
        <span className={`mt-1 font-display text-[0.56rem] font-semibold uppercase tracking-[0.42em] ${sub}`}>Energy · Solar</span>
      </span>
    </span>
  );
}
