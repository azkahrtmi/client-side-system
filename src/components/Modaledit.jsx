import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxReset } from "react-icons/rx";
import { updateUserByAdminApi } from "../api/admin";
import toast from "react-hot-toast";
// salah nama monter
const ModalEdit = ({ isOpen, onClose, user, reloadUsers }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    if (user) {
      setForm({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      await updateUserByAdminApi(user.id, form);
      toast.success("User updated successfully");
      onClose();
      if (reloadUsers) await reloadUsers();
    } catch (err) {
      toast.error(err.message || "Failed to update user");
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={(e) => e.target.id === "modal-overlay" && onClose()}>
      <div
        className="bg-white p-6 rounded-2xl shadow-lg"
        onClick={(e) => e.stopPropagation()}>
        <div className="p-2.5 w-[635px] h-[500px] text-center text-xl font-bold">
          EDIT CONTENT
          <div className="p-2 text-left grid items-center gap-2">
            Username
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              type="text"
              className="border-2 px-2 py-1"
            />
          </div>
          <div className="p-2 text-left grid items-center gap-2">
            Email
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              className="border-2 px-2 py-1"
            />
          </div>
          <div className="p-2 text-left grid items-center gap-2 mb-4">
            Role
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border-2 px-2 py-1 bg-white">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="p-2 text-left grid items-center gap-2 mb-4">
            Status
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border-2 px-2 py-1 bg-white">
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 pl-4">
          <button
            type="button"
            onClick={handleReset}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-red-300 hover:bg-red-400 rounded">
            <RxReset /> Reset
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-yellow-300 hover:bg-yellow-400 rounded">
            <FaCheck /> Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
