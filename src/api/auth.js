// logiApi
export const loginApi = async (email, password) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // penting supaya cookie HttpOnly tersimpan di browser
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  const data = await res.json();
  return data.user; // backend sudah return { user: {...} }
};

// logoutApi
export const logoutApi = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Logout failed");
};

// register
export const signupApi = async (username, email, password) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Signup failed");
  }

  const data = await res.json();
  return data.user; // backend return { user: ... }
};

export const fetchAllUsers = async () => {
  return [
    {
      email: "suga@mail.com",
      username: "sugay",
      role: "admin",
      status: "inactive",
    },
    {
      email: "afdhalganteng@mail.com",
      username: "budi",
      role: "user",
      status: "active",
    },
    {
      email: "rajaganteng@mail.com",
      username: "rajaganteng",
      role: "admin",
      status: "inactive",
    },
    {
      email: "rezaganteng@mail.com",
      username: "budi",
      role: "user",
      status: "active",
    },
    {
      email: "azkaganteng@mail.com",
      username: "azka",
      role: "admin",
      status: "inactive",
    },
    {
      email: "user@mail.com",
      username: "budi",
      role: "user",
      status: "active",
    },
    {
      email: "user@mail.com",
      username: "budi",
      role: "user",
      status: "active",
    },
    {
      email: "user@mail.com",
      username: "budi",
      role: "user",
      status: "active",
    },
    {
      email: "user@mail.com",
      username: "budi",
      role: "user",
      status: "active",
    },
    {
      email: "user@mail.com",
      username: "budi",
      role: "user",
      status: "active",
    },
    {
      email: "user@mail.com",
      username: "budi",
      role: "user",
      status: "active",
    },
    {
      email: "user@mail.com",
      username: "budi",
      role: "user",
      status: "active",
    },
  ];
};
