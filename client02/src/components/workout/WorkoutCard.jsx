import { motion } from 'framer-motion';
import { Clock, Flame } from 'lucide-react';
import ExerciseCard from './ExerciseCard.jsx';

export default function WorkoutCard({ day, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-3xl border border-ink-900/10 bg-cream p-6"
    >
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-400">{day?.day}</div>
          <h3 className="font-serif text-2xl leading-tight text-ink-900">{day?.focus}</h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-ink-500">
          {day?.duration && (
            <span className="inline-flex items-center gap-1"><Clock size={12} /> {day.duration}</span>
          )}
          {day?.exercises?.length && (
            <span className="inline-flex items-center gap-1"><Flame size={12} /> {day.exercises.length} moves</span>
          )}
        </div>
      </header>
      <div className="mt-5 grid gap-2">
        {day?.exercises?.map((ex, i) => (
          <ExerciseCard key={i} exercise={ex} />
        ))}
      </div>
    </motion.article>
  );
}
