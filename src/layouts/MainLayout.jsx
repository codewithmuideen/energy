import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/** Scrolls to top on route change, or to the #hash target once the lazy page has rendered. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    let tries = 0;
    const id = setInterval(() => {
      const el = document.querySelector(hash);
      if (el || ++tries > 20) {
        clearInterval(id);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
    return () => clearInterval(id);
  }, [pathname, hash]);
  return null;
}

export default function MainLayout({ children }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-navy">
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
