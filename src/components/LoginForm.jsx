import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";
import SpinnerButton from "./SpinnerButton";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, authLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(email, password);
      toast.success("Login successful!");

      if (userData.role === "admin") {
        navigate("/dashboard-admin");
      } else {
        navigate("/dashboard-user");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-10">
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 rounded-3xl bg-white inset-shadow-sm/30 w-100"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 rounded-3xl bg-white inset-shadow-sm/30 w-100"
      />
      <button
        disabled={authLoading}
        type="submit"
        className="bg-gradient-to-b from-[#7191E6] to-[#3D52A1]
       hover:from-[#365CC1] hover:to-[#071C6D]
       text-white p-2 rounded-md cursor-pointer font-bold">
        {authLoading ? <SpinnerButton /> : "Login"}
      </button>
    </form>
  );
}
