import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Grid } from "swiper/modules";
import "../../../css/app.css";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

import AnimatedContent from "../../Components/AnimatedContent";
import EventCard from "../../Components/CardEvent";
import FadeContent from "../../Components/FadeContent";

export default function Event() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://ppmbki.ponpes.id/api/event`)
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
        <section className="overflow-x-hidden overflow-y-hidden relative w-full">
            <div className="relative h-[95rem] lg:h-[130rem] w-full max-w-[100vw]">
                <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] sm:top-[-250px] sm:left-[-250px] sm:w-[800px] sm:h-[750px] bg-teal-100 rounded-full opacity-50 blur-3xl z-0" />
                <div className="absolute z-5 bottom-1 right-[-10px] w-[400px] h-[400px] sm:bottom-[-300px] sm:right-[-300px] sm:w-[780px] sm:h-[700px] bg-teal-100 rounded-full opacity-50 blur-3xl" />

                <div className="py-30 flex flex-col justify-center items-center relative">
                    {/* Header */}
                    <AnimatedContent
                        direction="vertical"
                        ease="power3.out"
                        reverse={true}
                        distance={100}
                        duration={2}
                        className=""
                    >
                        <img
                            className="h-1/2"
                            src="/images/tulisan event hijau.png"
                            alt="Tulisan Event"
                        />
                    </AnimatedContent>

                    <AnimatedContent
                        direction="vertical"
                        ease="power3.out"
                        reverse={false}
                        duration={1.5}
                        className="relative w-fit"
                    >
                        <img
                            className="h-[30rem] lg:h-1/2"
                            src="/images/bunder hijau.png"
                            alt="Bunder Hijau"
                        />

                        <div className="absolute h-[40rem] top-0 left-1/2 -translate-x-1/2 mt-20 lg:mt-40 w-full px-4 flex flex-col items-center text-center">
                            <FadeContent>
                                <h3 className="text-black font-bold font-Inter text-2xl sm:text-3xl md:text-4xl mb-2">
                                    List Event
                                </h3>
                            </FadeContent>
                            <FadeContent>
                                <p className="text-gray-600 mt-2 text-sm sm:text-lg md:text-xl font-Inter max-w-xl">
                                    Beragam kegiatan seru dan inspiratif setiap
                                    <br />
                                    tahunnya di{" "}
                                    <span className="font-semibold">
                                        PPM BKI Semarang
                                    </span>
                                </p>
                            </FadeContent>
                        </div>
                    </AnimatedContent>

                    {/* Swiper Event Cards */}
                    <div className="absolute bg-transparent top-0 left-1/2 -translate-x-1/2 mt-[30rem] lg:mt-[50rem] w-full flex flex-col px-4 items-center text-center z-20">
                        <div className="w-full max-w-7xl px-4 md:px-8 lg:px-5 pb-12">
                            {events.length > 0 && (
                                <Swiper
                                    modules={[Navigation, Pagination, Grid]}
                                    loop={false}
                                    centeredSlides={false}
                                    grabCursor={true}
                                    slidesPerView={1}
                                    spaceBetween={16}
                                    pagination={{ clickable: true }}
                                    navigation={{
                                        nextEl: ".swiper-button-next",
                                        prevEl: ".swiper-button-prev",
                                    }}
                                    grid={{
                                        rows: 2,
                                        fill: "row",
                                    }}
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 1,
                                            grid: { rows: 2 },
                                            spaceBetween: 12,
                                        },

                                        640: {
                                            slidesPerView: 2,
                                            grid: { rows: 2 },
                                            spaceBetween: 20,
                                        },

                                        768: {
                                            slidesPerView: 2,
                                            grid: { rows: 2 },
                                            spaceBetween: 24,
                                        },

                                        1024: {
                                            slidesPerView: 3,
                                            grid: { rows: 2 },
                                            spaceBetween: 32,
                                        },

                                        1280: {
                                            slidesPerView: 3,
                                            grid: { rows: 2 },
                                            spaceBetween: 32,
                                        },
                                    }}
                                    className=""
                                >
                                    {events.map((event, index) => (
                                        <SwiperSlide key={index}>
                                            <div
                                                onClick={() =>
                                                    navigate(
                                                        `/event/${event.id}`
                                                    )
                                                }
                                                className="cursor-pointer w-full p-2 transition-transform duration-300 hover:scale-[1.02]"
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
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
