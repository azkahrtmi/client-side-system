import { useState } from "react";
import { createUserApi } from "../api/admin";
import toast from "react-hot-toast";

function CreateUser({ isOpen, onClose, reloadUsers }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "", // 🔑 tambahin password
    role: "user",
    status: "active",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserApi(form);
      toast.success("User created successfully");
      reloadUsers();
      onClose();
      setForm({
        username: "",
        email: "",
        password: "",
        role: "user",
        status: "active",
      });
    } catch (err) {
      console.error("Create user failed:", err);
      toast.error("Failed to create user");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create User</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="p-2 border rounded"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="p-2 border rounded"
            required
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className="p-2 border rounded"
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="p-2 border rounded">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
