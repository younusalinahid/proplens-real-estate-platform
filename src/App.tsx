import "./test.tsx"
import {Routes, Route} from "react-router-dom";
import DiscoveryPage from "./features/DiscoveryPage.tsx";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Hero />}/>
                <Route path="/properties" element={<DiscoveryPage/>}/>
                <Route path="/property/:id" element={<div>Property Detail page</div>}/>
                <Route path="/compare" element={<div>Compare page</div>}/>
                <Route path="/insights" element={<div>Market Insights page</div>}/>
            </Routes>
        </>
    );
}

export default App
