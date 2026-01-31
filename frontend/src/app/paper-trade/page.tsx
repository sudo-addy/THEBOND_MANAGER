'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import PaperWalletOverview from '@/components/paper-trading/PaperWalletOverview';
import PracticeMarketplace from '@/components/paper-trading/PracticeMarketplace';
import PaperTradeTerminal from '@/components/paper-trading/PaperTradeTerminal';
import AITradingCoach from '@/components/paper-trading/AITradingCoach';
import PaperPortfolio from '@/components/paper-trading/PaperPortfolio';
import GamificationPanel from '@/components/paper-trading/GamificationPanel';
import TradingViewBondChart from '@/components/paper-trading/TradingViewBondChart';
import { Menu, Zap, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaperTradingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Auth check
        const user = localStorage.getItem('user');
        if (!user) router.push('/login');
        setLoading(false);
    }, [router]);

    if (loading) return null;

    return (
        <div className="min-h-screen bg-[#050b14] text-slate-200 font-sans selection:bg-indigo-500/30">
            <Sidebar />

            <div className="lg:pl-64 flex flex-col min-h-screen relative z-10">

                {/* Header */}
                <header className="px-6 py-4 flex items-center justify-between sticky top-0 bg-[#050b14]/80 backdrop-blur-xl z-30 border-b border-white/5">
                    <div className="lg:hidden">
                        <Menu className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex flex-col">
                        <div className="font-bold text-lg text-white flex items-center gap-2">
                            Paper Trading Arena <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded uppercase font-bold tracking-wider">Simulated</span>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-amber-500" /> Learning Mode Active • SEBI Compliant Simulation
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="hidden md:flex px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white text-xs font-bold rounded-lg shadow-lg items-center gap-2 transition transform hover:scale-105">
                            <Zap className="w-3 h-3 fill-current" /> Switch to Live
                        </button>
                    </div>
                </header>

                <main className="p-4 lg:p-6 space-y-4 h-[calc(100vh-80px)] overflow-hidden flex flex-col">
                    {/* Top Stats Strip (Risk Meter & Balance) */}
                    <div className="shrink-0">
                        <PaperWalletOverview />
                    </div>

                    <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
                        {/* LEFT COLUMN: Market Watch (2/12) */}
                        <div className="col-span-2 flex flex-col gap-4 overflow-hidden">
                            <PracticeMarketplace />
                        </div>

                        {/* CENTER COLUMN: Chart & Depth (7/12) */}
                        <div className="col-span-7 flex flex-col gap-4 overflow-hidden">
                            {/* TradingView Chart */}
                            <div className="flex-1 h-[400px]">
                                <TradingViewBondChart />
                            </div>
                            {/* Depth / Order Book */}
                            <div className="h-[200px] bg-slate-900/50 border border-white/5 rounded-2xl relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-bold">
                                    Market Depth
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Action & Coaching (3/12) */}
                        <div className="col-span-3 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
                            <PaperTradeTerminal />
                            <AITradingCoach />
                            <GamificationPanel />
                        </div>
                    </div>

                    {/* BOTTOM: Portfolio (Collapsible or Fixed) */}
                    <div className="shrink-0 h-[200px]">
                        <PaperPortfolio />
                    </div>
                </main>
            </div>
        </div>
    );
}
