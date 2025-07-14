import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShinyText from "../../Components/ShinyText";
import TiltedCard from "../../Components/TiltedCard";
import AnimatedContent from "../../Components/AnimatedContent";
import FadeContent from "../../Components/FadeContent";
import { FaSpinner } from "react-icons/fa";
import CommentArticle from "../../Components/CommentArticle";

export default function MainArticle() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`https://ppmbki.ponpes.id/api/article/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setArticle(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error:", err);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (id) {
            fetch(`https://ppmbki.ponpes.id/api/article/${id}/comments`)
                .then((res) => res.json())
                .then((data) => setComments(data.data || []))
                .catch((err) => console.error("Gagal ambil komentar:", err));
        }
    }, [id]);

    if (loading || !article) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <FaSpinner className="animate-spin text-emerald-500 text-4xl mb-4" />
                <p className="text-gray-600 font-Inter text-sm">
                    Memuat data artikel...
                </p>
            </div>
        );
    }

    let imageUrl = "";
    try {
        const parsedFoto = JSON.parse(article.foto);
        if (Array.isArray(parsedFoto) && parsedFoto.length > 0) {
            imageUrl = `https://ppmbki.ponpes.id/storage/${parsedFoto[0]}`;
        }
    } catch (error) {
        console.warn("Gagal parse foto:", article.foto, error);
    }

    return (
        <div className="w-full font-Inter overflow-x-hidden bg-white">
            {/* Hero Section */}
            <div className="w-full pt-30 py-16 px-6 md:px-20 text-center bg-gradient-to-br from-emerald-50 to-white">
                <AnimatedContent>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                        <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shine_4s_linear_infinite]">
                            {article.judul}
                        </span>
                    </h1>
                </AnimatedContent>
                <FadeContent blur={true}>
                    <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500 italic">
                        <p>
                            {article.tanggal_upload || "Tanggal tidak tersedia"}
                        </p>
                        <p>|</p>
                        <p>{article.nama_divisi || "Divisi tidak tersedia"}</p>
                    </div>
                </FadeContent>
            </div>

            {/* Gambar Utama */}
            {imageUrl && (
                <div className="w-full max-w-6xl mx-auto mt-10 mb-16 px-4 md:px-8">
                    <div className="flex justify-center">
                        <TiltedCard
                            imageSrc={imageUrl}
                            rotateAmplitude={10}
                            scaleOnHover={1}
                            containerHeight="400px"
                            containerWidth="100%"
                            imageHeight="100%"
                            imageWidth="100%"
                            showMobileWarning={false}
                            showTooltip={true}
                            displayOverlayContent={true}
                        />
                    </div>
                </div>
            )}

            {/* Deskripsi */}
            <div className="max-w-4xl mx-auto px-4 md:px-8 mb-20">
                <h2 className="text-xl md:text-2xl font-semibold text-emerald-700 mb-4">
                    Deskripsi
                </h2>
                <p className="text-gray-800 leading-relaxed text-justify whitespace-pre-line text-sm md:text-base">
                    {article.deskripsi}
                </p>
            </div>

            {/* Galeri */}
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
                <FadeContent>
                    <h3 className="text-xl font-bold text-center mb-4 text-emerald-700">
                        Galeri Artikel
                    </h3>
                    <p className="text-center text-gray-500 max-w-2xl mx-auto text-sm md:text-base mb-8">
                        Dokumentasi kegiatan event ini yang memperlihatkan
                        semangat dan kebersamaan para santri.
                    </p>
                </FadeContent>

                {(() => {
                    let gallery = [];
                    try {
                        const parsedFoto = JSON.parse(article.foto);
                        if (
                            Array.isArray(parsedFoto) &&
                            parsedFoto.length > 0
                        ) {
                            gallery = parsedFoto;
                        }
                    } catch (e) {
                        console.warn("Galeri tidak valid:", e);
                    }

                    return gallery.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {gallery.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={`https://ppmbki.ponpes.id/storage/${img}`}
                                    alt={`Galeri ${idx + 1}`}
                                    className="w-full h-60 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400 italic">
                            Belum ada dokumentasi yang tersedia.
                        </p>
                    );
                })()}
            </div>

            {/* Komentar */}
            <CommentArticle articleId={id} />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
