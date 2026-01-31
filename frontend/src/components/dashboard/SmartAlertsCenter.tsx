'use client';

import { Bell, TrendingUp, AlertTriangle, ShieldCheck, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';

export default function SmartAlertsCenter() {
    const [alerts, setAlerts] = useState([
        { id: 1, type: 'opportunity', title: 'Yield Spike Alert', message: 'NHAI-TB25 yield jumped to 8.5% due to market sell-off.', time: '10m ago', actionable: true },
        { id: 2, type: 'compliance', title: 'SEBI Update', message: 'New KYC requirements for institutional investors.', time: '2h ago', actionable: false },
        { id: 3, type: 'payment', title: 'Coupon Received', message: 'Received ₹12,500 from IRFC Bond.', time: '1d ago', actionable: false },
    ]);

    const dismissAlert = (id: number) => {
        setAlerts(alerts.filter(a => a.id !== id));
    };

    return (
        <div className="glass-panel p-6 rounded-2xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Bell className="w-5 h-5 text-amber-500" /> Smart Alerts
                </h3>
                <span className="text-xs font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full">{alerts.length} New</span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2">
                {alerts.map((alert) => (
                    <div key={alert.id} className="relative group p-4 bg-slate-900/40 border border-slate-800 rounded-xl hover:bg-slate-800/60 hover:border-blue-500/30 transition-all">
                        <button
                            onClick={() => dismissAlert(alert.id)}
                            className="absolute top-2 right-2 p-1 text-slate-600 hover:text-white opacity-0 group-hover:opacity-100 transition"
                        >
                            <X className="w-3 h-3" />
                        </button>

                        <div className="flex items-start gap-3">
                            <div className={`mt-1 p-2 rounded-lg shrink-0 ${alert.type === 'opportunity' ? 'bg-green-500/10 text-green-400' :
                                    alert.type === 'compliance' ? 'bg-red-500/10 text-red-400' :
                                        'bg-blue-500/10 text-blue-400'
                                }`}>
                                {alert.type === 'opportunity' && <TrendingUp className="w-4 h-4" />}
                                {alert.type === 'compliance' && <AlertTriangle className="w-4 h-4" />}
                                {alert.type === 'payment' && <ShieldCheck className="w-4 h-4" />}
                            </div>

                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                                    {alert.title}
                                    <span className="text-[10px] font-normal text-slate-500">{alert.time}</span>
                                </h4>
                                <p className="text-xs text-slate-400 leading-relaxed mb-2">{alert.message}</p>

                                {alert.actionable && (
                                    <button className="text-[10px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition">
                                        View Opportunity <ChevronRight className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {alerts.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 py-8">
                        <ShieldCheck className="w-8 h-8 mb-2 opacity-50" />
                        <p className="text-xs">All caught up! No new alerts.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
