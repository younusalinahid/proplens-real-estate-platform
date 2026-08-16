import {Link} from "react-router-dom";
import FeaturedProperties from "./FeaturedProperties.tsx";

function Hero() {
    return (
        <>
            <section className="text-center py-20 px-6 bg-gray-50 dark:bg-gray-800">
                <h1 className="text-4xl font-bold mb-4">
                    Find your next property with confidence
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
                    Explore listings, compare options, and understand the market before you decide.
                </p>
                <Link to="/properties"
                      className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 transition-colors"
                >
                    Explore Properties
                </Link>
            </section>

            <FeaturedProperties/>
        </>
    )
}

export default Hero;