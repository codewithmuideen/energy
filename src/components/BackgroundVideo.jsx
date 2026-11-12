import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const mq = (q) => typeof window !== 'undefined' && window.matchMedia(q).matches;

/**
 * Muted looping background video that only plays while on screen.
 * Uses `mobileSrc` on small screens; shows the poster for reduced-motion or data-saver users.
 * `controls` adds a pause button (WCAG 2.2.2).
 */
export default function BackgroundVideo({
  src,
  mobileSrc,
  poster,
  className = '',
  controls = false,
  controlsClass = 'bottom-6 right-5 md:bottom-8 md:right-8',
  label = 'background video',
  eager = false,
}) {
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);
  const [env] = useState(() => ({
    reduced: mq('(prefers-reduced-motion: reduce)'),
    small: mq('(max-width: 767px)'),
    saveData: typeof navigator !== 'undefined' && !!navigator.connection?.saveData,
  }));
  const showVideo = !env.reduced && !env.saveData;
  const source = env.small && mobileSrc ? mobileSrc : src;

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
  }, [showVideo, paused]);

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
          ref={ref}
          className={`h-full w-full object-cover ${className}`}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay={eager}
          preload={eager ? 'auto' : 'metadata'}
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
          className={`absolute z-20 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-navy ${controlsClass}`}
          aria-label={paused ? `Play ${label}` : `Pause ${label}`}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      )}
    </>
  );
}
