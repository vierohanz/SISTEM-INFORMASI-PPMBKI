import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShinyText from "../../Components/ShinyText";
import TiltedCard from "../../Components/TiltedCard";
import AnimatedContent from "../../Components/AnimatedContent";
import FadeContent from "../../Components/FadeContent";
import { FaSpinner } from "react-icons/fa";
import CommentsEvent from "../../Components/CommentEvent";
export default function MainEvent() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyTo, setReplyTo] = useState(null);
    const [nama, setNama] = useState("");

    useEffect(() => {
        fetch(`https://ppmbki.ponpes.id/api/event/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setEvent(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error:", err);
                setLoading(false);
            });
    }, [id]);

    const fetchComments = () => {
        fetch(`https://ppmbki.ponpes.id/api/event/${id}/comments`)
            .then((res) => res.json())
            .then((data) => setComments(data.data || []))
            .catch((err) => console.error("Gagal ambil komentar:", err));
    };

    useEffect(() => {
        if (id) {
            fetchComments();
        }
    }, [id]);

    const renderReplies = (replies = []) =>
        replies.map((reply) => (
            <div key={reply.id} className="ml-12 mt-4 flex gap-3 items-start">
                <img
                    src="/images/default.png"
                    className="w-7 h-7 rounded-full object-cover"
                    alt="Avatar"
                />
                <div className="bg-gray-50 p-3 rounded-xl w-full shadow-sm">
                    <p className="text-sm font-medium text-gray-800 mb-1">
                        @{reply.nama}
                    </p>
                    <p className="text-sm text-gray-700">{reply.konten}</p>
                    <button
                        onClick={() => setReplyTo(reply.id)}
                        className="text-xs mt-2 text-emerald-600 hover:underline"
                    >
                        Balas
                    </button>
                    {reply.replies && reply.replies.length > 0 && (
                        <div className="mt-2">
                            {renderReplies(reply.replies)}
                        </div>
                    )}
                </div>
            </div>
        ));
    if (loading || !event) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <FaSpinner className="animate-spin text-emerald-500 text-4xl mb-4" />
                <p className="text-gray-600 font-Inter text-sm">
                    Memuat data event...
                </p>
            </div>
        );
    }

    let imageUrl = "";
    try {
        const parsedFoto = JSON.parse(event.foto);
        if (Array.isArray(parsedFoto) && parsedFoto.length > 0) {
            imageUrl = `https://ppmbki.ponpes.id/storage/${parsedFoto[0]}`;
        }
    } catch (error) {
        console.warn("Gagal parse foto:", event.foto, error);
    }

    return (
        <div className="w-full font-Inter overflow-x-hidden">
            {/* Hero Section */}
            <div className="w-full h-[250px] md:h-[500px] flex flex-col justify-center items-center text-center bg-[url('/images/MainEvent.png')] bg-no-repeat bg-cover bg-center">
                <AnimatedContent>
                    <h1 className="text-4xl font-Inter md:text-6xl font-bold text-white drop-shadow-md">
                        <ShinyText
                            text={event.judul}
                            disabled={false}
                            speed={3}
                        />
                    </h1>
                </AnimatedContent>
                <FadeContent blur={true}>
                    <p className="text-white font-Inter text-lg md:text-2xl mt-2">
                        {event.tahun || "Event Terbaru"}
                    </p>
                </FadeContent>
            </div>
            {/* Deskripsi dan Tilted Image */}
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <AnimatedContent direction="horizontal" reverse={true}>
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent mb-4">
                            {event.judul}
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-line text-sm md:text-base">
                            {event.deskripsi}
                        </p>
                    </div>
                </AnimatedContent>
                <AnimatedContent direction="horizontal">
                    {imageUrl && (
                        <div className="flex justify-center">
                            <TiltedCard
                                imageSrc={imageUrl}
                                rotateAmplitude={12}
                                scaleOnHover={1}
                                containerHeight="280px"
                                containerWidth="400px"
                                imageHeight="250px"
                                imageWidth="400px"
                                showMobileWarning={false}
                                showTooltip={true}
                                displayOverlayContent={true}
                            />
                        </div>
                    )}
                </AnimatedContent>
            </div>
            {/* Galeri */}
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
                <FadeContent>
                    <h3 className="text-xl font-bold text-center mb-4 text-emerald-700">
                        Galeri Event
                    </h3>
                    <p className="text-center text-gray-500 max-w-2xl mx-auto text-sm md:text-base mb-8">
                        Dokumentasi kegiatan event ini yang memperlihatkan
                        semangat dan kebersamaan para santri.
                    </p>
                </FadeContent>
                {(() => {
                    let gallery = [];
                    try {
                        const parsedFoto = JSON.parse(event.foto);
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {gallery.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={`https://ppmbki.ponpes.id/storage/${img}`}
                                    alt={`Galeri ${idx + 1}`}
                                    className="w-full hover:scale-105 duration-300 transition-all cursor-pointer h-60 object-cover rounded-lg shadow-md"
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
            <CommentsEvent eventId={id} />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
