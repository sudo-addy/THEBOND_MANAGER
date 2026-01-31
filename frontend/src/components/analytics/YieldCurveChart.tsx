'use client';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function YieldCurveChart() {
    const data = [
        { maturity: '1Y', yield: 6.8 },
        { maturity: '2Y', yield: 7.1 },
        { maturity: '3Y', yield: 7.3 },
        { maturity: '5Y', yield: 7.5 },
        { maturity: '7Y', yield: 7.6 },
        { maturity: '10Y', yield: 7.8 },
        { maturity: '15Y', yield: 7.9 },
        { maturity: '20Y', yield: 8.1 },
        { maturity: '30Y', yield: 8.2 },
    ];

    return (
        <div className="glass-panel p-6 rounded-2xl h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white">Govt Bond Yield Curve</h3>
                    <p className="text-xs text-slate-400">Term Structure of Interest Rates (India)</p>
                </div>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded border border-green-500/20">
                    Normal Curve (Healthy)
                </span>
            </div>

            <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis
                            dataKey="maturity"
                            stroke="#64748b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#64748b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => `${val}%`}
                            domain={['auto', 'auto']}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value: number) => [`${value}%`, 'Yield']}
                        />
                        <Line
                            type="monotone"
                            dataKey="yield"
                            stroke="#f59e0b"
                            strokeWidth={3}
                            dot={{ fill: '#f59e0b', strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
