import { useState } from "react";

const categories = ["Tous", "Nature", "Plages", "Villes", "Espaces"];

const places = [
    {
        id: 1,
        image: "/images/grande-mosquee.jpg",
        icon: "🕌",
        name: "La grande mosquée d'Alger",
        rating: 4.6,
        description:
            "La troisième plus grande au monde, derrière la mosquée al-Haram et la mosquée du Prophète…",
        category: "Villes",
    },
    {
        id: 2,
        image: "/images/lac-agoulmim.jpg",
        icon: "🏔️",
        name: "Lac Agoulmim",
        rating: 4.3,
        description:
            "Un lac situé dans le massif de l'Akfadou, sur le territoire de la commune de Tibanel…",
        category: "Nature",
    },
    {
        id: 3,
        image: "/images/assekrem.jpg",
        icon: "⛰️",
        name: "Assekrem",
        rating: 4.1,
        description:
            "Un haut plateau situé dans les montagnes du Hoggar, dans le sud de l'Algérie…",
        category: "Nature",
    },
    {
        id: 4,
        image: "/images/cap-carbon.jpg",
        icon: "🏕️",
        name: "Cap Carbon - Béjaïa",
        rating: 4.6,
        description:
            "Un cap algérien situé dans la wilaya de Béjaïa, au nord du port…",
        category: "Plages",
    },
    {
        id: 5,
        image: "/images/djemila.jpg",
        icon: "🏛️",
        name: "Ruines romaines de Djemila",
        rating: 4.5,
        description:
            "Site classé au patrimoine mondial en 1982…",
        category: "Espaces",
    },
    {
        id: 6,
        image: "/images/ghardaia.jpg",
        icon: "🏰",
        name: "Ghardaïa",
        rating: 4.7,
        description:
            "La vallée du M'Zab est classée au patrimoine mondial…",
        category: "Villes",
    },
];


const StarIcon = ({ filled = true }) => (
    <svg
        className={`w-4 h-4 ${filled ? "text-orange-400" : "text-gray-300"
            }`}
        fill="currentColor"
        viewBox="0 0 20 20"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

function PlacesSection() {
    const [activeCategory, setActiveCategory] = useState("Tous");
    const [currentPage, setCurrentPage] = useState(3);

    const filtered =
        activeCategory === "Tous"
            ? places
            : places.filter((p) => p.category === activeCategory);

    return (
        <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto">

            {/* Title */}
            <h2 className="text-3xl font-bold text-center mb-8">
                Découvrez des endroits que vous allez adorer !
            </h2>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full border text-sm ${activeCategory === cat
                            ? "bg-orange-500 text-white"
                            : "bg-white text-gray-700 hover:text-orange-500"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                {filtered.map((place) => (
                    <div key={place.id}>

                        <img
                            src={place.image}
                            alt={place.name}
                            className="w-full h-52 object-cover rounded-xl mb-3"
                        />

                        <div className="flex justify-between mb-2">
                            <div className="flex items-center gap-1">
                                <span>{place.icon}</span>
                                <span className="font-semibold text-sm">
                                    {place.name}
                                </span>
                            </div>

                            <div className="flex items-center gap-1">
                                <StarIcon />
                                <span className="text-sm">{place.rating}</span>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500">
                            {place.description}{" "}
                            <span className="text-orange-500 cursor-pointer">
                                En savoir plus
                            </span>
                        </p>

                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:border-orange-400 hover:text-orange-500 transition-colors"
                >
                    page précédente
                </button>

                <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, "...", 5].map((page, i) => (
                        <button
                            key={i}
                            onClick={() => typeof page === "number" && setCurrentPage(page)}
                            className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${page === currentPage
                                    ? "bg-orange-500 text-white"
                                    : page === "..."
                                        ? "text-gray-400 cursor-default"
                                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                    className="text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:border-orange-400 hover:text-orange-500 transition-colors"
                >
                    Page suivante
                </button>
            </div>
        </section>
    );
};

export default PlacesSection;
