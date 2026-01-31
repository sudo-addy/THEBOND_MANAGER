'use client';

import { Building2, Users, Globe, Shield, Award, Target, Lightbulb, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { label: 'Total Value Locked', value: '₹2,500+ Cr', icon: TrendingUp },
    { label: 'Active Investors', value: '50,000+', icon: Users },
    { label: 'Infrastructure Projects', value: '150+', icon: Building2 },
    { label: 'Countries Served', value: '12', icon: Globe },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Enterprise-grade security with blockchain-backed transparency for every transaction.'
    },
    {
      icon: Target,
      title: 'Democratized Access',
      description: 'Making institutional-grade infrastructure bonds accessible to retail investors.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Driven',
      description: 'Leveraging AI and blockchain to revolutionize the fixed-income market.'
    },
    {
      icon: Award,
      title: 'Regulatory Excellence',
      description: 'Fully compliant with SEBI, RBI, and international regulatory standards.'
    },
  ];

  const team = [
    { name: 'Dr. Rajesh Kumar', role: 'CEO & Founder', initials: 'RK' },
    { name: 'Priya Sharma', role: 'CTO', initials: 'PS' },
    { name: 'Amit Verma', role: 'Chief Compliance Officer', initials: 'AV' },
    { name: 'Sarah Chen', role: 'Head of AI Research', initials: 'SC' },
  ];

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-200">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transforming Infrastructure Investment
            </h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              We&apos;re building the future of fixed-income investing by tokenizing infrastructure bonds
              and making them accessible to everyone through cutting-edge blockchain technology and AI-driven insights.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/signup" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition">
                Get Started
              </Link>
              <Link href="/bonds" className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition">
                View Bonds
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 px-6 border-y border-slate-800">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-slate-400 text-center leading-relaxed">
              To democratize access to infrastructure investments by leveraging blockchain technology
              for transparency, fractional ownership for accessibility, and AI for intelligent decision-making.
              We believe every investor, regardless of their capital, should have access to stable,
              high-quality fixed-income opportunities that build nations.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-16 px-6 bg-slate-900/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">
                  <value.icon className="w-10 h-10 text-blue-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Leadership Team</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <div key={i} className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-xl font-bold text-white">
                    {member.initials}
                  </div>
                  <h4 className="font-bold text-white">{member.name}</h4>
                  <p className="text-sm text-slate-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 px-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-t border-slate-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Investing?</h2>
            <p className="text-slate-400 mb-6">Join thousands of investors building wealth through infrastructure bonds.</p>
            <Link href="/signup" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition">
              Create Account
            </Link>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="py-8 px-6 border-t border-slate-800">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/" className="text-blue-400 hover:text-white transition">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
