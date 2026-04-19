import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Guides from "../components/home/Guides";
import Footer from "../components/layout/Footer";

function Home() {
    return (
        <div className="bg-gray-50 text-gray-800">
            <Navbar />
            <Hero />
            <Guides />
            <Footer />
        </div>
    );
}

export default Home;