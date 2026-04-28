import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useState, useEffect } from "react";

const guides = [
    {
        id: 1,
        name: "Mohamed Aït Hamou",
        location: "Tipaza",
        specialty: "Sites antiques & histoire",
        rating: 4.7,
        reviews: 128,
        languages: ["Arabe", "Français"],
        avatar: null,
        badge: "Expert",
        bio: "Passionné d'histoire romaine et berbère, Mohamed guide depuis 12 ans à travers les ruines de Tipaza et les sites classés UNESCO d'Algérie.",
        trips: 340,
    },
    {
        id: 2,
        name: "Sofia Meziane",
        location: "Béjaïa",
        specialty: "Photographie & nature",
        rating: 4.8,
        reviews: 95,
        languages: ["Kabyle", "Français", "Anglais"],
        avatar: null,
        badge: "Top Guide",
        bio: "Photographe professionnelle et randonneuse, Sofia révèle les paysages secrets de la Kabylie et des côtes de Béjaïa.",
        trips: 210,
    },
    {
        id: 3,
        name: "Mustapha Brahimi",
        location: "Ghardaïa",
        specialty: "Désert & culture mozabite",
        rating: 4.5,
        reviews: 74,
        languages: ["Arabe", "Français"],
        avatar: null,
        badge: "Certifié",
        bio: "Né dans la vallée du M'Zab, Mustapha partage la richesse de la culture mozabite et organise des circuits dans le désert algérien.",
        trips: 180,
    },
    {
        id: 4,
        name: "Amara Ouali",
        location: "Tlemcen",
        specialty: "Architecture islamique & art",
        rating: 4.9,
        reviews: 203,
        languages: ["Arabe", "Français", "Espagnol"],
        avatar: null,
        badge: "Top Guide",
        bio: "Historien de l'art et guide certifié, Amara fait découvrir l'âge d'or de Tlemcen et ses monuments andalous exceptionnels.",
        trips: 520,
    },
    {
        id: 5,
        name: "Liamin Ouchen",
        location: "Tamanrasset",
        specialty: "Randonnée & Hoggar",
        rating: 4.7,
        reviews: 156,
        languages: ["Tamazight", "Arabe", "Français"],
        avatar: null,
        badge: "Expert",
        bio: "Guide Touareg natif du Hoggar, Liamin mène des expéditions à l'Assekrem et dans les paysages lunaires du Sahara central.",
        trips: 290,
    },
    {
        id: 6,
        name: "Hanane Khelifa",
        location: "Alger",
        specialty: "Gastronomie & culture urbaine",
        rating: 4.8,
        reviews: 112,
        languages: ["Arabe", "Français", "Anglais"],
        avatar: null,
        badge: "Top Guide",
        bio: "Experte en culture algéroise, Hanane propose des circuits culinaires dans la Casbah et des visites des quartiers artistiques d'Alger.",
        trips: 380,
    },
];



const StarRow = ({ rating }) => (
    <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
            <svg
                key={s}
                className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "text-orange-400" : "text-gray-200"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

const AvatarPlaceholder = ({ name, size = "lg" }) => {
    const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("");
    const sizeClasses = size === "lg" ? "w-20 h-20 text-2xl" : "w-12 h-12 text-base";
    const colors = [
        "bg-orange-100 text-orange-600",
        "bg-amber-100 text-amber-700",
        "bg-stone-100 text-stone-600",
        "bg-red-100 text-red-600",
    ];
    const color = colors[name.charCodeAt(0) % colors.length];
    return (
        <div className={`${sizeClasses} ${color} rounded-full flex items-center justify-center font-bold shrink-0`}>
            {initials}
        </div>
    );
};

function GuidesPage() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const [selectedGuide, setSelectedGuide] = useState(null);
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* ── HERO ── */}
            <div
                className="relative w-full h-[60vh] flex items-center justify-center"
                style={{
                    backgroundImage: "url('/images/hero-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center 30%",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

                {/* pt-20 pousse le contenu sous la navbar (~80px) sans le sortir du cadre */}
                <div className="relative z-10 w-full flex flex-col items-center text-center px-6 pt-20">

                    <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight mb-4 max-w-2xl">
                        Voyagez avec un expert du terrain
                    </h1>
                    <p className="text-white/70 text-base leading-relaxed max-w-xl">
                        Des guides passionnés, certifiés, et profondément enracinés dans leur territoire. Chaque guide est une porte d'entrée vers l'Algérie authentique.
                    </p>

                    {/* Stats row */}
                    <div className="flex gap-4 mt-8">
                        {[
                            { value: "120+", label: "Guides certifiés" },
                            { value: "48", label: "Wilayas couvertes" },
                            { value: "4.8★", label: "Note moyenne" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center bg-black/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3">
                                <p className="text-white font-extrabold text-xl">{stat.value}</p>
                                <p className="text-black/60 text-xs mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── GUIDES GRID ── */}
            <div className="max-w-6xl mx-auto px-6 pt-12 pb-20">
                <div className="flex items-baseline justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Nos guides</h2>
                        <p className="text-gray-400 text-sm mt-1">{guides.length} guides disponibles</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {guides.map((guide) => (
                        <div
                            key={guide.id}
                            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <AvatarPlaceholder name={guide.name} />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm leading-tight">{guide.name}</p>
                                        <p className="text-gray-400 text-xs mt-0.5">📍 {guide.location}</p>
                                    </div>
                                </div>
                               
                            </div>

                            {/* Specialty */}
                            <div className="mb-3">
                                <span className="inline-block bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
                                    {guide.specialty}
                                </span>
                            </div>

                            {/* Bio */}
                            <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                                {guide.bio}
                            </p>

                            {/* Languages */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {guide.languages.map((lang) => (
                                    <span key={lang} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                        {lang}
                                    </span>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    <StarRow rating={guide.rating} />
                                    <span className="text-sm font-bold text-gray-800">{guide.rating}</span>
                                    <span className="text-xs text-gray-400">({guide.reviews} avis)</span>
                                </div>
                                <span className="text-xs text-gray-400">{guide.trips} voyages</span>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => setSelectedGuide(guide)}
                                className="mt-4 w-full bg-gray-900 hover:bg-orange-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors duration-200"
                            >
                                Contacter ce guide
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── BECOME A GUIDE CTA ── */}
            <div className="max-w-6xl mx-auto px-6 pb-16">
                <div className="relative bg-gray-900 rounded-3xl overflow-hidden p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-20 w-40 h-40 bg-orange-500/5 rounded-full translate-y-1/2 pointer-events-none" />

                    <div className="relative z-10">
                        <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">
                            Rejoignez notre réseau
                        </p>
                        <h2 className="text-white text-3xl font-extrabold mb-3 leading-tight">
                            Vous connaissez votre région<br />comme votre poche ?
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                            Partagez votre territoire, transmettez votre culture et générez des revenus en devenant guide certifié Rihla. Plus de 120 guides nous font déjà confiance.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-6">
                            {["Profil vérifié", "Paiements sécurisés", "Accompagnement", "Visibilité nationale"].map((f) => (
                                <div key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                                    <span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">✓</span>
                                    {f}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setShowForm(true)}
                        className="relative z-10 shrink-0 bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-2xl transition-colors text-base whitespace-nowrap shadow-xl shadow-orange-500/20"
                    >
                        Devenir guide →
                    </button>
                </div>
            </div>

            {/* ── CONTACT MODAL ── */}
            {selectedGuide && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
                        <div className="bg-gray-900 px-6 py-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <AvatarPlaceholder name={selectedGuide.name} size="sm" />
                                <div>
                                    <p className="text-white font-bold text-sm">{selectedGuide.name}</p>
                                    <p className="text-gray-400 text-xs">{selectedGuide.specialty}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedGuide(null)} className="text-gray-400 hover:text-white text-xl transition-colors">✕</button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Votre nom</label>
                                <input type="text" placeholder="Ex: Ahmed Benali" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email ou téléphone</label>
                                <input type="text" placeholder="contact@exemple.com" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Date souhaitée</label>
                                <input type="date" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Votre message</label>
                                <textarea rows={3} placeholder="Décrivez votre projet de voyage..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors resize-none"></textarea>
                            </div>
                            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors">
                                Envoyer la demande
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── BECOME GUIDE MODAL ── */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
                        <div className="bg-gray-900 px-6 py-5 flex items-center justify-between">
                            <div>
                                <p className="text-white font-bold">Devenir guide Rihla</p>
                                <p className="text-gray-400 text-xs">Rejoignez notre communauté de guides certifiés</p>
                            </div>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white text-xl transition-colors">✕</button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Prénom</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nom</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Wilaya / Région</label>
                                <input type="text" placeholder="Ex: Béjaïa, Tamanrasset..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Spécialité</label>
                                <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors bg-white">
                                    <option value="">Choisissez votre domaine</option>
                                    <option>Nature & Randonnée</option>
                                    <option>Histoire & Patrimoine</option>
                                    <option>Désert & Aventure</option>
                                    <option>Gastronomie & Culture</option>
                                    <option>Photographie</option>
                                    <option>Architecture & Art</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Langues parlées</label>
                                <div className="flex flex-wrap gap-2">
                                    {["Arabe", "Français", "Anglais", "Kabyle", "Tamazight", "Espagnol"].map((lang) => (
                                        <label key={lang} className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
                                            <input type="checkbox" className="accent-orange-500" />
                                            {lang}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Parlez-nous de vous</label>
                                <textarea rows={3} placeholder="Votre expérience, vos passions, ce que vous souhaitez partager..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors resize-none"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                                <input type="email" placeholder="votre@email.com" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors" />
                            </div>
                            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors">
                                Soumettre ma candidature
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default GuidesPage;
