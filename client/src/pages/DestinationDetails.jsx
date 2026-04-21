import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PlacesSection from "../components/home/DestinationCard";
import { useParams } from "react-router-dom";
import { FaHeart, FaPen } from "react-icons/fa";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import Map from "../components/home/Map";
import { useEffect } from "react";

// Exemple de données (tu pourras remplacer par API plus tard)
const destinations = [
    {
        id: 1,
        title: "La grande mosquée d'Alger",
        image: "/images/grande-mosquee.jpg",
        lat:36.73506725874315, lng:3.1405542903755954 ,
        description:
           "la troisième plus grande au monde, derrière la mosquée al-Haram et la mosquée du Prophète …",
    },
    {
         id: 2,
        image: "/images/lac-agoulmim.jpg",
        icon: "🏔️",
       title: "Lac Agoulmim",
        rating: 4.3,
        lat:36.61845558503714, lng: 4.63333294977453,
        description:
            "un lac situé dans le massif de l'Akfadou, sur le territoire de la commune de Tibanel…",
        category: "Nature",
    },
    {
        id: 3,
        image: "/images/assekrem.jpg",
        icon: "⛰️",
        title: "Assekrem",
        rating: 4.1,
        lat:23.306454711074895, lng: 6.3241006762704695,
        description:
            "L'Assekrem est un haut plateau situé dans les montagnes du Hoggar, dans le sud de l'Algérie…",
        category: "Nature",
    },
     {
        id: 4,
        image: "/images/cap-carbon.jpg",
        icon: "🏕️",
        title: "Cap Carbon - Bejaia",
        rating: 4.6,
        lat: 36.7695,
    lng: 5.1053,
        description:
            "Le cap Carbon est un cap algérien situé dans la wilaya de Béjaïa, au nord du port de Béjaïa…",
        category: "Plages",
    },
    {
        id: 5,
        image: "/images/djemila.jpg",
        icon: "🏛️",
        title: "Ruines romaines de Djemila",
        rating: 4.5,
        lat:36.32022509269923, lng:5.736590526331529,
        description:
            "Le site occupe environ 42 hectares. Il a été classé au patrimoine mondial en 1982…",
        category: "Espaces",
    },
    {
        id: 6,
        image: "/images/ghardaia.jpg",
        icon: "🏰",
        title: "Le monument de Sidi Abaz - Ghardaïa",
        rating: 4.7,
        lat:32.48634263988003, lng:3.699599561865018,
        description:
            "La vallée du M'Zab est classée au patrimoine mondial de l'UNESCO pour ses ksour (villages fortifiés)…",
        category: "Villes",
    },
];

function DestinationDetails() {
    useEffect(() => {
    window.scrollTo(0, 0);
}, []);
    const { id } = useParams();
    const [openAvis, setOpenAvis] = useState(false);

    const destination = destinations.find((d) => d.id === parseInt(id));

    if (!destination) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Destination introuvable</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* HERO STYLE SIMILAIRE À HOME */}
            <div className="relative w-full h-[60vh]">
                <img
                    src={destination.image}
                    alt={destination.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-10">
                    <h1 className="text-white text-4xl font-bold">
                        {destination.title}
                    </h1>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="max-w-5xl mx-auto p-6 mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                    À propos de {destination.title}
                </h2>
                <div className="flex gap-4 mb-6">
                    
                    
    {/* Bouton Enregistrer */}
    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-100 transition">
        <FaHeart />
        Enregistrer
    </button>

    {/* Bouton Avis */}
  <button
    onClick={() => setOpenAvis(true)}
    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-100 transition"
>
    <FaPen />
    Avis
</button>
</div>

                <p className="text-gray-700 leading-relaxed">
                    {destination.description}
                </p>

                {/* section bonus style cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    <div className="p-4 border rounded-lg shadow-sm">
                        <h3 className="font-bold mb-2">Activités</h3>
                        <p>Découverte, tourisme, culture locale.</p>
                    </div>

                    <div className="p-4 border rounded-lg shadow-sm">
                        <h3 className="font-bold mb-2">Conseils</h3>
                        <p>Meilleure période : printemps / automne.</p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
    <h3 className="text-xl font-semibold mb-2">Localisation</h3>

    <Map
        lat={destination.lat}
        lng={destination.lng}
        title={destination.title}
    />

    <a
        href={`https://www.google.com/maps?q=${destination.lat},${destination.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline mt-2 inline-block"
    >
        Voir sur Google Maps
    </a>
</div>
{openAvis && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg overflow-y-auto max-h-[90vh]">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Votre avis</h2>
                <button onClick={() => setOpenAvis(false)}>❌</button>
            </div>

            {/* NOTE */}
            <div className="mb-4">
                <p className="font-semibold mb-2">
                    Quelle note donneriez-vous à votre expérience ?
                </p>
                <div className="flex gap-2">
                    {[1,2,3,4,5].map((n) => (
                        <button
                            key={n}
                            className="px-3 py-2 border rounded hover:bg-gray-100"
                        >
                            {n} ⭐
                        </button>
                    ))}
                </div>
            </div>

            {/* DATE */}
            <div className="mb-4">
                <label className="block font-semibold mb-1">
                    Quand y êtes-vous allé ?
                </label>
                <input
                    type="month"
                    className="w-full border p-2 rounded"
                />
            </div>

            {/* TYPE VISITE */}
            <div className="mb-4">
                <p className="font-semibold mb-2">
                    Qui vous accompagnait ?
                </p>
                <div className="grid grid-cols-2 gap-2">
                    {["Affaires","Couples","En famille","Amis","Solo"].map((type) => (
                        <button
                            key={type}
                            className="border p-2 rounded hover:bg-gray-100"
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* TITRE */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Donnez un titre à votre avis"
                    className="w-full border p-2 rounded"
                />
            </div>

            {/* COMMENTAIRE */}
            <div className="mb-4">
                <textarea
                    placeholder="Décrivez votre expérience"
                    className="w-full border p-2 rounded h-24"
                ></textarea>
            </div>

            {/* PHOTOS */}
            <div className="mb-4">
                <p className="font-semibold mb-2">Ajoutez des photos</p>
                <input type="file" multiple />
            </div>

            {/* BUTTON */}
            <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                Publier l’avis
            </button>

        </div>
    </div>
)}
            <Footer />
        </div>
    );
}

export default DestinationDetails;