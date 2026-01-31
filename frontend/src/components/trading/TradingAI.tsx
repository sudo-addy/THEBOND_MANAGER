'use client';

import { Sparkles, BrainCircuit } from 'lucide-react';

export default function TradingAI() {
    return (
        <div className="glass-panel p-5 rounded-xl border border-amber-500/20 bg-gradient-to-br from-[#050b14] to-amber-900/10">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-amber-500" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Signal</h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">BOND-GPT-4</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
                <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                        <span className="text-xs font-black text-green-400">BUY</span>
                    </div>
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Confidence</span>
                        <span className="text-white font-mono">88%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-600 to-green-400 w-[88%]" />
                    </div>
                    <p className="text-[10px] text-slate-400 leading-snug">
                        Based on yield curve analysis and recent govt policy updates.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="p-2 bg-slate-900/50 rounded-lg text-center">
                    <p className="text-[10px] text-slate-500">Exp. Return</p>
                    <p className="text-sm font-bold text-green-400">+13.2%</p>
                </div>
                <div className="p-2 bg-slate-900/50 rounded-lg text-center">
                    <p className="text-[10px] text-slate-500">Risk Score</p>
                    <p className="text-sm font-bold text-blue-400">12/100</p>
                </div>
            </div>

            <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-slate-300 transition flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Explain Why?
            </button>
        </div>
    );
}
