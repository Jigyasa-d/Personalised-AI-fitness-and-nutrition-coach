import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Zap, Flame, Droplet, Dumbbell, Salad, ArrowRight, Loader2 } from 'lucide-react';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import ConfidenceCard from '../components/dashboard/ConfidenceCard.jsx';
import StatsCard from '../components/dashboard/StatsCard.jsx';
import WorkoutPreview from '../components/dashboard/WorkoutPreview.jsx';
import NutritionPreview from '../components/dashboard/NutritionPreview.jsx';
import AIInsight from '../components/dashboard/AIInsight.jsx';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gen, setGen] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [d, c] = await Promise.all([
          api.get('/dashboard').catch(() => null),
          api.get('/confidence').catch(() => null),
        ]);
        setDashboard(d?.data?.data ?? null);
        setConfidence(c?.data?.data ?? null);
      } finally { setLoading(false); }
    })();
  }, []);

  const quickGen = async (kind) => {
    setGen(kind);
    try {
      if (kind === 'workout') {
        await api.post('/workout/generate');
        navigate('/workout');
      } else {
        await api.post('/nutrition/generate');
        navigate('/nutrition');
      }
    } catch { /* handled on page */ }
    finally { setGen(null); }
  };

  const checkin = dashboard?.latestCheckIn;
  const meal = dashboard?.latestMeal;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-400">Today</div>
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
            Hey {user?.fullName?.split(' ')[0] || 'there'}.
          </h1>
        </div>
        <Link to="/checkin" className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-cream hover:bg-ink-800">
          Log today's check-in <ArrowRight size={14} />
        </Link>
      </motion.div>

      {loading ? (
        <div className="flex h-72 items-center justify-center rounded-3xl border border-ink-900/10 bg-cream text-ink-400">
          <Loader2 className="animate-spin" size={20} />
        </div>
      ) : (
        <>
          <ConfidenceCard
            score={confidence?.confidenceScore ?? 0}
            level={confidence?.confidenceLevel ?? 'Moderate'}
            recommendation={confidence?.recommendation}
            reasons={confidence?.reasons}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard label="Sleep" value={checkin?.sleepHours ?? '—'} unit="hrs" icon={Moon} accent="mist" />
            <StatsCard label="Energy" value={checkin?.energyLevel ?? '—'} unit="/10" icon={Zap} accent="lime" />
            <StatsCard label="Soreness" value={checkin?.soreness ?? '—'} unit="/10" icon={Flame} accent="flame" />
            <StatsCard label="Water" value={checkin?.waterIntake ?? '—'} unit="L" icon={Droplet} accent="ink" />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
              <WorkoutPreview workout={dashboard?.latestWorkout} />
              <NutritionPreview meal={meal} />
              <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2">
                <QuickAction
                  icon={Dumbbell} label="Generate workout"
                  hint="7-day plan tuned to today's score"
                  loading={gen === 'workout'} onClick={() => quickGen('workout')}
                />
                <QuickAction
                  icon={Salad} label="Generate nutrition"
                  hint="Calories and macros for your goal"
                  loading={gen === 'nutrition'} onClick={() => quickGen('nutrition')}
                />
              </div>
            </div>
            <div className="space-y-4">
              <AIInsight level={confidence?.confidenceLevel} recommendation={confidence?.recommendation} />
              <div className="rounded-2xl border border-ink-900/10 bg-cream p-5">
                <div className="text-[11px] uppercase tracking-widest text-ink-400">Targets</div>
                <div className="mt-2 font-serif text-3xl text-ink-900">
                  {meal?.plan?.dailyCalories ?? meal?.calories ?? '—'} <span className="text-base text-ink-400">kcal</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                  {['protein','carbs','fats'].map((k) => (
                    <div key={k} className="rounded-xl bg-paper py-2">
                      <div className="text-[10px] uppercase tracking-widest text-ink-400">{k}</div>
                      <div className="text-sm font-semibold text-ink-900">{meal?.plan?.macros?.[k] ?? '—'}g</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-ink-900 p-5 text-cream">
                <div className="text-[11px] uppercase tracking-widest text-ink-300">Plans generated</div>
                <div className="mt-2 flex items-baseline gap-4">
                  <div><span className="font-serif text-3xl">{dashboard?.workoutsGenerated ?? 0}</span><span className="ml-1 text-xs text-ink-300">workouts</span></div>
                  <div><span className="font-serif text-3xl">{dashboard?.nutritionPlansGenerated ?? 0}</span><span className="ml-1 text-xs text-ink-300">meals</span></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function QuickAction({ icon: Icon, label, hint, onClick, loading }) {
  return (
    <button
      onClick={onClick} disabled={loading}
      className="group flex items-center gap-4 rounded-2xl border border-ink-900/10 bg-cream p-5 text-left transition hover:border-ink-900/30 disabled:opacity-60"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 text-ink-900">
        {loading ? <Loader2 className="animate-spin" size={18} /> : <Icon size={18} />}
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-ink-900">{label}</div>
        <div className="text-xs text-ink-500">{hint}</div>
      </div>
      <ArrowRight size={16} className="text-ink-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900" />
    </button>
  );
}
