import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Target, Activity, Apple, ChevronRight } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Onboarding = () => {
  const navigate = useNavigate();
  const { setHasOnboarded } = useAuth();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    fitnessGoal: 'build_muscle', // lose_weight, build_muscle, maintain, athletic_performance
    activityLevel: 'moderate', // sedentary, light, moderate, active
    dietPreference: 'standard', // standard, vegetarian, vegan, keto, paleo
  });
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setError('');
    if (step === 1) {
      if (!formData.age || !formData.height || !formData.weight) {
        setError('Please fill in age, height, and weight details.');
        return;
      }
      if (formData.age <= 0 || formData.height <= 0 || formData.weight <= 0) {
        setError('Please enter valid positive values.');
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setError('');
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Structure the data to POST to /onboarding
      const payload = {
        age: parseInt(formData.age, 10),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        fitnessGoal: formData.fitnessGoal,
        activityLevel: formData.activityLevel,
        dietPreference: formData.dietPreference,
      };

      await api.post('/onboarding', payload);
      setHasOnboarded(true);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.response?.data?.detail || 'Failed to submit onboarding profile. Please check your data and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#020617] text-slate-100 relative overflow-hidden px-4 py-12">
      {/* Glow backgrounds */}
      <div className="absolute top-[-20%] left-[-15%] w-[60%] h-[60%] rounded-full bg-indigo-900/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-15%] w-[60%] h-[60%] rounded-full bg-cyan-900/15 blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg glass-panel rounded-3xl p-8 border border-indigo-500/15 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative z-10"
      >
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Onboarding: Step {step} of 3</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={`h-1.5 w-8 rounded-full transition-all duration-300 ${s <= step ? 'bg-indigo-500 shadow-[0_0_8px_#6366f1]' : 'bg-slate-800'}`}
              />
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3.5 rounded-xl text-xs font-semibold mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-extrabold text-white tracking-tight">Tell us about yourself</h2>
                  <p className="text-xs text-slate-400 mt-1">This allows our AI engine to calculate accurate energy and metabolic metrics.</p>
                </div>

                <div className="space-y-4">
                  {/* Age */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Age (years)</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="e.g. 28"
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50"
                      min="1"
                    />
                  </div>

                  {/* Height */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="e.g. 178"
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50"
                      min="1"
                    />
                  </div>

                  {/* Weight */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="e.g. 74"
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50"
                      min="1"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-sm rounded-xl border border-indigo-400/20 shadow-[0_4px_15px_rgba(99,102,241,0.2)] cursor-pointer"
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    <Target className="h-5 w-5 text-indigo-400" />
                    Goals & Lifestyle
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Select your primary fitness objective and activity multiplier.</p>
                </div>

                <div className="space-y-4">
                  {/* Fitness Goal */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Fitness Objective</label>
                    <div className="grid grid-cols-1 gap-2.5">
                      {[
                        { id: 'lose_weight', title: 'Lose Body Fat', desc: 'Shed calories and optimize fat metabolism.' },
                        { id: 'build_muscle', title: 'Build Muscle Mass', desc: 'Increase lean muscle mass and power splits.' },
                        { id: 'maintain', title: 'Maintenance & Tonality', desc: 'Maintain current metrics and optimize tone.' },
                        { id: 'athletic_performance', title: 'Athletic Conditioning', desc: 'Enhance cardiovascular capacity and recovery.' }
                      ].map((goal) => (
                        <div
                          key={goal.id}
                          onClick={() => setFormData(p => ({ ...p, fitnessGoal: goal.id }))}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-300 flex justify-between items-center ${formData.fitnessGoal === goal.id ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'}`}
                        >
                          <div>
                            <p className="text-xs font-bold text-white">{goal.title}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{goal.desc}</p>
                          </div>
                          {formData.fitnessGoal === goal.id && (
                            <div className="h-4 w-4 rounded-full bg-indigo-500 flex items-center justify-center">
                              <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activity Level */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Activity Tier</label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: 'sedentary', title: 'Sedentary', desc: 'Desk job' },
                        { id: 'moderate', title: 'Moderate', desc: '3-4x active/wk' },
                        { id: 'active', title: 'Highly Active', desc: '5-7x intensive/wk' }
                      ].map((act) => (
                        <div
                          key={act.id}
                          onClick={() => setFormData(p => ({ ...p, activityLevel: act.id }))}
                          className={`p-2.5 rounded-xl border cursor-pointer text-center transition-all duration-300 flex flex-col justify-between ${formData.activityLevel === act.id ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'}`}
                        >
                          <Activity className={`h-4.5 w-4.5 mx-auto mb-1.5 ${formData.activityLevel === act.id ? 'text-indigo-400' : 'text-slate-500'}`} />
                          <p className="text-[11px] font-bold text-white">{act.title}</p>
                          <p className="text-[9px] text-slate-500 mt-0.5">{act.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/3 flex items-center justify-center gap-1.5 py-3 px-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-xl cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="h-4.5 w-4.5" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-2/3 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-sm rounded-xl border border-indigo-400/20 shadow-[0_4px_15px_rgba(99,102,241,0.2)] cursor-pointer"
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    <Apple className="h-5 w-5 text-indigo-400" />
                    Nutrition & Diets
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Select your nutritional strategy or macro structure.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      { id: 'standard', title: 'Standard / Balanced', desc: 'Balanced distribution of whole grains, proteins, fats.' },
                      { id: 'vegetarian', title: 'Vegetarian', desc: 'Plant-forward, including dairy and eggs.' },
                      { id: 'vegan', title: 'Vegan / Plant-Based', desc: '100% plant foods, high-fiber, clean fuel.' },
                      { id: 'keto', title: 'Ketogenic / Low-Carb', desc: 'High-fat, very low carbs. Optimizes ketone burning.' },
                      { id: 'paleo', title: 'Paleolithic Diet', desc: 'Natural, unprocessed hunter-gatherer food choices.' }
                    ].map((diet) => (
                      <div
                        key={diet.id}
                        onClick={() => setFormData(p => ({ ...p, dietPreference: diet.id }))}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-300 flex justify-between items-center ${formData.dietPreference === diet.id ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'}`}
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{diet.title}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{diet.desc}</p>
                        </div>
                        {formData.dietPreference === diet.id && (
                          <div className="h-4 w-4 rounded-full bg-indigo-500 flex items-center justify-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/3 flex items-center justify-center gap-1.5 py-3 px-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-xl cursor-pointer transition-colors"
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className="h-4.5 w-4.5" />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-sm rounded-xl border border-indigo-400/20 shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_30px_rgba(99,102,241,0.4)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Complete Profile
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
};

export default Onboarding;
