import AnimatedContent from "../../Components/AnimatedContent";
import Aurora from "../../Components/Aurora";
import FadeContent from "../../Components/FadeContent";
import TiltedCard from "../../Components/TiltedCard";
import Advertation from "./Adsvertation";
import ArtikelTerkini from "./ArtikelTerkini";
import EventTerkini from "./EventTerkini";
import EventBulan from "./EventTerkini";
import GaleriKegiatan from "./GaleriKegiatan";
import KampusTerdekat from "./KampusTerdekat";
import Statistik from "./Statistik";
import { motion } from "framer-motion";

export default function Home({ url }) {
    return (
        <section className="overflow-x-hidden overflow-y-hidden z-50">
            <div className="relative bg-white scroll-x- mb-30 mt-20">
                <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] sm:top-[-250px] sm:left-[-250px] sm:w-[800px] sm:h-[750px] bg-teal-100 rounded-full opacity-50 blur-3xl z-0"></div>

                <div className="absolute z-5 bottom-1 right-[-10px] w-[400px] h-[400px] sm:bottom-[-300px] sm:right-[-300px] sm:w-[780px] sm:h-[700px] bg-teal-100 rounded-full opacity-50 blur-3xl"></div>

                <div className="flex flex-col lg:flex-row justify-between  items-center gap-4 px-4 md:pl-18 pt-12 md:pt-0">
                    <AnimatedContent
                        direction="horizontal"
                        ease="power3.out"
                        duration={1.5}
                        reverse="true"
                        className="space-y-3 md:space-y-6 w-full md:w-1/2 z-10 text-center md:text-left  md:ml-10"
                    >
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-6xl font-Inter font-bold text-gray-900 ">
                                Selamat Datang di
                            </h1>
                            <h2 className="text-4xl md:text-5xl font-Inter  font-light text-gray-900">
                                PPM BKI Semarang
                            </h2>

                            <div className="flex justify-center pb-9 pt-4 md:justify-start">
                                <svg
                                    width="80%"
                                    height="70"
                                    viewBox="0 0 500 50"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <defs>
                                        <linearGradient
                                            id="customGradient"
                                            x1="0"
                                            y1="0"
                                            x2="1"
                                            y2="0"
                                        >
                                            <stop
                                                offset="50%"
                                                stopColor="#10B981"
                                            />
                                            <stop
                                                offset="90%"
                                                stopColor="#2DD4BF"
                                            />
                                        </linearGradient>
                                    </defs>

                                    <path
                                        d="M0 10 C 150 30, 350 30, 500 10"
                                        stroke="url(#customGradient)"
                                        strokeWidth="6"
                                        fill="none"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>

                            <p className="text-gray-800 font-Inter text-base md:text-base font-medium leading-relaxed tracking-wide max-w-2xl mx-auto md:mx-0">
                                <span className="font-semibold font-Inter text-teal-600">
                                    PPM BKI Semarang
                                </span>{" "}
                                berkomitmen mencetak generasi{" "}
                                <span className="italic font-Inter text-gray-700">
                                    unggul, profesional religius, dan
                                    berakhlakul karimah
                                </span>
                                , yang siap bersaing di era global dengan tetap
                                menjunjung tinggi nilai-nilai{" "}
                                <span className="font-semibold font-Inter text-teal-600">
                                    keislaman
                                </span>{" "}
                                dan{" "}
                                <span className="font-semibold font-Inter text-teal-600">
                                    kebangsaan
                                </span>
                                .
                            </p>
                        </div>
                    </AnimatedContent>

                    {/* IMAGE MOBILE */}
                    <div className="flex md:hidden w-full z-10 justify-center relative mt-10 mb-6">
                        <motion.div className="relative w-[85%]  mx-auto h-[300px] sm:h-[350px]">
                            <AnimatedContent
                                direction="horizontal"
                                ease="power3.out"
                                reverse={false}
                                duration={1.5}
                                className=""
                            >
                                <img
                                    src="/images/mainhero.png"
                                    alt="Hero Mobile"
                                    className="  object-contain"
                                />
                            </AnimatedContent>

                            <FadeContent duration={2}>
                                <motion.img
                                    src="/images/particle1.png"
                                    alt="Partikel"
                                    whileHover={{ scale: 1.1 }}
                                    className="absolute top-[5px] left-[-29px] w-25 h-12"
                                />

                                <motion.img
                                    src="/images/particle2.png"
                                    alt="Partikel"
                                    whileHover={{ scale: 1.1 }}
                                    className="absolute top-[60px] left-[-20px] w-30 h-12"
                                />
                                <motion.img
                                    src="/images/particle3.png"
                                    alt="Partikel"
                                    whileHover={{ scale: 1.1 }}
                                    className="absolute bottom-[-70px] left-[-6px]  w-20 h-15"
                                />
                                <motion.img
                                    src="/images/particle4.png"
                                    alt="Partikel"
                                    whileHover={{ scale: 1.1 }}
                                    className="absolute bottom-0 right-[-35px] w-25 h-20"
                                />

                                <motion.img
                                    src="/images/particle6.png"
                                    alt="Contoh Gambar"
                                    whileHover={{ scale: 1.3, x: -10 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                    className="absolute rounded-lg w-auto h-15 md:h-18 top-80 md:top-112 right-[-30px] md:right-20"
                                />
                            </FadeContent>
                        </motion.div>
                    </div>

                    {/* IMAGE DESKTOP */}
                    <div className="hidden md:flex w-full z-10 md:w-1/2 h-screen md:h-150 m-2 md:ml-9 justify-center items-center relative">
                        <AnimatedContent
                            direction="horizontal"
                            ease="power3.out"
                            reverse={false}
                            duration={1.5}
                            className=""
                        >
                            <motion.div className="img">
                                <TiltedCard
                                    imageSrc="/images/mainhero.png"
                                    rotateAmplitude={12}
                                    scaleOnHover={1}
                                    containerHeight="500px"
                                    containerWidth="400px"
                                    imageHeight="500px"
                                    imageWidth="400px"
                                    showMobileWarning={false}
                                    showTooltip={true}
                                    displayOverlayContent={true}
                                />
                            </motion.div>
                        </AnimatedContent>

                        <motion.img
                            src="/images/particle1.png"
                            alt="Contoh Gambar"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.0, x: -10 }}
                            transition={{
                                duration: 0.5,
                                ease: [0.68, -0.55, 0.265, 1.55],
                            }}
                            className="absolute animate-bounce rounded-lg w-auto h-8 md:h-20 top-8 md:top-[5rem] right-10 md:right-[24rem] "
                        />

                        <motion.img
                            src="/images/particle2.png"
                            alt="Contoh Gambar"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.0, x: -10 }}
                            transition={{
                                duration: 0.5,
                                ease: [0.68, -0.55, 0.265, 1.55],
                            }}
                            className="absolute rounded-lg w-auto h-6 md:h-14 top-8 md:top-[10rem] right-10 md:right-[23rem]"
                        />
                        <motion.img
                            src="/images/particle3.png"
                            alt="Contoh Gambar"
                            transition={{
                                duration: 0.5,
                                ease: [0.68, -0.55, 0.265, 1.55],
                            }}
                            whileHover={{ scale: 1.2, rotate: -15 }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute rounded-lg w-auto h-8 md:h-18 top-28 md:top-[7rem] right-12 md:right-[2rem]"
                        />
                        <motion.img
                            src="/images/particle4.png"
                            alt="Contoh Gambar"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{
                                duration: 0.5,
                                ease: [0.68, -0.55, 0.265, 1.55],
                            }}
                            className="absolute rounded-lg w-auto h-12 md:h-24 top-28 md:top-[18rem] right-12 md:right-[1rem]"
                        />
                        <motion.img
                            src="/images/particle5.png"
                            alt="Contoh Gambar"
                            whileHover={{ scale: 1.2, rotate: 17 }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.5,
                                ease: [0.68, -0.55, 0.265, 1.55],
                            }}
                            className="absolute rounded-lg w-auto h-10 md:h-27 top-44 md:top-[27rem] right-10 md:right-[25rem]"
                        />
                        <motion.img
                            src="/images/particle6.png"
                            alt="Contoh Gambar"
                            transition={{
                                duration: 0.5,
                                ease: [0.68, -0.55, 0.265, 1.55],
                            }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.3, x: -10 }}
                            className="absolute rounded-lg w-auto h-10 md:h-18 top-28 md:top-[32rem] right-12 md:right-[1rem]"
                        />
                    </div>
                </div>
            </div>

            <KampusTerdekat />
            <Statistik />
            <EventTerkini />
            <Advertation />
            <ArtikelTerkini />
            <GaleriKegiatan />
        </section>
    );
}
