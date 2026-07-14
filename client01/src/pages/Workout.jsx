import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Sparkles, Wand2, ShieldAlert, CheckCircle, RefreshCcw } from 'lucide-react';
import api from '../api/axios';
import WorkoutCard from '../components/workout/WorkoutCard';
 
const Workout = () => {
  const [workout, setWorkout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 
  useEffect(() => {
    // Load previously generated workout from localStorage
    const savedWorkout = localStorage.getItem('generated_workout');
    if (savedWorkout) {
      try {
        setWorkout(JSON.parse(savedWorkout));
      } catch (e) {
        console.error("Error parsing saved workout plan");
      }
    }
  }, []);
 
  const handleGenerateWorkout = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // POST /workout/generate (optionally empty payload or customizable if backend supports it)
      const response = await api.post('/workout/generate', {});
 
      // Backend wraps the real payload as { success, message, data: {...} }
      const generatedPlan = response.data?.data ?? response.data;
      setWorkout(generatedPlan);
      
      // Save in localStorage for persistence
      localStorage.setItem('generated_workout', JSON.stringify(generatedPlan));
      setSuccess('AI Workout split generated and calibrated successfully!');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        err.response?.data?.detail || 
        'Failed to generate workout plan. Please ensure your onboarding profile is complete.'
      );
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Dumbbell className="h-6 w-6 text-indigo-400" />
            <h1 className="text-3xl font-black text-white tracking-tight">AI Workout Engine</h1>
          </div>
          <p className="text-slate-400 text-sm">Create and modify fully customized training splits backed by your performance levels.</p>
        </div>
 
        {workout && !isLoading && (
          <button
            onClick={handleGenerateWorkout}
            className="flex items-center gap-2 py-2 px-4 bg-slate-900 border border-slate-800 hover:border-indigo-500/30 text-xs font-bold text-slate-300 rounded-xl transition-all cursor-pointer"
          >
            <RefreshCcw className="h-4 w-4" />
            Regenerate Routine
          </button>
        )}
      </div>
 
      {/* Success Alert */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm font-semibold"
        >
          <CheckCircle className="h-5 w-5" />
          <span>{success}</span>
        </motion.div>
      )}
 
      {/* Error Alert */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-sm font-semibold">
          {error}
        </div>
      )}
 
      {/* Content State */}
      {isLoading ? (
        <div className="glass-card p-12 rounded-3xl border border-indigo-500/15 flex flex-col items-center justify-center min-h-[400px]">
          {/* Scanning pulsing animation */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl animate-pulse"></div>
            <div className="relative border border-indigo-500/40 p-6 rounded-full bg-slate-950/80">
              <Dumbbell className="h-10 w-10 text-indigo-400 animate-bounce" />
            </div>
            <div className="absolute top-0 bottom-0 left-0 right-0 border-t border-indigo-400/40 w-full h-1/2 animate-[pulse_1.5s_infinite]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Analyzing Muscle Recovery & Targets</h3>
          <p className="text-xs text-slate-400 text-center max-w-sm">
            Our AI engine is processing your metabolic baseline, activity logs, and current fatigue ratios to create a customized workout split...
          </p>
        </div>
      ) : workout ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Main Workout Panel */}
          <WorkoutCard workout={workout} />
 
          {/* Raw JSON viewer to satisfy "Display AI generated JSON beautifully" */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Raw AI Generation Data (JSON)</span>
              <span className="text-[10px] bg-slate-900 text-slate-500 px-2 py-0.5 rounded font-semibold">Verified</span>
            </div>
            <pre className="text-xs text-cyan-400 bg-slate-950/60 p-4 rounded-xl border border-slate-900/60 overflow-x-auto max-h-60 font-mono scrollbar-thin">
              {JSON.stringify(workout, null, 2)}
            </pre>
          </div>
        </motion.div>
      ) : (
        <div className="glass-card p-12 rounded-3xl border border-indigo-500/15 flex flex-col items-center justify-center text-center min-h-[400px]">
          <div className="bg-indigo-600/10 p-5 rounded-full border border-indigo-500/20 mb-6 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
            <Sparkles className="h-10 w-10" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Generate Your Custom Workout Program</h2>
          <p className="text-sm text-slate-400 max-w-md mb-8">
            Get a hyper-personalized daily exercise routine including sets, reps, equipment, rest guidelines, and difficulty calibration.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerateWorkout}
            className="flex items-center gap-2.5 py-3.5 px-6 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm rounded-xl border border-indigo-400/20 shadow-[0_4px_25px_rgba(99,102,241,0.3)] cursor-pointer"
          >
            <Wand2 className="h-4.5 w-4.5" />
            Synthesize AI Routine
          </motion.button>
        </div>
      )}
    </div>
  );
};
 
export default Workout;