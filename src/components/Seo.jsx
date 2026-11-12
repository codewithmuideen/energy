import { Helmet } from 'react-helmet-async';
import { SITE } from '../data/site';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../utils/seo';

export default function Seo({ title, description, path = '/', image, type = 'website', noindex = false, schema = [] }) {
  const fullTitle = title ? `${title} | ${SITE.brand}` : `${SITE.brand} | Solar & Renewable Energy Solutions in Nigeria`;
  const url = absoluteUrl(path);
  const img = image ? `${SITE.url}${image}` : DEFAULT_OG_IMAGE;
  const desc = description || SITE.description;
  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      <meta property="og:site_name" content={SITE.brand} />
      <meta property="og:locale" content="en_NG" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
