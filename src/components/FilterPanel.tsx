import type {FilterState, PropertyType} from "../types/property";

interface FilterPanelProps {
    filters: FilterState;
    onChange: (filters: FilterState) => void;
}

const AREAS = ["Gulshan", "Banani", "Dhanmondi", "Uttara", "Mirpur"];
const TYPES: PropertyType[] = ["Apartment", "House", "Villa"];

function FilterPanel({filters, onChange}: FilterPanelProps) {
    function update(partial: Partial<FilterState>) {
        onChange({...filters, ...partial});
    }

    return (
        <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <input
                type="text"
                placeholder="Search by title..."
                className="border rounded px-3 py-2 text-sm flex-1 min-w-[180px]"
                value={filters.search ?? ""}
                onChange={(e) => update({search: e.target.value || undefined})}
            />

            <select
                className="border rounded px-3 py-2 text-sm"
                value={filters.area ?? ""}
                onChange={(e) => update({area: e.target.value || undefined})}
            >
                <option value="">All areas</option>
                {AREAS.map((area) => (
                    <option key={area} value={area}>
                        {area}
                    </option>
                ))}
            </select>

            <select
                className="border rounded px-3 py-2 text-sm"
                value={filters.type ?? ""}
                onChange={(e) =>
                    update({type: (e.target.value as PropertyType) || undefined})
                }
            >
                <option value="">All types</option>
                {TYPES.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            <select
                className="border rounded px-3 py-2 text-sm"
                value={filters.minBedrooms ?? ""}
                onChange={(e) =>
                    update({
                        minBedrooms: e.target.value ? Number(e.target.value) : undefined,
                    })
                }
            >
                <option value="">Any beds</option>
                {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                        {n}+ beds
                    </option>
                ))}
            </select>

            <input
                type="number"
                placeholder="Min price"
                className="border rounded px-3 py-2 text-sm w-28"
                value={filters.minPrice ?? ""}
                onChange={(e) =>
                    update({
                        minPrice: e.target.value ? Number(e.target.value) : undefined,
                    })
                }
            />

            <input
                type="number"
                placeholder="Max price"
                className="border rounded px-3 py-2 text-sm w-28"
                value={filters.maxPrice ?? ""}
                onChange={(e) =>
                    update({
                        maxPrice: e.target.value ? Number(e.target.value) : undefined,
                    })
                }
            />
        </div>
    );
}

export default FilterPanel;