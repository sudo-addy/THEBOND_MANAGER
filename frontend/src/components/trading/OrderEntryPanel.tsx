'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Wallet, Clock, Lock, CheckCircle } from 'lucide-react';
import { useTradingStore } from '@/store/tradingStore';

export default function OrderEntryPanel() {
    const { currentPrice, executeOrder } = useTradingStore();

    const [side, setSide] = useState<'buy' | 'sell'>('buy');
    const [type, setType] = useState<'market' | 'limit'>('limit');
    const [qty, setQty] = useState<number>(10);
    const [limitPrice, setLimitPrice] = useState<number>(currentPrice);
    const [successMsg, setSuccessMsg] = useState('');

    // Update limit price default when market moves, only if user hasn't edited it manually? 
    // For simplicity, let's keep it manual or sync on mount.
    useEffect(() => {
        if (type === 'market') {
            setLimitPrice(currentPrice);
        }
    }, [currentPrice, type]);

    const finalPrice = type === 'market' ? currentPrice : limitPrice;
    const total = qty * finalPrice;
    const fees = total * 0.001; // 0.1% fee

    const handleOrder = () => {
        executeOrder(side, qty, finalPrice);
        setSuccessMsg(`Successfully ${side === 'buy' ? 'bought' : 'sold'} ${qty} units at ₹${finalPrice.toFixed(2)}`);

        setTimeout(() => setSuccessMsg(''), 3000);
    };

    return (
        <div className="glass-panel p-6 rounded-xl h-full flex flex-col relative overflow-hidden">
            {successMsg && (
                <div className="absolute inset-0 z-20 bg-slate-900/90 flex flex-col items-center justify-center text-center p-4 animate-in fade-in zoom-in">
                    <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
                    <h3 className="text-xl font-bold text-white mb-1">Order Executed</h3>
                    <p className="text-slate-300">{successMsg}</p>
                </div>
            )}

            {/* Buy / Sell Tabs */}
            <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-slate-900/50 rounded-lg border border-slate-800">
                <button
                    onClick={() => setSide('buy')}
                    className={`py-2 rounded-md text-sm font-bold transition ${side === 'buy' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    Buy
                </button>
                <button
                    onClick={() => setSide('sell')}
                    className={`py-2 rounded-md text-sm font-bold transition ${side === 'sell' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    Sell
                </button>
            </div>

            {/* Order Type */}
            <div className="flex gap-4 mb-6 border-b border-white/5 pb-4">
                <button
                    onClick={() => setType('limit')}
                    className={`text-xs font-bold pb-1 border-b-2 transition ${type === 'limit' ? 'text-blue-400 border-blue-400' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                >
                    Limit
                </button>
                <button
                    onClick={() => setType('market')}
                    className={`text-xs font-bold pb-1 border-b-2 transition ${type === 'market' ? 'text-blue-400 border-blue-400' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                >
                    Market
                </button>
            </div>

            {/* Inputs */}
            <div className="space-y-4 mb-6 flex-1">
                <div>
                    <label className="text-xs text-slate-400 font-medium mb-1 block">Price (₹)</label>
                    <input
                        type="number"
                        value={finalPrice}
                        onChange={(e) => setLimitPrice(Number(e.target.value))}
                        disabled={type === 'market'}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="text-xs text-slate-400 font-medium mb-1 block">Quantity</label>
                    <input
                        type="number"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-blue-500 focus:outline-none"
                    />
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Total Value</span>
                        <span className="text-white font-mono">₹{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Fees (0.1%)</span>
                        <span className="text-slate-300 font-mono">₹{fees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold pt-2">
                        <span className="text-white">Payable</span>
                        <span className="text-blue-400 font-mono">₹{(total + fees).toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Funding Source - Fixed bottom section */}
            <div className="mb-4">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 mb-3">
                    <Wallet className="w-4 h-4 text-blue-400" />
                    <div className="flex-1">
                        <p className="text-[10px] text-blue-300 font-bold uppercase">Funding Source</p>
                        <p className="text-xs text-blue-100">Wallet (₹4.52L Available)</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-2">
                    <Clock className="w-3 h-3" /> Settlement: T+0 (Instant)
                    <Lock className="w-3 h-3 ml-2" /> Escrow Secured
                </div>
            </div>

            <button
                onClick={handleOrder}
                className={`w-full py-3 rounded-xl font-bold text-sm shadow-lg transform active:scale-95 transition flex items-center justify-center gap-2 ${side === 'buy' ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-red-600 hover:bg-red-500 text-white'
                    }`}>
                {side === 'buy' ? 'Place Buy Order' : 'Place Sell Order'} <ArrowRight className="w-4 h-4" />
            </button>
        </div>
    );
}
