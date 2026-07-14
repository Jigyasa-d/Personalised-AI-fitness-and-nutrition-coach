import React from 'react';
import { Sparkles, Brain, Zap, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AIInsight = ({ insight }) => {
  const defaultInsight = "Your recovery score is exceptionally high today based on your 8.2h sleep quality and optimal heart rate variability. We recommend increasing your training intensity by 10% or adding a final AMRAP set to your workout.";
  const displayInsight = insight || defaultInsight;

  return (
    <div className="glass-card p-6 rounded-2xl relative overflow-hidden glow-border-accent bg-gradient-to-br from-slate-950 via-slate-900/80 to-cyan-950/20">
      {/* Interactive animated gradient background */}
      <div className="absolute top-[-30%] right-[-20%] w-60 h-60 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-30%] left-[-20%] w-60 h-60 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="flex items-start gap-4">
          {/* AI pulsing icon */}
          <div className="relative flex-shrink-0 mt-1">
            <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-md pulse-glow-indicator"></div>
            <div className="relative bg-gradient-to-tr from-cyan-500 to-indigo-500 p-3 rounded-2xl border border-cyan-400/30 flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">AI Engine Insight</span>
              <span className="h-1 w-1 bg-cyan-400 rounded-full" />
              <span className="text-[10px] font-semibold text-slate-400">Updated 10m ago</span>
            </div>
            <h4 className="text-base font-bold text-white mb-2 flex items-center gap-1.5">
              High Recovery Potential Detected
              <Zap className="h-4.5 w-4.5 text-cyan-400 fill-cyan-400/20" />
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              {displayInsight}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-shrink-0 flex items-center justify-center gap-2 py-3 px-5 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 font-bold text-xs rounded-xl border border-cyan-400/20 shadow-[0_4px_15px_rgba(6,182,212,0.2)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.35)] transition-all duration-300 cursor-pointer"
        >
          Optimize Plan
          <ArrowUpRight className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default AIInsight;
