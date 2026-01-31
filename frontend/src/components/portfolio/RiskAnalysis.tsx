'use client';

import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function RiskAnalysis() {
    return (
        <div className="glass-panel p-6 rounded-2xl mb-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Risk Analysis</h3>
                <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">
                    Healthy
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Risk Breakdown */}
                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Exposure Breakdown</h4>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-green-400">Low Risk (Govt)</span>
                                <span className="text-white">65%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[65%]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-amber-400">Medium Risk</span>
                                <span className="text-white">25%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 w-[25%]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-red-400">High Risk</span>
                                <span className="text-white">10%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 w-[10%]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Diversification Score */}
                <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center text-center">
                    <ShieldCheck className="w-8 h-8 text-blue-400 mb-2" />
                    <p className="text-3xl font-bold text-white mb-1">84<span className="text-sm text-slate-500">/100</span></p>
                    <p className="text-xs text-slate-400">Diversification Score</p>
                    <p className="text-[10px] text-green-400 mt-2">Top 15% of investors</p>
                </div>

                {/* Alerts */}
                <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Risk Alerts</h4>
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex gap-3 items-start">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs text-amber-200 font-bold">Sector Concentration</p>
                            <p className="text-[10px] text-amber-100/70 leading-snug">
                                You have 45% exposure to Energy sector. Consider diversifying into Transport.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
