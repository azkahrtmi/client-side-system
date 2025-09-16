import { IoPersonSharp } from "react-icons/io5";

import Navbar from "../components/Navbar";
import { useState } from "react";
// import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useUser from "../hooks/useUser";

function UserDashboard() {
  const { user, updateUser, loading } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "" });

  const handleSubmit = async () => {
    if (!formData.username && !formData.email) {
      toast.error("No changes made");
      return;
    }
    try {
      await updateUser(user.id, formData);
      toast.success("Profile updated!");
      setIsEditing(false);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Update failed");
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // baru masuk edit mode, sync dengan user
      setFormData({ username: user.username, email: user.email });
    } else {
      // keluar edit mode, reset
      setFormData({ username: "", email: "" });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data</p>;

  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      <div className="w-3/5 h-130 bg-white mt-10 shadow-xl p-2">
        <div className="ml-5 pt-8 pl-4">
          <h1 className=" flex items-center gap-4 font-medium text-4xl">
            <IoPersonSharp />
            Profile Information
          </h1>
          <h3 className=" text-[14px] mt-2 font-light opacity-50">
            Your registered profile information.
          </h3>
        </div>
        {/* isi */}
        <div className="flex flex-col gap-7 pt-8 px-10">
          <div className="flex justify-between">
            <span className="font-semibold text-2xl">Username:</span>
            <input
              value={formData.username || user.username}
              // placeholder={user.username}
              type="text"
              disabled={!isEditing}
              className={`text-2xl pl-4 rounded-md w-150 p-2 ${
                !isEditing
                  ? "bg-gray-200 shadow-xs shadow-gray-700"
                  : "bg-white inset-shadow-sm/50"
              }`}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-2xl">Email:</span>
            <input
              value={formData.email || user.email}
              // placeholder={user.email}
              type="text"
              disabled={!isEditing}
              className={`text-2xl pl-4 rounded-md w-150 p-2 ${
                !isEditing
                  ? "bg-gray-200 shadow-xs shadow-gray-700"
                  : "bg-white inset-shadow-sm/50"
              }`}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-2xl">Role:</span>
            <input
              placeholder={user.role}
              type="text"
              disabled
              className="text-2xl pl-4 rounded-md w-150 p-2 bg-gray-200 shadow-xs shadow-gray-700 "
            />
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-2xl">Status:</span>
            <input
              placeholder={user.status}
              type="text"
              disabled
              className="text-2xl pl-4 rounded-md w-150 p-2 bg-gray-200 shadow-xs shadow-gray-700 "
            />
          </div>
        </div>
        {/* button */}
        <div className="flex justify-between pt-5 px-10">
          <button
            className={`w-30 h-12 font-bold cursor-pointer rounded-[10px] shadow-sm shadow-black ${
              isEditing
                ? "bg-[#ff4a4a] text-white text-xl hover:bg-[#e40a1c] "
                : "bg-[#F5FB87] hover:bg-[#f2ff02] text-xl"
            }`}
            onClick={handleToggleEdit}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
          <button
            className={`w-30 h-12 font-bold  rounded-[10px]  ${
              isEditing
                ? "bg-[#06d6a0] hover:bg-[#06d6a0]/70 cursor-pointer shadow-xs text-white text-xl shadow-black"
                : "bg-gray-200 text-xl shadow-xs shadow-black"
            }`}
            disabled={!isEditing}
            onClick={handleSubmit}
            type="submit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
