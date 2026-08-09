import {useMemo} from "react";
import {useSearchParams} from "react-router-dom";
import propertiesData from "./../data/properties.json";
import type {FilterState, Property} from "./../types/property";
import FilterPanel from "./../components/FilterPanel";
import PropertyCard from "../components/PropertyCard.tsx";

const properties = propertiesData as Property[];

function filterProperties(items: Property[], filters: FilterState): Property[] {
    return items.filter((p) => {
        if (
            filters.search &&
            !p.title.toLowerCase().includes(filters.search.toLowerCase())
        )
            return false;
        if (filters.area && p.location.area !== filters.area) return false;
        if (filters.type && p.type !== filters.type) return false;
        if (filters.minBedrooms && p.bedrooms < filters.minBedrooms) return false;
        if (filters.minPrice && p.price < filters.minPrice) return false;
        if (filters.maxPrice && p.price > filters.maxPrice) return false;
        if (filters.minSize && p.size < filters.minSize) return false;
        return true;
    });
}

function DiscoveryPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters: FilterState = {
        search: searchParams.get("search") ?? undefined,
        area: searchParams.get("area") ?? undefined,
        type: (searchParams.get("type") as FilterState["type"]) ?? undefined,
        minBedrooms: searchParams.get("beds")
            ? Number(searchParams.get("beds"))
            : undefined,
        minPrice: searchParams.get("minPrice")
            ? Number(searchParams.get("minPrice"))
            : undefined,
        maxPrice: searchParams.get("maxPrice")
            ? Number(searchParams.get("maxPrice"))
            : undefined,
    };

    function handleFilterChange(next: FilterState) {
        const params = new URLSearchParams();
        if (next.search) params.set("search", next.search);
        if (next.area) params.set("area", next.area);
        if (next.type) params.set("type", next.type);
        if (next.minBedrooms) params.set("beds", String(next.minBedrooms));
        if (next.minPrice) params.set("minPrice", String(next.minPrice));
        if (next.maxPrice) params.set("maxPrice", String(next.maxPrice));
        setSearchParams(params);
    }

    const filtered = useMemo(
        () => filterProperties(properties, filters),
        [searchParams],
    );

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Find your next property</h1>

            <FilterPanel filters={filters} onChange={handleFilterChange}/>

            <p className="text-sm text-gray-500 mt-4 mb-3">
                {filtered.length} properties found
            </p>

            {filtered.length === 0 ? (
                <p className="text-gray-500 py-12 text-center">
                    No properties match your filters.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filtered.map((property) => (
                        <PropertyCard key={property.id} property={property}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DiscoveryPage;