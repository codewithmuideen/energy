import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import InsightCard from '../components/InsightCard';
import { Reveal } from '../components/Reveal';
import { categories, insights } from '../data/insights';
import { breadcrumbSchema } from '../utils/seo';
import { EASE } from '../animations/motionVariants';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Insights', to: '/insights' },
];

export default function Insights() {
  // Filters live in the URL so they are shareable and survive refresh.
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const cat = params.get('category') || 'All';

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'All') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const featured = insights.find((a) => a.featured);
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return insights.filter((a) => {
      const inCat = cat === 'All' || a.category === cat;
      const inText = !term || `${a.title} ${a.excerpt} ${a.category}`.toLowerCase().includes(term);
      return inCat && inText;
    });
  }, [q, cat]);
  const filtering = q || cat !== 'All';
  const list = filtering ? results : results.filter((a) => a !== featured);

  return (
    <>
      <Seo
        title="Insights"
        description="Perspectives on energy markets, industry practice, business development and sustainability from Apex Core Oil and Energy Resources Ltd."
        path="/insights"
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Insights"
        title={['Perspectives on', <em key="e">Energy.</em>]}
        intro="Commentary on markets, industry practice and responsible business, written to inform rather than to impress."
        image="city-night"
        imageAlt="City skyline glowing at night from above"
        compact
      />

      <section className="bg-white pb-28 pt-16 md:pb-36">
        <div className="container-x">
          <Reveal>
            <div className="mb-12 flex flex-col gap-2 rounded-[2px] border border-dashed border-gold-deep/50 bg-sand px-5 py-4 text-sm text-slate-strong md:flex-row md:items-center md:gap-4">
              <span className="placeholder-badge shrink-0 text-gold-deep">Placeholder content</span>
              The articles below are samples that demonstrate the Insights section. They are not company news and will be replaced with approved Apex Core publications.
            </div>
          </Reveal>

          {/* Controls */}
          <div className="flex flex-col gap-6 border-b hairline-dark pb-8 lg:flex-row lg:items-center lg:justify-between">
            <div role="group" aria-label="Filter by category" className="-mx-1 flex flex-wrap gap-2">
              {['All', ...categories].map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={cat === c}
                  onClick={() => setParam('category', c)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition ${cat === c ? 'border-ink bg-ink text-white' : 'border-ink/15 text-ink/75 hover:border-ink/40'}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="relative block w-full lg:w-80">
              <span className="sr-only">Search insights</span>
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate" aria-hidden="true" />
              <input
                type="search"
                value={q}
                onChange={(e) => setParam('q', e.target.value)}
                placeholder="Search insights"
                className="h-12 w-full rounded-[2px] border border-ink/15 bg-white pl-11 pr-10 text-sm text-ink placeholder:text-slate focus:border-gold-deep focus:outline-none"
              />
              {q && (
                <button type="button" onClick={() => setParam('q', '')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate hover:text-ink" aria-label="Clear search">
                  <X size={16} />
                </button>
              )}
            </label>
          </div>

          {!filtering && featured && (
            <Reveal className="mt-14">
              <span className="eyebrow eyebrow-dark mb-6">Featured</span>
              <div className="mt-6">
                <InsightCard article={featured} size="lg" />
              </div>
            </Reveal>
          )}

          <p className="mt-14 text-sm text-slate-strong" aria-live="polite">
            {filtering ? `${results.length} ${results.length === 1 ? 'article' : 'articles'} found` : 'More articles'}
          </p>

          <motion.ul layout className="mt-8 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((a) => (
                <motion.li key={a.slug} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.6, ease: EASE }}>
                  <InsightCard article={a} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          {results.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-ink">No articles match your search.</p>
              <button
                type="button"
                onClick={() => setParams({}, { replace: true })}
                className="link-line mt-4 text-sm font-semibold text-gold-deep"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
