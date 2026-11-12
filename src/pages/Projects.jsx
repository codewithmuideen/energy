import { useMemo, useState } from 'react';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { ProjectCard } from '../components/Cards';
import { projects } from '../data/projects';
import { breadcrumbSchema } from '../utils/seo';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
];

export default function Projects() {
  const cats = useMemo(() => ['All', ...new Set(projects.map((p) => p.category))], []);
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? projects : projects.filter((p) => p.category === cat);

  return (
    <>
      <Seo
        title="Projects & Solutions"
        description="Solar solutions for homes, businesses, hospitals, farms, estates and communities across Nigeria."
        path="/projects"
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        crumbs={crumbs}
        tag="Projects"
        title="Solar solutions for every kind of property"
        intro="Typical systems we design and deliver, from home backup to commercial plants and community mini-grids."
        image="aerial-grid"
        imageAlt="Top-down aerial view of rows of solar panels"
      />
      <section className="section pb-40 md:pb-48">
        <div className="container-x">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {cats.map((c) => (
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
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted">System sizes and timelines shown are typical ranges. Every project is designed individually after a site survey.</p>
        </div>
      </section>
    </>
  );
}
