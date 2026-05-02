import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HotelsSection from "../components/home/HotelCard";
import { useEffect } from "react";

function Hotels() {
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
                    backgroundImage: "url('/images/hero-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 px-10 pb-10">
                    <p className="text-sky-400 font-semibold text-sm uppercase tracking-widest mb-2">
                        Hébergement
                    </p>
                    <h1 className="text-white text-4xl font-extrabold leading-tight">
                        Les meilleurs hôtels d'Algérie
                    </h1>
                    <p className="text-white/80 mt-2 max-w-xl text-sm">
                        Du luxe au confort abordable, trouvez l'hébergement parfait pour votre séjour à travers toute l'Algérie.
                    </p>
                </div>
            </div>

            {/* Hotels Section */}
            <HotelsSection />

            <Footer />
        </div>
    );
}

export default Hotels;
