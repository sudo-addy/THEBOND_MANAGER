'use client';

import { useState } from 'react';
import { api } from '../../services/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, User, Building2, Briefcase, ChevronRight, Wallet } from 'lucide-react';
import WalletConnectModule from '@/components/auth/WalletConnectModule';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'retail' | 'institution' | 'admin'>('retail');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = (type: 'retail' | 'institution' | 'admin') => {
    setActiveTab(type);
    if (type === 'retail') {
      setEmail('basic@mudra.demo');
      setPassword('Basic@CIH2026');
    } else if (type === 'institution') {
      setEmail('premium@mudra.demo');
      setPassword('Premium@CIH2026');
    } else {
      setEmail('admin@mudra.demo');
      setPassword('Admin@CIH2026');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate login for demo if backend fails or for UX speed
      const response = await api.auth.login(email, password);

      localStorage.setItem('access_token', response.tokens.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err?.response?.data?.error || err.message || 'Login failed. Please check your credentials.';
      setError(errorMessage === 'Network Error' ? 'Checking server connection...' : errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4 relative overflow-hidden font-sans">

      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition">
            <img src="/logo.png" alt="MUD₹A Logo" className="w-10 h-10 rounded-xl shadow-lg" />
            <span className="text-2xl font-bold text-white tracking-tight">MUD₹A</span>
          </Link>
          <h2 className="text-lg text-blue-100">
            Welcome back, <span className="font-semibold text-white">Investor</span>
          </h2>
        </div>

        {/* Main Dark Glass Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          {/* Role Tabs */}
          <div className="flex bg-black/20 p-1 rounded-xl mb-8 relative z-10">
            {[
              { id: 'retail', icon: User, label: 'Retail' },
              { id: 'institution', icon: Building2, label: 'Institution' },
              { id: 'admin', icon: Briefcase, label: 'Admin' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleDemoLogin(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-blue-200 hover:text-white hover:bg-white/5'
                  }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-100 text-sm font-medium text-center relative z-10">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div>
              <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all font-medium"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs font-semibold text-blue-300 hover:text-white transition">Forgot?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all font-medium"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-900/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : 'Sign In Securely'} <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          <div className="my-6 flex items-center gap-4 relative z-10">
            <div className="h-px flex-1 bg-white/10"></div>
            <span className="text-xs text-blue-300 font-medium">OR</span>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>

          <WalletConnectModule />
        </div>

        {/* Footer & Trust */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-blue-200">
            Don't have an account? <Link href="/signup" className="text-white font-bold hover:underline">Get Started</Link>
          </p>

          <div className="flex justify-center items-center gap-4 opacity-70">
            <div className="flex items-center gap-1.5 grayscale hover:grayscale-0 transition">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span className="text-[10px] font-bold text-blue-200">SEBI Compliant</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-blue-400" />
            <div className="flex items-center gap-1.5 grayscale hover:grayscale-0 transition">
              <Lock className="w-3.5 h-3.5 text-blue-300" />
              <span className="text-[10px] font-bold text-blue-200">256-bit Encrypted</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
