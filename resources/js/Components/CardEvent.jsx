export default function EventCard({
    image,
    title,
    description,
    status,
    divisi,
    year,
}) {
    return (
        <div className="h-[380px] lg:h-[455px]  rounded-3xl shadow-lg mb-12">
            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-400 rounded-t-3xl rounded-b-3xl shadow-2xl h-[200px] sm:h-[180px] md:h-[240px] overflow-hidden flex items-center justify-center">
                <img
                    src={image}
                    alt={title}
                    className="lg:mb-1 shadow-xl p-1 bg-white h-[137px] w-[250px]  sm:w-[110px] sm:h-[110px] md:w-[290px] md:h-[170px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="pt-7 pb-6 px-4  text-justify">
                <h3 className="text-base sm:text-lg font-bold font-Inter  text-gray-800 mb-2">
                    {title} <span> - {year}</span>
                </h3>
                <p className="text-gray-500 text-start font-Inter  text-sm sm:text-xs md:text-base leading-relaxed line-clamp-3 lg:line-clamp-4">
                    {description}
                </p>
            </div>
        </div>
    );
}
