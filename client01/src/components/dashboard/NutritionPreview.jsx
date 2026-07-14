import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Apple, Eye, ArrowRight } from 'lucide-react';

const NutritionPreview = ({ nutrition }) => {
  const navigate = useNavigate();

  const meals = nutrition?.meals || {
    breakfast: { name: 'Avocado Toast & Egg Whites', calories: 350 },
    lunch: { name: 'Grilled Chicken Salad with Quinoa', calories: 620 },
    dinner: { name: 'Seared Salmon & Asparagus', calories: 550 },
  };

  const macros = nutrition?.macros || {
    protein: { value: 140, target: 160 },
    carbs: { value: 180, target: 200 },
    fats: { value: 65, target: 75 },
  };

  const hasNutrition = nutrition && nutrition.meals;

  return (
    <div className="glass-card hover:glass-card-hover p-6 rounded-2xl flex flex-col justify-between h-full relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
            <Apple className="h-4 w-4 text-purple-400" />
            Today's Nutrition
          </span>
          <span className="text-xs font-semibold text-purple-400">
            {nutrition?.totalCalories || 1520} kcal
          </span>
        </div>

        {/* Meal Preview Items */}
        <div className="space-y-3 mb-5">
          <div className="flex justify-between items-center bg-slate-900/40 p-2 rounded-xl border border-slate-900">
            <div className="truncate max-w-[170px]">
              <p className="text-[10px] font-bold text-purple-400 uppercase">Breakfast</p>
              <p className="text-xs font-semibold text-slate-200 truncate">{meals.breakfast?.name || 'Not logged'}</p>
            </div>
            <span className="text-[10px] font-bold text-slate-400">{meals.breakfast?.calories || 0} kcal</span>
          </div>

          <div className="flex justify-between items-center bg-slate-900/40 p-2 rounded-xl border border-slate-900">
            <div className="truncate max-w-[170px]">
              <p className="text-[10px] font-bold text-purple-400 uppercase">Lunch</p>
              <p className="text-xs font-semibold text-slate-200 truncate">{meals.lunch?.name || 'Not logged'}</p>
            </div>
            <span className="text-[10px] font-bold text-slate-400">{meals.lunch?.calories || 0} kcal</span>
          </div>

          <div className="flex justify-between items-center bg-slate-900/40 p-2 rounded-xl border border-slate-900">
            <div className="truncate max-w-[170px]">
              <p className="text-[10px] font-bold text-purple-400 uppercase">Dinner</p>
              <p className="text-xs font-semibold text-slate-200 truncate">{meals.dinner?.name || 'Not logged'}</p>
            </div>
            <span className="text-[10px] font-bold text-slate-400">{meals.dinner?.calories || 0} kcal</span>
          </div>
        </div>

        {/* Macro summary grid */}
        <div className="space-y-2 mb-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Macro Target</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-950/40 border border-slate-900/80 rounded-xl p-2 text-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase block">Protein</span>
              <span className="text-xs font-bold text-slate-200">{macros.protein.value}g</span>
              <div className="w-full h-1 bg-slate-900 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 rounded-full" 
                  style={{ width: `${(macros.protein.value / macros.protein.target) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-950/40 border border-slate-900/80 rounded-xl p-2 text-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase block">Carbs</span>
              <span className="text-xs font-bold text-slate-200">{macros.carbs.value}g</span>
              <div className="w-full h-1 bg-slate-900 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 rounded-full" 
                  style={{ width: `${(macros.carbs.value / macros.carbs.target) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-950/40 border border-slate-900/80 rounded-xl p-2 text-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase block">Fats</span>
              <span className="text-xs font-bold text-slate-200">{macros.fats.value}g</span>
              <div className="w-full h-1 bg-slate-900 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full" 
                  style={{ width: `${(macros.fats.value / macros.fats.target) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => navigate('/nutrition')}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white text-xs font-semibold rounded-xl border border-purple-400/20 shadow-[0_4px_15px_rgba(139,92,246,0.2)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.35)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
      >
        {hasNutrition ? 'View Meal Log' : 'Create Nutrition Plan'}
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export default NutritionPreview;
