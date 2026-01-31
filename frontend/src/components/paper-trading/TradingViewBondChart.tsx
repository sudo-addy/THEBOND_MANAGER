import { useEffect, useRef } from 'react';
import { createChart, ColorType, CrosshairMode, CandlestickSeries, AreaSeries } from 'lightweight-charts';

export default function TradingViewBondChart() {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: '#0F172A' }, // Slate-900
                textColor: '#94A3B8',
            },
            grid: {
                vertLines: { color: '#1E293B' },
                horzLines: { color: '#1E293B' },
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
            crosshair: {
                mode: CrosshairMode.Normal,
            },
            rightPriceScale: {
                borderColor: '#1E293B',
            },
            timeScale: {
                borderColor: '#1E293B',
            },
        });

        // 1. Candlestick Series (Price)
        // In v5+, use addSeries(CandlestickSeries, options)
        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#22C55E',    // Green-500
            downColor: '#EF4444',  // Red-500
            borderVisible: false,
            wickUpColor: '#22C55E',
            wickDownColor: '#EF4444',
        });

        // Mock Bond Data (NHAI-TB25)
        const data = [
            { time: '2025-01-01', open: 1040, high: 1045, low: 1038, close: 1042 },
            { time: '2025-01-02', open: 1042, high: 1048, low: 1040, close: 1046 },
            { time: '2025-01-03', open: 1046, high: 1050, low: 1044, close: 1049 },
            { time: '2025-01-04', open: 1049, high: 1055, low: 1048, close: 1052 },
            { time: '2025-01-05', open: 1052, high: 1058, low: 1050, close: 1055 },
            { time: '2025-01-06', open: 1055, high: 1060, low: 1052, close: 1058 },
            { time: '2025-01-07', open: 1058, high: 1062, low: 1055, close: 1060 },
            { time: '2025-01-08', open: 1060, high: 1065, low: 1058, close: 1056 }, // Correction
            { time: '2025-01-09', open: 1056, high: 1060, low: 1052, close: 1054 },
            { time: '2025-01-10', open: 1054, high: 1058, low: 1050, close: 1052 },
        ];
        candlestickSeries.setData(data);

        // 2. Area Series (Yield Overlay)
        const areaSeries = chart.addSeries(AreaSeries, {
            topColor: 'rgba(56, 189, 248, 0.4)', // Blue-400
            bottomColor: 'rgba(56, 189, 248, 0.0)',
            lineColor: 'rgba(56, 189, 248, 1)',
            lineWidth: 2,
            priceScaleId: 'yield', // Separate scale
        });

        areaSeries.setData([
            { time: '2025-01-01', value: 8.5 },
            { time: '2025-01-02', value: 8.4 },
            { time: '2025-01-03', value: 8.35 },
            { time: '2025-01-04', value: 8.3 },
            { time: '2025-01-05', value: 8.25 },
            { time: '2025-01-06', value: 8.20 },
            { time: '2025-01-07', value: 8.15 },
            { time: '2025-01-08', value: 8.25 },
            { time: '2025-01-09', value: 8.30 },
            { time: '2025-01-10', value: 8.35 },
        ]);

        chart.priceScale('yield').applyOptions({
            scaleMargins: {
                top: 0.7, // Place yield at bottom
                bottom: 0,
            },
        });

        // Resize handler
        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, []);

    return (
        <div className="flex flex-col h-full bg-[#0F172A] border border-white/5 rounded-2xl overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10 flex gap-4">
                <div className="flex flex-col">
                    <span className="text-lg font-bold text-white">NHAI-TB25</span>
                    <span className="text-xs text-slate-400">NHAI Tax Free Bond 2025</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-lg font-bold text-green-500">₹1,052.00</span>
                    <span className="text-xs text-green-400">+1.2% (Today)</span>
                </div>
            </div>

            <div ref={chartContainerRef} className="flex-1 w-full" />
        </div>
    );
}
