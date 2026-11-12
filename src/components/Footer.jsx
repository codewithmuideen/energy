import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import Logo from './Logo';
import Img from './Img';
import { footerNav } from '../data/navigation';
import { services } from '../data/services';
import { SITE } from '../data/site';

const SOCIAL_ICONS = { linkedin: FaLinkedinIn, facebook: FaFacebookF, instagram: FaInstagram, x: FaXTwitter, youtube: FaYoutube };

function FooterCTA() {
  return (
    // Straddles the last page section and the footer: every page ends with ~pb-40 of space.
    <div className="container-x relative z-10 -mb-28 -mt-28 md:-mb-32 md:-mt-32">
      <div className="relative overflow-hidden rounded-3xl bg-solar px-6 py-10 md:px-14 md:py-14">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
          <Img name="panel-texture" alt="" sizes="50vw" className="opacity-30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-solar via-solar/60 to-transparent" />
        </div>
        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/80">Free site survey · No obligation</p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight !text-white">Ready to switch to clean, reliable solar power?</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-navy">
              Request a Quote <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a href={`tel:${SITE.phoneHref}`} className="btn btn-light">
              <Phone size={16} aria-hidden="true" /> {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const socials = Object.entries(SITE.social).filter(([, url]) => url);
  return (
    <footer className="relative">
      <FooterCTA />
      <div className="relative overflow-hidden bg-navy pt-44 text-white/70 md:pt-52">
        <div className="cell-grid-light pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" aria-label={`${SITE.brand} home`}>
              <Logo tone="light" />
            </Link>
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed">
              Solar, battery storage and renewable energy solutions for homes, businesses and communities across Nigeria. Clean power you can count on.
            </p>
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-2">
                {socials.map(([k, url]) => {
                  const I = SOCIAL_ICONS[k];
                  return (
                    I && (
                      <li key={k}>
                        <a href={url} target="_blank" rel="noopener noreferrer" aria-label={k} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-solar">
                          <I size={15} />
                        </a>
                      </li>
                    )
                  );
                })}
              </ul>
            )}
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-base font-bold !text-white">Company</h3>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {footerNav.company.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition hover:text-solar-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-base font-bold !text-white">Services</h3>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="transition hover:text-solar-400">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-base font-bold !text-white">Get in touch</h3>
            <ul className="mt-5 space-y-4 text-[0.95rem]">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-solar-400" aria-hidden="true" />
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {SITE.addressLine}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-solar-400" aria-hidden="true" />
                <a href={`tel:${SITE.phoneHref}`} className="hover:text-white">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-solar-400" aria-hidden="true" />
                <a href={`mailto:${SITE.email}`} className="break-all hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-solar-400" aria-hidden="true" />
                {SITE.hours}
              </li>
            </ul>
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-solar-400 hover:text-white">
              Get directions <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <div className="container-x flex flex-col gap-4 py-6 text-sm md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {SITE.brand}. A trading name of {SITE.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerNav.legal.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
