import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import FadeContent from "../../Components/FadeContent";
import AnimatedContent from "../../Components/AnimatedContent";
import ArticleCard from "../../Components/CardArticle";
import { useNavigate } from "react-router-dom";
export default function ArtikelTerkini() {
    const [articles, setArticles] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        fetch(`https://ppmbki.ponpes.id/api/article/latest`)
            .then((res) => res.json())
            .then((data) => {
                const cleaned = data.data.map((item) => {
                    let imageLeft = "";
                    let imageRight = "";

                    try {
                        const parsedFoto = JSON.parse(item.foto);
                        if (Array.isArray(parsedFoto)) {
                            imageLeft = `https://ppmbki.ponpes.id/storage/${parsedFoto[0]}`;
                            imageRight = parsedFoto[1]
                                ? `https://ppmbki.ponpes.id/storage/${parsedFoto[1]}`
                                : imageLeft;
                        }
                    } catch (error) {
                        console.warn("Gagal parse foto:", item.foto, error);
                    }

                    return {
                        id: item.id,
                        title: item.judul,
                        divisi: item.nama_divisi,
                        description: item.deskripsi,
                        tanggal: item.tanggal_upload,
                        imageLeft,
                        imageRight,
                    };
                });

                setArticles(cleaned);
            })

            .catch((err) => console.error("Error fetching data:", err));
    }, []);
    return (
        <>
            <section className="bg-[#fbfaff] pt-[40px]">
                <div className="relative max-w-7xl -mb-9 mx-auto  px-4 mt-10 sm:py-16">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-5 lg:mb-12">
                        <div className="flex-1 flex gap-3 items-center">
                            <AnimatedContent
                                direction="horizontal"
                                ease="power3.out"
                                duration={1.5}
                                blur={true}
                                reverse="true"
                                className="space-y-3 md:space-y-6 w-full md:w-1/2 z-10 text-center md:text-left md:ml-10"
                            >
                                <div className="h-25 w-3 bg-gradient-to-br from-emerald-500 to-teal-400"></div>
                            </AnimatedContent>
                            <div className="z-20">
                                <FadeContent>
                                    <h1 className="text-black  font-bold font-Inter text-2xl sm:text-3xl md:text-4xl mb-2">
                                        Artikel Berita!
                                    </h1>
                                </FadeContent>
                                <FadeContent>
                                    <p className="text-gray-600 mt-2 text-base sm:text-lg md:text-xl font-Inter max-w-xl">
                                        Temukan berita dan cerita terkini
                                        seputar kegiatan santri serta momen
                                        berharga lainnya yang terjadi di PPM.
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
                                    onClick={() => navigate("/artikel")}
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

                    <div className="w-full px-4 sm:px-6 z-20 md:px-8 py-12">
                        <div className="max-w-screen-xl mx-auto  relative">
                            <div className="pointer-events-none absolute top-0 left-0 w-5 h-full z-10 bg-gradient-to-r from-[#fbfaff] to-transparent" />
                            <div className="pointer-events-none absolute top-0 right-0 w-5 h-full z-10 bg-gradient-to-l from-[#fbfaff] to-transparent" />
                            {articles.length > 0 && (
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    loop={true}
                                    centeredSlides={true}
                                    grabCursor={true}
                                    initialSlide={Math.floor(
                                        articles.length / 2
                                    )}
                                    slidesPerView={3}
                                    spaceBetween={60}
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
                                    {articles.map((article, index) => (
                                        <SwiperSlide key={index}>
                                            {({ isActive, isPrev, isNext }) => (
                                                <div className="transition-all mt-5 duration-500 ease-in-out transform relative">
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
                                                                `/article/${article.id}`
                                                            )
                                                        }
                                                        className="relative z-20 cursor-pointer"
                                                    >
                                                        <ArticleCard
                                                            imageLeft={
                                                                article.imageLeft
                                                            }
                                                            imageRight={
                                                                article.imageRight
                                                            }
                                                            title={
                                                                article.title
                                                            }
                                                            description={
                                                                article.description
                                                            }
                                                            divisi={`Divisi ${article.divisi}`}
                                                            tanggal={new Date(
                                                                article.tanggal
                                                            ).toLocaleDateString(
                                                                "id-ID",
                                                                {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                }
                                                            )}
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
        </>
    );
}
