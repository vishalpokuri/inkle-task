import { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { useUsers } from "@/contexts/UsersContext";
import { CountryFilterDropdown } from "@/components/ui/dropdowns/CountryFilterDropdown";
import { GenderFilterDropdown } from "@/components/ui/dropdowns/GenderFilterDropdown";
import { SearchBar } from "@/components/ui/SearchBar";
import { PageSizeSelector } from "@/components/ui/PageSizeSelector";
import { DataTable } from "@/components/ui/DataTable";
import { PaginationControls } from "@/components/ui/Pagination";
import { EditCustomerModal } from "@/components/ui/EditCustomerModal";
import { TableSkeleton } from "@/components/ui/TableSkeleton";
import { userTableColumns } from "@/lib/table-columns";
import type { NormalizedUserData } from "@/types/declaration";
import { RefreshCw } from "lucide-react";

function DContent() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<NormalizedUserData | null>(
    null
  );
  const { cleanedUsers, isLoading, refetchUsers } = useUsers();

  // Get unique countries
  const uniqueCountries = useMemo(() => {
    const countries = cleanedUsers.map((user) => user.country);
    return Array.from(new Set(countries)).sort();
  }, [cleanedUsers]);

  // Get unique genders
  const uniqueGenders = useMemo(() => {
    const genders = cleanedUsers.map((user) => user.gender);
    return Array.from(new Set(genders)).sort();
  }, [cleanedUsers]);

  // Handle edit user modal
  useEffect(() => {
    const handleEditUser = (event: Event) => {
      const customEvent = event as CustomEvent<NormalizedUserData>;
      setSelectedUser(customEvent.detail);
      setIsModalOpen(true);
    };

    window.addEventListener("editUser", handleEditUser);
    return () => window.removeEventListener("editUser", handleEditUser);
  }, []);

  // Handle country filter change
  const handleCountryToggle = (country: string) => {
    setSelectedCountries((prev) => {
      const newSelection = prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country];

      // Update table filter
      if (newSelection.length === 0) {
        setColumnFilters((filters) =>
          filters.filter((f) => f.id !== "country")
        );
      } else {
        setColumnFilters((filters) => {
          const otherFilters = filters.filter((f) => f.id !== "country");
          return [...otherFilters, { id: "country", value: newSelection }];
        });
      }

      return newSelection;
    });
  };

  const clearCountryFilter = () => {
    setSelectedCountries([]);
    setColumnFilters((filters) => filters.filter((f) => f.id !== "country"));
  };

  // Handle gender filter change
  const handleGenderToggle = (gender: string) => {
    setSelectedGenders((prev) => {
      const newSelection = prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender];

      // Update table filter
      if (newSelection.length === 0) {
        setColumnFilters((filters) => filters.filter((f) => f.id !== "gender"));
      } else {
        setColumnFilters((filters) => {
          const otherFilters = filters.filter((f) => f.id !== "gender");
          return [...otherFilters, { id: "gender", value: newSelection }];
        });
      }

      return newSelection;
    });
  };

  const clearGenderFilter = () => {
    setSelectedGenders([]);
    setColumnFilters((filters) => filters.filter((f) => f.id !== "gender"));
  };

  // Use memoized columns from lib
  const columns = useMemo(() => userTableColumns, []);

  const table = useReactTable({
    data: cleanedUsers,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="w-full p-6 font-reg">
      {/* Search Bar and Page Size Selector */}
      <div className="mb-6 flex items-center gap-4 flex-row justify-between">
        <div>
          <SearchBar
            value={globalFilter ?? ""}
            onChange={setGlobalFilter}
            onRefresh={refetchUsers}
          />
        </div>
        <div className="gap-4 flex ">
          {" "}
          <PageSizeSelector
            pageSize={table.getState().pagination.pageSize}
            onPageSizeChange={table.setPageSize}
          />
          <button
            onClick={refetchUsers}
            className="p-2 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
            title="Reload data"
          >
            <RefreshCw className="w-4 h-4 text-gray-600 group-hover:text-[#5622FF] transition-colors" />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        table={table}
        columns={columns}
        renderHeaderExtras={(headerId) => {
          if (headerId === "country") {
            return (
              <CountryFilterDropdown
                countries={uniqueCountries}
                selectedCountries={selectedCountries}
                onToggle={handleCountryToggle}
                onClear={clearCountryFilter}
              />
            );
          }
          if (headerId === "gender") {
            return (
              <GenderFilterDropdown
                genders={uniqueGenders}
                selectedGenders={selectedGenders}
                onToggle={handleGenderToggle}
                onClear={clearGenderFilter}
              />
            );
          }
          return null;
        }}
      />

      {/* Pagination Controls */}
      <PaginationControls
        currentPage={table.getState().pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        onFirstPage={() => table.setPageIndex(0)}
        onPreviousPage={() => table.previousPage()}
        onNextPage={() => table.nextPage()}
        onLastPage={() => table.setPageIndex(table.getPageCount() - 1)}
      />

      {/* Edit Customer Modal */}
      <EditCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        countries={uniqueCountries}
        onSave={async () => {
          // Refetch data to get updated values from server
          await refetchUsers();
        }}
      />
    </div>
  );
}

export default DContent;
