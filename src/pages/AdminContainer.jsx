import React, { useEffect, useState } from "react";
import { fetchAllUsersApi, deleteUserApi } from "../api/admin";
import AdminTable from "../components/AdminTable";
import ModalEdit from "../components/ModalEdit";
import ConfirmDeleteModal from "../components/ModalDelete";
import toast from "react-hot-toast";
import SkeletonTable from "../components/SkeletonTable";

function AdminContainer({
  search,
  sortBy,
  roleFilter,
  statusFilter,
  reloadFlag,
}) {
  console.log("🔄 AdminContainer render");
  const [users, setUsers] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const loadUsers = async () => {
    console.log("▶️ loadUsers dipanggil");
    setDataLoading(true);
    try {
      const data = await fetchAllUsersApi();
      console.log("✅ fetchAllUsersApi result:", data);
      // Filtering
      let filtered = data.filter((u) => {
        const matchSearch =
          u.username.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase());
        const matchRole = roleFilter
          ? u.role.toLowerCase() === roleFilter.toLowerCase()
          : true;
        const matchStatus = statusFilter
          ? u.status.toLowerCase() === statusFilter.toLowerCase()
          : true;
        return matchSearch && matchRole && matchStatus;
      });

      // Sorting
      if (sortBy === "username")
        filtered.sort((a, b) => a.username.localeCompare(b.username));
      if (sortBy === "role")
        filtered.sort((a, b) => a.role.localeCompare(b.role));
      if (sortBy === "status")
        filtered.sort((a, b) => a.status.localeCompare(b.status));

      setUsers(filtered);
    } catch (error) {
      console.error("Gagal ambil data users", error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    console.log("📡 useEffect jalan, panggil loadUsers");
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortBy, roleFilter, statusFilter, reloadFlag]);

  // modal handlers
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUserApi(userToDelete.id);
      toast.success(`User "${userToDelete.username}" deleted successfully`);
      setIsDeleteOpen(false);
      setUserToDelete(null);
      await loadUsers(); // refetch setelah delete
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error(err.message); // pesan custom dari server
    }
  };

  return (
    <>
      {dataLoading ? (
        <SkeletonTable rows={5} /> // bikin komponen skeleton table
      ) : (
        <AdminTable
          users={users}
          currentPage={currentPage}
          totalPages={Math.ceil(users.length / 5)}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Modals */}
      <ModalEdit
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        reloadUsers={loadUsers}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setUserToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        user={userToDelete}
      />
    </>
  );
}

export default AdminContainer;
