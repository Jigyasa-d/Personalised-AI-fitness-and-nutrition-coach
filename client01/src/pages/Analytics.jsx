import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  LineChart as LineChartIcon, 
  Scale, 
  Flame, 
  Calendar, 
  Moon, 
  Sparkles,
  TrendingUp
} from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d'); // 7d, 30d

  // Mock historic data to showcase high-quality graphs
  const data7d = [
    { date: 'Jul 08', weight: 75.2, calories: 2100, workouts: 1, sleep: 7.2, confidence: 85 },
    { date: 'Jul 09', weight: 74.9, calories: 2350, workouts: 1, sleep: 6.8, confidence: 78 },
    { date: 'Jul 10', weight: 74.8, calories: 1950, workouts: 0, sleep: 8.4, confidence: 92 },
    { date: 'Jul 11', weight: 74.6, calories: 2700, workouts: 1, sleep: 7.5, confidence: 88 },
    { date: 'Jul 12', weight: 74.7, calories: 2200, workouts: 1, sleep: 7.9, confidence: 90 },
    { date: 'Jul 13', weight: 74.4, calories: 1800, workouts: 0, sleep: 8.1, confidence: 94 },
    { date: 'Jul 14', weight: 74.2, calories: 2500, workouts: 1, sleep: 8.2, confidence: 92 },
  ];

  const data30d = [
    { date: 'Wk 1', weight: 76.5, calories: 2300, workouts: 4, sleep: 7.1, confidence: 82 },
    { date: 'Wk 2', weight: 75.8, calories: 2200, workouts: 5, sleep: 7.4, confidence: 86 },
    { date: 'Wk 3', weight: 75.1, calories: 2400, workouts: 4, sleep: 7.8, confidence: 90 },
    { date: 'Wk 4', weight: 74.2, calories: 2250, workouts: 5, sleep: 8.1, confidence: 92 },
  ];

  const activeData = timeRange === '7d' ? data7d : data30d;

  // Custom tooltips
  const CustomTooltip = ({ active, payload, label, unit = '' }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/95 border border-slate-800 px-3.5 py-2.5 rounded-xl backdrop-blur-md shadow-2xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
          <p className="text-sm font-black text-indigo-400 mt-1">
            {payload[0].value} {unit}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LineChartIcon className="h-6 w-6 text-indigo-400" />
            <h1 className="text-3xl font-black text-white tracking-tight">Analytics & Trends</h1>
          </div>
          <p className="text-slate-400 text-sm">Monitor metabolic fluctuations, caloric volumes, and conditioning consistency over time.</p>
        </div>

        {/* Time Selector */}
        <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-xl w-fit">
          <button 
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${timeRange === '7d' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            7 Days
          </button>
          <button 
            onClick={() => setTimeRange('30d')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${timeRange === '30d' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* Grid of charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Weight Progression */}
        <div className="glass-card p-6 rounded-2xl border border-indigo-500/10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <Scale className="h-4.5 w-4.5 text-indigo-400" />
              Weight Progression (kg)
            </span>
            <span className="text-xs font-bold text-indigo-400 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" />
              -1.0 kg (Trend)
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeData} margin={{ left: -20, right: 10 }}>
                <XAxis dataKey="date" stroke="#475569" fontSize={10} fontWeight={600} tickLine={false} dy={8} />
                <YAxis stroke="#475569" fontSize={10} fontWeight={600} tickLine={false} domain={['dataMin - 1', 'dataMax + 1']} dx={-8} />
                <Tooltip content={<CustomTooltip unit="kg" />} />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  dot={{ fill: '#6366f1', strokeWidth: 1, r: 4 }} 
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#06b6d4' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Calories Log */}
        <div className="glass-card p-6 rounded-2xl border border-indigo-500/10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <Flame className="h-4.5 w-4.5 text-purple-400" />
              Caloric Intake (kcal)
            </span>
            <span className="text-xs font-bold text-slate-500">Target: 2200 kcal</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeData} margin={{ left: -20, right: 10 }}>
                <XAxis dataKey="date" stroke="#475569" fontSize={10} fontWeight={600} tickLine={false} dy={8} />
                <YAxis stroke="#475569" fontSize={10} fontWeight={600} tickLine={false} dx={-8} />
                <Tooltip content={<CustomTooltip unit="kcal" />} />
                <Bar 
                  dataKey="calories" 
                  fill="#8b5cf6" 
                  radius={[4, 4, 0, 0]}
                  style={{ filter: 'drop-shadow(0px 4px 8px rgba(139, 92, 246, 0.2))' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Sleep Trend */}
        <div className="glass-card p-6 rounded-2xl border border-indigo-500/10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <Moon className="h-4.5 w-4.5 text-cyan-400" />
              Sleep Quality Trend (hours)
            </span>
            <span className="text-xs font-bold text-cyan-400">Avg: 7.8 hrs</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeData} margin={{ left: -20, right: 10 }}>
                <defs>
                  <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#475569" fontSize={10} fontWeight={600} tickLine={false} dy={8} />
                <YAxis stroke="#475569" fontSize={10} fontWeight={600} tickLine={false} domain={[5, 10]} dx={-8} />
                <Tooltip content={<CustomTooltip unit="hrs" />} />
                <Area 
                  type="monotone" 
                  dataKey="sleep" 
                  stroke="#06b6d4" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorSleep)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Confidence Index */}
        <div className="glass-card p-6 rounded-2xl border border-indigo-500/10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <Sparkles className="h-4.5 w-4.5 text-indigo-400" />
              AI Plan Compliance Index (%)
            </span>
            <span className="text-xs font-bold text-slate-500">Target: &gt;90%</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeData} margin={{ left: -20, right: 10 }}>
                <XAxis dataKey="date" stroke="#475569" fontSize={10} fontWeight={600} tickLine={false} dy={8} />
                <YAxis stroke="#475569" fontSize={10} fontWeight={600} tickLine={false} domain={[60, 100]} dx={-8} />
                <Tooltip content={<CustomTooltip unit="%" />} />
                <Line 
                  type="monotone" 
                  dataKey="confidence" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  dot={{ fill: '#6366f1', strokeWidth: 1, r: 4 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
