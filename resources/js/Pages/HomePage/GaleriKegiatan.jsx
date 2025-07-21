import { HoverEffect } from "../../Components/CardHoverEffect";
import FadeContent from "../../Components/FadeContent";

export default function GaleriKegiatan() {
    return (
        <>
            <section className="flex flex-col py-25">
                <div className="w-full flex flex-col items-center text-center mb-8 px-4 sm:px-6 md:px-0">
                    <FadeContent>
                        <h1 className="text-black font-bold font-Inter text-2xl sm:text-3xl md:text-4xl mb-2">
                            Galeri Kegiatan <br />
                            PPM BKI Semarang
                        </h1>
                    </FadeContent>
                    <FadeContent>
                        <p className="text-gray-600 mt-2 text-base sm:text-lg md:text-xl font-Inter max-w-xl">
                            Berikut adalah Galeri kegiatan yang telah
                            dilaksanakan oleh PPM BKI Semarang. Kegiatan ini
                            bagian dari upaya kami untuk meningkatkan kualitas
                            pendidikan dan pengembangan.
                        </p>
                    </FadeContent>
                </div>
                <div className="mt-2 lg:mt-10 px-5 md:px-30 ">
                    <HoverEffect
                        items={[
                            {
                                title: "OSAKA 2025",
                                image: "/images/Osaka_2024.jpg",
                                isActive: false,
                            },
                            {
                                title: "PSB 2025",
                                image: "/images/Psb_2024.jpg",
                                isActive: false,
                            },
                            {
                                title: "CAI 2025",
                                image: "/images/Cai_2024.jpg",
                                isActive: false,
                            },
                            {
                                title: "TAKJIL",
                                image: "/images/Takjil_2024.jpg",
                                isActive: false,
                            },
                            {
                                title: "FAGANZA",
                                image: "/images/Faganza_2024.jpg",
                                isActive: false,
                            },
                            {
                                title: "BUKBER",
                                image: "/images/Bukber_2024.jpg",
                                isActive: false,
                            },
                        ]}
                    />
                </div>
            </section>
        </>
    );
}
