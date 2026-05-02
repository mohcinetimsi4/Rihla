import { Link, useNavigate, useLocation } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100">
            {/* Main Footer */}
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Logo */}
                <div className="flex items-center">
                    <span className="text-gray-900 font-extrabold text-2xl tracking-tight">RIHLA</span>
                    <span className="text-gray-900 font-extrabold text-2xl">.dz</span>
                </div>

                {/* Links */}
                <nav className="flex flex-wrap items-center justify-center gap-6">
                    <a href="#" className="text-gray-600 hover:text-orange-500 text-sm transition-colors">
                        Accueil
                    </a>
                    <a href="#" className="text-gray-600 hover:text-orange-500 text-sm transition-colors">
                        Favoris
                    </a>
                     <Link 
                to="/proposerservice" 
                className="text-gray-600 hover:text-orange-500 text-sm transition-colors"
            >
                Proposer un service 
            </Link>
                 
                 <Link to="/contact" className="text-gray-600 hover:text-orange-500 text-sm transition-colors">
                        Contactez-nous
                    </Link>
                    <Link to="/about" className="text-gray-600 hover:text-orange-500 text-sm transition-colors">
                        À propos de nous
                    </Link>
                    
                </nav>

                {/* CTA Button */}
                <a
                    href="#"
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors whitespace-nowrap"
                >
                    Explorer nos destinations
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                        <a href="#" className="hover:text-gray-600 transition-colors">Terms of Use</a>
                        <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
                        <span>© 2026 Rihla.dz &nbsp; All Rights Reserved</span>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        {/* Facebook */}
                        <a
                            href="#"
                            className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a
                            href="#"
                            className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
