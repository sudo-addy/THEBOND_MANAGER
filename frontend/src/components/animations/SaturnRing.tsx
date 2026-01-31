'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SaturnRingProps {
    children?: React.ReactNode;
    width?: string | number;
    height?: string | number;
}

export const SaturnRing: React.FC<SaturnRingProps> = ({ children }) => {
    return (
        <div className="relative group perspective-1000">

            {/* The Planet/Card (Center Content) */}
            <div className="relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                {children}
            </div>

            {/* The Ring Container */}
            {/* Tilted relative to the card */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] pointer-events-none z-0"
                style={{ transform: 'translate(-50%, -50%) rotateX(75deg) rotateY(10deg)' }}
            >
                {/* Ring 1 - Outer faint ring */}
                <div className="absolute inset-0 rounded-full border-[1px] border-blue-400/20 dark:border-blue-500/10 shadow-[0_0_50px_rgba(59,130,246,0.1)]" />

                {/* Ring 2 - Inner brighter ring */}
                <div className="absolute inset-[15%] rounded-full border-[2px] border-blue-300/30 dark:border-blue-400/20" />

                {/* Orbiting Ball */}
                <motion.div
                    className="absolute top-0 left-1/2 w-4 h-4 -ml-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "50% 50% " }} // Center of the ring container
                >
                    {/* The Ball itself - offset to sit on the ring path */}
                    <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] relative top-[-1.5px]"
                        style={{
                            // Counter-rotate the ball to keep it 'flat' or 'spherical' looking if needed, 
                            // or just let it spin. For a simple ball, no counter-rotation needed.
                            offsetPath: "path('M ...')" // simplify: just use container rotation
                        }}
                    />
                    {/* Trail effect */}
                    <div className="absolute top-[2px] left-[2px] w-2 h-2 bg-blue-400/50 rounded-full blur-[2px] -z-10 translate-x-[-4px]" />
                </motion.div>

                {/* Second Orbiting Ball (Opposite) */}
                <motion.div
                    className="absolute bottom-0 left-1/2 w-3 h-3 -ml-1.5"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "50% -350%" }} // Adjust origin to rotate around center from bottom position
                >
                    <div className="w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_10px_#818cf8]" />
                </motion.div>
            </div>

            {/* Floating particles around */}
            <motion.div
                className="absolute top-0 right-0 w-1 h-1 bg-blue-400 rounded-full"
                animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
        </div>
    );
};
