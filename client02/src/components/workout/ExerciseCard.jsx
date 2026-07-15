export default function ExerciseCard({ exercise }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-ink-900/5 bg-paper px-4 py-3 sm:grid-cols-[1fr_auto_auto_auto]">
      <div className="text-sm font-medium text-ink-900">{exercise?.name}</div>
      <Metric label="Sets" value={exercise?.sets} />
      <Metric label="Reps" value={exercise?.reps} />
      <Metric label="Rest" value={exercise?.rest} />
    </div>
  );
}
function Metric({ label, value }) {
  return (
    <div className="hidden text-right sm:block">
      <div className="text-[10px] uppercase tracking-widest text-ink-400">{label}</div>
      <div className="text-sm font-semibold text-ink-900">{value ?? '—'}</div>
    </div>
  );
}
