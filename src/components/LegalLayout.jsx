import Seo from './Seo';
import PageHero from './PageHero';
import { breadcrumbSchema } from '../utils/seo';

/** Shared layout for policy pages: compact hero and a readable article with a sticky contents list. */
export default function LegalLayout({ title, path, description, intro, updated, sections }) {
  const crumbs = [
    { label: 'Home', to: '/' },
    { label: title, to: path },
  ];
  return (
    <>
      <Seo title={title} description={description} path={path} schema={[breadcrumbSchema(crumbs)]} />
      <PageHero crumbs={crumbs} tag="Legal" title={title} intro={intro} image="panel-texture" />
      <section className="section pb-40 md:pb-48">
        <div className="container-x grid max-w-6xl gap-12 lg:grid-cols-12">
          <nav aria-label="On this page" className="lg:col-span-3">
            <div className="rounded-2xl bg-paper p-6 lg:sticky lg:top-28">
              <p className="font-display text-sm font-bold text-navy">On this page</p>
              <ol className="mt-4 space-y-2.5 text-sm">
                {sections.map((s, i) => (
                  <li key={s.title}>
                    <a href={`#s-${i}`} className="hover:text-solar-600">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              {updated && <p className="mt-6 text-xs text-muted">Last updated: {updated}</p>}
            </div>
          </nav>
          <article className="space-y-12 lg:col-span-8 lg:col-start-5">
            {sections.map((s, i) => (
              <section key={s.title} id={`s-${i}`} className="scroll-mt-28">
                <h2 className="text-2xl font-bold">
                  <span className="mr-3 text-solar">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed [&_a]:font-semibold [&_a]:text-solar-600 [&_a]:underline [&_li]:ml-5 [&_li]:list-disc">{s.body}</div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
