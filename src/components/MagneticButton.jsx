import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

/**
 * CTA that is gently pulled toward the pointer on desktop.
 * Renders a router <Link> for internal `to`, <a> for `href`, or <button> otherwise.
 */
export default function MagneticButton({ to, href, children, variant = 'gold', icon = true, strength = 0.28, className = '', ...rest }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <>
      <span>{children}</span>
      {icon && <ArrowRight size={16} aria-hidden="true" />}
    </>
  );
  const cls = `btn btn-${variant} ${className}`;
  let inner;
  if (to) inner = <Link to={to} className={cls} {...rest}>{content}</Link>;
  else if (href) inner = <a href={href} className={cls} {...rest}>{content}</a>;
  else inner = <button className={cls} {...rest}>{content}</button>;

  return (
    <motion.span ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ x: sx, y: sy }} className="inline-block" data-cursor="hover">
      {inner}
    </motion.span>
  );
}
