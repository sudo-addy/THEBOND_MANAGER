'use client';

import { useState } from 'react';
import { Briefcase, MapPin, Clock, ChevronRight, Code, TrendingUp, Shield, Users, Zap, Heart } from 'lucide-react';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
}

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const benefits = [
    { icon: TrendingUp, title: 'Competitive Salary', description: 'Industry-leading compensation with equity options' },
    { icon: Heart, title: 'Health Benefits', description: 'Comprehensive medical, dental, and vision coverage' },
    { icon: Clock, title: 'Flexible Work', description: 'Remote-first culture with flexible hours' },
    { icon: Zap, title: 'Learning Budget', description: '₹50,000 annual learning and development allowance' },
    { icon: Users, title: 'Team Events', description: 'Regular team outings and annual retreats' },
    { icon: Shield, title: 'Insurance', description: 'Life and disability insurance coverage' },
  ];

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Backend Engineer',
      department: 'Engineering',
      location: 'Mumbai / Remote',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Build scalable microservices architecture for our trading platform using Node.js, MongoDB, and Redis.'
    },
    {
      id: '2',
      title: 'Blockchain Developer',
      department: 'Engineering',
      location: 'Mumbai / Remote',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Develop and audit smart contracts for bond tokenization on Ethereum and Polygon networks.'
    },
    {
      id: '3',
      title: 'Frontend Engineer (React/Next.js)',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Create beautiful, responsive trading interfaces using React, Next.js, and TypeScript.'
    },
    {
      id: '4',
      title: 'AI/ML Engineer',
      department: 'Data Science',
      location: 'Mumbai / Remote',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Build AI models for risk assessment, price prediction, and investment recommendations.'
    },
    {
      id: '5',
      title: 'Product Manager',
      department: 'Product',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Define product roadmap and work with engineering to deliver innovative financial products.'
    },
    {
      id: '6',
      title: 'Compliance Officer',
      department: 'Legal',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '7+ years',
      description: 'Ensure regulatory compliance with SEBI, RBI, and international securities laws.'
    },
    {
      id: '7',
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Manage cloud infrastructure, CI/CD pipelines, and ensure 99.99% platform uptime.'
    },
    {
      id: '8',
      title: 'UX Designer',
      department: 'Design',
      location: 'Mumbai / Remote',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Design intuitive user experiences for complex financial products and trading workflows.'
    }
  ];

  const departments = ['all', 'Engineering', 'Data Science', 'Product', 'Legal', 'Design'];

  const filteredJobs = selectedDepartment === 'all' 
    ? jobs 
    : jobs.filter(job => job.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-200">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="pt-24 pb-16 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-slate-500 justify-center mb-6">
              <Link href="/" className="hover:text-blue-400 transition">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-300">Careers</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Build the Future of Finance
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Join our mission to democratize infrastructure investment. We&apos;re looking for 
              passionate individuals who want to revolutionize the fixed-income market.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="#positions" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition">
                View Open Positions
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="py-12 px-6 border-y border-slate-800 bg-slate-900/30">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-slate-500">Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">12</div>
              <div className="text-sm text-slate-500">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">85%</div>
              <div className="text-sm text-slate-500">Remote Team</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">4.8★</div>
              <div className="text-sm text-slate-500">Glassdoor Rating</div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Why Join Us?</h2>
            <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              We offer competitive benefits and a culture that values innovation, growth, and work-life balance.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">
                  <benefit.icon className="w-10 h-10 text-blue-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div id="positions" className="py-20 px-6 bg-slate-900/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Open Positions</h2>
            <p className="text-slate-400 text-center mb-8">
              Find your next opportunity and help us shape the future of infrastructure investment.
            </p>

            {/* Department Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                    selectedDepartment === dept
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {dept === 'all' ? 'All Departments' : dept}
                </button>
              ))}
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
                        {job.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">{job.description}</p>
                      <div className="flex flex-wrap gap-3 mt-3">
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Briefcase className="w-3 h-3" /> {job.department}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="w-3 h-3" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="w-3 h-3" /> {job.type}
                        </span>
                        <span className="text-xs text-blue-400">{job.experience}</span>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition whitespace-nowrap">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                No positions available in this department. Check back later!
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Don&apos;t see a perfect fit?</h2>
            <p className="text-slate-400 mb-6">
              We&apos;re always looking for talented individuals. Send us your resume and we&apos;ll keep you in mind for future opportunities.
            </p>
            <a 
              href="mailto:careers@bondplatform.gov"
              className="inline-block px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition"
            >
              Send General Application
            </a>
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
