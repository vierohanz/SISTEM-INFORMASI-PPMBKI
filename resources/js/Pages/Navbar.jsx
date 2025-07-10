import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="my-3 px-4 md:px-14 flex items-center justify-between relative">
                <div className="flex items-center mt-2">
                    <a href="/">
                        <img
                            src="/images/logoppmhome.png"
                            alt="logoppm"
                            className="w-40 md:w-78 h-auto"
                        />
                    </a>
                </div>
                {/* Desktop Menu */}
                <div className="hidden md:flex gap-10">
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
                {/* Hamburger Icon for Mobile */}
                <button
                    className="md:hidden text-3xl focus:outline-none"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    <RxHamburgerMenu />
                </button>
                {/* Mobile Menu */}
                {open && (
                    <div className="absolute top-16 right-4 w-48 bg-white rounded-lg shadow-lg z-50 md:hidden animate-fade-in">
                        <ul className="flex flex-col gap-4 p-4">
                            <li>
                                <a
                                    href="/"
                                    className="text-base text-gray-900"
                                    onClick={() => setOpen(false)}
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/event"
                                    className="text-base text-gray-900"
                                    onClick={() => setOpen(false)}
                                >
                                    Event
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/artikel"
                                    className="text-base text-gray-900"
                                    onClick={() => setOpen(false)}
                                >
                                    Artikel
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/layanan-tamu"
                                    className="text-base text-gray-900"
                                    onClick={() => setOpen(false)}
                                >
                                    Layanan Tamu
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/tentang-kami"
                                    className="text-base text-gray-900"
                                    onClick={() => setOpen(false)}
                                >
                                    Tentang Kami
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
