import { Clock, Flame } from 'lucide-react';

export default function MealCard({ meal }) {
  return (
    <div className="rounded-2xl border border-ink-900/10 bg-cream p-4">
      <div className="flex items-center justify-between text-xs text-ink-500">
        <span className="inline-flex items-center gap-1"><Clock size={12} />{meal?.time}</span>
        <span className="inline-flex items-center gap-1"><Flame size={12} />{meal?.nutrition?.calories ?? '—'} kcal</span>
      </div>
      <div className="mt-2 font-serif text-xl text-ink-900">{meal?.name}</div>
      {meal?.ingredients?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {meal.ingredients.map((ing, i) => (
            <span key={i} className="rounded-full bg-paper px-2.5 py-0.5 text-[11px] text-ink-500">{ing}</span>
          ))}
        </div>
      )}
      <div className="mt-3 text-xs text-ink-400">
        Protein <span className="font-semibold text-ink-900">{meal?.nutrition?.protein ?? '—'}g</span>
      </div>
    </div>
  );
}
