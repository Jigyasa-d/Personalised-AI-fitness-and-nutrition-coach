import { motion } from 'framer-motion';

export default function StatsCard({ label, value, unit, icon: Icon, accent = 'lime', hint }) {
  const accents = {
    lime:  'bg-lime-400 text-ink-900',
    flame: 'bg-flame-500 text-cream',
    mist:  'bg-mist-500 text-ink-900',
    ink:   'bg-ink-900 text-lime-400',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-2xl border border-ink-900/10 bg-cream p-5"
    >
      <div className="flex items-start justify-between">
        <div className="text-[11px] uppercase tracking-widest text-ink-400">{label}</div>
        {Icon && (
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accents[accent] || accents.lime}`}>
            <Icon size={16} />
          </div>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-serif text-4xl leading-none text-ink-900">{value ?? '—'}</span>
        {unit && <span className="text-sm text-ink-400">{unit}</span>}
      </div>
      {hint && <div className="mt-1 text-xs text-ink-400">{hint}</div>}
    </motion.div>
  );
}
