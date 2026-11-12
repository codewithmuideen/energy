import { useEffect, useState } from 'react';

export function useMediaQuery(query) {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false);
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

/** True when the device is likely capable of smooth WebGL (not low-power, not reduced motion). */
export function useCanRender3D() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [capable, setCapable] = useState(false);
  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const mem = navigator.deviceMemory || 4;
    const saveData = navigator.connection?.saveData;
    let webgl = false;
    try {
      const c = document.createElement('canvas');
      webgl = !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch {
      webgl = false;
    }
    setCapable(webgl && cores >= 4 && mem >= 2 && !saveData);
  }, []);
  return capable && !reduced;
}
