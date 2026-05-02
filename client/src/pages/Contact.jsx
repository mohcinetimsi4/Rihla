import { useNavigate } from "react-router-dom";

const Contact = () => {
    const navigate = useNavigate(); // Hook pour la navigation

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6">
            <div className="max-w-2xl mx-auto">
                
                {/* Bouton Retour Arrière */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors mb-6 font-medium"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour
                </button>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="bg-orange-500 p-8 text-white text-center">
                        <h2 className="text-3xl font-bold">Contactez-nous</h2>
                        <p className="mt-2 opacity-90">Une question ou une suggestion ? Écrivez-nous !</p>
                    </div>
                    
                    <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" placeholder="Votre nom" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" placeholder="votre@email.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" placeholder="Comment pouvons-nous vous aider ?"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-orange-200">
                            Envoyer le message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;