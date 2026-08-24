import type {Property} from "../types/property.ts";

export function getSimilarProperties(
    current: Property,
    allProperties: Property[],
    limit = 3,
): Property[] {
    return allProperties
        .filter((p) => p.id !== current.id)
        .map((p) => {
            const sameArea = p.location.area === current.location.area ? 1 : 0;
            const priceDiff = Math.abs(p.price - current.price) / current.price;
            const closeness = sameArea * 2 - priceDiff;
            return {property: p, closeness};
        })
        .sort((a, b) => b.closeness - a.closeness)
        .slice(0, limit)
        .map((entry) => entry.property);
}