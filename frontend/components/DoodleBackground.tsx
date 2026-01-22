'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const doodles = [
    // Circle
    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-40">
        <circle cx="50" cy="50" r="40" />
    </svg>,
    // Triangle
    <svg width="50" height="50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-40">
        <polygon points="50,15 90,85 10,85" />
    </svg>,
    // Squiggle
    <svg width="80" height="40" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-40">
        <path d="M10,25 Q30,5 50,25 T90,25" />
    </svg>,
    // Star
    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-40">
        <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" />
    </svg>,
    // Cross
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-40">
        <line x1="20" y1="20" x2="80" y2="80" />
        <line x1="80" y1="20" x2="20" y2="80" />
    </svg>
];

export default function DoodleBackground() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 25 }).map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${i % 2 === 0 ? 'text-genz-pink' : 'text-black'}`}
                    initial={{
                        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                        rotate: Math.random() * 360,
                        opacity: 0.2
                    }}
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 45, -45, 0],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                >
                    {doodles[i % doodles.length]}
                </motion.div>
            ))}
        </div>
    );
}
