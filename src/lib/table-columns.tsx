import type { ColumnDef } from "@tanstack/react-table";
import type { NormalizedUserData } from "@/types/declaration";
import { Pencil } from "lucide-react";

export const userTableColumns: ColumnDef<NormalizedUserData>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (info) => info.getValue(),
    size: 60,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => {
      const value = info.getValue() as string;
      return <span className="text-[#5622FF]">{value}</span>;
    },
    size: 200,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: (info) => info.getValue(),
    filterFn: (row, id, value) => {
      if (!value || value.length === 0) return true;
      return value.includes(row.getValue(id));
    },
    size: 180,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: (info) => {
      const value = info.getValue() as string;
      return (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-sb ${
            value === "Male"
              ? "bg-[#BF1A2F]/10 text-[#BF1A2F]"
              : "bg-[#2D7BB9]/10 text-[#2D7BB9]"
          }`}
        >
          {value}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      if (!value || value.length === 0) return true;
      return value.includes(row.getValue(id));
    },
    size: 80,
  },
  {
    accessorKey: "entity",
    header: "Entity",
    cell: (info) => info.getValue() || "-",
    size: 150,
  },
  {
    accessorKey: "tax",
    header: "Tax",
    cell: (info) => {
      const value = info.getValue() as number | undefined;
      return value !== undefined ? value.toLocaleString() : "-";
    },
    size: 80,
  },
  {
    accessorKey: "requestDate",
    header: "Request Date",
    cell: (info) => {
      const value = info.getValue() as string | null;
      if (!value) return "-";
      return new Date(value).toLocaleDateString();
    },
    size: 140,
  },
  {
    id: "edit",
    header: "Edit",
    cell: ({ row }) => (
      <button
        onClick={() => {
          // This will be handled by parent component
          const event = new CustomEvent("editUser", { detail: row.original });
          window.dispatchEvent(event);
        }}
        className="inline-flex items-center justify-center h-8 w-8 rounded hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <Pencil className="h-4 w-4 text-gray-600" />
      </button>
    ),
    size: 80,
    enableSorting: false,
  },
];
