'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
    message: string;
    type?: ToastType;
    duration?: number;
    onClose: () => void;
}

export const Toast = ({
    message,
    type = 'info',
    duration = 3000,
    onClose
}: ToastProps) => {
    const toastRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const config = {
        success: {
            icon: CheckCircle,
            className: 'status-success',
        },
        error: {
            icon: AlertCircle,
            className: 'status-error',
        },
        info: {
            icon: Info,
            className: 'status-info',
        },
        warning: {
            icon: AlertCircle,
            className: 'status-warning',
        },
    };

    const { icon: Icon, className } = config[type];

    useEffect(() => {
        if (!toastRef.current || !progressRef.current) return;

        // Entrance animation
        gsap.from(toastRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.3,
            ease: 'back.out(1.7)',
        });

        // Progress bar animation
        gsap.to(progressRef.current, {
            scaleX: 0,
            duration: duration / 1000,
            ease: 'linear',
        });

        // Auto close
        const timer = setTimeout(() => {
            if (toastRef.current) {
                gsap.to(toastRef.current, {
                    y: -100,
                    opacity: 0,
                    duration: 0.2,
                    onComplete: onClose,
                });
            }
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            ref={toastRef}
            className={`${className} flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[300px] max-w-md`}
            role="alert"
        >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button
                onClick={() => {
                    if (toastRef.current) {
                        gsap.to(toastRef.current, {
                            y: -100,
                            opacity: 0,
                            duration: 0.2,
                            onComplete: onClose,
                        });
                    }
                }}
                className="flex-shrink-0 hover:opacity-70 transition"
            >
                <X className="w-4 h-4" />
            </button>
            <div
                ref={progressRef}
                className="absolute bottom-0 left-0 h-1 bg-current opacity-50 origin-left"
                style={{ width: '100%' }}
            />
        </div>
    );
};
