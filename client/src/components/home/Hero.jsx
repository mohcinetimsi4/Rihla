const Hero = () => {
    return (
        <div
            className="relative w-full min-h-[600px] flex flex-col items-center justify-center text-center"
            style={{
                backgroundImage: "url('/images/hero-bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center px-6 pt-24 pb-20">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight max-w-2xl">
                    Votre Rihla commence ici !
                </h1>
                <p className="text-white/90 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
                    Des joyaux cachés loin des sentiers touristiques habituels aux sites emblématiques qui
                    définissent l'Algérie, chaque recommandation est soigneusement adaptée à vos préférences
                    de voyage personnelles et vous permet de visiter de la manière la plus enrichissante qui soit.
                </p>

                {/* Search Bar */}
                {/* Desktop: single pill row | Mobile: rounded card stacked */}
                <div className="w-full max-w-2xl">

                    {/* ── Desktop pill (sm and up) ── */}
                    <div className="hidden sm:flex items-center bg-white rounded-full shadow-xl overflow-hidden">
                        {/* Location selector */}
                        <div className="flex items-center gap-2 px-5 py-3.5 flex-1 border-r border-gray-200">
                            <svg className="text-gray-400 w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <select className="bg-transparent text-gray-500 text-sm flex-1 outline-none cursor-pointer appearance-none">
                                <option value="">Sélectionner une location…</option>
                                <option value="alger">Alger</option>
                                <option value="oran">Oran</option>
                                <option value="constantine">Constantine</option>
                                <option value="bejaia">Béjaïa</option>
                                <option value="tlemcen">Tlemcen</option>
                                <option value="ghardaia">Ghgitardaïa</option>
                            </select>
                            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {/* Type selector */}
                        <div className="flex items-center gap-2 px-5 py-3.5 flex-1">
                            <select className="bg-transparent text-gray-500 text-sm flex-1 outline-none cursor-pointer appearance-none">
                                <option value="">Quel type de place ?</option>
                                <option value="nature">Nature</option>
                                <option value="plages">Plages</option>
                                <option value="villes">Villes</option>
                                <option value="espaces">Espaces</option>
                                <option value="monuments">Monuments</option>
                            </select>
                            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {/* Search button — inset so it stays inside the pill */}
                        <div className="pr-1.5 py-1.5 shrink-0">
                            <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white w-11 h-11 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* ── Mobile card (below sm) ── */}
                    <div className="flex flex-col sm:hidden bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Location selector */}
                        <div className="flex items-center gap-2 px-4 py-3.5 border-b border-gray-100">
                            <svg className="text-gray-400 w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <select className="bg-transparent text-gray-500 text-sm flex-1 outline-none cursor-pointer appearance-none">
                                <option value="">Sélectionner une location pour l'explorer…</option>
                                <option value="alger">Alger</option>
                                <option value="oran">Oran</option>
                                <option value="constantine">Constantine</option>
                                <option value="bejaia">Béjaïa</option>
                                <option value="tlemcen">Tlemcen</option>
                                <option value="ghardaia">Ghardaïa</option>
                            </select>
                            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {/* Type selector */}
                        <div className="flex items-center gap-2 px-4 py-3.5 border-b border-gray-100">
                            <select className="bg-transparent text-gray-500 text-sm flex-1 outline-none cursor-pointer appearance-none">
                                <option value="">Quelle type de places aimerez-vous ?</option>
                                <option value="nature">Nature</option>
                                <option value="plages">Plages</option>
                                <option value="villes">Villes</option>
                                <option value="espaces">Espaces</option>
                                <option value="monuments">Monuments</option>
                            </select>
                            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {/* Full-width search button */}
                        <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white py-3.5 flex items-center justify-center gap-2 font-semibold text-sm">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Rechercher
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hero;
