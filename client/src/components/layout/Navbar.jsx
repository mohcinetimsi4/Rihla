function Navbar() {
    return (
        <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-12 py-5 z-20 text-white">

            <h1 className="text-2xl font-bold text-orange-500">
                RIHLA<span className="text-sm">.dz</span>
            </h1>

            <ul className="flex gap-8 text-sm font-medium">
                <li className="hover:text-orange-400 cursor-pointer">Lieux</li>
                <li className="hover:text-orange-400 cursor-pointer">Hôtels</li>
                <li className="hover:text-orange-400 cursor-pointer"> Restaurant</li>
                <li className="hover:text-orange-400 cursor-pointer">Guides</li>
            </ul>

            <div className="flex items-center gap-4 text-sm">
                <button className="px-4 py-2 rounded-lg hover:git add .text-orange-400 transition">Se connecter</button>
                <button className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                    S'inscrire
                </button>
            </div>
        </nav>
    );
}

export default Navbar;