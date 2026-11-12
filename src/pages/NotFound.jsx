import { Link } from 'react-router-dom';
import { ArrowRight, SunDim } from 'lucide-react';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" path="/404" noindex />
      <section className="relative overflow-hidden bg-navy pb-48 pt-44 md:pb-56 md:pt-56">
        <div className="cell-grid-light absolute inset-0" aria-hidden="true" />
        <div className="container-x relative text-center">
          <SunDim size={56} className="mx-auto text-sun" aria-hidden="true" />
          <p className="mt-6 font-display text-[clamp(5rem,14vw,9rem)] font-extrabold leading-none text-white/10">404</p>
          <h1 className="-mt-6 font-display text-[clamp(1.8rem,4vw,3rem)] font-bold !text-white">This page is off the grid</h1>
          <p className="mx-auto mt-4 max-w-md text-white/70">The page you are looking for has moved or does not exist.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn btn-primary">
              Back to Home <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn btn-outline-light">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
