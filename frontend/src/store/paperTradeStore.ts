import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PaperTradeState {
    initialBalance: number;
    currentBalance: number;
    portfolioValue: number;
    holdings: { [symbol: string]: number }; // Symbol -> Quantity
    trades: any[];
    netWorthHistory: { date: string; value: number }[];

    // Actions
    buy: (symbol: string, price: number, qty: number) => void;
    sell: (symbol: string, price: number, qty: number) => void;
    resetAccount: () => void;
    refreshPortfolioValue: (currentPrices: { [symbol: string]: number }) => void;
}

export const usePaperTradeStore = create<PaperTradeState>()(
    persist(
        (set, get) => ({
            initialBalance: 10000000, // 1 Crore
            currentBalance: 10000000,
            portfolioValue: 0,
            holdings: {},
            trades: [],
            netWorthHistory: [],

            buy: (symbol, price, qty) => {
                const { currentBalance, holdings, trades } = get();
                const cost = price * qty;

                if (currentBalance >= cost) {
                    const newHoldings = { ...holdings, [symbol]: (holdings[symbol] || 0) + qty };
                    const newTrade = {
                        id: Date.now(),
                        type: 'BUY',
                        symbol,
                        price,
                        qty,
                        total: cost,
                        timestamp: new Date().toISOString()
                    };

                    set({
                        currentBalance: currentBalance - cost,
                        holdings: newHoldings,
                        trades: [newTrade, ...trades]
                    });
                }
            },

            sell: (symbol, price, qty) => {
                const { currentBalance, holdings, trades } = get();
                const currentQty = holdings[symbol] || 0;

                if (currentQty >= qty) {
                    const revenue = price * qty;
                    const newHoldings = { ...holdings, [symbol]: currentQty - qty };
                    if (newHoldings[symbol] === 0) delete newHoldings[symbol];

                    const newTrade = {
                        id: Date.now(),
                        type: 'SELL',
                        symbol,
                        price,
                        qty,
                        total: revenue,
                        timestamp: new Date().toISOString()
                    };

                    set({
                        currentBalance: currentBalance + revenue,
                        holdings: newHoldings,
                        trades: [newTrade, ...trades]
                    });
                }
            },

            resetAccount: () => {
                set({
                    currentBalance: 10000000,
                    portfolioValue: 0,
                    holdings: {},
                    trades: [],
                    netWorthHistory: []
                });
            },

            refreshPortfolioValue: (currentPrices) => {
                const { currentBalance, holdings } = get();
                let investedValue = 0;

                Object.keys(holdings).forEach(symbol => {
                    if (currentPrices[symbol]) {
                        investedValue += holdings[symbol] * currentPrices[symbol];
                    }
                });

                const totalNetWorth = currentBalance + investedValue;

                // Add to history if unique day
                const today = new Date().toISOString().split('T')[0];
                const lastEntry = get().netWorthHistory[get().netWorthHistory.length - 1];

                let newHistory = [...get().netWorthHistory];
                if (!lastEntry || lastEntry.date !== today) {
                    newHistory.push({ date: today, value: totalNetWorth });
                } else {
                    newHistory[newHistory.length - 1].value = totalNetWorth;
                }

                set({
                    portfolioValue: investedValue,
                    netWorthHistory: newHistory
                });
            }
        }),
        {
            name: 'paper-trade-storage', // unique name
        }
    )
);
