'use client';

// import { useState, useEffect } from 'react';

export default function OrderBook() {
    // Mock Data
    const bids = [
        { price: 1042.45, qty: 500, total: 500 },
        { price: 1042.40, qty: 1200, total: 1700 },
        { price: 1042.30, qty: 850, total: 2550 },
        { price: 1042.15, qty: 2000, total: 4550 },
        { price: 1042.00, qty: 5000, total: 9550 },
    ];

    const asks = [
        { price: 1042.50, qty: 400, total: 400 },
        { price: 1042.55, qty: 900, total: 1300 },
        { price: 1042.60, qty: 1500, total: 2800 },
        { price: 1042.75, qty: 300, total: 3100 },
        { price: 1042.90, qty: 1200, total: 4300 },
    ];

    return (
        <div className="glass-panel rounded-xl h-[450px] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-3 border-b border-white/5 flex justify-between items-center bg-[#050b14]">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Order Book</h3>
                <span className="text-[10px] text-slate-500">Spread: <span className="text-white">0.05</span></span>
            </div>

            {/* Asks (Sell Orders) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col-reverse">
                {asks.map((ask, i) => (
                    <div key={i} className="grid grid-cols-3 text-xs py-1 px-3 hover:bg-white/5 relative group cursor-pointer">
                        {/* Depth Bar */}
                        <div className="absolute top-0 right-0 h-full bg-red-500/10 z-0" style={{ width: `${(ask.qty / 2000) * 100}%` }} />

                        <span className="text-red-400 font-mono font-medium z-10 relative">₹{ask.price.toFixed(2)}</span>
                        <span className="text-right text-slate-300 font-mono z-10 relative">{ask.qty}</span>
                        <span className="text-right text-slate-500 font-mono z-10 relative">{ask.total}</span>
                    </div>
                ))}
            </div>

            {/* Current Price Banner */}
            <div className="py-2 border-y border-white/5 bg-slate-900/50 flex justify-center items-center gap-2">
                <span className="text-lg font-bold text-white">₹1,042.50</span>
                <span className="text-xs text-green-400">↑ 1042.45</span>
            </div>

            {/* Bids (Buy Orders) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {bids.map((bid, i) => (
                    <div key={i} className="grid grid-cols-3 text-xs py-1 px-3 hover:bg-white/5 relative group cursor-pointer">
                        {/* Depth Bar */}
                        <div className="absolute top-0 right-0 h-full bg-green-500/10 z-0" style={{ width: `${(bid.qty / 5000) * 100}%` }} />

                        <span className="text-green-400 font-mono font-medium z-10 relative">₹{bid.price.toFixed(2)}</span>
                        <span className="text-right text-slate-300 font-mono z-10 relative">{bid.qty}</span>
                        <span className="text-right text-slate-500 font-mono z-10 relative">{bid.total}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
