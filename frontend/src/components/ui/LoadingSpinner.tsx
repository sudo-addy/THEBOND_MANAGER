'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'white' | 'success';
    className?: string;
}

export const LoadingSpinner = ({
    size = 'md',
    color = 'primary',
    className = ''
}: LoadingSpinnerProps) => {
    const spinnerRef = useRef<HTMLDivElement>(null);

    const sizes = {
        sm: 'w-5 h-5',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    const colors = {
        primary: 'border-blue-500',
        white: 'border-white',
        success: 'border-green-500',
    };

    useEffect(() => {
        if (!spinnerRef.current) return;

        gsap.to(spinnerRef.current, {
            rotation: 360,
            duration: 1,
            ease: 'linear',
            repeat: -1,
        });
    }, []);

    return (
        <div className={`inline-flex items-center justify-center ${className}`}>
            <div
                ref={spinnerRef}
                className={`${sizes[size]} border-2 ${colors[color]} border-t-transparent rounded-full`}
                role="status"
                aria-label="Loading"
            />
        </div>
    );
};
