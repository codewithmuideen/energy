import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import Seo from '../components/Seo';
import Img from '../components/Img';
import PageHero from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { formatDate, getInsight, insights } from '../data/insights';
import { SITE } from '../data/site';
import { absoluteUrl, breadcrumbSchema } from '../utils/seo';
import NotFound from './NotFound';

function Block({ b }) {
  if (b.type === 'h2') return <h2>{b.text}</h2>;
  if (b.type === 'quote') return <blockquote>{b.text}</blockquote>;
  if (b.type === 'ul')
    return (
      <ul>
        {b.items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    );
  return <p>{b.text}</p>;
}

export default function InsightDetails() {
  const { slug } = useParams();
  const post = getInsight(slug);
  if (!post) return <NotFound />;

  const path = `/insights/${post.slug}`;
  const url = encodeURIComponent(absoluteUrl(path));
  const text = encodeURIComponent(post.title);
  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Insights', to: '/insights' },
    { label: post.category, to: path },
  ];
  const related = insights.filter((i) => i.slug !== post.slug).slice(0, 3);
  const share = [
    { label: 'Share on LinkedIn', icon: FaLinkedinIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { label: 'Share on X', icon: FaXTwitter, href: `https://twitter.com/intent/tweet?url=${url}&text=${text}` },
    { label: 'Share on Facebook', icon: FaFacebookF, href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { label: 'Share on WhatsApp', icon: FaWhatsapp, href: `https://wa.me/?text=${text}%20${url}` },
  ];

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={path}
        type="article"
        image={`/images/${post.image}-1600.webp`}
        noindex={post.placeholder}
        schema={[
          breadcrumbSchema(crumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            datePublished: post.date,
            image: `${SITE.url}/images/${post.image}-1600.webp`,
            publisher: { '@id': `${SITE.url}/#organization` },
          },
        ]}
      />
      <PageHero crumbs={crumbs} tag={post.category} title={post.title} image={post.image} imageAlt={post.imageAlt} />

      <section className="section pb-40 md:pb-48">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={15} aria-hidden="true" /> {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={15} aria-hidden="true" /> {post.readTime}
              </span>
              {post.placeholder && <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold uppercase tracking-wider">Sample article</span>}
            </div>
            <Reveal className="mt-8 overflow-hidden rounded-3xl">
              <div className="aspect-[16/9]">
                <Img name={post.image} alt={post.imageAlt} sizes="(min-width:1024px) 60vw, 100vw" />
              </div>
            </Reveal>
            <p className="lead mt-10 font-medium text-navy">{post.excerpt}</p>
            <div className="prose-article">
              {post.body.map((b, i) => (
                <Block key={i} b={b} />
              ))}
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
              <Link to="/insights" className="link-arrow">
                <ArrowLeft size={16} aria-hidden="true" /> All articles
              </Link>
              <ul className="flex items-center gap-2">
                {share.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-full bg-paper text-navy transition hover:bg-solar hover:text-white">
                      <s.icon size={15} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </article>
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-3xl bg-navy p-8">
                <div className="cell-grid-light absolute inset-0" aria-hidden="true" />
                <div className="relative">
                  <h2 className="text-xl font-bold !text-white">Thinking about solar?</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">Get a free site survey and a clear, no-obligation proposal from our engineers.</p>
                  <Link to="/contact" className="btn btn-primary mt-6 w-full">
                    Get a Free Quote <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <div className="rounded-3xl bg-paper p-6">
                <h2 className="font-display text-base font-bold">More articles</h2>
                <ul className="mt-4 space-y-4">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link to={`/insights/${r.slug}`} className="group flex gap-4">
                        <span className="h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                          <img src={`/images/${r.image}-800.webp`} alt="" loading="lazy" className="h-full w-full object-cover" />
                        </span>
                        <span className="text-sm font-semibold leading-snug text-navy group-hover:text-solar-600">{r.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
