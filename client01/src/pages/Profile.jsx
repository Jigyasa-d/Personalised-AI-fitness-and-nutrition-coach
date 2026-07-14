import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Scale, 
  Target, 
  Activity, 
  Apple, 
  LogOut, 
  Sparkles, 
  Settings,
  Mail,
  CalendarDays
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [onboarding, setOnboarding] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOnboarding = async () => {
      try {
        const response = await api.get('/onboarding');
        setOnboarding(response.data);
      } catch (err) {
        console.error("Error loading onboarding details", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOnboarding();
  }, []);

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const handleReOnboard = () => {
    navigate('/onboarding');
  };

  const userName = user?.username || user?.email?.split('@')[0] || 'Athlete';

  // Helper labels
  const goalLabelMap = {
    lose_weight: 'Lose Body Fat',
    build_muscle: 'Build Muscle Mass',
    maintain: 'Maintenance',
    athletic_performance: 'Athletic Conditioning'
  };

  const activityLabelMap = {
    sedentary: 'Sedentary (Desk Tier)',
    moderate: 'Moderate (3-4x / wk)',
    active: 'Highly Active (5-7x / wk)'
  };

  const dietLabelMap = {
    standard: 'Balanced / Standard Diet',
    vegetarian: 'Vegetarian',
    vegan: 'Vegan / Plant-Based',
    keto: 'Ketogenic / Low-Carb',
    paleo: 'Paleolithic Diet'
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <User className="h-6 w-6 text-indigo-400" />
          <h1 className="text-3xl font-black text-white tracking-tight">Athlete Profile</h1>
        </div>
        <p className="text-slate-400 text-sm">Review your body metrics, nutritional preferences, and AI core calibration values.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Card Vitals */}
        <div className="lg:col-span-4 space-y-6">
          {/* Avatar details */}
          <div className="glass-card p-6 rounded-2xl border border-indigo-500/10 text-center flex flex-col items-center">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-0.5 shadow-[0_0_25px_rgba(99,102,241,0.25)] mb-4">
              <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <User className="h-10 w-10 text-indigo-400" />
              </div>
            </div>
            
            <h2 className="text-xl font-extrabold text-white tracking-tight">{userName}</h2>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/30 border border-cyan-800/40 mt-1">
              Momentum Member
            </span>

            <div className="w-full mt-6 space-y-3 pt-6 border-t border-slate-900 text-left text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Email</span>
                <span className="text-slate-200 font-semibold truncate max-w-[150px]">{user?.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> Member Since</span>
                <span className="text-slate-200 font-semibold">July 2026</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={handleReOnboard}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 border border-slate-800 hover:border-indigo-500/30 text-white font-bold text-xs rounded-xl cursor-pointer transition-all"
            >
              <Settings className="h-4 w-4 text-slate-400" />
              Re-calibrate AI Goals
            </button>
            
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold text-xs rounded-xl cursor-pointer transition-all"
            >
              <LogOut className="h-4 w-4" />
              Sign Out Account
            </button>
          </div>
        </div>

        {/* Right Column - Onboarding Metadata */}
        <div className="lg:col-span-8">
          <div className="glass-card p-6 rounded-2xl border border-indigo-500/10 h-full">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-indigo-400" />
              Core AI Parameters
            </h3>

            {isLoading ? (
              <div className="h-40 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500" />
              </div>
            ) : onboarding ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age, Height, Weight */}
                <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-xl flex items-center gap-4">
                  <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Age Threshold</span>
                    <span className="text-base font-extrabold text-white">{onboarding.age} Years Old</span>
                  </div>
                </div>

                <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-xl flex items-center gap-4">
                  <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                    <Scale className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Initial Mass</span>
                    <span className="text-base font-extrabold text-white">{onboarding.weight} kg <span className="text-xs text-slate-500 font-medium">at {onboarding.height} cm</span></span>
                  </div>
                </div>

                {/* Fitness Goal */}
                <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-xl flex items-center gap-4 md:col-span-2">
                  <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Fitness Goal</span>
                    <span className="text-base font-extrabold text-white">{goalLabelMap[onboarding.fitnessGoal] || onboarding.fitnessGoal}</span>
                  </div>
                </div>

                {/* Activity Level */}
                <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-xl flex items-center gap-4 md:col-span-2">
                  <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Activity Volume</span>
                    <span className="text-base font-extrabold text-white">{activityLabelMap[onboarding.activityLevel] || onboarding.activityLevel}</span>
                  </div>
                </div>

                {/* Diet Preference */}
                <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-xl flex items-center gap-4 md:col-span-2">
                  <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                    <Apple className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Diet Preferences</span>
                    <span className="text-base font-extrabold text-white">{dietLabelMap[onboarding.dietPreference] || onboarding.dietPreference}</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-400">No onboarding metrics logged.</p>
                <button 
                  onClick={handleReOnboard}
                  className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Configure Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
