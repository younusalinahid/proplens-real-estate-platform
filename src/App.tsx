import "./test.tsx"
import {Routes, Route} from "react-router-dom";
import DiscoveryPage from "./features/DiscoveryPage.tsx";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import PropertyDetailPage from "./features/property-detail/PropertyDetailsPage.tsx";
import Footer from "./components/Footer.tsx";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Hero />}/>
                <Route path="/properties" element={<DiscoveryPage/>}/>
                <Route path="/property/:id" element={<PropertyDetailPage />}/>
                <Route path="/compare" element={<div>Compare page</div>}/>
                <Route path="/insights" element={<div>Market Insights page</div>}/>
            </Routes>
            <Footer />
        </>
    );
}

export default App
