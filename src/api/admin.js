export const fetchAllUsersApi = async () => {
  console.log("🚀 fetchAllUsersApi mulai...");

  const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard-admin`, {
    credentials: "include",
  });
  console.log("📥 response status:", res.status);
  if (!res.ok) throw new Error("Failed to fetch users");
  const data = await res.json();
  console.log("📦 response JSON:", data);
  return data.users;
};

export const updateUserByAdminApi = async (id, updates) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/dashboard-admin/${id}`,
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

export const createAdminApi = async (payload) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/dashboard-admin/create-admin`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) throw new Error("Failed to create admin");
  const data = await res.json();
  return data.user;
};

export const createUserApi = async (payload) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/dashboard-admin/create-user`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) throw new Error("Failed to create user");
  const data = await res.json();
  return data.user;
};

export const deleteUserApi = async (id) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/dashboard-admin/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await res.json().catch(() => ({})); // kalau bukan JSON amanin

  if (!res.ok) {
    // lempar error dengan pesan dari server kalau ada
    throw new Error(data.message || "Failed to delete user");
  }

  return data.user;
};
