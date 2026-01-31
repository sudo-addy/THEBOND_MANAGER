'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, Briefcase, Camera, Save, Loader2 } from 'lucide-react';
import { api } from '@/services/api';

interface UserProfile {
    name: string;
    email: string;
    phone?: string;
    role: string;
    kyc_status: string;
}

export default function ProfileSettings() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        entityType: 'Private Limited Company'
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // First try to get from API
                const response = await api.users.getProfile();
                if (response.success && response.user) {
                    const user = response.user;
                    setProfile(user);
                    setFormData({
                        name: user.name || 'Premium Investor',
                        email: user.email || 'premium@bondplatform.demo',
                        phone: user.phone || '+91 98765 43210',
                        entityType: user.role === 'issuer' ? 'Private Limited Company' : 'Individual'
                    });
                } else {
                    loadFromLocalStorage();
                }
            } catch (error) {
                console.log('Loading profile from localStorage');
                loadFromLocalStorage();
            } finally {
                setLoading(false);
            }
        };

        const loadFromLocalStorage = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const user = JSON.parse(storedUser);
                    setProfile(user);
                    setFormData({
                        name: user.name || 'Premium Investor',
                        email: user.email || 'premium@bondplatform.demo',
                        phone: user.phone || '+91 98765 43210',
                        entityType: user.role === 'issuer' ? 'Private Limited Company' : 'Individual'
                    });
                } catch (e) {
                    // Use defaults
                }
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.users.updateProfile({
                name: formData.name,
                phone: formData.phone
            });
            // Update localStorage
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                user.name = formData.name;
                user.phone = formData.phone;
                localStorage.setItem('user', JSON.stringify(user));
            }
        } catch (error) {
            console.log('Profile update - using local only');
        } finally {
            setSaving(false);
        }
    };

    const getInitials = () => {
        if (formData.name) {
            return formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        }
        return 'PI';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
            </div>
        );
    }
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-blue-900/40 to-slate-900 border border-blue-500/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-blue-500 to-purple-600">
                            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl font-bold text-white relative overflow-hidden">
                                <span className="relative z-10">{getInitials()}</span>
                                {/* Placeholder Image Overlay (Simulated) */}
                                {/* <img src="/path/to/avatar" alt="Avatar" className="absolute inset-0 w-full h-full object-cover" /> */}
                            </div>
                        </div>
                        <button className="absolute bottom-1 right-1 p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg border-2 border-slate-900 transition-transform hover:scale-110">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="text-center md:text-left space-y-2">
                        <div>
                            <h3 className="text-3xl font-bold text-white tracking-tight">{formData.name}</h3>
                            <p className="text-slate-400 font-medium">{formData.email}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <span className="px-3 py-1 rounded-full text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase tracking-wider flex items-center gap-1">
                                <Briefcase className="w-3 h-3" /> {profile?.role === 'institutional' ? 'Institutional' : profile?.role === 'admin' ? 'Admin' : 'Retail'}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${profile?.kyc_status === 'verified'
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                }`}>
                                {profile?.kyc_status === 'verified' ? 'Verified' : 'Pending KYC'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-[#0a111e]/50 backdrop-blur-md">
                <div className="flex items-center justify-between mb-8">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-400" /> Personal Details
                    </h4>
                    <button className="text-xs text-blue-400 hover:text-white transition">Edit Information</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2 group">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase transition-colors group-hover:text-blue-400">Full Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-slate-900/50 border border-slate-700 hover:border-slate-500 focus:border-blue-500 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white font-medium transition-all outline-none"
                            />
                            <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-2 group">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase transition-colors group-hover:text-blue-400">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={formData.email}
                                readOnly
                                className="w-full bg-slate-900/50 border border-slate-700 hover:border-slate-500 focus:border-blue-500 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white font-medium transition-all outline-none opacity-70"
                            />
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-2 group">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase transition-colors group-hover:text-blue-400">Phone Number</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-slate-900/50 border border-slate-700 hover:border-slate-500 focus:border-blue-500 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white font-medium transition-all outline-none"
                            />
                            <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-2 group">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase transition-colors group-hover:text-blue-400">Entity Structure</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.entityType}
                                className="w-full bg-slate-900/50 border border-slate-700 hover:border-slate-500 focus:border-blue-500 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white font-medium transition-all outline-none"
                                readOnly
                            />
                            <Briefcase className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-blue-900/30 flex items-center gap-2 transform active:scale-95 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}
