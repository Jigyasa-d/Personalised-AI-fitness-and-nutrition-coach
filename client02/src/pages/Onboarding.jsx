import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';

const goals = ['weight_loss','muscle_gain','endurance','general_fitness','strength'];
const levels = ['beginner','intermediate','advanced'];
const diets = ['balanced','vegetarian','vegan','keto','paleo','mediterranean'];
const activityLevels = ['sedentary','light','moderate','active','very_active'];
const equipmentOpts = ['none','dumbbells','barbell','kettlebell','resistance_bands','pull_up_bar','full_gym'];

export default function Onboarding() {
  const { setHasOnboarded } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    age: 28, gender: 'male', height: 175, weight: 72,
    fitnessGoal: 'general_fitness', fitnessLevel: 'intermediate',
    dietPreference: 'balanced', activityLevel: 'moderate',
    allergies: [], injuries: [], equipment: ['dumbbells'],
    workoutDays: 4, workoutDuration: 45,
    sleepHours: 7, waterIntake: 2.5,
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggle = (k, v) => setForm((f) => ({
    ...f, [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v]
  }));

  const next = () => setStep((s) => Math.min(s + 1, 2));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    setSaving(true); setError('');
    try {
      await api.post('/onboarding', form);
      setHasOnboarded(true);
      navigate('/', { replace: true });
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not save. Try again.');
    } finally { setSaving(false); }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-widest text-ink-400">Onboarding</div>
        <h1 className="font-serif text-4xl leading-tight">Let's tune Momentum to you.</h1>
      </div>

      <div className="mb-6 flex items-center gap-2">
        {[0,1,2].map((i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-ink-900' : 'bg-ink-900/10'}`} />
        ))}
      </div>

      {error && <div className="mb-4 rounded-xl border border-flame-500/30 bg-flame-500/10 px-3 py-2 text-sm text-flame-500">{error}</div>}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl border border-ink-900/10 bg-cream p-6 sm:p-8"
        >
          {step === 0 && (
            <div className="space-y-5">
              <SectionTitle>Personal stats</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                <NumberField label="Age" value={form.age} min={13} max={100} onChange={(v)=>update('age', v)} />
                <SelectField label="Gender" value={form.gender} onChange={(v)=>update('gender', v)} options={['male','female','other']} />
                <NumberField label="Height (cm)" value={form.height} min={120} max={230} onChange={(v)=>update('height', v)} />
                <NumberField label="Weight (kg)" value={form.weight} min={35} max={220} onChange={(v)=>update('weight', v)} />
                <NumberField label="Sleep (hrs)" step={0.5} value={form.sleepHours} min={4} max={12} onChange={(v)=>update('sleepHours', v)} />
                <NumberField label="Water (L)" step={0.1} value={form.waterIntake} min={0.5} max={6} onChange={(v)=>update('waterIntake', v)} />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <SectionTitle>Goals & training</SectionTitle>
              <SelectField label="Fitness goal" value={form.fitnessGoal} onChange={(v)=>update('fitnessGoal', v)} options={goals} pretty />
              <SelectField label="Fitness level" value={form.fitnessLevel} onChange={(v)=>update('fitnessLevel', v)} options={levels} pretty />
              <SelectField label="Activity level" value={form.activityLevel} onChange={(v)=>update('activityLevel', v)} options={activityLevels} pretty />
              <div className="grid gap-4 sm:grid-cols-2">
                <NumberField label="Workout days / week" value={form.workoutDays} min={1} max={7} onChange={(v)=>update('workoutDays', v)} />
                <NumberField label="Session length (min)" value={form.workoutDuration} min={15} max={120} onChange={(v)=>update('workoutDuration', v)} />
              </div>
              <div>
                <span className="mb-2 block text-[11px] uppercase tracking-widest text-ink-400">Equipment</span>
                <div className="flex flex-wrap gap-2">
                  {equipmentOpts.map((e) => (
                    <Chip key={e} active={form.equipment.includes(e)} onClick={() => toggle('equipment', e)}>
                      {prettify(e)}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <SectionTitle>Diet & considerations</SectionTitle>
              <SelectField label="Diet preference" value={form.dietPreference} onChange={(v)=>update('dietPreference', v)} options={diets} pretty />
              <TagListField label="Allergies" value={form.allergies} onChange={(v)=>update('allergies', v)} placeholder="peanuts, shellfish…" />
              <TagListField label="Injuries" value={form.injuries} onChange={(v)=>update('injuries', v)} placeholder="left knee, lower back…" />
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button" onClick={back} disabled={step === 0}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-ink-500 hover:bg-ink-900/5 disabled:opacity-40"
            ><ArrowLeft size={14} /> Back</button>
            {step < 2 ? (
              <button type="button" onClick={next}
                className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-cream hover:bg-ink-800">
                Continue <ArrowRight size={14} />
              </button>
            ) : (
              <button type="button" onClick={submit} disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-4 py-2 text-sm font-semibold text-ink-900 hover:bg-lime-300 disabled:opacity-60">
                {saving ? <Loader2 className="animate-spin" size={14} /> : <Check size={14} />}
                {saving ? 'Saving…' : 'Finish setup'}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const prettify = (s) => s.replaceAll('_',' ').replace(/\b\w/g, c => c.toUpperCase());

function SectionTitle({ children }) {
  return <h2 className="font-serif text-2xl">{children}</h2>;
}
function NumberField({ label, value, onChange, min, max, step = 1 }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-ink-400">{label}</span>
      <input type="number" value={value} min={min} max={max} step={step}
        onChange={(e)=>onChange(Number(e.target.value))}
        className="w-full rounded-xl border border-ink-900/10 bg-paper px-4 py-2.5 text-sm outline-none focus:border-ink-900" />
    </label>
  );
}
function SelectField({ label, value, onChange, options, pretty }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-ink-400">{label}</span>
      <select value={value} onChange={(e)=>onChange(e.target.value)}
        className="w-full rounded-xl border border-ink-900/10 bg-paper px-4 py-2.5 text-sm outline-none focus:border-ink-900">
        {options.map(o => <option key={o} value={o}>{pretty ? prettify(o) : o}</option>)}
      </select>
    </label>
  );
}
function Chip({ active, onClick, children }) {
  return (
    <button type="button" onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs transition ${active ? 'border-ink-900 bg-ink-900 text-cream' : 'border-ink-900/15 bg-paper text-ink-700 hover:border-ink-900/30'}`}>
      {children}
    </button>
  );
}
function TagListField({ label, value, onChange, placeholder }) {
  const [input, setInput] = useState('');
  const add = () => {
    const t = input.trim();
    if (!t) return;
    onChange([...new Set([...value, t])]);
    setInput('');
  };
  return (
    <div>
      <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-ink-400">{label}</span>
      <div className="flex gap-2">
        <input value={input} onChange={(e)=>setInput(e.target.value)}
          onKeyDown={(e)=>{ if (e.key==='Enter'){ e.preventDefault(); add(); } }}
          placeholder={placeholder}
          className="flex-1 rounded-xl border border-ink-900/10 bg-paper px-4 py-2.5 text-sm outline-none focus:border-ink-900" />
        <button type="button" onClick={add} className="rounded-xl bg-ink-900 px-3 text-sm font-semibold text-cream">Add</button>
      </div>
      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {value.map((t) => (
            <span key={t} className="inline-flex items-center gap-1 rounded-full bg-paper px-2.5 py-1 text-xs">
              {t}
              <button onClick={() => onChange(value.filter(x => x !== t))} className="text-ink-400 hover:text-ink-900">×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
