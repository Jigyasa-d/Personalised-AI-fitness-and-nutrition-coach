import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck } from 'lucide-react';

const ConfidenceCard = ({ score = 92 }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    // Animate score increment
    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      setAnimatedScore(Math.round(easeProgress * score));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  return (
    <div className="glass-card hover:glass-card-hover p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden h-full">
      {/* Background glow behind the card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Card Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <span className="text-sm font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          AI Coach Confidence
        </span>
        <ShieldCheck className="h-5 w-5 text-indigo-400" />
      </div>

      {/* SVG Circle Gauge */}
      <div className="relative flex items-center justify-center my-4">
        <svg className="w-40 h-40 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-slate-800"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated score circle */}
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-indigo-500"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0px 0px 8px rgba(99, 102, 241, 0.6))',
            }}
          />
        </svg>
        {/* Score text overlay */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold text-white tracking-tight">
            {animatedScore}%
          </span>
          <span className="text-[10px] font-medium tracking-widest text-cyan-400 uppercase mt-0.5">
            Optimal
          </span>
        </div>
      </div>

      {/* Card Footer Info */}
      <div className="text-center mt-2">
        <p className="text-sm text-slate-200 font-medium">Plan Alignment Score</p>
        <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
          Today's plan has a high confidence alignment with your sleep and energy level.
        </p>
      </div>
    </div>
  );
};

export default ConfidenceCard;
