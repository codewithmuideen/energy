import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { EASE } from './Reveal';

export default function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <ul className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className={`rounded-2xl border transition ${isOpen ? 'border-solar/40 bg-white shadow-[0_20px_40px_-25px_rgba(10,31,51,0.3)]' : 'border-line bg-white'}`}>
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-display text-base font-semibold text-navy md:text-lg"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {f.q}
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition ${isOpen ? 'rotate-45 bg-solar text-white' : 'bg-paper text-navy'}`}>
                  <Plus size={18} aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
