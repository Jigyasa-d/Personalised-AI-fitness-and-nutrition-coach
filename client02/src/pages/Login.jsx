import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email.includes('@')) return 'Please enter a valid email address.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const v = validate();
    if (v) { setError(v); return; }
    setLoading(true);
    try {
      await login(email, password);
      const dest = location.state?.from?.pathname || '/';
      navigate(dest, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-400 text-ink-900">
            <Zap size={18} strokeWidth={2.5} />
          </div>
          <div className="font-serif text-2xl">Momentum</div>
        </div>
        <h1 className="font-serif text-4xl leading-tight">Welcome back.</h1>
        <p className="mt-2 text-sm text-ink-500">Sign in to see today's Momentum Score and plan.</p>

        {error && (
          <div className="mt-6 flex items-start gap-2 rounded-xl border border-flame-500/30 bg-flame-500/10 px-3 py-2.5 text-sm text-flame-500">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-6 space-y-4">
          <Field label="Email">
            <input
              type="email" autoComplete="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-ink-900/10 bg-cream px-4 py-3 text-sm outline-none transition focus:border-ink-900"
              placeholder="you@momentum.app"
            />
          </Field>
          <Field label="Password">
            <input
              type="password" autoComplete="current-password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-ink-900/10 bg-cream px-4 py-3 text-sm outline-none transition focus:border-ink-900"
              placeholder="••••••••"
            />
          </Field>
        </div>

        <button
          type="submit" disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 px-4 py-3 text-sm font-semibold text-cream transition hover:bg-ink-800 disabled:opacity-60"
        >
          {loading ? 'Signing in…' : (<>Sign in <ArrowRight size={16} /></>)}
        </button>

        <p className="mt-6 text-center text-sm text-ink-500">
          New to Momentum? <Link to="/register" className="font-semibold text-ink-900 underline decoration-lime-500 decoration-2 underline-offset-4">Create an account</Link>
        </p>
      </motion.form>
    </AuthShell>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-ink-400">{label}</span>
      {children}
    </label>
  );
}

export function AuthShell({ children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center bg-paper px-6 py-12">
        {children}
      </div>
      <div className="relative hidden overflow-hidden bg-ink-900 lg:block grain">
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-lime-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-flame-500/20 blur-3xl" />
        <div className="relative flex h-full flex-col justify-between p-12 text-cream">
          <div className="text-[11px] uppercase tracking-[0.3em] text-ink-300">Personalised AI Fitness and Nutrition Coach</div>
          <div>
            <h2 className="font-serif text-6xl leading-[0.95]">
              A plan that <span className="italic text-lime-400">bends</span><br/> around your day.
            </h2>
            <p className="mt-5 max-w-md text-sm text-ink-300">
              Momentum computes a daily score from your sleep, energy, soreness, stress and motivation — then rewrites the workout and nutrition plan to match.
            </p>
            <div className="mt-8 flex gap-2">
              {['High','Moderate','Low','Very Low'].map((l, i) => (
                <div key={l} className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-widest ${i===0?'bg-lime-400 text-ink-900':'border border-white/15 text-ink-300'}`}>{l}</div>
              ))}
            </div>
          </div>
          <div className="text-xs text-ink-400">© Momentum</div>
        </div>
      </div>
    </div>
  );
}
