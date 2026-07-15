import { Sparkles } from 'lucide-react';

export default function AIInsight({ level, recommendation }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-lime-400 p-5 text-ink-900">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest">
        <Sparkles size={14} /> AI Insight
      </div>
      <div className="mt-2 font-serif text-2xl leading-snug">
        {level ? `${level} Momentum today.` : 'Check in to unlock today\'s guidance.'}
      </div>
      {recommendation && (
        <p className="mt-1 text-sm text-ink-900/70">{recommendation}</p>
      )}
    </div>
  );
}
