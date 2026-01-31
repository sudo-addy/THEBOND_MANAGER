'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Plus, FileText, Activity, Users, Search, Filter, Download } from 'lucide-react';


// Using inline components for speed/simplicity as this is a specific dashboard
// In production refactor to shared components

function GovtHeader() {
    return (
        <header className="h-16 border-b border-slate-800 bg-[#050b14]/90 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
                <span className="text-lg font-bold text-white tracking-tight">MUD₹A <span className="text-xs font-medium text-slate-400 ml-1 px-1.5 py-0.5 rounded-full border border-slate-700">GOVT</span></span>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-white">Ministry of Finance</p>
                    <p className="text-xs text-slate-400">Government of India</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <Building2 className="w-5 h-5 text-slate-300" />
                </div>
            </div>
        </header>
    );
}

export default function GovernmentDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Mock Bond Data
    const [bonds] = useState([
        { id: 'GOI-2034', name: '7.18% GS 2034', amount: '₹14,000 Cr', maturity: '14 Aug 2034', status: 'Active', subscribers: 12450 },
        { id: 'SGB-2026', name: 'Sovereign Gold Bond 2026-I', amount: '₹2,500 Cr', maturity: '21 May 2026', status: 'Closed', subscribers: 45200 },
        { id: 'GOI-2028', name: '7.10% GS 2028', amount: '₹8,000 Cr', maturity: '08 Apr 2028', status: 'Upcomming', subscribers: 0 },
        { id: 'G-SEC-2051', name: '6.67% GS 2051', amount: '₹20,000 Cr', maturity: '17 Dec 2051', status: 'Active', subscribers: 8900 },
    ]);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        // In a real app we'd check if user is actually government role
        // For demo simplicity we just check existence
        if (!userData) {
            router.push('/login');
        } else {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, [router]);

    if (loading) return <div className="min-h-screen bg-[#050b14] flex items-center justify-center text-blue-500">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-[#050b14] text-slate-200 font-sans selection:bg-blue-500/30">

            <GovtHeader />

            <main className="max-w-7xl mx-auto p-6 space-y-8">

                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Government Bond Dashboard</h1>
                        <p className="text-slate-400">Welcome, {user?.name || 'Administrator'}. Manage sovereign debt issuance, track subscriptions, and oversee market liquidity.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-bold transition shadow-lg shadow-blue-900/20 active:scale-95">
                        <Plus className="w-5 h-5" /> Issue New Bond
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Activity className="w-5 h-5" /></div>
                            <span className="text-xs text-green-400 font-medium flex items-center">+2.4%</span>
                        </div>
                        <p className="text-slate-400 text-sm font-medium">Total Active Debt</p>
                        <p className="text-2xl font-bold text-white mt-1">₹84.5 L Cr</p>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><Users className="w-5 h-5" /></div>
                            <span className="text-xs text-green-400 font-medium flex items-center">+12k today</span>
                        </div>
                        <p className="text-slate-400 text-sm font-medium">Retail Participants</p>
                        <p className="text-2xl font-bold text-white mt-1">4.2 Million</p>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><FileText className="w-5 h-5" /></div>
                            <span className="text-xs text-slate-500 font-medium">Active</span>
                        </div>
                        <p className="text-slate-400 text-sm font-medium">Open Issuances</p>
                        <p className="text-2xl font-bold text-white mt-1">12</p>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Download className="w-5 h-5" /></div>
                            <span className="text-xs text-slate-500 font-medium">Avg Yield</span>
                        </div>
                        <p className="text-slate-400 text-sm font-medium">10Y G-Sec Yield</p>
                        <p className="text-2xl font-bold text-white mt-1">7.18%</p>
                    </div>
                </div>

                {/* Bond Listings */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-500" />
                            Issued Bonds
                        </h2>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input type="text" placeholder="Search bonds..." className="bg-black/20 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 w-full sm:w-64" />
                            </div>
                            <button className="p-2 border border-slate-700 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition">
                                <Filter className="w-4 h-4" />
                            </button>
                            <button className="p-2 border border-slate-700 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition">
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="bg-black/20 text-xs uppercase font-semibold text-slate-300">
                                <tr>
                                    <th className="px-6 py-4">Bond ID</th>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Issue Size</th>
                                    <th className="px-6 py-4">Maturity Date</th>
                                    <th className="px-6 py-4">Subscribers</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {bonds.map((bond) => (
                                    <tr key={bond.id} className="hover:bg-white/5 transition">
                                        <td className="px-6 py-4 font-mono text-slate-400">{bond.id}</td>
                                        <td className="px-6 py-4 font-medium text-white">{bond.name}</td>
                                        <td className="px-6 py-4">{bond.amount}</td>
                                        <td className="px-6 py-4">{bond.maturity}</td>
                                        <td className="px-6 py-4">{bond.subscribers.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${bond.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                bond.status === 'Closed' ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' :
                                                    'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                }`}>
                                                {bond.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-blue-400 hover:text-blue-300 text-xs font-bold hover:underline">Manage</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-slate-800 text-center">
                        <button className="text-sm text-slate-500 hover:text-white transition">View all transactions</button>
                    </div>
                </div>

            </main>
        </div>
    );
}
