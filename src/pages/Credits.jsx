import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import { breadcrumbSchema } from '../utils/seo';

const crumbs = [
  { label: 'Home', to: '/' },
  { label: 'Media Credits', to: '/credits' },
];

const photos = [
  'farm-sky', 'farm-clouds', 'panels-aerial', 'wind-sunset', 'offshore-wind', 'installer-wiring', 'rooftop-commercial', 'installer-roof', 'solar-campus',
  'wind-solar', 'wind-hills', 'grid-sunset', 'panel-close', 'aerial-grid', 'panel-texture', 'electrician-panel', 'roof-team', 'substation', 'farm-aerial',
  'home-dusk', 'engineer-meter', 'team-office', 'ev-charging', 'partnership', 'roof-building', 'home-modern',
];

export default function Credits() {
  return (
    <>
      <Seo title="Media Credits" description="Licences for photography and video used on the ApexCore Energy website." path="/credits" noindex schema={[breadcrumbSchema(crumbs)]} />
      <PageHero crumbs={crumbs} tag="Credits" title="Media credits" intro="Photography and video used on this website, and the licences that cover them." image="panel-texture" />
      <section className="section pb-40 md:pb-48">
        <div className="container-x max-w-4xl space-y-12">
          <div>
            <h2 className="text-2xl font-bold">Video</h2>
            <p className="mt-4 leading-relaxed">
              Background videos (solar farm aerials, solar panel installation crew and wind farm at sunset) are from{' '}
              <a href="https://mixkit.co/" target="_blank" rel="noopener noreferrer" className="font-semibold text-solar-600 underline">
                Mixkit
              </a>{' '}
              and used under the Mixkit Stock Video Free License.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Photography</h2>
            <p className="mt-4 leading-relaxed">
              Photographs are from{' '}
              <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-solar-600 underline">
                Unsplash
              </a>{' '}
              and used under the Unsplash License, which permits free commercial use. With thanks to the photographers who share their work there.
            </p>
            <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-6">
              {photos.map((p) => (
                <li key={p} className="aspect-square overflow-hidden rounded-xl bg-paper">
                  <img src={`/images/${p}-800.webp`} alt="" loading="lazy" className="h-full w-full object-cover" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Brand</h2>
            <p className="mt-4 leading-relaxed">The ApexCore Energy logo and website design are original work for Apex Core Oil and Energy Resources Ltd.</p>
          </div>
        </div>
      </section>
    </>
  );
}
