import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import AnimatedContent from "./AnimatedContent";

export const HoverEffect = ({ items, className }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div
            className={cn(
                "grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-10 py-6",
                className
            )}
        >
            {items.map((item, idx) => {
                const isActive = hoveredIndex === idx || item.isActive;

                return (
                    <div
                        key={idx}
                        className="relative group p-1 cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <AnimatePresence>
                            {hoveredIndex === idx && (
                                <motion.span
                                    className="absolute inset-0 h-full w-full bg-gradient-to-br from-emerald-400 to-teal-400 rounded-3xl z-0"
                                    layoutId="hoverBackground"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 1,
                                        transition: { duration: 0.2 },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: {
                                            duration: 0.2,
                                            delay: 0.05,
                                        },
                                    }}
                                />
                            )}
                        </AnimatePresence>

                        <div
                            className={cn(
                                "rounded-3xl overflow-hidden relative z-10 border-4 border-gray-300 shadow-lg  transition-all duration-300",
                                isActive
                                    ? "bg-gradient-to-br from-emerald-500 to-teal-400 text-white scale-[1.015]"
                                    : "bg-white text-black"
                            )}
                        >
                            <div className="px-3 py-4 text-center font-bold font-Inter text-sm sm:text-base">
                                {item.title}
                            </div>
                            <div className="px-3 pb-3">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-32 sm:h-70 object-cover rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
