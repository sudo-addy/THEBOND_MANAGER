'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Sparkles, MoreHorizontal } from 'lucide-react';
import { api } from '@/services/api';

interface AIChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Message {
    id: number;
    role: 'bot' | 'user';
    text: string;
}

export default function AIChatModal({ isOpen, onClose }: AIChatModalProps) {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, role: 'bot', text: 'Hello! I am your AI Investment Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await api.ai.chat(userMsg.text);
            const botMsg: Message = {
                id: Date.now() + 1,
                role: 'bot',
                text: response.data?.reply || "I'm analyzing the market. Please try again."
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (err: any) {
            console.error('AI Chat Error:', err);
            const msg = err?.response?.data?.error || err?.message || "Connection failed";
            const errorMsg: Message = {
                id: Date.now() + 1,
                role: 'bot',
                text: `⚠️ **System Error**: ${msg}. \n\nCheck if Backend is running on Port 3210.`
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-end justify-end p-4 sm:p-6 pointer-events-none">
                <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 20, opacity: 0, scale: 0.95 }}
                    className="bg-[#0f172a] border border-slate-700 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col h-[500px]"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-slate-700 bg-slate-800 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">AI Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    <p className="text-[10px] text-slate-400">Online • Gemini Powered</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-sm'
                                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-slate-700 bg-slate-800">
                        <div className="relative flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about bonds, yields, or risks..."
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition placeholder:text-slate-500"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || loading}
                                className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg disabled:opacity-50 disabled:bg-slate-700 transition"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-[10px] text-center text-slate-500 mt-2">
                            AI can make mistakes. Verify important financial info.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
