import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [eventDropdownOpen, setEventDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => (document.body.style.overflow = "");
    }, [menuOpen]);

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Event", path: "/event" },
        { name: "Artikel", path: "/artikel" },
        { name: "Layanan Tamu", path: "/layanan-tamu" },
        { name: "Tentang Kami", path: "/tentang-kami" },
    ];

    return (
        <div
            className={`fixed top-0 left-0 w-full px-4 md:px-14 py-5 flex items-center justify-between z-50 ${
                menuOpen
                    ? "transition-none bg-transparent"
                    : "transition-all duration-300 bg-white"
            } ${scrolled && !menuOpen ? "shadow-md backdrop-blur-sm" : ""}`}
        >
            {/* Logo */}
            <Link to="/">
                <img
                    src="/images/logoppmhome.png"
                    alt="logoppm"
                    className="w-48 md:w-56 z-60 h-auto"
                />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-9 font-Inter text-sm font-semibold tracking-widest">
                {navItems.map((item) =>
                    item.name === "Event" ? (
                        <li
                            key={item.name}
                            className="group relative"
                            onMouseEnter={() => setEventDropdownOpen(true)}
                            onMouseLeave={() => setEventDropdownOpen(false)}
                        >
                            <span className="text-black cursor-pointer hover:font-bold transition group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-400 group-hover:scale-105">
                                {item.name}
                            </span>
                            {/* Dropdown */}
                            <AnimatePresence>
                                {eventDropdownOpen && (
                                    <motion.ul
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 w-40 z-50"
                                    >
                                        <li>
                                            <Link
                                                to="/event"
                                                className="block px-4 py-2 hover:bg-emerald-100 text-sm text-black"
                                            >
                                                Event Divisi
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/psb"
                                                className="block px-4 py-2 hover:bg-emerald-100 text-sm text-black"
                                            >
                                                PSB
                                            </Link>
                                        </li>
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </li>
                    ) : (
                        <li key={item.name} className="group relative">
                            <Link
                                to={item.path}
                                className="text-black hover:font-bold transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-400 transform group-hover:scale-105"
                            >
                                {item.name}
                            </Link>
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    )
                )}
            </ul>

            {/* Hamburger Button */}
            <div className="md:hidden z-50 flex items-center">
                <button
                    className="relative w-8 h-6 text-black"
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <div
                        className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-400 ease-in-out ${
                            menuOpen ? "rotate-135 top-2.5" : "top-0.5"
                        }`}
                    ></div>
                    <div
                        className={`absolute left-0 w-6 h-0.5 bg-current transition-opacity duration-300 ${
                            menuOpen ? "opacity-0" : "opacity-100 top-2.5"
                        }`}
                    ></div>
                    <div
                        className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-400 ease-in-out ${
                            menuOpen ? "-rotate-135 top-2.5" : "bottom-1"
                        }`}
                    ></div>
                </button>
            </div>

            {/* Mobile Menu - Half Screen, Slide from Left */}
            {/* Overlay - tampak saat menu aktif */}
            {/* Overlay Background */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 -z-70 transition-opacity duration-300"
                    onClick={() => {
                        setMenuOpen(false);
                        setEventDropdownOpen(false);
                    }}
                />
            )}

            <div
                className={`fixed top-0 left-0 w-[300px] h-screen bg-white -z-50 transition-transform duration-500 ease-in-out md:hidden ${
                    menuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex flex-col justify-between h-full px-6 py-10 overflow-y-auto">
                    <ul className="flex flex-col items-start text-left font-Inter font-medium text-base gap-8 mt-15">
                        {navItems.map((item) => (
                            <li key={item.name} className="w-full">
                                {item.name === "Event" ? (
                                    <div className="w-full">
                                        <button
                                            onClick={() =>
                                                setEventDropdownOpen(
                                                    (prev) => !prev
                                                )
                                            }
                                            className="w-full text-black text-xl font-semibold tracking-wide flex justify-between items-center"
                                        >
                                            Event
                                            <ChevronRight
                                                className={`ml-2 text-emerald-600 transition-transform duration-300 ${
                                                    eventDropdownOpen
                                                        ? "rotate-90"
                                                        : ""
                                                }`}
                                                size={20}
                                            />
                                        </button>

                                        <AnimatePresence>
                                            {eventDropdownOpen && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: -8,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                        transition: {
                                                            duration: 0.3,
                                                            ease: "easeInOut",
                                                        },
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        y: -8,
                                                        transition: {
                                                            duration: 0.2,
                                                            ease: "easeInOut",
                                                        },
                                                    }}
                                                    className="mt-4 ml-3 items-start border-l-2 border-emerald-500 pl-4 flex flex-col gap-4"
                                                >
                                                    <button
                                                        onClick={() => {
                                                            setMenuOpen(false);
                                                            setEventDropdownOpen(
                                                                false
                                                            );
                                                            navigate("/event");
                                                        }}
                                                        className="relative text-lg text-gray-800 hover:text-emerald-600 transition-colors  before:absolute  before:bg-emerald-500"
                                                    >
                                                        Event Divisi
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setMenuOpen(false);
                                                            setEventDropdownOpen(
                                                                false
                                                            );
                                                            navigate("/psb");
                                                        }}
                                                        className="relative text-lg text-gray-800 hover:text-emerald-600 transition-colors before:content-[''] before:absolute before:-left-4 before:bg-emerald-500 "
                                                    >
                                                        PSB
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setMenuOpen(false);
                                            navigate(item.path);
                                        }}
                                        className="text-black text-xl font-semibold tracking-wide w-full text-left hover:text-emerald-600 transition-all"
                                    >
                                        {item.name}
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                    {/* <div className="flex  bottom-0 justify-center">
                        <ul className="flex gap-5 items-center mb-8">
                            <li className="mr-1">
                                <a
                                    href="https://www.instagram.com/ppmbkisemarang/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src="/images/instagram.png"
                                        alt="Instagram Logo"
                                        className="w-7 h-7"
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:humedgemes@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src="/images/email.png"
                                        alt="Email Logo"
                                        className="w-8 h-9"
                                    />
                                </a>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
