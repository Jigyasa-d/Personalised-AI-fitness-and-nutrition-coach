import { useEffect, useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';
import api from '../api/axios.js';

export default function Analytics() {
  const [checkins, setCheckins] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [c, w, m] = await Promise.all([
          api.get('/history/checkins').catch(() => null),
          api.get('/history/workouts').catch(() => null),
          api.get('/history/nutrition').catch(() => null),
        ]);
        setCheckins(c?.data?.data || []);
        setWorkouts(w?.data?.data || []);
        setMeals(m?.data?.data || []);
      } finally { setLoading(false); }
    })();
  }, []);

  const trend = useMemo(() => {
    const arr = [...checkins].reverse();
    return arr.map((c) => ({
      date: new Date(c.createdAt || c.date || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      sleep: Number(c.sleepHours) || 0,
      energy: Number(c.energyLevel) || 0,
      stress: Number(c.stressLevel) || 0,
      motivation: Number(c.motivation) || 0,
      soreness: Number(c.soreness) || 0,
    }));
  }, [checkins]);

  const momentum = useMemo(() => {
    return trend.map((d) => {
      const raw = (d.sleep / 9) * 25 + (d.energy / 10) * 25 + (d.motivation / 10) * 25 + ((10 - d.stress) / 10) * 12.5 + ((10 - d.soreness) / 10) * 12.5;
      return { date: d.date, score: Math.round(Math.max(0, Math.min(100, raw))) };
    });
  }, [trend]);

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center rounded-3xl border border-ink-900/10 bg-cream text-ink-400">
        <Loader2 className="animate-spin" size={20} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] uppercase tracking-widest text-ink-400">Analytics</div>
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Signal over time.</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatBlock label="Check-ins" value={checkins.length} />
        <StatBlock label="Workouts" value={workouts.length} />
        <StatBlock label="Nutrition plans" value={meals.length} />
      </div>

      <ChartCard title="Momentum trend" subtitle="Modelled score across your check-ins">
        {momentum.length ? (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={momentum} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="rgba(10,10,11,0.06)" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: '#6b6b78', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#6b6b78', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="score" stroke="#0a0a0b" strokeWidth={2.5} dot={{ r: 3, fill: '#c8ff3d', stroke: '#0a0a0b' }} />
            </LineChart>
          </ResponsiveContainer>
        ) : <Empty />}
      </ChartCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Sleep & energy">
          {trend.length ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trend} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="rgba(10,10,11,0.06)" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#6b6b78', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b6b78', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="sleep" stroke="#7aa2ff" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="energy" stroke="#c8ff3d" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : <Empty />}
        </ChartCard>

        <ChartCard title="Stress & soreness">
          {trend.length ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={trend} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="rgba(10,10,11,0.06)" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#6b6b78', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b6b78', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="stress" fill="#ff7a52" radius={[6,6,0,0]} />
                <Bar dataKey="soreness" fill="#0a0a0b" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <Empty />}
        </ChartCard>
      </div>
    </div>
  );
}

const tooltipStyle = {
  background: '#0a0a0b', border: 'none', borderRadius: 12, color: '#f5f1ea',
  fontSize: 12, padding: '8px 10px',
};

function StatBlock({ label, value }) {
  return (
    <div className="rounded-2xl border border-ink-900/10 bg-cream p-5">
      <div className="text-[11px] uppercase tracking-widest text-ink-400">{label}</div>
      <div className="mt-2 font-serif text-4xl">{value}</div>
    </div>
  );
}
function ChartCard({ title, subtitle, children }) {
  return (
    <div className="rounded-3xl border border-ink-900/10 bg-cream p-6">
      <div className="mb-3">
        <div className="font-serif text-2xl">{title}</div>
        {subtitle && <div className="text-xs text-ink-500">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}
function Empty() {
  return <div className="flex h-40 items-center justify-center text-sm text-ink-400">No data yet — log a few check-ins.</div>;
}
