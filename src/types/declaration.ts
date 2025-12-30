export interface Country {
  id: string;
  name: string;
}

// Main data interface with optional fields to handle inconsistencies
export interface UserData {
  id: string;
  createdAt: string;
  name: string;
  country: string;
  gender: string; // Note: inconsistent capitalization (Male/male, Female/female)
  requestDate: string; // Note: multiple formats (ISO, "Jun 16, 2025", "25-07-24", etc.)

  // Optional fields
  countryId?: string;
  entity?: string;
  tax?: number | string; // Can be number, empty string, or missing
  date?: string;
  normalizedCountry?: string | null;
}

// Stricter version with normalized types (for after data cleanup)
export interface NormalizedUserData {
  id: string;
  createdAt: string; // ISO 8601 date string
  name: string;
  country: string;
  gender: "Male" | "Female"; // Union of actual values
  requestDate: string | null; // Normalized to ISO or null
  countryId?: string;
  entity?: string;
  tax?: number; // Only number after cleanup
  date?: string; // ISO date string
  normalizedCountry?: string | null;
}
