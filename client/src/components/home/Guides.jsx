function Guides() {
    return (
        <section className="py-16 px-10 text-center">
            <h2 className="text-2xl font-bold mb-2">Nos guides</h2>
            <p className="text-sm text-gray-500 mb-10">
                Des témoignages authentiques d'explorateurs
            </p>

            <div className="grid md:grid-cols-3 gap-6">
                {["Mohamed", "Sofia", "Mustapha"].map((name) => (
                    <div key={name} className="bg-white p-5 rounded-xl shadow">
                        <h3 className="font-semibold">{name}</h3>
                        <p className="text-orange-500 text-sm mb-2">⭐ 4.7</p>
                        <p className="text-xs text-gray-500">
                            Rihla m'a permis de découvrir des endroits incroyables...
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Guides;