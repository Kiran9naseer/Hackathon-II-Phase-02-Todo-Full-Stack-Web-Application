// frontend/lib/auth/client.ts
import axios from "axios";

// Create axios instance for auth API calls
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to requests if available in localStorage
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Better Auth client for authentication
import { createAuthClient } from "better-auth/client";

export { createAuthClient };
export const authClient = createAuthClient();
