'use client';

import { Sparkles } from 'lucide-react';

export default function AIRebalancingAdvisor() {
    return (
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-white">AI Advisor</h3>
            </div>

            <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="text-sm text-blue-200 font-medium mb-1">Portfolio Health: Excellent</p>
                    <p className="text-xs text-blue-200/70 leading-relaxed">
                        Your portfolio is well-balanced. However, you have ₹5L in cash. Consider deploying into high-yield corporate bonds.
                    </p>
                </div>

                <button className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-lg transition">
                    Generate Rebalancing Plan
                </button>
            </div>
        </div>
    );
}
