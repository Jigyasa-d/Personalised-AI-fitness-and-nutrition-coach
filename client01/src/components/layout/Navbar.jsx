import React from 'react';
import { Search, Bell, Sparkles, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
const userName = user?.fullName || user?.username || user?.email?.split('@')[0] || 'Athlete';
  return (
    <header className="fixed top-0 right-0 left-64 h-20 glass-panel border-b border-indigo-500/10 flex items-center justify-between px-8 z-20">
      {/* Search Bar */}
      <div className="relative w-80 max-w-md hidden md:block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </span>
        <input
          type="text"
          placeholder="Search stats, meals, workouts..."
          className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300"
        />
      </div>

      {/* Placeholder or spacer if search is hidden */}
      <div className="block md:hidden" />

      {/* Right actions */}
      <div className="flex items-center gap-6">
        {/* AI Status Indicator */}
        <div className="flex items-center gap-2 bg-cyan-950/30 border border-cyan-500/20 px-3 py-1.5 rounded-full">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_8px_#06b6d4]"></span>
          </div>
          <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            AI Coach: Active
          </span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 text-slate-400 hover:text-white transition-all duration-300 cursor-pointer">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 border-l border-slate-800 pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-200">{userName}</p>
            <p className="text-xs text-slate-400 capitalize">{user?.role || 'Momentum Member'}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-0.5 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
