import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Dumbbell, Salad, LineChart, ClipboardCheck, User, X, Zap } from 'lucide-react';

const items = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/workout', label: 'Workout', icon: Dumbbell },
  { to: '/nutrition', label: 'Nutrition', icon: Salad },
  { to: '/analytics', label: 'Analytics', icon: LineChart },
  { to: '/checkin', label: 'Check-In', icon: ClipboardCheck },
  { to: '/profile', label: 'Profile', icon: User },
];

function NavContents({ onNavigate }) {
  return (
    <>
      <div className="flex items-center gap-2 px-6 pt-7 pb-8">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-400 text-ink-900">
          <Zap size={18} strokeWidth={2.5} />
        </div>
        <div className="leading-tight">
          <div className="font-serif text-xl">Momentum</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-400">AI Coach</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-ink-900 text-cream'
                  : 'text-ink-400 hover:bg-ink-900/5 hover:text-ink-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} strokeWidth={isActive ? 2.25 : 1.75} />
                <span className="font-medium">{label}</span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-lime-400" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="mx-3 mb-6 mt-6 rounded-2xl bg-ink-900 p-4 text-cream">
        <div className="text-xs uppercase tracking-widest text-lime-400">Momentum Score</div>
        <div className="mt-1 font-serif text-2xl">Today counts.</div>
        <p className="mt-1 text-xs text-ink-300">
          One honest check-in and the plan bends around you.
        </p>
      </div>
    </>
  );
}

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 flex-col border-r border-ink-900/10 bg-cream lg:flex">
        <NavContents />
      </aside>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink-900/40 lg:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-cream shadow-2xl lg:hidden"
              initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-1.5 text-ink-500 hover:bg-ink-900/5"
                aria-label="Close menu"
              ><X size={18} /></button>
              <NavContents onNavigate={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
