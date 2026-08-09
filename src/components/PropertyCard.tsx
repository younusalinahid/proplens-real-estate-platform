import type {Property} from "../types/property.ts";
import {Link} from "react-router-dom";

interface PropertyCardProps {
    property: Property;
}

function PropertyCard({property}: PropertyCardProps) {
    const priceLable =
        property.priceType === "rent" ? `${property.price.toLocaleString()}/month`
            : `${property.price.toLocaleString()}`;

    return (
        <Link to={`/property/${property.id}`}
              className="block rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow bg-white">
            <div className="relative">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 right-2 bg-white/90 text-sm font-semibold px-2 py-1 rounded">
                    Score {property.score.overall}
                </span>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-lg truncate">{property.title}</h3>
                <p className="text-gray-500 text-sm">
                    {property.location.area}, {property.location.city}
                </p>

                <p className="text-blue-600 font-bold mt-2">{priceLable}</p>

                <div className="flex gap-3 text-sm text-gray-600 mt-2">
                    <span>{property.bedrooms} bed</span>
                    <span>{property.bathrooms} bath</span>
                    <span>{property.size} sqft</span>
                </div>
            </div>
        </Link>
    )
}

export default PropertyCard;