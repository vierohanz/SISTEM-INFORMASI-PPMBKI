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
                <div className="flex justify-between items-center gap-2 px-10">
                    <div className="flex flex-col w-1/2 items-start justify-start">
                        <h1 className="flex text-black text-6xl gap-2 font-bold">
                            Selamat Datang{" "}
                            <span className="font-light">di</span>
                        </h1>
                        <h2 className="text-black font-light text-6xl">
                            PPM BKI Semarang
                        </h2>
                        <div className="w-3/4 h-1 bg-green-500 rounded-full my-10" />
                        <p className="text-black font-semibold text-lg">
                            PPM BKI Semarang Berkomitmen Mencetak Generasi
                            Unggul, Profesional Religius, dan Berakhlakul
                            Karimah
                        </p>
                    </div>

                    <div className="flex w-1/2 h-150 m-2">
                        <motion.div className="img">
                            <img
                                src="/images/mainhero.png"
                                alt="tampak depan ppm"
                                className="w-auto h-142 flex md:px-20"
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
