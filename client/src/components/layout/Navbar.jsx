const Navbar = ({ activeSection, setActiveSection = () => {} }) => {
    return (
        <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-5">
            {/* Logo */}
            <div className="flex items-center">
                <span className="text-orange-500 font-extrabold text-3xl tracking-tight leading-none">
                    RIHLA
                </span>
                <span className="text-orange-500 font-extrabold text-3xl leading-none">.dz</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                <button
                    onClick={() => setActiveSection("lieux")}
                    className={`font-medium transition-colors bg-transparent border-none cursor-pointer ${
                        activeSection === "lieux"
                            ? "text-orange-400"
                            : "text-white hover:text-orange-400"
                    }`}
                >
                    Lieux
                </button>
                <button
                    onClick={() => setActiveSection("hotels")}
                    className={`font-medium transition-colors bg-transparent border-none cursor-pointer ${
                        activeSection === "hotels"
                            ? "text-orange-400"
                            : "text-white hover:text-orange-400"
                    }`}
                >
                    Hôtels
                </button>
                <a href="#" className="text-white font-medium hover:text-orange-400 transition-colors">
                    Restaurant
                </a>
                <a href="#" className="text-white font-medium hover:text-orange-400 transition-colors">
                    Guides
                </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
                <a href="#" className="text-white font-medium hover:text-orange-400 transition-colors px-4 py-2">
                    Se connecter
                </a>
                <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-full transition-colors">
                    S'inscrire
                </a>
            </div>
        </nav>
    );
};

export default Navbar;