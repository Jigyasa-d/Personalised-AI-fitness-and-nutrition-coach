import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const levelStyles = {
  High:        { ring: 'text-lime-500',   badge: 'bg-lime-400 text-ink-900',   sub: 'Push it — your body is ready.' },
  Moderate:    { ring: 'text-mist-500',   badge: 'bg-mist-500 text-ink-900',   sub: 'Solid day. Keep pace, keep form.' },
  Low:         { ring: 'text-flame-400',  badge: 'bg-flame-400 text-ink-900',  sub: 'Dial it back. Volume over intensity.' },
  'Very Low':  { ring: 'text-flame-500',  badge: 'bg-flame-500 text-cream',    sub: 'Recover today. Mobility and sleep win.' },
};

export default function ConfidenceCard({ score = 0, level = 'Moderate', recommendation, reasons = [] }) {
  const style = levelStyles[level] || levelStyles.Moderate;
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  const radius = 88;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (clamped / 100) * circ;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-ink-900 p-6 text-cream sm:p-8 grain">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime-500/20 blur-3xl" />
      <div className="relative grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
        <div className="relative mx-auto flex h-56 w-56 items-center justify-center">
          <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
            <circle cx="100" cy="100" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="14" fill="none" />
            <motion.circle
              cx="100" cy="100" r={radius}
              stroke="currentColor" strokeWidth="14" fill="none"
              strokeLinecap="round"
              className={style.ring}
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[10px] uppercase tracking-[0.2em] text-ink-300">Momentum</div>
            <motion.div
              className="font-serif text-6xl leading-none"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >{clamped}</motion.div>
            <div className={`mt-2 rounded-full px-3 py-0.5 text-xs font-semibold ${style.badge}`}>{level}</div>
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-ink-300">
            <TrendingUp size={12} /> Today's read
          </div>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
            {style.sub}
          </h2>
          {recommendation && (
            <p className="mt-3 max-w-xl text-sm text-ink-200">{recommendation}</p>
          )}
          {reasons?.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {reasons.slice(0, 4).map((r, i) => (
                <li key={i} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-ink-200">
                  {r}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
