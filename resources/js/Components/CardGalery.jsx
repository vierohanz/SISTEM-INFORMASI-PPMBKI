export default function GaleryCard({ title, image, isActive }) {
    return (
        <div
            className={`rounded-3xl shadow-md overflow-hidden text-center transition-transform duration-300 hover:scale-105 ${
                isActive
                    ? "bg-gradient-to-br from-emerald-500 to-teal-400 text-white"
                    : "bg-white text-black"
            }`}
        >
            <div
                className={`relative h-24 w-full bg-gray-100 ${
                    isActive ? "bg-[rgba(255,255,255,0.1)]" : ""
                }`}
            >
                <div className="absolute inset-0 bg-white rounded-b-[50%] h-20 w-full"></div>
                <h3 className="absolute top-5 left-1/2 -translate-x-1/2 text-lg font-bold font-Inter z-10">
                    {title}
                </h3>
            </div>
            <div className="p-4">
                <img
                    src={image}
                    alt={title}
                    className="h-48 w-full object-cover rounded-xl"
                />
            </div>
        </div>
    );
}
