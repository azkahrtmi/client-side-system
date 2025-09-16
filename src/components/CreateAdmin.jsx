import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxReset } from "react-icons/rx";
import { createAdminApi } from "../api/admin";
import toast from "react-hot-toast";

const CreateAdmin = ({ isOpen, onClose, reloadUsers }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "admin", // default selalu admin
    status: "active", // default active
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm({
      username: "",
      email: "",
      password: "",
      role: "admin",
      status: "active",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAdminApi(form);
      toast.success("Admin created successfully");
      handleReset();
      reloadUsers(); // refresh tabel
      onClose();
    } catch (err) {
      console.error("Failed to create admin:", err);
      toast.error("Failed to create admin");
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={handleOutsideClick}>
      <div
        className="bg-white p-6 rounded-2xl shadow-lg w-[500px]"
        onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-center">CREATE ADMIN</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username..."
              type="text"
              className="p-3 border rounded-lg"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Email..."
              type="email"
              className="p-3 border rounded-lg"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password..."
              type="password"
              className="p-3 border rounded-lg"
              required
            />
          </div>

          {/* Status bisa tetap editable kalau mau */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="p-3 border rounded-lg">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-3 justify-end mt-4">
            <button
              type="button"
              onClick={handleReset}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
              <RxReset /> Reset
            </button>
            <button
              type="submit"
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">
              <FaCheck /> Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
