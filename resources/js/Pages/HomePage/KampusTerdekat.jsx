import FadeContent from "../../Components/FadeContent";
import RunningLogos from "../../Components/RunningLogos";

const kampusTerdekat = [
    { src: "/images/LogoUdinus.png", name: "UDINUS", jarak: "±9 Km" },
    { src: "/images/logoUnnes.png", name: "UNNES", jarak: "±12 Km" },
    { src: "/images/logoPoltekkes.png", name: "POLTEKKES", jarak: "500 m" },
    { src: "/images/logoUndip.png", name: "UNDIP", jarak: "700 m" },
    { src: "/images/logoPolines.png", name: "POLINES", jarak: "600 m" },
    { src: "/images/logoUnissula.png", name: "UNISSULA", jarak: "±9 Km" },
];

export default function KampusTerdekat() {
    return (
        <section className="flex flex-col justify-center items-center mt-45 lg:mt-0">
            <div className="w-full flex flex-col items-center text-center mb-8 px-4 sm:px-6 md:px-0">
                <FadeContent>
                    <h1 className="text-black font-bold font-Inter text-2xl sm:text-3xl md:text-4xl mb-2">
                        Kampus Terdekat
                    </h1>
                </FadeContent>
                <FadeContent>
                    <p className="text-gray-600 mt-2 text-base sm:text-lg md:text-xl font-Inter max-w-xl">
                        Berikut adalah kampus-kampus terdekat yang dapat menjadi
                        pengembangan diri bagi santri PPM BKI Semarang.
                    </p>
                </FadeContent>
            </div>

            <div className="flex w-full bg-green-200 justify-center items-center gap-3 mt-4 flex-wrap">
                <RunningLogos data={kampusTerdekat} />
            </div>
        </section>
    );
}
