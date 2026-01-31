'use client';

import { Search, Bell, Menu, User, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

export default function DashboardHeader() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="px-6 py-4 flex items-center justify-between sticky top-0 bg-[#050b14]/80 backdrop-blur-xl z-30 border-b border-white/5">
            {/* Search Bar */}
            <div className="flex items-center gap-4 flex-1">
                <button className="lg:hidden p-2 text-slate-400 hover:text-white">
                    <Menu className="w-6 h-6" />
                </button>
                <div className="relative w-full max-w-md hidden md:block group">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition" />
                    <input
                        type="text"
                        placeholder="Search bonds, issuers, or ISIN..."
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-all font-medium"
                    />
                    <div className="absolute right-3 top-2.5 flex gap-1">
                        <span className="text-[10px] bg-slate-800 text-slate-500 px-1.5 rounded border border-slate-700">CTRL</span>
                        <span className="text-[10px] bg-slate-800 text-slate-500 px-1.5 rounded border border-slate-700">K</span>
                    </div>
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#050b14]" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition hidden sm:block">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>

                <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block" />

                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 hover:bg-white/5 rounded-xl p-1.5 pr-3 transition border border-transparent hover:border-white/5"
                    >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                            AB
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-bold text-white leading-none">Abhi</p>
                            <p className="text-[10px] text-slate-400 font-medium">Retail Investor</p>
                        </div>
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-56 bg-[#0f172a] border border-slate-800 rounded-xl shadow-2xl overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                            <div className="px-4 py-3 border-b border-slate-800">
                                <p className="text-sm font-bold text-white">Abhi User</p>
                                <p className="text-xs text-slate-500 truncate">abhi@example.com</p>
                            </div>
                            <div className="p-1">
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg text-left">
                                    <User className="w-4 h-4" /> Profile
                                </button>
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg text-left">
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
