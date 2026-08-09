import type {Property} from "../types/property.ts";
import propertiesData from "../data/properties.json";
import PropertyCard from "./PropertyCard.tsx";

const properties = propertiesData as Property[];

function FeaturedProperties() {
    const featured = properties
        .slice()
        .sort((a, b) => b.score.overall - a.score.overall)
        .slice(0, 3)

    return (
        <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-6">Top rated properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featured.map((property) => (
                    <PropertyCard key={property.id} property={property}/>
                ))}
            </div>
        </section>
    )
}

export default FeaturedProperties;