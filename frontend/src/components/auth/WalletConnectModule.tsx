'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ShieldCheck, ChevronRight, X, ExternalLink, Copy, AlertTriangle } from 'lucide-react';

export default function WalletConnectModule() {
    const [isOpen, setIsOpen] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');

    // Mock Data for Connected State
    const walletData = {
        balance: '₹45,200',
        bonds: 12,
        address: '0xA91...2F4B'
    };

    const connectWallet = () => {
        setConnecting(true);
        // Simulate connection delay
        setTimeout(() => {
            setConnecting(false);
            setIsConnected(true);
            setWalletAddress(walletData.address);
            setIsOpen(false); // Close modal on success
        }, 1500);
    };

    const disconnectWallet = () => {
        setIsConnected(false);
        setWalletAddress('');
    };

    // 1. POST-CONNECTION STATE
    if (isConnected) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full bg-blue-900/30 border border-blue-500/30 rounded-xl p-4 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-2 opacity-20">
                    <Wallet className="w-16 h-16 text-blue-400" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-bold text-blue-100">Polygon Connected</span>
                    </div>
                    <button
                        onClick={disconnectWallet}
                        className="text-xs text-red-400 hover:text-red-300 font-medium transition"
                    >
                        Disconnect
                    </button>
                </div>

                {/* Address & Actions */}
                <div className="flex items-center gap-2 bg-black/40 p-2 rounded-lg mb-4 border border-white/5 relative z-10">
                    <code className="text-xs text-blue-200 font-mono flex-1">{walletAddress}</code>
                    <button className="p-1 hover:bg-white/10 rounded transition text-slate-400 hover:text-white" title="Copy Address">
                        <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1 hover:bg-white/10 rounded transition text-slate-400 hover:text-white" title="View on Explorer">
                        <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
                    <div className="bg-blue-600/20 rounded-lg p-3 border border-blue-500/20">
                        <p className="text-[10px] text-blue-300 uppercase font-bold">Balance (e₹)</p>
                        <p className="text-lg font-bold text-white">{walletData.balance}</p>
                    </div>
                    <div className="bg-amber-600/10 rounded-lg p-3 border border-amber-500/20">
                        <p className="text-[10px] text-amber-300 uppercase font-bold">Bond Tokens</p>
                        <p className="text-lg font-bold text-amber-400">{walletData.bonds} Units</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2 relative z-10">
                    <button className="w-full py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-2">
                        Start Tokenized Investing <ChevronRight className="w-3 h-3" />
                    </button>
                    <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-blue-200 rounded-lg text-xs font-medium transition">
                        View Portfolio on Blockchain
                    </button>
                </div>
            </motion.div>
        );
    }

    // 2. PRE-CONNECTION STATE
    return (
        <>
            <div className="relative group">
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full relative border border-white/20 bg-white/5 hover:bg-white/10 text-blue-100 font-bold py-4 rounded-xl transition-all flex items-center justify-between px-4 group-hover:border-blue-400/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                            <Wallet className="w-5 h-5 text-blue-300" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-white">Connect Wallet</p>
                            <p className="text-[10px] text-blue-300">Polygon Network Required</p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-blue-400 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Security Note */}
                <div className="mt-3 flex items-start gap-2 px-2 opacity-60">
                    <ShieldCheck className="w-3 h-3 text-green-400 mt-0.5" />
                    <p className="text-[10px] text-blue-200 leading-tight">
                        Non-custodial connection. We verify ownership without accessing your private keys.
                    </p>
                </div>
            </div>

            {/* 3. CONNECTION MODAL */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-[#0f172a] border border-white/10 w-full max-w-sm rounded-2xl shadow-2xl relative z-10 overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="p-5 border-b border-white/10 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-white">Select Wallet</h3>
                                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Network Warning */}
                            <div className="bg-amber-500/10 px-5 py-2 border-b border-amber-500/10 flex items-center gap-2">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                                <span className="text-xs text-amber-200 font-medium">Please switch to Polygon Network</span>
                            </div>

                            {/* Wallet Options */}
                            <div className="p-5 space-y-3">
                                {[
                                    { name: 'MetaMask', color: 'text-orange-500', recommended: true },
                                    { name: 'WalletConnect', color: 'text-blue-500', mobile: true },
                                    { name: 'Coinbase Wallet', color: 'text-blue-400', inst: true },
                                    { name: 'Trust Wallet', color: 'text-green-500' }
                                ].map((wallet) => (
                                    <button
                                        key={wallet.name}
                                        onClick={() => connectWallet()}
                                        disabled={connecting}
                                        className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ${wallet.color} font-bold`}>
                                                {wallet.name[0]}
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-bold text-slate-200 group-hover:text-white">{wallet.name}</p>
                                                {wallet.recommended && <p className="text-[10px] text-green-400">Recommended</p>}
                                                {wallet.mobile && <p className="text-[10px] text-blue-400">Mobile Supported</p>}
                                                {wallet.inst && <p className="text-[10px] text-purple-400">Institutional</p>}
                                            </div>
                                        </div>
                                        {connecting ? (
                                            <div className="w-4 h-4 border-2 border-slate-500 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="p-5 border-t border-white/10 text-center">
                                <p className="text-xs text-slate-500">
                                    By connecting, you agree to our <span className="text-blue-400 cursor-pointer hover:underline">Terms of Service</span>
                                </p>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
