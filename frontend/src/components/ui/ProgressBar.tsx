'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ProgressBarProps {
    value: number; // 0-100
    max?: number;
    className?: string;
    color?: 'primary' | 'success' | 'warning' | 'danger';
    animated?: boolean;
    showLabel?: boolean;
}

export const ProgressBar = ({
    value,
    max = 100,
    className = '',
    color = 'primary',
    animated = true,
    showLabel = false,
}: ProgressBarProps) => {
    const progressRef = useRef<HTMLDivElement>(null);
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const colors = {
        primary: 'bg-gradient-primary',
        success: 'bg-gradient-success',
        warning: 'bg-amber-500',
        danger: 'bg-rose-500',
    };

    useEffect(() => {
        if (!progressRef.current || !animated) return;

        gsap.from(progressRef.current, {
            width: 0,
            duration: 1,
            ease: 'power2.out',
        });
    }, [animated]);

    return (
        <div className={`w-full ${className}`}>
            <div className="relative w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                    ref={progressRef}
                    className={`h-full ${colors[color]} rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={max}
                />
            </div>
            {showLabel && (
                <div className="mt-1 text-xs text-slate-600 dark:text-slate-400 text-right">
                    {percentage.toFixed(0)}%
                </div>
            )}
        </div>
    );
};
