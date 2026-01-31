'use client';

import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, ShoppingBag, PieChart,
    BarChart2, FileText, Settings, Shield,
    BookOpen, Crown, Sparkles, ChevronDown, ChevronRight,
    Wallet, LogOut, HelpCircle, User
} from 'lucide-react';
import Link from 'next/link';
import AIChatModal from './AIChatModal';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavigationSidebarPro() {
    const pathname = usePathname();
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Categorized Navigation Items
    const navSections = [
        {
            title: 'Overview',
            items: [
                { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
                { name: 'Portfolio', icon: PieChart, path: '/portfolio' },
            ]
        },
        {
            title: 'Market & Trading',
            items: [
                { name: 'Marketplace', icon: ShoppingBag, path: '/bonds' },
                { name: 'Live Trading', icon: BarChart2, path: '/trading' },
                { name: 'Paper Trading', icon: BookOpen, path: '/paper-trade' },
            ]
        },
        {
            title: 'Analysis & Compliance',
            items: [
                { name: 'Analytics', icon: FileText, path: '/analytics' },
                { name: 'Regulation Hub', icon: Shield, path: '/regulation-hub' },
            ]
        }
    ];

    const [collapsedSections, setCollapsedSections] = useState<string[]>([]);

    const toggleSection = (title: string) => {
        setCollapsedSections(prev =>
            prev.includes(title)
                ? prev.filter(t => t !== title)
                : [...prev, title]
        );
    };

    return (
        <>
            <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

            <aside className="w-64 h-screen fixed left-0 top-0 bg-[#020617] border-r border-slate-800 hidden lg:flex flex-col z-40 shadow-2xl">
                {/* Logo Area */}
                <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-[#020617]/50 backdrop-blur-md">
                    <Link href="/dashboard" className="font-bold text-xl tracking-tight text-white flex items-center gap-2 hover:opacity-80 transition">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                            <span className="font-bold">B</span>
                        </div>
                        <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">BondPlatform</span>
                    </Link>
                </div>

                {/* Navigation Scroll Area */}
                <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-6 custom-scrollbar">

                    {navSections.map((section) => (
                        <div key={section.title}>
                            <button
                                onClick={() => toggleSection(section.title)}
                                className="flex items-center justify-between w-full px-3 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider hover:text-slate-300 transition group"
                            >
                                {section.title}
                                {collapsedSections.includes(section.title) ? (
                                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-slate-400" />
                                ) : (
                                    <ChevronDown className="w-3 h-3 text-slate-600 group-hover:text-slate-400" />
                                )}
                            </button>

                            <AnimatePresence>
                                {!collapsedSections.includes(section.title) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="space-y-1 overflow-hidden"
                                    >
                                        {section.items.map((item) => {
                                            const isActive = pathname === item.path;
                                            return (
                                                <Link
                                                    key={item.path}
                                                    href={item.path}
                                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative group overflow-hidden ${isActive
                                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                                        }`}
                                                >
                                                    {isActive && (
                                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-r shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                                                    )}
                                                    <item.icon className={`w-4 h-4 z-10 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                                                    <span className="z-10">{item.name}</span>
                                                </Link>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                    {/* Settings Section (Separate) */}
                    <div className="pt-2 border-t border-slate-800/50">
                        <Link
                            href="/settings"
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${pathname === '/settings'
                                ? 'bg-slate-800 text-white'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Settings className="w-4 h-4" />
                            Settings
                        </Link>
                    </div>
                </nav>

                {/* Footer / Account Area */}
                <div className="p-4 bg-[#0F172A]/50 border-t border-slate-800">
                    {/* Premium Card */}
                    <div className="mb-4 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-xl p-3 relative group">
                        <div className="flex items-center gap-2 mb-1">
                            <Crown className="w-4 h-4 text-amber-500" />
                            <span className="text-xs font-bold text-amber-500">Pro Account</span>
                        </div>
                        <p className="text-[10px] text-amber-200/60 leading-tight">AI Analytics Active</p>
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse" />
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                                <User className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white leading-none mb-1">Demo User</span>
                                <span className="text-[10px] text-slate-500 font-mono">ID: 8X...92</span>
                            </div>
                        </div>
                        <button className="text-slate-500 hover:text-red-400 transition" title="Logout">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Quick Access Buttons */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        <button className="flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-lg shadow-blue-900/20">
                            <Wallet className="w-3 h-3" /> Deposit
                        </button>
                        <button
                            onClick={() => setIsChatOpen(true)}
                            className="flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition border border-slate-700"
                        >
                            <HelpCircle className="w-3 h-3" /> Help
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
