import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import MainLayout from './layouts/MainLayout';
import PageTransition from './components/PageTransition';
import { scrollToTop } from './animations/gsapConfig';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
const Business = lazy(() => import('./pages/Business'));
const Sustainability = lazy(() => import('./pages/Sustainability'));
const Insights = lazy(() => import('./pages/Insights'));
const InsightDetails = lazy(() => import('./pages/InsightDetails'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const Credits = lazy(() => import('./pages/Credits'));
const NotFound = lazy(() => import('./pages/NotFound'));

function RouteFallback() {
  return <div className="min-h-screen bg-ink" aria-busy="true" />;
}

export default function App() {
  const location = useLocation();
  return (
    <MainLayout>
      <AnimatePresence mode="wait" onExitComplete={() => !location.hash && scrollToTop(true)}>
        <PageTransition key={location.pathname}>
          <Suspense fallback={<RouteFallback />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetails />} />
              <Route path="/business" element={<Business />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:slug" element={<InsightDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </AnimatePresence>
    </MainLayout>
  );
}
