export default function Event() {
    return (
        <section className="overflow-x-hidden overflow-y-hidden  relative w-full">
            <div className="relative w-full max-w-[100vw]">
                <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] sm:top-[-250px] sm:left-[-250px] sm:w-[800px] sm:h-[750px] bg-teal-100 rounded-full opacity-50 blur-3xl z-0" />
                <div className="absolute z-5 bottom-1 right-[-10px] w-[400px] h-[400px] sm:bottom-[-300px] sm:right-[-300px] sm:w-[780px] sm:h-[700px] bg-teal-100 rounded-full opacity-50 blur-3xl" />
                <div className="h-screen flex flex-col justify-center items-center relative">
                    <h1
                        className="absolute text-[18vw] tracking-widest z-10 font-extrabold text-transparent opacity-60 select-none top-5"
                        style={{
                            WebkitTextStroke: "6px #107838",
                        }}
                    >
                        EVENT
                    </h1>
                    <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-full max-w-[100vw] h-full bg-gradient-to-b from-white to-transparent rounded-t-[450px] blur-xl z-20" />
                    <div className="absolute top-[43%] left-1/2 -translate-x-1/2 w-11/12 max-w-[100vw] h-full bg-gradient-to-b from-green-400/90 to-transparent rounded-t-[450px] blur-sm z-30" />
                </div>
                <div className="h-screen bg-red-400"></div>
            </div>
        </section>
    );
}
