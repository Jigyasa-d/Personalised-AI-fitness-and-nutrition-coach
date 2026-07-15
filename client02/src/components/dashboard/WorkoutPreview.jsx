import { ArrowUpRight, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WorkoutPreview({ workout }) {
  const day = workout?.plan?.days?.[0];
  return (
    <Link to="/workout" className="group block rounded-2xl border border-ink-900/10 bg-cream p-5 transition hover:border-ink-900/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-ink-400">
          <Dumbbell size={14} /> Latest Workout
        </div>
        <ArrowUpRight size={16} className="text-ink-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900" />
      </div>
      {workout ? (
        <>
          <div className="mt-3 font-serif text-2xl leading-tight">{workout?.plan?.title || 'Your plan'}</div>
          <div className="mt-1 text-sm text-ink-500">
            {day?.focus ? `${day.focus} · ${day.duration || '—'}` : workout?.plan?.summary}
          </div>
          {day?.exercises?.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {day.exercises.slice(0, 3).map((ex, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="text-ink-900">{ex.name}</span>
                  <span className="text-ink-400">{ex.sets}×{ex.reps}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="mt-3 text-sm text-ink-500">Generate your first adaptive 7-day plan.</div>
      )}
    </Link>
  );
}
