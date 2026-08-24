import {useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";
import propertiesData from "./../data/properties.json";
import type {FilterState, Property} from "./../types/property";
import FilterPanel from "./../components/FilterPanel";
import PropertyCard from "../components/PropertyCard.tsx";
import PropertyMap from "../components/PropertyMap.tsx";

const properties = propertiesData as Property[];
const PAGE_SIZE = 8;

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
    const [selectedId, setSelectedId] = useState<string | null>(null);

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

    const currentPage = Number(searchParams.get("page") ?? "1");

    function handleFilterChange(next: FilterState) {
        const params = new URLSearchParams();
        if (next.search) params.set("search", next.search);
        if (next.area) params.set("area", next.area);
        if (next.type) params.set("type", next.type);
        if (next.minBedrooms) params.set("beds", String(next.minBedrooms));
        if (next.minPrice) params.set("minPrice", String(next.minPrice));
        if (next.maxPrice) params.set("maxPrice", String(next.maxPrice));
        // filter change hole page 1-e reset hobe
        setSearchParams(params);
    }

    function goToPage(page: number) {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(page));
        setSearchParams(params);
    }

    const filtered = useMemo(
        () => filterProperties(properties, filters),
        [searchParams],
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(currentPage, totalPages);
    const paginated = filtered.slice(
        (safePage - 1) * PAGE_SIZE,
        safePage * PAGE_SIZE,
    );

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Find your next property</h1>

            <FilterPanel filters={filters} onChange={handleFilterChange}/>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 mb-3">
                {filtered.length} properties found
            </p>

            {filtered.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 py-12 text-center">
                    No properties match your filters.
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {paginated.map((property) => (
                            <div
                                key={property.id}
                                onMouseEnter={() => setSelectedId(property.id)}
                            >
                                <PropertyCard property={property}/>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-6">
                            <button
                                onClick={() => goToPage(safePage - 1)}
                                disabled={safePage === 1}
                                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded disabled:opacity-40 dark:text-white"
                            >
                                Prev
                            </button>

                            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`px-3 py-1 text-sm rounded ${
                                        page === safePage
                                            ? "bg-blue-600 text-white"
                                            : "border border-gray-300 dark:border-gray-600 dark:text-white"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => goToPage(safePage + 1)}
                                disabled={safePage === totalPages}
                                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded disabled:opacity-40 dark:text-white"
                            >
                                Next
                            </button>
                        </div>
                    )}

                    <div className="mt-8">
                        <h2 className="font-semibold mb-3 dark:text-white">Map view</h2>
                        <PropertyMap properties={filtered} selectedId={selectedId}/>
                    </div>
                </>
            )}
        </div>
    );
}

export default DiscoveryPage;