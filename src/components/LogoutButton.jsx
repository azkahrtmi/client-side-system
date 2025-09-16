import React from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  }
  return (
    <div>
      <button
        onClick={handleLogout}
        className="bg-[#FF4A4A] hover:bg-[#E62727] flex flex-row justify-center items-center gap-2 p-3 px-4 rounded-lg cursor-pointer"
      >
        <MdOutlineLogout />
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;
