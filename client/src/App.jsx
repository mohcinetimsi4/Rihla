import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Contribuer from "./pages/Contribuer";
import DestinationDetails from "./pages/DestinationDetails";
import HotelDetails from "./pages/HotelDetails";
import RestaurantDetails from "./pages/RestaurantDetails";
import Hotels from "./pages/Hotels";
import Restaurants from "./pages/Restaurants";
import GuidesPage from "./pages/GuidesPage";
import Destinations from "./pages/Destinations";
import ProposerService  from "./pages/ProposerService";
import Diary from "./pages/Diary";
import About from "./pages/About";
import Contact from "./pages/Contact";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contribuer" element={<Contribuer />} />
         <Route path="/hotels" element={<Hotels />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/destination/:id" element={<DestinationDetails />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/proposerservice" element={<ProposerService />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
