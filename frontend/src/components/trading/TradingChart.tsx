'use client';

import { useEffect, useRef, memo } from 'react';
import { useTradingStore } from '@/store/tradingStore';

function TradingChart() {
    const container = useRef<HTMLDivElement>(null);
    const { selectedBond } = useTradingStore();

    useEffect(() => {
        if (!container.current) return;

        // Clean up existing script
        container.current.innerHTML = '';

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${selectedBond.tvSymbol}",
        "interval": "D",
        "timezone": "Asia/Kolkata",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "backgroundColor": "rgba(10, 17, 30, 0.5)",
        "gridColor": "rgba(30, 41, 59, 0.5)",
        "hide_top_toolbar": false,
        "hide_legend": false,
        "save_image": false,
        "calendar": false,
        "hide_volume": true,
        "support_host": "https://www.tradingview.com"
      }`;

        container.current.appendChild(script);
    }, [selectedBond?.tvSymbol]);

    if (!selectedBond) {
        return (
            <div className="glass-panel p-1 rounded-2xl border border-white/5 bg-[#0a111e]/50 backdrop-blur-md flex flex-col h-full items-center justify-center text-slate-500 text-xs">
                Select a bond to view chart
            </div>
        );
    }

    return (
        <div className="glass-panel p-1 rounded-2xl border border-white/5 bg-[#0a111e]/50 backdrop-blur-md flex flex-col h-full overflow-hidden">
            <div className="tradingview-widget-container h-full w-full" ref={container}>
                <div className="tradingview-widget-container__widget h-full w-full"></div>
            </div>
        </div>
    );
}

export default memo(TradingChart);
