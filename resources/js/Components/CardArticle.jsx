export default function ArticleCard({
    imageLeft,
    imageRight,
    title,
    description,
    divisi,
    tanggal,
}) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 mb-12 w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-4 mb-9">
                <div className="rounded-xl col-span-3 overflow-hidden">
                    <img
                        src={imageLeft}
                        alt="Gambar utama"
                        className="object-cover w-full h-48 md:h-52 rounded-xl"
                    />
                </div>
            </div>

            {/* Konten */}
            <div>
                <h3 className="text-xl font-bold font-Inter text-gray-800">
                    {title}
                </h3>
                <p className="text-md font-Inter  text-gray-600 mt-2 line-clamp-4 lg:line-clamp-5">
                    {description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm font-Inter text-gray-500 italic">
                        {divisi}
                    </p>
                    <button className="bg-gradient-to-br from-emerald-400 to-teal-400 font-medium font-Inter hover:scale-105 transition-all duration-300 text-white px-4 py-2 rounded-lg text-sm  ">
                        Lihat
                    </button>
                </div>
            </div>
        </div>
    );
}
