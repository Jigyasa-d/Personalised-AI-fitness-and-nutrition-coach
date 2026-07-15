import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { AuthShell } from './Login.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (fullName.trim().length < 2) return setError('Please enter your full name.');
    if (!email.includes('@')) return setError('Please enter a valid email.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    setLoading(true);
    try {
      await register(fullName.trim(), email, password);
      navigate('/onboarding', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not create your account.');
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
        <h1 className="font-serif text-4xl leading-tight">Start your Momentum.</h1>
        <p className="mt-2 text-sm text-ink-500">Two minutes to set up. Adaptive from day one.</p>

        {error && (
          <div className="mt-6 flex items-start gap-2 rounded-xl border border-flame-500/30 bg-flame-500/10 px-3 py-2.5 text-sm text-flame-500">
            <AlertCircle size={16} className="mt-0.5 shrink-0" /><span>{error}</span>
          </div>
        )}

        <div className="mt-6 space-y-4">
          <Field label="Full name">
            <input value={fullName} onChange={(e)=>setFullName(e.target.value)} className="w-full rounded-xl border border-ink-900/10 bg-cream px-4 py-3 text-sm outline-none focus:border-ink-900" placeholder="Alex Rivera" required />
          </Field>
          <Field label="Email">
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full rounded-xl border border-ink-900/10 bg-cream px-4 py-3 text-sm outline-none focus:border-ink-900" placeholder="you@momentum.app" required />
          </Field>
          <Field label="Password">
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full rounded-xl border border-ink-900/10 bg-cream px-4 py-3 text-sm outline-none focus:border-ink-900" placeholder="At least 6 characters" required />
          </Field>
        </div>

        <button type="submit" disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 px-4 py-3 text-sm font-semibold text-cream transition hover:bg-ink-800 disabled:opacity-60">
          {loading ? 'Creating…' : (<>Create account <ArrowRight size={16} /></>)}
        </button>

        <p className="mt-6 text-center text-sm text-ink-500">
          Already a member? <Link to="/login" className="font-semibold text-ink-900 underline decoration-lime-500 decoration-2 underline-offset-4">Sign in</Link>
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
