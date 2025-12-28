import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ShootingStar = () => {
    const [starKey, setStarKey] = useState(0);

    useEffect(() => {
        // Random interval between 20 and 40 seconds
        const intervalTime = Math.random() * (40000 - 20000) + 20000;

        // Initial delay to avoid immediate start
        const timeout = setTimeout(() => {
            setStarKey(prev => prev + 1);
        }, 2000 + Math.random() * 5000);

        const interval = setInterval(() => {
            setStarKey(prev => prev + 1);
        }, intervalTime);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                key={starKey}
                initial={{
                    top: `${Math.random() * 40}%`,
                    left: -100,
                    opacity: 0,
                    scale: 0.5
                }}
                animate={{
                    top: `${Math.random() * 60 + 20}%`,
                    left: '120%',
                    opacity: [0, 0.4, 0],
                    scale: 1
                }}
                transition={{
                    duration: Math.random() * 0.5 + 1.5, // 1.5s to 2.0s
                    ease: "easeOut"
                }}
                className="fixed w-32 h-[1px] bg-gradient-to-r from-transparent via-lightBrown/50 to-transparent rotate-12 z-0 pointer-events-none"
            />
        </AnimatePresence>
    );
};

export default ShootingStar;
