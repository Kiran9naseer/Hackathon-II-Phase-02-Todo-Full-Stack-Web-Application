// frontend/lib/auth/client.ts
import axios from "axios";
import { getSession } from "next-auth/react";

// Create axios instance for general API calls (not directly for auth)
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth client for authentication using NextAuth.js
export const authClient = {
  getSession: async () => {
    try {
      const session = await getSession();
      if (session) {
        return { data: { session: session }, error: null };
      }
      return { data: { session: null }, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  },
  // signIn and signUp will be handled directly by NextAuth.js client functions
  // but useAuth expects a specific structure, so we need to adapt it.
  signIn: {
    email: async ({ email, password }: { email: string; password: string }) => {
      // This will trigger the CredentialsProvider in frontend/lib/auth/config.ts
      const res = await fetch("/api/auth/signin/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // NextAuth.js signIn doesn't return the session directly here,
        // it sets a cookie. The session is then available via getSession().
        // For the AuthProvider's immediate update, we'll need to refresh.
        // Or, more accurately, we trigger the login and then the AuthProvider will refresh.
        // This is a simplified adaptation.
        const session = await getSession();
        if (session) {
          return { data: { session: session }, error: null };
        }
      }
      return { data: null, error: new Error(data.error || "Login failed") };
    },
  },
  signUp: {
    email: async ({ email, password, name }: { email: string; password: string; name?: string }) => {
      // Assuming a direct call to your backend /register endpoint
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        // After successful registration, log them in or return the session
        // For simplicity, we'll try to get the session after register.
        const session = await getSession();
        if (session) {
          return { data: { session: session }, error: null };
        }
      }
      return { data: null, error: new Error(data.detail || "Registration failed") };
    },
  },
  signOut: async () => {
    await fetch("/api/auth/signout", { method: "POST" });
  },
};
