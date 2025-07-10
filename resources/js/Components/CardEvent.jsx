export default function EventCard({ image, title, description }) {
    return (
        <div className="w-[280px] min-h-[360px] rounded-[26px] overflow-hidden bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden">
            {/* Bagian hijau atas */}
            <div className="relative bg-[#8AD0B5] h-[180px] flex items-center justify-center px-3 pt-4 pb-8">
                <img
                    src={image}
                    alt={title}
                    className="h-[110px] object-contain rounded-lg"
                />

                {/* SVG lengkungan bawah */}
                <svg
                    className="absolute bottom-0 left-0 w-full"
                    viewBox="0 0 400 40"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0 C150,40 250,40 400,0 L400,40 L0,40 Z"
                        fill="white"
                    />
                </svg>
            </div>

            {/* Konten bawah */}
            <div className="pt-6 pb-8 px-4 text-center">
                <h3 className="text-base font-bold text-gray-800 mb-2">
                    {title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}
