import { Link } from "react-router-dom";
import { useState } from "react";

const categories = ["Tous", "Traditionnel", "Fast-Food", "Gastronomique", "Café"];

const restaurants = [
    {
        id: 1,
        image: "/images/dar-yemma.png",
        name: " Dar  Yemma Casbah",
        rating: 4.5,
        description: "niché en plein coeur de la Casbah d'Alger est spécialisé dans la cuisine algérienne : tajines, couscous, rechta, boulettes de sardines . ....",
        category: "Traditionnel",
    },
    {
        id: 2,
        image: "/images/da-ali.png",
        name: "   Da Ali Boulaglace",
        rating: 4.1,
        description: ", célèbre pour son créponné traditionnel et sa garantita. Fondé en 1931, cet établissement est considéré comme l'un des plus anciens glaciers de la ville ....  En savoir plus",
        category: "Fast-Food",
    },
    {
        id: 3,
        image: "/images/taj.jpg",
        name: "    Taj  Mahal",
        rating: 4.3,
        description: "Le restaurant Taj Mahal de Chéraga est une véritable référence gastronomique indienne…",
        category: "Gastronomique",
    },
    {
        id: 4,
        image: "/images/dar-layla.jpg",
        name: "Dar leila - Bejaia",
        rating: 3.5,
        description: "Situé à Béjaïa, ce restaurant revisite la gastronomie algérienne avec élégance et …",
        category: "Gastronomique",
    },
    {
        id: 5,
        image: "/images/roil.png",
        name: "Sardines frites - Le Roi de la Loubia",
        rating: 4.1,
        description: " est une institution culinaire mythique située au cœur d'Alger…",
        category: "Fast-Food",
    },
    {
        id: 6,
        image: "/images/tunnel.png",
        name: "Le tunnel burger",
        rating: 4.9,
        description: "Le Tunnel Fast Food & Café est un restaurant situé au 12 Avenue Pasteur, Alger Centre, offrant …",
        category: "Fast-Food",
    },
];

const StarIcon = () => (
    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const RestaurantSection = () => {
    const [activeCategory, setActiveCategory] = useState("Tous");
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = activeCategory === "Tous"
        ? restaurants
        : restaurants.filter((r) => r.category === activeCategory);

    return (
        <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Découvrez nos meilleurs restaurants !
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full border font-medium text-sm transition-colors ${
                            activeCategory === cat
                                ? "bg-orange-500 text-white border-orange-500"
                                : "bg-white text-gray-700 border-gray-300 hover:border-orange-400 hover:text-orange-500"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                {filtered.map((resto) => (
                    <Link
                        to={`/restaurant/${resto.id}`}
                        key={resto.id}
                        className="flex flex-col hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                        <div className="w-full h-52 rounded-xl overflow-hidden mb-3">
                            <img
                                src={resto.image}
                                alt={resto.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="font-semibold text-gray-900 text-sm">{resto.name}</span>
                            <div className="flex items-center gap-1">
                                <StarIcon />
                                <span className="text-sm font-semibold text-gray-700">{resto.rating}</span>
                            </div>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed">
                            {resto.description}{" "}
                            <span className="text-orange-500 font-medium hover:underline">En savoir plus</span>
                        </p>
                    </Link>
                ))}
            </div>

            <div className="flex items-center justify-between mt-6">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:border-orange-400 hover:text-orange-500 transition-colors"
                >
                    Page précédente
                </button>
                <div className="flex items-center gap-2">
                    {[1, 2, 3].map((page, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                                page === currentPage
                                    ? "bg-orange-500 text-white"
                                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
                    className="text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:border-orange-400 hover:text-orange-500 transition-colors"
                >
                    Page suivante
                </button>
            </div>
        </section>
    );
};

export default RestaurantSection;