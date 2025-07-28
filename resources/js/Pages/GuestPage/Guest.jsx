import { useState } from "react";
import { FaBook, FaBookOpen, FaGraduationCap, FaMosque } from "react-icons/fa";
import AnimatedContent from "../../Components/AnimatedContent";
import ShinyText from "../../Components/ShinyText";
import axios from "axios";

export default function Guest() {
    const [formData, setFormData] = useState({
        nama_tamu: "",
        phone: "",
        tanggal_datang: "",
        tanggal_keluar: "",
        kuantitas: "",
        deskripsi: "",
    });

    const userId = 1; // ganti dengan ID tamu yang sesuai

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `http://localhost:8000/api/tamu/${userId}/booking`,
                formData
            );
            alert("✅ Booking berhasil: " + res.data.message);
        } catch (error) {
            console.error(error);
            alert("❌ Gagal booking, cek isian dan koneksi.");
        }
    };

    return (
        <div className="w-full font-Inter overflow-x-hidden">
            {/* Hero Section */}
            <div className="w-full h-[250px] md:h-[570px] flex flex-col justify-center items-center text-center bg-[url('/images/MainEvent.png')] bg-no-repeat bg-cover bg-center">
                <AnimatedContent>
                    <h1 className="text-4xl md:text-8xl font-bold text-white">
                        <ShinyText
                            text="Layanan Tamu"
                            disabled={false}
                            speed={3}
                            className="pb-2"
                        />
                    </h1>
                </AnimatedContent>
                <AnimatedContent>
                    <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl mt-2 tracking-widest font-semibold italic text-white">
                        P P M{" "}
                        <span className="px-2 sm:px-3 md:px-4 lg:px-5">
                            B K I
                        </span>{" "}
                        S E M A R A N G
                    </p>
                </AnimatedContent>
            </div>

            {/* Section Penyambutan */}
            <div className="mt-10 bg-gradient-to-b from-white to-green-50 w-full text-gray-800 px-6 md:px-24">
                <AnimatedContent
                    direction="horizontal"
                    ease="power3.out"
                    reverse={true}
                    duration={1.5}
                >
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            Selamat Datang di Layanan Tamu PPM BKI Semarang
                        </h2>
                        <h3 className="whitespace-pre-line text-2xl md:text-xl italic mb-4">
                            {`Kami dengan senang hati menyambut kehadiran anda di Pondok Pesantren\nMahasiswa Bina Khoirul Insan Semarang`}
                        </h3>
                    </div>
                </AnimatedContent>
            </div>

            {/* Section Deskripsi dan Form */}
            <div className="mt-10 bg-gradient-to-r from-white to-green-50 w-full px-6 md:px-24">
                <AnimatedContent
                    direction="horizontal"
                    ease="power3.out"
                    reverse={false}
                    duration={1.5}
                >
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 p-4 md:p-12">
                        {/* Teks & Tombol */}
                        <div className="w-full md:w-1/2">
                            <p className="text-justify leading-relaxed mb-4">
                                Layanan Tamu adalah{" "}
                                <span className="italic">fasilitas</span> yang
                                disediakan oleh PPM BKI Semarang untuk
                                memudahkan para tamu dalam melakukan pemesanan
                                kamar inap secara daring.
                                <br />
                                <br />
                                Anda dapat memesan kamar untuk kunjungan selama
                                beberapa hari, baik dalam rangka kegiatan,
                                keperluan pribadi, maupun kunjungan resmi
                                lainnya.
                            </p>
                            <button className="bg-emerald-500 hover:bg-teal-400 text-white font-normal py-2 px-6 rounded-full transition duration-300">
                                Pesan Kamar Sekarang
                            </button>
                        </div>

                        {/* Gambar */}
                        <div className="w-full md:w-1/2">
                            <img
                                src="/images/KamarTamu.png"
                                alt="Kamar PPM"
                                className="w-full rounded shadow-lg"
                            />
                        </div>
                    </div>
                </AnimatedContent>
            </div>

            {/* Form Booking */}
            <div className="bg-white py-10 px-6 md:px-24">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
                    Form Booking Tamu
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="max-w-3xl mx-auto space-y-4"
                >
                    <input
                        name="nama_tamu"
                        value={formData.nama_tamu}
                        onChange={handleChange}
                        placeholder="Nama Tamu"
                        className="w-full px-4 py-2 border rounded"
                        required
                    />

                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Nomor Telepon"
                        className="w-full px-4 py-2 border rounded"
                        required
                    />

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex flex-col w-full">
                            <label
                                htmlFor="tanggal_datang"
                                className="mb-1 text-sm text-gray-700"
                            >
                                Tanggal Datang
                            </label>
                            <input
                                type="date"
                                id="tanggal_datang"
                                name="tanggal_datang"
                                value={formData.tanggal_datang}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label
                                htmlFor="tanggal_keluar"
                                className="mb-1 text-sm text-gray-700"
                            >
                                Tanggal Keluar
                            </label>
                            <input
                                type="date"
                                id="tanggal_keluar"
                                name="tanggal_keluar"
                                value={formData.tanggal_keluar}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                        </div>
                    </div>

                    <input
                        type="number"
                        name="kuantitas"
                        value={formData.kuantitas}
                        onChange={handleChange}
                        placeholder="Jumlah Pengikut"
                        className="w-full px-4 py-2 border rounded"
                        required
                    />

                    <textarea
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        placeholder="Deskripsi"
                        rows="4"
                        className="w-full px-4 py-2 border rounded"
                        required
                    ></textarea>

                    <button
                        type="submit"
                        className="bg-emerald-500 hover:bg-teal-400 text-white px-6 py-2 rounded"
                    >
                        Kirim Booking
                    </button>
                </form>
            </div>
        </div>
    );
}
