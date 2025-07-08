const statistik = [
    { label: "JUMLAH SANTRI", value: 354 },
    { label: "JUMLAH GURU", value: 9 },
    { label: "LULUSAN MUBALIGH", value: 192 },
    { label: "SANTRI BERPRESTASI", value: 123 },
];

export default function Statistik() {
    return (
        <section className="flex justify-center items-center bg-teal-200 gap-7 flex-wrap">
            {statistik.map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col w-1/5 min-w-[220px] h-72 relative my-8 p-4 bg-green-400 rounded-2xl shadow-sm text-white overflow-hidden"
                >
                    <div className="absolute -bottom-16 -right-16 size-90 bg-green-500 rounded-full opacity-75 translate-x-1/4 translate-y-1/4" />
                    <div className="flex flex-col relative z-10 text-center items-center justify-center p-4">
                        <p className="text-2xl font-light">{item.label}</p>
                        <p className="text-7xl font-bold">{item.value}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}
