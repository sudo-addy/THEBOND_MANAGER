'use client';

import { useEffect, useRef } from 'react';
import { animateNumber } from '../../utils/gsap-animations';

interface NumberCounterProps {
    endValue: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
    format?: (value: number) => string;
    startOnView?: boolean;
}

/**
 * Animated number counter using GSAP
 */
export const NumberCounter = ({
    endValue,
    duration = 2,
    decimals = 0,
    prefix = '',
    suffix = '',
    className = '',
    format,
    startOnView = true,
}: NumberCounterProps) => {
    const elementRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!elementRef.current) return;

        const startAnimation = () => {
            if (hasAnimated.current) return;
            hasAnimated.current = true;

            animateNumber(elementRef.current!, endValue, {
                duration,
                decimals,
                prefix,
                suffix,
                format,
            });
        };

        if (startOnView) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            startAnimation();
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.5 }
            );

            observer.observe(elementRef.current);

            return () => observer.disconnect();
        } else {
            startAnimation();
        }
    }, [endValue, duration, decimals, prefix, suffix, format, startOnView]);

    return (
        <span ref={elementRef} className={className}>
            {prefix}0{suffix}
        </span>
    );
};
