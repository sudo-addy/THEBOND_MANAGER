"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProfileHero from "../../components/profile/ProfileHero";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileForm from "../../components/profile/ProfileForm";
import Lenis from "lenis";
import { UserProfile } from "../../types/user";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Initialize Lenis Smooth Scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            const storedToken = localStorage.getItem('auth_token');
            const storedUser = localStorage.getItem('user');

            if (!storedToken) {
                router.push('/login');
                return;
            }

            setToken(storedToken);

            try {
                // Fetch fresh user data
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: { Authorization: `Bearer ${storedToken}` }
                });

                if (response.data.success) {
                    setUser(response.data.user);
                } else if (storedUser) {
                    // Fallback to local storage if API fails but we have cached data
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {
                    // If no cached user and API failed, maybe redirect or show error
                    // For now, we'll stay on page but show error state if needed
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleUserUpdate = (updatedUser: UserProfile) => {
        setUser(updatedUser);
        // Update local storage to keep it in sync
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
                <Footer />
            </div>
        );
    }

    if (!user || !token) {
        return null; // Will redirect or show loading
    }

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/30">
            <Header />

            <main className="flex-1 w-full pb-10">
                <ProfileHero user={user} />
                <ProfileStats user={user} />

                <div className="mt-12">
                    <ProfileForm user={user} token={token} onUpdate={handleUserUpdate} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
