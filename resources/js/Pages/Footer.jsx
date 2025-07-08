export default function Footer() {
    return (
        <footer className="bg-green-700 text-white ">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo dan Deskripsi */}
                <div>
                    <img
                        src="/images/logoppmhome.png"
                        alt="Logo PPMBKI"
                        className="h-12 mb-4"
                    />
                    <p className="text-sm">
                        PPM BKI Semarang adalah pondok pesantren mahasiswa yang
                        berkomitmen mencetak generasi unggul, profesional,
                        religius, dan berakhlakul karimah.
                    </p>
                </div>

                {/* Navigasi Cepat */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">Navigasi</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="/" className="hover:underline">
                                Beranda
                            </a>
                        </li>
                        <li>
                            <a href="/event" className="hover:underline">
                                Event
                            </a>
                        </li>
                        <li>
                            <a href="/artikel" className="hover:underline">
                                Artikel
                            </a>
                        </li>
                        <li>
                            <a href="/layanan-tamu" className="hover:underline">
                                Layanan Tamu
                            </a>
                        </li>
                        <li>
                            <a href="/tentang-kami" className="hover:underline">
                                Tentang Kami
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Kontak atau Sosial Media */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">Kontak</h3>
                    <p className="text-sm">Jl. Contoh No. 123, Semarang</p>
                    <p className="text-sm">Email: info@ppmbki.ponpes.id</p>
                    <p className="text-sm">Telp: 0812-3456-7890</p>
                </div>
            </div>

            {/* Footer Bawah */}
            <div className="bg-green-800 text-center py-4 text-sm">
                &copy; {new Date().getFullYear()} PPM BKI Semarang. All rights
                reserved.
            </div>
        </footer>
    );
}
