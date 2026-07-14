import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatsCard = ({ 
  title, 
  value, 
  target, 
  unit = '', 
  icon: Icon, 
  color = 'indigo', 
  trend = '', 
  trendType = 'up',
  percentage = 0 
}) => {
  // Theme color maps for classes
  const colorMaps = {
    indigo: {
      text: 'text-indigo-400',
      border: 'border-indigo-500/15',
      bg: 'bg-indigo-500/5',
      glow: 'shadow-[0_0_15px_rgba(99,102,241,0.06)]',
      progress: 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]',
      iconBg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
    },
    purple: {
      text: 'text-purple-400',
      border: 'border-purple-500/15',
      bg: 'bg-purple-500/5',
      glow: 'shadow-[0_0_15px_rgba(139,92,246,0.06)]',
      progress: 'bg-purple-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]',
      iconBg: 'bg-purple-500/10 border-purple-500/20 text-purple-400'
    },
    cyan: {
      text: 'text-cyan-400',
      border: 'border-cyan-500/15',
      bg: 'bg-cyan-500/5',
      glow: 'shadow-[0_0_15px_rgba(6,182,212,0.06)]',
      progress: 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]',
      iconBg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
    },
    emerald: {
      text: 'text-emerald-400',
      border: 'border-emerald-500/15',
      bg: 'bg-emerald-500/5',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.06)]',
      progress: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
      iconBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
    },
    amber: {
      text: 'text-amber-400',
      border: 'border-amber-500/15',
      bg: 'bg-amber-500/5',
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.06)]',
      progress: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]',
      iconBg: 'bg-amber-500/10 border-amber-500/20 text-amber-400'
    },
    rose: {
      text: 'text-rose-400',
      border: 'border-rose-500/15',
      bg: 'bg-rose-500/5',
      glow: 'shadow-[0_0_15px_rgba(244,63,94,0.06)]',
      progress: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]',
      iconBg: 'bg-rose-500/10 border-rose-500/20 text-rose-400'
    }
  };

  const style = colorMaps[color] || colorMaps.indigo;

  return (
    <div className={`glass-card hover:glass-card-hover p-5 rounded-2xl flex flex-col justify-between ${style.border} ${style.glow} h-full`}>
      <div className="flex items-start justify-between">
        {/* Metric Title and Icon */}
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">{title}</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
            {unit && <span className="text-sm font-semibold text-slate-400">{unit}</span>}
          </div>
        </div>
        <div className={`p-2.5 rounded-xl border ${style.iconBg} flex items-center justify-center`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {/* Target status / Progression bar */}
      <div className="mt-4">
        {target && (
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 font-medium">
            <span>Progress</span>
            <span>Target: {target} {unit}</span>
          </div>
        )}
        
        {/* Progress Bar Container */}
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${style.progress}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Footer Trend information */}
      {trend && (
        <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-slate-900/60">
          {trendType === 'up' ? (
            <ArrowUpRight className={`h-4.5 w-4.5 ${style.text}`} />
          ) : (
            <ArrowDownRight className="h-4.5 w-4.5 text-rose-400" />
          )}
          <span className={`text-xs font-medium ${trendType === 'up' ? style.text : 'text-rose-400'}`}>{trend}</span>
          <span className="text-[10px] text-slate-500 font-medium">vs yesterday</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
