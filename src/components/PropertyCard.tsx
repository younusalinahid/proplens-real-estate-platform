import type {Property} from "../types/property.ts";
import {Link} from "react-router-dom";
import {useCompareStore} from "../store/compareStore.ts";

interface PropertyCardProps {
    property: Property;
}

function PropertyCard({property}: PropertyCardProps) {
    const selectedIds = useCompareStore((state) => state.selectedIds);
    const toggleCompare = useCompareStore((state) => state.toggleCompare);
    const isSelected = selectedIds.includes(property.id);

    const priceLable =
        property.priceType === "rent"
            ? `${property.price.toLocaleString()}/month`
            : `${property.price.toLocaleString()}`;

    return (
        <div
            className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
            <label
                className="absolute top-2 left-2 z-10 bg-white/90 dark:bg-gray-900/90 dark:text-white rounded px-2 py-1 flex items-center gap-1 text-xs font-medium cursor-pointer">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleCompare(property.id)}
                />
                Compare
            </label>

            <Link to={`/property/${property.id}`} className="block">
                <div className="relative">
                    <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 dark:text-white text-sm font-semibold px-2 py-1 rounded">
                    Score {property.score.overall}
                </span>
                </div>

                <div className="p-4">
                    <h3 className="font-semibold text-lg truncate dark:text-white">{property.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {property.location.area}, {property.location.city}
                    </p>

                    <p className="text-blue-600 dark:text-blue-400 font-bold mt-2">{priceLable}</p>

                    <div className="flex gap-3 text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <span>{property.bedrooms} bed</span>
                        <span>{property.bathrooms} bath</span>
                        <span>{property.size} sqft</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default PropertyCard;