'use client';

import { useState, useMemo } from 'react';
import { usePaperTradeStore } from '@/store/paperTradeStore';
import { useTradingStore } from '@/store/tradingStore';
import { ArrowUpRight, ArrowDownRight, Download, TrendingUp, History, PieChart } from 'lucide-react';

export default function PaperPortfolio() {
    const [tab, setTab] = useState<'holdings' | 'history' | 'performance'>('holdings');
    const { holdings, trades, netWorthHistory } = usePaperTradeStore();
    const { availableBonds, currentPrice } = useTradingStore();

    // Calculate Holdings Data Live
    const holdingsList = useMemo(() => {
        return Object.entries(holdings).map(([symbol, qty]) => {
            // Find bond details (mock price lookup since we don't have a full live map yet)
            // In a real app, this would use a price map from the store
            const bond = availableBonds.find(b => b.symbol === symbol);
            // Use current simulated price if it matches, else random variance for demo
            const ltp = bond ? (currentPrice * (1 + (Math.random() * 0.01 - 0.005))) : 1000;
            const avg = 1000; // Mock avg for now as store doesn't track it per lot yet
            const value = qty * ltp;
            const pl = (ltp - avg) * qty;

            return { symbol, name: bond?.name || symbol, qty, avg, ltp, value, pl };
        });
    }, [holdings, availableBonds, currentPrice]);

    return (
        <div className="glass-panel p-6 rounded-2xl h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div className="flex bg-slate-900/50 p-1 rounded-lg border border-slate-800">
                    <button onClick={() => setTab('holdings')} className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-md transition ${tab === 'holdings' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-white'}`}>
                        <PieChart className="w-3 h-3" /> Holdings
                    </button>
                    <button onClick={() => setTab('history')} className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-md transition ${tab === 'history' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-white'}`}>
                        <History className="w-3 h-3" /> History
                    </button>
                    <button onClick={() => setTab('performance')} className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-md transition ${tab === 'performance' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-white'}`}>
                        <TrendingUp className="w-3 h-3" /> Graph
                    </button>
                </div>
                <button className="text-slate-500 hover:text-white p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                    <Download className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 overflow-hidden relative">

                {/* HOLDINGS TAB */}
                {tab === 'holdings' && (
                    <div className="h-full overflow-y-auto custom-scrollbar">
                        {holdingsList.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-500">
                                <PieChart className="w-12 h-12 mb-2 opacity-20" />
                                <p className="text-sm">No holdings yet</p>
                                <p className="text-xs">Start trading to build your portfolio</p>
                            </div>
                        ) : (
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase border-b border-slate-800 sticky top-0 bg-[#0a101f] z-10">
                                    <tr>
                                        <th className="pb-3 pl-2">Asset</th>
                                        <th className="pb-3 text-right">Qty</th>
                                        <th className="pb-3 text-right">Avg</th>
                                        <th className="pb-3 text-right">LTP</th>
                                        <th className="pb-3 text-right pr-2">P&L</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                    {holdingsList.map((h, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors group">
                                            <td className="py-3 pl-2 font-medium text-white">
                                                {h.symbol}
                                                <span className="block text-[10px] text-slate-500 font-normal">{h.name}</span>
                                            </td>
                                            <td className="py-3 text-right font-mono text-slate-300">{h.qty}</td>
                                            <td className="py-3 text-right font-mono text-slate-400">₹{h.avg.toLocaleString()}</td>
                                            <td className="py-3 text-right font-mono text-white">₹{h.ltp.toFixed(2)}</td>
                                            <td className={`py-3 text-right pr-2 font-bold font-mono ${h.pl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {h.pl >= 0 ? '+' : ''}₹{h.pl.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {/* HISTORY TAB */}
                {tab === 'history' && (
                    <div className="h-full overflow-y-auto custom-scrollbar">
                        {trades.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-500">
                                <History className="w-12 h-12 mb-2 opacity-20" />
                                <p className="text-sm">No trade history</p>
                            </div>
                        ) : (
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase border-b border-slate-800 sticky top-0 bg-[#0a101f] z-10">
                                    <tr>
                                        <th className="pb-3 pl-2">Time</th>
                                        <th className="pb-3">Type</th>
                                        <th className="pb-3">Symbol</th>
                                        <th className="pb-3 text-right">Qty</th>
                                        <th className="pb-3 text-right pr-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                    {trades.map((t: any) => (
                                        <tr key={t.id} className="hover:bg-white/5 transition-colors">
                                            <td className="py-3 pl-2 text-slate-500 text-xs">{new Date(t.timestamp).toLocaleTimeString()}</td>
                                            <td className={`py-3 text-xs font-bold uppercase ${t.type === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>{t.type}</td>
                                            <td className="py-3 font-medium text-white">{t.symbol}</td>
                                            <td className="py-3 text-right font-mono text-slate-300">{t.qty}</td>
                                            <td className="py-3 text-right pr-2 font-mono text-slate-400">₹{t.total.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {/* PERFORMANCE GRAPH TAB (Custom SVG implementation for zero-deps) */}
                {tab === 'performance' && (
                    <div className="h-full flex flex-col items-center justify-center relative">
                        {netWorthHistory.length < 2 ? (
                            <div className="text-center text-slate-500">
                                <TrendingUp className="w-12 h-12 mb-2 opacity-20 mx-auto" />
                                <p className="text-sm">Not enough data points</p>
                                <p className="text-xs">Graph will appear after trading activity spans multiple days (or simulated periods).</p>
                            </div>
                        ) : (
                            <div className="w-full h-full p-4">
                                <div className="text-xs text-slate-400 mb-2 flex justify-between">
                                    <span>Portfolio Growth (Simulated)</span>
                                    <span className="text-green-400 font-bold">+12.5%</span>
                                </div>
                                {/* Simple Area Chart Simulation */}
                                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible preserve-3d">
                                    <defs>
                                        <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    {/* Mock Path for Visuals */}
                                    <path d="M0,45 Q20,30 40,35 T80,15 T100,5 V50 H0 Z" fill="url(#areaGradient)" />
                                    <path d="M0,45 Q20,30 40,35 T80,15 T100,5" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />

                                    {/* Axis Lines */}
                                    <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeWidth="0.5" />
                                    <line x1="0" y1="0" x2="0" y2="50" stroke="#334155" strokeWidth="0.5" />
                                </svg>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
