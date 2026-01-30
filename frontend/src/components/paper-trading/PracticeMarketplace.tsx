'use client';

import { Search, Filter, TrendingUp } from 'lucide-react';
import { useTradingStore } from '@/store/tradingStore';
import { useEffect, useState } from 'react';

export default function PracticeMarketplace() {
    const { availableBonds, fetchBonds, selectBond } = useTradingStore();
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchBonds();
    }, [fetchBonds]);

    const filteredBonds = availableBonds.filter(b =>
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.symbol.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="glass-panel p-4 rounded-2xl h-full flex flex-col bg-[#0F172A]">
            <div className="mb-4">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" /> Watchlist
                </h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search Symbol..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-2 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                    />
                    <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-2.5" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1 pr-1">
                {filteredBonds.map((bond, i) => (
                    <div
                        key={i}
                        onClick={() => selectBond(bond.id)}
                        className="p-2.5 hover:bg-white/5 border border-transparent hover:border-white/5 rounded-lg cursor-pointer group transition flex items-center justify-between"
                    >
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white group-hover:text-blue-400">{bond.symbol}</span>
                            <span className="text-[10px] text-slate-500 truncate max-w-[80px]">{bond.name}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-mono font-bold text-white">₹{bond.price.toFixed(1)}</span>
                            <span className={`text-[10px] font-bold ${bond.risk_category === 'low' ? 'text-green-400' : 'text-amber-400'}`}>
                                +0.45%
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-3 pt-3 border-t border-white/5 flex gap-2">
                <button className="flex-1 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-[10px] font-bold rounded">
                    + Add Symbol
                </button>
            </div>
        </div>
    );
}
