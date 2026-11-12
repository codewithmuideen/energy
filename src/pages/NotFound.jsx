import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '../components/Seo';
import ShaderBackground from '../components/ShaderBackground';
import { LogoMark } from '../components/Logo';
import { Reveal } from '../components/Reveal';

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you are looking for could not be found." path="/404" noindex />
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink">
        <div className="absolute inset-0 -z-10 opacity-90">
          <ShaderBackground />
        </div>
        <div className="container-x text-center">
          <Reveal>
            <LogoMark className="mx-auto h-16 w-16" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 font-serif text-[clamp(6rem,18vw,14rem)] italic leading-none text-gold">404</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">This page has moved, or never existed.</h1>
            <p className="mx-auto mt-4 max-w-md text-mist">Let&rsquo;s get you back on course.</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn btn-gold">
              <ArrowLeft size={16} aria-hidden="true" /> Back to Home
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Contact Us
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
