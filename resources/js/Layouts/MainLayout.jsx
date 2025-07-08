// src/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar";
import ScrollToTop from "./ScrollToTop";
import Footer from "../Pages/Footer";

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <ScrollToTop />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
