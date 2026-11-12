import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { FaLinkedinIn, FaXTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa6';
import Logo from './Logo';
import { footerNav } from '../data/navigation';
import { services } from '../data/services';
import { SITE } from '../data/site';
import { scrollToTop } from '../animations/gsapConfig';

const SOCIAL_ICONS = { linkedin: FaLinkedinIn, x: FaXTwitter, facebook: FaFacebookF, instagram: FaInstagram };

export default function Footer() {
  const socials = Object.entries(SITE.social).filter(([, url]) => !!url);
  return (
    <footer className="grain relative overflow-hidden bg-ink text-mist">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-teal/10 blur-[120px]" aria-hidden="true" />

      {/* Oversized signature */}
      <div className="container-x border-b border-white/10 pb-14 pt-24 md:pt-32">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <h2 className="h-section max-w-3xl text-white">
            Energy, approached with <em className="serif text-gold">integrity.</em>
          </h2>
          <Link to="/contact" className="btn btn-gold self-start lg:self-auto">
            Start a Conversation <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            Apex Core Oil and Energy Resources Ltd is a Lagos-based energy resources company building trusted relationships across the oil, gas and wider energy sector.
          </p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-2" aria-label="Social media">
              {socials.map(([key, url]) => {
                const Icon = SOCIAL_ICONS[key];
                return Icon ? (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={key} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold">
                      <Icon size={14} />
                    </a>
                  </li>
                ) : null;
              })}
            </ul>
          )}
        </div>

        <nav aria-label="Company" className="lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white">Company</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {footerNav.company.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-line hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Business areas" className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white">Business Areas</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="link-line hover:text-gold">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                {SITE.addressLine}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="link-line hover:text-gold">
                {SITE.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <a href={`tel:${SITE.phoneHref}`} className="link-line hover:text-gold">
                {SITE.phoneDisplay}
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="container-x flex flex-col gap-6 border-t border-white/10 py-8 text-xs md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {footerNav.legal.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="link-line hover:text-gold">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => scrollToTop(false)} className="inline-flex items-center gap-2 self-start uppercase tracking-[0.2em] text-gold hover:text-gold-soft md:self-auto">
          Back to top <ArrowUp size={14} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
