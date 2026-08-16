import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import type { Property } from "../types/property";

interface PropertyMapProps {
    properties: Property[];
    selectedId?: string | null;
}

function FlyToSelected({ property }: { property: Property | undefined }) {
    const map = useMap();

    useEffect(() => {
        if (property) {
            map.flyTo([property.location.lat, property.location.lng], 15, {
                duration: 0.8,
            });
        }
    }, [property, map]);

    return null;
}

function PropertyMap({ properties, selectedId }: PropertyMapProps) {
    const center: [number, number] =
        properties.length > 0
            ? [properties[0].location.lat, properties[0].location.lng]
            : [23.7925, 90.4078];

    const selectedProperty = properties.find((p) => p.id === selectedId);

    return (
        <MapContainer
            center={center}
            zoom={12}
            style={{ height: "400px", width: "100%" }}
            className="rounded-lg"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <FlyToSelected property={selectedProperty} />
            {properties.map((property) => (
                <Marker
                    key={property.id}
                    position={[property.location.lat, property.location.lng]}
                >
                    <Popup>
                        <strong>{property.title}</strong>
                        <br />
                        ৳{property.price.toLocaleString()}
                        {property.priceType === "rent" ? "/month" : ""}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default PropertyMap;