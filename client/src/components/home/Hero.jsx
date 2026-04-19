import hero from "../../assets/hero.png";
import SearchBar from "./SearchBar";

function Hero() {
    return (
        <section className="relative h-[90vh] flex items-center justify-center text-center">

            <img
                src={hero}
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 text-white max-w-3xl">
                <h1 className="text-5xl font-bold mb-4">
                    Votre Rihla commence ici !
                </h1>

                <p className="text-sm opacity-90 mb-6">
                    Des joyaux cachés loin des sentiers touristiques habituels...
                </p>

                <SearchBar />
            </div>
        </section>
    );
}

export default Hero;