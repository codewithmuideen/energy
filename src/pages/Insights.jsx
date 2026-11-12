import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays } from 'lucide-react';
import Seo from '../components/Seo';
import Img from '../components/Img';
import PageHero from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { InsightCard } from '../components/Cards';
import { categories, formatDate, insights } from '../data/insights';
import { breadcrumbSchema } from '../utils/seo';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Insights', to: '/insights' },
];

export default function Insights() {
  const [cat, setCat] = useState('All');
  const featured = insights.find((i) => i.featured) || insights[0];
  const rest = insights.filter((i) => i !== featured && (cat === 'All' || i.category === cat));

  return (
    <>
      <Seo title="Insights" description="Solar guides, energy-saving tips and renewable energy news from ApexCore Energy." path="/insights" schema={[breadcrumbSchema(crumbs)]} />
      <PageHero crumbs={crumbs} tag="Insights" title="Solar guides & energy insights" intro="Practical advice to help you make smarter decisions about solar, storage and energy costs." image="farm-sky" />

      <section className="section pb-40 md:pb-48">
        <div className="container-x">
          <Reveal>
            <Link to={`/insights/${featured.slug}`} className="group grid overflow-hidden rounded-3xl bg-navy lg:grid-cols-2">
              <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
                <Img name={featured.image} alt={featured.imageAlt} sizes="(min-width:1024px) 50vw, 100vw" className="transition duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="tag tag-dark self-start">Featured · {featured.category}</span>
                <h2 className="mt-5 text-2xl font-bold leading-tight !text-white md:text-4xl">{featured.title}</h2>
                <p className="mt-4 leading-relaxed text-white/70">{featured.excerpt}</p>
                <p className="mt-6 flex items-center gap-2 text-sm text-white/55">
                  <CalendarDays size={15} aria-hidden="true" /> {formatDate(featured.date)} · {featured.readTime}
                  {featured.placeholder && <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.65rem] uppercase tracking-wider">Sample article</span>}
                </p>
                <span className="link-arrow mt-8 !text-solar-400">
                  Read article <ArrowRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-14 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {['All', ...categories].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${cat === c ? 'bg-navy text-white' : 'bg-paper text-navy hover:bg-solar-50 hover:text-solar-600'}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08} className="h-full">
                <InsightCard post={p} />
              </Reveal>
            ))}
            {rest.length === 0 && <p className="text-muted">No other articles in this category yet.</p>}
          </div>
        </div>
      </section>
    </>
  );
}
