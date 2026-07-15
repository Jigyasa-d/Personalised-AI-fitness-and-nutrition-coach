import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, Salad } from 'lucide-react';
import api from '../api/axios.js';
import MealCard from '../components/nutrition/MealCard.jsx';
import MacroChart from '../components/nutrition/MacroChart.jsx';

export default function Nutrition() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/history/nutrition');
        const list = res?.data?.data || [];
        setPlan(list[0] || null);
      } catch { /* noop */ }
      finally { setLoading(false); }
    })();
  }, []);

  const generate = async () => {
    setGenerating(true); setError('');
    try {
      const res = await api.post('/nutrition/generate');
      setPlan(res?.data?.data || null);
      setActiveDay(0);
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not generate a plan.');
    } finally { setGenerating(false); }
  };

  const dailyCalories = plan?.plan?.dailyCalories ?? plan?.calories;
  const macros = plan?.plan?.macros || {};
  const days = plan?.plan?.days || [];
  const current = days[activeDay];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-400">Nutrition plan</div>
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl capitalize">
            {plan?.goal ? `${plan.goal.replaceAll('_',' ')} plan` : 'Your nutrition'}
          </h1>
        </div>
        <button onClick={generate} disabled={generating}
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-cream hover:bg-ink-800 disabled:opacity-60">
          {generating ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} />}
          {generating ? 'Generating…' : plan ? 'Regenerate' : 'Generate plan'}
        </button>
      </div>

      {error && <div className="rounded-xl border border-flame-500/30 bg-flame-500/10 px-3 py-2 text-sm text-flame-500">{error}</div>}

      {loading || generating ? (
        <div className="flex h-72 items-center justify-center rounded-3xl border border-ink-900/10 bg-cream text-ink-400">
          <Loader2 className="animate-spin" size={20} />
        </div>
      ) : plan ? (
        <>
          <div className="grid gap-4 lg:grid-cols-3">
            <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
              className="rounded-3xl bg-ink-900 p-6 text-cream lg:col-span-1">
              <div className="text-[11px] uppercase tracking-widest text-ink-300">Daily target</div>
              <div className="mt-2 font-serif text-5xl">{dailyCalories ?? '—'}</div>
              <div className="text-sm text-ink-300">kcal</div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {['protein','carbs','fats'].map((k) => (
                  <div key={k} className="rounded-xl bg-white/5 py-2">
                    <div className="text-[10px] uppercase tracking-widest text-ink-300">{k}</div>
                    <div className="text-sm font-semibold text-cream">{macros[k] ?? '—'}g</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="rounded-3xl border border-ink-900/10 bg-cream p-6 lg:col-span-2">
              <div className="text-[11px] uppercase tracking-widest text-ink-400">Macro split</div>
              <MacroChart macros={macros} />
            </div>
          </div>

          {days.length > 0 && (
            <div className="rounded-3xl border border-ink-900/10 bg-cream p-6">
              <div className="mb-4 flex gap-2 overflow-x-auto scrollbar-none">
                {days.map((d, i) => (
                  <button key={i} onClick={() => setActiveDay(i)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${i === activeDay ? 'bg-ink-900 text-cream' : 'bg-paper text-ink-600 hover:bg-ink-900/10'}`}>
                    {d.day || `Day ${i+1}`}
                  </button>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {current?.meals?.map((m, i) => <MealCard key={i} meal={m} />)}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-900/15 bg-cream p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400 text-ink-900"><Salad size={22} /></div>
          <h3 className="mt-4 font-serif text-2xl">No nutrition plan yet</h3>
          <p className="mt-1 max-w-md text-sm text-ink-500">Generate a plan matched to your goal, diet, and calorie target.</p>
          <button onClick={generate} className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-cream hover:bg-ink-800">
            <Sparkles size={14} /> Generate my plan
          </button>
        </div>
      )}
    </div>
  );
}
