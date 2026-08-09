import type {Property} from "../../types/property.ts";
import propertiesData from "../../data/properties.json"
import {Link, useParams} from "react-router-dom";

const properties = propertiesData as Property[];

function ScoreBar({label, value}: { label: string; value: number }) {
    return (
        <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{label}</span>
                <span className="font-medium">{value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded h-2">
                <div className="bg-blue-600 h-2 rounded"
                     style={{width: `${value}%`}}
                />
            </div>
        </div>
    )
}

function PropertiesDetailsPage() {
    const {id} = useParams();
    const property = properties.find((p) => p.id == id);

    if (!property) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <p>Property not found.</p>
                <Link to="/properties" className="text-blue-600">
                    Back to listings
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-96 object-cover rounded-lg"
                />

                <div>
                    <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                    <p className="text-gray-500 mb-4">
                        {property.location.area}, {property.location.city}
                    </p>

                    <p className="text-2xl font bold text-blue-600 mb-4">
                        ${property.price.toLocaleString()}
                        {property.priceType === "rent" ? "/month" : ""}
                    </p>

                    <div className="flex gap-4 text-gray-600 mb-6">
                        <span>{property.bedrooms} bed</span>
                        <span>{property.bathrooms} bath</span>
                        <span>{property.size} sqft</span>
                    </div>

                    <p className="text-gray-700 mb-6">{property.description}</p>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">Property Score</h3>
                            <span className="text-2xl font-bold text-blue-600">
                                {property.score.overall}
                            </span>
                        </div>
                    </div>
                    <ScoreBar label="Price" value={property.score.price} />
                    <ScoreBar label="Price" value={property.score.location} />
                    <ScoreBar label="Price" value={property.score.size} />
                    <ScoreBar label="Price" value={property.score.amenities} />

                </div>
            </div>
        </div>
    )
}

export default PropertiesDetailsPage;