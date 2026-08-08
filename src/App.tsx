import './App.css'
import "./test.tsx"
import {Routes, Route} from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<div>Home / Landing page</div>} />
            <Route path="/properties" element={<div>Property Discovery page</div>} />
            <Route path="/property/:id" element={<div>Property Detail page</div>} />
            <Route path="/compare" element={<div>Compare page</div>} />
            <Route path="/insights" element={<div>Market Insights page</div>} />
        </Routes>
    )
}

export default App
