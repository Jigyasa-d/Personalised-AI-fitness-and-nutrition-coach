import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Clock, Flame, Zap, ArrowRight } from 'lucide-react';

const WorkoutPreview = ({ workout }) => {
  const navigate = useNavigate();

  // Handle empty or default state
  const hasWorkout = workout && workout.exercises && workout.exercises.length > 0;
  
  const workoutName = workout?.name || "AI Personalized Split";
  const duration = workout?.duration || 45;
  const difficulty = workout?.difficulty || "Intermediate";
  const calories = workout?.caloriesBurned || 350;
  const exercises = workout?.exercises || [
    { name: 'Incline Dumbbell Press', sets: 4, reps: '10-12' },
    { name: 'Bulgarian Split Squats', sets: 3, reps: '12 (each)' },
    { name: 'Cable Lat Pulldowns', sets: 4, reps: '10' },
  ];

  return (
    <div className="glass-card hover:glass-card-hover p-6 rounded-2xl flex flex-col justify-between h-full relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
            <Dumbbell className="h-4 w-4 text-indigo-400" />
            Today's Workout
          </span>
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400`}>
            {difficulty}
          </span>
        </div>

        {/* Workout Name */}
        <h3 className="text-lg font-bold text-white mb-4 line-clamp-1">{workoutName}</h3>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 p-2.5 rounded-xl">
            <Clock className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Duration</p>
              <p className="text-sm font-bold text-slate-200">{duration} min</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 p-2.5 rounded-xl">
            <Flame className="h-4 w-4 text-rose-400" />
            <div>
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Est. Burn</p>
              <p className="text-sm font-bold text-slate-200">{calories} kcal</p>
            </div>
          </div>
        </div>

        {/* Exercises Preview List */}
        <div className="space-y-2 mb-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Target Moves</p>
          {exercises.slice(0, 3).map((ex, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-1.5 px-2 bg-slate-950/40 rounded-lg border border-slate-900/50">
              <span className="text-slate-300 font-medium truncate max-w-[150px]">{ex.name}</span>
              <span className="text-slate-500 font-semibold text-[10px] bg-slate-900 px-2 py-0.5 rounded">
                {ex.sets}x{ex.reps}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Generate / Edit Workout Page link */}
      <button 
        onClick={() => navigate('/workout')}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold rounded-xl border border-indigo-400/20 shadow-[0_4px_15px_rgba(99,102,241,0.2)] hover:shadow-[0_4px_25px_rgba(99,102,241,0.35)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
      >
        {hasWorkout ? 'View Full Workout' : 'Generate Custom Plan'}
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export default WorkoutPreview;
