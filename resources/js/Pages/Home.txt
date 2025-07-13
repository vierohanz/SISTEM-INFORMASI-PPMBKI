import Navbar from "./Navbar";

export default function Home({ url }) {
    return (
        <>
            <div>
                <Navbar />
                <div>
                    <div className=" p-4 m-4 rounded-lg">
                        <div className="flex justify-between items-center gap-2 px-10">
                            <div className="flex flex-col w-1/2 items-start justify-start">
                                <h1 className="flex text-black text-6xl gap-2 font-bold font-sans">
                                    Selamat Datang{" "}
                                    {<h2 className="font-light">di</h2>}
                                </h1>
                                <h2 className="text-black font-light font-sans text-6xl">
                                    PPM BKI Semarang
                                </h2>
                                <div className="w-3/4 h-1 bg-green-500 rounded-full my-10" />
                                <div className="flex md:mr-65">
                                    <p className="text-black font-semibold text-lg font-sans">
                                        PPM BKI Semarang Berkomitmen Mencetak
                                        Generasi Unggul, Profesional Religius,
                                        dan Berakhlakul Karimffahuhuy
                                    </p>
                                </div>
                            </div>
                            <div className=" flex w-1/2 h-150 m-2 justify-center items-center">
                                <img
                                    src="/images/mainhero.png"
                                    alt="tampak depan ppm"
                                    className="w-150 h-auto"
                                />
                                <img src="/images/particle1.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-20">
                        <h1 className="text-black font-bold text-4xl">
                            Kampus Terdekat Area PPM BKI Semarang
                        </h1>
                        <div className="flex w-full bg-green-200 justify-center items-center gap-3 mt-4">
                            <div className="flex gap-3 w-1/7 items-center justify-center">
                                <img
                                    src="/images/LogoUdinus.png"
                                    alt="logo udinus"
                                    className="w-auto h-15"
                                />
                                <div className="flex flex-col h-24 my-2 justify-center items-start">
                                    <h2 className="text-gray-500 font-bold">
                                        UDINUS
                                    </h2>
                                    <h2 className="text-gray-500">±9 Km</h2>
                                </div>
                            </div>
                            <div className="flex gap-3 w-1/7 items-center justify-center">
                                <img
                                    src="/images/logoUnnes.png"
                                    alt="logo unnes"
                                    className="w-auto h-15"
                                />
                                <div className="flex flex-col h-24 my-2 justify-center items-start">
                                    <h2 className="text-gray-500 font-bold">
                                        UNNES
                                    </h2>
                                    <h2 className="text-gray-500">±12 Km</h2>
                                </div>
                            </div>
                            <div className="flex gap-3 w-1/7 items-center justify-center">
                                <img
                                    src="/images/logoPoltekkes.png"
                                    alt="logo poltekkes"
                                    className="w-auto h-15"
                                />
                                <div className="flex flex-col h-24 my-2 justify-center items-start">
                                    <h2 className="text-gray-500 font-bold">
                                        POLTEKKES
                                    </h2>
                                    <h2 className="text-gray-500">500 m</h2>
                                </div>
                            </div>
                            <div className="flex gap-3 w-1/7 items-center justify-center">
                                <img
                                    src="/images/logoUndip.png"
                                    alt="logo undip"
                                    className="w-auto h-15"
                                />
                                <div className="flex flex-col h-24 my-2 justify-center items-start">
                                    <h2 className="text-gray-500 font-bold">
                                        UNDIP
                                    </h2>
                                    <h2 className="text-gray-500">700 m</h2>
                                </div>
                            </div>
                            <div className="flex gap-3 w-1/7 items-center justify-center">
                                <img
                                    src="/images/logoPolines.png"
                                    alt="logo polines"
                                    className="w-auto h-15"
                                />
                                <div className="flex flex-col h-24 my-2 justify-center items-start">
                                    <h2 className="text-gray-500 font-bold">
                                        POLINES
                                    </h2>
                                    <h2 className="text-gray-500">600 m</h2>
                                </div>
                            </div>
                            <div className="flex gap-3 w-1/7 items-center justify-center">
                                <img
                                    src="/images/logoUnissula.png"
                                    alt="logo unissula"
                                    className="w-auto h-15"
                                />
                                <div className="flex flex-col h-24 my-2 justify-center items-start">
                                    <h2 className="text-gray-500 font-bold">
                                        UNISSULA
                                    </h2>
                                    <h2 className="text-gray-500">±9 Km</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-24" />
                    <div className="flex justify-center items-center bg-teal-200 gap-7">
                        <div className="flex flex-col w-1/5 h-72 relative my-8 p-4 bg-green-400 rounded-2xl shadow-sm text-white overflow-hidden">
                            <div className="absolute -bottom-16 -right-16 size-90 bg-green-500 rounded-full opacity-75 translate-x-1/4 translate-y-1/4"></div>
                            <div className="flex flex-col relative z-10 text-center items-center justify-center p-4">
                                <p className="text-2xl font-light">
                                    JUMLAH SANTRI
                                </p>
                                <p className="text-7xl font-bold">354</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/5 h-72 relative my-8 p-4 bg-green-400 rounded-2xl shadow-sm text-white overflow-hidden">
                            <div className="absolute -bottom-16 -right-16 size-90 bg-green-500 rounded-full opacity-75 translate-x-1/4 translate-y-1/4"></div>
                            <div className="flex flex-col relative z-10 text-center items-center justify-center p-4">
                                <p className="text-2xl font-light">
                                    JUMLAH GURU
                                </p>
                                <p className="text-7xl font-bold">9</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/5 h-72 relative my-8 p-4 bg-green-400 rounded-2xl shadow-sm text-white overflow-hidden">
                            <div className="absolute -bottom-16 -right-16 size-90 bg-green-500 rounded-full opacity-75 translate-x-1/4 translate-y-1/4"></div>
                            <div className="flex flex-col relative z-10 text-center items-center justify-center p-4">
                                <p className="text-2xl font-light">
                                    LULUSAN MUBALIGH
                                </p>
                                <p className="text-7xl font-bold">192</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/5 h-72 relative my-8 p-4 bg-green-400 rounded-2xl shadow-sm text-white overflow-hidden">
                            <div className="absolute -bottom-16 -right-16 size-90 bg-green-500 rounded-full opacity-75 translate-x-1/4 translate-y-1/4"></div>
                            <div className="flex flex-col relative z-10 text-center items-center justify-center p-4">
                                <p className="text-2xl font-light">
                                    SANTRI BERPRESTASI
                                </p>
                                <p className="text-7xl font-bold">123</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-24" />
                    <div className="flex justify-center items-center align-baseline gap-5 mx-10 my-10">
                        <div className="flex w-1/3 h-fit justify-start items-center pr-50">
                            <h2 className="flex text-4xl font-bold">
                                Event Bulan Ini!
                            </h2>
                        </div>
                        <div className="flex w-1/3 h-fit justify-center items-center">
                            <h1 className="text-gray-800">
                                Lorem ipsum dolor sit amet consectetur
                                adipiscing elit. Lorem ipsum dolor sit amet.
                            </h1>
                        </div>
                        <div className="flex w-1/3 h-fit justify-end">
                            <a href="#">
                                <button className="flex bg-green-500 text-white px-4 py-2 rounded-full items-center justify-center cursor-pointer">
                                    Kunjungi Lebih Lanjut
                                </button>
                            </a>
                        </div>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}
