import { userTableColumns } from "@/lib/table-columns";

export function TableSkeleton() {
  return (
    <div className="w-full p-6 font-reg animate-pulse">
      {/* Search Bar and Page Size Skeleton */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1 h-10 bg-gray-200 rounded-md"></div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-12 bg-gray-200 rounded"></div>
          <div className="h-9 w-[70px] bg-gray-200 rounded-md"></div>
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Table Skeleton - Using actual table structure */}
      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <table className="w-full border-collapse table-fixed">
          {/* Table Header */}
          <thead className="bg-gray-50 border-b">
            <tr>
              {userTableColumns.map((column, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left"
                  style={{ width: `${column.size}px` }}
                >
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(10)].map((_, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {userTableColumns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-3 text-sm"
                    style={{ width: `${column.size}px` }}
                  >
                    {/* Special styling for gender column (badge) */}
                    {"accessorKey" in column &&
                    column.accessorKey === "gender" ? (
                      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    ) : (
                      <div
                        className="h-4 bg-gray-200 rounded"
                        style={{
                          width: `${Math.floor(Math.random() * 30 + 60)}%`,
                        }}
                      ></div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          <div className="h-9 w-12 bg-gray-200 rounded"></div>
          <div className="h-9 w-12 bg-gray-200 rounded"></div>
          <div className="h-9 w-12 bg-gray-200 rounded"></div>
          <div className="h-9 w-12 bg-gray-200 rounded"></div>
        </div>
        <div className="h-5 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
