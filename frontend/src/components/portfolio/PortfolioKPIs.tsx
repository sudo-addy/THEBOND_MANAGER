'use client';

import { TrendingUp, Wallet, PieChart, ArrowUpRight } from 'lucide-react';

export default function PortfolioKPIs() {
    const metrics = [
        {
            label: 'Total Portfolio Value',
            value: '₹45,20,000',
            change: '+2.4%',
            isPositive: true,
            icon: Wallet,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10'
        },
        {
            label: 'Total Invested',
            value: '₹40,00,000',
            change: 'Deployed Capital',
            isPositive: true,
            icon: PieChart,
            color: 'text-purple-400',
            bg: 'bg-purple-500/10'
        },
        {
            label: 'Net Gains',
            value: '₹5,20,000',
            change: '+13.0%',
            isPositive: true,
            icon: TrendingUp,
            color: 'text-green-400',
            bg: 'bg-green-500/10'
        },
        {
            label: 'Annual Return (XIRR)',
            value: '14.2%',
            change: 'Beating Inflation',
            isPositive: true,
            icon: ArrowUpRight,
            color: 'text-amber-400',
            bg: 'bg-amber-500/10'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {metrics.map((m, i) => (
                <div key={i} className="glass-panel p-5 rounded-xl border border-white/5 relative overflow-hidden group">
                    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${m.color}`}>
                        <m.icon className="w-12 h-12" />
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${m.bg} ${m.color}`}>
                            <m.icon className="w-5 h-5" />
                        </div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{m.label}</p>
                    </div>

                    <div className="flex items-end gap-2">
                        <h3 className="text-2xl font-bold text-white tracking-tight">{m.value}</h3>
                        <span className={`text-xs font-bold mb-1 ${m.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            {m.change}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
