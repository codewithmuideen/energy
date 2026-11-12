import { SITE } from '../data/site';

export const absoluteUrl = (path = '/') => `${SITE.url}${path === '/' ? '' : path}`;

export const DEFAULT_OG_IMAGE = `${SITE.url}/og-image.jpg`;

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  alternateName: SITE.brand,
  description: SITE.description,
  url: SITE.url,
  logo: `${SITE.url}/android-chrome-512x512.png`,
  image: `${SITE.url}/og-image.jpg`,
  email: SITE.email,
  telephone: SITE.phoneHref,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${SITE.address.street}, ${SITE.address.area}`,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.countryCode,
  },
  ...(Object.values(SITE.social).length ? { sameAs: Object.values(SITE.social) } : {}),
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  publisher: { '@id': `${SITE.url}/#organization` },
  inLanguage: 'en-NG',
});

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.label,
    item: absoluteUrl(item.to),
  })),
});

export const serviceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  description: service.short,
  provider: { '@id': `${SITE.url}/#organization` },
  areaServed: { '@type': 'Country', name: 'Nigeria' },
  url: absoluteUrl(`/services/${service.slug}`),
});
