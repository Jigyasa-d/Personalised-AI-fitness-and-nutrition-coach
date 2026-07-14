import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Apple, 
  LineChart, 
  ClipboardCheck, 
  User, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Workout', path: '/workout', icon: Dumbbell },
    { name: 'Nutrition', path: '/nutrition', icon: Apple },
    { name: 'Analytics', path: '/analytics', icon: LineChart },
    { name: 'Check-In', path: '/checkin', icon: ClipboardCheck },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 glass-panel border-r border-indigo-500/10 flex flex-col z-30">
      {/* Logo Section */}
      <div className="h-20 flex items-center px-6 border-b border-indigo-500/10 gap-3">
        <div className="bg-indigo-600/20 p-2 rounded-lg border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <Sparkles className="h-6 w-6 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-indigo-200 to-cyan-400 bg-clip-text text-transparent">
            Momentum <span className="text-cyan-400 font-medium text-xs tracking-widest block uppercase -mt-1">AI Coach</span>
          </h1>
        </div>
      </div>

      {/* Menu Links */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
              ${isActive 
                ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/10 border border-indigo-500/30 text-white shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                : 'text-slate-400 hover:bg-slate-800/40 hover:text-white border border-transparent'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 
                  ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-300'}`} 
                />
                <span className="font-medium text-sm">{item.name}</span>
                {isActive && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Profile/Logout Section */}
      <div className="p-4 border-t border-indigo-500/10 bg-slate-950/40">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 border border-transparent hover:border-rose-500/20 transition-all duration-300 cursor-pointer"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
