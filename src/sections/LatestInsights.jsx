import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import InsightCard from '../components/InsightCard';
import { Reveal } from '../components/Reveal';
import { insights } from '../data/insights';

export default function LatestInsights() {
  const featured = insights.find((a) => a.featured) || insights[0];
  const rest = insights.filter((a) => a !== featured).slice(0, 2);
  return (
    <section className="bg-white py-28 md:py-40" aria-labelledby="insights-heading">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Latest Insights" title={['Perspectives on', <em key="e">a Changing Industry.</em>]} />
          <Reveal>
            <Link to="/insights" className="btn btn-line shrink-0" data-cursor="hover">
              All Insights <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <Reveal>
          <p className="mt-8 max-w-2xl border-l-2 border-gold pl-4 text-sm text-slate-strong">
            The articles shown are sample content that demonstrates this section. They will be replaced with approved Apex Core publications.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <InsightCard article={featured} size="lg" />
          </Reveal>
          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={0.1 + i * 0.1}>
                <InsightCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
