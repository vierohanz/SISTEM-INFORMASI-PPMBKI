import ArtikelTerkini from "./ArtikelTerkini";
import EventTerkini from "./EventTerkini";
import EventBulan from "./EventTerkini";
import KampusTerdekat from "./KampusTerdekat";
import Statistik from "./Statistik";
import { motion } from "framer-motion";

export default function Home({ url }) {
    const kampusTerdekat = [
        { src: "/images/LogoUdinus.png", name: "UDINUS", jarak: "±9 Km" },
        { src: "/images/logoUnnes.png", name: "UNNES", jarak: "±12 Km" },
        { src: "/images/logoPoltekkes.png", name: "POLTEKKES", jarak: "500 m" },
        { src: "/images/logoUndip.png", name: "UNDIP", jarak: "700 m" },
        { src: "/images/logoPolines.png", name: "POLINES", jarak: "600 m" },
        { src: "/images/logoUnissula.png", name: "UNISSULA", jarak: "±9 Km" },
    ];

    const statistik = [
        { label: "JUMLAH SANTRI", value: 354 },
        { label: "JUMLAH GURU", value: 9 },
        { label: "LULUSAN MUBALIGH", value: 192 },
        { label: "SANTRI BERPRESTASI", value: 123 },
    ];

    return (
        <div>
            <section className="p-4 m-4 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between items-center gap-2 px-2 md:px-10">
                    {/* Desktop Hero */}
                    <div className=" md:flex flex-col w-full md:w-1/2 items-start justify-start mb-6 md:mb-0">
                        <h1 className="flex text-black text-4xl md:text-6xl gap-2 font-bold">
                            Selamat Datang di
                        </h1>
                        <h2 className="text-black font-light text-4xl md:text-6xl">
                            PPM BKI Semarang
                        </h2>
                        <div className="w-1/2 md:w-3/4 h-1 bg-green-500 rounded-full my-6 md:my-10" />
                        <p className="text-black font-semibold text-base md:text-lg">
                            PPM BKI Semarang Berkomitmen Mencetak Generasi
                            Unggul, Profesional Religius, dan Berakhlakul
                            Karimah
                        </p>
                    </div>

                    {/* Mobile Hero */}
                    <div className="flex md:hidden w-full justify-center items-center mb-6">
                        <img
                            src="/images/hero.png"
                            alt="Hero Mobile"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    <div className="hidden md:flex w-full md:w-1/2 h-60 md:h-150 m-2 md:ml-9 justify-center items-start relative">
                        <motion.div className="img">
                            <img
                                src="/images/mainhero.png"
                                alt="tampak depan ppm"
                                className="w-auto h-122 flex"
                            />
                        </motion.div>
                        <motion.div className="img">
                            <motion.img
                                src="/images/particle1.png"
                                alt="Contoh Gambar"
                                whileHover={{ scale: 1.0, x: -10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="absolute rounded-lg w-auto h-8 md:h-16 top-8 md:top-5 right-10 md:right-111"
                            />
                            <motion.img
                                src="/images/particle2.png"
                                alt="Contoh Gambar"
                                whileHover={{ scale: 1.0, x: -10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="absolute rounded-lg w-auto h-6 md:h-14 top-8 md:top-20 right-10 md:right-99"
                            />
                            <motion.img
                                src="/images/particle3.png"
                                alt="Contoh Gambar"
                                whileHover={{ scale: 1.2, rotate: -15 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="absolute rounded-lg w-auto h-8 md:h-18 top-28 md:top-27 right-12 md:right-20"
                            />
                            <motion.img
                                src="/images/particle4.png"
                                alt="Contoh Gambar"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="absolute rounded-lg w-auto h-12 md:h-24 top-28 md:top-62 right-12 md:right-20"
                            />
                            <motion.img
                                src="/images/particle5.png"
                                alt="Contoh Gambar"
                                whileHover={{ scale: 1.2, rotate: 17 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="absolute rounded-lg w-auto h-10 md:h-27 top-44 md:top-62 right-10 md:right-99"
                            />
                            <motion.img
                                src="/images/particle6.png"
                                alt="Contoh Gambar"
                                whileHover={{ scale: 1.3, x: -10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="absolute rounded-lg w-auto h-10 md:h-18 top-28 md:top-112 right-12 md:right-20"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
            <KampusTerdekat />
            <Statistik />
            <EventTerkini />
            <ArtikelTerkini />
        </div>
    );
}
