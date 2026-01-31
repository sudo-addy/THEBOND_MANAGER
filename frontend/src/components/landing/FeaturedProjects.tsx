'use client';

import { ArrowRight, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

export function FeaturedProjects() {
    const projects = [
        {
            id: 1,
            title: 'NHAI Green Highway Bond',
            issuer: 'National Highways Authority',
            yield: '8.5%',
            duration: '5 Years',
            raised: 75,
            target: '₹500 Cr',
            minInvest: '₹10,000',
            tag: 'Green Bond',
            color: 'green'
        },
        {
            id: 2,
            title: 'Mumbai Metro Phase 4',
            issuer: 'MMRDA',
            yield: '9.2%',
            duration: '7 Years',
            raised: 45,
            target: '₹1,200 Cr',
            minInvest: '₹5,000',
            tag: 'Infrastructure',
            color: 'blue'
        },
        {
            id: 3,
            title: 'Solar Park Rajasthan',
            issuer: 'Adani Green Energy',
            yield: '10.5%',
            duration: '3 Years',
            raised: 92,
            target: '₹300 Cr',
            minInvest: '₹1,000',
            tag: 'Renewable',
            color: 'yellow'
        }
    ];

    return (
        <section className="py-20 px-4 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Featured Opportunities <span className="text-blue-600">.</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-xl">
                            Hand-picked infrastructure projects with high yields and sovereign backing.
                        </p>
                    </div>
                    <Link href="/bonds" className="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-700 transition">
                        View All Bonds <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-900/20 transition duration-500 hover:-translate-y-1">
                            <div className="absolute top-6 right-6">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                  ${project.color === 'green' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                        project.color === 'blue' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                    {project.tag}
                                </span>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{project.issuer}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
                                        <TrendingUp className="w-3 h-3" /> Yield
                                    </div>
                                    <div className="text-lg font-bold text-green-600 dark:text-green-400">{project.yield}</div>
                                </div>
                                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
                                        <Clock className="w-3 h-3" /> Duration
                                    </div>
                                    <div className="text-lg font-bold text-slate-900 dark:text-white">{project.duration}</div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-600 dark:text-slate-400">Raised: {project.raised}%</span>
                                    <span className="text-slate-900 dark:text-white font-medium">Target: {project.target}</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                                        style={{ width: `${project.raised}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                    Min Investment <br />
                                    <span className="text-slate-900 dark:text-white font-bold text-sm">{project.minInvest}</span>
                                </div>
                                <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition text-sm">
                                    Invest Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
