'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Building2, TrendingUp, AlertTriangle, CheckCircle2,
  Search, Filter, ArrowUpRight, Clock, Lock, ShieldCheck,
  BarChart3, Zap
} from 'lucide-react';
import { api } from '@/services/api';

// Enhanced Bond Interface
interface Bond {
  _id: string;
  name: string;
  issuer: string;
  coupon_rate: number;
  expected_returns: number;
  risk_category: 'low' | 'medium' | 'high';
  category: 'govt' | 'green' | 'corporate' | 'secondary';
  current_price: number; // Bond price
  token_price: number;   // Token price
  funding_goal: number;
  funding_raised: number;
  maturity_date: string;
  infra_score: number; // 0-100 AI Score
  verified_status: boolean;
}

// Mock Data with Categories
const MOCK_BONDS: Bond[] = [
  {
    _id: '1',
    name: 'Mumbai Metro Line 3',
    issuer: 'MMRDA',
    coupon_rate: 8.75,
    expected_returns: 11.2,
    risk_category: 'low',
    category: 'govt',
    current_price: 1000,
    token_price: 500,
    funding_goal: 5000000000,
    funding_raised: 4850000000,
    maturity_date: '2030-05-15',
    infra_score: 94,
    verified_status: true
  },
  {
    _id: '2',
    name: 'Solar Energy Grid Exp.',
    issuer: 'SECI',
    coupon_rate: 9.2,
    expected_returns: 12.5,
    risk_category: 'medium',
    category: 'green',
    current_price: 1000,
    token_price: 500,
    funding_goal: 2000000000,
    funding_raised: 1840000000,
    maturity_date: '2028-11-20',
    infra_score: 88,
    verified_status: true
  },
  {
    _id: '3',
    name: 'National Highway 44 Upgrade',
    issuer: 'NHAI',
    coupon_rate: 8.1,
    expected_returns: 9.8,
    risk_category: 'low',
    category: 'govt',
    current_price: 1000,
    token_price: 500,
    funding_goal: 8000000000,
    funding_raised: 1200000000,
    maturity_date: '2032-01-10',
    infra_score: 91,
    verified_status: true
  },
  {
    _id: '4',
    name: 'Smart City Data Center',
    issuer: 'Pune Smart City',
    coupon_rate: 10.5,
    expected_returns: 14.2,
    risk_category: 'high',
    category: 'corporate',
    current_price: 1000,
    token_price: 500,
    funding_goal: 500000000,
    funding_raised: 420000000,
    maturity_date: '2027-08-30',
    infra_score: 76,
    verified_status: true
  },
  {
    _id: '5',
    name: 'Wind Farm Expansion',
    issuer: 'Adani Green',
    coupon_rate: 9.5,
    expected_returns: 13.0,
    risk_category: 'medium',
    category: 'green',
    current_price: 950,
    token_price: 475,
    funding_goal: 1500000000,
    funding_raised: 800000000,
    maturity_date: '2029-03-15',
    infra_score: 82,
    verified_status: true
  },
  {
    _id: '6',
    name: 'Liquidated IRFC Bond [Secondary]',
    issuer: 'Secondary Market',
    coupon_rate: 7.8,
    expected_returns: 15.5,
    risk_category: 'medium',
    category: 'secondary',
    current_price: 920,
    token_price: 460,
    funding_goal: 100000000,
    funding_raised: 100000000,
    maturity_date: '2027-12-01',
    infra_score: 95,
    verified_status: true
  },
  {
    _id: '7',
    name: 'Ganga Expressway Phase 2',
    issuer: 'UPEIDA',
    coupon_rate: 8.4,
    expected_returns: 10.1,
    risk_category: 'low',
    category: 'govt',
    current_price: 1000,
    token_price: 500,
    funding_goal: 6000000000,
    funding_raised: 2500000000,
    maturity_date: '2033-07-01',
    infra_score: 89,
    verified_status: true
  },
  {
    _id: '8',
    name: 'Hydro Power Plant Modernization',
    issuer: 'NHPC',
    coupon_rate: 8.9,
    expected_returns: 11.5,
    risk_category: 'low',
    category: 'green',
    current_price: 1000,
    token_price: 500,
    funding_goal: 3000000000,
    funding_raised: 2800000000,
    maturity_date: '2031-10-10',
    infra_score: 92,
    verified_status: true
  },
  {
    _id: '9',
    name: 'L&T Metro Bond Series IV',
    issuer: 'L&T Infra',
    coupon_rate: 9.8,
    expected_returns: 12.8,
    risk_category: 'medium',
    category: 'corporate',
    current_price: 1000,
    token_price: 500,
    funding_goal: 1200000000,
    funding_raised: 600000000,
    maturity_date: '2028-06-25',
    infra_score: 85,
    verified_status: true
  },
  {
    _id: '10',
    name: 'Discounted NHAI 2029 Bond',
    issuer: 'Secondary Market',
    coupon_rate: 7.5,
    expected_returns: 8.9,
    risk_category: 'low',
    category: 'secondary',
    current_price: 980,
    token_price: 490,
    funding_goal: 50000000,
    funding_raised: 50000000,
    maturity_date: '2029-01-01',
    infra_score: 96,
    verified_status: true
  },
  {
    _id: '11',
    name: 'EV Charging Infrastructure',
    issuer: 'Tata Power',
    coupon_rate: 10.2,
    expected_returns: 13.5,
    risk_category: 'high',
    category: 'corporate',
    current_price: 1000,
    token_price: 100,
    funding_goal: 800000000,
    funding_raised: 150000000,
    maturity_date: '2027-04-15',
    infra_score: 79,
    verified_status: true
  }
];

export default function BondsPage() {
  const router = useRouter();
  const [bonds, setBonds] = useState<Bond[]>([]);
  const [filteredBonds, setFilteredBonds] = useState<Bond[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Stats
  const stats = [
    { label: 'Total Value Locked', value: '₹124.5 Cr', icon: Lock, color: 'text-blue-400' },
    { label: 'Active Projects', value: '24', icon: Building2, color: 'text-indigo-400' },
    { label: 'Avg. Yield', value: '9.8%', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Verified Issuers', value: '100%', icon: ShieldCheck, color: 'text-emerald-400' },
  ];

  useEffect(() => {
    // Check if logged in
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);

    // Fetch bonds from API with fallback to mock data
    const fetchBonds = async () => {
      try {
        const response: any = await api.bonds.list();

        if (response.success && response.bonds && response.bonds.length > 0) {
          // Map API response to our interface
          const apiBonds = response.bonds.map((bond: any) => ({
            _id: bond._id,
            name: bond.name,
            issuer: bond.issuer,
            coupon_rate: bond.coupon_rate,
            expected_returns: bond.expected_returns || bond.coupon_rate * 1.15,
            risk_category: bond.risk_category,
            category: bond.category || 'govt',
            current_price: bond.current_price || 1000,
            token_price: bond.token_price || 500,
            funding_goal: bond.funding_goal || 1000000000,
            funding_raised: bond.funding_raised || 500000000,
            maturity_date: bond.maturity_date,
            infra_score: bond.infra_score || 85,
            verified_status: bond.verified_status !== false
          }));
          setBonds(apiBonds);
          setFilteredBonds(apiBonds);
        } else {
          // Fallback to mock data
          setBonds(MOCK_BONDS);
          setFilteredBonds(MOCK_BONDS);
        }
      } catch (error) {
        console.log('Using mock data - API unavailable');
        setBonds(MOCK_BONDS);
        setFilteredBonds(MOCK_BONDS);
      } finally {
        setLoading(false);
      }
    };

    fetchBonds();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = bonds;

    if (activeTab !== 'all') {
      result = result.filter(bond => bond.category === activeTab);
    }

    if (searchQuery) {
      result = result.filter(bond =>
        bond.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bond.issuer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBonds(result);
  }, [activeTab, searchQuery, bonds]);

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low': return <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> LOW RISK</span>;
      case 'medium': return <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs font-bold border border-yellow-500/30 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> MEDIUM</span>;
      case 'high': return <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30 flex items-center gap-1"><Zap className="w-3 h-3" /> HIGH YIELD</span>;
      default: return null;
    }
  };

  const getProgressColor = (percent: number) => {
    if (percent >= 90) return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'; // Urgency
    if (percent >= 50) return 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]';
    return 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]';
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-200 font-sans selection:bg-blue-500/30 pb-20">

      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Navbar Placeholder since Layout handles it, but adding a spacer if needed */}
      <div className="h-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
              Bond Marketplace <span className="text-blue-500">.</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base">
              Trade tokenized infrastructure bonds with institutional-grade security.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 hover:text-white hover:border-slate-500 transition flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search by Issuer or ISIN..."
                className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Live Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-slate-700 transition group">
              <div className={`w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800 group-hover:scale-110 transition ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-800 scrollbar-hide">
          {['all', 'govt', 'corporate', 'green', 'secondary'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTab === tab
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                : 'bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              {tab === 'all' ? 'All Assets' :
                tab === 'govt' ? '🏛️ Sovereign Bonds' :
                  tab === 'green' ? '🌿 Green Bonds' :
                    tab === 'secondary' ? '⚡ Secondary Market' :
                      '🏢 Corporate'}
            </button>
          ))}
        </div>

        {/* Bond Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBonds.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                <p className="text-lg font-semibold">No bonds found.</p>
                <p className="text-sm">Try adjusting your filters or search query.</p>
              </div>
            ) : filteredBonds.map(bond => {
              const progress = (bond.funding_raised / bond.funding_goal) * 100;

              return (
                <motion.div
                  key={bond._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Glass Highlight on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Header */}
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                        {bond.issuer.substring(0, 2)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white leading-tight group-hover:text-blue-400 transition">{bond.name}</h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <p className="text-xs text-slate-400 font-semibold">{bond.issuer}</p>
                          <CheckCircle2 className="w-3 h-3 text-blue-500" />
                        </div>
                      </div>
                    </div>
                    {getRiskBadge(bond.risk_category)}
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                    <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Yield (YTM)</p>
                      <p className="text-lg font-bold text-green-400">{bond.expected_returns}%</p>
                    </div>
                    <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Token Price</p>
                      <p className="text-lg font-bold text-white">₹{bond.token_price}</p>
                    </div>
                    <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Maturity</p>
                      <p className="text-sm font-bold text-slate-300 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {new Date(bond.maturity_date).getFullYear()}
                      </p>
                    </div>
                    <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">InfraScore™</p>
                      <p className="text-sm font-bold text-blue-400 flex items-center gap-1">
                        <BarChart3 className="w-3 h-3" /> {bond.infra_score}/100
                      </p>
                    </div>
                  </div>

                  {/* Funding Progress */}
                  <div className="mb-6 relative z-10">
                    <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span className="text-slate-400">Raised: <span className="text-white">₹{(bond.funding_raised / 10000000).toFixed(1)}Cr</span></span>
                      <span className={progress > 90 ? 'text-red-400' : 'text-blue-400'}>{progress.toFixed(0)}% Funded</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${getProgressColor(progress)}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    {progress > 85 && (
                      <p className="text-[10px] text-red-400 mt-1 font-bold flex items-center gap-1 animate-pulse">
                        <Clock className="w-3 h-3" /> Closing Soon - High Demand
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 relative z-10">
                    <button
                      onClick={() => {
                        if (isLoggedIn) {
                          // Redirect to trading with bond context
                          router.push(`/trading?bond=${bond._id}`);
                        } else {
                          router.push('/login');
                        }
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20 transition hover:shadow-blue-600/30 flex items-center justify-center gap-2"
                    >
                      {isLoggedIn ? 'Trade Now' : 'Buy Token'} <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (isLoggedIn) {
                          router.push(`/trading?bond=${bond._id}`);
                        } else {
                          router.push('/login');
                        }
                      }}
                      className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition flex items-center justify-center"
                    >
                      <TrendingUp className="w-4 h-4" />
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
