/**
 * Responsive WebP image from /public/images/<name>-{800,1600}.webp.
 * `priority` loads eagerly with high fetch priority (use for above-the-fold imagery only).
 */
export default function Img({ name, alt, className = '', sizes = '(min-width: 1024px) 50vw, 100vw', priority = false, ...rest }) {
  return (
    <img
      src={`/images/${name}-1600.webp`}
      srcSet={`/images/${name}-800.webp 800w, /images/${name}-1600.webp 1600w`}
      sizes={sizes}
      alt={alt}
      width="1600"
      height="900"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={`h-full w-full object-cover ${className}`}
      {...rest}
    />
  );
}
