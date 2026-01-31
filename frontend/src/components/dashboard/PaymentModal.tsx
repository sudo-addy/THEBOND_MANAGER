'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, CreditCard, Banknote, CheckCircle2, Loader2, ShieldCheck, ArrowRight } from 'lucide-react';
import { api } from '@/services/api';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (newBalance: number) => void;
}

export default function PaymentModal({ isOpen, onClose, onSuccess }: PaymentModalProps) {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePayment = async () => {
        setLoading(true);
        setError('');

        try {
            // Call Backend Simulation
            const response = await api.payments.deposit({
                amount: Number(amount),
                method: method
            });

            if (response.success) {
                setTimeout(() => {
                    setLoading(false);
                    setStep(3); // Success Screen
                    onSuccess(response.data.new_balance);
                }, 2000); // UI visual delay for effect
            } else {
                setError(response.message || 'Payment failed');
                setLoading(false);
            }
        } catch (err: any) {
            console.error('Payment Error Details:', err);
            const msg = err.response?.data?.message || err.message || 'Connection failed';
            setError(`Failed: ${msg}. Check console for details.`);
            setLoading(false);
        }
    };

    if (!isOpen) return null;

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
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                <Banknote className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Add Funds</h3>
                        </div>
                        <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Steps */}
                    <div className="relative z-10">
                        {step === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Enter Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-8 pr-4 text-xl font-mono text-white focus:border-blue-500 outline-none transition"
                                            placeholder="5000"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        {[1000, 5000, 10000, 50000].map(val => (
                                            <button
                                                key={val}
                                                onClick={() => setAmount(val.toString())}
                                                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition"
                                            >
                                                +₹{val.toLocaleString()}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Select Method</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setMethod('upi')}
                                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition ${method === 'upi' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'}`}
                                        >
                                            <QrCode className="w-6 h-6" />
                                            <span className="text-sm font-bold">UPI / QR</span>
                                        </button>
                                        <button
                                            onClick={() => setMethod('netbanking')}
                                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition ${method === 'netbanking' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'}`}
                                        >
                                            <CreditCard className="w-6 h-6" />
                                            <span className="text-sm font-bold">NetBanking</span>
                                        </button>
                                    </div>
                                </div>

                                <button
                                    disabled={!amount || !method}
                                    onClick={() => setStep(2)}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20 transition flex items-center justify-center gap-2"
                                >
                                    Proceed to Pay <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="text-center py-6">
                                {loading ? (
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                                        <h4 className="text-lg font-bold text-white mb-1">Verifying Payment...</h4>
                                        <p className="text-sm text-slate-400">Please wait while we contact your bank.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">

                                        <div className="flex justify-between items-center mb-4 px-2">
                                            <button
                                                onClick={() => setStep(1)}
                                                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
                                            >
                                                <ArrowRight className="w-3 h-3 rotate-180" /> Change Amount
                                            </button>
                                        </div>

                                        <div className="bg-white p-4 rounded-xl inline-block mx-auto">
                                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=mudra@upi&pn=MUDRA&am=${amount}&cu=INR`} alt="Payment QR" className="w-32 h-32" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-300 font-medium mb-1">Scan to Pay with Any UPI App</p>
                                            <p className="text-xs text-slate-500">Google Pay, PhonePe, Paytm supported</p>
                                        </div>
                                        <div className="bg-slate-900 p-4 rounded-xl border border-dashed border-slate-700">
                                            <p className="text-xs text-slate-400 mb-1">Paying Amount</p>
                                            <p className="text-2xl font-bold text-white font-mono">₹{Number(amount).toLocaleString()}</p>
                                        </div>

                                        {error && (
                                            <div className="flex flex-col gap-2">
                                                <p className="text-xs text-red-500 bg-red-500/10 p-2 rounded text-center">{error}</p>
                                                {/* Retry Button */}
                                                <button
                                                    onClick={() => setStep(1)}
                                                    className="text-xs text-slate-400 hover:text-white underline"
                                                >
                                                    Change Amount / Retry
                                                </button>
                                            </div>
                                        )}

                                        <button
                                            onClick={handlePayment}
                                            className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-green-900/20 transition"
                                        >
                                            Simulate Payment Success
                                        </button>
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-2">Dev Mode: Click button to skip scan</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {step === 3 && (
                            <div className="text-center py-8">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                                <p className="text-slate-400 mb-8">₹{Number(amount).toLocaleString()} has been added to your wallet.</p>

                                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 mb-8 max-w-xs mx-auto">
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-slate-500">Transaction ID</span>
                                        <span className="text-slate-300 font-mono">TXN-{Math.floor(Math.random() * 100000)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500">Time</span>
                                        <span className="text-slate-300">{new Date().toLocaleTimeString()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm border border-slate-700 transition"
                                >
                                    Close & Return to Dashboard
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Security Badge */}
                    <div className="absolute bottom-4 left-0 w-full text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-[10px] text-slate-500 font-medium">
                            <ShieldCheck className="w-3 h-3" />
                            <span>100% Secure Payment Handling via Razorpay</span>
                        </div>
                    </div>
                </motion.div >
            </div >
        </AnimatePresence >
    );
}
