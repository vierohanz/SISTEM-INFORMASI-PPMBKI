import { motion } from "framer-motion";

export default function RunningLogos({ data }) {
    const fullList = Array(5).fill(data).flat(); // Gandakan agar loop smooth

    return (
        <div className="relative overflow-hidden py-10 bg-white">
            <div className="pointer-events-none absolute top-0 left-0 w-24 h-full z-10 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute top-0 right-0 w-24 h-full z-10 bg-gradient-to-l from-white to-transparent" />

            <motion.div
                className="flex w-max gap-16"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    duration: 40,
                    ease: "linear",
                }}
            >
                {fullList.map((kampus, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center min-w-[80px] md:min-w-[130px]  px-3 hover:scale-105 transition-transform duration-300"
                    >
                        <img
                            src={kampus.src}
                            alt={kampus.name}
                            className="h-16 w-auto object-contain"
                        />
                        <p className="text-sm text-gray-700 font-medium">
                            {kampus.name}
                        </p>
                        <p className="text-xs text-gray-500">{kampus.jarak}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
