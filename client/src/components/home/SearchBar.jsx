function SearchBar() {
    return (
        <div className="bg-white rounded-full shadow-lg flex items-center overflow-hidden w-full max-w-2xl mx-auto">

            <input
                type="text"
                placeholder="Sélectionner une location..."
                className="flex-1 px-4 py-3 outline-none text-sm"
            />

            <input
                type="text"
                placeholder="Quel type de places aimeriez-vous ?"
                className="flex-1 px-4 py-3 outline-none text-sm border-l"
            />

            <button className="bg-orange-500 px-5 py-3 text-white hover:bg-orange-600 transition">
                🔍
            </button>
        </div>
    );
}

export default SearchBar;