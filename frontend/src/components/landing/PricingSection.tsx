'use client';

import { Check, Zap, Crown, Shield } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function PricingSection() {
    const [isAnnual, setIsAnnual] = useState(false);

    const tiers = [
        {
            name: 'Basic Investor',
            price: 0,
            description: 'Perfect for getting started with bonds',
            icon: <Shield className="w-6 h-6" />,
            features: ['Access to Public Bonds', 'Basic Portfolio Tracking', 'Standard Support', 'Monthly Reports'],
            cta: 'Get Started',
            highlight: false
        },
        {
            name: 'Pro Trader',
            price: isAnnual ? 4990 : 499,
            description: 'Advanced tools for active investors',
            icon: <Zap className="w-6 h-6" />,
            features: ['Real-time Market Data', 'AI Risk Analysis', 'Priority IPO Access', 'Tax Optimization Reports', ' dedicated Advisor Chat'],
            cta: 'Upgrade to Pro',
            highlight: true,
            color: 'blue'
        },
        {
            name: 'Elite Wealth',
            price: isAnnual ? 9990 : 999,
            description: 'Full-suite wealth management',
            icon: <Crown className="w-6 h-6" />,
            features: ['Everything in Pro', 'Direct Access to Fund Managers', 'Private Placement Deals', 'Estate Planning Tools', 'Concierge Support'],
            cta: 'Become Elite',
            highlight: true,
            color: 'purple'
        }
    ];

    return (
        <section className="py-24 px-4 relative overflow-hidden">
            {/* Background Gradients for Glass Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 blur-3xl -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                        Plans for every stage of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Wealth Building</span>
                    </h2>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Monthly</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="relative w-16 h-8 rounded-full bg-slate-200 dark:bg-slate-700 p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <motion.div
                                className="w-6 h-6 rounded-full bg-white shadow-md"
                                animate={{ x: isAnnual ? 32 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                        <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                            Annual <span className="text-xs text-green-500 font-bold ml-1">(Save 17%)</span>
                        </span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative p-8 rounded-3xl border backdrop-blur-xl transition duration-500 hover:-translate-y-2
                ${tier.highlight
                                    ? 'bg-white/10 dark:bg-slate-900/40 border-slate-200/50 dark:border-white/10 shadow-2xl'
                                    : 'bg-white/5 dark:bg-slate-900/20 border-slate-200/50 dark:border-white/5'}`}
                        >
                            {tier.highlight && (
                                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${tier.color === 'purple' ? 'from-purple-500/10' : 'from-blue-500/10'} to-transparent -z-10`} />
                            )}

                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-xl ${tier.highlight ? (tier.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400') : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                                    {tier.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tier.name}</h3>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-end gap-1">
                                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                                        ₹{tier.price.toLocaleString()}
                                    </span>
                                    <span className="text-slate-500 dark:text-slate-400 mb-1">/{isAnnual ? 'year' : 'mo'}</span>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{tier.description}</p>
                            </div>

                            <button className={`w-full py-3 rounded-xl font-bold transition mb-8
                ${tier.highlight
                                    ? (tier.color === 'purple'
                                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/25'
                                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25')
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                                {tier.cta}
                            </button>

                            <ul className="space-y-4">
                                {tier.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                        <Check className={`w-5 h-5 shrink-0 ${tier.highlight ? 'text-blue-500' : 'text-slate-400'}`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
