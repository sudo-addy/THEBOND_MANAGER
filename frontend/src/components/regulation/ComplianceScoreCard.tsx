'use client';

import { ShieldCheck, Lock, FileCheck, Server, CheckCircle, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ComplianceScoreCard() {
    const [showBreakdown, setShowBreakdown] = useState(false);
    const score = 92;
    const circumference = 2 * Math.PI * 40; // r=40
    const offset = circumference - (score / 100) * circumference;

    return (
        <>
            <div className="glass-panel p-6 rounded-2xl flex flex-col relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl opacity-50" />

                <div className="flex items-center justify-between mb-6 relative z-10">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <ShieldCheck className="w-6 h-6 text-green-400" /> Compliance Status
                        </h3>
                        <p className="text-xs text-slate-400">Institutional Grade • Real-time Monitoring</p>
                    </div>

                    {/* Animated Radial Progress */}
                    <div className="relative w-20 h-20 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="40" cy="40" r="36" className="stroke-slate-800" strokeWidth="8" fill="none" />
                            <circle
                                cx="40" cy="40" r="36"
                                className="stroke-green-500 transition-all duration-1000 ease-out"
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="absolute text-xl font-bold text-white">{score}%</span>
                    </div>
                </div>

                <div className="space-y-4 mb-6 relative z-10">
                    <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg border border-slate-700/50 group cursor-pointer hover:border-slate-500 transition">
                        <span className="text-sm text-slate-300 flex items-center gap-2"><FileCheck className="w-4 h-4 text-blue-400" /> SEBI Regulations</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">Active</span>
                            <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-white" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg border border-slate-700/50">
                        <span className="text-sm text-slate-300 flex items-center gap-2"><Server className="w-4 h-4 text-purple-400" /> RBI Digital Rupee</span>
                        <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">Enabled</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg border border-slate-700/50">
                        <span className="text-sm text-slate-300 flex items-center gap-2"><Lock className="w-4 h-4 text-amber-400" /> ISO 27001 Audit</span>
                        <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">Verified</span>
                    </div>
                </div>

                <button
                    onClick={() => setShowBreakdown(true)}
                    className="mt-auto w-full py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-xs font-bold border border-white/5 transition"
                >
                    View Detailed Breakdown
                </button>
            </div>

            {/* Breakdown Modal */}
            <AnimatePresence>
                {showBreakdown && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowBreakdown(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#0f172a] border border-white/10 w-full max-w-md rounded-2xl p-6 relative z-10 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white">Compliance Score Breakdown</h3>
                                <button onClick={() => setShowBreakdown(false)}><X className="w-5 h-5 text-slate-400" /></button>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { label: "Investor Protection Score", val: "High", color: "text-green-400" },
                                    { label: "AML Risk Score", val: "Low Risk", color: "text-green-400" },
                                    { label: "Smart Contract Audit", val: "Passed", color: "text-blue-400" },
                                    { label: "Tax Reporting Readiness", val: "Ready", color: "text-green-400" },
                                    { label: "Data Privacy (DPDP Act)", val: "Compliant", color: "text-purple-400" }
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                                        <span className="text-sm text-slate-300">{item.label}</span>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                                            <span className={`text-xs font-bold ${item.color}`}>{item.val}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
