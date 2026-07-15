import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  Activity,
  Droplet,
  Moon,
  Scale,
  Sparkles,
  CheckCircle,
  Clock,
  Flame,
  Zap
} from 'lucide-react';
import api from '../api/axios';

const CheckIn = () => {
  const [formData, setFormData] = useState({
    weight: '',
    sleepHours: '',
    waterIntake: '',
    energyLevel: 5,
    stressLevel: 5,
    soreness: 3,
    motivation: 7,
    workoutCompleted: false,
  });

  const [latestCheckIn, setLatestCheckIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchLatestCheckIn = async () => {
    try {
      const response = await api.get('/checkin/latest');
      // Backend wraps the real payload as { success, message, data: {...} }
      const latest = response.data?.data;
      if (latest) {
        setLatestCheckIn(latest);
        // Pre-fill weight with previous weight to save user effort
        if (latest.weight) {
          setFormData(prev => ({ ...prev, weight: latest.weight }));
        }
      }
    } catch (error) {
      console.log("No previous checkin data found.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestCheckIn();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = (name, val) => {
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.weight || !formData.sleepHours || !formData.waterIntake) {
      setErrorMsg('Please fill out weight, sleep, and water intake stats.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        weight: parseFloat(formData.weight),
        sleepHours: parseFloat(formData.sleepHours),
        waterIntake: parseInt(formData.waterIntake, 10),
        energyLevel: parseInt(formData.energyLevel, 10),
        stressLevel: parseInt(formData.stressLevel, 10),
        soreness: parseInt(formData.soreness, 10),
        motivation: parseInt(formData.motivation, 10),
        workoutCompleted: formData.workoutCompleted,
      };

      const response = await api.post('/checkin', payload);
      setSuccessMsg('Vitals checked in successfully! AI recommendations updated.');
      // Backend wraps the real payload as { success, message, data: {...} }
      setLatestCheckIn(response.data?.data);

      // Clear form inputs that vary daily
      setFormData(prev => ({
        ...prev,
        sleepHours: '',
        waterIntake: '',
      }));

      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || err.response?.data?.detail || 'Failed to submit check-in. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <ClipboardCheck className="h-6 w-6 text-indigo-400" />
          <h1 className="text-3xl font-black text-white tracking-tight">Daily Vitals Check-In</h1>
        </div>
        <p className="text-slate-400 text-sm">Keep your vitals up to date so your AI coach can adjust training intensity and macro counts.</p>
      </div>

      {successMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm font-semibold"
        >
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <span>{successMsg}</span>
        </motion.div>
      )}

      {errorMsg && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-sm font-semibold">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form panel */}
        <div className="lg:col-span-7">
          <div className="glass-card p-6 rounded-2xl border border-indigo-500/10">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-indigo-400" />
              Log Vitals For Today
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Weight */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Weight (kg)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <Scale className="h-4.5 w-4.5 text-slate-500" />
                    </span>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="e.g. 74.5"
                      step="0.1"
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Sleep */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Sleep (hours)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <Moon className="h-4.5 w-4.5 text-slate-500" />
                    </span>
                    <input
                      type="number"
                      name="sleepHours"
                      value={formData.sleepHours}
                      onChange={handleInputChange}
                      placeholder="e.g. 7.5"
                      step="0.1"
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Water */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Water (ml)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <Droplet className="h-4.5 w-4.5 text-slate-500" />
                    </span>
                    <input
                      type="number"
                      name="waterIntake"
                      value={formData.waterIntake}
                      onChange={handleInputChange}
                      placeholder="e.g. 2500"
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              {/* Energy Level Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center pl-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Energy Tier ({formData.energyLevel}/10)</label>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Optimal Focus</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.energyLevel}
                  onChange={(e) => handleSliderChange('energyLevel', parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  disabled={isSubmitting}
                />
              </div>

              {/* Stress Level Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center pl-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stress Index ({formData.stressLevel}/10)</label>
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Calm Mind</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.stressLevel}
                  onChange={(e) => handleSliderChange('stressLevel', parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  disabled={isSubmitting}
                />
              </div>

              {/* Soreness Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center pl-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Muscle Soreness ({formData.soreness}/10)</label>
                  <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Recovery Signal</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.soreness}
                  onChange={(e) => handleSliderChange('soreness', parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  disabled={isSubmitting}
                />
              </div>

              {/* Motivation Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center pl-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Motivation ({formData.motivation}/10)</label>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Drive Level</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.motivation}
                  onChange={(e) => handleSliderChange('motivation', parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  disabled={isSubmitting}
                />
              </div>

              {/* Workout Completed Toggle */}
              <div
                onClick={() => !isSubmitting && setFormData(prev => ({ ...prev, workoutCompleted: !prev.workoutCompleted }))}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 ${formData.workoutCompleted ? 'bg-indigo-600/10 border-indigo-500' : 'bg-slate-950/40 border-slate-800'}`}
              >
                <div className="flex items-center gap-3">
                  <Flame className={`h-5 w-5 ${formData.workoutCompleted ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span className="text-sm font-semibold text-slate-200">Completed today's workout?</span>
                </div>
                <div className={`h-6 w-11 rounded-full relative transition-colors ${formData.workoutCompleted ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                  <div className={`h-5 w-5 bg-white rounded-full absolute top-0.5 transition-all ${formData.workoutCompleted ? 'left-5' : 'left-0.5'}`} />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm rounded-xl border border-indigo-400/20 shadow-[0_4px_15px_rgba(99,102,241,0.2)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Submit Vitals Check-in
                      <Activity className="h-4.5 w-4.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* History / Latest status panel */}
        <div className="lg:col-span-5">
          <div className="glass-card p-6 rounded-2xl border border-indigo-500/10 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="h-4.5 w-4.5 text-indigo-400" />
                Latest Vitals Status
              </h2>

              {isLoading ? (
                <div className="h-40 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500" />
                </div>
              ) : latestCheckIn ? (
                <div className="space-y-4">
                  {/* Weight */}
                  <div className="flex items-center justify-between p-3.5 bg-slate-950/40 border border-slate-900 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Scale className="h-5 w-5 text-indigo-400" />
                      <span className="text-sm font-semibold text-slate-300">Body Weight</span>
                    </div>
                    <span className="text-base font-black text-white">{latestCheckIn.weight ?? '-'} kg</span>
                  </div>

                  {/* Sleep */}
                  <div className="flex items-center justify-between p-3.5 bg-slate-950/40 border border-slate-900 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Moon className="h-5 w-5 text-cyan-400" />
                      <span className="text-sm font-semibold text-slate-300">Sleep Duration</span>
                    </div>
                    <span className="text-base font-black text-white">{latestCheckIn.sleepHours} hrs</span>
                  </div>

                  {/* Water */}
                  <div className="flex items-center justify-between p-3.5 bg-slate-950/40 border border-slate-900 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Droplet className="h-5 w-5 text-blue-400" />
                      <span className="text-sm font-semibold text-slate-300">Water Hydration</span>
                    </div>
                    <span className="text-base font-black text-white">{latestCheckIn.waterIntake} ml</span>
                  </div>

                  {/* Slider Vitals */}
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="p-3 bg-slate-950/40 border border-slate-900 rounded-xl text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Energy Rating</span>
                      <span className="text-xl font-black text-indigo-400">{latestCheckIn.energyLevel}/10</span>
                    </div>
                    <div className="p-3 bg-slate-950/40 border border-slate-900 rounded-xl text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Stress Level</span>
                      <span className="text-xl font-black text-rose-400">{latestCheckIn.stressLevel}/10</span>
                    </div>
                    <div className="p-3 bg-slate-950/40 border border-slate-900 rounded-xl text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Soreness</span>
                      <span className="text-xl font-black text-orange-400">{latestCheckIn.soreness}/10</span>
                    </div>
                    <div className="p-3 bg-slate-950/40 border border-slate-900 rounded-xl text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Motivation</span>
                      <span className="text-xl font-black text-emerald-400">{latestCheckIn.motivation}/10</span>
                    </div>
                  </div>

                  <div className={`flex items-center justify-center gap-2 p-3 rounded-xl border ${latestCheckIn.workoutCompleted ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-slate-950/40 border-slate-900 text-slate-500'}`}>
                    <Zap className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {latestCheckIn.workoutCompleted ? 'Workout Completed Today' : 'Workout Not Yet Completed'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center text-slate-500 bg-slate-950/20 border border-dashed border-slate-800 rounded-xl p-4">
                  <Activity className="h-10 w-10 text-slate-600 mb-3" />
                  <p className="text-sm font-semibold text-slate-400">No Check-in logged today</p>
                  <p className="text-xs text-slate-500 mt-1">Submit your metrics in the form to initialize your dynamic daily stats.</p>
                </div>
              )}
            </div>

            {latestCheckIn && (
              <div className="mt-6 pt-4 border-t border-slate-900 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Last updated: {new Date(latestCheckIn.updatedAt || latestCheckIn.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;