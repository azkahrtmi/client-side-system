import { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { getUserApi, updateUserApi } from "../api/user";
import useAuth from "../hooks/useAuth";

export function UserProvider({ children }) {
  const { user: authUser } = useAuth(); // ambil user dari AuthProvider (id, role)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // kalau belum login, reset user
    if (!authUser) {
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const fetchedUser = await getUserApi();
        setUser(fetchedUser);
      } catch (err) {
        console.error("Fetch user failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [authUser]); // jalan tiap kali user login/logout

  // update user
  const updateUser = async (id, updates) => {
    try {
      const updatedUser = await updateUserApi(id, updates);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      console.error("Update user failed:", err);
      throw err;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
