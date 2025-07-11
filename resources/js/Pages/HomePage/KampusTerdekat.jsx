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
        <section className="flex flex-col justify-center items-center mt-20">
            <h1 className="text-black font-bold text-4xl">
                Kampus Terdekat Area PPM BKI Semarang
            </h1>
            <div className="flex w-full bg-green-200 justify-center items-center gap-3 mt-4 flex-wrap">
                {kampusTerdekat.map((kampus, index) => (
                    <div
                        key={index}
                        className="flex gap-3 w-1/7 min-w-[140px] items-center justify-center"
                    >
                        <img
                            src={kampus.src}
                            alt={`logo ${kampus.name.toLowerCase()}`}
                            className="w-auto h-15"
                        />
                        <div className="flex flex-col h-24 my-2 justify-center items-start">
                            <h2 className="text-gray-500 font-bold">
                                {kampus.name}
                            </h2>
                            <h2 className="text-gray-500">{kampus.jarak}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
