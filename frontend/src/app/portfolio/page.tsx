'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Menu, Search } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import PortfolioKPIs from '@/components/portfolio/PortfolioKPIs';
import PortfolioCharts from '@/components/portfolio/PortfolioCharts';
import RiskAnalysis from '@/components/portfolio/RiskAnalysis';
import PortfolioHoldingsTable from '@/components/portfolio/PortfolioHoldingsTable';
import AIRebalancingAdvisor from '@/components/portfolio/AIRebalancingAdvisor';
import TokenizationTracker from '@/components/dashboard/TokenizationTracker'; // Reuse

export default function PortfolioPage() {
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
        <div className="min-h-screen bg-[#050b14] text-slate-200 font-sans selection:bg-amber-500/30">
            {/* Background Ambience */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[100px]" />
            </div>

            <Sidebar />

            <div className="lg:pl-64 flex flex-col min-h-screen relative z-10">

                {/* Header */}
                <header className="px-6 py-4 flex items-center justify-between sticky top-0 bg-[#050b14]/80 backdrop-blur-xl z-30 border-b border-white/5">
                    <div className="lg:hidden">
                        <Menu className="w-6 h-6 text-white" />
                    </div>

                    <div className="font-bold text-lg text-white">My Portfolio</div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Filter holdings..."
                                className="bg-slate-900/50 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-sm focus:border-blue-500 focus:outline-none w-64 text-white"
                            />
                            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2" />
                        </div>
                        <button className="p-2 text-slate-400 hover:text-white transition relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#050b14]" />
                        </button>
                    </div>
                </header>

                <main className="p-6">
                    <PortfolioKPIs />

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2">
                            <PortfolioCharts />
                            <PortfolioHoldingsTable />
                        </div>

                        <div className="space-y-6">
                            <RiskAnalysis />

                            {/* AI Advisor Widget */}
                            <AIRebalancingAdvisor />

                            <TokenizationTracker />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
