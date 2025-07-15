import AnimatedContent from "../../Components/AnimatedContent";
import FadeContent from "../../Components/FadeContent";

export default function Event() {
    return (
        <section className="overflow-x-hidden overflow-y-hidden  relative w-full">
            <div className="relative w-full max-w-[100vw]">
                <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] sm:top-[-250px] sm:left-[-250px] sm:w-[800px] sm:h-[750px] bg-teal-100 rounded-full opacity-50 blur-3xl z-0" />
                <div className="absolute z-5 bottom-1 right-[-10px] w-[400px] h-[400px] sm:bottom-[-300px] sm:right-[-300px] sm:w-[780px] sm:h-[700px] bg-teal-100 rounded-full opacity-50 blur-3xl" />
                <div className="h-[300vim] py-30 flex flex-col justify-center items-center relative">
                    <AnimatedContent
                        direction="vertical"
                        ease="power3.out"
                        reverse={true}
                        duration={2}
                        className=""
                    >
                        <img
                            className="h-1/2"
                            src="/images/tulisan event hijau.png"
                        ></img>
                    </AnimatedContent>
                    <AnimatedContent
                        direction="vertical"
                        ease="power3.out"
                        reverse={false}
                        duration={1.5}
                        className="relative w-fit"
                    >
                        {/* Gambar bundaran tetap */}
                        <img
                            className="h-1/2"
                            src="/images/bunder hijau.png"
                            alt="Bunder Hijau"
                        />

                        {/* Konten di atas bundaran */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-50 w-full px-4 flex flex-col items-center text-center">
                            <FadeContent blur={true}>
                                <h3 className="text-black font-bold font-Inter text-2xl sm:text-3xl md:text-4xl mb-2">
                                    List Event
                                </h3>
                            </FadeContent>

                            <p className="text-gray-600 mt-2 text-base sm:text-lg md:text-xl font-Inter max-w-xl">
                                Beragam kegiatan seru dan inspiratif setiap
                                <br />
                                tahunnya di{" "}
                                <span className="font-semibold">
                                    PPM BKI Semarang
                                </span>
                            </p>
                        </div>
                    </AnimatedContent>
                </div>
            </div>
        </section>
    );
}
