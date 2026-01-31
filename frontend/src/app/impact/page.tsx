'use client';

import { Building2, Leaf, Users, Globe, TrendingUp, Zap, Droplets, Train, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ImpactPage() {
  const impactMetrics = [
    { icon: Building2, value: '₹2,500+ Cr', label: 'Infrastructure Funded', color: 'text-blue-400' },
    { icon: Users, value: '50M+', label: 'Lives Impacted', color: 'text-green-400' },
    { icon: Leaf, value: '2.5M', label: 'Tons CO₂ Reduced', color: 'text-emerald-400' },
    { icon: Globe, value: '12', label: 'States Covered', color: 'text-purple-400' },
  ];

  const projects = [
    {
      icon: Train,
      category: 'Transportation',
      title: 'Mumbai Metro Line 3',
      description: 'Connecting Colaba to SEEPZ, reducing commute time for 1.5 million daily passengers.',
      funded: '₹485 Cr',
      impact: '1.5M daily commuters',
      co2: '45,000 tons/year'
    },
    {
      icon: Zap,
      category: 'Clean Energy',
      title: 'Rajasthan Solar Grid',
      description: 'Large-scale solar installation powering 500,000 households with clean energy.',
      funded: '₹320 Cr',
      impact: '500K households',
      co2: '1.2M tons/year'
    },
    {
      icon: Droplets,
      category: 'Water Infrastructure',
      title: 'Chennai Desalination Plant',
      description: 'Providing 100 million liters of drinking water daily to water-stressed regions.',
      funded: '₹250 Cr',
      impact: '2M people served',
      co2: '15,000 tons/year'
    },
    {
      icon: Building2,
      category: 'Smart Cities',
      title: 'Pune Smart City Project',
      description: 'Digital infrastructure upgrade including IoT sensors, smart traffic, and e-governance.',
      funded: '₹180 Cr',
      impact: '3.5M citizens',
      co2: '8,000 tons/year'
    },
  ];

  const sdgGoals = [
    { number: 7, title: 'Affordable and Clean Energy', description: 'Investing in renewable energy infrastructure' },
    { number: 9, title: 'Industry, Innovation and Infrastructure', description: 'Building resilient infrastructure' },
    { number: 11, title: 'Sustainable Cities and Communities', description: 'Making cities inclusive and sustainable' },
    { number: 13, title: 'Climate Action', description: 'Taking urgent action to combat climate change' },
  ];

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-200">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-green-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="pt-24 pb-16 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-slate-500 justify-center mb-6">
              <Link href="/" className="hover:text-blue-400 transition">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-300">Impact Report</span>
            </div>
            <div className="inline-block px-4 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-bold mb-6">
              2025 Impact Report
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Building Tomorrow&apos;s Infrastructure Today
            </h1>
            <p className="text-xl text-slate-400">
              Every investment on our platform contributes to sustainable development, 
              creating lasting impact for communities across India.
            </p>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="py-12 px-6 border-y border-slate-800 bg-slate-900/30">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactMetrics.map((metric, i) => (
              <div key={i} className="text-center">
                <metric.icon className={`w-10 h-10 ${metric.color} mx-auto mb-3`} />
                <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-sm text-slate-500">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Featured Impact Projects</h2>
            <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              Real infrastructure projects funded through our platform, creating tangible benefits for millions.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-green-500/50 transition">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-500/10 rounded-xl">
                      <project.icon className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <span className="text-xs text-green-400 font-bold uppercase">{project.category}</span>
                      <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Funded</p>
                      <p className="text-sm font-bold text-white">{project.funded}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Impact</p>
                      <p className="text-sm font-bold text-green-400">{project.impact}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">CO₂ Saved</p>
                      <p className="text-sm font-bold text-emerald-400">{project.co2}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SDG Alignment */}
        <div className="py-20 px-6 bg-slate-900/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">UN Sustainable Development Goals</h2>
            <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              Our investments are aligned with the United Nations Sustainable Development Goals.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sdgGoals.map((goal, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                    {goal.number}
                  </div>
                  <h3 className="font-bold text-white text-sm mb-2">{goal.title}</h3>
                  <p className="text-xs text-slate-500">{goal.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Environmental Impact Summary</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-green-900/30 to-slate-900/30 border border-green-500/20 rounded-2xl p-6 text-center">
                <Leaf className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-1">2.5M</div>
                <div className="text-sm text-slate-400">Tons CO₂ Offset</div>
                <div className="text-xs text-green-400 mt-2">Equivalent to 5.5M trees</div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-slate-900/30 border border-blue-500/20 rounded-2xl p-6 text-center">
                <Droplets className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-1">500M</div>
                <div className="text-sm text-slate-400">Liters Water Saved</div>
                <div className="text-xs text-blue-400 mt-2">Per year through efficiency</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-900/30 to-slate-900/30 border border-yellow-500/20 rounded-2xl p-6 text-center">
                <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-1">850 MW</div>
                <div className="text-sm text-slate-400">Clean Energy Added</div>
                <div className="text-xs text-yellow-400 mt-2">To the national grid</div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Our Commitment</h3>
              <p className="text-slate-400 text-center leading-relaxed">
                We are committed to directing capital towards sustainable infrastructure that creates 
                positive environmental and social outcomes. Every bond on our platform undergoes rigorous 
                ESG screening to ensure alignment with our sustainability principles. By 2030, we aim to 
                facilitate ₹10,000 Cr in green and sustainable infrastructure financing, contributing to 
                India&apos;s net-zero goals and sustainable development agenda.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 px-6 bg-gradient-to-r from-green-900/20 to-blue-900/20 border-t border-slate-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Be Part of the Change</h2>
            <p className="text-slate-400 mb-6">
              Start investing in infrastructure that creates lasting positive impact for communities and the environment.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/signup" className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition">
                Start Investing
              </Link>
              <Link href="/bonds" className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition">
                View Green Bonds
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="py-8 px-6 border-t border-slate-800">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/" className="text-blue-400 hover:text-white transition">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
