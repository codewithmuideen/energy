/** Liquid-glass surface with a pointer-following reflection and refraction-style gradient edge. */
export default function GlassPanel({ as: Tag = 'div', className = '', children, ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <Tag onPointerMove={onMove} className={`glass glass-sheen glass-edge ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
