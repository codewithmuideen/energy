import { lazy, Suspense } from 'react';
import { useInView } from '../hooks/useScroll';
import { useCanRender3D } from '../hooks/useMediaQuery';

const scenes = {
  liquid: lazy(() => import('./LiquidObject')),
  globe: lazy(() => import('./EnergyGlobe')),
};

/**
 * Mounts a WebGL scene only when it approaches the viewport on capable devices,
 * pauses rendering when scrolled away, and shows `fallback` otherwise.
 */
export default function EnergyScene({ scene = 'liquid', fallback = null, className = '' }) {
  const [ref, inView] = useInView({ rootMargin: '300px' });
  const [mountRef, mounted] = useInView({ rootMargin: '400px', once: true });
  const capable = useCanRender3D();
  const Scene = scenes[scene];

  return (
    <div
      ref={(el) => {
        ref.current = el;
        mountRef.current = el;
      }}
      className={`relative ${className}`}
    >
      {capable && mounted ? (
        <Suspense fallback={fallback}>
          <Scene active={inView} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
