import AnimatedContent from "../../Components/AnimatedContent";
import CountUp from "../../Components/CountUp";
import FadeContent from "../../Components/FadeContent";
import SpotlightCard from "../../Components/SpotlightCard";

const statistik = [
    { label: "Jumlah Santri", value: "354" },
    { label: "Jumlah Guru", value: "9" },
    { label: "Lulusan Mubaligh", value: "192" },
    { label: "Santri Berprestasi", value: "123" },
];

export default function Statistik() {
    return (
        <section className="py-12 mt-10 px-8 md:px-4 bg-[#F9F8FE]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {statistik.map((item, index) => (
                    <AnimatedContent
                        direction="up"
                        duration={1.5}
                        ease="power3.out"
                    >
                        <SpotlightCard
                            key={index}
                            className="relative bg-gradient-to-br from-emerald-500 to-teal-400 hover:brightness-110 hover:scale-105 duration-300 transition-all text-white rounded-2xl h-60 md:h-86 w-full flex flex-col items-center justify-start overflow-hidden shadow-xl"
                            spotlightColor="rgba(255, 215, 0, 0.6)"
                        >
                            <div className=" md:pt-1 text-center z-10">
                                <p className="text-lg md:text-[20px] font-semibold font-Inter tracking-wide">
                                    {item.label}
                                </p>
                            </div>

                            <div className="absolute bottom-0 w-full h-[60%] bg-white/20 backdrop-blur-md rounded-t-full z-0 shadow-inner" />

                            <div className="mt-auto mb-6 z-10 text-4xl md:text-6xl font-extrabold drop-shadow-md">
                                <CountUp
                                    from={0}
                                    to={Number(item.value)}
                                    separator=","
                                    direction="up"
                                    duration={1}
                                    className="count-up-text"
                                />
                            </div>
                        </SpotlightCard>
                    </AnimatedContent>
                ))}
            </div>
        </section>
    );
}
