'use client';

import { useState } from 'react';
import { MoreHorizontal, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import RebalanceModal from './RebalanceModal';

export default function HoldingsTable() {
    const [isRebalanceOpen, setIsRebalanceOpen] = useState(false);

    const holdings = [
        { id: 1, name: 'NHAI Green Bond Series IV', qty: 50, avg: 1000, current: 1042, risk: 'Low', score: 92 },
        { id: 2, name: 'Mumbai Metro Infrastructure', qty: 200, avg: 500, current: 525, risk: 'Low', score: 88 },
        { id: 3, name: 'Adani Green Energy', qty: 150, avg: 750, current: 720, risk: 'Medium', score: 75 },
        { id: 4, name: 'L&T Finance Holdings', qty: 100, avg: 1200, current: 1280, risk: 'Medium', score: 82 },
    ];

    return (
        <div className="glass-panel rounded-2xl p-6 relative">
            <RebalanceModal isOpen={isRebalanceOpen} onClose={() => setIsRebalanceOpen(false)} />

            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Your Holdings</h3>
                <button
                    onClick={() => setIsRebalanceOpen(true)}
                    className="flex items-center gap-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg transition shadow-lg shadow-indigo-900/20"
                >
                    <RefreshCw className="w-3.5 h-3.5" /> Rebalance Portfolio
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase border-b border-slate-800">
                        <tr>
                            <th className="pb-3 pl-2">Bond Asset</th>
                            <th className="pb-3 text-right">Qty</th>
                            <th className="pb-3 text-right">Avg Price</th>
                            <th className="pb-3 text-right">Current Price</th>
                            <th className="pb-3 text-right">Gain/Loss</th>
                            <th className="pb-3 text-center">Risk Score</th>
                            <th className="pb-3 text-right pr-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {holdings.map((bond) => {
                            const gain = (bond.current - bond.avg) * bond.qty;
                            const percent = ((bond.current - bond.avg) / bond.avg) * 100;
                            const isPositive = gain >= 0;

                            return (
                                <tr key={bond.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="py-4 pl-2 font-medium text-white">
                                        <div className="flex flex-col">
                                            <span>{bond.name}</span>
                                            <span className="text-[10px] text-slate-500 uppercase tracking-widest">{bond.id === 1 ? 'GOVT' : 'CORP'}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-right font-mono text-slate-300">{bond.qty}</td>
                                    <td className="py-4 text-right font-mono text-slate-400">₹{bond.avg}</td>
                                    <td className="py-4 text-right font-mono text-white">₹{bond.current}</td>
                                    <td className="py-4 text-right">
                                        <div className={`flex items-center justify-end gap-1 font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                            <span>₹{Math.abs(gain).toLocaleString()}</span>
                                            <span className="opacity-70 text-xs">({Math.abs(percent).toFixed(2)}%)</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-center">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded border ${bond.score > 90 ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            bond.score > 80 ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                            }`}>
                                            {bond.score}/100
                                        </span>
                                    </td>
                                    <td className="py-4 text-right pr-2 relative group-hover:visible">
                                        <button className="p-1 hover:bg-white/10 rounded transition text-slate-500 hover:text-white group">
                                            <MoreHorizontal className="w-4 h-4" />
                                            {/* Simple Hover Dropdown for Demo */}
                                            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-20 overflow-hidden">
                                                <div className="p-1">
                                                    <div className="px-3 py-2 hover:bg-white/5 rounded-lg text-left cursor-pointer flex items-center gap-2">
                                                        <ArrowUpRight className="w-3 h-3" /> View Details
                                                    </div>
                                                    <div
                                                        onClick={() => setIsRebalanceOpen(true)}
                                                        className="px-3 py-2 hover:bg-indigo-500/10 hover:text-indigo-400 rounded-lg text-left cursor-pointer flex items-center gap-2"
                                                    >
                                                        <RefreshCw className="w-3 h-3" /> Rebalance
                                                    </div>
                                                    <div className="px-3 py-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg text-left cursor-pointer flex items-center gap-2">
                                                        <ArrowDownRight className="w-3 h-3" /> Sell Position
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
