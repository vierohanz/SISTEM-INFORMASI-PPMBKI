export default function EventTerkini() {
    return (
        <>
            <section className="flex justify-center items-center align-baseline gap-5 mx-10 my-10 flex-wrap">
                <div className="flex w-1/3 min-w-[280px] justify-start items-center pr-5">
                    <h2 className="text-4xl font-bold">Event Bulan Ini!</h2>
                </div>
                <div className="flex w-1/3 min-w-[280px] justify-center items-center">
                    <p className="text-gray-800">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit.
                        Lorem ipsum dolor sit amet.
                    </p>
                </div>
                <div className="flex w-1/3 min-w-[280px] justify-end">
                    <a href="#">
                        <button className="bg-green-500 text-white px-4 py-2 rounded-full">
                            Kunjungi Lebih Lanjut
                        </button>
                    </a>
                </div>
            </section>
        </>
    );
}
