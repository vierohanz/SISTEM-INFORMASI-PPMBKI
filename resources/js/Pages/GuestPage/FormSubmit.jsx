import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

export default function FormSubmit(){
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id_layanan_tamu: "",
        nama_tamu: "",
        phone: "",
        tanggal_datang: null,
        tanggal_keluar: null,
        kuantitas: "",
        deskripsi: "",
    });
    const [kamarList, setKamarList] = useState([]);
    const kamarOptions = kamarList.map((kamar) => ({
    value: kamar.id,
    label: `${kamar.nama_kamar} - Kapasitas ${kamar.kapasitas}`,
    }));
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            padding: "0.25rem 0.5rem",
            fontSize: "0.875rem",
            borderRadius: "0.375rem",
            borderColor: state.isFocused ? "#10b981" : "#000",
            boxShadow: state.isFocused
                ? "0 0 0 2px rgba(16, 185, 129, 0.5)"
                : "none",
            "&:hover": {
                borderColor: "#10b981",
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? "#10b981"
                : state.isFocused
                ? "#d1fae5"
                : undefined,
            color: state.isSelected ? "white" : "#111827",
            fontSize: "0.875rem",
            padding: "0.5rem 1rem",
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 50,
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#111827",
        }),
    };

useEffect(() => {
    const fetchKamar = async () => {
        try {
            const res = await axios.get("https://ppmbki.ponpes.id/api/tamu");
            setKamarList(res.data.data);
        } catch (error) {
            console.error("Gagal fetch kamar:", error);
        }
    };
    fetchKamar();
}, []);

 const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData((prev) => ({ ...prev, [name]: value }));
 };

const handleSubmit = async (e) => {
    e.preventDefault();

    const kamarTerpilih = kamarList.find(
        (k) => k.id === parseInt(formData.id_layanan_tamu)
    );

    if (!kamarTerpilih) {
        toast.error("Kamar tidak valid.");
        return;
    }

    const kuantitas = parseInt(formData.kuantitas);
    if (kuantitas > kamarTerpilih.kapasitas) {
        toast.warning(
            `Kuantitas melebihi kapasitas (${kamarTerpilih.kapasitas}).`
        );
        return;
    }

    const datang = new Date(formData.tanggal_datang);
    const keluar = new Date(formData.tanggal_keluar);
    if (datang >= keluar) {
        toast.error("Tanggal Datang harus sebelum Tanggal Keluar.");
        return;
    }

    const formattedTanggalDatang = format(datang, "yyyy-MM-dd");
    const formattedTanggalKeluar = format(keluar, "yyyy-MM-dd");

    setLoading(true);

    setTimeout(async () => {
        try {
            await axios.post(
                `https://ppmbki.ponpes.id/api/tamu/${formData.id_layanan_tamu}/booking`,
                {
                    nama_tamu: formData.nama_tamu,
                    phone: formData.phone,
                    tanggal_datang: formattedTanggalDatang,
                    tanggal_keluar: formattedTanggalKeluar,
                    kuantitas: formData.kuantitas,
                    deskripsi: formData.deskripsi,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            toast.success("Booking berhasil disimpan!");
        } catch (error) {
            console.error(error.response?.data || error.message);

            if (
                error.response?.data?.message &&
                error.response?.data?.message.includes("dibooking")
            ) {
                toast.error(
                    "Gagal booking: kamar sudah dibooking pada tanggal itu."
                );
            } else {
                toast.error("Gagal booking. Cek koneksi atau data.");
            }
        } finally {
            setLoading(false);
        }
    }, 3000);
};
    return (
        <div id="tujuanScroll" className="bg-white py-10 px-6 md:px-24">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
                Form Booking Tamu
            </h2>
            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto space-y-4"
            >
                <Select
                    options={kamarOptions}
                    value={kamarOptions.find(
                        (option) =>
                            option.value === parseInt(formData.id_layanan_tamu)
                    )}
                    onChange={(selectedOption) =>
                        setFormData({
                            ...formData,
                            id_layanan_tamu: selectedOption?.value || "",
                        })
                    }
                    styles={customStyles}
                    placeholder="Pilih Kamar"
                    className="text-sm border-black"
                    classNamePrefix="react-select"
                />
                <input
                    name="nama_tamu"
                    value={formData.nama_tamu}
                    onChange={handleChange}
                    placeholder="Nama Tamu"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                />

                <input
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Nomor Telepon"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                />

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    {/* Tanggal Datang */}
                    <div className="flex-1 w-full">
                        <label
                            htmlFor="tanggal_datang"
                            className="block mb-1 text-sm text-gray-700"
                        >
                            Tanggal Datang
                        </label>
                        <DatePicker
                            selected={formData.tanggal_datang}
                            onChange={(date) =>
                                setFormData({
                                    ...formData,
                                    tanggal_datang: date,
                                })
                            }
                            selectsStart
                            startDate={formData.tanggal_datang}
                            endDate={formData.tanggal_keluar}
                            minDate={new Date()}
                            dateFormat="yyyy-MM-dd"
                            className="lg:w-[23.5rem] w-[19.2rem] px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholderText="Pilih tanggal datang"
                        />
                    </div>

                    {/* Tanggal Keluar */}
                    <div className="flex-1 w-full">
                        <label
                            htmlFor="tanggal_keluar"
                            className="block mb-1 text-sm text-gray-700"
                        >
                            Tanggal Keluar
                        </label>
                        <DatePicker
                            selected={formData.tanggal_keluar}
                            onChange={(date) =>
                                setFormData({
                                    ...formData,
                                    tanggal_keluar: date,
                                })
                            }
                            selectsEnd
                            startDate={formData.tanggal_datang}
                            endDate={formData.tanggal_keluar}
                            minDate={formData.tanggal_datang || new Date()}
                            dateFormat="yyyy-MM-dd"
                            className="lg:w-[23.5rem] w-[19.2rem] px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholderText="Pilih tanggal keluar"
                        />
                    </div>
                </div>

                <input
                    type="number"
                    name="kuantitas"
                    value={formData.kuantitas}
                    onChange={handleChange}
                    placeholder="Jumlah tamu"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                />

                <textarea
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    placeholder="Deskripsi"
                    rows="4"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                ></textarea>

                <button
                    type="submit"
                    disabled={loading}
                    className={`${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-emerald-500 hover:bg-teal-400"
                    } text-white px-6 py-2 rounded transition duration-300`}
                >
                    {loading ? "⏳ Loading..." : "Kirim Booking"}
                </button>
            </form>
        </div>
    );
}
