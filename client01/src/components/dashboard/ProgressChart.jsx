import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Sparkles } from 'lucide-react';

const ProgressChart = ({ data }) => {
  const defaultData = [
    { name: 'Mon', score: 68 },
    { name: 'Tue', score: 72 },
    { name: 'Wed', score: 85 },
    { name: 'Thu', score: 78 },
    { name: 'Fri', score: 90 },
    { name: 'Sat', score: 92 },
    { name: 'Sun', score: 95 },
  ];

  const chartData = data || defaultData;

  // Custom tooltips matching glassmorphism style
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/90 border border-indigo-500/20 px-3 py-2 rounded-xl backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
          <p className="text-[10px] font-bold text-slate-400 uppercase">{payload[0].payload.name}</p>
          <p className="text-sm font-extrabold text-indigo-400 mt-0.5">
            {payload[0].value}% <span className="text-[10px] text-slate-500 font-medium">Confidence</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card hover:glass-card-hover p-6 rounded-2xl flex flex-col h-full justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-sm font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
            <Activity className="h-4 w-4 text-indigo-400" />
            Weekly Momentum Trend
          </span>
          <p className="text-2xl font-bold text-white mt-1.5">92.4 <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Avg Score</span></p>
        </div>
        <div className="flex items-center gap-1 text-[10px] bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-slate-400 font-semibold uppercase">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          Optimal
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-48 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              stroke="#475569" 
              fontSize={10} 
              fontWeight={600}
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="#475569" 
              fontSize={10} 
              fontWeight={600}
              tickLine={false} 
              axisLine={false} 
              domain={[50, 100]}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(99, 102, 241, 0.15)', strokeWidth: 1 }} />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#6366f1" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#colorScore)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
