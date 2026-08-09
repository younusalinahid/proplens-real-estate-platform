import "./test.tsx"
import {Routes, Route} from "react-router-dom";
import DiscoveryPage from "./features/DiscoveryPage.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<div>Home / Landing page</div>} />
            <Route path="/properties" element={<DiscoveryPage />} />
            <Route path="/property/:id" element={<div>Property Detail page</div>} />
            <Route path="/compare" element={<div>Compare page</div>} />
            <Route path="/insights" element={<div>Market Insights page</div>} />
        </Routes>
    )
}

export default App
