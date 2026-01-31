'use client';

import { ChevronDown, Search, Star, FileText, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useTradingStore } from '@/store/tradingStore';

export default function TradingHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const { selectedBond, availableBonds, selectBond, currentPrice } = useTradingStore();

    const handleSelect = (id: string) => {
        selectBond(id);
        setIsOpen(false);
    };

    return (
        <div className="bg-[#050b14]/90 backdrop-blur-xl border-b border-white/10 p-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-40">

            {/* Guard Clause for loading state */}
            {!selectedBond ? (
                <div className="w-full h-10 animate-pulse bg-slate-800/50 rounded-xl" />
            ) : (
                <>

                    {/* 1. Bond Selector */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative group">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center gap-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 min-w-[280px] transition-all"
                            >

                                <div className="text-left flex-1">
                                    <p className="text-sm font-bold text-white leading-tight">{selectedBond.name}</p>
                                    <p className="text-[10px] text-slate-400 font-mono">ISIN: {selectedBond.isin}</p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-slate-500" />
                            </button>

                            {/* Dropdown */}
                            {isOpen && (
                                <div className="absolute top-full left-0 mt-2 w-80 bg-[#1e293b] border border-slate-700 rounded-xl shadow-2xl z-50 p-2">
                                    <div className="relative mb-2">
                                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                                        <input type="text" placeholder="Search Bond / ISIN..." className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                                    </div>
                                    <div className="space-y-1 max-h-60 overflow-y-auto custom-scrollbar">
                                        {availableBonds.map((bond) => (
                                            <div
                                                key={bond.id}
                                                onClick={() => handleSelect(bond.id)}
                                                className={`p-2 hover:bg-white/5 rounded-lg cursor-pointer flex justify-between items-center ${selectedBond.id === bond.id ? 'bg-white/10' : ''}`}
                                            >
                                                <div>
                                                    <p className="text-sm text-white font-medium">{bond.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-mono">{bond.symbol}</p>
                                                </div>
                                                <span className="text-xs text-green-400 font-mono">{bond.yield}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Live Price Info */}
                        <div className="flex items-center gap-6 border-l border-white/10 pl-6">
                            <div>
                                <p className="text-2xl font-bold text-white flex items-center gap-2">
                                    ₹{currentPrice.toFixed(2)}
                                    <span className="text-sm font-medium text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                                        +2.4%
                                    </span>
                                </p>
                                <p className="text-xs text-slate-500 flex items-center gap-2">
                                    Yield: <span className="text-slate-300 font-bold">{selectedBond.yield}%</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                                    Vol: <span className="text-slate-300">{selectedBond.vol}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 2. Market Status & Quick Actions */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 rounded-lg border border-slate-800">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-green-400 font-bold uppercase tracking-wider">Market Open</span>
                        </div>

                        <div className="h-8 w-px bg-white/10 mx-2" />

                        <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-amber-400 rounded-lg transition" title="Add to Watchlist">
                            <Star className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-blue-400 rounded-lg transition" title="Factsheet">
                            <FileText className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-blue-400 rounded-lg transition" title="Smart Contract">
                            <ExternalLink className="w-5 h-5" />
                        </button>
                    </div>

                </>
            )}
        </div>
    );
}
