'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import TradingHeader from '@/components/trading/TradingHeader';
import TradingChart from '@/components/trading/TradingChart';
import OrderBook from '@/components/trading/OrderBook';
import OrderEntryPanel from '@/components/trading/OrderEntryPanel';
import RecentTrades from '@/components/trading/RecentTrades';
import ActivePosition from '@/components/trading/ActivePosition';
import TradingAI from '@/components/trading/TradingAI';
import TokenizationTracker from '@/components/dashboard/TokenizationTracker';
import { ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useTradingStore } from '@/store/tradingStore';

export default function TradingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { simulateMarket } = useTradingStore();

    useEffect(() => {
        // Auth check
        const user = localStorage.getItem('user');
        if (!user) router.push('/login');
        setLoading(false);

        // Start Simulation
        const cleanup = simulateMarket();
        return () => {
            if (typeof cleanup === 'function') cleanup();
        }
    }, [router, simulateMarket]);

    if (loading) return null;

    return (
        <div className="min-h-screen bg-[#050b14] text-slate-200 font-sans selection:bg-amber-500/30">
            <Sidebar />

            <div className="lg:pl-64 flex flex-col min-h-screen relative z-10">

                <TradingHeader />

                <main className="p-4 space-y-4">

                    {/* TOP ROW: Full Width Chart */}
                    <div className="w-full h-[600px]">
                        <TradingChart />
                    </div>

                    {/* BOTTOM ROW: Trading Workspace */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

                        {/* COLUMN 1: Market Data */}
                        <div className="space-y-4">
                            <OrderBook />
                            <RecentTrades />
                        </div>

                        {/* COLUMN 2: Analysis & Position */}
                        <div className="space-y-4">
                            <ActivePosition />
                            <div className="glass-panel p-4 rounded-xl flex items-center justify-between border border-blue-500/20 bg-blue-500/5">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-8 h-8 text-blue-400" />
                                    <div>
                                        <p className="text-xs font-bold text-blue-300 uppercase">Settlement</p>
                                        <p className="text-sm text-white font-mono">T+0 (Instant)</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-400">Blockchain</p>
                                    <p className="text-xs font-bold text-green-400">Verified ✅</p>
                                </div>
                            </div>
                            <TradingAI />
                        </div>

                        {/* COLUMN 3: Execution */}
                        <div className="h-full">
                            <OrderEntryPanel />
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
