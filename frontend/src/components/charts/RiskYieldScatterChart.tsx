'use client';

import React from 'react';
import {
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
    Label
} from 'recharts';

interface DataPoint {
    x: number;
    y: number;
    z: number;
    name: string;
    fill: string;
}

interface RiskYieldScatterChartProps {
    data?: DataPoint[];
}

const defaultData: DataPoint[] = [
    { x: 10, y: 8, z: 200, name: 'Safe Govt', fill: '#4ade80' },
    { x: 40, y: 12, z: 100, name: 'Solar', fill: '#fbbf24' },
    { x: 80, y: 15, z: 80, name: 'High Yield', fill: '#f87171' },
    { x: 30, y: 10, z: 150, name: 'You are here', fill: '#60a5fa' },
];

export default function RiskYieldScatterChart({ data = defaultData }: RiskYieldScatterChartProps) {
    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                    <XAxis
                        type="number"
                        dataKey="x"
                        name="Risk"
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                        tickLine={{ stroke: '#94a3b8' }}
                        axisLine={{ stroke: '#475569' }}
                    >
                        <Label value="Risk" offset={-10} position="insideBottom" fill="#94a3b8" style={{ fontSize: '10px' }} />
                    </XAxis>
                    <YAxis
                        type="number"
                        dataKey="y"
                        name="Yield"
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                        tickLine={{ stroke: '#94a3b8' }}
                        axisLine={{ stroke: '#475569' }}
                        unit="%"
                    >
                        <Label value="Yield" angle={-90} position="insideLeft" fill="#94a3b8" style={{ fontSize: '10px' }} />
                    </YAxis>
                    <Tooltip
                        cursor={{ strokeDasharray: '3 3', stroke: '#cbd5e1' }}
                        contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '8px',
                            fontSize: '12px',
                            color: '#f1f5f9'
                        }}
                        itemStyle={{ color: '#e2e8f0' }}
                    />
                    <Scatter name="Bonds" data={data} fill="#8884d8">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
                        ))}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}
