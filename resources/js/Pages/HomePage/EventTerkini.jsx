import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import FadeContent from "../../Components/FadeContent";
import AnimatedContent from "../../Components/AnimatedContent";
import EventCard from "../../Components/CardEvent";
import { useNavigate } from "react-router-dom";
export default function EventTerkini() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const API_URL = import.meta.env.APP_URL;
    useEffect(() => {
        fetch(`https://ppmbki.ponpes.id/api/event/latest`)
            .then((res) => res.json())
            .then((data) => {
                const cleaned = data.data.map((item) => {
                    let image = "";

                    try {
                        const parsedFoto = JSON.parse(item.foto);
                        image = Array.isArray(parsedFoto)
                            ? `https://ppmbki.ponpes.id/storage/${parsedFoto[0]}`
                            : "";
                    } catch (error) {
                        console.warn("Gagal parse foto:", item.foto, error);
                    }

                    return {
                        id: item.id,
                        title: item.judul,
                        year: item.tahun,
                        status: item.status,
                        divisi: item.nama_divisi,
                        description: item.deskripsi,
                        image: image,
                    };
                });

                setEvents(cleaned);
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    return (
        <section className="">
            <div className="max-w-7xl -mb-9 mx-auto  px-4 mt-10 sm:py-16">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-5 lg:mb-12">
                    <div className="flex-1 flex gap-3 items-center z-30">
                        <AnimatedContent
                            direction="horizontal"
                            ease="power3.out"
                            duration={1.5}
                            blur={true}
                            reverse="true"
                            className="space-y-3 md:space-y-6 w-full md:w-1/2 z-10 text-center md:text-left  md:ml-10"
                        >
                            <div className="h-25 w-3 bg-gradient-to-br from-emerald-500 to-teal-400"></div>
                        </AnimatedContent>
                        <div className="z-30">
                            <FadeContent>
                                <h1 className="text-black font-bold font-Inter text-2xl sm:text-3xl md:text-4xl mb-2">
                                    Event Bulan Ini!
                                </h1>
                            </FadeContent>
                            <FadeContent>
                                <p className="text-gray-600 mt-2 text-base sm:text-lg md:text-xl font-Inter max-w-xl">
                                    Berbagai event inspiratif bulan ini yang
                                    dirancang untuk meningkatkan semangat
                                    belajar para santri.
                                </p>
                            </FadeContent>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <AnimatedContent
                            direction="horizontal"
                            ease="power3.out"
                            reverse={false}
                            duration={1.5}
                            className=""
                        >
                            <button
                                onClick={() => navigate("/event")}
                                className="relative shadow-xl cursor-pointer text-sm sm:text-base md:text-lg
               px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3
               rounded-full bg-gradient-to-br from-emerald-500 to-teal-400
               transition-all duration-300 overflow-hidden hover:scale-105"
                            >
                                <span className="relative z-10 text-sm font-medium font-Inter text-white">
                                    Kunjungi Lebih Lanjut
                                </span>
                                <span
                                    className="absolute inset-0 bg-[rgba(255,215,0,0.6)]
                    opacity-0 hover:opacity-30 transition-opacity
                    duration-300 rounded-full"
                                ></span>
                            </button>
                        </AnimatedContent>
                    </div>
                </div>

                <div className="w-full px-4 sm:px-6 md:px-8 py-12">
                    <div className="max-w-screen-xl mx-auto  relative">
                        <div className="pointer-events-none absolute top-0 left-0 w-5 h-full z-10 bg-gradient-to-r from-white to-transparent" />
                        <div className="pointer-events-none absolute top-0 right-0 w-5 h-full z-10 bg-gradient-to-l from-white to-transparent" />

                        {events.length > 0 && (
                            <Swiper
                                modules={[Navigation, Pagination]}
                                loop={true}
                                centeredSlides={true}
                                grabCursor={true}
                                initialSlide={Math.floor(events.length / 2)}
                                slidesPerView={3}
                                spaceBetween={40}
                                pagination={{ clickable: true }}
                                navigation={{
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                }}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1.1,
                                        spaceBetween: 12,
                                    },
                                    640: {
                                        slidesPerView: 1.5,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 28,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 40,
                                    },
                                }}
                            >
                                {events.map((event, index) => (
                                    <SwiperSlide key={index}>
                                        {({ isActive, isPrev, isNext }) => (
                                            <div
                                                className={`transition-all mt-5 duration-500 ease-in-out transform relative ${
                                                    isActive
                                                        ? "scale-y-100 scale-x-95 opacity-100 z-20"
                                                        : "scale-x-75 scale-y-85 opacity-70 z-10"
                                                }`}
                                            >
                                                {!isActive && (
                                                    <div
                                                        className={`absolute top-0 bottom-0 w-12 sm:w-16 z-30 pointer-events-none ${
                                                            isPrev
                                                                ? "left-[-16px] bg-gradient-to-r to-transparent rounded-l-xl"
                                                                : isNext
                                                                ? "right-[-16px] bg-gradient-to-l to-transparent rounded-r-xl"
                                                                : ""
                                                        }`}
                                                    >
                                                        <div className="w-full h-full blur-md" />
                                                    </div>
                                                )}

                                                <div
                                                    onClick={() =>
                                                        navigate(
                                                            `/event/${event.id}`
                                                        )
                                                    }
                                                    className="relative z-20 cursor-pointer"
                                                >
                                                    <EventCard
                                                        description={
                                                            event.description
                                                        }
                                                        image={event.image}
                                                        title={event.title}
                                                        year={event.year}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
