import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";

interface GenderFilterDropdownProps {
  genders: string[];
  selectedGenders: string[];
  onToggle: (gender: string) => void;
  onClear: () => void;
}

export function GenderFilterDropdown({
  genders,
  selectedGenders,
  onToggle,
  onClear,
}: GenderFilterDropdownProps) {
  // Sort genders: selected first, then alphabetically
  const sortedGenders = [...genders].sort((a, b) => {
    const aSelected = selectedGenders.includes(a);
    const bSelected = selectedGenders.includes(b);

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
      <DropdownMenuContent className="w-48" align="start">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Filter Gender</span>
          {selectedGenders.length > 0 && (
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
          {sortedGenders.map((gender) => (
            <DropdownMenuCheckboxItem
              key={gender}
              checked={selectedGenders.includes(gender)}
              onCheckedChange={() => onToggle(gender)}
              className="cursor-pointer"
            >
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-sb ${
                  gender === "Male"
                    ? "bg-[#BF1A2F]/10 text-[#BF1A2F]"
                    : "bg-[#2D7BB9]/10 text-[#2D7BB9]"
                }`}
              >
                {gender}
              </span>
            </DropdownMenuCheckboxItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
