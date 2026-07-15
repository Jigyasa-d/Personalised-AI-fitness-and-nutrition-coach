import { Menu, Bell, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Navbar({ onOpenMenu }) {
  const { user } = useAuth();
  const initial = (user?.fullName || user?.email || 'M').trim().charAt(0).toUpperCase();
  return (
    <header className="sticky top-0 z-30 border-b border-ink-900/5 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6 md:px-10">
        <button
          onClick={onOpenMenu}
          className="rounded-lg p-2 text-ink-700 hover:bg-ink-900/5 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div className="hidden items-center gap-2 rounded-full border border-ink-900/10 bg-cream px-3 py-1.5 text-xs text-ink-500 sm:flex">
          <Sparkles size={14} className="text-flame-500" />
          <span>Adaptive plans powered by your daily check-in</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button className="rounded-full p-2 text-ink-500 hover:bg-ink-900/5" aria-label="Notifications">
            <Bell size={18} />
          </button>
          <div className="flex items-center gap-2 rounded-full border border-ink-900/10 bg-cream py-1 pl-1 pr-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-sm font-semibold text-lime-400">
              {initial}
            </div>
            <div className="hidden text-left leading-tight sm:block">
              <div className="text-xs font-semibold text-ink-900">{user?.fullName || 'Athlete'}</div>
              <div className="text-[10px] uppercase tracking-wider text-ink-400">Momentum member</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
