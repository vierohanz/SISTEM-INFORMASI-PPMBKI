import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/Layouts/MainLayout";
import Event from "./EventPage/Event";
import Home from "../Pages/HomePage/Home";
import Article from "./ArticlePage/Article";
import Psb from "./PsbPage/Psb";
import Guest from "./GuestPage/Guest";
import About from "./AboutPage/About";
import MainEvent from "./EventPage/MainEvent";

export default function Index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/event" element={<Event />} />
                    <Route path="/artikel" element={<Article />} />
                    <Route path="/psb" element={<Psb />} />
                    <Route path="/layanan-tamu" element={<Guest />} />
                    <Route path="/tentang-kami" element={<About />} />
                    <Route path="/event/:id" element={<MainEvent />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
