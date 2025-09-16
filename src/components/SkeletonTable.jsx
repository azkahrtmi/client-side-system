import React from "react";

function SkeletonTable({ rows = 5 }) {
  return (
    <div className="min-w-full max-w-6xl mx-auto">
      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full border table-fixed border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 w-50 text-left text-sm font-bold text-black">
                Username
              </th>
              <th className="px-6 py-3 w-100 text-left text-sm font-bold text-black">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-black">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-black">
                Status
              </th>
              <th className="px-6 py-3 text-center text-sm font-bold text-black"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[...Array(rows)].map((_, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50">
                <td className="px-6 py-4 h-16">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-6 py-4 h-16">
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-6 py-4 h-16">
                  <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                </td>
                <td className="px-6 py-4 h-16">
                  <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                </td>
                <td className="px-6 py-4 h-16 flex gap-2 justify-center">
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-center px-4 py-3 bg-gray-100 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-5 w-6 bg-gray-200 rounded animate-pulse"></div>
          ))}
          <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonTable;
