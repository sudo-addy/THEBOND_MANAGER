'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '../components/ThemeToggle';
import { ArrowRight, Check } from 'lucide-react';
import { TrustBadges } from '../components/landing/TrustBadges';
import { FeaturedProjects } from '../components/landing/FeaturedProjects';
import { TokenizationExplainer } from '../components/landing/TokenizationExplainer';
import { ImpactDashboard } from '../components/landing/ImpactDashboard';
import { PricingSection } from '../components/landing/PricingSection';
import { SaturnRing } from '../components/animations/SaturnRing';


// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentTvl, setCurrentTvl] = useState("₹1,24,50,000");

  useEffect(() => {
    setMounted(true);

    // Dynamic TVL updates every 5 seconds
    const interval = setInterval(() => {
      const values = [
        "₹1,24,50,000",
        "₹1,24,55,200",
        "₹1,24,62,500",
        "₹1,24,48,900",
        "₹1,24,75,100"
      ];
      const randomValue = values[Math.floor(Math.random() * values.length)];
      setCurrentTvl(randomValue);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300 font-sans selection:bg-blue-500/30">

      {/* Navigation (Keep existing) */}
      <nav className="fixed top-0 left-0 w-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl z-50 border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="MUD₹A Logo" className="w-8 h-8 rounded-lg" />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">MUD₹A</span>
          </div>
          <div className="flex space-x-6 items-center">
            <div className="hidden md:flex space-x-8 items-center">
              <Link href="/bonds" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Marketplace</Link>
              <Link href="/portfolio" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Portfolio</Link>
              <Link href="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Login</Link>
              <Link href="/signup" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold px-5 py-2 rounded-lg hover:opacity-90 transition">
                Get Started
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section (Keep existing but cleaner) */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full bg-blue-100/40 dark:bg-blue-900/10 blur-[120px]" />
          <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-100/40 dark:bg-indigo-900/10 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-left"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Live on Mainnet Beta
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Institutional Grade <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Infrastructure Bonds</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
              Access high-yield sovereign assets starting at ₹1,000.  <br className="hidden md:block" />
              Powered by blockchain for instant settlement and liquidity.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition font-bold shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2"
              >
                Start Investing
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/bonds"
                className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition font-bold flex items-center justify-center gap-2"
              >
                View Marketplace
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1"><Check className="w-4 h-4 text-green-500" /> RBI Compliant</span>
              <span className="flex items-center gap-1"><Check className="w-4 h-4 text-green-500" /> AAA Rated Assets</span>
            </motion.div>
          </motion.div>

          {/* Dynamic Hero Graphic (Keep existing) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden md:block"
          >
            <SaturnRing>
              <div className="relative z-10 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-6 max-w-md mx-auto transform rotate-2 hover:rotate-0 transition duration-500">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Total Value Locked</p>
                    <h3 className="text-2xl font-bold dark:text-white transition-all duration-500">{currentTvl}</h3>
                  </div>
                  <div className="text-green-500 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full text-sm font-bold">
                    +12.5% 📈
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'NHAI Green Bond', val: '₹10,200', change: '+2.4%' },
                    { name: 'Mumbai Metro', val: '₹5,400', change: '+1.8%' },
                    { name: 'Solar Energy Corp', val: '₹2,100', change: '+5.2%' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-xs">
                          {item.name.substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">AAA Rated</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900 dark:text-white">{item.val}</p>
                        <p className="text-xs text-green-600 dark:text-green-400">{item.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>Live Updates • 2ms latency</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online</span>
                </div>
              </div>
            </SaturnRing>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-10 -right-10 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-20"
            >
              <span className="text-3xl">🌿</span>
              <div className="text-xs font-bold mt-1 dark:text-white">Green Bonds</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-20"
            >
              <span className="text-3xl">🏙️</span>
              <div className="text-xs font-bold mt-1 dark:text-white">Smart Cities</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <TrustBadges />
      <FeaturedProjects />
      <TokenizationExplainer />
      <ImpactDashboard />
      <PricingSection />

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div>
            <div className="text-white text-xl font-bold mb-4">MUD₹A</div>
            <p className="mb-4">Democratizing infrastructure finance through blockchain technology. Safe, transparent, and accessible.</p>
            <div className="flex gap-4">
              {/* Social Icons would go here */}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/bonds" className="hover:text-blue-400">Marketplace</Link></li>
              <li><Link href="/portfolio" className="hover:text-blue-400">My Portfolio</Link></li>
              <li><Link href="/impact" className="hover:text-blue-400">Impact Report</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-blue-400">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-blue-400">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:text-blue-400">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-blue-400">Risk Disclosure</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 text-center">
          <p className="mb-2">Regulated by SEBI · RBI Compliant · ISO 27001 Certified</p>
          <p>© 2026 MUD₹A Technologies Pvt Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
