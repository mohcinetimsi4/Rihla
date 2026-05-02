import { useState } from "react";

const guides = [
    {
        id: 1,
        name: "Mohamed",
        location: "De Tipaza",
        rating: 4.7,
        phone: "+213 555 01 23",
        email: "mohamed@rihla.dz",
        langs: ["Arabe", "Français"],
        specialites: ["Sites historiques", "Randonnée"],
        bio: "Rihla m'a permis de découvrir des endroits que je n'aurais jamais trouvés par moi-même. Les recommandations étaient personnalisées et correspondaient vraiment à mes préférences…",
        review: "Rihla m'a permis de découvrir des endroits que je n'aurais jamais trouvés par moi-même. Les recommandations étaient personnalisées et correspondaient vraiment à mes préférences…",
    },
    {
        id: 2,
        name: "Sofia",
        location: "Photographe",
        rating: 4.8,
        phone: "+213 550 22 34",
        email: "sofia@rihla.dz",
        langs: ["Français", "Anglais", "Espagnol"],
        specialites: ["Photographie", "Plages", "Marchés"],
        bio: "Photographe professionnelle passionnée par les paysages algériens. Je guide les voyageurs vers les plus beaux spots photos.",
        review: "Rihla m'a fait découvrir des plages secrètes et des marchés animés que je n'aurais jamais trouvés autrement. Chaque suggestion semblait avoir été faite spécialement pour moi…",
    },
    {
        id: 3,
        name: "Mustapha",
        location: "Blogueur",
        rating: 4.5,
        phone: "+213 541 33 45",
        email: "mustapha@rihla.dz",
        langs: ["Arabe", "Français"],
        specialites: ["Gastronomie", "Culture", "Vie locale"],
        bio: "Blogueur voyageur avec plus de 50 000 abonnés. Je partage mes coups de cœur et mes découvertes culinaires à travers toute l'Algérie.",
        review: "je valide fort, rihla a parfaitement respecté toutes ses recommandations. C'était comme voyager avec un ami du coin.",
    },
    {
        id: 4,
        name: "Amara",
        location: "Ecrivain Voyageur",
        rating: 4.9,
        phone: "+213 560 44 56",
        email: "amara@rihla.dz",
        langs: ["Arabe", "Tamachek", "Français"],
        specialites: ["Désert", "Culture", "Trekking"],
        bio: "Écrivain et grand voyageur, j'ai parcouru l'Algérie dans tous ses recoins. Je guide les curieux vers des trésors culturels et des havres de paix.",
        review: "J'ai découvert des trésors culturels et des havres de paix qui ont rendu mon voyage inoubliable. ce site comprend vraiment les aspirations des voyageurs.",
    },
    {
        id: 5,
        name: "Liamin",
        location: "Randonneur",
        rating: 4.7,
        phone: "+213 555 55 67",
        email: "liamin@rihla.dz",
        langs: ["Arabe", "Français"],
        specialites: ["Randonnée", "Nature", "Montagne"],
        bio: "Passionné de randonnée et de nature, je connais les meilleurs spots loin de la foule. Mon objectif : vous faire vivre une aventure authentique en Algérie.",
        review: "L'appli m'a indiqué les meilleurs spots, loin de la foule. Maintenant, c'est mon outil indispensable pour organiser mes aventures en algérie.",
    },
    {
        id: 6,
        name: "Hanane",
        location: "Etudiante",
        rating: 4.8,
        phone: "+213 542 66 78",
        email: "hanane@rihla.dz",
        langs: ["Arabe", "Français", "Anglais"],
        specialites: ["Ville", "Culture", "Patrimoine"],
        bio: "Étudiante passionnée par son pays, je fais découvrir les trésors cachés de l'Algérie aux voyageurs qui veulent sortir des sentiers battus.",
        review: "J'adore cette plateforme elle est nous a permis de découvrir notre pays et ses tresors cachés.",
    },
];

const StarIcon = () => (
    <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const AvatarIcon = () => (
    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
        <svg className="w-7 h-7 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
    </div>
);

const AvatarLarge = () => (
    <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-4">
        <svg className="w-12 h-12 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
    </div>
);

// Modal détail guide
const GuideModal = ({ guide, onClose }) => {
    if (!guide) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 relative max-h-screen overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Bouton fermer */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                >
                    ✕
                </button>

                {/* Avatar */}
                <AvatarLarge />

                {/* Nom & role */}
                <h3 className="text-xl font-bold text-gray-900 text-center">{guide.name}</h3>
                <p className="text-gray-400 text-sm text-center mt-1">{guide.location}</p>

                {/* Note */}
                <div className="flex items-center justify-center gap-1 mt-2">
                    {[...Array(Math.floor(guide.rating))].map((_, i) => (
                        <StarIcon key={i} />
                    ))}
                    <span className="text-sm font-semibold text-gray-700 ml-1">{guide.rating}</span>
                </div>

                <hr className="my-4 border-gray-100" />

                {/* Infos */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-sm w-24">Téléphone</span>
                        <span className="text-sky-500 font-medium text-sm">{guide.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-sm w-24">Email</span>
                        <span className="text-sky-500 font-medium text-sm">{guide.email}</span>
                    </div>
                </div>

                <hr className="my-4 border-gray-100" />

                {/* Langues */}
                <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Langues parlées</p>
                    <div className="flex flex-wrap gap-2">
                        {guide.langs.map((l) => (
                            <span key={l} className="text-xs px-3 py-1 rounded-full bg-sky-100 text-sky-700">
                                {l}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Spécialités */}
                <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Spécialités</p>
                    <div className="flex flex-wrap gap-2">
                        {guide.specialites.map((s) => (
                            <span key={s} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Bio */}
                <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">À propos</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{guide.bio}</p>
                </div>

                {/* Boutons */}
                <button className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-colors mb-2">
                    Contacter ce guide
                </button>
                <button className="w-full py-2.5 border border-sky-500 text-sky-500 hover:bg-sky-50 font-semibold rounded-xl transition-colors">
                    Réserver une visite
                </button>
            </div>
        </div>
    );
};

const GuidesSection = () => {
    const [selectedGuide, setSelectedGuide] = useState(null);

    return (
        <section className="bg-gray-50 py-16 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Nos guides</h2>
                    <p className="text-gray-500 text-base">
                        Des témoignages authentiques d'explorateurs qui ont trouvé l'expérience locale idéale grâce à Rihla
                    </p>
                </div>

                {/* Guides Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {guides.map((guide) => (
                        <div
                            key={guide.id}
                            className="bg-white rounded-2xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:border hover:border-sky-300 transition-all"
                            onClick={() => setSelectedGuide(guide)}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <AvatarIcon />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">{guide.name}</p>
                                        <p className="text-gray-400 text-xs">{guide.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <StarIcon />
                                    <span className="text-sm font-semibold text-gray-700">{guide.rating}</span>
                                </div>
                            </div>

                            {/* Review */}
                            <p className="text-gray-500 text-sm leading-relaxed">{guide.review}</p>

                            {/* Voir profil */}
                            <p className="text-sky-500 text-xs font-medium mt-3">Voir le profil →</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <GuideModal
                guide={selectedGuide}
                onClose={() => setSelectedGuide(null)}
            />
        </section>
    );
};

export default GuidesSection;
