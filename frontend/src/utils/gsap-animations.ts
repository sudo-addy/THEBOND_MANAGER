import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSAP Animation Utilities
 */

/**
 * Fade in animation
 */
export const fadeIn = (element: string | Element, options = {}) => {
    return gsap.from(element, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        ...options,
    });
};

/**
 * Fade in and slide up animation
 */
export const fadeInUp = (element: string | Element, options = {}) => {
    return gsap.from(element, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: 'power3.out',
        ...options,
    });
};

/**
 * Fade in and slide from left
 */
export const fadeInLeft = (element: string | Element, options = {}) => {
    return gsap.from(element, {
        opacity: 0,
        x: -60,
        duration: 0.8,
        ease: 'power3.out',
        ...options,
    });
};

/**
 * Fade in and slide from right
 */
export const fadeInRight = (element: string | Element, options = {}) => {
    return gsap.from(element, {
        opacity: 0,
        x: 60,
        duration: 0.8,
        ease: 'power3.out',
        ...options,
    });
};

/**
 * Scale in animation
 */
export const scaleIn = (element: string | Element, options = {}) => {
    return gsap.from(element, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: 'back.out(1.7)',
        ...options,
    });
};

/**
 * Stagger animation for multiple elements
 */
export const staggerFadeInUp = (elements: string, options = {}) => {
    return gsap.from(elements, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        ...options,
    });
};

/**
 * Number counter animation
 */
export const animateNumber = (
    element: Element,
    endValue: number,
    options: {
        duration?: number;
        decimals?: number;
        prefix?: string;
        suffix?: string;
        format?: (value: number) => string;
    } = {}
) => {
    const {
        duration = 2,
        decimals = 0,
        prefix = '',
        suffix = '',
        format,
    } = options;

    const obj = { value: 0 };

    return gsap.to(obj, {
        value: endValue,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
            const formattedValue = format
                ? format(obj.value)
                : obj.value.toFixed(decimals);
            element.textContent = `${prefix}${formattedValue}${suffix}`;
        },
    });
};

/**
 * Scroll-triggered reveal animation
 */
export const scrollReveal = (element: string | Element, options = {}) => {
    return gsap.from(element, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            ...options,
        },
    });
};

/**
 * Parallax scroll effect
 */
export const parallaxScroll = (element: string | Element, speed = 0.5) => {
    return gsap.to(element, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    });
};

/**
 * Horizontal scroll animation
 */
export const horizontalScroll = (
    container: string | Element,
    sections: string | Element,
    options = {}
) => {
    const getSections = () => gsap.utils.toArray(sections);

    return gsap.to(getSections(), {
        xPercent: -100 * (getSections().length - 1),
        ease: 'none',
        scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            snap: 1 / (getSections().length - 1),
            end: () => `+=${(container as HTMLElement).offsetWidth}`,
            ...options,
        },
    });
};

/**
 * Typewriter effect
 */
export const typewriter = (
    element: Element,
    text: string,
    speed = 0.05
) => {
    const chars = text.split('');
    element.textContent = '';

    const tl = gsap.timeline();

    chars.forEach((char) => {
        tl.to(element, {
            duration: speed,
            onStart: () => {
                element.textContent += char;
            },
        });
    });

    return tl;
};

/**
 * Smooth scroll to element
 */
export const smoothScrollTo = (target: string | Element, options = {}) => {
    return gsap.to(window, {
        duration: 1,
        scrollTo: {
            y: target,
            offsetY: 80,
        },
        ease: 'power3.inOut',
        ...options,
    });
};

/**
 * Create a simple timeline
 */
export const createTimeline = (options = {}) => {
    return gsap.timeline(options);
};

/**
 * Kill all ScrollTriggers and animations
 */
export const killAllAnimations = () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.killTweensOf('*');
};

/**
 * Refresh ScrollTrigger (useful after content changes)
 */
export const refreshScrollTrigger = () => {
    ScrollTrigger.refresh();
};

export { gsap, ScrollTrigger };
