// User related types
export interface User {
    _id: string;
    email: string;
    name: string;
    role: 'user' | 'admin' | 'issuer';
    kyc_status: 'pending' | 'verified' | 'rejected';
    subscription_tier: string;
    createdAt: string;
    // Profile updates
    phone?: string;
    bio?: string;
    location?: string;
    company?: string;
    website?: string;
    socialLinks?: {
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
    preferences?: {
        theme: string;
        notifications: boolean;
        language: string;
    };
}

// Bond related types
export interface Bond {
    _id: string;
    bond_id: string;
    name: string;
    issuer: string;
    description?: string;
    coupon_rate: number;
    maturity_date: string;
    risk_category: 'low' | 'medium' | 'high';
    credit_rating: string;
    expected_returns: number;
    units_available: number;
    status: 'active' | 'inactive' | 'matured';
    ai_recommendation_score?: number;
}

export interface BondAnalytics {
    risk_score: number;
    expected_returns: number;
    recommendation_score: number;
    market_sentiment: 'bullish' | 'bearish' | 'neutral';
}

// Portfolio & Trading types
export interface Holding {
    bond_id: string | Bond;
    quantity: number;
    purchase_price: number;
    purchase_date: string;
}

export interface Portfolio {
    user_id: string;
    holdings: Holding[];
    total_invested: number;
    virtual_balance: number;
}

export interface Transaction {
    transaction_id: string;
    bond_id: string;
    quantity: number;
    price_per_unit: number;
    total_amount: number;
    type: 'buy' | 'sell';
    status: 'pending' | 'completed' | 'failed';
    timestamp: string;
}

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    // Specific fields for different endpoints might need to be handled,
    // but generic structure is usually data or specific keys
    [key: string]: any;
}

export interface AuthResponse {
    success: boolean;
    user: User;
    tokens?: {
        access_token: string;
    };
}

export interface BondsResponse {
    success: boolean;
    bonds?: Bond[];
    data?: {
        bonds: Bond[];
        total: number;
        page: number;
        pages: number;
    };
}
