import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";

interface CountryFilterDropdownProps {
  countries: string[];
  selectedCountries: string[];
  onToggle: (country: string) => void;
  onClear: () => void;
}

export function CountryFilterDropdown({
  countries,
  selectedCountries,
  onToggle,
  onClear,
}: CountryFilterDropdownProps) {
  // Sort countries: selected first, then alphabetically
  const sortedCountries = [...countries].sort((a, b) => {
    const aSelected = selectedCountries.includes(a);
    const bSelected = selectedCountries.includes(b);

    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    return a.localeCompare(b);
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 w-7 inline-flex items-center justify-center rounded hover:bg-gray-200/80 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Filter className="h-4 w-4 text-gray-600 cursor-pointer" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Filter Countries</span>
          {selectedCountries.length > 0 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClear();
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all
            </button>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <div className="max-h-64 overflow-y-auto">
          {sortedCountries.map((country) => (
            <DropdownMenuCheckboxItem
              key={country}
              checked={selectedCountries.includes(country)}
              onCheckedChange={() => onToggle(country)}
              className="cursor-pointer"
            >
              {country}
            </DropdownMenuCheckboxItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
