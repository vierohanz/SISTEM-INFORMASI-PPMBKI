// File: EventTerkini.js (Versi Final Sesuai Desain)

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules"; // Hapus EffectCoverflow

// Import CSS Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import CSS kustom kita
import "./EventTerkini.css";

import EventCard from "../../Components/CardEvent";

export default function EventTerkini() {
    const events = [
        // Isi dengan data event Anda, pastikan ada gambar yang sesuai
        {
            image: "/images/default.png", // Ganti dengan path gambar Anda
            title: "PSB - 2025",
            description:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        },
        {
            image: "/images/default.png", // Ganti dengan path gambar Anda
            title: "OSAKA - 2024",
            description:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        },
        {
            image: "/images/default.png", // Ganti dengan path gambar Anda
            title: "CAI - 2025",
            description:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        },
        {
            image: "/images/default.png", // Ganti dengan path gambar Anda
            title: "NEXT - 2024",
            description:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        },
        {
            image: "/images/default.png", // Ganti dengan path gambar Anda
            title: "EVENT - 2025",
            description:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
            {/* Bagian Header (tidak berubah) */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold">Event Bulan Ini!</h2>
                    <p className="text-gray-600 max-w-lg mt-2">
                        Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s.
                    </p>
                </div>
                <div className="flex-shrink-0">
                    <button className="text-white px-5 py-2.5 rounded-full bg-[#54BD95] hover:bg-[#4AAE88] transition-colors">
                        Kunjungi Lebih Lanjut
                    </button>
                </div>
            </div>

            {/* PENTING: Wrapper untuk mengontrol 'overflow' */}
            <div className="event-slider-wrapper">
                <Swiper
                    observer={true}
                    observeParents={true}
                    // Hapus 'EffectCoverflow' dari modules
                    modules={[Pagination, Navigation]}
                    // Konfigurasi utama untuk efek scaling
                    loop={true}
                    centeredSlides={true}
                    grabCursor={true}
                    // Atur jumlah slide yang terlihat dan jaraknya
                    slidesPerView={3}
                    loopedSlides={5}
                    spaceBetween={0} // Jarak antar slide (bisa disesuaikan)
                    // Navigasi & Pagination
                    navigation={true}
                    pagination={{ clickable: true }}
                    // Konfigurasi responsif
                    breakpoints={{
                        0: {
                            slidesPerView: 1.2, // Atau nilai lain yang sesuai untuk layar sangat kecil
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 2.2, // Atau nilai lain untuk tablet kecil
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3, // Untuk desktop dan laptop
                            spaceBetween: 0,
                        },
                        1280: {
                            slidesPerView: 3, // Atau mungkin lebih besar jika ruang memungkinkan
                            spaceBetween: 0,
                        },
                    }}
                    className="event-swiper"
                >
                    {events.map((event, index) => (
                        <SwiperSlide key={index}>
                            {({ isActive }) => (
                                <EventCard
                                    image={event.image}
                                    title={event.title}
                                    description={event.description}
                                />
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
