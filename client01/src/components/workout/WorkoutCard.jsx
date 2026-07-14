import React from 'react';
import { Clock, Dumbbell, Sparkles, Gauge, Cpu, Moon } from 'lucide-react';
import ExerciseCard from './ExerciseCard';
 
const WorkoutCard = ({ workout }) => {
  if (!workout) return null;
 
  const {
    plan,
    confidenceScore,
    confidenceLevel,
    aiProvider,
    week,
  } = workout;
 
  if (!plan) return null;
 
  const { title, summary, days = [] } = plan;
 
  return (
    <div className="space-y-6">
      {/* Header / Plan overview */}
      <div className="glass-card p-6 rounded-2xl border border-indigo-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)] bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-950">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-900">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {week && (
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  Week {week}
                </span>
              )}
              {aiProvider && (
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center gap-1">
                  <Cpu className="h-3 w-3" /> {aiProvider}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">{title || 'AI Custom Generation'}</h2>
            {summary && (
              <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">{summary}</p>
            )}
          </div>
 
          {/* Confidence metric */}
          {(confidenceScore !== undefined || confidenceLevel) && (
            <div className="flex items-center gap-2.5 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800 flex-shrink-0">
              <Gauge className="h-5 w-5 text-emerald-400" />
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Confidence</p>
                <p className="text-sm font-black text-slate-200">
                  {confidenceScore !== undefined ? `${confidenceScore}%` : confidenceLevel}
                  {confidenceScore !== undefined && confidenceLevel ? ` · ${confidenceLevel}` : ''}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
 
      {/* Day-by-day breakdown */}
      <div className="space-y-5">
        {days.map((day) => {
          const isRestDay = !day.exercises || day.exercises.length === 0;
 
          return (
            <div
              key={day.day}
              className="glass-card p-6 rounded-2xl border border-slate-800"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-black text-sm flex-shrink-0">
                    {day.day}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white tracking-tight">
                      {day.focus || `Day ${day.day}`}
                    </h3>
                    {day.duration && (
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Clock className="h-3.5 w-3.5" /> {day.duration}
                      </p>
                    )}
                  </div>
                </div>
 
                {isRestDay && (
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 w-fit">
                    <Moon className="h-3.5 w-3.5" /> Rest Day
                  </span>
                )}
              </div>
 
              {!isRestDay && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {day.exercises.map((exercise, index) => (
                    <ExerciseCard key={index} exercise={exercise} index={index} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
 
      {days.length === 0 && (
        <div className="glass-card p-8 rounded-2xl border border-slate-800 text-center text-sm text-slate-400 flex flex-col items-center gap-2">
          <Sparkles className="h-6 w-6 text-slate-500" />
          No day-by-day breakdown was returned for this plan.
        </div>
      )}
    </div>
  );
};
 
export default WorkoutCard;
