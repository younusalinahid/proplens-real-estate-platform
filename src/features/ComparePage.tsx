import type {Property} from "../types/property.ts";
import propertiesData from "../data/properties.json"
import {useCompareStore} from "../store/compareStore.ts";
import {Link} from "react-router-dom";

const properties = propertiesData as Property[];

function ComparePage() {
    const selectedIds = useCompareStore((state) => state.selectedIds);
    const clearCompare = useCompareStore((state) => state.clearCompare);

    const selected = properties.filter((p) => selectedIds.includes(p.id));

    if (selected.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center py-16">
                <p className="text-gray-500 mb-4">
                    No properties selected yet. Go to Properties and add up to 3 to compare.
                </p>
                <Link to="/properties" className="text-blue-600 font-medium">
                    Browse Properties
                </Link>
            </div>
        );
    }

    const rows: { label: string; getValue: (p: Property) => string | number }[] = [
        {label: "Price", getValue: (p) => `৳${p.price.toLocaleString()}`},
        {label: "Area", getValue: (p) => p.location.area},
        {label: "Size", getValue: (p) => `${p.size} sqft`},
        {label: "Bedrooms", getValue: (p) => p.bedrooms},
        {label: "Bathrooms", getValue: (p) => p.bathrooms},
        {label: "Score", getValue: (p) => p.score.overall},
    ];

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Compare Properties</h1>
                <button onClick={clearCompare}
                        className="text-sm text-red-600 font-medium"
                >
                    Clear all
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                    <tr>
                        <th className="text-left p-3 border-b border-gray-200"></th>
                        {selected.map((p) => (
                            <th key={p.id} className="text-left p-3 border-b border-gray-200">
                                <img
                                    src={p.images[0]}
                                    alt={p.title}
                                    className="w-full h-50 object-cover rounded mb-2"
                                />
                                <span className="font-medium">{p.title}</span>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row) => (
                        <tr key={row.label}>
                            <td className="p-3 border-b border-gray-100 text-gray-500 font-medium">
                                {row.label}
                            </td>
                            {selected.map((p) => (
                                <td key={p.id} className="p-3 border-b border-gray-100">
                                    {row.getValue(p)}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ComparePage;