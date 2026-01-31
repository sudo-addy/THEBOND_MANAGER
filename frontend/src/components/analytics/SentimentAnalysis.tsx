'use client';

import { Twitter, Newspaper } from 'lucide-react';

export default function SentimentAnalysis() {
    return (
        <div className="glass-panel p-6 rounded-2xl h-[350px] flex flex-col">
            <h3 className="text-lg font-bold text-white mb-6">Market Sentiment</h3>

            <div className="flex-1 flex flex-col items-center justify-center relative mb-6">
                <div className="w-40 h-40 rounded-full border-[12px] border-slate-800 border-t-green-500 border-r-green-500 rotate-45 flex items-center justify-center relative">
                    <div className="absolute -rotate-45 flex flex-col items-center">
                        <span className="text-3xl font-bold text-white">72</span>
                        <span className="text-xs text-green-400 font-bold uppercase">Bullish</span>
                    </div>
                </div>
                <p className="text-xs text-slate-400 text-center mt-4 max-w-[200px]">
                    Sentiment is driven by recent RBI rate cut announcements.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-900/50 rounded-xl border border-white/5 flex items-center gap-3">
                    <Newspaper className="w-5 h-5 text-blue-400" />
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">News</p>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1 w-16">
                            <div className="h-full bg-blue-500 w-[80%]" />
                        </div>
                    </div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-xl border border-white/5 flex items-center gap-3">
                    <Twitter className="w-5 h-5 text-sky-400" />
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Social</p>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1 w-16">
                            <div className="h-full bg-sky-500 w-[60%]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
