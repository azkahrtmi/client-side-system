// context/AuthProvider.jsx
import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { loginApi, logoutApi, signupApi } from "../api/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/profile`,
          {
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();
          setUser({
            id: data.id,
            username: data.username,
            email: data.email,
            role: data.role,
            status: data.status,
          });
        }
      } catch (err) {
        console.error("Profile fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const login = async (email, password) => {
    try {
      setAuthLoading(true);
      const userData = await loginApi(email, password);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (username, email, password) => {
    const userData = await signupApi(username, email, password);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  };

  const logout = async () => {
    try {
      await logoutApi(); // hapus cookie di backend
    } catch (err) {
      console.error("Logout API error:", err.message);
    }
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, loading, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
