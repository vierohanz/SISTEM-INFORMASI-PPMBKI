import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    Calendar,
    Users,
    BookOpen,
    ChevronRight,
    Newspaper,
    UserCheck,
} from "lucide-react";
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [eventDropdownOpen, setEventDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const iconMap = {
        Home: <Home size={18} className="text-emerald-600" />,
        Event: <Calendar size={18} className="text-emerald-600" />,
        Artikel: <Newspaper size={18} className="text-emerald-600" />,
        "Layanan Tamu": <UserCheck size={18} className="text-emerald-600" />,
        "Tentang Kami": <BookOpen size={18} className="text-emerald-600" />,
    };

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Event", path: "/event" },
        { name: "Artikel", path: "/artikel" },
        { name: "Layanan Tamu", path: "/layanan-tamu" },
        { name: "Tentang Kami", path: "/tentang-kami" },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => (document.body.style.overflow = "");
    }, [menuOpen]);

    return (
        <div
            className={`fixed top-0 left-0 w-full px-4 md:px-14 py-5 flex items-center justify-between z-50
        ${
            menuOpen
                ? "bg-transparent"
                : scrolled
                ? "bg-white shadow-md backdrop-blur-sm transition-all duration-300"
                : "bg-transparent transition-all duration-300"
        }`}
        >
            {/* Logo */}
            <Link to="/">
                <img
                    src="/images/logoppmhome.png"
                    alt="logoppm"
                    className="w-48 md:w-56 z-60 h-auto"
                />
            </Link>

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
                className={`fixed top-0 left-0 w-[270px] h-screen bg-white -z-50 transition-transform duration-500 ease-in-out md:hidden ${
                    menuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex flex-col justify-between h-full px-6 py-10 overflow-y-auto">
                    <ul className="flex flex-col gap-10 mt-15 text-left font-medium text-base text-gray-800">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                {item.name === "Event" ? (
                                    <div className="w-full">
                                        <button
                                            onClick={() =>
                                                setEventDropdownOpen(
                                                    (prev) => !prev
                                                )
                                            }
                                            className="w-full flex items-center justify-between text-lg font-semibold hover:text-emerald-600"
                                        >
                                            <div className="flex items-center gap-3">
                                                {iconMap[item.name]}
                                                <span>{item.name}</span>
                                            </div>
                                            <ChevronRight
                                                className={`transition-transform duration-300 ${
                                                    eventDropdownOpen
                                                        ? "rotate-90 text-emerald-600"
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
                                                    }}
                                                    exit={{ opacity: 0, y: -8 }}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: "easeInOut",
                                                    }}
                                                    className="mt-4 ml-6 border-l-2 border-emerald-500 pl-4 flex flex-col gap-3"
                                                >
                                                    <button
                                                        onClick={() => {
                                                            setMenuOpen(false);
                                                            setEventDropdownOpen(
                                                                false
                                                            );
                                                            navigate("/event");
                                                        }}
                                                        className="text-sm hover:text-emerald-600 text-left"
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
                                                        className="text-sm hover:text-emerald-600 text-left"
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
                                        className="w-full flex items-center gap-3 text-lg font-semibold hover:text-emerald-600"
                                    >
                                        {iconMap[item.name]}
                                        <span>{item.name}</span>
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
