"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import { getAuthToken } from "@/lib/auth/config";

/**
 * User interface from JWT token payload
 */
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

/**
 * Session interface representing authenticated state
 */
export interface Session {
  user: AuthUser;
  token: string;
  expiresAt?: number;
}

/**
 * Auth context type definition
 */
interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component that wraps the application
 * and provides authentication state and methods.
 *
 * Features:
 * - Automatic session restoration on mount
 * - Session persistence across page navigations
 * - Protected route handling
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Refresh session from server
  const refreshSession = useCallback(async () => {
    try {
      const { data, error } = await authClient.getSession();
      if (error) {
        console.error("Session refresh error:", error);
        setUser(null);
        return;
      }

      if (data?.session) {
        setUser(data.session.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to refresh session:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check session on mount
  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  // Login function
  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const { data, error } = await authClient.signIn.email({
          email,
          password,
        });

        if (error) {
          throw new Error(error.message || "Login failed");
        }

        if (data?.session) {
          setUser(data.session.user);
        }

        // Get the redirect parameter or default to /tasks
        const params = new URLSearchParams(window.location.search);
        const redirectTo = params.get("redirect") || "/tasks";
        router.push(redirectTo);
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  // Register function
  const register = useCallback(
    async (email: string, password: string, name?: string) => {
      setIsLoading(true);
      try {
        const { data, error } = await authClient.signUp.email({
          email,
          password,
          name,
        });

        if (error) {
          throw new Error(error.message || "Registration failed");
        }

        if (data?.session) {
          setUser(data.session.user);
        }

        router.push("/tasks");
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  // Logout function
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authClient.signOut();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local state even if server call fails
      setUser(null);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access authentication state and methods.
 * Must be used within an AuthProvider.
 *
 * @throws Error if used outside AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/**
 * Hook to get only the current user.
 * Convenience wrapper around useAuth.
 */
export function useUser(): AuthUser | null {
  const { user } = useAuth();
  return user;
}

/**
 * Hook to check if user is authenticated.
 * Convenience wrapper around useAuth.
 */
export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

/**
 * Hook to get loading state.
 * Convenience wrapper around useAuth.
 */
export function useAuthLoading(): boolean {
  const { isLoading } = useAuth();
  return isLoading;
}
