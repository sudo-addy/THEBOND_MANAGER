'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, ArrowRight, CheckCircle2, AlertCircle, Loader2, Building2 } from 'lucide-react';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';

interface BuyBondModalProps {
    isOpen: boolean;
    onClose: () => void;
    bond: any;
    onSuccess: () => void;
}

export default function BuyBondModal({ isOpen, onClose, bond, onSuccess }: BuyBondModalProps) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setQuantity(1);
            setError('');
            fetchBalance();
        }
    }, [isOpen]);

    const fetchBalance = async () => {
        try {
            const res = await api.payments.getBalance();
            if (res.success) {
                setWalletBalance(res.data.cash_balance);
            }
        } catch (err) {
            console.error('Failed to fetch balance', err);
        }
    };

    const handleBuy = async () => {
        setLoading(true);
        setError('');

        try {
            const totalCost = quantity * bond.token_price;
            if (totalCost > walletBalance) {
                setError('Insufficient funds. Please add money to your wallet.');
                setLoading(false);
                return;
            }

            const res = await api.trading.buy({
                bond_id: bond._id,
                quantity: quantity,
                price_per_unit: bond.token_price
            });

            if (res.success) {
                setStep(2); // Success
                setTimeout(() => {
                    onSuccess();
                    onClose();
                    router.push('/dashboard');
                }, 2000);
            } else {
                setError(res.message || 'Purchase failed');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Transaction failed');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !bond) return null;

    const totalCost = quantity * bond.token_price;
    const canAfford = walletBalance >= totalCost;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-[#0f172a] border border-slate-700 w-full max-w-md rounded-2xl p-6 relative shadow-2xl overflow-hidden"
                >
                    {/* Close Button */}
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition z-10">
                        <X className="w-5 h-5" />
                    </button>

                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Confirm Purchase</h3>
                                <p className="text-sm text-slate-400">Review your order details below.</p>
                            </div>

                            {/* Bond Summary */}
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-900/20 text-blue-400 flex items-center justify-center border border-blue-500/20">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{bond.name}</h4>
                                    <p className="text-xs text-slate-400">{bond.issuer}</p>
                                    <div className="flex gap-2 mt-2">
                                        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">yield: {bond.expected_returns}%</span>
                                        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">Price: ₹{bond.token_price}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Quantity</label>
                                <div className="flex items-center gap-4 bg-slate-900 border border-slate-700 rounded-xl p-2">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-lg font-bold transition"
                                    >-</button>
                                    <div className="flex-1 text-center">
                                        <span className="text-xl font-mono font-bold text-white">{quantity}</span>
                                        <span className="text-xs text-slate-500 block">tokens</span>
                                    </div>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-lg font-bold transition"
                                    >+</button>
                                </div>
                            </div>

                            {/* Cost Breakdown */}
                            <div className="space-y-2 py-4 border-t border-slate-800">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Cost per Token</span>
                                    <span className="text-white">₹{bond.token_price}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Total Tokens</span>
                                    <span className="text-white">x {quantity}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-800/50 mt-2">
                                    <span className="text-white">Total Cost</span>
                                    <span className="text-blue-400">₹{totalCost.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Wallet Check */}
                            <div className={`p-3 rounded-lg flex items-center justify-between text-sm ${canAfford ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                <div className="flex items-center gap-2">
                                    <Wallet className="w-4 h-4" />
                                    <span>Wallet Balance: ₹{walletBalance.toLocaleString()}</span>
                                </div>
                                {!canAfford && <span className="text-[10px] font-bold uppercase">Low Balance</span>}
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 p-3 rounded-lg">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            {/* Action Button */}
                            <button
                                onClick={handleBuy}
                                disabled={loading || !canAfford}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20 transition flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                                    </>
                                ) : !canAfford ? (
                                    <>Insufficient Funds</>
                                ) : (
                                    <>
                                        Confirm Purchase <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="text-center py-10">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 scale-110">
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Purchase Successful!</h3>
                            <p className="text-slate-400 mb-6">
                                You have successfully purchased {quantity} units of {bond.name}.
                            </p>
                            <div className="animate-pulse text-xs text-blue-400 font-bold uppercase tracking-wider">
                                Redirecting to Dashboard...
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
