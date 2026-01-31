'use client';

import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { api } from '@/services/api';

interface Holding {
    id: number;
    name: string;
    qty: number;
    avg: number;
    current: number;
    risk: string;
    coupon: string;
}

// Fallback mock data
const MOCK_HOLDINGS: Holding[] = [
    { id: 1, name: 'NHAI Green Bond IV', qty: 50, avg: 1000, current: 1042, risk: 'Low', coupon: '8.5%' },
    { id: 2, name: 'Mumbai Metro Infra', qty: 200, avg: 500, current: 525, risk: 'Low', coupon: '9.2%' },
    { id: 3, name: 'Adani Green Energy', qty: 150, avg: 750, current: 720, risk: 'Medium', coupon: '11.0%' },
    { id: 4, name: 'L&T Finance Holdings', qty: 100, avg: 1200, current: 1280, risk: 'Medium', coupon: '10.5%' },
];

export default function PortfolioHoldingsTable() {
    const [holdings, setHoldings] = useState<Holding[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await api.portfolio.get();
                if (response.success && response.portfolio?.holdings?.length > 0) {
                    // Map API response to our interface
                    const apiHoldings = response.portfolio.holdings.map((h: any, index: number) => ({
                        id: index + 1,
                        name: h.bond_id?.name || `Bond ${index + 1}`,
                        qty: h.quantity || 0,
                        avg: h.purchase_price || 1000,
                        current: h.current_price || h.purchase_price * 1.04,
                        risk: h.bond_id?.risk_category === 'low' ? 'Low' : h.bond_id?.risk_category === 'medium' ? 'Medium' : 'High',
                        coupon: `${h.bond_id?.coupon_rate || 8.5}%`
                    }));
                    setHoldings(apiHoldings);
                } else {
                    setHoldings(MOCK_HOLDINGS);
                }
            } catch (error) {
                console.log('Using mock holdings data');
                setHoldings(MOCK_HOLDINGS);
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, []);

    if (loading) {
        return (
            <div className="glass-panel p-6 rounded-2xl mb-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-slate-800 rounded w-1/4 mb-6"></div>
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-12 bg-slate-800 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-panel p-6 rounded-2xl mb-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Active Holdings</h3>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-700">Download Report</button>
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-500">Add Funds</button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase border-b border-slate-800">
                        <tr>
                            <th className="pb-3 pl-2">Bond Name</th>
                            <th className="pb-3 text-right">Qty</th>
                            <th className="pb-3 text-right">Avg Price</th>
                            <th className="pb-3 text-right">LTP</th>
                            <th className="pb-3 text-right">P&L</th>
                            <th className="pb-3 text-center">Coupon</th>
                            <th className="pb-3 text-center">Risk</th>
                            <th className="pb-3 text-right pr-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {holdings.map((bond) => {
                            const gain = (bond.current - bond.avg) * bond.qty;
                            const percent = ((bond.current - bond.avg) / bond.avg) * 100;

                            return (
                                <tr key={bond.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="py-4 pl-2 font-medium text-white">
                                        <div className="flex flex-col">
                                            <span>{bond.name}</span>
                                            <span className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                                Tokenized <ExternalLink className="w-2 h-2" />
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-right font-mono text-slate-300">{bond.qty}</td>
                                    <td className="py-4 text-right font-mono text-slate-400">₹{bond.avg}</td>
                                    <td className="py-4 text-right font-mono text-white">₹{bond.current}</td>
                                    <td className="py-4 text-right">
                                        <div className={`font-bold ${gain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {gain >= 0 ? '+' : ''}₹{gain.toLocaleString()}
                                        </div>
                                        <div className={`text-[10px] ${gain >= 0 ? 'text-green-500/70' : 'text-red-500/70'}`}>
                                            {percent.toFixed(2)}%
                                        </div>
                                    </td>
                                    <td className="py-4 text-center text-slate-300 font-mono text-xs">{bond.coupon}</td>
                                    <td className="py-4 text-center">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded border ${bond.risk === 'Low' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                            }`}>
                                            {bond.risk}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right pr-2">
                                        <div className="flex justify-end gap-2">
                                            <button className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded hover:bg-green-500/20 transition">Buy</button>
                                            <button className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded hover:bg-red-500/20 transition">Sell</button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
