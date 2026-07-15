import { ArrowUpRight, Salad } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NutritionPreview({ meal }) {
  const day = meal?.plan?.days?.[0];
  return (
    <Link to="/nutrition" className="group block rounded-2xl border border-ink-900/10 bg-cream p-5 transition hover:border-ink-900/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-ink-400">
          <Salad size={14} /> Latest Nutrition
        </div>
        <ArrowUpRight size={16} className="text-ink-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900" />
      </div>
      {meal ? (
        <>
          <div className="mt-3 font-serif text-2xl leading-tight">
            {meal?.plan?.dailyCalories ?? meal?.calories ?? '—'} <span className="text-base text-ink-400">kcal / day</span>
          </div>
          <div className="mt-1 text-sm text-ink-500 capitalize">Goal: {meal?.goal || 'balanced'}</div>
          {day?.meals?.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {day.meals.slice(0, 3).map((m, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="text-ink-900">{m.name}</span>
                  <span className="text-ink-400">{m.time}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="mt-3 text-sm text-ink-500">Generate a nutrition plan matched to your goal.</div>
      )}
    </Link>
  );
}
