import { useState, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const TYPES_SERVICE = [
  { id: "guide", label: "Guide touristique", icon: "🧭", desc: "Accompagnement et visites guidées" },
  { id: "hebergement", label: "Hébergement", icon: "🏡", desc: "Gîte, maison d'hôtes, riad..." },
  { id: "transport", label: "Transport", icon: "🚐", desc: "Location de véhicule, transferts" },
  { id: "restauration", label: "Restauration", icon: "🍽️", desc: "Restaurant, traiteur, cuisine locale" },
  { id: "activite", label: "Activité / Loisir", icon: "🏄", desc: "Sport, aventure, ateliers..." },
  { id: "autre", label: "Autre", icon: "✨", desc: "Tout autre service touristique" },
];

const WILAYAS = [
  "Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Béjaïa","Biskra","Béchar",
  "Blida","Bouira","Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou","Alger",
  "Djelfa","Jijel","Sétif","Saïda","Skikda","Sidi Bel Abbès","Annaba","Guelma",
  "Constantine","Médéa","Mostaganem","M'Sila","Mascara","Ouargla","Oran","El Bayadh",
  "Illizi","Bordj Bou Arréridj","Boumerdès","El Tarf","Tindouf","Tissemsilt",
  "El Oued","Khenchela","Souk Ahras","Tipaza","Mila","Aïn Defla","Naâma",
  "Aïn Témouchent","Ghardaïa","Relizane",
];

const STEPS = [
  { id: 1, label: "Titre & Type" },
  { id: 2, label: "Détails" },
  { id: 3, label: "Documents" },
  { id: 4, label: "Confirmation" },
];

export default function ProposerService() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    titre: "",
    type: "",
    description: "",
    tarif: "",
    localisation: "",
    disponibilite: "",
    telephone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((p) => [...p, ...selected].slice(0, 5));
  };

  const removeFile = (i) => setFiles((p) => p.filter((_, idx) => idx !== i));

  const validateStep = () => {
    const e = {};
    if (step === 1) {
      if (!form.titre.trim()) e.titre = "Le titre est requis.";
      if (!form.type) e.type = "Veuillez choisir un type de service.";
    }
    if (step === 2) {
      if (!form.description.trim()) e.description = "La description est requise.";
      if (!form.tarif.trim()) e.tarif = "Veuillez indiquer vos tarifs.";
      if (!form.localisation) e.localisation = "La wilaya est requise.";
      if (!form.disponibilite.trim()) e.disponibilite = "Indiquez vos disponibilités.";
      if (!form.telephone.trim()) e.telephone = "Le téléphone est requis.";
      if (!form.email.trim()) e.email = "L'e-mail est requis.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep((s) => s + 1); };
  const back = () => setStep((s) => s - 1);

  const submit = () => {
    setSubmitted(true);
  };

  const selectedType = TYPES_SERVICE.find((t) => t.id === form.type);

  const inputBase =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-white placeholder-gray-400";
  const errClass = "border-red-300 focus:border-red-400 focus:ring-red-100";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar transparent={false} />

      <div className="pt-24 pb-20 px-4 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-500 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-orange-100">
            ✦ PARTENARIAT
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Proposer un service
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Rejoignez la communauté Rihla.dz et mettez votre service en avant auprès de milliers de voyageurs.
          </p>
        </div>

        {/* Stepper */}
        {!submitted && (
          <div className="flex items-center justify-center gap-0 mb-10">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2
                      ${step > s.id ? "bg-orange-500 border-orange-500 text-white" :
                        step === s.id ? "bg-white border-orange-500 text-orange-500 shadow-md shadow-orange-100" :
                        "bg-white border-gray-200 text-gray-400"}`}
                  >
                    {step > s.id ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : s.id}
                  </div>
                  <span className={`text-xs mt-1 font-medium ${step === s.id ? "text-orange-500" : "text-gray-400"}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-16 md:w-24 h-0.5 mx-1 mb-4 transition-all ${step > s.id ? "bg-orange-400" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* ── SUBMITTED ── */}
          {submitted && (
            <div className="p-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6 border-4 border-green-100">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Demande envoyée !</h2>
              <p className="text-gray-500 text-sm max-w-sm mb-6">
                Votre offre <span className="font-semibold text-gray-800">"{form.titre}"</span> a été soumise avec succès.
                Elle est actuellement <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 font-bold px-2 py-0.5 rounded-full text-xs">⏳ En attente de validation</span>.
              </p>
              <div className="w-full max-w-sm bg-gray-50 rounded-xl p-5 text-left space-y-2 text-sm mb-6 border border-gray-100">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Type</span>
                  <span className="font-semibold text-gray-700">{selectedType?.icon} {selectedType?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Wilaya</span>
                  <span className="font-semibold text-gray-700">{form.localisation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Documents</span>
                  <span className="font-semibold text-gray-700">{files.length} fichier(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Notification admin</span>
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />Envoyée
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-6">Vous recevrez une réponse à <span className="font-medium">{form.email}</span> dans un délai de 2 à 5 jours ouvrables.</p>
              <a href="/" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors">
                Retour à l'accueil
              </a>
            </div>
          )}

          {/* ── STEP 1 : Titre & Type ── */}
          {!submitted && step === 1 && (
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-0.5">Titre & type de service</h2>
                <p className="text-xs text-gray-400">Donnez un nom accrocheur et choisissez la catégorie.</p>
              </div>

              {/* Titre */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Titre de l'offre *
                </label>
                <input
                  name="titre"
                  value={form.titre}
                  onChange={handleChange}
                  className={`${inputBase} ${errors.titre ? errClass : ""}`}
                  placeholder="Ex : Guide touristique du Hoggar – Tamanrasset"
                  maxLength={80}
                />
                {errors.titre && <p className="text-red-500 text-xs mt-1">{errors.titre}</p>}
                <p className="text-right text-xs text-gray-300 mt-1">{form.titre.length}/80</p>
              </div>

              {/* Type */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Type de service *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TYPES_SERVICE.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => { setForm((p) => ({ ...p, type: t.id })); setErrors((p) => ({ ...p, type: "" })); }}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all
                        ${form.type === t.id
                          ? "border-orange-400 bg-orange-50"
                          : "border-gray-100 bg-gray-50 hover:border-orange-200 hover:bg-orange-50/40"}`}
                    >
                      <span className="text-2xl">{t.icon}</span>
                      <div>
                        <p className={`text-sm font-bold ${form.type === t.id ? "text-orange-600" : "text-gray-700"}`}>{t.label}</p>
                        <p className="text-xs text-gray-400">{t.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.type && <p className="text-red-500 text-xs mt-2">{errors.type}</p>}
              </div>
            </div>
          )}

          {/* ── STEP 2 : Détails ── */}
          {!submitted && step === 2 && (
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-0.5">Détails de votre offre</h2>
                <p className="text-xs text-gray-400">Décrivez votre service, vos tarifs, votre localisation et vos disponibilités.</p>
              </div>

              <div className="space-y-5">
                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputBase} resize-none ${errors.description ? errClass : ""}`}
                    placeholder="Décrivez votre service en détail : prestations incluses, points forts, expérience proposée..."
                    maxLength={600}
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                  <p className="text-right text-xs text-gray-300 mt-1">{form.description.length}/600</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Tarif */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Tarifs *
                    </label>
                    <input
                      name="tarif"
                      value={form.tarif}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.tarif ? errClass : ""}`}
                      placeholder="Ex : 3000 DA / personne / jour"
                    />
                    {errors.tarif && <p className="text-red-500 text-xs mt-1">{errors.tarif}</p>}
                  </div>

                  {/* Wilaya */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Wilaya *
                    </label>
                    <select
                      name="localisation"
                      value={form.localisation}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.localisation ? errClass : ""}`}
                    >
                      <option value="">Choisir une wilaya</option>
                      {WILAYAS.map((w) => <option key={w} value={w}>{w}</option>)}
                    </select>
                    {errors.localisation && <p className="text-red-500 text-xs mt-1">{errors.localisation}</p>}
                  </div>
                </div>

                {/* Disponibilité */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Disponibilité *
                  </label>
                  <input
                    name="disponibilite"
                    value={form.disponibilite}
                    onChange={handleChange}
                    className={`${inputBase} ${errors.disponibilite ? errClass : ""}`}
                    placeholder="Ex : Tous les jours sauf vendredi, ou Weekends uniquement, été 2025..."
                  />
                  {errors.disponibilite && <p className="text-red-500 text-xs mt-1">{errors.disponibilite}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Téléphone */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={form.telephone}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.telephone ? errClass : ""}`}
                      placeholder="+213 XXX XXX XXX"
                    />
                    {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Adresse e-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.email ? errClass : ""}`}
                      placeholder="votre@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3 : Documents ── */}
          {!submitted && step === 3 && (
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-0.5">Documents justificatifs</h2>
                <p className="text-xs text-gray-400">Fournissez les documents nécessaires à la validation de votre offre (max 5 fichiers).</p>
              </div>

              {/* Upload zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-100 transition-colors">
                  <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Cliquez pour importer vos fichiers</p>
                <p className="text-xs text-gray-400">PDF, JPG, PNG — max 5 fichiers</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* File list */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 truncate">{f.name}</p>
                        <p className="text-xs text-gray-400">{(f.size / 1024).toFixed(1)} Ko</p>
                      </div>
                      <button onClick={() => removeFile(i)} className="text-gray-300 hover:text-red-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Document hints */}
              <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-xs font-bold text-blue-700 mb-2">📋 Documents recommandés :</p>
                <ul className="space-y-1 text-xs text-blue-600">
                  {["Carte nationale d'identité ou passeport", "Registre de commerce (si applicable)", "Agrément professionnel ou licence", "Photos de votre service / lieu"].map((d, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ── STEP 4 : Confirmation ── */}
          {!submitted && step === 4 && (
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-0.5">Récapitulatif</h2>
                <p className="text-xs text-gray-400">Vérifiez vos informations avant de soumettre votre offre.</p>
              </div>

              <div className="space-y-4">
                {/* Offre */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{selectedType?.icon}</span>
                    <div>
                      <p className="font-extrabold text-gray-900 text-lg leading-snug">{form.titre}</p>
                      <p className="text-sm text-orange-600 font-semibold">{selectedType?.label}</p>
                    </div>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "Wilaya", value: form.localisation, icon: "📍" },
                    { label: "Tarifs", value: form.tarif, icon: "💰" },
                    { label: "Disponibilité", value: form.disponibilite, icon: "📅" },
                    { label: "Téléphone", value: form.telephone, icon: "📞" },
                    { label: "E-mail", value: form.email, icon: "✉️" },
                    { label: "Documents", value: `${files.length} fichier(s) joint(s)`, icon: "📎" },
                  ].map(({ label, value, icon }) => (
                    <div key={label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                      <span className="text-base">{icon}</span>
                      <div>
                        <p className="text-xs text-gray-400 font-medium">{label}</p>
                        <p className="text-sm font-semibold text-gray-800 truncate">{value || "—"}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description preview */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Description</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{form.description}</p>
                </div>

                {/* Status badge */}
                <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-3">
                  <span className="text-yellow-500 text-lg">⏳</span>
                  <div>
                    <p className="text-sm font-bold text-yellow-700">En attente de validation</p>
                    <p className="text-xs text-yellow-600">Votre offre sera examinée par notre équipe dans un délai de 2 à 5 jours.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Navigation buttons ── */}
          {!submitted && (
            <div className="px-6 md:px-8 pb-6 pt-2 flex items-center justify-between border-t border-gray-50 mt-4">
              {step > 1 ? (
                <button
                  onClick={back}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-semibold text-sm transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Retour
                </button>
              ) : <div />}

              {step < 4 ? (
                <button
                  onClick={next}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors shadow-sm shadow-orange-200"
                >
                  Continuer
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={submit}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors shadow-sm shadow-green-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Soumettre l'offre
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
