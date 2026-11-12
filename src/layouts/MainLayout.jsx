import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import CustomCursor from '../components/CustomCursor';
import ScrollProgress from '../components/ScrollProgress';
import { initSmoothScroll, destroySmoothScroll, scrollToTarget, ScrollTrigger } from '../animations/gsapConfig';

export default function MainLayout({ children }) {
  const location = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  // Hash links (e.g. /about#values): scroll once the page transition has settled.
  useEffect(() => {
    if (!location.hash) return;
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
      scrollToTarget(location.hash);
    }, 900);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  return (
    <div className={ready ? '' : 'pointer-events-none'}>
      <Preloader onDone={() => setReady(true)} />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
