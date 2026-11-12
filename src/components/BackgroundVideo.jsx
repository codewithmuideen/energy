import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

/**
 * Muted looping background video that only plays while on screen.
 * - Picks a lighter `mobileSrc` on small screens.
 * - Falls back to the poster image for reduced-motion users or data-saver connections.
 * - Exposes a pause control (WCAG 2.2.2) when `controls` is set.
 */
export default function BackgroundVideo({ src, mobileSrc, poster, className = '', controls = false, label = 'background video', eager = false }) {
  const ref = useRef(null);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const small = useMediaQuery('(max-width: 767px)');
  const [paused, setPaused] = useState(false);
  const [saveData, setSaveData] = useState(false);

  useEffect(() => setSaveData(!!navigator.connection?.saveData), []);
  const showVideo = !reduced && !saveData;
  const source = small && mobileSrc ? mobileSrc : src;

  useEffect(() => {
    const v = ref.current;
    if (!v || !showVideo) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !paused) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.05 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [showVideo, paused, source]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <>
      {showVideo ? (
        <video
          key={source}
          ref={ref}
          className={`h-full w-full object-cover ${className}`}
          poster={poster}
          muted
          loop
          playsInline
          preload={eager ? 'auto' : 'none'}
          aria-hidden="true"
        >
          <source src={source} type="video/mp4" />
        </video>
      ) : (
        <img src={poster} alt="" aria-hidden="true" className={`h-full w-full object-cover ${className}`} />
      )}
      {controls && showVideo && (
        <button
          type="button"
          onClick={toggle}
          className="glass absolute bottom-6 right-5 z-20 grid h-11 w-11 place-items-center rounded-full text-white transition hover:border-gold/60 md:bottom-10 md:right-10"
          aria-label={paused ? `Play ${label}` : `Pause ${label}`}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      )}
    </>
  );
}
