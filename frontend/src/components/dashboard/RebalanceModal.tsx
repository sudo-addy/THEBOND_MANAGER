'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { X, ArrowRight, CheckCircle2, Sliders, ShieldAlert, Sparkles, TrendingUp, RefreshCw, AlertTriangle } from 'lucide-react';

interface RebalanceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CURRENT_DATA = [
    { name: 'Govt Bonds', value: 30, color: '#3b82f6' },
    { name: 'Corporate', value: 20, color: '#f59e0b' },
    { name: 'Tax-Free', value: 45, color: '#10b981' },
    { name: 'Gold Bonds', value: 5, color: '#eab308' },
];

const TARGET_DATA = [
    { name: 'Govt Bonds', value: 40, color: '#3b82f6' }, // Increased Safety
    { name: 'Corporate', value: 30, color: '#f59e0b' }, // Increased Yield
    { name: 'Tax-Free', value: 25, color: '#10b981' }, // Reduced Concentration
    { name: 'Gold Bonds', value: 5, color: '#eab308' },
];

const STRATEGIES = [
    { id: 'conservative', name: 'Conservative Shield', risk: 'Low', return: '8.2%', desc: 'Maximizes AAA Govt Bonds. Prioritizes capital safety.' },
    { id: 'balanced', name: 'Balanced Growth', risk: 'Medium', return: '9.8%', desc: 'Optimized mix of Infra and Govt bonds. Best for long term.' },
    { id: 'aggressive', name: 'Yield Hunter', risk: 'High', return: '12.4%', desc: 'Focus on high-yield Corporate bonds. Higher volatility.' },
];

export default function RebalanceModal({ isOpen, onClose }: RebalanceModalProps) {
    const [step, setStep] = useState(1);
    const [strategy, setStrategy] = useState('balanced');
    const [processing, setProcessing] = useState(false);

    const handleExecute = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setStep(3); // Success
        }, 3000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#0f172a] border border-slate-700 w-full max-w-4xl rounded-2xl relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                <RefreshCw className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    Portfolio Rebalancer
                                    <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">AI Powered</span>
                                </h3>
                                <p className="text-sm text-slate-400">Optimize your allocation based on current market conditions</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">

                        {step === 1 && (
                            <div className="space-y-8">
                                {/* AI Insight Panel */}
                                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex gap-4">
                                    <div className="p-3 bg-amber-500/10 rounded-lg h-fit text-amber-500">
                                        <AlertTriangle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-amber-200 mb-1">Risk Alert: High Concentration Detected</h4>
                                        <p className="text-xs text-amber-100/70 leading-relaxed mb-3">
                                            Your portfolio has <strong>45% exposure to Tax-Free Bonds</strong> in a single sector (Railways).
                                            Our AI recommends diversifying into <strong>AAA Corporate Bonds</strong> to capture rising yields while maintaining safety.
                                        </p>
                                        <div className="flex gap-4 text-xs font-mono text-amber-300/80">
                                            <span>Current Risk Score: <span className="text-red-400 font-bold">72/100</span></span>
                                            <span>Target Risk Score: <span className="text-green-400 font-bold">45/100</span></span>
                                        </div>
                                    </div>
                                </div>

                                {/* Charts Comparison */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Current */}
                                    <div className="text-center">
                                        <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Current Allocation</h4>
                                        <div className="h-64 relative">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie data={CURRENT_DATA} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                                                        {CURRENT_DATA.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                                                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <span className="text-2xl font-bold text-slate-500">Current</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Target */}
                                    <div className="text-center relative">
                                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden md:block text-slate-600">
                                            <ArrowRight className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-sm font-bold text-indigo-400 mb-4 uppercase tracking-wider flex items-center justify-center gap-2">
                                            <Sparkles className="w-4 h-4" /> AI Recommendation
                                        </h4>
                                        <div className="h-64 relative">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie data={TARGET_DATA} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                                                        {TARGET_DATA.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                                                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <span className="text-2xl font-bold text-indigo-500">Target</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="max-w-2xl mx-auto space-y-6">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-white mb-2">Select Rebalance Strategy</h2>
                                    <p className="text-slate-400">Choose how aggressive you want the AI to be.</p>
                                </div>

                                <div className="space-y-3">
                                    {STRATEGIES.map((s) => (
                                        <div
                                            key={s.id}
                                            onClick={() => setStrategy(s.id)}
                                            className={`p-4 rounded-xl border cursor-pointer transition flex items-center gap-4 ${strategy === s.id ? 'bg-indigo-600/10 border-indigo-500 ring-1 ring-indigo-500/50' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}
                                        >
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${strategy === s.id ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                                {s.id === 'conservative' ? <ShieldAlert className="w-6 h-6" /> : s.id === 'balanced' ? <Sliders className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <h4 className={`font-bold ${strategy === s.id ? 'text-white' : 'text-slate-300'}`}>{s.name}</h4>
                                                    <span className="text-xs font-mono text-green-400 bg-green-900/20 px-2 py-0.5 rounded">Exp. Return: {s.return}</span>
                                                </div>
                                                <p className="text-xs text-slate-400">{s.desc}</p>
                                            </div>
                                            <div className="w-6 h-6 rounded-full border border-slate-600 flex items-center justify-center">
                                                {strategy === s.id && <div className="w-3 h-3 bg-indigo-500 rounded-full" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 flex flex-col gap-2 mt-6">
                                    <div className="flex justify-between">
                                        <span>Estimated Fees (0.1% Platform Fee)</span>
                                        <span className="text-white">₹145.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Estimated Settlement Time</span>
                                        <span className="text-white">T+0 (Instant)</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="flex flex-col items-center justify-center py-10 space-y-6 text-center animate-in fade-in zoom-in duration-500">
                                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-2">Rebalance Complete!</h2>
                                    <p className="text-slate-400">Your portfolio has been optimized successfully.</p>
                                </div>
                                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex gap-8">
                                    <div className="text-center">
                                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">New Risk Score</p>
                                        <p className="text-2xl font-bold text-green-400">45/100</p>
                                        <p className="text-[10px] text-slate-500">Was 72</p>
                                    </div>
                                    <div className="w-px bg-slate-800" />
                                    <div className="text-center">
                                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Exp. Yield</p>
                                        <p className="text-2xl font-bold text-indigo-400">9.8%</p>
                                        <p className="text-[10px] text-slate-500">+1.4% improvement</p>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Footer Actions */}
                    {step < 3 && (
                        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center">
                            {step === 1 ? (
                                <button onClick={onClose} className="text-sm text-slate-400 hover:text-white transition">Cancel</button>
                            ) : (
                                <button onClick={() => setStep(1)} className="text-sm text-slate-400 hover:text-white transition">Back</button>
                            )}

                            <button
                                onClick={() => step === 1 ? setStep(2) : handleExecute()}
                                disabled={processing}
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-900/20 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 animate-spin" /> Optimizing...
                                    </>
                                ) : step === 1 ? (
                                    <>Select Strategy <ArrowRight className="w-4 h-4" /></>
                                ) : (
                                    <>Execute Sim Rebalance</>
                                )}
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
