import type {Property} from "../types/property.ts";
import propertiesData from "../data/properties.json"
import {calculateAreaStats} from "../utils/areaStats.ts";
import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const properties = propertiesData as Property[];

function InsightsPage() {
    const stats = calculateAreaStats(properties)

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Market Insights</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {stats.map((s) => (
                    <div
                        key={s.area}
                        className="border border-gray-200 rounded-lg p-4"
                    >
                        <h3 className="font-semibold mb-3">{s.area}</h3>
                        <p className="text-sm text-gray-500">Average rent</p>
                        <p className="text-xl font-bold text-blue-600 mb-2">
                            ${s.averageRent.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">Price / sqft</p>
                        <p className="font-semibold mb-2">${s.averagePricePerSqft}</p>
                        <div className="flex justify-between text-sm mt-2">
                            <span className={s.yoyChancePercent >= 0 ? "text-green-600" : "text-red-600"
                            }
                            >
                                {s.yoyChancePercent >= 0 ? "+" : ""}
                                {s.yoyChancePercent}% YoY
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-4">Average Price per sqft by area</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stats}>
                        <XAxis dataKey="area"/>
                        <YAxis/>
                        <Tooltip/>
                        <Bar dataKey="averagePricePerSqft" fill="#2563eb"/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )

}

export default InsightsPage;