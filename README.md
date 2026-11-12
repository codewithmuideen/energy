# Apex Core Oil and Energy Resources Ltd: Corporate Website

React + Vite corporate website for **apexcoreenergy.com**.

## Quick start

```bash
npm install
npm run dev       # local development at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

Requires Node 18+.

## Stack

| Area | Libraries |
| --- | --- |
| Core | React 18, Vite 5, React Router 6, Tailwind CSS 4 |
| Motion | Motion for React, GSAP + ScrollTrigger, Lenis smooth scroll |
| 3D / shaders | three.js, React Three Fiber, drei, custom GLSL (raw WebGL shader gradient) |
| Forms | React Hook Form + Zod |
| SEO | react-helmet-async, JSON-LD schema, sitemap.xml, robots.txt |
| Icons | Lucide (UI), React Icons (social/share brand marks only) |
| Fonts | Manrope, Instrument Serif, Montserrat (logo), self-hosted via Fontsource |

React 18 is used deliberately: `react-helmet-async` and React Three Fiber v8 are both stable on it.

## Project structure

```
api/contact.js        Serverless contact handler (Resend email API)
brand/                Logo system: SVG masters, PNG logos, favicon sets, generator script
public/               Static assets: images (WebP 800/1600), videos, favicons, robots, sitemap, OG image
src/
  animations/         GSAP + Lenis setup, Motion variants
  components/         Navbar, Footer, Preloader (liquid logo), CustomCursor, ScrollProgress,
                      MagneticButton, PageTransition, PageHero, ShaderBackground, GlassPanel, Seo...
  data/               site.js (contact details + feature flags), services, insights, content
  hooks/              useMediaQuery / useCanRender3D, useScroll / useInView, useGsap
  layouts/            MainLayout
  pages/              Home, About, Services, ServiceDetails, Business, Sustainability,
                      Insights, InsightDetails, Contact, PrivacyPolicy, Terms, Credits, NotFound
  sections/           Homepage sections (Hero, CompanyIntro, ServicesSection, WhyApexCore, ...)
  three/              EnergyScene (lazy/visibility wrapper), LiquidObject, EnergyGlobe
  utils/seo.js        Schema.org helpers
```

## Contact form: required setup

The form posts JSON to `/api/contact` (override with `VITE_CONTACT_ENDPOINT`).
`api/contact.js` validates input, filters bots with a honeypot, rate-limits, and sends mail through
[Resend](https://resend.com). **No credentials are ever shipped to the browser.**

Set these as environment variables in your hosting dashboard (see `.env.example`):

```
RESEND_API_KEY=...
CONTACT_TO=support@apexcoreenergy.com
CONTACT_FROM="Apex Core Website <web@apexcoreenergy.com>"   # must be a Resend-verified domain
```

Until these are set, the endpoint returns a clear error and the form tells visitors to email
support@apexcoreenergy.com directly. It never shows a fake "success".

**Hosting notes**

- **Vercel** (recommended): `api/contact.js` deploys automatically as a function; `vercel.json` adds SPA rewrites and cache headers.
- **Netlify / other static hosts**: `public/_redirects` handles SPA routing. Either port `api/contact.js` to a Netlify Function, or point `VITE_CONTACT_ENDPOINT` at any form backend.

## Content that needs company approval

Everything below is written so that nothing unverified is claimed, but it should still be reviewed:

- **Vision & mission** (`src/data/content.js`): proposed brand statements.
- **Service areas** (`src/data/services.js`): describe *intended* scope. Pages carry a note that capabilities, licences and partner arrangements are confirmed per engagement.
- **Insights** (`src/data/insights.js`): all articles are **placeholders**. They show a visible "Sample article" label, are set to `noindex`, and are excluded from the sitemap. Replace them with approved articles and set `placeholder: false`.
- **Privacy Policy & Terms**: templates referencing the Nigeria Data Protection Act 2023. Have them reviewed by a legal adviser.
- **No statistics, certifications, offices, projects or partners** appear anywhere on the site.

## Feature flags (`src/data/site.js`)

| Flag | Default | Purpose |
| --- | --- | --- |
| `features.mapEmbed` | `false` | Embed Google Maps on Contact once the exact pin is verified (a "Open in Google Maps" panel shows meanwhile). |
| `features.whatsapp` | `false` | Show a WhatsApp enquiry button once the number is confirmed as a WhatsApp line. |
| `social` | `{}` | Add verified profile URLs (`linkedin`, `x`, `facebook`, `instagram`). Nothing renders until set. |

## Media & licensing

- Hero and section videos plus several stills come from **Mixkit** (free commercial licence, no attribution required).
- Offshore platform photographs come from **Wikimedia Commons** (CC0 / public domain).
- All credits are listed on `/credits`. The imagery is illustrative and does not depict Apex Core assets.
- To replace an image, drop `name-800.webp` and `name-1600.webp` into `public/images/` and reference `name`.

## Performance & accessibility

- Routes are code-split with `React.lazy`; three.js loads only when a 3D section nears the viewport, on capable devices.
- WebGL scenes pause when off-screen; low-power and reduced-motion users get static fallbacks.
- Videos are muted, play only in view, use a lighter mobile file in the hero, have a pause control, and fall back to posters for reduced motion or data saver.
- Lenis, custom cursor, parallax and pinned scrolling are disabled under `prefers-reduced-motion`.
- Skip link, keyboard-operable menus (Escape closes), focus rings, labelled form fields with ARIA error messaging.

## SEO

- Unique title, description, canonical, Open Graph and Twitter tags per page via `<Seo>`.
- Organization schema (static in `index.html` + per page), BreadcrumbList, Service and ContactPage schema.
- `public/sitemap.xml` and `public/robots.txt`. Update `lastmod` when content changes.
- As a client-rendered SPA, consider pre-rendering (e.g. `vite-plugin-prerender` or hosting-level prerendering) for the strongest crawl results.

## Brand assets

The logo system lives in `brand/`. Run `node brand/gen.js` (requires `@resvg/resvg-js` and the fonts in
`brand/fonts/`) to regenerate all PNG/SVG logos and favicons.
