'use client';

import { useEffect, useRef } from 'react';
import { scrollReveal } from '../../utils/gsap-animations';

interface ScrollAnimationProps {
    children: React.ReactNode;
    className?: string;
    animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';
    delay?: number;
}

/**
 * Wrapper component for scroll-triggered animations
 */
export const ScrollAnimation = ({
    children,
    className = '',
    animation = 'fadeInUp',
    delay = 0
}: ScrollAnimationProps) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!elementRef.current) return;

        const animationVariants = {
            fadeInUp: { y: 80, opacity: 0 },
            fadeInLeft: { x: -80, opacity: 0 },
            fadeInRight: { x: 80, opacity: 0 },
            scaleIn: { scale: 0.8, opacity: 0 },
        };

        scrollReveal(elementRef.current, {
            delay,
            ...animationVariants[animation],
        });
    }, [animation, delay]);

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
};
