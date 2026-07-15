import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import api from '../api/axios.js';

export default function CheckIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    energyLevel: 6, sleepHours: 7, soreness: 3, stressLevel: 4,
    weight: 72, motivation: 7, workoutCompleted: false, waterIntake: 2.5, notes: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      await api.post('/checkin', form);
      setOk(true);
      setTimeout(() => navigate('/'), 800);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save your check-in.');
    } finally { setSaving(false); }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-widest text-ink-400">Daily check-in</div>
        <h1 className="font-serif text-4xl leading-tight">How's today feeling?</h1>
        <p className="mt-2 text-sm text-ink-500">Honest input in, adaptive plan out.</p>
      </div>

      {error && <div className="mb-4 rounded-xl border border-flame-500/30 bg-flame-500/10 px-3 py-2 text-sm text-flame-500">{error}</div>}

      <motion.form onSubmit={submit}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="space-y-4 rounded-3xl border border-ink-900/10 bg-cream p-6 sm:p-8"
      >
        <Slider label="Energy" value={form.energyLevel} min={1} max={10} onChange={(v)=>set('energyLevel', v)} suffix="/10" />
        <Slider label="Soreness" value={form.soreness} min={1} max={10} onChange={(v)=>set('soreness', v)} suffix="/10" />
        <Slider label="Stress" value={form.stressLevel} min={1} max={10} onChange={(v)=>set('stressLevel', v)} suffix="/10" />
        <Slider label="Motivation" value={form.motivation} min={1} max={10} onChange={(v)=>set('motivation', v)} suffix="/10" />

        <div className="grid gap-4 sm:grid-cols-3">
          <NumberField label="Sleep (hrs)" step={0.5} value={form.sleepHours} onChange={(v)=>set('sleepHours', v)} />
          <NumberField label="Weight (kg)" step={0.1} value={form.weight} onChange={(v)=>set('weight', v)} />
          <NumberField label="Water (L)" step={0.1} value={form.waterIntake} onChange={(v)=>set('waterIntake', v)} />
        </div>

        <label className="flex items-center justify-between rounded-xl bg-paper px-4 py-3">
          <span className="text-sm font-medium">Completed today's workout</span>
          <button type="button" role="switch" aria-checked={form.workoutCompleted}
            onClick={()=>set('workoutCompleted', !form.workoutCompleted)}
            className={`relative h-6 w-11 rounded-full transition ${form.workoutCompleted ? 'bg-lime-400' : 'bg-ink-900/15'}`}>
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-ink-900 transition ${form.workoutCompleted ? 'left-[22px]' : 'left-0.5'}`} />
          </button>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-ink-400">Notes</span>
          <textarea value={form.notes} onChange={(e)=>set('notes', e.target.value)} rows={3}
            className="w-full resize-none rounded-xl border border-ink-900/10 bg-paper px-4 py-3 text-sm outline-none focus:border-ink-900"
            placeholder="Anything to flag today?" />
        </label>

        <button type="submit" disabled={saving || ok}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 px-4 py-3 text-sm font-semibold text-cream hover:bg-ink-800 disabled:opacity-60">
          {ok ? <><Check size={16} /> Saved</> : saving ? <><Loader2 className="animate-spin" size={16} /> Saving…</> : 'Save check-in'}
        </button>
      </motion.form>
    </div>
  );
}

function Slider({ label, value, min, max, onChange, suffix }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-[11px] uppercase tracking-widest text-ink-400">{label}</span>
        <span className="font-serif text-2xl text-ink-900">{value}<span className="ml-1 text-xs text-ink-400">{suffix}</span></span>
      </div>
      <input type="range" min={min} max={max} value={value}
        onChange={(e)=>onChange(Number(e.target.value))} className="w-full" />
    </div>
  );
}
function NumberField({ label, value, onChange, step = 1 }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-ink-400">{label}</span>
      <input type="number" value={value} step={step}
        onChange={(e)=>onChange(Number(e.target.value))}
        className="w-full rounded-xl border border-ink-900/10 bg-paper px-4 py-2.5 text-sm outline-none focus:border-ink-900" />
    </label>
  );
}
