export type PropertyType = "Apartment" | "House" | "Villa";
export type PriceType = "sale" | "rent";

export interface Location {
    area: string;
    city: string;
    lat: number;
    lng: number;
}

export interface PriceHistoryPoint {
    month: string;
    price: number;
}

export interface PropertyScore {
    overall: number;
    price: number;
    location: number;
    size: number;
    amenities: number;
}

export interface Property {
    id: string;
    title: string;
    description: string;

    type: PropertyType;
    price: number;
    priceType: PriceType;

    location: Location;

    size: number;
    bedrooms: number;
    bathrooms: number;

    images: string[];
    amenities: string[];

    rating: number;

    priceHistory: PriceHistoryPoint[];
    score: PropertyScore;
}

export interface FilterState {
    search?: string;
    area?: string;
    type?: PropertyType;
    priceType?: PriceType;
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    minSize?: number;
}

export interface AreaStats {
    area: string;
    averageRent: number;
    averagePricePerSqft: number;
    availableCount: number;
    yoyChancePercent: number;
}
