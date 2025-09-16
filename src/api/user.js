export const getUserApi = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard-user`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  const data = await res.json();
  console.log("getUserApi response:", data);
  return data.user;
};

export const updateUserApi = async (id, updates) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/dashboard-user/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updates),
    }
  );
  if (!res.ok) throw new Error("Failed to update user");
  const data = await res.json();
  return data.user;
};
