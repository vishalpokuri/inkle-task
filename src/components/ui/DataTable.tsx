import {
  flexRender,
  type Table as TableType,
  type ColumnDef,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DataTableProps<TData> {
  table: TableType<TData>;
  columns: ColumnDef<TData>[];
  renderHeaderExtras?: (headerId: string) => React.ReactNode;
}

export function DataTable<TData>({
  table,
  renderHeaderExtras,
}: DataTableProps<TData>) {
  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm">
      <table className="w-full border-collapse table-fixed">
        <thead className="bg-gray-50 border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-sm font-sb text-[#706A85] tracking-wide cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={
                    header.column.id !== "country" &&
                    header.column.id !== "gender"
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                  style={{ width: `${header.column.getSize()}px` }}
                >
                  <div className="flex items-center gap-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {renderHeaderExtras?.(header.column.id)}
                    {{
                      asc: <ChevronUp className="size-4" />,
                      desc: <ChevronDown className="size-4" />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-3 text-sm text-gray-900 font-reg overflow-hidden text-ellipsis"
                  style={{ width: `${cell.column.getSize()}px` }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
