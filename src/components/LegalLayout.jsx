import Seo from './Seo';
import PageHero from './PageHero';
import { breadcrumbSchema } from '../utils/seo';

/** Shared layout for policy-style pages: a compact hero and a readable article with a sticky contents list. */
export default function LegalLayout({ title, path, description, intro, updated, sections }) {
  const crumbs = [
    { label: 'Home', to: '/' },
    { label: title, to: path },
  ];
  return (
    <>
      <Seo title={title} description={description} path={path} schema={[breadcrumbSchema(crumbs)]} />
      <PageHero crumbs={crumbs} eyebrow="Legal" title={[title]} intro={intro} shader compact />
      <section className="bg-white py-20 md:py-28">
        <div className="container-x grid max-w-6xl gap-12 lg:grid-cols-12">
          <nav aria-label="On this page" className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-gold-deep">On this page</p>
              <ol className="mt-4 space-y-2 text-sm">
                {sections.map((s, i) => (
                  <li key={s.title}>
                    <a href={`#s-${i}`} className="link-line text-slate-strong hover:text-ink">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              {updated && <p className="mt-8 text-xs text-slate">Last updated: {updated}</p>}
            </div>
          </nav>
          <article className="space-y-12 lg:col-span-8 lg:col-start-5">
            {sections.map((s, i) => (
              <section key={s.title} id={`s-${i}`} className="scroll-mt-32">
                <h2 className="text-2xl font-semibold tracking-tight text-ink">
                  <span className="mr-3 font-serif italic text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-slate-strong [&_a]:text-gold-deep [&_a]:underline [&_li]:ml-5 [&_li]:list-disc">{s.body}</div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
