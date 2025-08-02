import AnimatedContent from "../../Components/AnimatedContent";
import ShinyText from "../../Components/ShinyText";
import Penyambutan from "./Penyambutan";
import ListSewa from "./ListSewa";
import FormSubmit from "./FormSubmit";

export default function Guest() {
    return (
        <div className="w-full font-Inter overflow-x-hidden">
            <div className="w-full h-[250px] md:h-[570px] flex flex-col justify-center items-center text-center bg-[url('/images/MainEvent.png')] bg-no-repeat bg-cover bg-center">
                <AnimatedContent>
                    <h1 className="text-4xl md:text-8xl font-bold text-white">
                        <ShinyText
                            text="Layanan Tamu"
                            disabled={false}
                            speed={3}
                            className="pb-2"
                        />
                    </h1>
                </AnimatedContent>
                <AnimatedContent>
                    <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl mt-2 tracking-widest font-semibold italic text-white">
                        P P M{" "}
                        <span className="px-2 sm:px-3 md:px-4 lg:px-5">
                            B K I
                        </span>{" "}
                        S E M A R A N G
                    </p>
                </AnimatedContent>
            </div>

            <Penyambutan />
            <ListSewa/>
            <FormSubmit />
        </div>
    );
}
