import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import DestinationCard from "../components/home/DestinationCard";
import Guides from "../components/home/Guides";
import Footer from "../components/layout/Footer";

// Import images
import alger from "../assets/alger.jpg";
import lac from "../assets/lac.jpg";
import desert from "../assets/desert.jpg";
import cap from "../assets/cap.jpg";
import djemila from "../assets/djemila.jpg";
import ghardaia from "../assets/ghardaia.jpg";

function Home() {
    // Sample data
    const destinations = [
        {
            id: 1,
            title: "Grande mosquée d'Alger",
            rating: 4.6,
            image: alger,
            description: "La troisième plus grande mosquée au monde."
        },
        {
            id: 2,
            title: "Lac Agoulmim",
            rating: 4.3,
            image: lac,
            description: "Un lac situé dans le massif de l’Akfadou."
        },
        {
            id: 3,
            title: "Assekrem",
            rating: 4.1,
            image: desert,
            description: "Un haut plateau situé dans le Hoggar."
        },
        {
            id: 4,
            title: "Cap Carbon - Béjaïa",
            rating: 4.6,
            image: cap,
            description: "Magnifique cap avec vue sur la mer."
        },
        {
            id: 5,
            title: "Ruines de Djemila",
            rating: 4.5,
            image: djemila,
            description: "Site antique classé patrimoine mondial."
        },
        {
            id: 6,
            title: "Ghardaïa",
            rating: 4.7,
            image: ghardaia,
            description: "Ville historique du Mzab."
        }
    ];

    return (
        <div className="bg-gray-50 text-gray-800">

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <Hero />

            {/* Destinations Section */}
            <section className="py-16 px-10">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Découvrez des endroits que vous allez adorer !
                </h2>

                {/* Filters (UI only for now) */}
                <div className="flex justify-center gap-4 mb-10">
                    <button className="bg-orange-500 text-white px-4 py-1 rounded-full">
                        Tous
                    </button>
                    <button className="border px-4 py-1 rounded-full">Nature</button>
                    <button className="border px-4 py-1 rounded-full">Plages</button>
                    <button className="border px-4 py-1 rounded-full">Villes</button>
                    <button className="border px-4 py-1 rounded-full">Espaces</button>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {destinations.map((place) => (
                        <DestinationCard
                            key={place.id}
                            image={place.image}
                            title={place.title}
                            rating={place.rating}
                            description={place.description}
                        />
                    ))}
                </div>
            </section>

            {/* Guides */}
            <Guides />

            {/* Footer */}
            <Footer />

        </div>
    );
}

export default Home;