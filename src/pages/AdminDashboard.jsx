import { useState } from "react";
import Navbar from "../components/Navbar";
import { MdOutlinePerson, MdOutlineAdminPanelSettings } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import CreateAdmin from "../components/CreateAdmin";
import CreateUser from "../components/CreateUser";
import AdminContainer from "./AdminContainer";

function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const [reloadFlag, setReloadFlag] = useState(false);
  const reloadUsers = () => setReloadFlag((prev) => !prev);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col w-full mt-10">
        <div className="flex flex-row justify-between p-5 px-10">
          <div className="gap-5 flex-row flex">
            {/* Button Create Admin */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="cursor-pointer hover:bg-[#0B63F3] p-3 w-60 flex flex-row justify-center items-center gap-3 shadow-md text-white font-bold bg-[#3B82F6] rounded-md">
              <div className="text-2xl">
                <MdOutlineAdminPanelSettings />
              </div>
              CREATE ADMIN
            </button>

            {/* Button Create User */}
            <button
              onClick={() => setIsUserModalOpen(true)}
              className="cursor-pointer hover:bg-[#FB7D19] p-3 w-60 shadow-md flex flex-row justify-center gap-3 items-center text-white font-bold bg-[#F4A261] rounded-md">
              <div className="text-2xl">
                <MdOutlinePerson />
              </div>
              CREATE USER
            </button>
          </div>

          {/* Filter + Search */}
          <div className="flex flex-row gap-2">
            <div className="relative w-35">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-3 bg-[#56acbd] cursor-pointer appearance-none rounded-4xl text-white w-35">
                <option value="">Sort By</option>
                <option value="username">Alphabet</option>
                <option value="role">Role</option>
                <option value="status">Status</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-3xl text-white pointer-events-none">
                <RiArrowDropDownLine />
              </div>
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="p-3 bg-[#56acbd] cursor-pointer rounded-4xl text-white w-35">
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-3 bg-[#56acbd] cursor-pointer rounded-4xl text-white w-35">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="bg-white p-3 inset-shadow-sm/40 rounded-4xl w-120"
            />
          </div>
        </div>

        {/* Table + Modals */}
        <div>
          <AdminContainer
            search={search}
            sortBy={sortBy}
            roleFilter={roleFilter}
            statusFilter={statusFilter}
            reloadFlag={reloadFlag} // 🔑 supaya re-fetch kalau flag berubah
          />

          {/* Modal Create Admin */}
          <CreateAdmin
            isOpen={isAdminModalOpen}
            onClose={() => setIsAdminModalOpen(false)}
            reloadUsers={reloadUsers}
          />

          {/* Modal Create User */}
          <CreateUser
            isOpen={isUserModalOpen}
            onClose={() => setIsUserModalOpen(false)}
            reloadUsers={reloadUsers}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
