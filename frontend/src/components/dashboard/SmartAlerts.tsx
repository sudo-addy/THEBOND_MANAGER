'use client';

import { Bell, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SmartAlerts() {
    const alerts = [
        { id: 1, type: 'payout', msg: 'Coupon Payout of ₹2,400 received for Mumbai Metro Bond.', date: 'Today', priority: 'high' },
        { id: 2, type: 'warning', msg: 'Adani Ports bond downgraded to AA+ rating.', date: 'Yesterday', priority: 'medium' },
        { id: 3, type: 'milestone', msg: 'You reached ₹5L portfolio value!', date: 'Jan 28', priority: 'low' },
    ];

    return (
        <div className="glass-panel p-6 rounded-2xl h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Bell className="w-4 h-4 text-amber-500" /> Smart Alerts
                </h3>
                <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">3 New</span>
            </div>

            <div className="space-y-3">
                {alerts.map(alert => (
                    <div key={alert.id} className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors flex gap-3">
                        <div className={`mt-0.5 shrink-0 ${alert.type === 'payout' ? 'text-green-400' :
                            alert.type === 'warning' ? 'text-red-400' : 'text-blue-400'
                            }`}>
                            {alert.type === 'payout' ? <CheckCircle className="w-4 h-4" /> :
                                alert.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                                    <Calendar className="w-4 h-4" />}
                        </div>
                        <div>
                            <p className="text-xs text-slate-200 font-medium leading-snug">{alert.msg}</p>
                            <p className="text-[10px] text-slate-500 mt-1">{alert.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
