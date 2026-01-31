'use client';

import { Briefcase } from 'lucide-react';
import { useTradingStore } from '@/store/tradingStore';

export default function ActivePosition() {
    const { activePosition, currentPrice } = useTradingStore();

    // Calculate P&L
    const currentValue = activePosition.qty * currentPrice;
    const investedValue = activePosition.qty * activePosition.avgPrice;
    const pnl = currentValue - investedValue;
    const pnlPercent = investedValue > 0 ? (pnl / investedValue) * 100 : 0;

    return (
        <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                    <Briefcase className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Your Position</p>
                    <p className="text-lg font-bold text-white flex gap-2 items-baseline">
                        {activePosition.qty} Qty
                        <span className="text-xs font-normal text-slate-500">@ ₹{activePosition.avgPrice.toFixed(2)} avg</span>
                    </p>
                </div>
            </div>

            <div className="text-right">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Unrealized P&L</p>
                <p className={`text-lg font-bold ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {pnl >= 0 ? '+' : ''}₹{pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    <span className="text-xs opacity-70 ml-1">({pnlPercent >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%)</span>
                </p>
            </div>
        </div>
    );
}
