import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaPen } from "react-icons/fa";
import { useState, useEffect } from "react";

const restaurants = [
    {
        id: 1,
        title: "Dar  Yemma Casbah",
        image: "/images/dar-yemma.png",
        category: "Traditionnel",
        rating: 4.5,
        description: "Restaurant Dar Yemma Casbah niché en plein coeur de la Casbah d'Alger est spécialisé dans la cuisine algérienne : tajines, couscous, rechta, boulettes de sardines ....tout pour vous régalez .Dans l'après midi le restaurant propose du thé à la menthe verte, du café et des gâteaux pour finir la journée en toute gourmandise.",
        horaires: "11:30  - 18:00 chaque jour appart vendredi",
        adresse: "6 Rue Larbi Triki, Casbah 16017",
        telephone: "0550 980 850",
        specialites: ["Bourek et chirbet","Rechta",  "Couscous", "Tajine Poulet et Frites Maison","Boulettes de sardines",],
        gamme: "Moyenne",
    },
    {
        id: 2,
        title: "   Da Ali Boulaglace",
        image: "/images/da-ali.png",
        category: "Fast-Food",
        rating: 4.1,
        description: "Célèbre pour son créponné traditionnel et sa garantita. Fondé en 1931, cet établissement est considéré comme l'un des plus anciens glaciers de la ville ",
        horaires: "informations manquantes",
        adresse: "Q33M+794, Béjaïa",
        telephone: "informations manquantes",
        specialites: ["crèmes glacées", "Garantita", "Boissons Chirbet", "Pizza"],
        gamme: "Basse",
    },
    {
        id: 3,
        title: "    Taj  Mahal",
        image: "/images/taj.jpg",
        category: "Gastronomique",
        rating: 4.4,
        description: "Le restaurant Taj Mahal de Chéraga est une véritable référence gastronomique indienne au cœur d'Alger. Dans un cadre élégant et exotique, des chefs spécialisés vous préparent des spécialités authentiques et parfumées comme le célèbre butter chicken et les pains naans cuits au tandoor. C'est l'adresse idéale pour partager un repas chaleureux et voyager à travers les saveurs envoûtantes du sous-continent indien.",
        horaires: "11:30 - 23:00 ",
        adresse: "43 Route de Cheraga, Chéraga",
        telephone: "020 37 73 77",
        specialites: ["Butter Chicken and Mutton Massala", "Cheese Naan", "Chicken Biryani", "Murgh Makhani"],
        gamme: "Élevée",
    },
    {
        id: 4,
        title: "Dar leila - Bejaia",
        image: "/images/dar-layla.jpg",
        category: "Gastronomique",
        rating: 3.5,
        description: "Situé à Béjaïa, ce restaurant revisite la gastronomie algérienne avec élégance et authenticité. Entre plats traditionnels soigneusement préparés, présentations raffinées et ambiance conviviale, il offre une expérience culinaire qui met en valeur les saveurs du terroir. Dans un décor soigné et chaleureux, c’est l’adresse idéale pour déguster des spécialités locales, partager un repas en famille ou entre amis, et découvrir toute la richesse de la cuisine algérienne à Béjaïa",
        horaires: "07:00 - 23:00",
        adresse: "Rue Mahfoudi Fatah, Bejaia 06000 Algérie",
        telephone: "0799 59 54 36",
        specialites: ["Salade César", "Assiete de Fromages", "Méchoui d'agneau", "Pizza Napoliataine"],
        gamme: "moyenne",
    },
    {
        id: 5,
        title: "Sardines frites - Le Roi de la Loubia",
        image: "/images/roi.jpg",
        category: "Traditionnel",
        rating: 4.1,
        description: " est une institution culinaire mythique située au cœur d'Alger. Ce restaurant populaire est mondialement connu pour son plat de haricots blancs en sauce rouge, devenu un passage obligatoire pour les locaux et les touristes..",
        horaires: "10:00 - 20:00",
        adresse: "Q3H5+CF6, Rue Mohamed Sidhoum, ex rue de Tanger, Alger Centre",
        telephone: "021740291",
        specialites: ["Loubia", "Sardines", "Salade", "Salade de poivrons"],
        gamme: "Moyenne",
    },
    {
        id: 6,
        title: "Le tunnel burger",
        image: "/images/tunnel.png",
        category: "fast-food",
        rating: 4.9,
        description: "Le Tunnel Fast Food & Café est un restaurant situé au 12 Avenue Pasteur, Alger Centre, offrant des burgers et des options de restauration rapide dans une ambiance conviviale. Ouvert jusqu'à minuit, il est particulièrement apprécié des étudiants et propose un service de livraison.",
        horaires: "11:00 - 00:00",
        adresse: "12 Av. Pasteur, Alger Centre 16000",
        telephone: "0798288546",
        specialites: ["Burgers"],
        gamme: "moyenne",
    },
];

function RestaurantDetails() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const { id } = useParams();
    const [openAvis, setOpenAvis] = useState(false);
    const [note, setNote] = useState(null);

    const restaurant = restaurants.find((r) => r.id === parseInt(id));

    if (!restaurant) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Restaurant introuvable</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero */}
            <div className="relative w-full h-[60vh]">
                <img src={restaurant.image} alt={restaurant.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-end p-10">
                    <div>
                        <span className="bg-sky-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block">
                            {restaurant.category}
                        </span>
                        <h1 className="text-white text-4xl font-bold">{restaurant.title}</h1>
                        <p className="text-white/80 mt-1">📍 {restaurant.adresse}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto p-6 mt-8">

                {/* Rating */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-sky-400 text-xl">★</span>
                        <span className="font-bold text-gray-800 text-lg">{restaurant.rating}</span>
                        <span className="text-gray-400 text-sm">/ 5</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>🕐 {restaurant.horaires}</span>
                        <span>•</span>
                        <span>📞 {restaurant.telephone}</span>
                    </div>
                </div>

                {/* Boutons */}
                <div className="flex gap-4 mb-6">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-100 transition">
                        <FaHeart /> Enregistrer
                    </button>
                    <button
                        onClick={() => setOpenAvis(true)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-100 transition"
                    >
                        <FaPen /> Avis
                    </button>
                </div>

                {/* Description */}
                <h2 className="text-2xl font-semibold mb-3">À propos</h2>
                <p className="text-gray-700 leading-relaxed mb-8">{restaurant.description}</p>

                {/* Cards infos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border rounded-lg shadow-sm">
                        <h3 className="font-bold mb-3">Spécialités</h3>
                        <ul className="space-y-1">
                            {restaurant.specialites.map((s, i) => (
                                <li key={i} className="text-gray-600 text-sm flex items-center gap-2">
                                    <span className="text-sky-400">🍽️</span> {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-4 border rounded-lg shadow-sm">
                        <h3 className="font-bold mb-3">Infos pratiques</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p>🕐 Horaires : <span className="font-medium text-gray-800">{restaurant.horaires}</span></p>
                            <p>💰 Gamme de prix : <span className="font-medium text-gray-800">{restaurant.gamme}</span></p>
                            <p>📍 Adresse : <span className="font-medium text-gray-800">{restaurant.adresse}</span></p>
                            <p>📞 Téléphone : <span className="font-medium text-gray-800">{restaurant.telephone}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Avis */}
            {openAvis && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Votre avis</h2>
                            <button onClick={() => setOpenAvis(false)}>❌</button>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold mb-2">Quelle note donneriez-vous ?</p>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <button
                                        key={n}
                                        onClick={() => setNote(n)}
                                        className={`px-3 py-2 border rounded transition ${note === n ? "bg-sky-500 text-white border-sky-500" : "hover:bg-gray-100"}`}
                                    >
                                        {n} ⭐
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Quand y êtes-vous allé ?</label>
                            <input type="month" className="w-full border p-2 rounded" />
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold mb-2">Qui vous accompagnait ?</p>
                            <div className="grid grid-cols-2 gap-2">
                                {["Affaires", "Couples", "En famille", "Amis", "Solo"].map((type) => (
                                    <button key={type} className="border p-2 rounded hover:bg-gray-100">{type}</button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <input type="text" placeholder="Donnez un titre à votre avis" className="w-full border p-2 rounded" />
                        </div>
                        <div className="mb-4">
                            <textarea placeholder="Décrivez votre expérience" className="w-full border p-2 rounded h-24"></textarea>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold mb-2">Ajoutez des photos</p>
                            <input type="file" multiple />
                        </div>
                        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                            Publier l'avis
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default RestaurantDetails;
