import { useEffect, useState } from 'react';
import { LogOut, Mail, User as UserIcon } from 'lucide-react';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user: ctxUser, logout } = useAuth();
  const [user, setUser] = useState(ctxUser);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const [p, o] = await Promise.all([
          api.get('/auth/profile').catch(() => null),
          api.get('/onboarding').catch(() => null),
        ]);
        if (p?.data?.data) setUser(p.data.data);
        if (o?.data?.data) setProfile(o.data.data);
      } catch { /* noop */ }
    })();
  }, []);

  const onLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const initial = (user?.fullName || user?.email || 'M').trim().charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] uppercase tracking-widest text-ink-400">Profile</div>
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Your account.</h1>
      </div>

      <div className="rounded-3xl bg-ink-900 p-6 text-cream sm:p-8">
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-lime-400 font-serif text-4xl text-ink-900">
            {initial}
          </div>
          <div>
            <div className="font-serif text-3xl">{user?.fullName || 'Momentum member'}</div>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-ink-300">
              <Mail size={14} /> {user?.email || '—'}
            </div>
          </div>
          <button onClick={onLogout}
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-flame-500 px-4 py-2 text-sm font-semibold text-cream hover:bg-flame-400">
            <LogOut size={14} /> Log out
          </button>
        </div>
      </div>

      {profile && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Info label="Goal" value={pretty(profile.fitnessGoal)} />
          <Info label="Level" value={pretty(profile.fitnessLevel)} />
          <Info label="Activity" value={pretty(profile.activityLevel)} />
          <Info label="Diet" value={pretty(profile.dietPreference)} />
          <Info label="Height / Weight" value={`${profile.height ?? '—'} cm · ${profile.weight ?? '—'} kg`} />
          <Info label="Schedule" value={`${profile.workoutDays ?? '—'}× / week · ${profile.workoutDuration ?? '—'} min`} />
          <Info label="Equipment" value={(profile.equipment || []).map(pretty).join(', ') || '—'} />
          <Info label="Allergies" value={(profile.allergies || []).join(', ') || 'None'} />
          <Info label="Injuries" value={(profile.injuries || []).join(', ') || 'None'} />
        </div>
      )}
    </div>
  );
}

const pretty = (s) => s ? String(s).replaceAll('_',' ').replace(/\b\w/g, c => c.toUpperCase()) : '—';

function Info({ label, value }) {
  return (
    <div className="rounded-2xl border border-ink-900/10 bg-cream p-5">
      <div className="text-[11px] uppercase tracking-widest text-ink-400">{label}</div>
      <div className="mt-1 text-sm font-semibold text-ink-900">{value}</div>
    </div>
  );
}
