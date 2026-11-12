# ApexCore Energy: Solar & Renewable Energy Website

React + Vite website for **ApexCore Energy** (Apex Core Oil and Energy Resources Ltd), a Lagos-based solar and renewable energy company: solar systems, battery storage, mini-grids, energy audits and maintenance.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build
```

Requires Node 18+.

## Stack

| Area | Libraries |
| --- | --- |
| Core | React 18, Vite 5, React Router 6, Tailwind CSS 4 |
| Motion | Motion for React (scroll reveals, counters, menus) |
| Forms | React Hook Form + Zod, serverless email via Resend |
| SEO | react-helmet-async, JSON-LD schema, sitemap.xml, robots.txt |
| Icons / fonts | Lucide, React Icons (social only), Montserrat + Manrope (self-hosted) |

## Structure

```
api/contact.js        Serverless quote/contact handler (Resend)
scripts/brand.py      Generates favicons + og-image.jpg from the logo geometry (Pillow)
public/images         WebP photos (name-800 / name-1600) and video posters
public/videos         Background videos (hero has a lighter mobile version)
src/components        Navbar, Footer, PageHero, Logo, QuoteForm, Cards, Faq, BackgroundVideo...
src/data              site.js (contact details, flags), services, projects, insights, content
src/pages             Home, About, Services, ServiceDetails, Projects, ProjectDetails,
                      Sustainability, Insights, InsightDetails, Contact, legal pages, Credits, 404
```

## Brand

- **Logo**: an "A" built from solar-panel cells with a rising sun (`src/components/Logo.jsx`, `public/favicon.svg`).
- **Colours**: navy `#0a1f33`, solar green `#1f9d55`, sun amber `#f5a623` (accent only). Tokens live in `src/index.css`.
- Regenerate PNG favicons and the social image with `python scripts/brand.py`.

## Quote form setup

The form posts JSON to `/api/contact` (override with `VITE_CONTACT_ENDPOINT`). Set these in your hosting dashboard:

```
RESEND_API_KEY=...
CONTACT_TO=support@apexcoreenergy.com
CONTACT_FROM="ApexCore Website <web@apexcoreenergy.com>"   # Resend-verified domain
```

Until they are set, the form shows a clear error with the phone number and email; it never fakes success.

## Content to review before launch

- **Projects** (`src/data/projects.js`): typical solution showcases with representative sizes, not specific client records. Replace with real case studies (with client permission) when available.
- **Highlights** (`src/data/content.js`): capability statements ("up to 70% fuel savings", "25-yr panel warranty"). Confirm they match your equipment and offers.
- **Insights**: sample articles, labelled "Sample" and set to `noindex`.
- **Vision, mission, privacy policy and terms**: proposed text for company and legal review.

## Feature flags (`src/data/site.js`)

| Flag | Default | Purpose |
| --- | --- | --- |
| `features.mapEmbed` | `true` | Google Map on the Contact page |
| `features.whatsapp` | `false` | WhatsApp button once the number is confirmed |
| `social` | `{}` | Verified profile URLs (`linkedin`, `facebook`, `instagram`, `x`, `youtube`) |

## Media & licensing

- Videos: **Mixkit** (Mixkit Free License). Photos: **Unsplash** (Unsplash License). See `/credits`.
- To swap an image, add `name-800.webp` and `name-1600.webp` to `public/images/` and reference `name`.
