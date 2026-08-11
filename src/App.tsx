import {Routes, Route} from "react-router-dom";
import DiscoveryPage from "./features/DiscoveryPage.tsx";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import PropertyDetailPage from "./features/property-detail/PropertyDetailsPage.tsx";
import Footer from "./components/Footer.tsx";
import ComparePage from "./features/ComparePage.tsx";
import InsightsPage from "./features/InsightsPage.tsx";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Hero />}/>
                <Route path="/properties" element={<DiscoveryPage/>}/>
                <Route path="/property/:id" element={<PropertyDetailPage />}/>
                <Route path="/compare" element={<ComparePage/>}/>
                <Route path="/insights" element={<InsightsPage />}/>
            </Routes>
            <Footer />
        </>
    );
}

export default App
