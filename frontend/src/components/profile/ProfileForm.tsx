"use client";

import React, { useState, useEffect, useRef } from "react";
import { UserProfile } from "../../types/user";
import { Save, Loader2, User, Mail, Phone, MapPin, Building, Globe, Github, Linkedin, Twitter } from "lucide-react";
import { gsap } from "gsap";
import ImageUpload from "./ImageUpload";
import axios from "axios";

interface ProfileFormProps {
    user: UserProfile;
    token: string;
    onUpdate: (updatedUser: UserProfile) => void;
}

export default function ProfileForm({ user, token, onUpdate }: ProfileFormProps) {
    const [formData, setFormData] = useState({
        name: user.name,
        phone: user.phone || "",
        bio: user.bio || "",
        location: user.location || "",
        company: user.company || "",
        website: user.website || "",
        socialLinks: {
            twitter: user.socialLinks?.twitter || "",
            linkedin: user.socialLinks?.linkedin || "",
            github: user.socialLinks?.github || ""
        },
        preferences: {
            theme: 'light',
            notifications: true,
            language: 'en'
        },
        profilePicture: user.profilePicture || ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (formRef.current) {
            gsap.fromTo(
                formRef.current.children,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, delay: 0.2, ease: "power2.out" }
            );
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('social_')) {
            const socialKey = name.replace('social_', '');
            setFormData(prev => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, [socialKey]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (base64: string) => {
        setFormData(prev => ({ ...prev, profilePicture: base64 }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            // First update profile picture if changed
            if (formData.profilePicture !== user.profilePicture && formData.profilePicture) {
                await axios.post(
                    'http://localhost:5000/api/users/profile/picture',
                    { profilePicture: formData.profilePicture },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            // Then update other details
            const { profilePicture, ...details } = formData;
            const response = await axios.put(
                'http://localhost:5000/api/users/profile',
                details,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                onUpdate({ ...response.data.user, profilePicture: formData.profilePicture });

                // Clear message after 3 seconds
                setTimeout(() => setMessage(null), 3000);
            }
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error.response?.data?.error || 'Failed to update profile'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 pb-20">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

                {/* Profile Picture Section */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <User className="text-primary" size={20} />
                        Avatar
                    </h2>
                    <ImageUpload
                        currentImage={formData.profilePicture}
                        onImageChange={handleImageChange}
                    />
                </div>

                {/* Basic Info Section */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm grid md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <User className="text-primary" size={20} />
                            Basic Information
                        </h2>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <div className="relative opacity-70">
                            <Mail className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                            <input
                                type="email"
                                value={user.email}
                                disabled
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-muted cursor-not-allowed"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">Email cannot be changed directly.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="New York, USA"
                            />
                        </div>
                    </div>
                </div>

                {/* Professional Section */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm grid md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Building className="text-primary" size={20} />
                            Professional Details
                        </h2>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Company</label>
                        <div className="relative">
                            <Building className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="Acme Corp"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Website</label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>

                    <div className="col-span-2 space-y-2">
                        <label className="text-sm font-medium">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full p-4 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none min-h-[100px]"
                            placeholder="Tell us a little bit about yourself..."
                            maxLength={500}
                        />
                        <div className="text-right text-xs text-muted-foreground">
                            {formData.bio.length}/500
                        </div>
                    </div>
                </div>

                {/* Social Links Section */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Globe className="text-primary" size={20} />
                        Social Profiles
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Twitter size={14} /> Twitter (X)
                            </label>
                            <input
                                type="text"
                                name="social_twitter"
                                value={formData.socialLinks.twitter}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="@username"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Linkedin size={14} /> LinkedIn
                            </label>
                            <input
                                type="text"
                                name="social_linkedin"
                                value={formData.socialLinks.linkedin}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="in/username"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Github size={14} /> GitHub
                            </label>
                            <input
                                type="text"
                                name="social_github"
                                value={formData.socialLinks.github}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="username"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 sticky bottom-6 bg-background/80 backdrop-blur-md p-4 rounded-xl border border-border shadow-2xl z-30">
                    {message && (
                        <div className={`text-sm font-medium ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                            {message.text}
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-primary text-primary-foreground px-8 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/30"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
