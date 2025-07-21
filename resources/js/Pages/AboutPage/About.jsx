import { FaBook, FaBookOpen, FaGraduationCap, FaMosque } from "react-icons/fa";
import AnimatedContent from "../../Components/AnimatedContent";
import ShinyText from "../../Components/ShinyText";
import { Icon } from "@iconify/react";
import { HoverEffect } from "../../Components/CardHoverEffect";
import FadeContent from "../../Components/FadeContent";
import RunningLogos from "../../Components/RunningLogos";
import { TextGenerateEffect } from "../../Components/text-generate-effect";
export default function About() {
    const listDivisi = [
        { src: "/images/kemahasiswaan.png", name: "KEMAHASISWAAN" },
        { src: "/images/KESEHATAN.png", name: "HSC" },
        { src: "/images/SPORT.png", name: "DIVOR" },
        { src: "/images/RT.png", name: "RUMAH TANGGA" },
        { src: "/images/kemandirian.png", name: "KEMANDIRIAN" },
        { src: "/images/HUMED.png", name: "HUMED" },
    ];
    return (
        <>
            <div className="w-full font-Inter overflow-x-hidden">
                {/* Hero Section */}
                <div className="w-full h-[250px] md:h-[570px] flex flex-col justify-center items-center text-center bg-[url('/images/MainEvent.png')] bg-no-repeat bg-cover bg-center">
                    <AnimatedContent>
                        <h1 className="text-4xl font-Inter md:text-8xl font-bold text-white ">
                            <ShinyText
                                text="Tentang Kami"
                                disabled={false}
                                speed={3}
                                className="pb-2"
                            />
                        </h1>
                    </AnimatedContent>
                    <AnimatedContent>
                        <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl md:mt-2 tracking-widest font-Inter font-semibold italic text-white">
                            P P M{" "}
                            <span className="px-2 sm:px-3 md:px-4 lg:px-5">
                                B K I
                            </span>{" "}
                            S E M A R A N G
                        </p>
                    </AnimatedContent>
                </div>
                <div className="mt-10  bg-gradient-to-b from-white to-green-50 w-full   text-gray-800">
                    <div className="flex flex-col lg:flex-row items-center gap-20 px-6 md:px-24">
                        <AnimatedContent
                            direction="horizontal"
                            ease="power3.out"
                            reverse={true}
                            duration={1.5}
                        >
                            <div className="flex-1">
                                <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
                                    PPM Bina Khoirul Insan Semarang
                                </h2>
                                <p className="text-justify leading-relaxed mb-4">
                                    PPM Bina Khoirul Insan Semarang merupakan
                                    lembaga pendidikan dan pembinaan karakter
                                    berbasis pesantren yang ditujukan khusus
                                    bagi mahasiswa. Didirikan di bawah naungan
                                    LDII (Lembaga Dakwah Islam Indonesia),
                                    pondok ini hadir sebagai wadah untuk
                                    membentuk generasi muda yang berilmu,
                                    berakhlak mulia, dan berdaya saing tinggi,
                                    baik dalam ranah akademik maupun spiritual.
                                </p>
                                <p className="text-justify leading-relaxed mb-4">
                                    Terletak di Kota Semarang, PPM Bina Khoirul
                                    Insan menjadi tempat bernaung para mahasiswa
                                    dari berbagai perguruan tinggi di
                                    sekitarnya. Dengan sistem asrama yang
                                    kondusif, para santri ditanamkan nilai-nilai
                                    islami, disiplin, kemandirian, dan ukhuwah
                                    islamiyah yang kuat.
                                </p>
                                <p className="text-justify leading-relaxed">
                                    Pembinaan dilakukan melalui program
                                    pembelajaran Al-Qur’an, kajian kitab,
                                    pembinaan keorganisasian, serta pengembangan
                                    soft skill dan kepemimpinan.
                                </p>
                            </div>
                        </AnimatedContent>

                        <AnimatedContent
                            direction="horizontal"
                            ease="power3.out"
                            reverse={false}
                            duration={1.5}
                        >
                            <div className="flex-shrink-0">
                                <img
                                    src="/images/logoppm.png"
                                    alt="Logo PPM Bina Khoirul Insan"
                                    className="w-[250px] md:w-[800px] mx-auto"
                                />
                            </div>
                        </AnimatedContent>
                    </div>

                    {/* Visi */}
                    <div className="mt-12 py-7 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-emerald-500 to-teal-400">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-200 mb-2">
                            Visi
                        </h3>
                        <p className="text-center whitespace-pre-line text-white italic max-w-3xl mx-auto text-sm sm:text-base md:text-lg font-Inter  lg:text-xl">
                            “Mencetak generasi mahasiswa berakhlak mulia,
                            berilmu luas, dan siap menjadi pemimpin amanah di
                            tengah masyarakat.”
                        </p>
                    </div>

                    {/* Misi */}
                    <div className="py-12 bg-white">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-bold">Misi</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-br from-emerald-400 to-teal-500">
                                    <FaBookOpen className="text-white text-3xl" />
                                </div>
                                <p className="text-sm text-gray-800 font-medium">
                                    Mengembangkan Potensi Intelektual, <br />
                                    dan Sosial.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-br from-emerald-400 to-teal-500">
                                    <FaMosque className="text-white text-3xl" />
                                </div>
                                <p className="text-sm text-gray-800 font-medium">
                                    Membentuk Karakter Santri Sesuai 29 <br />{" "}
                                    Karakter Luhur.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-br from-emerald-400 to-teal-500">
                                    <FaGraduationCap className="text-white text-3xl" />
                                </div>
                                <p className="text-sm text-gray-800 font-medium">
                                    Sukses Dunia & Akhirat Menjadi <br />{" "}
                                    Sarjana Mubaligh.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Gallery */}
                    <div className="pt-10">
                        <div className="w-full flex flex-col items-center text-center mb-8 px-4 sm:px-6 md:px-0">
                            <FadeContent>
                                <h1 className="text-black font-bold font-Inter text-2xl mb-2">
                                    Fasilitas & Ruang <br />
                                    di PPM BKI Semarang
                                </h1>
                            </FadeContent>
                            <FadeContent>
                                <p className="text-gray-600 mt-2 text-base sm:text-lg font-Inter max-w-xl">
                                    Berikut adalah kampus-kampus terdekat yang
                                    dapat menjadi pengembangan diri bagi santri
                                    PPM BKI Semarang.
                                </p>
                            </FadeContent>
                        </div>
                        <div className="mt-2 lg:mt-10 px-5 md:px-30 ">
                            <HoverEffect
                                items={[
                                    {
                                        title: "ASRAMA",
                                        image: "/images/ASRAMA.JPG",
                                        isActive: false,
                                    },
                                    {
                                        title: "AULA",
                                        image: "/images/AULA.JPG",
                                        isActive: false,
                                    },
                                    {
                                        title: "GSG",
                                        image: "/images/GSG.JPG",
                                        isActive: false,
                                    },
                                    {
                                        title: "MASJID",
                                        image: "/images/MASJID.JPG",
                                        isActive: false,
                                    },
                                    {
                                        title: "BASEMENT",
                                        image: "/images/BASEMENT.JPG",
                                        isActive: false,
                                    },
                                    {
                                        title: "ROOFTOP",
                                        image: "/images/ROOFTOP.JPG",
                                        isActive: false,
                                    },
                                    {
                                        title: "DAPUR",
                                        image: "/images/DAPUR.JPG",
                                        isActive: false,
                                    },
                                    {
                                        title: "TEMPAT CUCI",
                                        image: "/images/TEMPAT_CUCI.JPG",
                                        isActive: false,
                                    },
                                    {
                                        title: "UB MART",
                                        image: "/images/UB.JPG",
                                        isActive: false,
                                    },
                                ]}
                            />
                        </div>
                        {/* DIVISI */}
                        <div className="mt-12 py-7 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-emerald-500 to-teal-400">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-200 mb-2">
                                Divisi
                            </h3>
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white italic leading-relaxed max-w-3xl mx-auto">
                                “Mencetak generasi mahasiswa yang berakhlak
                                mulia, berilmu luas, dan siap menjadi pemimpin
                                yang amanah dalam kehidupan bermasyarakat.”
                            </p>
                        </div>
                    </div>
                    {/* LIST DIVISI */}
                    <div className="flex w-full  justify-center items-center gap-3 flex-wrap">
                        <RunningLogos data={listDivisi} />
                    </div>
                    {/* DATA DIVISI */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 py-10">
                        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
                            <img
                                src="/images/kemahasiswaan.png"
                                alt="Kemahasiswaan"
                                className="w-14 h-14 mb-4 mx-auto"
                            />
                            <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                                Kemahasiswaan
                            </h3>
                            <p className="text-sm text-gray-600 font-Inter text-justify">
                                Divisi Kemahasiswaan bertanggung jawab dalam
                                pengelolaan dan pembinaan santri secara
                                menyeluruh, baik dari sisi kedisiplinan,
                                kehadiran, kegiatan rutin, hingga pengembangan
                                karakter. Divisi ini juga menjadi penghubung
                                antara santri dengan pengurus pondok, serta
                                memastikan seluruh aktivitas berjalan sesuai
                                dengan visi dan nilai-nilai pesantren.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
                            <img
                                src="/images/RT.png"
                                alt="RT"
                                className="w-14 h-14 mb-4 mx-auto"
                            />
                            <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                                RT (Rumah Tangga)
                            </h3>
                            <p className="text-sm text-gray-600 font-Inter text-justify">
                                Divisi RT menjaga kebersihan, kerapian, dan
                                kenyamanan lingkungan pondok. Mereka mengatur
                                jadwal piket, fasilitas umum, dan memastikan
                                seluruh santri ikut terlibat dalam menjaga
                                kerapihan asrama.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
                            <img
                                src="/images/HUMED.png"
                                alt="HUMED"
                                className="w-14 h-14 mb-4 mx-auto"
                            />
                            <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                                HUMED (Humas Media)
                            </h3>
                            <p className="text-sm text-gray-600 font-Inter text-justify">
                                HUMED mendokumentasikan, mengelola, dan
                                menyebarluaskan informasi kegiatan pondok
                                melalui media sosial dan internal. Mereka
                                bertugas membangun citra positif pondok di mata
                                publik dan menjalin relasi eksternal.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
                            <img
                                src="/images/KESEHATAN.png"
                                alt="HSC"
                                className="w-14 h-14 mb-4 mx-auto"
                            />
                            <h3 className="text-xl font-semibold font-Inter text-center text-gray-800 mb-2">
                                HSC (Health Social Care)
                            </h3>
                            <p className="text-sm text-gray-600 font-Inter text-justify">
                                Divisi HSC fokus pada kesehatan dan kepedulian
                                sosial. Mereka memastikan kebersihan, kesehatan
                                fisik dan mental santri, serta menyebarkan
                                edukasi terkait pola hidup sehat dan bantuan
                                kemanusiaan.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
                            <img
                                src="/images/SPORT.png"
                                alt="Divor"
                                className="w-14 h-14 mb-4 mx-auto"
                            />
                            <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                                Divor
                            </h3>
                            <p className="text-sm text-gray-600 font-Inter">
                                Divisi olahraga santri, menangani kegiatan
                                olahraga dan turnamen antar-santri. Tujuannya
                                adalah menjaga kebugaran, semangat, serta
                                mempererat hubungan antarsantri dan pengurus.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
                            <img
                                src="/images/kemandirian.png"
                                alt="Kemandirian"
                                className="w-14 h-14 mb-4 mx-auto"
                            />
                            <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                                Kemandirian
                            </h3>
                            <p className="text-sm text-gray-600 font-Inter text-justify">
                                Divisi ini membina jiwa enterpreneurship dan
                                kemandirian hidup santri melalui pelatihan
                                skill, wirausaha internal, dan pengembangan
                                finansial seperti laundry, kuliner, dan
                                sebagainya.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
