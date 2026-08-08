import type { Property } from "./types/property.ts";
import propertiesData from "./data/properties.json";

const properties = propertiesData as Property[];
console.log(properties.length);