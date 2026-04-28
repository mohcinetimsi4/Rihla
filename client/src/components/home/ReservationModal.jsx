import { useState, useEffect } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";

const rooms = [
    {
        id: "standard",
        name: "Standard",
        icon: "🛏️",
        details: ["1 lit double", "25 m²", "Vue jardin"],
        price: 8500,
    },
    {
        id: "superieure",
        name: "Supérieure",
        icon: "👑",
        details: ["1 lit king-size", "35 m²", "Vue piscine"],
        price: 11000,
    },
];

const addDays = (date, n) => {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return d.toISOString().split("T")[0];
};

const today = new Date().toISOString().split("T")[0];

function StepIndicator({ current }) {
    const steps = ["Séjour", "Chambre", "Confirmation"];
    return (
        <div className="flex items-center mb-6">
            {steps.map((label, i) => {
                const n = i + 1;
                const isDone = n < current;
                const isActive = n === current;
                return (
                    <div key={n} className="flex items-center">
                        <div className="flex items-center gap-1.5">
                            <div
                                className={`w-6 h-6 rounded-full text-xs font-medium flex items-center justify-center transition-all
                                    ${isDone ? "bg-green-500 text-white" : isActive ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400 border border-gray-200"}`}
                            >
                                {isDone ? <FaCheck size={8} /> : n}
                            </div>
                            <span
                                className={`text-xs ${isActive ? "text-orange-500 font-medium" : "text-gray-400"}`}
                            >
                                {label}
                            </span>
                        </div>
                        {i < steps.length - 1 && (
                            <div className="flex-1 h-px bg-gray-200 mx-2 w-8" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function Step1({ form, onChange }) {
    return (
        <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
                Dates du séjour
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">Arrivée</label>
                    <input
                        type="date"
                        value={form.checkin}
                        min={today}
                        onChange={(e) => onChange("checkin", e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">Départ</label>
                    <input
                        type="date"
                        value={form.checkout}
                        min={form.checkin || today}
                        onChange={(e) => onChange("checkout", e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                    />
                </div>
            </div>

            <div className="border-t border-gray-100 my-4" />

            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
                Voyageurs
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">Adultes</label>
                    <select
                        value={form.adults}
                        onChange={(e) => onChange("adults", e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                    >
                        {[1, 2, 3, 4].map((n) => (
                            <option key={n} value={n}>
                                {n} adulte{n > 1 ? "s" : ""}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">Enfants</label>
                    <select
                        value={form.children}
                        onChange={(e) => onChange("children", e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                    >
                        {[0, 1, 2, 3].map((n) => (
                            <option key={n} value={n}>
                                {n} enfant{n > 1 ? "s" : ""}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="border-t border-gray-100 my-4" />

            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
                Équipements inclus
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
                {["Piscine", "Spa", "Restaurant", "Wifi gratuit", "Parking"].map((a) => (
                    <span
                        key={a}
                        className="bg-gray-50 border border-gray-100 rounded-full px-3 py-1 text-xs text-gray-500"
                    >
                        {a}
                    </span>
                ))}
            </div>
            <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full inline-block" />
                Annulation gratuite jusqu'à 48h avant l'arrivée
            </p>
        </div>
    );
}

function Step2({ selectedRoom, onSelectRoom, special, onSpecial }) {
    return (
        <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
                Choisissez votre chambre
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
                {rooms.map((room) => {
                    const isSelected = selectedRoom === room.id;
                    return (
                        <button
                            key={room.id}
                            onClick={() => onSelectRoom(room.id)}
                            className={`relative text-left p-4 rounded-xl border transition-all
                                ${isSelected
                                    ? "border-orange-400 bg-orange-50 border-[1.5px]"
                                    : "border-gray-200 hover:border-orange-300"
                                }`}
                        >
                            {isSelected && (
                                <div className="absolute top-2.5 right-2.5 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                                    <FaCheck size={7} color="white" />
                                </div>
                            )}
                            <div className="text-2xl mb-2">{room.icon}</div>
                            <p className={`text-sm font-medium mb-1 ${isSelected ? "text-orange-500" : "text-gray-800"}`}>
                                {room.name}
                            </p>
                            {room.details.map((d, i) => (
                                <p key={i} className="text-xs text-gray-400">
                                    {d}
                                </p>
                            ))}
                            <p className="text-sm font-medium text-orange-500 mt-2">
                                {room.price.toLocaleString("fr-DZ")} DA / nuit
                            </p>
                        </button>
                    );
                })}
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">
                    Demandes spéciales (optionnel)
                </label>
                <input
                    type="text"
                    value={special}
                    onChange={(e) => onSpecial(e.target.value)}
                    placeholder="Ex : chambre non-fumeur, étage élevé…"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                />
            </div>
        </div>
    );
}

function Step3({ form, selectedRoom, nights, total, onChange }) {
    const room = rooms.find((r) => r.id === selectedRoom);
    return (
        <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
                Vos coordonnées
            </p>
            <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">Prénom</label>
                    <input
                        type="text"
                        placeholder="Mohamed"
                        value={form.prenom}
                        onChange={(e) => onChange("prenom", e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">Nom</label>
                    <input
                        type="text"
                        placeholder="Bensalem"
                        value={form.nom}
                        onChange={(e) => onChange("nom", e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1 mb-3">
                <label className="text-xs text-gray-500">Email</label>
                <input
                    type="email"
                    placeholder="vous@email.com"
                    value={form.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                />
            </div>
            <div className="flex flex-col gap-1 mb-4">
                <label className="text-xs text-gray-500">Téléphone</label>
                <input
                    type="tel"
                    placeholder="+213 6XX XX XX XX"
                    value={form.phone}
                    onChange={(e) => onChange("phone", e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                />
            </div>

            <div className="border-t border-gray-100 my-4" />

            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
                Récapitulatif
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-1.5">
                {[
                    ["Hôtel", "Atlantis Béjaïa"],
                    ["Chambre", room?.name],
                    ["Arrivée", form.checkin ? new Date(form.checkin).toLocaleDateString("fr-FR") : "—"],
                    ["Départ", form.checkout ? new Date(form.checkout).toLocaleDateString("fr-FR") : "—"],
                    ["Durée", `${nights} nuit${nights > 1 ? "s" : ""}`],
                    ["Voyageurs", `${form.adults} adulte${form.adults > 1 ? "s" : ""}${form.children > 0 ? `, ${form.children} enfant${form.children > 1 ? "s" : ""}` : ""}`],
                ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm">
                        <span className="text-gray-400">{k}</span>
                        <span className="text-gray-700 font-medium">{v}</span>
                    </div>
                ))}
                <div className="border-t border-gray-200 pt-3 mt-2 flex justify-between text-base font-medium">
                    <span className="text-gray-700">Total estimé</span>
                    <span className="text-orange-500">{total.toLocaleString("fr-DZ")} DA</span>
                </div>
            </div>
            <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full inline-block" />
                Paiement à l'hôtel · Confirmation par email
            </p>
        </div>
    );
}

function SuccessScreen({ refNum, onClose }) {
    return (
        <div className="text-center py-8 px-6">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck size={22} className="text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Réservation confirmée !
            </h3>
            <p className="text-sm text-gray-400 mb-5">
                Vous recevrez une confirmation par email sous peu.
            </p>
            <div className="bg-gray-50 rounded-xl px-6 py-4 inline-block mb-6">
                <p className="text-xs text-gray-400">Numéro de réservation</p>
                <p className="text-xl font-semibold text-orange-500 mt-1">{refNum}</p>
            </div>
            <br />
            <button
                onClick={onClose}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-2.5 rounded-lg transition text-sm"
            >
                Fermer
            </button>
        </div>
    );
}

function ReservationModal({ hotel, onClose }) {
    const [step, setStep] = useState(1);
    const [selectedRoom, setSelectedRoom] = useState("standard");
    const [special, setSpecial] = useState("");
    const [refNum, setRefNum] = useState("");

    const [form, setForm] = useState({
        checkin: addDays(today, 7),
        checkout: addDays(today, 10),
        adults: 2,
        children: 0,
        prenom: "",
        nom: "",
        email: "",
        phone: "",
    });

    const handleChange = (key, value) => setForm((f) => ({ ...f, [key]: value }));

    const nights =
        form.checkin && form.checkout
            ? Math.max(1, Math.round((new Date(form.checkout) - new Date(form.checkin)) / 86400000))
            : 1;

    const room = rooms.find((r) => r.id === selectedRoom);
    const total = room ? room.price * nights : 0;

    const handleNext = () => {
        if (step === 3) {
            setRefNum("RIHLA-" + Math.floor(10000 + Math.random() * 90000));
            setStep(4);
        } else {
            setStep((s) => s + 1);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-xl">
                {/* Header */}
                <div className="bg-orange-500 px-6 py-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-white text-lg font-semibold">
                            Réserver votre chambre
                        </h2>
                        <p className="text-white/75 text-xs mt-0.5">
                            {hotel?.title || "Atlantis Béjaïa Aéroport"} · {hotel?.address || "Béjaïa, Algérie"}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
                    >
                        <FaTimes size={14} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {step < 4 && <StepIndicator current={step} />}

                    {step === 1 && <Step1 form={form} onChange={handleChange} />}
                    {step === 2 && (
                        <Step2
                            selectedRoom={selectedRoom}
                            onSelectRoom={setSelectedRoom}
                            special={special}
                            onSpecial={setSpecial}
                        />
                    )}
                    {step === 3 && (
                        <Step3
                            form={form}
                            selectedRoom={selectedRoom}
                            nights={nights}
                            total={total}
                            onChange={handleChange}
                        />
                    )}
                    {step === 4 && <SuccessScreen refNum={refNum} onClose={onClose} />}
                </div>

                {/* Footer */}
                {step < 4 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
                        {step > 1 && (
                            <button
                                onClick={() => setStep((s) => s - 1)}
                                className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition"
                            >
                                ← Retour
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition text-sm"
                        >
                            {step === 3 ? "Confirmer la réservation →" : "Continuer →"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReservationModal;
