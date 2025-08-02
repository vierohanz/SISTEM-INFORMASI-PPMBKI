import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useState } from "react";

export default function ListSewa() {
    const [events, setEvents] = useState([]);
    useState(() => {
        fetch("http://127.0.0.1:8000/api/sewa")
            .then((res) => res.json())
            .then((data) => {
                const mapped = data.data.map((item) => {
                    const endDate = new Date(item.tanggal_keluar);
                    endDate.setDate(endDate.getDate() + 1);

                    return {
                        id: item.id,
                        title: `${item.nama_tamu} - ${item.kamar}`,
                        start: item.tanggal_datang,
                        end: endDate.toISOString().split("T")[0],
                        color:
                            item.status === "Diterima"
                                ? "#10b981"
                                : item.status === "Pending"
                                ? "#f59e0b"
                                : "#ef4444",
                    };
                });

                setEvents(mapped);
            })
            .catch((error) => console.error("Fetch error:", error));
    }, []);
    return (
        <div className="px-3 my-5 lg:mx-10 lg:my-10 text-sm">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                height="auto"
                eventDisplay="block"
            />

            <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
                <div className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 rounded bg-emerald-500"></span>
                    <span className="text-gray-700">Diterima</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 rounded bg-amber-500"></span>
                    <span className="text-gray-700">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 rounded bg-red-500"></span>
                    <span className="text-gray-700">Ditolak</span>
                </div>
            </div>
        </div>
    );
}
