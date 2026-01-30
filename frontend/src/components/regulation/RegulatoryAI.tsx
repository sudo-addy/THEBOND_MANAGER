'use client';

import { Send, Bot, Sparkles, HelpCircle, FileSearch } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function RegulatoryAI() {
    const [messages, setMessages] = useState([
        { role: 'ai', text: 'Hello! I am your regulatory compliance assistant. I am trained on the latest SEBI, RBI, and Tax laws. Ask me anything about your bond portfolio compliance.' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI Response
        setTimeout(() => {
            const aiResponse = getSimulatedResponse(input);
            setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    const handlePromptClick = (prompt: string) => {
        const userMsg = { role: 'user', text: prompt };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);
        setTimeout(() => {
            const aiResponse = getSimulatedResponse(prompt);
            setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
            setIsTyping(false);
        }, 1200);
    };

    const getSimulatedResponse = (query: string): string => {
        if (query.toLowerCase().includes('tax')) return "Interest from listed bonds is taxable as per your income slab. However, if you sell after 12 months, Long Term Capital Gains (LTCG) tax of 12.5% applies (without indexation). TDS is not deducted on listed corporate bonds.";
        if (query.toLowerCase().includes('fractional') || query.toLowerCase().includes('sebi')) return "Under the new SM REIT regulations, fractional ownership platforms must have a minimum asset value of ₹50 Cr and minimum unit size of ₹10 Lakhs. Your current holdings are compliant.";
        return "I can help with that. Based on your institutional profile, this query requires a specific check against the latest RBI circulars. Would you like me to generate a formal compliance note?";
    };

    return (
        <div className="glass-panel p-6 rounded-2xl h-[450px] flex flex-col relative overflow-hidden border border-blue-500/20">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <Bot className="w-32 h-32 text-blue-500" />
            </div>

            <div className="flex items-center gap-2 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/50">
                    <Sparkles className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        RegulAI Assistant <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-0.5 rounded border border-blue-500/20 uppercase">Beta</span>
                    </h3>
                    <p className="text-xs text-slate-400">Context-Aware Legal Intelligence</p>
                </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 mb-4 overflow-y-auto custom-scrollbar relative z-10 pr-2">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === 'ai' ? 'bg-blue-600/20 text-blue-400' : 'bg-purple-600/20 text-purple-400'}`}>
                            {msg.role === 'ai' ? <Bot className="w-4 h-4" /> : <span className="text-xs font-bold">ME</span>}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm max-w-[85%] ${msg.role === 'ai' ? 'bg-slate-800/80 rounded-tl-none border border-white/5 text-slate-200' : 'bg-blue-600 rounded-tr-none text-white shadow-lg shadow-blue-900/20'}`}>
                            <p>{msg.text}</p>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                            <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-slate-800/80 p-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
                <div className="mb-4 grid gap-2 relative z-10">
                    <button onClick={() => handlePromptClick("Is interest from Green Bonds taxable?")} className="text-left text-xs bg-white/5 hover:bg-white/10 p-2 rounded-lg transition border border-white/5 flex items-center gap-2 text-slate-300">
                        <HelpCircle className="w-3 h-3 text-blue-400" /> Is interest from Green Bonds taxable?
                    </button>
                    <button onClick={() => handlePromptClick("Explain SEBI's new fractional ownership rules.")} className="text-left text-xs bg-white/5 hover:bg-white/10 p-2 rounded-lg transition border border-white/5 flex items-center gap-2 text-slate-300">
                        <FileSearch className="w-3 h-3 text-purple-400" /> Explain SEBI's new fractional ownership rules.
                    </button>
                </div>
            )}

            {/* Input */}
            <div className="relative z-10">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask a compliance question..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-blue-500 shadow-inner"
                />
                <button onClick={handleSend} className="absolute right-2 top-2 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition active:scale-95">
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
