import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/parallax";
import "swiper/css/autoplay";
import "swiper/css/navigation";

export default function Article() {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://ppmbki.ponpes.id/api/article")
            .then((res) => res.json())
            .then((response) => {
                const cleaned = response.data.map((item) => {
                    let image = "";
                    try {
                        const parsed = JSON.parse(item.foto);
                        image = Array.isArray(parsed)
                            ? `https://ppmbki.ponpes.id/storage/${parsed[0].replace(
                                  /\\/g,
                                  ""
                              )}`
                            : "";
                    } catch (e) {
                        console.warn("Gagal parse gambar:", e);
                    }

                    return {
                        id: item.id,
                        title: item.judul ?? "Tanpa Judul",
                        description: item.deskripsi ?? "",
                        divisi: item.nama_divisi,
                        image,
                    };
                });

                const uniqueCategories = [
                    "All",
                    ...new Set(cleaned.map((item) => item.divisi)),
                ];

                setArticles(cleaned);
                setFilteredArticles(cleaned);
                setCategories(uniqueCategories);
            })
            .catch((err) => console.error("Gagal fetch artikel:", err));
    }, []);

    // Handle filter kategori
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        if (category === "All") {
            setFilteredArticles(articles);
        } else {
            setFilteredArticles(
                articles.filter((item) => item.divisi === category)
            );
        }
    };

    return (
        <section>
            {/* Parallax Slider */}
            <div className="relative w-full h-[30rem] lg:h-[32rem]">
                <Swiper
                    modules={[Parallax, Autoplay, Navigation]}
                    speed={1000}
                    parallax={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                    className="w-full h-full"
                >
                    {articles.map((article, index) => (
                        <SwiperSlide key={index}>
                            <div
                                onClick={() =>
                                    navigate(`/article/${article.id}`)
                                }
                                className="h-full cursor-pointer w-full bg-cover bg-center relative text-white flex flex-col justify-end px-6 py-12 sm:px-12"
                                style={{
                                    backgroundImage: `url(${article.image})`,
                                }}
                            >
                                <div className="absolute inset-0 bg-black/50 z-0" />
                                <div
                                    className="relative z-10"
                                    data-swiper-parallax="-200"
                                >
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                                        {article.title}
                                    </h2>
                                    <p
                                        className="text-sm sm:text-base md:text-lg max-w-3xl text-gray-200"
                                        data-swiper-parallax="-100"
                                    >
                                        {article.description.slice(0, 250)}...
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                    <div className="custom-prev absolute left-12 top-1/2 z-20 -translate-y-1/2 text-white text-3xl cursor-pointer">
                        ❮
                    </div>
                    <div className="custom-next absolute right-12 top-1/2 z-20 -translate-y-1/2 text-white text-3xl cursor-pointer">
                        ❯
                    </div>
                </Swiper>
            </div>

            {/* Filter Category - Red Area */}
            <div className="bg-red-400 py-6 px-4 flex flex-wrap gap-4 justify-center">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                            selectedCategory === category
                                ? "bg-white text-red-500"
                                : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Yellow Cards */}
            <div className="bg-yellow-400 py-10 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                    <div
                        key={article.id}
                        onClick={() => navigate(`/article/${article.id}`)}
                        className="cursor-pointer bg-white rounded-xl shadow-lg p-5 transition-transform hover:scale-[1.02]"
                    >
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3">
                            {article.description}
                        </p>
                        <span className="inline-block mt-3 text-xs text-red-500 font-medium">
                            {article.divisi}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
