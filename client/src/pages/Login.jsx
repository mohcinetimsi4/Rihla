import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/ui/InputField";

/* ── Icons ───────────────────────────────────────────── */
const MailIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

/* ── Validation ──────────────────────────────────────── */
const validate = (email, password) => {
    const errors = {};
    if (!email) errors.email = "L'adresse e-mail est requise.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Adresse e-mail invalide.";
    if (!password) errors.password = "Le mot de passe est requis.";
    else if (password.length < 6) errors.password = "Minimum 6 caractères.";
    return errors;
};

/* ── Component ───────────────────────────────────────── */
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate(email, password);
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
                <div className="relative z-10 text-center px-12">
                    <h2 className="text-3xl font-bold text-white leading-snug mb-4">
                        Votre prochaine aventure<br />commence ici &nbsp; 🧭
                    </h2>
                    <p className="text-white/75 text-base leading-relaxed max-w-sm">
                        Connectez-vous pour accéder à vos destinations favorites et bien plus encore.
                    </p>
                </div>

                {/* Stats strip */}
                <div className="relative z-10 mt-12 flex items-center gap-8">
                    {[
                        { value: "500+", label: "Destinations" },
                        { value: "10k+", label: "Voyageurs" },
                        { value: "4.8★", label: "Note moyenne" },
                    ].map((s) => (
                        <div key={s.label} className="text-center">
                            <p className="text-2xl font-extrabold text-sky-400">{s.value}</p>
                            <p className="text-white/70 text-xs">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Right Panel — Form ── */}
            <div className="flex-1 flex flex-col justify-between bg-gray-50">
                {/* Top nav (mobile logo + link) */}
                <div className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100 lg:hidden">
                    <Link to="/" className="flex items-center">
                        <span className="text-sky-500 font-extrabold text-2xl tracking-tight leading-none">RIHLA</span>
                        <span className="text-sky-500 font-extrabold text-2xl leading-none">.dz</span>
                    </Link>
                    <Link to="/register" className="text-sm text-sky-500 font-semibold hover:underline">
                        S'inscrire →
                    </Link>
                </div>

                {/* Form area */}
                <div className="flex-1 flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md">
                        {submitted ? (
                            /* ── Success State ── */
                            <div className="text-center">
                                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Connexion réussie !</h2>
                                <p className="text-gray-500 text-sm mb-6">Bienvenue sur Rihla.dz. Vous allez être redirigé…</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="text-sky-500 font-semibold text-sm hover:underline"
                                >
                                    ← Retour
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Heading */}
                                <div className="mb-8">
                                    <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Bon retour &nbsp; 👋</h1>
                                    <p className="text-gray-500 text-sm">
                                        Pas encore de compte ?{" "}
                                        <Link to="/register" className="text-sky-500 font-semibold hover:underline">
                                            S'inscrire gratuitement
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
                                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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

                                    <div>
                                        <InputField
                                            label="Mot de passe"
                                            icon={<LockIcon />}
                                            isPassword
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            error={errors.password}
                                            autoComplete="current-password"
                                        />
                                    </div>

                                    {/* Remember + Forgot */}
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={remember}
                                                onChange={(e) => setRemember(e.target.checked)}
                                                className="w-4 h-4 accent-sky-500 cursor-pointer"
                                            />
                                            <span className="text-sm text-gray-600">Se souvenir de moi</span>
                                        </label>
                                        <a href="#" className="text-sm text-sky-500 font-medium hover:underline">
                                            Mot de passe oublié ?
                                        </a>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm mt-1"
                                    >
                                        Se connecter
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
                        <a href="#" className="hover:text-gray-600">Confidentialité</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
