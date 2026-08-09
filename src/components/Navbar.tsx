import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <Link to="/" className="text-xl font-bold text-blue-600">
                PropLens
            </Link>

            <div className="flex gap-6 text-sm font-medium text-gray-700">
                <Link to="/properties">Properties</Link>
                <Link to="/compare">Compare</Link>
                <Link to="/insights">Insights</Link>
            </div>
        </nav>
    )
}

export default Navbar;