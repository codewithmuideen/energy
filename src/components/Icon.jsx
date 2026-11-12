import {
  Activity, Award, Battery, Building2, Calculator, ClipboardList, Gauge, Handshake, Headset, Home, Leaf, Lightbulb,
  Network, PencilRuler, ShieldCheck, Sun, Users, Wrench,
} from 'lucide-react';

const MAP = {
  activity: Activity, award: Award, battery: Battery, building: Building2, calculator: Calculator, clipboard: ClipboardList,
  gauge: Gauge, handshake: Handshake, headset: Headset, home: Home, leaf: Leaf, lightbulb: Lightbulb, grid: Network,
  pencil: PencilRuler, shield: ShieldCheck, sun: Sun, users: Users, wrench: Wrench,
};

/** Named icon lookup so data files can reference icons by string. */
export default function Icon({ name, size = 24, className = '', strokeWidth = 1.75 }) {
  const C = MAP[name] || Sun;
  return <C size={size} className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
