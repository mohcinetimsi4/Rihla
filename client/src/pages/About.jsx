import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white py-16 px-6">
            <div className="max-w-4xl mx-auto">
                
                {/* Bouton Retour Arrière */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors mb-10 font-medium group"
                >
                    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour
                </button>

                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
                        À propos de <span className="text-orange-500">RIHLA.dz</span>
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                        Rihla.dz est votre compagnon de voyage ultime en Algérie. Notre mission est de simplifier 
                        la découverte de notre magnifique pays en connectant les voyageurs avec les meilleurs services locaux.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        <div className="p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-orange-500 font-bold text-xl mb-2">Passion</div>
                            <p className="text-sm text-gray-500">Amoureux de l'Algérie et de sa diversité culturelle.</p>
                        </div>
                        <div className="p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-orange-500 font-bold text-xl mb-2">Simplicité</div>
                            <p className="text-sm text-gray-500">Une interface intuitive pour organiser vos sorties en un clic.</p>
                        </div>
                        <div className="p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-orange-500 font-bold text-xl mb-2">Communauté</div>
                            <p className="text-sm text-gray-500">Soutenir le tourisme local et les prestataires algériens.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;