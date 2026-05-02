import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import RestaurantSection from "../components/home/RestaurantCard";
import { useEffect } from "react";

function Restaurants() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Banner */}
            <div
                className="relative w-full h-[45vh] flex items-end"
                style={{
                    backgroundImage: "url('/images/dar-yemma.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative z-10 px-10 pb-10">
                    <p className="text-sky-400 font-semibold text-sm uppercase tracking-widest mb-2">
                        Gastronomie
                    </p>
                    <h1 className="text-white text-4xl font-extrabold leading-tight">
                        Les meilleurs restaurants d'Algérie
                    </h1>
                    <p className="text-white/80 mt-2 max-w-xl text-sm">
                        Tajines, couscous, fruits de mer ou pizza — explorez la richesse culinaire algérienne à travers nos meilleures adresses.
                    </p>
                </div>
            </div>

            {/* Restaurants Section */}
            <RestaurantSection />

            <Footer />
        </div>
    );
}

export default Restaurants;
