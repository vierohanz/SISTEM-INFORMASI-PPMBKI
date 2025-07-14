// src/Components/CommentsSection.jsx

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function CommentArticle({ articleId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyTo, setReplyTo] = useState(null);
    const [nama, setNama] = useState("");

    const fetchComments = () => {
        fetch(`https://ppmbki.ponpes.id/api/article/${articleId}/comments`)
            .then((res) => res.json())
            .then((data) => setComments(data.data || []))
            .catch((err) => console.error("Gagal ambil komentar:", err));
    };

    useEffect(() => {
        if (articleId) fetchComments();
    }, [articleId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment || !nama) {
            toast.error("Nama dan komentar tidak boleh kosong!");
            return;
        }

        const payload = {
            nama,
            konten: newComment,
            id_parent: replyTo,
        };

        try {
            const res = await fetch(
                `https://ppmbki.ponpes.id/api/article/${articleId}/comments`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            const data = await res.json();
            if (res.ok) {
                setNewComment("");
                setReplyTo(null);
                toast.success("Komentar berhasil dikirim!");
                fetchComments();
            } else {
                toast.error(data.message || "Gagal kirim komentar.");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat mengirim komentar.");
            console.error("Submit error:", error);
        }
    };

    const renderReplies = (replies = [], depth = 1) => {
        if (depth > 2) return null;

        return replies.map((reply) => (
            <div
                key={reply.id}
                className={`ml-${depth * 6} mt-3 flex gap-3 items-start`}
            >
                <img
                    src="/images/foto_kosong.jpg"
                    className="w-6 h-6 rounded-full object-cover"
                    alt="Avatar"
                />
                <div className="bg-gray-50 p-2 rounded-xl w-full shadow-sm">
                    <p className="text-sm font-medium text-gray-800 mb-1">
                        {reply.nama}
                    </p>
                    <p className="text-sm text-gray-700">{reply.konten}</p>
                    <button
                        onClick={() => setReplyTo(reply.id)}
                        className="text-xs mt-2 text-emerald-600 cursor-pointer hover:scale-105 duration-300 transition-all"
                    >
                        Balas
                    </button>
                    {reply.replies?.length > 0 &&
                        renderReplies(reply.replies, depth + 1)}
                </div>
            </div>
        ));
    };

    return (
        <div className="max-w-2xl mx-auto px-4 md:px-6 py-12 border-t mt-12">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Komentar</h3>
            <form className="space-y-3" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nama kamu"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />

                <textarea
                    rows="2"
                    placeholder={
                        replyTo ? "Balas komentar..." : "Tulis komentar kamu..."
                    }
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                {replyTo && (
                    <div className="text-xs text-gray-600">
                        Membalas komentar ID: <b>{replyTo}</b>{" "}
                        <button
                            type="button"
                            className="ml-2 text-red-500"
                            onClick={() => setReplyTo(null)}
                        >
                            Batal
                        </button>
                    </div>
                )}
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-md text-sm transition"
                    >
                        Kirim
                    </button>
                </div>
            </form>

            {/* Daftar Komentar */}
            <div className="space-y-6 mt-8">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-3">
                        <img
                            src="/images/foto_kosong.jpg"
                            className="w-9 h-9 rounded-full object-cover"
                            alt="Avatar"
                        />
                        <div className="w-full">
                            <div className="bg-gray-100 p-3 rounded-xl">
                                <p className="text-sm font-medium text-gray-800 mb-1">
                                    {comment.nama}
                                </p>
                                <p className="text-sm text-gray-700">
                                    {comment.konten}
                                </p>
                            </div>
                            <button
                                onClick={() => setReplyTo(comment.id)}
                                className="text-xs mt-2 text-emerald-600 cursor-pointer hover:scale-105 duration-300 transition-all"
                            >
                                Balas
                            </button>
                            {comment.replies?.length > 0 &&
                                renderReplies(comment.replies)}
                        </div>
                    </div>
                ))}
                {comments.length === 0 && (
                    <p className="text-center text-gray-400">
                        Belum ada komentar. Jadilah yang pertama!
                    </p>
                )}
            </div>
        </div>
    );
}
