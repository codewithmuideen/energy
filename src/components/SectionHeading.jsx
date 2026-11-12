import { Reveal, RevealLines } from './Reveal';

/**
 * Editorial section heading. `title` is an array of lines; wrap accent words in <em> for the serif italic.
 * tone="light" for dark sections, "dark" for light sections.
 */
export default function SectionHeading({ eyebrow, title, intro, tone = 'dark', align = 'left', as = 'h2', className = '', titleClass = '' }) {
  const color = tone === 'light' ? 'text-white' : 'text-ink';
  const introColor = tone === 'light' ? 'text-mist' : 'text-slate-strong';
  const center = align === 'center' ? 'mx-auto text-center items-center' : '';
  return (
    <div className={`flex max-w-4xl flex-col gap-6 ${center} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className={`eyebrow ${tone === 'dark' ? 'eyebrow-dark' : ''}`}>{eyebrow}</span>
        </Reveal>
      )}
      <RevealLines as={as} lines={title} className={`h-section ${color} [&_em]:serif [&_em]:text-gold ${titleClass}`} />
      {intro && (
        <Reveal delay={0.15}>
          <p className={`lead max-w-2xl ${introColor} ${align === 'center' ? 'mx-auto' : ''}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
