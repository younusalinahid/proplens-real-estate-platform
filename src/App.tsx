import {Routes, Route} from "react-router-dom";
import DiscoveryPage from "./features/DiscoveryPage.tsx";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import PropertyDetailPage from "./features/property-detail/PropertyDetailsPage.tsx";
import Footer from "./components/Footer.tsx";
import ComparePage from "./features/ComparePage.tsx";
import InsightsPage from "./features/InsightsPage.tsx";
import {useEffect, useState} from "react";

function App() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    return (
        <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen">
            <Navbar darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)}/>
            <Routes>
                <Route path="/" element={<Hero/>}/>
                <Route path="/properties" element={<DiscoveryPage/>}/>
                <Route path="/property/:id" element={<PropertyDetailPage/>}/>
                <Route path="/compare" element={<ComparePage/>}/>
                <Route path="/insights" element={<InsightsPage/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App
