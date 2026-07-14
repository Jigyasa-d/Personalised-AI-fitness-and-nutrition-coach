import React from 'react';
import { Repeat, Timer } from 'lucide-react';
 
const ExerciseCard = ({ exercise, index }) => {
  if (!exercise) return null;
 
  const { name, sets, reps, rest } = exercise;
 
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 hover:border-indigo-500/20 transition-all duration-300 relative group overflow-hidden">
      {/* Background glow hover effect */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
 
      {/* Title & Number */}
      <div className="mb-4">
        <span className="text-[10px] text-cyan-400 font-extrabold tracking-widest uppercase block mb-1">
          Exercise {index !== undefined ? String(index + 1).padStart(2, '0') : ''}
        </span>
        <h4 className="text-base font-extrabold text-white tracking-tight leading-snug group-hover:text-indigo-300 transition-colors duration-300">
          {name}
        </h4>
      </div>
 
      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-900">
        <div className="text-center border-r border-slate-900">
          <span className="text-[9px] font-bold uppercase text-slate-500 block mb-0.5">Sets</span>
          <span className="text-sm font-black text-slate-200">{sets ?? '-'}</span>
        </div>
 
        <div className="text-center border-r border-slate-900">
          <span className="text-[9px] font-bold uppercase text-slate-500 flex items-center justify-center gap-1 mb-0.5">
            <Repeat className="h-2.5 w-2.5" /> Reps
          </span>
          <span className="text-sm font-black text-slate-200">{reps ?? '-'}</span>
        </div>
 
        <div className="text-center">
          <span className="text-[9px] font-bold uppercase text-slate-500 flex items-center justify-center gap-1 mb-0.5">
            <Timer className="h-2.5 w-2.5" /> Rest
          </span>
          <span className="text-sm font-black text-cyan-400">{rest ?? '-'}</span>
        </div>
      </div>
    </div>
  );
};
 
export default ExerciseCard;