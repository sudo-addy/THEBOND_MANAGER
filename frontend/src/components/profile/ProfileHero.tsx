"use client";

import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { UserProfile } from "../../types/user";

// Dynamically import Scene3D to avoid SSR issues with WebGL
const Scene3DProfile = dynamic(() => import("./Scene3DProfile"), { ssr: false });

interface ProfileHeroProps {
    user: UserProfile | null;
}

export default function ProfileHero({ user }: ProfileHeroProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(
                contentRef.current.children,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
            );
        }
    }, [user]);

    if (!user) return null;

    return (
        <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            <Scene3DProfile />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />

            <div
                ref={contentRef}
                className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto"
            >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden mb-6 backdrop-blur-md bg-white/10">
                    {user.profilePicture ? (
                        <img
                            src={user.profilePicture}
                            alt={user.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary text-4xl font-bold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                    {user.name}
                </h1>

                {user.bio && (
                    <p className="text-lg text-muted-foreground max-w-2xl mb-4">
                        {user.bio}
                    </p>
                )}

                <div className="flex flex-wrap gap-3 justify-center text-sm font-medium">
                    {user.location && (
                        <span className="px-3 py-1 rounded-full bg-secondary/50 backdrop-blur-sm border border-white/10">
                            📍 {user.location}
                        </span>
                    )}
                    {user.company && (
                        <span className="px-3 py-1 rounded-full bg-secondary/50 backdrop-blur-sm border border-white/10">
                            🏢 {user.company}
                        </span>
                    )}
                    <span className={`px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 ${user.kyc_status === 'verified'
                            ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                            : 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                        }`}>
                        {user.kyc_status === 'verified' ? '✓ KYC Verified' : '⚠ KYC Pending'}
                    </span>
                </div>
            </div>
        </section>
    );
}
