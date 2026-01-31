'use client';

import { useState } from 'react';
import { usePaperTradeStore } from '@/store/paperTradeStore';
import { useTradingStore } from '@/store/tradingStore';
import { ArrowUpRight, ArrowDownRight, RefreshCcw, ShieldCheck } from 'lucide-react';

export default function PaperTradeTerminal() {
    // Stores
    const { currentBalance, buy, sell, resetAccount } = usePaperTradeStore();
    const { selectedBond, currentPrice, priceChange } = useTradingStore();

    // Local State
    const [action, setAction] = useState<'BUY' | 'SELL'>('BUY');
    const [qty, setQty] = useState(10);
    const [orderType, setOrderType] = useState('MARKET');
    const [showReceipt, setShowReceipt] = useState(false);
    const [lastTrade, setLastTrade] = useState<any>(null);

    const totalValue = qty * currentPrice;
    const canAfford = currentBalance >= totalValue;

    const handleExecute = () => {
        if (action === 'BUY') {
            if (!canAfford) return;
            buy(selectedBond.symbol, currentPrice, qty);
        } else {
            sell(selectedBond.symbol, currentPrice, qty);
        }

        // Show Receipt
        setLastTrade({
            symbol: selectedBond.symbol,
            qty,
            price: currentPrice,
            total: totalValue,
            type: action,
            id: `TXN-${Math.floor(Math.random() * 99999)}`
        });
        setShowReceipt(true);

        // Reset inputs
        setQty(10);
    };

    return (
        <div className="glass-panel p-6 rounded-2xl border border-slate-700/50 bg-[#0a101f]/80 relative overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        Trade Console
                        {orderType === 'MARKET' && <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">INSTANT</span>}
                    </h3>
                    <p className="text-xs text-slate-400">Execution is simulated at real-time prices.</p>
                </div>
                <div className="flex gap-2 text-xs font-bold">
                    <button
                        onClick={() => setAction('BUY')}
                        className={`px-4 py-1.5 rounded-lg transition ${action === 'BUY' ? 'bg-green-600 text-white shadow-lg shadow-green-900/40' : 'bg-slate-800 text-slate-400'}`}
                    >
                        BUY
                    </button>
                    <button
                        onClick={() => setAction('SELL')}
                        className={`px-4 py-1.5 rounded-lg transition ${action === 'SELL' ? 'bg-red-600 text-white shadow-lg shadow-red-900/40' : 'bg-slate-800 text-slate-400'}`}
                    >
                        SELL
                    </button>
                </div>
            </div>

            {/* Selected Asset Info */}
            <div className="mb-6 p-4 bg-slate-900/50 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                    <h4 className="font-bold text-white">{selectedBond?.symbol || 'SELECT BOND'}</h4>
                    <p className="text-xs text-slate-400">{selectedBond?.name || '---'}</p>
                </div>
                <div className="text-right">
                    <div className="text-xl font-mono font-bold text-white">₹{currentPrice.toFixed(2)}</div>
                    <div className={`text-xs font-bold flex items-center justify-end gap-1 ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {priceChange >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {Math.abs(priceChange).toFixed(2)}%
                    </div>
                </div>
            </div>

            {/* Order Controls */}
            <div className="space-y-4 mb-6">
                <div>
                    <label className="text-xs text-slate-400 font-bold mb-1 block">Order Type</label>
                    <select
                        value={orderType}
                        onChange={(e) => setOrderType(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none appearance-none"
                    >
                        <option value="MARKET">Market Order (Instant)</option>
                        <option value="LIMIT">Limit Order (Simulated)</option>
                        <option value="STOP">Stop Loss</option>
                    </select>
                </div>

                <div>
                    <label className="text-xs text-slate-400 font-bold mb-1 block">Quantity</label>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded bg-slate-800 text-white hover:bg-slate-700">-</button>
                        <input
                            type="number"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-center text-white font-mono"
                        />
                        <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded bg-slate-800 text-white hover:bg-slate-700">+</button>
                    </div>
                </div>

                <div className="flex justify-between items-center text-sm pt-2 border-t border-white/5">
                    <span className="text-slate-400">Total Value</span>
                    <span className="text-white font-bold font-mono">₹{totalValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Available Cash</span>
                    <span className={`font-mono ${canAfford ? 'text-slate-300' : 'text-red-400'}`}>₹{currentBalance.toLocaleString()}</span>
                </div>
            </div>

            {/* Action Button */}
            <button
                onClick={handleExecute}
                disabled={action === 'BUY' && !canAfford}
                className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-xl transition transform hover:scale-[1.02] active:scale-[0.98] ${action === 'BUY'
                    ? (canAfford ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-slate-800 text-slate-500 cursor-not-allowed')
                    : 'bg-red-600 hover:bg-red-500 text-white'
                    }`}
            >
                {action === 'BUY' ? (canAfford ? 'PLACE BUY ORDER' : 'INSUFFICIENT FUNDS') : 'PLACE SELL ORDER'}
            </button>

            {/* Helper Links */}
            <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                <button onClick={resetAccount} className="flex items-center gap-1 hover:text-white transition"><RefreshCcw className="w-3 h-3" /> Reset Demo Account</button>
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-indigo-500" /> Safe Mode ON</span>
            </div>

            {/* Receipt Modal Overlay */}
            {showReceipt && lastTrade && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in zoom-in-95">
                    <div className="bg-[#1e293b] p-6 rounded-2xl border border-white/10 w-[90%] text-center shadow-2xl">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShieldCheck className="w-6 h-6 text-green-400" />
                        </div>
                        <h4 className="text-white font-bold text-lg mb-1">{lastTrade.type} SUCCESSFUL</h4>
                        <p className="text-slate-400 text-xs mb-4">Transaction ID: {lastTrade.id}</p>

                        <div className="bg-black/30 p-3 rounded-lg text-sm space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Asset</span>
                                <span className="text-white font-bold">{lastTrade.symbol}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Qty</span>
                                <span className="text-white font-bold">{lastTrade.qty}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Total</span>
                                <span className="text-white font-bold">₹{lastTrade.total.toLocaleString()}</span>
                            </div>
                        </div>

                        <button onClick={() => setShowReceipt(false)} className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold text-xs mt-2">
                            Close Receipt
                        </button>
                        <p className="text-[10px] text-indigo-400 mt-2">Recorded on Polygon Amoy Testnet (Simulated)</p>
                    </div>
                </div>
            )}

        </div>
    );
}
