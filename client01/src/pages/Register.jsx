import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!fullName) {
      setError('Full name is required');
      return;
    }
    if (!email) {
      setError('Email address is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    try {
      await register(fullName, email, password);
      // New accounts require onboarding setup
      navigate('/onboarding');
    } catch (err) {
      setError(err.message || 'Registration failed. Try using another email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#020617] text-slate-100 relative overflow-hidden px-4">
      {/* Background neon glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-900/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-900/15 blur-[130px] pointer-events-none" />

      {/* Centered Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md glass-card p-8 rounded-3xl border border-indigo-500/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10"
      >
        {/* Logo and title */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-600/20 p-3 rounded-2xl border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)] mb-4">
            <Sparkles className="h-7 w-7 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">Create Account</h1>
          <p className="text-sm text-slate-400 mt-1">Begin your AI-powered conditioning journey</p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 p-3.5 rounded-xl text-rose-400 text-xs font-semibold mb-5"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <User className="h-4.5 w-4.5 text-slate-500" />
              </span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jordan Smith"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Email input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <Mail className="h-4.5 w-4.5 text-slate-500" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@domain.com"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <Lock className="h-4.5 w-4.5 text-slate-500" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <Lock className="h-4.5 w-4.5 text-slate-500" />
              </span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl border border-indigo-400/20 shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_30px_rgba(99,102,241,0.4)] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Register Account
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-6 text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;