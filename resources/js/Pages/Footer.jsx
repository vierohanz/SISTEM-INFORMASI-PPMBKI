export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-emerald-500 to-teal-700 text-white">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <img
                        src="/images/logo ppm_full putih.png"
                        alt="Logo PPMBKI"
                        className="h-14 mb-4"
                    />
                    <p className="text-sm leading-relaxed font-Inter text-white/90">
                        PPM BKI Semarang adalah pondok pesantren mahasiswa yang
                        berkomitmen mencetak generasi unggul, profesional,
                        religius, dan berakhlakul karimah.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-lg font-Inter mb-4">
                        Navigasi
                    </h3>
                    <ul className="space-y-2 font-Inter text-sm">
                        {[
                            { label: "Beranda", href: "/" },
                            { label: "Event", href: "/event" },
                            { label: "Artikel", href: "/artikel" },
                            { label: "Layanan Tamu", href: "/layanan-tamu" },
                            { label: "Tentang Kami", href: "/tentang-kami" },
                        ].map((nav, idx) => (
                            <li key={idx}>
                                <a
                                    href={nav.href}
                                    className="hover:text-emerald-300 transition-colors"
                                >
                                    {nav.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-lg font-Inter mb-4">
                        Kontak
                    </h3>
                    <ul className="font-Inter space-y-2 text-sm text-white/90">
                        <li>
                            PPM Bina Khoirul Insan, Jl. Ngesrep Tim. V No.8,
                            Sumurboto, Kec. Banyumanik, Kota Semarang, Jawa
                            Tengah 50269
                        </li>
                        <li>Email: ppmbki.smg@gmail.com</li>
                        <li>Telp: 0895-0446-9254</li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-emerald-700 text-center font-Inter py-4  text-sm text-white/80">
                &copy; {new Date().getFullYear()} PPM BKI Semarang. All rights
                reserved.
            </div>
        </footer>
    );
}
