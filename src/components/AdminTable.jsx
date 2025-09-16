import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEdit, MdChevronLeft, MdChevronRight } from "react-icons/md";

function AdminTable({
  users,
  currentPage,
  totalPages,
  onEdit,
  onDelete,
  onPageChange,
}) {
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);
  const emptyRows = itemsPerPage - currentUsers.length;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    let startRange = Math.max(2, currentPage - 2);
    let endRange = Math.min(totalPages - 1, currentPage + 2);
    if (currentPage <= 4) endRange = Math.min(6, totalPages - 1);
    if (currentPage >= totalPages - 3) startRange = Math.max(2, totalPages - 5);
    if (startRange > 2) pages.push("...");
    for (let i = startRange; i <= endRange; i++) {
      if (i > 1 && i < totalPages) pages.push(i);
    }
    if (endRange < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

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
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50">
                <td className="px-6 py-4 h-16 text-sm font-medium text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 h-16 text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <div
                    className={`p-2 w-20 text-center rounded-full text-xs font-semibold ${
                      user.role.toLowerCase() === "admin"
                        ? "bg-[#3b82f6] text-white"
                        : "bg-[#f4a261] text-white"
                    }`}>
                    {user.role}
                  </div>
                </td>
                <td className="px-6 py-4 h-16">
                  <div
                    className={`p-2 w-20 text-center rounded-full text-xs font-semibold ${
                      user.status.toLowerCase() === "active"
                        ? "bg-[#06D6A0] text-white"
                        : "bg-[#e63946] text-white"
                    }`}>
                    {user.status}
                  </div>
                </td>
                <td className="px-6 py-4 h-16 flex gap-2 justify-center">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 bg-yellow-200 cursor-pointer hover:bg-yellow-400 rounded transition-colors">
                    <MdOutlineEdit />
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="p-2 bg-red-400 cursor-pointer hover:bg-red-600 text-white rounded transition-colors">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}

            {[...Array(emptyRows)].map((_, i) => (
              <tr
                key={`empty-${i}`}
                className="hover:bg-gray-50">
                <td
                  colSpan={5}
                  className="px-6 py-4 h-16"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center px-4 py-3 bg-gray-100 border-t border-gray-200">
        <nav
          className="relative z-0 inline-flex items-center space-x-2"
          aria-label="Pagination">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 text-gray-600 hover:text-black disabled:text-gray-400 disabled:cursor-not-allowed">
            <MdChevronLeft className="h-5 w-5" />
          </button>
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="px-2 text-gray-500">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page)}
                  className={`px-2 text-sm font-medium ${
                    currentPage === page
                      ? "text-black font-bold"
                      : "text-gray-500 hover:text-black"
                  }`}>
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 text-gray-600 hover:text-black disabled:text-gray-400 disabled:cursor-not-allowed">
            <MdChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  );
}

export default AdminTable;
