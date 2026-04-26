import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import PlacesSection from "../components/home/DestinationCard";
import GuidesSection from "../components/home/Guides";
import Footer from "../components/layout/Footer";
import HotelsSection from "../components/home/HotelCard";
function Home() {
    const [activeSection, setActiveSection] = useState("lieux");

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
            <Hero />
            {activeSection === "lieux" && <PlacesSection />}
            {activeSection === "hotels" && <HotelsSection />}
            <GuidesSection />
            <Footer />
        </div>
    );
}

export default Home;
