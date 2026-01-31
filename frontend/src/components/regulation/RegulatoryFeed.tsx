'use client';

import { FileText, AlertTriangle, ExternalLink, Bot, Bookmark, Share2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegulatoryFeed() {
    const [summarizing, setSummarizing] = useState<number | null>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const updates = [
        { id: 1, title: 'SEBI New Guideline on Fractional Ownership', source: 'SEBI Circular', time: '2h ago', level: 'High', color: 'text-red-400', summary: "SEBI has mandated that all fractional ownership platforms (FOPs) must register as Small and Medium REITs (SM REITs). This ensures greater transparency, mandatory listing on stock exchanges, and a minimum investment size reduction to ₹10 Lakhs." },
        { id: 2, title: 'RBI CBDC Pilot Expansion for Retail', source: 'RBI Notification', time: '5h ago', level: 'Medium', color: 'text-amber-400', summary: "RBI is expanding the Digital Rupee (e₹-R) pilot to 5 more cities. Banks are instructed to enable interoperability with UPI QR codes, allowing users to pay merchants using CBDC wallets." },
        { id: 3, title: 'Infrastructure Debt Fund Rules Update', source: 'Ministry of Finance', time: '1d ago', level: 'Low', color: 'text-blue-400', summary: "MoF has relaxed ECB norms for Infrastructure Debt Funds (IDFs), allowing them to raise funds with a tenure of 5 years instead of 7. This is aimed at boosting liquidity in the infrastructure bond market." },
        { id: 4, title: 'Corporate Bond Repo Market Reforms', source: 'SEBI Circular', time: '2d ago', level: 'Medium', color: 'text-amber-400', summary: "SEBI introduces a limited purpose clearing corporation (LPCC) to guarantee settlement of repo trades in corporate bonds. This move will increase liquidity and confidence in the secondary bond market." },
    ];

    const handleSummarize = (id: number) => {
        if (expandedId === id) {
            setExpandedId(null);
            return;
        }
        setSummarizing(id);
        setTimeout(() => {
            setSummarizing(null);
            setExpandedId(id);
        }, 1200);
    };

    return (
        <div className="glass-panel p-6 rounded-2xl h-[450px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Live Regulatory Feed</h3>
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xs text-red-400 uppercase font-bold">Live Updates</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                {updates.map((item) => (
                    <div key={item.id} className={`group p-4 bg-slate-900/40 border border-white/5 rounded-xl transition-all ${expandedId === item.id ? 'bg-slate-800 border-blue-500/30 ring-1 ring-blue-500/20' : 'hover:bg-slate-800'}`}>
                        <div className="flex justify-between items-start mb-2">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-slate-300 border border-white/10 uppercase tracking-widest font-bold">{item.source}</span>
                            <span className={`text-xs font-bold ${item.color} flex items-center gap-1`}>
                                {item.level === 'High' && <AlertTriangle className="w-3 h-3" />}
                                {item.level} Impact
                            </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition">{item.title}</h4>

                        {/* Summary Section */}
                        <AnimatePresence>
                            {expandedId === item.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-2 mb-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 text-xs text-blue-100 leading-relaxed shadow-inner">
                                        <div className="flex items-center gap-2 mb-1 text-blue-400 font-bold text-[10px] uppercase">
                                            <Bot className="w-3 h-3" /> AI Summary
                                        </div>
                                        {item.summary}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-slate-500">{item.time}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleSummarize(item.id)}
                                    disabled={summarizing === item.id}
                                    className={`text-[10px] px-2 py-1 rounded flex items-center gap-1 transition ${expandedId === item.id ? 'bg-blue-600 text-white' : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'}`}
                                >
                                    {summarizing === item.id ? (
                                        <span className="animate-pulse">Generating...</span>
                                    ) : (
                                        <>
                                            <Bot className="w-3 h-3" /> {expandedId === item.id ? 'Hide Summary' : 'AI Summary'}
                                        </>
                                    )}
                                </button>
                                <button className="p-1 text-slate-500 hover:text-white transition" title="Save"><Bookmark className="w-3.5 h-3.5" /></button>
                                <button className="p-1 text-slate-500 hover:text-white transition" title="Read Full"><ExternalLink className="w-3.5 h-3.5" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
