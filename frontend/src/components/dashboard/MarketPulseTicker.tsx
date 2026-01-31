'use client';

import { TrendingUp, TrendingDown, Globe } from 'lucide-react';
// import { motion } from 'framer-motion';

export default function MarketPulseTicker() {
    const items = [
        { label: 'G-Sec 10Y Yield', value: '7.12%', change: '+0.05%', up: true },
        { label: 'AAA Corp Bond Spread', value: '45 bps', change: '-2 bps', up: false },
        { label: 'USD/INR', value: '83.45', change: '+0.12', up: true },
        { label: 'Nifty 50', value: '22,450', change: '+1.2%', up: true },
        { label: 'Gold Bonds', value: '₹6,420', change: '-0.4%', up: false },
    ];

    return (
        <div className="w-full bg-[#020617] border-b border-white/5 h-8 flex items-center overflow-hidden relative z-40">
            <div className="flex items-center px-4 bg-[#0F172A] z-10 h-full border-r border-white/5 shrink-0">
                <span className="text-[10px] uppercase font-bold text-green-400 flex items-center gap-1">
                    <Globe className="w-3 h-3" /> Market Open
                </span>
            </div>

            {/* Marquee Animation */}
            <div className="flex items-center gap-8 animate-marquee whitespace-nowrap pl-4">
                {/* Duplicate items for infinite loop illusion */}
                {[...items, ...items, ...items].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="text-slate-400 font-medium">{item.label}</span>
                        <span className="text-white font-bold">{item.value}</span>
                        <span className={`flex items-center gap-0.5 ${item.up ? 'text-green-500' : 'text-red-500'}`}>
                            {item.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {item.change}
                        </span>
                        <span className="text-slate-700 mx-2">|</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
