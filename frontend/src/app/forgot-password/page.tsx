'use client';

import { useState, useRef } from 'react';
import { api } from '../../services/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, ChevronRight, ArrowLeft } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// --- 3D Background Component (Reused for consistency) ---
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
                color="#8b5cf6" // Purple tint for distinction from login/signup
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

export default function ForgotPasswordPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Email, 2: OTP, 3: New Password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [expectedOtp, setExpectedOtp] = useState(''); // Store the OTP received from API for verification
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // GSAP Animations
    useGSAP(() => {
        gsap.fromTo('.content-animate',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
        );
    }, { scope: containerRef, dependencies: [step] });

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');
        try {
            const response = await api.auth.forgotPassword(email); // Returns { demoOtp: '...' }
            setSuccessMsg(`OTP sent to ${email}`);

            if (response.demoOtp) {
                setExpectedOtp(response.demoOtp);
            }

            setStep(2);
        } catch (err: any) {
            setErrorMsg('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');
        try {
            // Pass the expectedOtp for client-side demo verification
            // In a real app, the backend would verify this against Redis/DB
            await api.auth.verifyOtp(email, otp, expectedOtp);
            setSuccessMsg('');
            setStep(3);
        } catch (err: any) {
            setErrorMsg(err.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        if (password !== confirmPassword) {
            setErrorMsg("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            await api.auth.resetPassword(email, otp, password);
            // Success State
            setSuccessMsg('Password reset successfully! Redirecting to login...');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (err: any) {
            setErrorMsg('Failed to reset password.');
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
                            {step === 1 ? "Forgot Password?" : step === 2 ? "Verify Identity" : "Secure Account"} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                {step === 1 ? "Recovery Made Simple" : step === 2 ? "Check Your Inbox" : "Set New Password"}
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-md">
                            {step === 1 ? "Enter your email to receive a secure verification code." :
                                step === 2 ? "We've sent a 6-digit code to your email address." :
                                    "Choose a strong password to protect your assets."}
                        </p>
                    </div>

                    <div className="text-xs text-slate-600">
                        © 2026 MUD₹A Platform. All rights reserved.
                    </div>
                </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
                <div className="w-full max-w-md">

                    <Link href="/login" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 font-medium mb-8 transition content-animate">
                        <ArrowLeft className="w-4 h-4" /> Back to Login
                    </Link>

                    <div className="text-center lg:text-left mb-8 content-animate">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            {step === 1 ? "Reset Password" : step === 2 ? "Enter OTP" : "New Password"}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            {step === 1 ? "Enter your email address to get started." :
                                step === 2 ? `Enter the code sent to ${email}` :
                                    "Create a new password for your account."}
                        </p>
                    </div>

                    {successMsg && (
                        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-600 dark:text-green-400 text-sm font-medium content-animate">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4" /> {successMsg}
                            </div>
                        </div>
                    )}

                    {errorMsg && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm font-medium content-animate">
                            {errorMsg}
                        </div>
                    )}

                    {/* Step 1: Email Input */}
                    {step === 1 && (
                        <form onSubmit={handleSendOtp} className="space-y-5 mb-8 content-animate">
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
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? 'Sending...' : 'Send OTP'} <ChevronRight className="w-4 h-4" />
                            </button>
                        </form>
                    )}

                    {/* Step 2: OTP Input */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyOtp} className="space-y-5 mb-8 content-animate">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">One-Time Password</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all tracking-widest text-center text-lg font-mono"
                                        placeholder="123456"
                                        maxLength={6}
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? 'Verifying...' : 'Verify OTP'} <ChevronRight className="w-4 h-4" />
                            </button>
                            <button type="button" onClick={() => setStep(1)} className="w-full text-slate-500 text-sm hover:text-slate-700 dark:hover:text-slate-300">
                                Change Email
                            </button>
                        </form>
                    )}

                    {/* Step 3: New Password */}
                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-5 mb-8 content-animate">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                                {loading ? 'Reseting...' : 'Reset Password'} <ShieldCheck className="w-4 h-4" />
                            </button>
                        </form>
                    )}

                    {/* Compliance Trust Strip */}
                    <div className="flex justify-center items-center gap-6 mt-12 opacity-70 content-animate">
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
