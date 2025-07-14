export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-emerald-500 to-teal-700 text-white">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-6 gap-12">
                {/* Logo dan Deskripsi */}
                <div className="md:col-span-2 order-1">
                    <img
                        src="/images/logo ppm_full putih.png"
                        alt="Logo PPMBKI"
                        className="h-12 mb-4"
                    />
                    <p className="text-sm leading-relaxed font-Inter text-white/90 max-w-md">
                        PPMBKI Semarang adalah pondok pesantren mahasiswa yang
                        berkomitmen mencetak generasi unggul, religius, dan
                        berakhlakul karimah.
                    </p>
                </div>

                {/* Navigasi */}
                <div className="order-2">
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

                {/* Kontak */}
                <div className="order-3">
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

                {/* Google Maps */}
                <div className="md:col-span-2 order-4">
                    <h3 className="font-semibold text-lg font-Inter mb-4">
                        Lokasi
                    </h3>
                    <div className="w-full h-48 md:h-56 rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d494.4311964809135!2d110.42008108758706!3d-7.04932303126834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMDInNTYuOSJTIDExMMKwMjUnMTMuNSJF!5e0!3m2!1sid!2sid!4v1752468251142!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi PPM BKI Semarang"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-emerald-700 text-center font-Inter py-4 text-sm text-white">
                &copy; {new Date().getFullYear()} PPM BKI Semarang. All rights
                reserved.
            </div>
        </footer>
    );
}
