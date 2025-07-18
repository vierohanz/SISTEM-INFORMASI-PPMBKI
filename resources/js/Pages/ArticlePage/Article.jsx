import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Autoplay, Navigation } from "swiper/modules";
import { ChevronDown, Calendar, Filter } from "lucide-react";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/parallax";
import "swiper/css/autoplay";
import "swiper/css/navigation";

export default function Article() {
    const DIVISION_ORDER = ["KEMAHASISWAAN", "HUMED", "DIVOR", "HSC", "RT"];
    const months = [
        "Bulan",
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);

    // multi-select states
    const [selectedDivisions, setSelectedDivisions] = useState([]);
    const [selectedMonths, setSelectedMonths] = useState([]);

    const [sortOrder, setSortOrder] = useState("Terbaru");

    // dropdown open/close
    const [openDivMenu, setOpenDivMenu] = useState(false);
    const [openMonMenu, setOpenMonMenu] = useState(false);

    const navigate = useNavigate();
    const divMenuRef = useRef();
    const monMenuRef = useRef();

    // ambil data artikel
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
                    } catch {}
                    return {
                        id: item.id,
                        title: item.judul ?? "Tanpa Judul",
                        description: item.deskripsi ?? "",
                        divisi: item.nama_divisi,
                        image,
                        date: new Date(item.tanggal_upload),
                        tanggal_upload: item.tanggal_upload,
                        monthName:
                            months[
                                new Date(item.tanggal_upload).getMonth() + 1
                            ],
                    };
                });
                setArticles(cleaned);
                setFilteredArticles(cleaned);
            })
            .catch((err) => console.error(err));
    }, []);

    // filter & sort
    useEffect(() => {
        let filtered = articles;

        if (selectedDivisions.length > 0) {
            filtered = filtered.filter((a) =>
                selectedDivisions.includes(a.divisi)
            );
        }

        if (selectedMonths.length > 0) {
            filtered = filtered.filter((a) =>
                selectedMonths.includes(a.monthName)
            );
        }

        // ✅ Perbaikan di sini
        filtered.sort((a, b) =>
            sortOrder === "Terlama"
                ? new Date(b.tanggal_upload) - new Date(a.tanggal_upload)
                : new Date(a.tanggal_upload) - new Date(b.tanggal_upload)
        );

        setFilteredArticles(filtered);
    }, [articles, selectedDivisions, selectedMonths, sortOrder]);

    // toggle functions
    const toggleDivision = (div) => {
        setSelectedDivisions((prev) =>
            prev.includes(div) ? prev.filter((d) => d !== div) : [...prev, div]
        );
    };
    const toggleMonth = (mon) => {
        setSelectedMonths((prev) =>
            prev.includes(mon) ? prev.filter((m) => m !== mon) : [...prev, mon]
        );
    };

    // close dropdown kalau klik di luar
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (divMenuRef.current && !divMenuRef.current.contains(e.target)) {
                setOpenDivMenu(false);
            }
            if (monMenuRef.current && !monMenuRef.current.contains(e.target)) {
                setOpenMonMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const highlighted = filteredArticles[0];
    const rest = filteredArticles.slice(1);

    return (
        <section>
            {/* Parallax Slider */}
            <div className="relative w-full h-[30rem] lg:h-[32rem]">
                <Swiper
                    modules={[Parallax, Autoplay, Navigation]}
                    speed={1000}
                    parallax
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                    className="w-full h-full"
                >
                    {(filteredArticles.length ? filteredArticles : articles)
                        .slice(0, 5)
                        .map((article, i) => (
                            <SwiperSlide key={article.id + i}>
                                <div
                                    onClick={() =>
                                        navigate(`/article/${article.id}`)
                                    }
                                    className="h-full w-full bg-cover bg-center relative text-white flex flex-col justify-end px-6 py-12 sm:px-12 cursor-pointer"
                                    style={{
                                        backgroundImage: `url(${article.image})`,
                                    }}
                                >
                                    <div className="absolute inset-0 bg-black/50" />
                                    <div
                                        className="relative z-10"
                                        data-swiper-parallax="-200"
                                    >
                                        <span className="inline-block text-xs bg-red-500 text-white px-2 py-1 rounded-full mb-2">
                                            {article.divisi}
                                        </span>
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                                            {article.title}
                                        </h2>
                                        <p
                                            className="max-w-3xl text-gray-200 text-sm sm:text-base md:text-lg"
                                            data-swiper-parallax="-100"
                                        >
                                            {article.description.slice(0, 250)}
                                            ...
                                        </p>
                                        <div className="mt-4 flex items-center text-sm text-gray-300">
                                            <Calendar
                                                size={16}
                                                className="mr-2"
                                            />
                                            {article.date.toLocaleDateString(
                                                "id-ID",
                                                {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    <div className="custom-prev absolute left-12 top-1/2 -translate-y-1/2 text-white text-3xl cursor-pointer z-20 hover:text-gray-300">
                        ❮
                    </div>
                    <div className="custom-next absolute right-12 top-1/2 -translate-y-1/2 text-white text-3xl cursor-pointer z-20 hover:text-gray-300">
                        ❯
                    </div>
                </Swiper>
            </div>

            {/* Filter Section */}
            <div className="bg-white py-6 px-4 sm:px-12 border-b border-gray-200">
                <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-4 sm:gap-6">
                    {/* Filter Title */}
                    <div className="flex items-center gap-2">
                        <Filter size={20} className="text-gray-600" />
                        <span className="text-gray-800 font-semibold text-lg">
                            Filter
                        </span>
                    </div>

                    {/* Sort Buttons */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-gray-600 text-sm">Urutkan:</span>
                        {["Terbaru", "Terlama"].map((label) => (
                            <button
                                key={label}
                                onClick={() => setSortOrder(label)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out ${
                                    sortOrder === label
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Dropdown Divisi */}
                    <div className="relative" ref={divMenuRef}>
                        <button
                            onClick={() => setOpenDivMenu((o) => !o)}
                            className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm transition-all duration-300 ease-in-out"
                        >
                            <span className="text-sm text-gray-700">
                                {selectedDivisions.length > 0
                                    ? selectedDivisions.join(", ")
                                    : "Semua Divisi"}
                            </span>
                            <ChevronDown size={16} className="text-gray-400" />
                        </button>
                        {openDivMenu && (
                            <div className="absolute mt-2 w-48 bg-white rounded-xl shadow-lg p-4 z-10 transition-all duration-300 ease-in-out">
                                {DIVISION_ORDER.map((div) => (
                                    <label
                                        key={div}
                                        className="flex items-center gap-2 mb-2 last:mb-0 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedDivisions.includes(
                                                div
                                            )}
                                            onChange={() => toggleDivision(div)}
                                            className="form-checkbox h-4 w-4 rounded text-green-500"
                                        />
                                        <span className="text-sm text-gray-800">
                                            {div}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Dropdown Bulan */}
                    <div className="relative" ref={monMenuRef}>
                        <button
                            onClick={() => setOpenMonMenu((o) => !o)}
                            className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm transition-all duration-300 ease-in-out"
                        >
                            <span className="text-sm text-gray-700">
                                {selectedMonths.length > 0
                                    ? selectedMonths.join(", ")
                                    : "Semua Bulan"}
                            </span>
                            <ChevronDown size={16} className="text-gray-400" />
                        </button>
                        {openMonMenu && (
                            <div className="absolute mt-2 w-48 max-h-56 overflow-auto bg-white rounded-xl shadow-lg p-4 z-10 transition-all duration-300 ease-in-out">
                                {months.slice(1).map((mon) => (
                                    <label
                                        key={mon}
                                        className="flex items-center gap-2 mb-2 last:mb-0 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedMonths.includes(
                                                mon
                                            )}
                                            onChange={() => toggleMonth(mon)}
                                            className="form-checkbox h-4 w-4 rounded text-green-500"
                                        />
                                        <span className="text-sm text-gray-800">
                                            {mon}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Artikel Ditemukan */}
                    <div className="sm:ml-auto">
                        <span className="text-sm text-gray-600 whitespace-nowrap">
                            {filteredArticles.length} artikel ditemukan
                        </span>
                    </div>
                </div>
            </div>

            {/* Articles Display */}
            <div className="bg-white py-10 px-6 sm:px-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        {selectedDivisions.length === 0
                            ? "Semua Artikel"
                            : `Artikel (${selectedDivisions.join(", ")})`}
                    </h2>
                    {selectedDivisions.length > 0 && (
                        <button
                            onClick={() => setSelectedDivisions([])}
                            className="text-sm text-gray-600 hover:text-gray-800 underline"
                        >
                            Tampilkan Semua
                        </button>
                    )}
                </div>

                {filteredArticles.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                        <div className="text-gray-400 text-6xl mb-4">📰</div>
                        <p className="text-gray-600 text-lg mb-2">
                            Tidak ada artikel yang ditemukan
                        </p>
                        <p className="text-gray-500 text-sm">
                            Coba ubah filter atau pilih kategori lain
                        </p>
                    </div>
                ) : (
                    <>
                        {highlighted && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                onClick={() =>
                                    navigate(`/article/${highlighted.id}`)
                                }
                                className="cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden mb-8 transition-transform hover:shadow-xl hover:scale-[1.02]"
                            >
                                <div className="flex flex-col lg:flex-row">
                                    <div className="lg:w-1/2">
                                        <img
                                            src={highlighted.image}
                                            alt={highlighted.title}
                                            className="w-full h-64 lg:h-80 object-cover"
                                        />
                                    </div>
                                    <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                                        <span className="inline-block mb-3 text-sm text-red-500 font-semibold bg-red-100 px-3 py-1 rounded-full">
                                            {highlighted.divisi}
                                        </span>
                                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                                            {highlighted.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {highlighted.description.slice(
                                                0,
                                                300
                                            )}
                                            ...
                                        </p>
                                        <div className="mt-4 flex items-center text-sm text-gray-500">
                                            <Calendar
                                                size={16}
                                                className="mr-2"
                                            />
                                            {highlighted.date.toLocaleDateString(
                                                "id-ID",
                                                {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {rest.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {rest.map((article, i) => (
                                    <motion.div
                                        key={article.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: i * 0.1,
                                        }}
                                        onClick={() =>
                                            navigate(`/article/${article.id}`)
                                        }
                                        className="cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:shadow-xl hover:scale-[1.02]"
                                    >
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-6">
                                            <span className="inline-block mb-3 text-xs text-red-500 font-semibold bg-red-100 px-2 py-1 rounded-full">
                                                {article.divisi}
                                            </span>
                                            <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                                                {article.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                                {article.description}
                                            </p>
                                            <div className="flex items-center text-xs text-gray-500">
                                                <Calendar
                                                    size={14}
                                                    className="mr-2"
                                                />
                                                {article.date.toLocaleDateString(
                                                    "id-ID",
                                                    {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
