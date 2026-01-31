import { create } from 'zustand';

export interface Bond {
    id: string;
    symbol: string;
    name: string;
    isin: string;
    price: number;
    yield: number;
    vol: string;
    tvSymbol: string; // TradingView Symbol Mapping
    risk_category: string;
    coupon_rate: number;
    maturity_date: string;
    ai_score?: number;
}

interface Position {
    qty: number;
    avgPrice: number;
}

interface Trade {
    price: number;
    qty: number;
    time: string;
    side: 'buy' | 'sell';
}

interface TradeState {
    // Selection
    selectedBond: Bond;
    availableBonds: Bond[];

    // Live Market Data for Selected Bond
    currentPrice: number;
    priceChange: number;
    activePosition: Position;
    marketStatus: 'Open' | 'Closed';
    trades: Trade[];

    // Demo mode flag
    isDemoMode: boolean;

    // Portfolio Data
    walletBalance: number;
    fetchPortfolio: () => Promise<void>;

    // Actions
    selectBond: (bondId: string) => void;
    executeOrder: (side: 'buy' | 'sell', qty: number, price: number) => Promise<{ success: boolean; message?: string }>;
    simulateMarket: () => () => void;
    fetchBonds: () => Promise<void>;
    checkDemoMode: () => boolean;
}

import { api } from '@/services/api';

const BONDS_DATA: Bond[] = [
    {
        id: '1',
        symbol: 'NHAI29',
        name: 'NHAI Green Bond 2029',
        isin: 'INE906B07CB9',
        price: 1042.50,
        yield: 9.8,
        vol: '12.5Cr',
        tvSymbol: 'BSE:SENSEX',
        risk_category: 'low',
        coupon_rate: 9.8,
        maturity_date: '2029-03-31'
    },
    {
        id: '2',
        symbol: 'IRFC30',
        name: 'IRFC Tax Free Bond',
        isin: 'INE053F07936',
        price: 1150.25,
        yield: 7.4,
        vol: '45.2Cr',
        tvSymbol: 'NSE:IRFC',
        risk_category: 'low',
        coupon_rate: 7.4,
        maturity_date: '2030-10-15'
    },
    {
        id: '3',
        symbol: 'HDFC26',
        name: 'HDFC Bank Perp Bond',
        isin: 'INE040A08385',
        price: 998.00,
        yield: 8.85,
        vol: '5.1Cr',
        tvSymbol: 'NSE:HDFCBANK',
        risk_category: 'medium',
        coupon_rate: 8.85,
        maturity_date: '2026-12-31'
    },
    {
        id: '4',
        symbol: 'SGB2028',
        name: 'Sovereign Gold Bond',
        isin: 'IN0020180025',
        price: 6250.00,
        yield: 2.5,
        vol: '120Cr',
        tvSymbol: 'MCX:GOLD',
        risk_category: 'low',
        coupon_rate: 2.5,
        maturity_date: '2028-02-28'
    }
];

export const useTradingStore = create<TradeState>((set, get) => ({
    // Initial State
    availableBonds: BONDS_DATA,
    selectedBond: null as any,
    currentPrice: 0,
    priceChange: 2.4,
    activePosition: {
        qty: 50,
        avgPrice: 1000.00
    },
    marketStatus: 'Open',
    trades: [],
    isDemoMode: true,
    walletBalance: 0,

    fetchPortfolio: async () => {
        try {
            const response = await api.portfolio.get();
            if (response.success && response.portfolio) {
                set({ walletBalance: response.portfolio.virtual_balance });
            }
        } catch (error) {
            console.error('Failed to fetch portfolio:', error);
        }
    },

    checkDemoMode: () => {
        if (typeof window === 'undefined') return true;
        const user = localStorage.getItem('user');
        if (!user) return true;
        try {
            const userData = JSON.parse(user);
            // Demo mode if email contains 'demo' or role is 'demo'
            const isDemo = userData.email?.includes('demo') ||
                userData.role === 'demo' ||
                userData.email === 'retail@bondplatform.demo' ||
                userData.email === 'institutional@bondplatform.demo' ||
                userData.email === 'admin@bondplatform.demo';
            set({ isDemoMode: isDemo });
            return isDemo;
        } catch (e) {
            return true;
        }
    },

    selectBond: (bondId) => {
        const bond = get().availableBonds.find(b => b.id === bondId);
        if (bond) {
            set({
                selectedBond: bond,
                currentPrice: bond.price,
                // Reset trades on switch for better demo feel
                trades: [],
                // In a real app, position would be per-bond. Here we just reset display or fetch per bond.
                activePosition: { qty: 0, avgPrice: 0 }
            });
        }
    },

    executeOrder: async (side, qty, orderPrice) => {
        const { selectedBond, activePosition, trades } = get();

        // Check demo mode
        get().checkDemoMode();

        if (!get().isDemoMode && selectedBond) {
            // Real API call for non-demo users
            try {
                if (side === 'buy') {
                    const response = await api.trading.buy({
                        bond_id: selectedBond.id,
                        quantity: qty,
                        price_per_unit: orderPrice
                    });

                    if (response.success) {
                        // Update local state on success
                        const totalValue = qty * orderPrice;
                        const currentTotalVal = activePosition.qty * activePosition.avgPrice;
                        const newTotalVal = currentTotalVal + totalValue;
                        const newQty = activePosition.qty + qty;

                        const newTrade: Trade = {
                            price: orderPrice,
                            qty,
                            time: new Date().toLocaleTimeString(),
                            side
                        };

                        set({
                            activePosition: {
                                qty: newQty,
                                avgPrice: newTotalVal / newQty
                            },
                            trades: [newTrade, ...trades].slice(0, 50)
                        });

                        await get().fetchPortfolio(); // Refresh balance
                        return { success: true, message: 'Order executed successfully!' };
                    } else {
                        return { success: false, message: response.error || 'Order failed' };
                    }
                } else {
                    // Sell order - would need a sell endpoint
                    return { success: false, message: 'Sell orders require additional verification' };
                }
            } catch (error: any) {
                console.error('Trade execution error:', error);
                return { success: false, message: error.message || 'Failed to execute order' };
            }
        } else {
            // Demo mode - simulate locally
            const totalValue = qty * orderPrice;
            let newPosition = { ...activePosition };

            if (side === 'buy') {
                const currentTotalVal = newPosition.qty * newPosition.avgPrice;
                const newTotalVal = currentTotalVal + totalValue;
                const newQty = newPosition.qty + qty;
                newPosition = {
                    qty: newQty,
                    avgPrice: newTotalVal / newQty
                };
            } else {
                newPosition.qty = Math.max(0, newPosition.qty - qty);
            }

            const newTrade: Trade = {
                price: orderPrice,
                qty,
                time: new Date().toLocaleTimeString(),
                side
            };

            set({
                activePosition: newPosition,
                trades: [newTrade, ...trades].slice(0, 50)
            });

            return { success: true, message: 'Demo order executed!' };
        }
    },

    simulateMarket: () => {
        const interval = setInterval(() => {
            const { currentPrice, trades } = get();
            if (!currentPrice) return;

            // Random walk: -0.2% to +0.2%
            const volatility = 0.002;
            const change = 1 + (Math.random() * volatility * 2 - volatility);
            const newPrice = currentPrice * change;

            if (Math.random() > 0.7) {
                const tradeSide = Math.random() > 0.5 ? 'buy' : 'sell';
                const tradeQty = Math.floor(Math.random() * 500) + 10;
                const newTrade: Trade = {
                    price: newPrice,
                    qty: tradeQty,
                    time: new Date().toLocaleTimeString(),
                    side: tradeSide
                };
                set({
                    currentPrice: newPrice,
                    trades: [newTrade, ...trades].slice(0, 50)
                });
            } else {
                set({ currentPrice: newPrice });
            }

        }, 2000);

        return () => clearInterval(interval);
    },

    fetchBonds: async () => {
        try {
            const response = await api.bonds.list({ limit: 100 });
            const bonds = response.success ? response.data?.bonds || [] : [];

            if (bonds.length > 0) {
                const formattedBonds = bonds.map((b: any) => ({
                    id: b._id,
                    symbol: b.bond_id,
                    name: b.name,
                    isin: b.bond_id,
                    price: b.current_price,
                    yield: b.expected_returns,
                    vol: '10Cr',
                    tvSymbol: 'NSE:INFRA',
                    risk_category: b.risk_category,
                    coupon_rate: b.coupon_rate,
                    maturity_date: b.maturity_date,
                    ai_score: b.ai_recommendation_score
                }));

                set({
                    availableBonds: formattedBonds,
                    selectedBond: formattedBonds[0],
                    currentPrice: formattedBonds[0].price
                });
            }
        } catch (err: any) {
            console.error('Failed to fetch bonds:', err);
        }
    }
}));
