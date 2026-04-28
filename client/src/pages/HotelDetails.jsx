import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useParams } from "react-router-dom";
import { FaHeart, FaPen } from "react-icons/fa";
import { useState, useEffect } from "react";
import ReservationModal from "../components/home/ReservationModal";

const hotels = [
    {
        id: 1,
        title: "Atlantis Béjaïa Aéroport",
        image: "/images/atlantis-bejaia.jpg",
        category: "Luxe",
        rating: 4.6,
        description: "Hotel majestueux, restaurant spa et piscine. Situé à proximité de l'aéroport de Béjaïa, l'Atlantis offre un confort exceptionnel avec des chambres spacieuses et des installations modernes.",
        amenities: ["Piscine", "Spa", "Restaurant", "Wifi gratuit", "Parking"],
        price: "8 500 DA / nuit",
        address: "Béjaïa, Algérie",
    },
    {
        id: 2,
        title: "Sheraton Club Des Pins Resort",
        image: "/images/club-pin.jpg",
        category: "Resort",
        rating: 4.3,
        description: "Un cadre de luxe et une gamme de services conçus pour sublimer votre séjour à Staoueli. Face à la mer, ce resort offre une expérience unique.",
        amenities: ["Plage privée", "Piscine", "Spa", "Restaurant", "Tennis"],
        price: "15 000 DA / nuit",
        address: "Staoueli, Alger, Algérie",
    },
    {
        id: 3,
        title: "Royal Hotel Oran - MGallery Collection",
        image: "/images/hotel-oran.jpg",
        category: "Classique",
        rating: 4.1,
        description: "Luxe et élégance dans un superbe palace historique orné de mobilier ancien et d'œuvres d'art. Une expérience unique au cœur d'Oran.",
        amenities: ["Restaurant gastronomique", "Bar", "Salle de conférence", "Wifi", "Conciergerie"],
        price: "12 000 DA / nuit",
        address: "Centre-ville, Oran, Algérie",
    },
    {
        id: 4,
        title: "Royal Tulip Skikda",
        image: "/images/royal-tulip-skikda.jpg",
        category: "Luxe",
        rating: 4.6,
        description: "Un hôtel 5 étoiles de luxe situé à Filfila, offrant un accès direct à une plage privée et des prestations haut de gamme.",
        amenities: ["Plage privée", "Piscine", "Spa", "Restaurant", "Wifi gratuit"],
        price: "13 000 DA / nuit",
        address: "Filfila, Skikda, Algérie",
    },
    {
        id: 5,
        title: "Ibis Setif",
        image: "/images/ibis-setif.jpg",
        category: "Luxe",
        rating: 4.5,
        description: "Localisé en plein centre ville, l'ibis Sétif est le premier hôtel économique du groupe Accor dans la ville, idéal pour les voyageurs d'affaires.",
        amenities: ["Restaurant", "Bar", "Wifi gratuit", "Parking", "Salle de sport"],
        price: "5 500 DA / nuit",
        address: "Centre-ville, Sétif, Algérie",
    },
    {
        id: 6,
        title: "Ibis Alger Aéroport",
        image: "/images/ibis-alger-aeroport.jpg",
        category: "Luxe",
        rating: 4.7,
        description: "Situé à 5 min de l'aéroport international Houari Boumediene, l'ibis Alger Aéroport propose 264 chambres climatisées et insonorisées.",
        amenities: ["Navette aéroport", "Restaurant", "Wifi gratuit", "Parking", "Climatisation"],
        price: "6 000 DA / nuit",
        address: "Aéroport Houari Boumediene, Alger, Algérie",
    },
];

function HotelDetails() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { id } = useParams();
    const [openAvis, setOpenAvis] = useState(false);
    const [openReservation, setOpenReservation] = useState(false);
    const [note, setNote] = useState(null);

    const hotel = hotels.find((h) => h.id === parseInt(id));

    if (!hotel) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Hôtel introuvable</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Image */}
            <div className="relative w-full h-[60vh]">
                <img
                    src={hotel.image}
                    alt={hotel.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-10">
                    <div>
                        <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block">
                            {hotel.category}
                        </span>
                        <h1 className="text-white text-4xl font-bold">{hotel.title}</h1>
                        <p className="text-white/80 mt-1">📍 {hotel.address}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto p-6 mt-8">

                {/* Rating + Prix */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-orange-400 text-xl">★</span>
                        <span className="font-bold text-gray-800 text-lg">{hotel.rating}</span>
                        <span className="text-gray-400 text-sm">/ 5</span>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-orange-500">{hotel.price}</span>
                    </div>
                </div>

                {/* Boutons */}
                <div className="flex gap-4 mb-6">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-100 transition">
                        <FaHeart />
                        Enregistrer
                    </button>
                    <button
                        onClick={() => setOpenAvis(true)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-100 transition"
                    >
                        <FaPen />
                        Avis
                    </button>
                </div>

                {/* Description */}
                <h2 className="text-2xl font-semibold mb-3">À propos de {hotel.title}</h2>
                <p className="text-gray-700 leading-relaxed mb-8">{hotel.description}</p>

                {/* Équipements + Réservation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border rounded-lg shadow-sm">
                        <h3 className="font-bold mb-3">Équipements</h3>
                        <ul className="space-y-1">
                            {hotel.amenities.map((a, i) => (
                                <li key={i} className="text-gray-600 text-sm flex items-center gap-2">
                                    <span className="text-orange-400">✓</span> {a}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-4 border rounded-lg shadow-sm">
                        <h3 className="font-bold mb-3">Réservation</h3>
                        <p className="text-gray-500 text-sm mb-4">Meilleure période : toute l'année</p>
                        <button
                            onClick={() => setOpenReservation(true)}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
                        >
                            Réserver maintenant
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Réservation */}
            {openReservation && (
                <ReservationModal
                    hotel={hotel}
                    onClose={() => setOpenReservation(false)}
                />
            )}

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
                                        className={`px-3 py-2 border rounded transition ${note === n ? "bg-orange-500 text-white border-orange-500" : "hover:bg-gray-100"}`}
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
                                    <button key={type} className="border p-2 rounded hover:bg-gray-100">
                                        {type}
                                    </button>
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

export default HotelDetails;