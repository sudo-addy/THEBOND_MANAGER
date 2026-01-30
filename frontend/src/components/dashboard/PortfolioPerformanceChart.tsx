'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, PieChart, Calendar, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

interface PortfolioPerformanceProps {
    data: {
        total_invested: number;
        current_value: number;
        gain_percentage: number;
        daily_pnl?: number;
    } | null;
}

const mockChartData = [
    { name: 'Jan', value: 4000000, profit: 0 },
    { name: 'Feb', value: 4050000, profit: 50000 },
    { name: 'Mar', value: 4020000, profit: 20000 },
    { name: 'Apr', value: 4100000, profit: 100000 },
    { name: 'May', value: 4150000, profit: 150000 },
    { name: 'Jun', value: 4280000, profit: 280000 },
    { name: 'Jul', value: 4520000, profit: 520000 },
];

export default function PortfolioPerformanceChart({ data }: PortfolioPerformanceProps) {
    const [timeRange, setTimeRange] = useState('6M');

    if (!data) return null;

    const allocation = [
        { label: 'Govt Bonds', value: 45, color: 'bg-blue-500' },
        { label: 'Green Energy', value: 30, color: 'bg-green-500' },
        { label: 'Corp Debt', value: 25, color: 'bg-purple-500' },
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#0f172a] border border-slate-700 p-3 rounded-xl shadow-2xl">
                    <p className="text-slate-400 text-xs mb-1">{label} 2025</p>
                    <p className="text-white font-bold text-sm">₹{payload[0].value.toLocaleString()}</p>
                    <p className="text-green-400 text-xs font-mono">+{((payload[0].payload.profit / 4000000) * 100).toFixed(1)}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Performance Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="col-span-2 bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-2xl p-6 relative overflow-hidden flex flex-col"
            >
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-400" /> Performance Analysis
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <h2 className="text-3xl font-bold text-white tracking-tight">
                                ₹{data.current_value.toLocaleString()}
                            </h2>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${data.gain_percentage >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {data.gain_percentage >= 0 ? '+' : ''}{data.gain_percentage}%
                            </span>
                        </div>
                    </div>

                    {/* Time Range Selector */}
                    <div className="flex bg-slate-800/50 rounded-lg p-1 gap-1">
                        {['1M', '6M', '1Y', 'ALL'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-3 py-1 text-xs font-bold rounded-md transition ${timeRange === range
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Interactive Chart */}
                <div className="flex-1 min-h-[250px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockChartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748b', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                hide
                                domain={['dataMin - 100000', 'dataMax + 100000']}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }} />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                                animationDuration={1500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Asset Allocation Donut */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-2xl p-6 flex flex-col"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-purple-400" /> Allocation
                    </h3>
                    <button className="p-1 hover:bg-white/5 rounded transition text-slate-400 hover:text-white">
                        <Download className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex-1 flex items-center justify-center relative mb-4">
                    {/* Simulated Donut Visual */}
                    <div className="w-40 h-40 rounded-full border-[12px] border-slate-800 relative flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-[12px] border-blue-500 border-t-transparent border-r-transparent rotate-45" /> {/* 50% segment */}
                        <div className="absolute inset-0 rounded-full border-[12px] border-purple-500 border-l-transparent border-b-transparent rotate-[135deg]" /> {/* 25% segment */}
                        <div className="absolute inset-0 rounded-full border-[12px] border-green-500 border-l-transparent border-t-transparent -rotate-12" /> {/* 25% segment */}

                        <div className="text-center">
                            <span className="text-2xl font-bold text-white block">{data.gain_percentage}%</span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest">Growth</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {allocation.map((item) => (
                        <div key={item.label} className="flex items-center justify-between text-sm group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                                <span className="text-slate-300 group-hover:text-white">{item.label}</span>
                            </div>
                            <span className="text-white font-bold font-mono">{item.value}%</span>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-auto pt-4 border-t border-slate-800 text-blue-400 hover:text-blue-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition">
                    View Detailed Report <ArrowUpRight className="w-3 h-3" />
                </button>
            </motion.div>
        </div>
    );
}
