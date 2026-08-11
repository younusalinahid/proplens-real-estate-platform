import type {AreaStats, Property} from "../types/property.ts";

export function calculateAreaStats(properties: Property[]): AreaStats[] {
    const areas = Array.from(
        new Set(properties.map((p) => p.location.area)),
    );

    return areas.map((area) => {
        const areaProperties = properties.filter((p) => p.location.area === area);

        const totalRent = areaProperties
            .filter((p) => p.priceType === "rent")
            .reduce((sum, p) => sum + p.price, 0);
        const rentCount = areaProperties.filter(
            (p) => p.priceType === "rent",
        ).length;

        const averageRent = rentCount > 0 ? Math.round(totalRent / rentCount) : 0;

        const totalPricePerSqft = areaProperties.reduce(
            (sum, p) => sum + p.price / p.size,
            0,
        );
        const averagePricePerSqft = Math.round(
            totalPricePerSqft / areaProperties.length,
        );

        return {
            area,
            averageRent,
            averagePricePerSqft,
            availableCount: areaProperties.length,
            yoyChancePercent: Math.round((Math.random() * 12 - 2) * 10) / 10,
        }
    })
}