import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, ChevronDown, Mail, Phone } from 'lucide-react';
import Logo from './Logo';
import { mainNav } from '../data/navigation';
import { SITE } from '../data/site';
import { useScrollState } from '../hooks/useScroll';
import { getLenis } from '../animations/gsapConfig';
import { EASE, EASE_QUART } from '../animations/motionVariants';

function Dropdown({ item, open, onClose, id }) {
  const wide = item.children.length > 4;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={id}
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: EASE }}
          className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 ${wide ? 'w-[640px]' : 'w-[340px]'}`}
        >
          <div className="glass glass-edge rounded-[3px] bg-ink/85 p-3">
            <ul className={`grid gap-1 ${wide ? 'grid-cols-2' : ''}`}>
              {item.children.map((c) => (
                <li key={c.to}>
                  <Link
                    to={c.to}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-[2px] px-4 py-3 transition hover:bg-white/[0.06] focus-visible:bg-white/[0.06]"
                  >
                    {wide && <span className="mt-0.5 font-serif text-sm italic text-gold">{c.desc}</span>}
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-white transition group-hover:text-gold-soft">{c.label}</span>
                      {!wide && <span className="mt-0.5 block text-xs text-mist/80">{c.desc}</span>}
                    </span>
                    <ArrowUpRight size={14} className="mt-0.5 text-gold opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to={item.to}
              onClick={onClose}
              className="mt-2 flex items-center justify-between border-t border-white/10 px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold hover:text-gold-soft"
            >
              View all {item.label.replace('Our ', '').toLowerCase()} <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MenuIcon({ open }) {
  return (
    <span className="relative block h-3.5 w-7" aria-hidden="true">
      <motion.span className="absolute left-0 top-0 h-[1.5px] w-full bg-current" animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.45, ease: EASE }} />
      <motion.span className="absolute bottom-0 right-0 h-[1.5px] bg-current" animate={open ? { rotate: -45, y: -6, width: '100%' } : { rotate: 0, y: 0, width: '65%' }} transition={{ duration: 0.45, ease: EASE }} />
    </span>
  );
}

export default function Navbar() {
  const { scrolled, direction, y } = useScrollState(60);
  const [openMenu, setOpenMenu] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);
  const closeTimer = useRef();

  // Close menus on route change.
  useEffect(() => {
    setOpenMenu(null);
    setDrawer(false);
  }, [location.pathname]);

  // Lock scroll while the drawer is open; Escape closes menus.
  useEffect(() => {
    const lenis = getLenis();
    if (drawer) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setDrawer(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawer]);

  const hidden = scrolled && direction === 'down' && y > 500 && !drawer && !openMenu;
  const enter = (label) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

  return (
    <>
      <a href="#main" className="sr-only z-[120] bg-gold px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <motion.header
        ref={navRef}
        className="fixed inset-x-0 top-0 z-[60]"
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.6, ease: EASE_QUART }}
      >
        {/* Utility bar */}
        <motion.div
          className="overflow-hidden border-b border-white/10 bg-ink/40 backdrop-blur-sm"
          animate={{ height: scrolled ? 0 : 'auto', opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="container-x flex h-10 items-center justify-between text-[0.7rem] font-medium tracking-[0.08em] text-white/70">
            <p className="hidden truncate sm:block">
              <span className="text-gold">Apex Core</span>
              <span className="mx-3 text-white/25">/</span>Oil and Energy Resources Ltd · Lagos, Nigeria
            </p>
            <div className="flex w-full items-center justify-between gap-5 sm:w-auto sm:justify-end">
              <a href={`mailto:${SITE.email}`} className="link-line inline-flex items-center gap-2 hover:text-white">
                <Mail size={12} className="text-gold" aria-hidden="true" />
                <span className="hidden md:inline">{SITE.email}</span>
                <span className="md:hidden">Email</span>
              </a>
              <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden="true" />
              <a href={`tel:${SITE.phoneHref}`} className="link-line inline-flex items-center gap-2 hover:text-white">
                <Phone size={12} className="text-gold" aria-hidden="true" />
                {SITE.phoneDisplay}
              </a>
              <span className="hidden h-3 w-px bg-white/20 lg:block" aria-hidden="true" />
              <Link to="/contact" className="link-line hidden text-gold hover:text-gold-soft lg:inline">
                Business Enquiries
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Main navigation */}
        <div className={`transition-[background-color,backdrop-filter,border-color,box-shadow] duration-700 ${scrolled ? 'border-b border-white/10 bg-ink/70 shadow-[0_10px_40px_-20px_rgba(0,0,0,.6)] backdrop-blur-xl backdrop-saturate-150' : 'border-b border-transparent bg-transparent'}`}>
          <nav aria-label="Primary" className="container-x flex h-[76px] items-center justify-between gap-6 md:h-[86px]">
            <Link to="/" aria-label="Apex Core: home" className="relative z-[61]">
              <Logo />
            </Link>

            <ul className="hidden items-center gap-1 xl:flex">
              {mainNav.map((item) => (
                <li key={item.label} className="relative" onMouseEnter={() => item.children && enter(item.label)} onMouseLeave={() => item.children && leave()}>
                  {item.children ? (
                    <div className="flex items-center">
                      <NavLink
                        to={item.to}
                        className={({ isActive }) => `relative px-3 py-2 text-[0.84rem] font-semibold tracking-[0.02em] transition ${isActive ? 'text-gold' : 'text-white/85 hover:text-white'}`}
                      >
                        {item.label}
                      </NavLink>
                      <button
                        type="button"
                        aria-expanded={openMenu === item.label}
                        aria-controls={`menu-${item.label}`}
                        aria-label={`${item.label} submenu`}
                        onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                        className="-ml-2 p-1.5 text-white/60 hover:text-gold"
                      >
                        <ChevronDown size={14} className={`transition-transform duration-500 ${openMenu === item.label ? 'rotate-180' : ''}`} />
                      </button>
                      <Dropdown item={item} id={`menu-${item.label}`} open={openMenu === item.label} onClose={() => setOpenMenu(null)} />
                    </div>
                  ) : (
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) => `group relative block px-3 py-2 text-[0.84rem] font-semibold tracking-[0.02em] transition ${isActive ? 'text-gold' : 'text-white/85 hover:text-white'}`}
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}
                          {isActive && <motion.span layoutId="nav-indicator" className="absolute inset-x-3 -bottom-0.5 h-px bg-gold" transition={{ duration: 0.6, ease: EASE }} />}
                        </>
                      )}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <Link to="/contact" className="btn btn-gold hidden !min-h-[2.9rem] !px-5 !text-[0.72rem] md:inline-flex" data-cursor="hover">
                Let&rsquo;s Talk <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => setDrawer((d) => !d)}
                aria-expanded={drawer}
                aria-controls="mobile-drawer"
                aria-label={drawer ? 'Close menu' : 'Open menu'}
                className="relative z-[61] grid h-11 w-11 place-items-center text-white xl:hidden"
              >
                <MenuIcon open={drawer} />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawer && (
          <motion.div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[59] flex flex-col overflow-y-auto bg-ink xl:hidden"
            data-lenis-prevent
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 60px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 60px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 60px)' }}
            transition={{ duration: 0.8, ease: EASE_QUART }}
          >
            <div className="grain absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(22,182,164,.14),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(198,161,91,.12),transparent_55%)]" />
            <div className="container-x flex flex-1 flex-col pb-10 pt-32">
              <ul className="flex flex-col">
                {mainNav.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.8, ease: EASE }}
                    className="border-b border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) => `flex items-baseline gap-4 py-4 text-3xl font-semibold tracking-tight sm:text-4xl ${isActive ? 'text-gold' : 'text-white'}`}
                      >
                        <span className="font-serif text-sm italic text-gold/80">0{i + 1}</span>
                        {item.label}
                      </NavLink>
                      {item.children && (
                        <button
                          type="button"
                          aria-expanded={mobileSub === item.label}
                          aria-label={`Show ${item.label} links`}
                          onClick={() => setMobileSub(mobileSub === item.label ? null : item.label)}
                          className="grid h-11 w-11 place-items-center text-gold"
                        >
                          <ChevronDown className={`transition-transform duration-500 ${mobileSub === item.label ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {item.children && mobileSub === item.label && (
                        <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="overflow-hidden">
                          {item.children.map((c) => (
                            <li key={c.to}>
                              <Link to={c.to} className="block py-2.5 pl-9 text-base text-mist hover:text-gold">
                                {c.label}
                              </Link>
                            </li>
                          ))}
                          <li className="h-4" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </ul>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-auto space-y-3 pt-12 text-sm text-mist">
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-gold">
                  <Mail size={16} className="text-gold" aria-hidden="true" /> {SITE.email}
                </a>
                <a href={`tel:${SITE.phoneHref}`} className="flex items-center gap-3 hover:text-gold">
                  <Phone size={16} className="text-gold" aria-hidden="true" /> {SITE.phoneDisplay}
                </a>
                <Link to="/contact" className="btn btn-gold mt-6 w-full">
                  Business Enquiries <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
