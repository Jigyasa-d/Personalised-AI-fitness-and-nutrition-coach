import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Flame, 
  Egg, 
  Droplet, 
  Moon, 
  Zap, 
  ShieldAlert,
  ClipboardList
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

// Component imports
import ConfidenceCard from '../components/dashboard/ConfidenceCard';
import StatsCard from '../components/dashboard/StatsCard';
import WorkoutPreview from '../components/dashboard/WorkoutPreview';
import NutritionPreview from '../components/dashboard/NutritionPreview';
import AIInsight from '../components/dashboard/AIInsight';

const Dashboard = () => {
  const { user } = useAuth();
  const [vitals, setVitals] = useState(null);
  const [onboardingData, setOnboardingData] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [nutritionPlan, setNutritionPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userName = user?.username || user?.email?.split('@')[0] || 'Athlete';

  // Calculate dynamic greeting
  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return 'Good morning';
    if (hrs < 18) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch checkin data
        try {
          const checkinRes = await api.get('/checkin/latest');
          if (checkinRes.data && Object.keys(checkinRes.data).length > 0) {
            setVitals(checkinRes.data);
          }
        } catch (e) {
          console.log("No daily vitals logged yet.");
        }

        // Fetch onboarding data for customized targets
        try {
          const onboardingRes = await api.get('/onboarding');
          if (onboardingRes.data) {
            setOnboardingData(onboardingRes.data);
          }
        } catch (e) {
          console.log("Error loading onboarding details.");
        }

        // Fetch generated plans from localStorage to keep it persistent across page reloads
        const storedWorkout = localStorage.getItem('generated_workout');
        if (storedWorkout) {
          try {
            setWorkoutPlan(JSON.parse(storedWorkout));
          } catch (e) {}
        }

        const storedNutrition = localStorage.getItem('generated_nutrition');
        if (storedNutrition) {
          try {
            setNutritionPlan(JSON.parse(storedNutrition));
          } catch (e) {}
        }

      } catch (err) {
        console.error("Dashboard initialize error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Set default targets based on goals
  const targetCalories = onboardingData?.fitnessGoal === 'lose_weight' ? 1800 : onboardingData?.fitnessGoal === 'build_muscle' ? 2800 : 2200;
  const targetProtein = onboardingData?.fitnessGoal === 'build_muscle' ? 160 : 130;
  const targetWater = 3000;
  const targetSleep = 8.0;

  // Actual logs
  const loggedCalories = nutritionPlan?.totalCalories || 0;
  const loggedProtein = nutritionPlan?.macros?.protein?.value || 0;
  const loggedWater = vitals?.waterIntake || 0;
  const loggedSleep = vitals?.sleepHours || 0;
  const loggedEnergy = vitals?.energyLevel || 0;
  const loggedStress = vitals?.stressLevel || 0;

  // Percentage calculations
  const caloriesPercent = loggedCalories ? (loggedCalories / targetCalories) * 100 : 0;
  const proteinPercent = loggedProtein ? (loggedProtein / targetProtein) * 100 : 0;
  const waterPercent = loggedWater ? (loggedWater / targetWater) * 100 : 0;
  const sleepPercent = loggedSleep ? (loggedSleep / targetSleep) * 100 : 0;
  const energyPercent = loggedEnergy ? (loggedEnergy / 10) * 100 : 0;
  const stressPercent = loggedStress ? (10 - loggedStress) * 100 : 0; // lower stress is better

  // AI insights generator based on current vitals
  const getAIInsight = () => {
    if (!vitals) {
      return "Log your daily vitals in the Check-In page. This allows the AI Engine to construct today's performance thresholds.";
    }
    if (vitals.sleepHours < 6.5) {
      return `Your sleep of ${vitals.sleepHours}h is below optimal target. Your recovery score is 68%. Avoid heavy compound lifts today. We have reduced your targeted training volume by 15%.`;
    }
    if (vitals.energyLevel > 7 && vitals.stressLevel < 5) {
      return `Excellent parameters detected. Recovery alignment is 94% with low stress. Today is an ideal window for high-intensity training. Add 10% load to your compound splits.`;
    }
    return `Your recovery index is stable at 85%. Ensure you drink another ${Math.max(0, targetWater - loggedWater)}ml of water. Complete today's standard training split as programmed.`;
  };

  const confidenceScore = vitals ? (vitals.sleepHours > 7.5 ? 94 : vitals.sleepHours > 6.5 ? 85 : 72) : 90;

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500" />
        <p className="mt-4 text-slate-400 font-semibold tracking-wider">Syncing Vitals Engine...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            {getGreeting()}, <span className="text-indigo-400">{userName}</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Your AI coach has prepared today's plan.</p>
        </div>
        {!vitals && (
          <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2.5 rounded-xl text-xs font-semibold text-indigo-400">
            <ShieldAlert className="h-4.5 w-4.5 text-indigo-400" />
            <span>Missing daily vitals log!</span>
          </div>
        )}
      </div>

      {/* AI recommendation panel */}
      <AIInsight insight={getAIInsight()} />

      {/* Primary Grid: Confidence Circle & Vitals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Confidence Card */}
        <div className="md:col-span-1 lg:col-span-1">
          <ConfidenceCard score={confidenceScore} />
        </div>

        {/* Stats Cards list (taking rest of space) */}
        <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Calories */}
          <StatsCard 
            title="Calories Consumed" 
            value={loggedCalories || '---'} 
            target={targetCalories}
            unit="kcal"
            icon={Flame}
            color="indigo"
            percentage={caloriesPercent || 15}
            trend={loggedCalories ? "+120 kcal" : ""}
          />

          {/* Protein */}
          <StatsCard 
            title="Protein Target" 
            value={loggedProtein || '---'} 
            target={targetProtein}
            unit="g"
            icon={Egg}
            color="purple"
            percentage={proteinPercent || 20}
            trend={loggedProtein ? "+15g" : ""}
          />

          {/* Water */}
          <StatsCard 
            title="Water Hydration" 
            value={loggedWater || '---'} 
            target={targetWater}
            unit="ml"
            icon={Droplet}
            color="cyan"
            percentage={waterPercent}
            trend={loggedWater ? "+500 ml" : ""}
          />

          {/* Sleep */}
          <StatsCard 
            title="Sleep Quality" 
            value={loggedSleep || '---'} 
            target={targetSleep}
            unit="hrs"
            icon={Moon}
            color="emerald"
            percentage={sleepPercent}
            trend={loggedSleep ? "+0.5h" : ""}
          />

          {/* Energy */}
          <StatsCard 
            title="Energy Level" 
            value={loggedEnergy ? `${loggedEnergy}/10` : '---'} 
            target="10"
            unit=""
            icon={Zap}
            color="amber"
            percentage={energyPercent}
            trend={loggedEnergy ? "Optimal focus" : ""}
          />

          {/* Stress */}
          <StatsCard 
            title="Stress Load" 
            value={loggedStress ? `${loggedStress}/10` : '---'} 
            target="1"
            unit=""
            icon={ClipboardList}
            color="rose"
            percentage={stressPercent}
            trend={loggedStress ? "Calm state" : ""}
          />
        </div>
      </div>

      {/* Workout and Nutrition Details Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WorkoutPreview workout={workoutPlan} />
        <NutritionPreview nutrition={nutritionPlan} />
      </div>
    </div>
  );
};

export default Dashboard;
