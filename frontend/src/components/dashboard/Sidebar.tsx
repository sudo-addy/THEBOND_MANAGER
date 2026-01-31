'use client';

import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, ShoppingBag, PieChart,
    BarChart2, FileText, Settings, Shield,
    BookOpen, Crown, Sparkles
} from 'lucide-react';
import Link from 'next/link';
import AIChatModal from './AIChatModal';
import { useState } from 'react';

export default function Sidebar() {
    const pathname = usePathname();
    const [isChatOpen, setIsChatOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'Marketplace', icon: ShoppingBag, path: '/bonds' },
        { name: 'Portfolio', icon: PieChart, path: '/portfolio' },
        { name: 'Trading', icon: BarChart2, path: '/trading' },
        { name: 'Analytics', icon: FileText, path: '/analytics' },
        { name: 'Paper Trading', icon: BookOpen, path: '/paper-trade' },
        { name: 'Regulation Hub', icon: Shield, path: '/regulation-hub' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    return (
        <>
            <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

            <aside className="w-64 h-screen fixed left-0 top-0 bg-[#050b14]/95 backdrop-blur-xl border-r border-white/10 hidden lg:flex flex-col z-40">
                {/* Logo Area */}
                <div className="h-16 flex items-center px-6 border-b border-white/5">
                    <div className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
                        <img src="/logo.png" alt="MUD₹A Logo" className="w-8 h-8 rounded-lg" />
                        MUD₹A
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Premium Banner */}
                <div className="p-4">
                    <div className="bg-gradient-to-br from-amber-900/40 to-amber-600/10 border border-amber-500/20 rounded-2xl p-4 relative overflow-hidden group cursor-pointer hover:border-amber-500/40 transition-all">
                        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20">
                            <Crown className="w-12 h-12 text-amber-500" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Pro Plan</span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium leading-relaxed mb-3">
                            Unlock AI analytics & zero fees. Upgrade now.
                        </p>
                        <button className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow-lg">
                            Upgrade
                        </button>
                    </div>
                </div>

                {/* User Mini Profile with Help Button */}
                <div className="p-4 border-t border-white/5 space-y-4">
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-bold text-xs border border-slate-700 transition flex items-center justify-center gap-2"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Ask AI Help
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                            PI
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-white">Premium Investor</p>
                            <p className="text-xs text-slate-500">premium@mudra.demo</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
