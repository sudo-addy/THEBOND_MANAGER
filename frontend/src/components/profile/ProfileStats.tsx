"use client";

import React, { useEffect, useRef } from "react";
import { UserProfile } from "../../types/user";
import { gsap } from "gsap";

interface ProfileStatsProps {
    user: UserProfile;
}

export default function ProfileStats({ user }: ProfileStatsProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current.children,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }
            );
        }
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const stats = [
        { label: "Account Created", value: formatDate(user.created_at) },
        { label: "Subscription", value: user.subscription_tier.charAt(0).toUpperCase() + user.subscription_tier.slice(1) },
        { label: "KYC Status", value: user.kyc_status.toUpperCase() },
        { label: "Portfolio Value", value: "$0.00" }, // Placeholder for now
    ];

    return (
        <div
            ref={containerRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto px-4 -mt-10 relative z-20"
        >
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-card/80 backdrop-blur-md border border-border p-4 rounded-xl shadow-lg text-center hover:bg-card/90 transition-colors"
                >
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        {stat.value}
                    </p>
                </div>
            ))}
        </div>
    );
}
