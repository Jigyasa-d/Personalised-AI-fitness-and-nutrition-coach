import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, Dumbbell } from 'lucide-react';
import api from '../api/axios.js';
import WorkoutCard from '../components/workout/WorkoutCard.jsx';

export default function Workout() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/history/workouts');
        const list = res?.data?.data || [];
        setPlan(list[0] || null);
      } catch { /* noop */ }
      finally { setLoading(false); }
    })();
  }, []);

  const generate = async () => {
    setGenerating(true); setError('');
    try {
      const res = await api.post('/workout/generate');
      setPlan(res?.data?.data || null);
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not generate a plan.');
    } finally { setGenerating(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-400">Workout plan</div>
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">{plan?.plan?.title || 'Your 7-day plan'}</h1>
          {plan?.plan?.summary && <p className="mt-2 max-w-xl text-sm text-ink-500">{plan.plan.summary}</p>}
        </div>
        <button onClick={generate} disabled={generating}
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-cream hover:bg-ink-800 disabled:opacity-60">
          {generating ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} />}
          {generating ? 'Generating…' : plan ? 'Regenerate' : 'Generate plan'}
        </button>
      </div>

      {error && <div className="rounded-xl border border-flame-500/30 bg-flame-500/10 px-3 py-2 text-sm text-flame-500">{error}</div>}

      {plan && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex flex-wrap gap-2"
        >
          <Pill>Momentum {plan.confidenceScore ?? '—'}</Pill>
          <Pill accent="lime">{plan.confidenceLevel || 'Moderate'}</Pill>
          <Pill>{plan?.plan?.days?.length || 7} days</Pill>
        </motion.div>
      )}

      {loading || generating ? (
        <div className="flex h-72 items-center justify-center rounded-3xl border border-ink-900/10 bg-cream text-ink-400">
          <Loader2 className="animate-spin" size={20} />
        </div>
      ) : plan ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {plan?.plan?.days?.map((d, i) => <WorkoutCard key={i} day={d} index={i} />)}
        </div>
      ) : (
        <EmptyState onGenerate={generate} generating={generating} />
      )}
    </div>
  );
}

function Pill({ children, accent }) {
  return <span className={`rounded-full px-3 py-1 text-xs ${accent === 'lime' ? 'bg-lime-400 text-ink-900' : 'border border-ink-900/15 bg-cream text-ink-700'}`}>{children}</span>;
}

function EmptyState({ onGenerate, generating }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-900/15 bg-cream p-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400 text-ink-900"><Dumbbell size={22} /></div>
      <h3 className="mt-4 font-serif text-2xl">No plan yet</h3>
      <p className="mt-1 max-w-md text-sm text-ink-500">Momentum will write a 7-day plan tuned to your goals, equipment and today's score.</p>
      <button onClick={onGenerate} disabled={generating}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-cream hover:bg-ink-800">
        <Sparkles size={14} /> Generate my plan
      </button>
    </div>
  );
}
