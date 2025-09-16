import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(username, email, password);
      toast.success("Signup successful!");
      navigate("/"); // langsung ke /
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-10">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 rounded-3xl bg-white inset-shadow-sm/30 w-100"
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        type="submit"
        className="bg-gradient-to-b from-[#7191E6] to-[#3D52A1]
       hover:from-[#365CC1] hover:to-[#071C6D]
       text-white p-2 rounded-md cursor-pointer font-bold">
        Register
      </button>
    </form>
  );
}
