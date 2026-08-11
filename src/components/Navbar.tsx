// src/components/Navbar.tsx

import { Link } from "react-router-dom";

interface NavbarProps {
    darkMode: boolean;
    onToggleDarkMode: () => void;
}

function Navbar({ darkMode, onToggleDarkMode }: NavbarProps) {
    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="text-xl font-bold text-blue-600">
                PropLens
            </Link>

            <div className="flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
                <Link to="/properties">Properties</Link>
                <Link to="/compare">Compare</Link>
                <Link to="/insights">Insights</Link>
                <button
                    onClick={onToggleDarkMode}
                    className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-xs"
                >
                    {darkMode ? "☀️ Light" : "🌙 Dark"}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;