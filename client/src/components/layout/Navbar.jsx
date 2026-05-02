import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ transparent = true }) => {
    const [user, setUser] = useState(null); // start as null; plug in your auth context here later
    // const [user, setUser] = useState({ name: "Mohcine" }); // ← swap back to test logged-in state
    const [activeSection, setActiveSection] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        setUser(null);
        navigate("/");
    };


    return (
        <nav className={`absolute top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-5 ${!transparent ? "bg-white shadow-md" : ""}`}>
            {/* Logo */}
            <Link to="/" className="flex items-center">
    <img src="/images/logo.png" alt="Rihla.dz" className="h-20" />
</Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                <Link
                                   to="/destinations"
                                   className={`font-medium transition-colors bg-transparent border-none cursor-pointer ${
                                       location.pathname === "/destinations"
                                           ? "text-sky-400"
                                           : "text-sky-400 hover:text-sky-400"
                                   }`}
                               >
                                   Lieux
                               </Link>
                <Link
                    to="/hotels"
                    className={`font-medium transition-colors bg-transparent border-none cursor-pointer ${
                        location.pathname === "/hotels"
                            ? "text-sky-400"
                            : "text-sky-400 hover:text-sky-400"
                    }`}
                >
                    Hôtels
                </Link>
                <Link
                    to="/restaurants"
                    className={`font-medium transition-colors bg-transparent border-none cursor-pointer ${
                        location.pathname === "/restaurants"
                            ? "text-sky-400"
                            : "text-sky-400 hover:text-sky-400"
                    }`}
                >
                    Restaurant
                </Link>
                  <Link
                    to="/guides"
                    className={`font-medium transition-colors bg-transparent border-none cursor-pointer ${
                        location.pathname === "/guides"
                            ? "text-sky-400"
                            : "text-sky-400 hover:text-sky-400"
                    }`}
                >
                    Guides
                </Link>

                {/* Séparateur */}
                <span className={`${transparent ? "text-white/30" : "text-gray-200"}`}>|</span>

                {/* Contribuer dans les liens */}
                <Link
                    to="/contribuer"
                    className="flex items-center gap-1.5 text-sky-400 font-semibold hover:text-sky-500 transition-colors"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Contribuer
                </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
                {!user ? (
                    <>
                        <Link
                            to="/login"
                            className={`font-medium hover:text-sky-400 px-4 py-2 ${transparent ? "text-white" : "text-gray-700"}`}
                        >
                            Se connecter
                        </Link>
                        <Link
                            to="/register"
                            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-2.5 rounded-full"
                        >
                            S'inscrire
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold">
                                {user.name[0]}
                            </div>
                            <span className={`${transparent ? "text-white" : "text-gray-700"}`}>
                                {user.name}
                            </span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-white bg-red-500 hover:bg-red-600 font-medium px-4 py-1.5 rounded-full transition-colors"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
