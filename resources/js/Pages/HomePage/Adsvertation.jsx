import { ArrowRight, Star, Users, BookOpen } from "lucide-react";
import { Spotlight } from "../../Components/Spotlight";
import React from "react";
import { cn } from "../../lib/utils";
import AnimatedContent from "../../Components/AnimatedContent";
import FadeContent from "../../Components/FadeContent";
import { useNavigate } from "react-router-dom";
export default function Advertation() {
    const navigate = useNavigate();
    const features = [
        {
            icon: <BookOpen className="w-5 h-5" />,
            title: "Pembinaan Ilmiah",
            desc: "Kajian rutin & mentoring dengan ustadz pembina.",
        },
        {
            icon: <Users className="w-5 h-5" />,
            title: "Lingkungan Islami",
            desc: "Tinggal bersama santri mahasiswa yang inspiratif.",
        },
        {
            icon: <Star className="w-5 h-5" />,
            title: "Pengembangan Diri",
            desc: "Program soft skill, kepemimpinan & kontribusi sosial.",
        },
    ];

    return (
        <section className="relative mb-[-40px] shadow-2xl mt-10 lg:mt-5 flex h-[45rem] py-10 lg:py-0 lg:h-[28rem] w-full overflow-hidden  bg-gradient-to-br from-emerald-500 via-teal-700 to-blue-900 antialiased md:items-center md:justify-center group">
            {/* Enhanced Blur/Orb Effects */}
            <div className="absolute left-1/4 top-1/4 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl opacity-60 animate-pulse-slow pointer-events-none" />
            <div className="absolute right-1/4 bottom-1/4 w-60 h-60 bg-white/10 rounded-full blur-3xl opacity-40 animate-float pointer-events-none" />
            <div className="absolute left-1/2 top-1/2 w-52 h-52 bg-purple-400/15 rounded-full blur-3xl opacity-50 animate-pulse pointer-events-none" />

            {/* Subtle Pattern Overlay */}
            <div
                className={cn(
                    "pointer-events-none absolute inset-0 [background-image:radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.1)_90%)] [background-size:60px_60px] select-none opacity-50"
                )}
            />

            <Spotlight className="group-hover:opacity-100" fill="white" />
            <div className="relative max-w-5xl mx-auto text-center px-6 sm:px-8">
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-sm bg-white/30 backdrop-blur-md shadow text-white font-medium">
                    Kesempatan Emas
                </span>

                <FadeContent>
                    <h2 className="text-3xl sm:text-4xl text-white font-bold font-Inter tracking-tight">
                        Bergabung di Pondok Pesantren Mahasiswa
                    </h2>
                    <p className="mt-4 text-base font-Inter sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                        Tempat tumbuh bersama dalam keilmuan, akhlak, dan
                        kontribusi nyata bagi umat dan bangsa dalam suasana
                        Islami dan berkomunitas.
                    </p>

                    <div className="mt-10 grid gap-6 sm:grid-cols-3 text-left">
                        {features.map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="p-2 bg-white/30 rounded-xl shadow-md text-emerald-100">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="font-semibold font-Inter text-white">
                                        {item.title}
                                    </p>
                                    <p className="text-sm font-Inter text-white/80">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeContent>
                <AnimatedContent
                    duration={1.8}
                    reverse={false}
                    direction="vertical"
                    ease="Power3.out"
                >
                    <div className="mt-12">
                        <button
                            // onClick={() => navigate("/psb")}
                            className="inline-flex items-center cursor-pointer font-Inter gap-2 bg-white text-emerald-700 px-6 py-3 rounded-full font-medium shadow-lg hover:scale-105 hover:bg-gray-100 transition duration-300"
                        >
                            Pendaftaran Tutup
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}
