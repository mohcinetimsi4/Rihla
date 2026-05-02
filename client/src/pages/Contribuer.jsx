import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useState, useRef, useEffect } from "react";

const categories = [
    { id: "nature", label: "Nature", emoji: "🌿" },
    { id: "plages", label: "Plages", emoji: "🏖️" },
    { id: "villes", label: "Villes", emoji: "🏙️" },
    { id: "espaces", label: "Espaces", emoji: "🏛️" },
    { id: "monuments", label: "Monuments", emoji: "🗿" },
    { id: "aventure", label: "Aventure", emoji: "⛰️" },
];

const wilayas = [
    "Adrar", "Aïn Defla", "Aïn Témouchent", "Algérie (Alger)", "Annaba", "Batna",
    "Béchar", "Béjaïa", "Biskra", "Blida", "Bordj Bou Arréridj", "Bouira",
    "Boumerdès", "Chlef", "Constantine", "Djelfa", "El Bayadh", "El Oued",
    "El Tarf", "Ghardaïa", "Guelma", "Illizi", "Jijel", "Khenchela",
    "Laghouat", "M'Sila", "Mascara", "Médéa", "Mila", "Mostaganem",
    "Naâma", "Oran", "Ouargla", "Oum El Bouaghi", "Relizane", "Saïda",
    "Sétif", "Sidi Bel Abbès", "Skikda", "Souk Ahras", "Tamanrasset",
    "Tébessa", "Tiaret", "Tindouf", "Tipaza", "Tissemsilt", "Tizi Ouzou",
    "Tlemcen"
];

const steps = ["Informations", "Localisation", "Photos", "Confirmation"];

const StepIndicator = ({ currentStep }) => (
    <div className="flex items-center justify-center mb-10">
        {steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum === currentStep;
            const isDone = stepNum < currentStep;
            return (
                <div key={step} className="flex items-center">
                    <div className="flex flex-col items-center gap-1.5">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${isDone
                                ? "bg-sky-500 text-white shadow-md shadow-sky-200"
                                : isActive
                                    ? "bg-sky-500 text-white shadow-lg shadow-sky-300 scale-110"
                                    : "bg-gray-100 text-gray-400 border border-gray-200"
                                }`}
                        >
                            {isDone ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                stepNum
                            )}
                        </div>
                        <span className={`text-xs font-medium hidden sm:block ${isActive ? "text-sky-500" : isDone ? "text-gray-500" : "text-gray-400"}`}>
                            {step}
                        </span>
                    </div>
                    {idx < steps.length - 1 && (
                        <div className={`h-0.5 w-12 sm:w-20 mx-1 sm:mx-2 mb-4 transition-all duration-300 ${isDone ? "bg-sky-400" : "bg-gray-200"}`} />
                    )}
                </div>
            );
        })}
    </div>
);

// ─── Step 1: Informations ───────────────────────────────────────────────
const Step1 = ({ data, onChange }) => (
    <div className="space-y-6">
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nom du lieu <span className="text-sky-500">*</span>
            </label>
            <input
                type="text"
                placeholder="Ex : Cascade de Kherrata"
                value={data.name}
                onChange={(e) => onChange("name", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-gray-800 placeholder-gray-400 text-sm transition"
            />
        </div>

        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
                Catégorie <span className="text-sky-500">*</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => onChange("category", cat.id)}
                        className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all duration-200 ${data.category === cat.id
                            ? "border-sky-500 bg-sky-50 text-sky-600"
                            : "border-gray-200 bg-white text-gray-500 hover:border-sky-300 hover:bg-sky-50"
                            }`}
                    >
                        <span className="text-2xl">{cat.emoji}</span>
                        <span className="text-xs font-medium">{cat.label}</span>
                    </button>
                ))}
            </div>
        </div>

        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description courte <span className="text-sky-500">*</span>
            </label>
            <textarea
                rows={4}
                placeholder="Décrivez ce lieu en quelques phrases. Qu'est-ce qui le rend unique ?"
                value={data.description}
                onChange={(e) => onChange("description", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-gray-800 placeholder-gray-400 text-sm resize-none transition"
            />
            <p className="text-right text-xs text-gray-400 mt-1">{data.description.length}/500</p>
        </div>
    </div>
);

// ─── Step 2: Localisation ────────────────────────────────────────────────
const Step2 = ({ data, onChange }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markerRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searching, setSearching] = useState(false);
    const [searchError, setSearchError] = useState("");

    useEffect(() => {
        // Load Leaflet CSS
        if (!document.getElementById("leaflet-css")) {
            const link = document.createElement("link");
            link.id = "leaflet-css";
            link.rel = "stylesheet";
            link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
            document.head.appendChild(link);
        }

        if (window.L) {
            initMap();
        } else {
            const script = document.createElement("script");
            script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
            script.onload = initMap;
            document.head.appendChild(script);
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                markerRef.current = null;
            }
        };
    }, []);

    const initMap = () => {
        if (!mapRef.current || mapInstanceRef.current) return;
        const L = window.L;

        // Fix default marker icon paths
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
            iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        const map = L.map(mapRef.current).setView([28.0339, 1.6596], 5);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
        }).addTo(map);

        // Restore existing marker if coordinates already set
        if (data.lat && data.lng) {
            markerRef.current = L.marker([parseFloat(data.lat), parseFloat(data.lng)]).addTo(map);
            map.setView([parseFloat(data.lat), parseFloat(data.lng)], 12);
        }

        map.on("click", (e) => {
            const { lat, lng } = e.latlng;
            placeMarker(lat, lng);
            reverseGeocode(lat, lng);
        });

        mapInstanceRef.current = map;
    };

    const placeMarker = (lat, lng) => {
        const L = window.L;
        if (!mapInstanceRef.current) return;
        if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
        } else {
            markerRef.current = L.marker([lat, lng]).addTo(mapInstanceRef.current);
        }
        onChange("lat", lat.toFixed(6));
        onChange("lng", lng.toFixed(6));
    };

    const reverseGeocode = async (lat, lng) => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=fr`
            );
            const result = await res.json();
            const addr = result.address || {};
            const wilaya = addr.state || addr.county || "";
            const parts = [addr.road, addr.suburb, addr.city || addr.town || addr.village].filter(Boolean);
            if (wilaya) onChange("wilaya", wilaya);
            if (parts.length) onChange("address", parts.join(", "));
        } catch { }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim() || !mapInstanceRef.current) return;
        setSearching(true);
        setSearchError("");
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery + ", Algérie")}&format=json&limit=1&accept-language=fr`
            );
            const results = await res.json();
            if (results.length > 0) {
                const { lat, lon } = results[0];
                mapInstanceRef.current.setView([parseFloat(lat), parseFloat(lon)], 13);
                placeMarker(parseFloat(lat), parseFloat(lon));
                reverseGeocode(parseFloat(lat), parseFloat(lon));
            } else {
                setSearchError("Lieu introuvable. Essayez un autre nom.");
            }
        } catch {
            setSearchError("Erreur réseau. Vérifiez votre connexion.");
        } finally {
            setSearching(false);
        }
    };

    return (
        <div className="space-y-6">

            {/* Search bar */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rechercher un lieu
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Ex : Cascade de Kherrata, Ghardaïa…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-gray-800 placeholder-gray-400 text-sm transition"
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                        disabled={searching}
                        className="px-5 py-3 bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
                    >
                        {searching ? (
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        )}
                        Rechercher
                    </button>
                </div>
                {searchError && <p className="text-xs text-red-500 mt-1">{searchError}</p>}
                <p className="text-xs text-gray-400 mt-1.5">💡 Ou cliquez directement sur la carte pour placer une épingle</p>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 h-72">
                <div ref={mapRef} className="w-full h-full" />
            </div>

            {/* Coordinates badge */}
            {data.lat && data.lng && (
                <div className="flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-xl px-4 py-3">
                    <svg className="w-4 h-4 text-sky-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs text-sky-700 font-medium">
                        Coordonnées : {parseFloat(data.lat).toFixed(4)}° N, {parseFloat(data.lng).toFixed(4)}° E
                    </span>
                </div>
            )}

            {/* Wilaya + Address — auto-filled but editable */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Wilaya <span className="text-sky-500">*</span>
                    </label>
                    <div className="relative">
                        <select
                            value={data.wilaya}
                            onChange={(e) => onChange("wilaya", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-gray-800 text-sm appearance-none bg-white transition cursor-pointer"
                        >
                            <option value="">Sélectionner une wilaya…</option>
                            {wilayas.map((w) => (
                                <option key={w} value={w}>{w}</option>
                            ))}
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse / Quartier</label>
                    <input
                        type="text"
                        placeholder="Auto-rempli depuis la carte"
                        value={data.address}
                        onChange={(e) => onChange("address", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-gray-800 placeholder-gray-400 text-sm transition"
                    />
                </div>
            </div>
        </div>
    );
};

// ─── Step 3: Photos & Détails ────────────────────────────────────────────
const Step3 = ({ data, onChange }) => {
    const [dragging, setDragging] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
        if (files.length) {
            const previews = files.map((f) => ({ file: f, url: URL.createObjectURL(f), name: f.name }));
            onChange("photos", [...(data.photos || []), ...previews].slice(0, 5));
        }
    };

    const handleFileInput = (e) => {
        const files = Array.from(e.target.files).filter((f) => f.type.startsWith("image/"));
        if (files.length) {
            const previews = files.map((f) => ({ file: f, url: URL.createObjectURL(f), name: f.name }));
            onChange("photos", [...(data.photos || []), ...previews].slice(0, 5));
        }
    };

    const removePhoto = (idx) => {
        const updated = data.photos.filter((_, i) => i !== idx);
        onChange("photos", updated);
    };

    return (
        <div className="space-y-6">
            {/* Photo upload */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Photos du lieu <span className="text-gray-400 font-normal">(max 5)</span>
                </label>

                <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${dragging ? "border-sky-400 bg-sky-50" : "border-gray-200 bg-gray-50 hover:border-sky-300 hover:bg-sky-50"
                        }`}
                >
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileInput}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center">
                            <svg className="w-7 h-7 text-sky-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-700">Glissez vos photos ici</p>
                            <p className="text-xs text-gray-400 mt-1">ou <span className="text-sky-500 font-medium">parcourez vos fichiers</span></p>
                        </div>
                        <p className="text-xs text-gray-400">PNG, JPG, WEBP – max 10 Mo par photo</p>
                    </div>
                </div>

                {/* Photo previews */}
                {data.photos && data.photos.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {data.photos.map((photo, idx) => (
                            <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square">
                                <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        onClick={() => removePhoto(idx)}
                                        className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                {idx === 0 && (
                                    <span className="absolute top-1.5 left-1.5 bg-sky-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                        Principale
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Tips / best hours */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Horaires d'accès</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["Toute la journée", "Matin", "Après-midi", "Sur rendez-vous"].map((h) => (
                        <button
                            key={h}
                            type="button"
                            onClick={() => onChange("hours", h)}
                            className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${data.hours === h
                                ? "border-sky-500 bg-sky-50 text-sky-600"
                                : "border-gray-200 bg-white text-gray-500 hover:border-sky-300"
                                }`}
                        >
                            {h}
                        </button>
                    ))}
                </div>
            </div>

            {/* Access difficulty */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Accessibilité</label>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { id: "easy", label: "Facile", color: "text-green-600", bg: "bg-green-50", border: "border-green-400", dot: "bg-green-400" },
                        { id: "moderate", label: "Modérée", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-400", dot: "bg-yellow-400" },
                        { id: "hard", label: "Difficile", color: "text-red-500", bg: "bg-red-50", border: "border-red-400", dot: "bg-red-400" },
                    ].map((level) => (
                        <button
                            key={level.id}
                            type="button"
                            onClick={() => onChange("accessibility", level.id)}
                            className={`flex items-center gap-2 py-2.5 px-3 rounded-xl border-2 transition-all text-sm font-medium ${data.accessibility === level.id
                                ? `${level.border} ${level.bg} ${level.color}`
                                : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                                }`}
                        >
                            <span className={`w-2.5 h-2.5 rounded-full ${level.dot}`} />
                            {level.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tips */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Conseils aux visiteurs <span className="text-gray-400 font-normal">(optionnel)</span>
                </label>
                <textarea
                    rows={3}
                    placeholder="Ex : Apportez de l'eau, les weekends sont très fréquentés…"
                    value={data.tips}
                    onChange={(e) => onChange("tips", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-gray-800 placeholder-gray-400 text-sm resize-none transition"
                />
            </div>
        </div>
    );
};

// ─── Step 4: Confirmation ────────────────────────────────────────────────
const Step4 = ({ data }) => {
    const cat = categories.find((c) => c.id === data.category);
    const accessMap = { easy: { label: "Facile", color: "text-green-600 bg-green-50" }, moderate: { label: "Modérée", color: "text-yellow-600 bg-yellow-50" }, hard: { label: "Difficile", color: "text-red-500 bg-red-50" } };
    const access = accessMap[data.accessibility] || {};

    return (
        <div className="space-y-6">
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 flex gap-4 items-start">
                <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <p className="text-sm font-semibold text-sky-700">Vérifiez vos informations avant d'envoyer</p>
                    <p className="text-xs text-sky-600 mt-1">Votre proposition sera examinée par notre équipe dans les plus courts délais. Merci d'avoir contribuer à Rihla.dz ! 🇩🇿</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                {data.photos && data.photos.length > 0 && (
                    <div className="h-44 overflow-hidden">
                        <img src={data.photos[0].url} alt="Aperçu" className="w-full h-full object-cover" />
                    </div>
                )}
                {(!data.photos || data.photos.length === 0) && (
                    <div className="h-44 bg-gradient-to-br from-sky-100 to-amber-50 flex items-center justify-center">
                        <span className="text-5xl">{cat?.emoji || "📍"}</span>
                    </div>
                )}

                <div className="p-5 space-y-4">
                    {/* Name & Category */}
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg">{data.name || <span className="text-gray-400 font-normal italic">Nom non renseigné</span>}</h3>
                            {cat && (
                                <span className="inline-flex items-center gap-1.5 mt-1 text-xs font-medium text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                                    {cat.emoji} {cat.label}
                                </span>
                            )}
                        </div>
                        {data.accessibility && (
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${access.color}`}>
                                {access.label}
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    {data.description && (
                        <p className="text-sm text-gray-600 leading-relaxed">{data.description}</p>
                    )}

                    {/* Location */}
                    {(data.wilaya || data.address) && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <svg className="w-4 h-4 text-sky-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{[data.address, data.wilaya].filter(Boolean).join(", ")}</span>
                        </div>
                    )}

                    {/* Hours */}
                    {data.hours && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <svg className="w-4 h-4 text-sky-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" />
                            </svg>
                            <span>{data.hours}</span>
                        </div>
                    )}

                    {/* Tips */}
                    {data.tips && (
                        <div className="bg-gray-50 rounded-xl p-3 flex gap-2 items-start">
                            <span className="text-base">💡</span>
                            <p className="text-xs text-gray-600 leading-relaxed">{data.tips}</p>
                        </div>
                    )}

                    {/* Photos count */}
                    {data.photos && data.photos.length > 0 && (
                        <p className="text-xs text-gray-400">{data.photos.length} photo{data.photos.length > 1 ? "s" : ""} ajoutée{data.photos.length > 1 ? "s" : ""}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── Success Screen ──────────────────────────────────────────────────────
const SuccessScreen = ({ onReset }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-6">
        <div className="relative">
            <div className="w-24 h-24 rounded-full bg-sky-100 flex items-center justify-center animate-bounce">
                <svg className="w-12 h-12 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>

        </div>
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Merci pour votre contribution !</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-sm">
                Votre lieu a été soumis avec succès. Notre équipe va le vérifier dans les plus brèfs délais.
            </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
            <button
                onClick={onReset}
                className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
            >
                Proposer un autre lieu
            </button>
            <button className="border border-gray-200 text-gray-600 hover:border-sky-300 hover:text-sky-500 font-medium px-6 py-3 rounded-full transition-colors text-sm">
                Explorer les destinations
            </button>
        </div>
    </div>
);

// ─── Main Contribuer Page ────────────────────────────────────────────────
const Contribuer = () => {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        wilaya: "",
        address: "",
        lat: "",
        lng: "",
        photos: [],
        hours: "",
        accessibility: "",
        tips: "",
    });

    const updateField = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const canProceed = () => {
        if (step === 1) return formData.name.trim() && formData.category && formData.description.trim();
        if (step === 2) return formData.wilaya;
        if (step === 3) return true;
        return true;
    };

    const handleNext = () => {
        if (step < 4) setStep((s) => s + 1);
        else setSubmitted(true);
    };

    const handleBack = () => setStep((s) => s - 1);

    const handleReset = () => {
        setStep(1);
        setSubmitted(false);
        setFormData({ name: "", category: "", description: "", wilaya: "", address: "", lat: "", lng: "", photos: [], hours: "", accessibility: "", tips: "" });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero banner */}
            <div className="bg-gradient-to-br from-sky-500 via-sky-400 to-amber-400 relative overflow-hidden">
                {/* Floating back button */}
                <button
                    onClick={() => window.history.back()}
                    className="absolute top-5 left-5 z-10 flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full transition-all"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour
                </button>
                {/* Decorative circles */}
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10" />
                <div className="absolute -bottom-20 -left-10 w-80 h-80 rounded-full bg-white/10" />
                <div className="absolute top-8 left-1/3 w-32 h-32 rounded-full bg-white/5" />

                <div className="relative max-w-3xl mx-auto px-6 py-14 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Communauté Rihla.dz
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                        Partagez un lieu que vous aimez 🇩🇿
                    </h1>
                    <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                        Vous connaissez un endroit magnifique en Algérie que peu de gens connaissent ?
                        Contribuez à notre communauté et faites découvrir vos pépites cachées !
                    </p>

                    {/* Stats row */}
                    <div className="flex items-center justify-center gap-8 mt-8">
                        {[
                            { count: "2 400+", label: "Lieux répertoriés" },
                            { count: "850+", label: "Contributeurs" },
                            { count: "69 Wilayas", label: "Couvertes" },
                        ].map((s) => (
                            <div key={s.label} className="text-center">
                                <p className="text-white font-extrabold text-xl">{s.count}</p>
                                <p className="text-white/70 text-xs mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Card */}
            <div className="max-w-2xl mx-auto px-4 py-10">
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 overflow-hidden">
                    <div className="px-6 sm:px-10 pt-10 pb-8">
                        {submitted ? (
                            <SuccessScreen onReset={handleReset} />
                        ) : (
                            <>
                                {/* Step indicator */}
                                <StepIndicator currentStep={step} />

                                {/* Step title */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {step === 1 && "Informations générales"}
                                        {step === 2 && "Localisation du lieu"}
                                        {step === 3 && "Photos & Détails pratiques"}
                                        {step === 4 && "Récapitulatif"}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {step === 1 && "Dites-nous ce lieu et ce qui le rend spécial."}
                                        {step === 2 && "Aidez les voyageurs à trouver cet endroit."}
                                        {step === 3 && "Ajoutez des photos et des infos pratiques."}
                                        {step === 4 && "Vérifiez les informations avant de soumettre."}
                                    </p>
                                </div>

                                {/* Steps */}
                                {step === 1 && <Step1 data={formData} onChange={updateField} />}
                                {step === 2 && <Step2 data={formData} onChange={updateField} />}
                                {step === 3 && <Step3 data={formData} onChange={updateField} />}
                                {step === 4 && <Step4 data={formData} />}

                                {/* Navigation */}
                                <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
                                    <button
                                        onClick={handleBack}
                                        disabled={step === 1}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${step === 1
                                            ? "border-gray-100 text-gray-300 cursor-not-allowed"
                                            : "border-gray-200 text-gray-600 hover:border-sky-300 hover:text-sky-500"
                                            }`}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Retour
                                    </button>

                                    <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4].map((s) => (
                                            <div
                                                key={s}
                                                className={`rounded-full transition-all duration-300 ${s === step ? "w-6 h-2 bg-sky-500" : s < step ? "w-2 h-2 bg-sky-300" : "w-2 h-2 bg-gray-200"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleNext}
                                        disabled={!canProceed()}
                                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${canProceed()
                                            ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-200"
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            }`}
                                    >
                                        {step === 4 ? "Soumettre" : "Suivant"}
                                        {step < 4 && (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        )}
                                        {step === 4 && (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Tips card */}
                {!submitted && (
                    <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-xs">💡</span>
                            Conseils pour une bonne contribution
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { icon: "📸", text: "Ajoutez des photos récentes et de bonne qualité" },
                                { icon: "📍", text: "Précisez bien l'emplacement pour aider les visiteurs" },
                                { icon: "✍️", text: "Une description détaillée augmente l'intérêt du lieu" },
                                { icon: "🔍", text: "Vérifiez que le lieu n'est pas déjà référencé" },
                            ].map((tip) => (
                                <li key={tip.text} className="flex items-start gap-3 text-sm text-gray-600">
                                    <span className="text-base shrink-0">{tip.icon}</span>
                                    {tip.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <Footer />
        </div>

    );
};

export default Contribuer;
