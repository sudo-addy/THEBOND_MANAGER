'use client';

import { usePaperTradeStore } from '@/store/paperTradeStore';
import { Wallet, TrendingUp, PieChart } from 'lucide-react';

export default function PaperWalletOverview() {
    const { currentBalance, portfolioValue } = usePaperTradeStore();
    const totalNetWorth = currentBalance + portfolioValue;
    const pnl = totalNetWorth - 10000000; // Assuming 1Cr start
    const pnlPercent = (pnl / 10000000) * 100;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* Net Worth Card */}
            <div className="glass-panel p-4 rounded-xl relative overflow-hidden group">
                <div className="absolute right-[-10px] top-[-10px] w-20 h-20 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition" />
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <PieChart className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Net Worth</p>
                </div>
                <h2 className="text-2xl font-bold text-white font-mono">₹{totalNetWorth.toLocaleString()}</h2>
                <p className="text-[10px] text-slate-500 mt-1">Virtual Equity + Cash</p>
            </div>

            {/* P&L Card */}
            <div className="glass-panel p-4 rounded-xl relative overflow-hidden group">
                <div className="absolute right-[-10px] top-[-10px] w-20 h-20 bg-green-500/10 rounded-full blur-xl group-hover:bg-green-500/20 transition" />
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                        <TrendingUp className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Profit/Loss</p>
                </div>
                <h2 className={`text-2xl font-bold font-mono ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {pnl >= 0 ? '+' : ''}{pnl.toLocaleString()}
                </h2>
                <p className={`text-[10px] font-bold mt-1 ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {pnlPercent.toFixed(2)}% All Time
                </p>
            </div>

            {/* Cash Balance */}
            <div className="glass-panel p-4 rounded-xl relative overflow-hidden group">
                <div className="absolute right-[-10px] top-[-10px] w-20 h-20 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition" />
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <Wallet className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Available Cash</p>
                </div>
                <h2 className="text-2xl font-bold text-white font-mono">₹{currentBalance.toLocaleString()}</h2>
                <p className="text-[10px] text-slate-500 mt-1">Buying Power (10x Lev)</p>
            </div>

            {/* Risk Meter & Diversification */}
            <div className="glass-panel p-4 rounded-xl border-l-2 border-amber-500">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Risk Meter</p>
                    <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">MODERATE</span>
                </div>

                {/* Simulated Meter */}
                <div className="w-full h-2 bg-slate-800 rounded-full mb-3 overflow-hidden">
                    <div className="w-[45%] h-full bg-gradient-to-r from-green-500 via-amber-500 to-red-500 rounded-full" />
                </div>

                <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Safety Score</span>
                    <span className="text-white font-bold">72/100</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Diversification</span>
                    <span className="text-white font-bold">Good</span>
                </div>
            </div>

        </div>
    );
}
