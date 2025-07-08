export default function Navbar() {
    return (
        <div className="my-3 px-14 flex items-center justify-between">
            <div className="flex items-center mt-2">
                <a href="/">
                    <img
                        src="/images/logoppmhome.png"
                        alt="logoppm"
                        className="w-78 h-auto"
                    />
                </a>
            </div>
            <div className="flex gap-10">
                <ul className="flex gap-10">
                    <li>
                        <a href="/" className="text-base text-gray-900">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/event" className="text-base text-gray-900">
                            Event
                        </a>
                    </li>
                    <li>
                        <a href="/artikel" className="text-base text-gray-900">
                            Artikel
                        </a>
                    </li>
                    <li>
                        <a
                            href="/layanan-tamu"
                            className="text-base text-gray-900"
                        >
                            Layanan Tamu
                        </a>
                    </li>
                    <li>
                        <a
                            href="/tentang-kami"
                            className="text-base text-gray-900"
                        >
                            Tentang Kami
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
