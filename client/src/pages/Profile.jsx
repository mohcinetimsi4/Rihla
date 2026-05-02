import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useState, useRef } from "react";


const Profile = () => {
    const fileInputRef = useRef(null);

    const [editing, setEditing] = useState(false);
    const [saved, setSaved] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [activeTab, setActiveTab] = useState("informations");

    const [form, setForm] = useState({
        prenom: "Karim",
        nom: "SALHI",
        email: "s.karim@gmail.com",
        telephone: "+213 770 123 456",
        ville: "Alger",
        langue: "Français",
        bio: "Passionné de voyages et de découvertes à travers l'Algérie. J'aime explorer les sites historiques et les paysages naturels.",
        dateNaissance: "1992-04-15",
        genre: "Homme",
    });

    const [tempForm, setTempForm] = useState({ ...form });

    const handleEdit = () => {
        setTempForm({ ...form });
        setEditing(true);
        setSaved(false);
    };

    const handleCancel = () => {
        setTempForm({ ...form });
        setEditing(false);
    };

    const handleSave = () => {
        setForm({ ...tempForm });
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatarPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const initials = `${form.prenom[0]}${form.nom[0]}`.toUpperCase();

    const villes = [
        "Alger", "Oran", "Constantine", "Annaba", "Blida", "Batna",
        "Sétif", "Sidi Bel Abbès", "Biskra", "Tébessa", "Béjaïa",
        "Tlemcen", "Ghardaïa", "Djelfa", "Médéa", "Tizi Ouzou",
    ];

    const langues = ["Français", "Arabe", "Anglais", "Tamazight"];
    const genres = ["Homme", "Femme", "Autre", "Préfère ne pas préciser"];

    const stats = [
        { label: "Lieux visités", value: "24", icon: "📍" },
        { label: "Favoris", value: "12", icon: "❤️" },
        { label: "Avis publiés", value: "8", icon: "⭐" },
        { label: "Voyages planifiés", value: "3", icon: "🗺️" },
    ];

    const recentActivity = [
        { type: "favori", text: "A ajouté Assekrem aux favoris", time: "Il y a 2 heures", icon: "❤️" },
        { type: "avis", text: "A publié un avis sur Ghardaïa", time: "Il y a 3 jours", icon: "⭐" },
        { type: "visite", text: "A visité Djémila", time: "Il y a 1 semaine", icon: "📍" },
        { type: "visite", text: "A visité Cap Carbon à Béjaïa", time: "Il y a 2 semaines", icon: "📍" },
    ];

    const inputClass =
        "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all bg-white";
    const disabledInputClass =
        "w-full border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-500 bg-gray-50 cursor-default";

    const tabs = [
        { id: "informations", label: "Informations", icon: "👤" },
        { id: "activite", label: "Activité", icon: "🕐" },
        { id: "securite", label: "Sécurité", icon: "🔒" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            <Navbar transparent={false} />
            {/* Cover Banner */}
            <div
                className="relative w-full h-64 md:h-80 mt-20"
                style={{
                    backgroundImage: "url('/images/profile-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Profile Header */}
            <div className="max-w-5xl mx-auto px-4 md:px-8">
                <div className="relative -mt-16 mb-6 flex flex-row items-end gap-6">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                        <div
                            className="w-32 h-32 md:w-36 md:h-36 rounded-2xl border-4 border-white shadow-lg overflow-hidden cursor-pointer group"
                            onClick={() => editing && fileInputRef.current?.click()}
                        >
                            {avatarPreview ? (
                                <img
                                    src={avatarPreview}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                                    <span className="text-white font-extrabold text-4xl tracking-wide">
                                        {initials}
                                    </span>
                                </div>
                            )}
                            {editing && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                                    <div className="text-white text-center">
                                        <svg className="w-7 h-7 mx-auto mb-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-xs font-medium">Modifier</span>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Name & info */}
                    <div className="flex-1 pb-1">
                        <h1 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-sm sm:text-gray-900">
                            {form.prenom} {form.nom}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-sm text-white/90 sm:text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {form.ville}
                            </span>
                            <span className="hidden sm:inline text-gray-300">•</span>
                            <span className="flex items-center gap-1 text-sm text-white/90 sm:text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {form.email}
                            </span>
                        </div>
                    </div>

                    {/* Edit / Save buttons */}
                    <div className="flex items-center gap-3 sm:pb-1 mt-2 sm:mt-0">
                        {!editing ? (
                            <button
                                onClick={handleEdit}
                                className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm shadow-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Modifier
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-5 py-2.5 rounded-full transition-colors text-sm"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm shadow-sm"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Enregistrer
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Success Toast */}
                {saved && (
                    <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-3.5 text-sm font-medium animate-pulse">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Vos informations ont été mises à jour avec succès !
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex flex-col items-center text-center hover:border-sky-200 transition-colors">
                            <span className="text-2xl mb-1">{stat.icon}</span>
                            <span className="text-2xl font-extrabold text-gray-900">{stat.value}</span>
                            <span className="text-xs text-gray-400 mt-0.5 font-medium">{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.id
                                ? "bg-white text-sky-500 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            <span>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="pb-16">

                    {/* ─── INFORMATIONS TAB ─── */}
                    {activeTab === "informations" && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Left column — personal info */}
                            <div className="lg:col-span-2 space-y-5">

                                {/* Section: Informations personnelles */}
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-gray-900 text-base">Informations personnelles</h2>
                                            <p className="text-xs text-gray-400">Vos informations de base</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Prénom */}
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                                                Prénom
                                            </label>
                                            {editing ? (
                                                <input
                                                    name="prenom"
                                                    value={tempForm.prenom}
                                                    onChange={handleChange}
                                                    className={inputClass}
                                                    placeholder="Votre prénom"
                                                />
                                            ) : (
                                                <div className={disabledInputClass}>{form.prenom}</div>
                                            )}
                                        </div>

                                        {/* Nom */}
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                                                Nom
                                            </label>
                                            {editing ? (
                                                <input
                                                    name="nom"
                                                    value={tempForm.nom}
                                                    onChange={handleChange}
                                                    className={inputClass}
                                                    placeholder="Votre nom"
                                                />
                                            ) : (
                                                <div className={disabledInputClass}>{form.nom}</div>
                                            )}
                                        </div>

                                        {/* Genre */}
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                                                Genre
                                            </label>
                                            {editing ? (
                                                <select
                                                    name="genre"
                                                    value={tempForm.genre}
                                                    onChange={handleChange}
                                                    className={inputClass}
                                                >
                                                    {genres.map((g) => (
                                                        <option key={g} value={g}>{g}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <div className={disabledInputClass}>{form.genre}</div>
                                            )}
                                        </div>

                                        {/* Date de naissance */}
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                                                Date de naissance
                                            </label>
                                            {editing ? (
                                                <input
                                                    type="date"
                                                    name="dateNaissance"
                                                    value={tempForm.dateNaissance}
                                                    onChange={handleChange}
                                                    className={inputClass}
                                                />
                                            ) : (
                                                <div className={disabledInputClass}>
                                                    {new Date(form.dateNaissance).toLocaleDateString("fr-DZ", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Section: Contact */}
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-gray-900 text-base">Coordonnées</h2>
                                            <p className="text-xs text-gray-400">Comment vous contacter</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Email */}
                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                                                Adresse e-mail
                                            </label>
                                            {editing ? (
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={tempForm.email}
                                                    onChange={handleChange}
                                                    className={inputClass}
                                                    placeholder="votre@email.com"
                                                />
                                            ) : (
                                                <div className={disabledInputClass}>{form.email}</div>
                                            )}
                                        </div>

                                        {/* Téléphone */}
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                                                Téléphone
                                            </label>
                                            {editing ? (
                                                <input
                                                    type="tel"
                                                    name="telephone"
                                                    value={tempForm.telephone}
                                                    onChange={handleChange}
                                                    className={inputClass}
                                                    placeholder="+213 XXX XXX XXX"
                                                />
                                            ) : (
                                                <div className={disabledInputClass}>{form.telephone}</div>
                                            )}
                                        </div>

                                        {/* Ville */}
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                                                Ville
                                            </label>
                                            {editing ? (
                                                <select
                                                    name="ville"
                                                    value={tempForm.ville}
                                                    onChange={handleChange}
                                                    className={inputClass}
                                                >
                                                    {villes.map((v) => (
                                                        <option key={v} value={v}>{v}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <div className={disabledInputClass}>{form.ville}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Section: Biographie */}
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-gray-900 text-base">Bio</h2>
                                            <p className="text-xs text-gray-400">Parlez-nous de vous</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                                            Biographie
                                        </label>
                                        {editing ? (
                                            <textarea
                                                name="bio"
                                                value={tempForm.bio}
                                                onChange={handleChange}
                                                rows={4}
                                                className={`${inputClass} resize-none`}
                                                placeholder="Décrivez vos intérêts de voyage..."
                                                maxLength={300}
                                            />
                                        ) : (
                                            <div className={`${disabledInputClass} h-auto min-h-[5rem] leading-relaxed`}>
                                                {form.bio || <span className="text-gray-300">Aucune biographie renseignée</span>}
                                            </div>
                                        )}
                                        {editing && (
                                            <p className="text-right text-xs text-gray-400 mt-1">
                                                {tempForm.bio.length}/300
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right column — sidebar */}
                            <div className="space-y-5">

                                {/* Langue préférée */}
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center">
                                            <span className="text-lg">🌐</span>
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-gray-900 text-base">Langue</h2>
                                            <p className="text-xs text-gray-400">Préférence d'affichage</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                                            Langue préférée
                                        </label>
                                        {editing ? (
                                            <select
                                                name="langue"
                                                value={tempForm.langue}
                                                onChange={handleChange}
                                                className={inputClass}
                                            >
                                                {langues.map((l) => (
                                                    <option key={l} value={l}>{l}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <div className={disabledInputClass}>{form.langue}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Préférences de voyage */}
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center">
                                            <span className="text-lg">🧭</span>
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-gray-900 text-base">Préférences</h2>
                                            <p className="text-xs text-gray-400">Types de voyages aimés</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {["Nature 🏔️", "Plages 🏖️", "Histoire 🏛️", "Désert 🌵", "Villes 🏙️"].map((pref) => (
                                            <span
                                                key={pref}
                                                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-600 border border-sky-100"
                                            >
                                                {pref}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Compte */}
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-gray-900 text-base">Mon compte</h2>
                                            <p className="text-xs text-gray-400">Détails du compte</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                            <span className="text-gray-500 font-medium">Membre depuis</span>
                                            <span className="text-gray-800 font-semibold">Janvier 2024</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                            <span className="text-gray-500 font-medium">Statut</span>
                                            <span className="flex items-center gap-1.5 text-green-600 font-semibold">
                                                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                                                Actif
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-500 font-medium">Type</span>
                                            <span className="bg-sky-100 text-sky-600 text-xs font-bold px-2.5 py-1 rounded-full">
                                                Voyageur
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* ─── ACTIVITÉ TAB ─── */}
                    {activeTab === "activite" && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-gray-900 text-base">Activité récente</h2>
                                            <p className="text-xs text-gray-400">Vos dernières actions sur Rihla</p>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        {recentActivity.map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-4 py-4 border-b border-gray-50 last:border-0">
                                                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-lg flex-shrink-0">
                                                    {item.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-800">{item.text}</p>
                                                    <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <h2 className="font-bold text-gray-900 text-base mb-5">Résumé</h2>
                                    <div className="space-y-4">
                                        {stats.map((stat) => (
                                            <div key={stat.label} className="flex items-center justify-between">
                                                <span className="flex items-center gap-2 text-sm text-gray-500">
                                                    <span>{stat.icon}</span>
                                                    {stat.label}
                                                </span>
                                                <span className="text-lg font-extrabold text-sky-500">{stat.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ─── SÉCURITÉ TAB ─── */}
                    {activeTab === "securite" && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-5">

                                {/* Change password */}
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-gray-900 text-base">Changer le mot de passe</h2>
                                            <p className="text-xs text-gray-400">Sécurisez votre compte</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                                                Mot de passe actuel
                                            </label>
                                            <input
                                                type="password"
                                                className={inputClass}
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                                                Nouveau mot de passe
                                            </label>
                                            <input
                                                type="password"
                                                className={inputClass}
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                                                Confirmer le nouveau mot de passe
                                            </label>
                                            <input
                                                type="password"
                                                className={inputClass}
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm mt-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Mettre à jour le mot de passe
                                        </button>
                                    </div>
                                </div>

                                {/* Delete account */}
                                <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-red-600 text-base">Zone de danger</h2>
                                            <p className="text-xs text-gray-400">Actions irréversibles</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                        La suppression de votre compte est définitive. Toutes vos données, avis et favoris seront supprimés et ne pourront pas être récupérés.
                                    </p>
                                    <button className="flex items-center gap-2 border border-red-300 text-red-600 hover:bg-red-50 font-semibold px-5 py-2.5 rounded-full transition-colors text-sm">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Supprimer mon compte
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-5">
                                {/* Security tips */}
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center">
                                            <span className="text-lg">🛡️</span>
                                        </div>
                                        <h2 className="font-bold text-gray-900 text-base">Conseils de sécurité</h2>
                                    </div>
                                    <ul className="space-y-3 text-sm text-gray-600">
                                        {[
                                            "Utilisez au moins 8 caractères",
                                            "Mélangez lettres, chiffres et symboles",
                                            "Ne partagez jamais votre mot de passe",
                                        ].map((tip, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <svg className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>


    );
};

export default Profile;
