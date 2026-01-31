import { useState, useEffect } from 'react';
import { Sparkles, AlertTriangle, TrendingUp, Info, Loader2 } from 'lucide-react';
import { useTradingStore } from '@/store/tradingStore';
import { api } from '@/services/api';

export default function AITradingCoach() {
    const { selectedBond } = useTradingStore();
    const [analysis, setAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!selectedBond) return;

        const fetchAnalysis = async () => {
            setLoading(true);
            try {
                // In a real scenario, we might debounce this or wait for user action
                // For hackathon "Wow" factor, we fetch on selection
                const response = await api.ai.analyze(selectedBond.id);
                if (response.success) {
                    setAnalysis(response.data);
                }
            } catch (err) {
                console.error("AI Fetch Failed", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, [selectedBond]);

    return (
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden h-full flex flex-col">

            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/50">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-white">AI Trading Coach</h3>
                    <p className="text-[10px] text-slate-400">
                        {loading ? 'Analyzing data...' : `Insights for ${selectedBond?.symbol || 'Market'}`}
                    </p>
                </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-40 text-slate-500 space-y-2">
                        <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                        <p className="text-xs">Generating investment memo...</p>
                    </div>
                ) : analysis ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                        {/* Score Card */}
                        <div className="p-3 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-slate-400">Safety Score</span>
                                <span className={`text-lg font-bold ${analysis.score > 80 ? 'text-green-400' : 'text-amber-400'}`}>
                                    {analysis.score}/100
                                </span>
                            </div>
                            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                <div className={`h-full ${analysis.score > 80 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${analysis.score}%` }} />
                            </div>
                        </div>

                        {/* Analysis Body */}
                        <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                            <div className="flex items-start gap-2">
                                <TrendingUp className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-blue-200 mb-1">AI Verdict: {analysis.sentiment}</p>
                                    <div className="text-[11px] text-slate-300 leading-relaxed whitespace-pre-line">
                                        {/* We strip markdown for simple display or render slightly differently */}
                                        {analysis.analysis.replace(/###|[*]/g, '').slice(0, 200)}...
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {analysis.tags?.map((tag: string) => (
                                <span key={tag} className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-slate-500 py-10">
                        <Info className="w-8 h-8 mx-auto mb-2 opacity-20" />
                        <p className="text-xs">Select a bond to receive AI-powered analysis.</p>
                    </div>
                )}

            </div>

            <div className="mt-4 pt-4 border-t border-white/5 relative">
                <input
                    type="text"
                    placeholder="Ask guidance..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-500 outline-none pr-8"
                    disabled={loading}
                />
                <Sparkles className="w-3 h-3 text-slate-500 absolute right-3 top-7" />
                <p className="text-[9px] text-slate-500 mt-1 text-center">Powered by OpenAI & MUD₹A Intelligence</p>
            </div>

        </div>
    );
}
