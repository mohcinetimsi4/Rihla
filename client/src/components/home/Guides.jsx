const guides = [
    {
        id: 1,
        name: "Mohamed",
        location: "De Tipaza",
        rating: 4.7,
        review:
            "Rihla m'a permis de découvrir des endroits que je n'aurais jamais trouvés par moi-même. Les recommandations étaient personnalisées et correspondaient vraiment à mes préférences…",
    },
    {
        id: 2,
        name: "Sofia",
        location: "Photographe",
        rating: 4.8,
        review:
            "Rihla m'a fait découvrir des plages secrètes et des marchés animés que je n'aurais jamais trouvés autrement. Chaque suggestion semblait avoir été faite spécialement pour moi…",
    },
    {
        id: 3,
        name: "Mustapha",
        location: "blogueur",
        rating: 4.5,
        review:
            "je valide fort, rihla a parfaitement respecté toutes ses recommandations. C'était comme voyager avec un ami du coin.",
    },
    {
        id: 4,
        name: "Amara",
        location: "Ecrivain Voyageur",
        rating: 4.9,
        review:
            "J'ai découvert des trésors culturels et des havres de paix qui ont rendu mon voyage inoubliable. ce site comprend vraiment les aspirations des voyageurs.",
    },
    {
        id: 5,
        name: "Liamin",
        location: "Randonneur",
        rating: 4.7,
        review:
            "L'appli m'a indiqué les meilleurs spots, loin de la foule. Maintenant, c'est mon outil indispensable pour organiser mes aventures en algérie.",
    },
    {
        id: 6,
        name: "Hanane",
        location: "Etudiante",
        rating: 4.8,
        review:
            "J'adore cette plateforme elle est nous a permis de découvrir notre pays et ses tresors cachés.",
    },
];

const StarIcon = () => (
    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const AvatarIcon = () => (
    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
        <svg className="w-7 h-7 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
    </div>
);

const GuidesSection = () => {
    return (
        <section className="bg-gray-50 py-16 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Nos guides</h2>
                    <p className="text-gray-500 text-base">
                        Des témoignages authentiques d'explorateurs qui ont trouvé l'expérience locale idéale grâce à Rihla
                    </p>
                </div>

                {/* Guides Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {guides.map((guide) => (
                        <div key={guide.id} className="bg-white rounded-2xl p-5 shadow-sm">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <AvatarIcon />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">{guide.name}</p>
                                        <p className="text-gray-400 text-xs">{guide.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <StarIcon />
                                    <span className="text-sm font-semibold text-gray-700">{guide.rating}</span>
                                </div>
                            </div>

                            {/* Review */}
                            <p className="text-gray-500 text-sm leading-relaxed">{guide.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GuidesSection;
