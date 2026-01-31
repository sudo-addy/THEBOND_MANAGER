'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, User, Building2, ChevronDown, ArrowRight, Wallet, PieChart, HelpCircle, ExternalLink, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/services/api';

// --- Components ---

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 dark:border-slate-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left focus:outline-none"
      >
        <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">{question}</span>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'retail' | 'institution'>('retail');
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const features = [
    { icon: <PieChart className="w-4 h-4 text-blue-500" />, text: "Fractional Bond Tokenization" },
    { icon: <ArrowRight className="w-4 h-4 text-green-500" />, text: "Secondary Market Trading (Exit Anytime)" },
    { icon: <ShieldCheck className="w-4 h-4 text-purple-500" />, text: "Live Fund Utilization Tracker" },
    { icon: <Wallet className="w-4 h-4 text-orange-500" />, text: "Repo Lending Yield Boost" }
  ];

  const steps = [
    { title: 'Complete KYC', desc: 'Secure Aadhaar/PAN verification in 2 mins.' },
    { title: 'Connect Wallet', desc: 'Link bank or crypto wallet for settlement.' },
    { title: 'Start Investing', desc: 'Buy bonds from ₹500 & earn interest daily.' }
  ];

  const faqs = [
    { q: "What is bond tokenization?", a: "It converts physical bonds into digital tokens on a blockchain, allowing fractional ownership and instant settlement." },
    { q: "Is InfraChain safe and regulated?", a: "Yes. We are SEBI compliant and all assets are backed by sovereign guarantees or audited infrastructure projects." },
    { q: "Can I sell tokens anytime?", a: "Absolutely. Our 24/7 secondary market allows you to liquidate your position instantly without lock-in periods." }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.auth.register(formData);
      router.push('/login?success=true');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

      {/* Left Column - Educational / Trust (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 border-r border-slate-800 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white mb-12 hover:opacity-80 transition">
            <img src="/logo.png" alt="MUD₹A Logo" className="w-8 h-8 rounded-lg" />
            <span className="text-xl font-bold">MUD₹A</span>
          </Link>

          <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            Start investing in India's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Infrastructure</span> from just ₹500.
          </h1>

          <p className="text-slate-400 text-lg mb-12 max-w-lg">
            Join 10,000+ investors boosting their yields with secure, tokenized sovereign bonds.
          </p>

          <div className="space-y-8 mb-16">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-900/50 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
                    {i + 1}
                  </div>
                  {i !== steps.length - 1 && <div className="w-px h-full bg-slate-800 my-2"></div>}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((opt, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl backdrop-blur-sm">
                <div className="mb-2">{opt.icon}</div>
                <p className="text-slate-300 text-sm font-medium">{opt.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-12 text-xs text-slate-600">
          <p>Investment in debt securities involves risks. Read all scheme related documents carefully.</p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Get Started</h2>
            <p className="text-slate-600 dark:text-slate-400">Create your account in less than 2 minutes.</p>
          </div>

          {/* Investor Type Selector */}
          <div className="bg-slate-100 dark:bg-slate-900 p-1 rounded-xl flex mb-8">
            <button
              onClick={() => setActiveTab('retail')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'retail' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              <User className="w-4 h-4" /> Retail Investor
            </button>
            <button
              onClick={() => setActiveTab('institution')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'institution' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              <Building2 className="w-4 h-4" /> Institution
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 mb-8">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g. Rahul Sharma"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Rahul@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  Continue to Sign Up <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Compliance Trust Strip */}
          <div className="flex justify-between items-center py-4 border-y border-slate-100 dark:border-slate-800 mb-8 overflow-x-auto gap-4">
            {['SEBI KYC Ready', 'AML Monitoring', 'RBI Compliant'].map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5 whitespace-nowrap opacity-60 grayscale hover:grayscale-0 transition-all">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{badge}</span>
              </div>
            ))}
          </div>

          {/* Mini FAQ */}
          <div className="space-y-1 mb-8">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-500" /> Frequently Asked Questions
            </h4>
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>

          <div className="flex flex-col gap-3 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Already have an account? <Link href="/login" className="text-blue-600 hover:text-blue-700 font-bold">Log In</Link>
            </p>
            <div className="flex justify-center gap-6 text-xs text-slate-400 font-medium">
              <Link href="/bonds" className="hover:text-blue-500 flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Live Market</Link>
              <Link href="/demo" className="hover:text-blue-500 flex items-center gap-1"><PlayCircle className="w-3 h-3" /> View Demo</Link>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">
              Prototype demo for hackathon. Not financial advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
