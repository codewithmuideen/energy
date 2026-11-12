import { useEffect, useRef, useState } from 'react';

/** Tracks scroll offset and direction (throttled with rAF). */
export function useScrollState(threshold = 40) {
  const [state, setState] = useState({ y: 0, scrolled: false, direction: 'up' });
  const last = useRef(0);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const direction = y > last.current + 4 ? 'down' : y < last.current - 4 ? 'up' : null;
      setState((s) => ({ y, scrolled: y > threshold, direction: direction ?? s.direction }));
      last.current = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return state;
}

/** Returns [ref, inView]; once=true keeps it true after first intersection. */
export function useInView({ rootMargin = '200px', once = false } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, once]);
  return [ref, inView];
}
