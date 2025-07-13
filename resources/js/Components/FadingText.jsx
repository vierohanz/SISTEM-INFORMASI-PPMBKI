import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FadingText({
    texts,
    duration = 800,
    infinite = false,
    className = "",
    onComplete = () => {},
}) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (texts.length <= 1 && !infinite) return;

        const intervalId = setInterval(() => {
            setIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % texts.length;

                if (!infinite && nextIndex === 0) {
                    clearInterval(intervalId);
                    return prevIndex;
                }

                if (!infinite && nextIndex === texts.length - 1) {
                    setTimeout(onComplete, duration);
                }

                return nextIndex;
            });
        }, duration);

        return () => clearInterval(intervalId);
    }, [texts, duration, infinite, onComplete]);

    return (
        <AnimatePresence mode="wait">
            <motion.h1
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={className}
            >
                {texts[index]}
            </motion.h1>
        </AnimatePresence>
    );
}
