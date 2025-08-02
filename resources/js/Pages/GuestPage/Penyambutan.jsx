import AnimatedContent from "../../Components/AnimatedContent";

export default function Penyambutan() {
    return (
        <div className="bg-gradient-to-b from-white to-green-50 w-full text-gray-800 px-6 md:px-24 py-16">
            <AnimatedContent
                direction="horizontal"
                ease="power3.out"
                reverse={false}
                duration={1.5}
            >
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 p-4">
                    <div className="w-full md:w-1/2">
                        <p className="text-gray-700 font-Inter text-justify leading-relaxed mb-6">
                            <strong className="text-emerald-600">
                                Layanan Tamu
                            </strong>{" "}
                            adalah
                            <span className="italic">
                                {" "}
                                fasilitas digital
                            </span>{" "}
                            yang disediakan oleh PPM BKI Semarang untuk
                            memudahkan Anda melakukan pemesanan kamar inap
                            secara daring.
                            <br />
                            <br />
                            Anda dapat memesan kamar untuk berbagai kebutuhan,
                            mulai dari kegiatan, keperluan pribadi, hingga
                            kunjungan resmi. Nikmati proses pemesanan yang cepat
                            dan efisien.
                        </p>
                        <button className="bg-emerald-500 cursor-pointer hover:bg-teal-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16l-4-4m0 0l4-4m-4 4h16"
                                />
                            </svg>
                            Pesan Kamar Sekarang
                        </button>
                    </div>
                    <div className="w-full md:w-1/2">
                        <img
                            src="/images/KamarTamu.png"
                            alt="Kamar PPM"
                            className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </AnimatedContent>
        </div>
    );
}
