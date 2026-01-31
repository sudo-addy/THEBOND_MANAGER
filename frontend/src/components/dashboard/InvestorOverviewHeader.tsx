'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Wallet, PieChart, Crown, Banknote } from 'lucide-react';
import { useState } from 'react';
import PaymentModal from '@/components/dashboard/PaymentModal';

interface InvestorHeaderProps {
    user: {
        name: string;
        subscription_tier: string;
        kyc_status: string;
    };
    portfolioValue: number;
    walletBalance: number;
    dailyPnL: number;
    couponDue?: number; // New optional prop for V3
}

export default function InvestorOverviewHeader({ user, portfolioValue, walletBalance, dailyPnL, couponDue = 12500 }: InvestorHeaderProps) {
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [displayBalance, setDisplayBalance] = useState(walletBalance);

    // Update local display on successful deposit
    const handleDepositSuccess = (newBalance: number) => {
        setDisplayBalance(newBalance);
        // Ideally we also refresh the global context or parent state
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Name & Tier */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="col-span-1"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-2">
                    Hello, {user.name.split(' ')[0]}
                    {user.subscription_tier === 'premium' && (
                        <div className="relative group">
                            <Crown className="w-6 h-6 text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                            <div className="absolute left-0 bottom-full mb-2 bg-slate-900 text-amber-400 text-xs px-2 py-1 rounded border border-amber-500/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
                                Premium Investor
                            </div>
                        </div>
                    )}
                </h1>
                <p className="text-slate-400 text-sm">
                    Here is your investment snapshot for today.
                    <span className="hidden lg:inline-block ml-1 text-green-400 font-bold">• Market is Open</span>
                </p>
            </motion.div>

            {/* Quick Stats Strip */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {/* Net Worth */}
                <div className="bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-xl p-3 flex flex-col justify-between hover:bg-slate-800/60 transition group">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition">
                            <PieChart className="w-4 h-4" />
                        </div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Net Worth</p>
                    </div>
                    <p className="text-lg font-bold text-white">₹{(portfolioValue / 100000).toFixed(2)}L</p>
                </div>

                {/* Day's P&L */}
                <div className="bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-xl p-3 flex flex-col justify-between hover:bg-slate-800/60 transition group">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 group-hover:scale-110 transition">
                            <TrendingUp className="w-4 h-4" />
                        </div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Day's P&L</p>
                    </div>
                    <p className={`text-lg font-bold ${dailyPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {dailyPnL >= 0 ? '+' : ''}{dailyPnL}%
                    </p>
                </div>

                {/* Coupon Income (New) */}
                <div className="bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-xl p-3 flex flex-col justify-between hover:bg-slate-800/60 transition group">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition">
                            <Banknote className="w-4 h-4" />
                        </div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Coupons</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-white">₹{couponDue.toLocaleString()}</p>
                        <p className="text-[10px] text-slate-500">Duethis month</p>
                    </div>
                </div>

                {/* Wallet Balance */}
                <div className="bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-xl p-3 flex flex-col justify-between relative group cursor-pointer hover:border-blue-500/30 transition" onClick={() => setIsPaymentOpen(true)}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition">
                                <Wallet className="w-4 h-4" />
                            </div>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Wallet</p>
                        </div>
                        <span className="text-[10px] bg-blue-600/20 text-blue-400 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition">+Add</span>
                    </div>
                    <p className="text-lg font-bold text-white">₹{displayBalance.toLocaleString()}</p>
                </div>
            </motion.div>

            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                onSuccess={handleDepositSuccess}
            />
        </div>
    );
}
