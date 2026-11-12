import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, Check, Link2 } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import Img from '../components/Img';
import InsightCard, { PlaceholderBadge } from '../components/InsightCard';
import { Reveal, RevealLines } from '../components/Reveal';
import NotFound from './NotFound';
import { getInsight, insights, readingTime } from '../data/insights';
import { SITE } from '../data/site';
import { breadcrumbSchema } from '../utils/seo';

function ShareBar({ url, title }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: 'Share on LinkedIn', icon: FaLinkedinIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: 'Share on X', icon: FaXTwitter, href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { label: 'Share on Facebook', icon: FaFacebookF, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: 'Share on WhatsApp', icon: FaWhatsapp, href: `https://wa.me/?text=${t}%20${u}` },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="flex items-center gap-2">
      <span className="mr-2 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-slate-strong">Share</span>
      {links.map(({ label, icon: Icon, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink transition hover:border-ink hover:bg-ink hover:text-white">
          <Icon size={14} />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink transition hover:border-ink hover:bg-ink hover:text-white">
        {copied ? <Check size={15} /> : <Link2 size={15} />}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Link copied' : ''}
      </span>
    </div>
  );
}

export default function InsightDetails() {
  const { slug } = useParams();
  const article = getInsight(slug);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  if (!article) return <NotFound />;

  const url = `${SITE.url}/insights/${article.slug}`;
  const related = [...insights.filter((a) => a !== article && a.category === article.category), ...insights.filter((a) => a !== article && a.category !== article.category)].slice(0, 3);
  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Insights', to: '/insights' },
    { label: article.title, to: `/insights/${article.slug}` },
  ];

  return (
    <>
      {/* Placeholder articles are noindex so sample copy never appears in search results */}
      <Seo
        title={article.title}
        description={article.excerpt}
        path={`/insights/${article.slug}`}
        type="article"
        image={`/images/${article.image}-1600.webp`}
        noindex={article.placeholder}
        schema={[breadcrumbSchema(crumbs)]}
      />
      <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[75] h-[3px] origin-left bg-gold" style={{ scaleX: progress }} />

      <article>
        <header className="grain relative overflow-hidden bg-ink pb-16 pt-44 md:pb-20">
          <div className="container-x max-w-5xl">
            <Reveal>
              <Breadcrumbs items={crumbs} />
            </Reveal>
            <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-mist">
              <span className="text-gold">{article.category}</span>
              <span className="h-px w-6 bg-white/30" aria-hidden="true" />
              <span>{readingTime(article)} min read</span>
              {article.placeholder && <PlaceholderBadge className="text-gold-soft" />}
            </Reveal>
            <RevealLines as="h1" animateOnMount delay={0.3} lines={[article.title]} className="mt-6 text-[clamp(2.2rem,5vw,4.6rem)] font-semibold leading-[1.04] tracking-tight text-white" />
            <Reveal delay={0.5}>
              <p className="lead mt-8 max-w-3xl text-white/75">{article.excerpt}</p>
            </Reveal>
          </div>
        </header>

        <div className="bg-white">
          <div className="container-x -mt-px max-w-6xl">
            <Reveal className="relative -top-0 aspect-[16/8] overflow-hidden rounded-[2px]">
              <Img name={article.image} alt={article.imageAlt} priority sizes="(min-width:1200px) 1100px, 100vw" />
            </Reveal>
          </div>

          <div className="container-x grid max-w-6xl gap-12 py-16 md:py-24 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-32">
                <ShareBar url={url} title={article.title} />
                <Link to="/insights" className="link-line mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                  <ArrowLeft size={14} aria-hidden="true" /> All insights
                </Link>
              </div>
            </aside>
            <div className="lg:col-span-8 lg:col-start-5">
              {article.placeholder && (
                <p className="mb-10 rounded-[2px] border border-dashed border-gold-deep/50 bg-sand px-5 py-4 text-sm text-slate-strong">
                  <strong className="text-ink">Sample article.</strong> This placeholder content demonstrates the article layout and is not an official publication of Apex
                  Core Oil and Energy Resources Ltd.
                </p>
              )}
              <div className="space-y-6 text-[1.075rem] leading-[1.85] text-slate-strong">
                {article.body.map((b, i) => {
                  if (b.type === 'h2') return <h2 key={i} className="!mt-12 text-2xl font-semibold tracking-tight text-ink md:text-3xl">{b.text}</h2>;
                  if (b.type === 'quote')
                    return (
                      <blockquote key={i} className="!my-12 border-l-2 border-gold pl-6 font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] italic leading-snug text-ink">
                        {b.text}
                      </blockquote>
                    );
                  return <p key={i} className={i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-gold-deep' : ''}>{b.text}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-sand py-24 md:py-32" aria-labelledby="related-heading">
        <div className="container-x">
          <h2 id="related-heading" className="h-section text-ink">
            Related <em className="serif text-gold-deep">reading.</em>
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {related.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08}>
                <InsightCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
