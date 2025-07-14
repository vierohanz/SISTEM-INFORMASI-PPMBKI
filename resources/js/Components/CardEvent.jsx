import { Link } from "react-router-dom"; // jika pakai React Router

export default function EventCard({
    image,
    title,
    description,
    status,
    divisi,
    year,
    id,
}) {
    return (
        <div className="h-[430px] lg:h-[490px] rounded-3xl shadow-lg mb-12 flex flex-col justify-between">
            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-400 rounded-t-3xl rounded-b-3xl shadow-2xl h-[200px] sm:h-[180px] md:h-[240px] overflow-hidden flex items-center justify-center">
                <img
                    src={image}
                    alt={title}
                    className="lg:mb-1 shadow-xl p-1 bg-white h-[137px] w-[250px] sm:w-[110px] sm:h-[110px] md:w-[290px] md:h-[170px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="pt-7 px-4 text-justify flex-1">
                <h3 className="text-base sm:text-lg font-bold font-Inter text-gray-800 mb-2">
                    {title}{" "}
                    <span className="font-normal text-gray-500">- {year}</span>
                </h3>
                <p className="text-gray-500 text-start font-Inter text-sm sm:text-xs md:text-base leading-relaxed line-clamp-4">
                    {description}
                </p>
            </div>

            <div className="px-4 py-5 pb-6 ">
                <Link
                    to={`/event/${id}`}
                    className="inline-block transform transition-all duration-300 hover:scale-105 bg-gradient-to-br from-emerald-400 to-teal-400 font-medium font-Inter text-white px-4 py-2 rounded-lg text-sm shadow-md"
                >
                    Lihat
                </Link>
            </div>
        </div>
    );
}
