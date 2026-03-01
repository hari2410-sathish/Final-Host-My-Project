import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ IMPORTANT
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Auto attach token
API.interceptors.request.use((config) => {
  const url = config.url || "";

  // ===============================
  // ADMIN ROUTES → ADMIN TOKEN
  // ===============================
  if (url.startsWith("/admin")) {
    const adminToken = localStorage.getItem("ADMIN_TOKEN");
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    return config;
  }

  // ===============================
  // USER ROUTES → USER TOKEN
  // ===============================
  if (
    url.startsWith("/auth/user") ||
    url.startsWith("/payments") ||
    url.startsWith("/courses") ||
    url.startsWith("/api/notifications")
  ) {
    const userToken = localStorage.getItem("USER_TOKEN");
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
  }

  return config;
});

export default API;
