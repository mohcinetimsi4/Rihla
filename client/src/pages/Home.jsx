import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import PlacesSection from "../components/home/DestinationCard";
import GuidesSection from "../components/home/Guides";
import Footer from "../components/layout/Footer";

function App() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />
            <Hero />
            <PlacesSection />
            <GuidesSection />
            <Footer />
        </div>
    );
}

export default App;
