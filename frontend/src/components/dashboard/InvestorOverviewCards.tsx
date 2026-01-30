'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Wallet, PieChart, Banknote, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import PaymentModal from '@/components/dashboard/PaymentModal';

interface InvestorCardsProps {
    portfolioValue: number;
    walletBalance: number;
    dailyPnL: number;
    couponDue?: number;
}

export default function InvestorOverviewCards({ portfolioValue, walletBalance, dailyPnL, couponDue = 12500 }: InvestorCardsProps) {
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    const stats = [
        {
            title: 'Net Worth',
            value: `₹${(portfolioValue / 100000).toFixed(2)}L`,
            trend: '+5.2%',
            trendUp: true,
            icon: PieChart,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'hover:border-blue-500/30'
        },
        {
            title: 'Day\'s P&L',
            value: `${dailyPnL >= 0 ? '+' : ''}${dailyPnL}%`,
            subValue: '₹12,400',
            trend: 'Today',
            trendUp: dailyPnL >= 0,
            icon: TrendingUp,
            color: dailyPnL >= 0 ? 'text-green-400' : 'text-red-400',
            bg: dailyPnL >= 0 ? 'bg-green-500/10' : 'bg-red-500/10',
            border: 'hover:border-green-500/30'
        },
        {
            title: 'Wallet Balance',
            value: `₹${walletBalance.toLocaleString()}`,
            action: 'Deposit',
            onAction: () => setIsPaymentOpen(true),
            icon: Wallet,
            color: 'text-indigo-400',
            bg: 'bg-indigo-500/10',
            border: 'hover:border-indigo-500/30'
        },
        {
            title: 'Coupon Due',
            value: `₹${couponDue.toLocaleString()}`,
            subValue: 'Next: Jan 28',
            icon: Banknote,
            color: 'text-amber-400',
            bg: 'bg-amber-500/10',
            border: 'hover:border-amber-500/30'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
                <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-2xl p-4 relative group transition-all duration-300 ${stat.border}`}
                >
                    <div className="flex justify-between items-start mb-3">
                        <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        {stat.action && (
                            <button
                                onClick={stat.onAction}
                                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1 shadow-lg shadow-indigo-500/20"
                            >
                                {stat.action} <ArrowUpRight className="w-3 h-3" />
                            </button>
                        )}
                        {!stat.action && (
                            <div className={`flex items-center gap-1 text-xs font-bold ${stat.trendUp ? 'text-green-400' : 'text-slate-500'} bg-white/5 px-2 py-1 rounded-lg`}>
                                {stat.trend || 'N/A'}
                            </div>
                        )}
                    </div>

                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.title}</p>
                        <h4 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h4>
                        {stat.subValue && (
                            <p className="text-slate-400 text-xs font-mono mt-1">{stat.subValue}</p>
                        )}
                    </div>

                    {/* Hover Glow Effect */}
                    <div className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl -z-10 ${stat.bg}`} />
                </motion.div>
            ))}

            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                onSuccess={() => { }} // In a real app, update global state
            />
        </div>
    );
}
