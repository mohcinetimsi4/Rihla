import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/ui/InputField";

/* ── Icons ───────────────────────────────────────────── */
const UserIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const MailIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const PhoneIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const LockIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
);

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

/* ── Password strength ───────────────────────────────── */
const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
};

const strengthLabel = ["", "Faible", "Moyen", "Bien", "Fort"];
const strengthColor = ["", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"];

/* ── Validation ──────────────────────────────────────── */
const validate = (fullName, email, phone, password, confirm, terms) => {
    const errors = {};
    if (!fullName.trim()) errors.fullName = "Le nom complet est requis.";
    if (!email) errors.email = "L'adresse e-mail est requise.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Adresse e-mail invalide.";
    if (phone && !/^[\d\s+\-()]{7,15}$/.test(phone)) errors.phone = "Numéro de téléphone invalide.";
    if (!password) errors.password = "Le mot de passe est requis.";
    else if (password.length < 8) errors.password = "Minimum 8 caractères.";
    if (!confirm) errors.confirm = "Veuillez confirmer votre mot de passe.";
    else if (confirm !== password) errors.confirm = "Les mots de passe ne correspondent pas.";
    if (!terms) errors.terms = "Vous devez accepter les conditions d'utilisation.";
    return errors;
};

/* ── Component ───────────────────────────────────────── */
const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [terms, setTerms] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const strength = getStrength(password);

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate(fullName, email, phone, password, confirm, terms);
        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            setSubmitted(true);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* ── Left Panel — Hero Image ── */}
            <div
                className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center"
                style={{
                    backgroundImage: "url('/images/auth-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/55" />

                {/* Logo */}
                <Link
                    to="/home"

                    className="relative z-10 flex items-center mb-8">
                    <span className="text-white font-extrabold text-4xl tracking-tight leading-none">RIHLA</span>
                    <span className="text-white font-extrabold text-4xl leading-none">.dz</span>

                </Link>

                {/* Tagline */}
                <div className="relative z-10 text-center px-10">
                    <h2 className="text-3xl font-bold text-white leading-snug mb-4">
                        Rejoignez la communauté<br />des explorateurs &nbsp; 🌍
                    </h2>
                    <p className="text-white/75 text-base leading-relaxed max-w-sm">
                        Créez votre compte gratuitement et découvrez les trésors cachés de l'Algérie, recommandés pour vous.
                    </p>
                </div>

                {/* Feature list */}
                <ul className="relative z-10 mt-10 flex flex-col gap-3 text-sm">
                    {[
                        "Destinations personnalisées selon vos goûts",
                        "Guides locaux certifiés disponibles",
                        "Accès à des lieux exclusifs hors sentiers",
                        "Avis authentiques de la communauté",
                    ].map((feat) => (
                        <li key={feat} className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0 text-white">
                                <CheckIcon />
                            </span>
                            <span className="text-white/85">{feat}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* ── Right Panel — Form ── */}
            <div className="flex-1 flex flex-col justify-between bg-gray-50">
                {/* Top nav (mobile) */}
                <div className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100 lg:hidden">
                    <Link to="/" className="flex items-center">
                        <span className="text-orange-500 font-extrabold text-2xl tracking-tight leading-none">RIHLA</span>
                        <span className="text-orange-500 font-extrabold text-2xl leading-none">.dz</span>
                    </Link>
                    <Link to="/login" className="text-sm text-orange-500 font-semibold hover:underline">
                        Se connecter →
                    </Link>
                </div>

                {/* Form area */}
                <div className="flex-1 flex items-center justify-center px-6 py-10">
                    <div className="w-full max-w-md">
                        {submitted ? (
                            /* ── Success State ── */
                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Compte créé avec succès !</h2>
                                <p className="text-gray-500 text-sm mb-2">
                                    Bienvenue, <span className="font-semibold text-gray-800">{fullName}</span> ! 🎉
                                </p>
                                <p className="text-gray-500 text-sm mb-6">
                                    Un e-mail de confirmation a été envoyé à <span className="font-medium">{email}</span>.
                                </p>
                                <Link
                                    to="/login"
                                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                                >
                                    Se connecter maintenant →
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Heading */}
                                <div className="mb-7">
                                    <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Créer un compte &nbsp; ✨</h1>
                                    <p className="text-gray-500 text-sm">
                                        Déjà inscrit ?{" "}
                                        <Link to="/login" className="text-orange-500 font-semibold hover:underline">
                                            Se connecter
                                        </Link>
                                    </p>
                                </div>

                                {/* Google button */}
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 mb-6 shadow-sm"
                                >
                                    <GoogleIcon />
                                    Continuer avec Google
                                </button>

                                {/* Divider */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex-1 h-px bg-gray-200" />
                                    <span className="text-gray-400 text-xs">ou avec votre e-mail</span>
                                    <div className="flex-1 h-px bg-gray-200" />
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                                    {/* Full name */}
                                    <InputField
                                        label="Nom complet"
                                        icon={<UserIcon />}
                                        type="text"
                                        placeholder="Prénom Nom"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        error={errors.fullName}
                                        autoComplete="name"
                                    />

                                    {/* Email */}
                                    <InputField
                                        label="Adresse e-mail"
                                        icon={<MailIcon />}
                                        type="email"
                                        placeholder="votre@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        error={errors.email}
                                        autoComplete="email"
                                    />

                                    {/* Phone (optional) */}
                                    <InputField
                                        label="Numéro de téléphone (optionnel)"
                                        icon={<PhoneIcon />}
                                        type="tel"
                                        placeholder="+213 6XX XX XX XX"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        error={errors.phone}
                                        autoComplete="tel"
                                    />

                                    {/* Password */}
                                    <div>
                                        <InputField
                                            label="Mot de passe"
                                            icon={<LockIcon />}
                                            isPassword
                                            placeholder="Minimum 8 caractères"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            error={errors.password}
                                            autoComplete="new-password"
                                        />
                                        {/* Strength bar */}
                                        {password.length > 0 && (
                                            <div className="mt-2">
                                                <div className="flex gap-1 mb-1">
                                                    {[1, 2, 3, 4].map((n) => (
                                                        <div
                                                            key={n}
                                                            className={`flex-1 h-1.5 rounded-full transition-all ${n <= strength ? strengthColor[strength] : "bg-gray-200"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    Force du mot de passe :{" "}
                                                    <span
                                                        className={`font-semibold ${strength >= 3
                                                            ? "text-green-600"
                                                            : strength === 2
                                                                ? "text-yellow-600"
                                                                : "text-red-500"
                                                            }`}
                                                    >
                                                        {strengthLabel[strength] || "—"}
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Confirm password */}
                                    <InputField
                                        label="Confirmer le mot de passe"
                                        icon={<LockIcon />}
                                        isPassword
                                        placeholder="••••••••"
                                        value={confirm}
                                        onChange={(e) => setConfirm(e.target.value)}
                                        error={errors.confirm}
                                        autoComplete="new-password"
                                    />

                                    {/* Terms */}
                                    <div className="flex flex-col gap-1">
                                        <label className="flex items-start gap-2.5 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={terms}
                                                onChange={(e) => setTerms(e.target.checked)}
                                                className="w-4 h-4 accent-orange-500 cursor-pointer mt-0.5 shrink-0"
                                            />
                                            <span className="text-sm text-gray-600 leading-relaxed">
                                                J'accepte les{" "}
                                                <a href="#" className="text-orange-500 font-medium hover:underline">
                                                    Conditions d'utilisation
                                                </a>{" "}
                                                et la{" "}
                                                <a href="#" className="text-orange-500 font-medium hover:underline">
                                                    Politique de confidentialité
                                                </a>{" "}
                                                de Rihla.dz
                                            </span>
                                        </label>
                                        {errors.terms && (
                                            <p className="text-xs text-red-500 pl-6">{errors.terms}</p>
                                        )}
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm mt-1"
                                    >
                                        Créer mon compte
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>

                {/* Bottom strip */}
                <div className="px-8 py-4 text-center">
                    <p className="text-xs text-gray-400">
                        © 2026 Rihla.dz — Tous droits réservés &nbsp;·&nbsp;
                        <a href="#" className="hover:text-gray-600">
                            Confidentialité
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
