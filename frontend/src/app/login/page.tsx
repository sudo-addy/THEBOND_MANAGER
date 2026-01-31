'use client';

import { useState, useRef } from 'react';
import { api } from '../../services/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Lock, User, Building2, Briefcase, ShieldCheck } from 'lucide-react';
import WalletConnectModule from '@/components/auth/WalletConnectModule';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// --- 3D Background Component ---
function AnimatedSphere() {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere args={[1, 100, 200]} scale={2.5} ref={meshRef}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

function Scene() {
  return (
    <Canvas className="w-full h-full">
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <AnimatedSphere />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}

// --- Main Component ---
export default function LoginPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'retail' | 'institution' | 'admin'>('retail');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from('.login-content', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  const handleDemoLogin = (type: 'retail' | 'institution' | 'government' | 'premium') => {
    setActiveTab(type as any);
    if (type === 'retail') {
      setEmail('retail@mudra.com');
      setPassword('Retail@CIH2026');
    } else if (type === 'institution') {
      setEmail('institution@mudra.demo');
      setPassword('Inst@CIH2026');
    } else if (type === 'government') {
      setEmail('government@mudra.demo');
      setPassword('Gov@CIH2026');
    } else if (type === 'premium') {
      setEmail('premium@bondplatform.demo');
      setPassword('Premium@CIH2026');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate login for demo if backend fails or for UX speed
      const response = await api.auth.login({ email, password });

      if (response.tokens?.access_token) {
        const token = response.tokens.access_token;
        // Store token in localStorage for API requests
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(response.user));
        // Set cookie for middleware authentication (7 days expiry)
        document.cookie = `auth_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;

        if (email === 'government@mudra.demo') {
          router.push('/government-dashboard');
        } else {
          router.push('/dashboard');
        }
      } else {
        throw new Error('Login successful but no token received');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err?.response?.data?.error || err.message || 'Login failed. Please check your credentials.';
      setError(errorMessage === 'Network Error' ? 'Checking server connection...' : errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden" ref={containerRef}>

      {/* Left Column - Visuals & 3D */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 border-r border-slate-800 relative flex-col justify-between overflow-hidden p-12">
        {/* 3D Background Layer */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Scene />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
          <Link href="/" className="inline-flex items-center gap-2 text-white mb-12 pointer-events-auto hover:opacity-80 transition w-fit">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">M</div>
            <span className="text-xl font-bold">MUD₹A</span>
          </Link>

          <div className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Welcome back to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Smart Investing</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-md">
              Access your portfolio, track real-time bond performance, and manage your assets with institutional-grade security.
            </p>
          </div>

          <div className="text-xs text-slate-600">
            © 2026 MUD₹A Platform. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="w-full max-w-md login-content">

          <div className="text-center lg:text-left mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Sign In</h1>
            <p className="text-slate-600 dark:text-slate-400">
              New here? <Link href="/signup" className="text-blue-600 font-bold hover:underline">Create an account</Link>
            </p>
          </div>

          {/* Role Tabs */}
          <div className="bg-slate-100 dark:bg-slate-900 p-1 rounded-xl flex mb-8 overflow-x-auto">
            {[
              { id: 'retail', icon: User, label: 'Retail' },
              { id: 'institution', icon: Building2, label: 'Institution' },
              { id: 'government', icon: ShieldCheck, label: 'Govt' },
              { id: 'premium', icon: Briefcase, label: 'Premium' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleDemoLogin(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                <span className="">{tab.label}</span>
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 mb-8" ref={formRef}>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Forgot Password?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
            <span className="text-xs text-slate-400 font-medium">OR CONNECT WITH</span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
          </div>

          <WalletConnectModule />

          {/* Compliance Trust Strip */}
          <div className="flex justify-center items-center gap-6 mt-12 opacity-70">
            <div className="flex items-center gap-1.5 grayscale hover:grayscale-0 transition">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span className="text-[10px] font-bold text-slate-500">SEBI Compliant</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-1.5 grayscale hover:grayscale-0 transition">
              <Lock className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-[10px] font-bold text-slate-500">256-bit Encrypted</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

