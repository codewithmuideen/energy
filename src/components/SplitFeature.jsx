import Img from './Img';
import SectionHeading from './SectionHeading';
import { MaskReveal, Reveal } from './Reveal';

/** Editorial image + text block. tone: "sand" | "white" | "ink". */
export default function SplitFeature({ id, eyebrow, title, children, image, imageAlt, reverse = false, tone = 'sand', aspect = 'aspect-[4/5]' }) {
  const bg = { sand: 'bg-sand', white: 'bg-white', ink: 'bg-ink grain' }[tone];
  const dark = tone === 'ink';
  return (
    <section id={id} className={`relative overflow-hidden py-24 md:py-36 ${bg}`}>
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className={`lg:col-span-6 ${reverse ? 'lg:order-2 lg:col-start-7' : ''}`}>
          <MaskReveal direction={reverse ? 'right' : 'left'} className={`${aspect} rounded-[2px]`}>
            <Img name={image} alt={imageAlt} sizes="(min-width:1024px) 48vw, 100vw" />
          </MaskReveal>
        </div>
        <div className={`lg:col-span-5 ${reverse ? 'lg:order-1' : 'lg:col-start-8'}`}>
          <SectionHeading tone={dark ? 'light' : 'dark'} eyebrow={eyebrow} title={title} titleClass="!text-[clamp(2rem,3.6vw,3.4rem)]" />
          <Reveal delay={0.12}>
            <div className={`mt-8 space-y-5 leading-relaxed ${dark ? 'text-mist' : 'text-slate-strong'} [&_strong]:font-semibold ${dark ? '[&_strong]:text-white' : '[&_strong]:text-ink'}`}>{children}</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
