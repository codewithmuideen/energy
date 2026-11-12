import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronDown, Clock, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import Logo from './Logo';
import Icon from './Icon';
import { mainNav } from '../data/navigation';
import { SITE } from '../data/site';
import { EASE } from './Reveal';

function TopBar() {
  return (
    <div className="border-b border-white/10 text-[0.8rem] text-white/75">
      <div className="container-x flex h-10 items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 transition hover:text-white">
            <Mail size={14} className="text-solar-400" aria-hidden="true" /> {SITE.email}
          </a>
          <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
            <MapPin size={14} className="text-solar-400" aria-hidden="true" /> {SITE.addressShort}
          </a>
        </div>
        <span className="inline-flex items-center gap-2">
          <Clock size={14} className="text-solar-400" aria-hidden="true" /> {SITE.hours}
        </span>
      </div>
    </div>
  );
}

function Dropdown({ item, solid }) {
  const [open, setOpen] = useState(false);
  const timer = useRef();
  const show = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 120);
  };
  return (
    <li className="relative flex" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          `inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-[0.9rem] font-semibold transition ${
            solid ? (isActive ? 'text-solar-600' : 'text-navy hover:text-solar-600') : isActive ? 'text-white' : 'text-white/85 hover:text-white'
          }`
        }
        aria-haspopup="true"
        aria-expanded={open}
      >
        {item.label} <ChevronDown size={15} className={`transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </NavLink>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute left-1/2 top-full w-[620px] -translate-x-1/2 pt-4"
          >
            <div className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-white p-3 shadow-[0_30px_60px_-20px_rgba(10,31,51,0.35)]">
              {item.children.map((c) => (
                <Link key={c.to} to={c.to} className="group flex items-center gap-3 rounded-xl p-3 transition hover:bg-paper">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-solar-50 text-solar-600 transition group-hover:bg-solar group-hover:text-white">
                    <Icon name={c.icon} size={19} />
                  </span>
                  <span className="text-sm font-semibold text-navy">{c.label}</span>
                </Link>
              ))}
              <Link to={item.to} className="col-span-2 mt-1 flex items-center justify-between rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white">
                View all services <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobile(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setMobile(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobile]);

  const solid = scrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top info bar exists on desktop only; it collapses once the page scrolls */}
      <div className={`hidden transition-all duration-500 lg:block ${solid ? 'pointer-events-none lg:-mt-10 lg:opacity-0' : ''}`}>
        <TopBar />
      </div>
      <div className={`transition-all duration-500 ${solid ? 'bg-white/95 shadow-[0_10px_30px_-15px_rgba(10,31,51,0.25)] backdrop-blur-md' : 'bg-transparent'}`}>
        <nav className="container-x flex h-[68px] items-center justify-between gap-4 sm:h-[76px]" aria-label="Main">
          <Link to="/" aria-label={`${SITE.brand} home`} className="shrink-0">
            <Logo tone={solid ? 'dark' : 'light'} />
          </Link>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {mainNav.map((item) =>
              item.children ? (
                <Dropdown key={item.to} item={item} solid={solid} />
              ) : (
                <li key={item.to} className="flex">
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `relative inline-flex h-10 items-center rounded-full px-3.5 text-[0.9rem] font-semibold transition ${
                        solid ? (isActive ? 'text-solar-600' : 'text-navy hover:text-solar-600') : isActive ? 'text-white' : 'text-white/85 hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && <span className="absolute inset-x-3.5 bottom-0.5 h-0.5 rounded-full bg-solar" />}
                      </>
                    )}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          <div className="flex items-center gap-3">
            <Link to="/contact" className="btn btn-primary hidden !px-6 !py-3.5 sm:inline-flex">
              Get a Quote <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => setMobile(true)}
              className={`grid h-11 w-11 place-items-center rounded-full border transition xl:hidden ${solid ? 'border-line bg-white text-navy' : 'border-white/40 bg-navy/60 text-white backdrop-blur'}`}
              aria-label="Open menu"
              aria-expanded={mobile}
              aria-controls="mobile-menu"
            >
              <Menu size={22} strokeWidth={2.25} />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobile && (
          <>
            <motion.div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobile(false)} />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto bg-white"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-line px-5">
                <Logo />
                <button type="button" onClick={() => setMobile(false)} className="grid h-11 w-11 place-items-center rounded-full border border-line text-navy" aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>
              <ul className="flex-1 px-5 py-4">
                {mainNav.map((item) => (
                  <li key={item.to} className="border-b border-line">
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) => `flex items-center justify-between py-4 font-display text-lg font-semibold ${isActive ? 'text-solar-600' : 'text-navy'}`}
                    >
                      {item.label} <ArrowRight size={18} className="text-muted" aria-hidden="true" />
                    </NavLink>
                    {item.children && (
                      <ul className="-mt-1 grid gap-1 pb-4">
                        {item.children.map((c) => (
                          <li key={c.to}>
                            <Link to={c.to} className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-body hover:bg-paper">
                              <Icon name={c.icon} size={16} className="text-solar" /> {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <div className="space-y-3 border-t border-line bg-paper p-5 text-sm">
                <a href={`tel:${SITE.phoneHref}`} className="flex items-center gap-3 font-semibold text-navy">
                  <Phone size={16} className="text-solar" aria-hidden="true" /> {SITE.phoneDisplay}
                </a>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 break-all text-navy">
                  <Mail size={16} className="shrink-0 text-solar" aria-hidden="true" /> {SITE.email}
                </a>
                <Link to="/contact" className="btn btn-primary mt-2 w-full">
                  Get a Free Quote <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
