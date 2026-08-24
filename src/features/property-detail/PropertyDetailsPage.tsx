import type {Property} from "../../types/property.ts";
import propertiesData from "../../data/properties.json"
import {Link, useParams} from "react-router-dom";
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import PropertyCard from "../../components/PropertyCard.tsx";
import {getSimilarProperties} from "../../utils/similarProperties.ts";

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
                <p className="dark:text-white">Property not found.</p>
                <Link to="/properties" className="text-blue-600 dark:text-blue-400">
                    Back to listings
                </Link>
            </div>
        );
    }

    const similar = getSimilarProperties(property, properties, 3);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-96 object-cover rounded-lg"
                />

                <div>
                    <h1 className="text-3xl font-bold mb-2 dark:text-white">{property.title}</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        {property.location.area}, {property.location.city}
                    </p>

                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                        ${property.price.toLocaleString()}
                        {property.priceType === "rent" ? "/month" : ""}
                    </p>

                    <div className="flex gap-4 text-gray-600 dark:text-gray-400 mb-6">
                        <span>{property.bedrooms} bed</span>
                        <span>{property.bathrooms} bath</span>
                        <span>{property.size} sqft</span>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-6">{property.description}</p>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold dark:text-white">Property Score</h3>
                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {property.score.overall}
                            </span>
                        </div>
                        <ScoreBar label="Price" value={property.score.price}/>
                        <ScoreBar label="Location" value={property.score.location}/>
                        <ScoreBar label="Size" value={property.score.size}/>
                        <ScoreBar label="Amenities" value={property.score.amenities}/>
                    </div>
                </div>
            </div>

            <div className="mt-10 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-4 dark:text-white">Price trend (6 months)</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={property.priceHistory}>
                        <XAxis dataKey="month"/>
                        <YAxis/>
                        <Tooltip/>
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#2563eb"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {similar.length > 0 && (
                <div className="mt-10">
                    <h3 className="font-semibold mb-4 dark:text-white">Similar Properties</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {similar.map((p) => (
                            <PropertyCard key={p.id} property={p}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PropertiesDetailsPage;