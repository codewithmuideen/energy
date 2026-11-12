import { Reveal } from './Reveal';

/** Tag + title + optional intro. `dark` for navy backgrounds, `center` for centred layouts. */
export default function SectionHeading({ tag, title, intro, dark = false, center = false, className = '', as: Tag = 'h2' }) {
  return (
    <Reveal className={`${center ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      {tag && <span className={`tag ${dark ? 'tag-dark' : ''}`}>{tag}</span>}
      <Tag className={`h-display mt-5 ${dark ? '!text-white' : ''}`}>{title}</Tag>
      {intro && <p className={`lead mt-5 ${dark ? 'text-white/70' : ''}`}>{intro}</p>}
    </Reveal>
  );
}
