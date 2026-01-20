"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { getSession } from "./hooks";

interface Session {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  token: string;
}

interface SessionContextType {
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    setIsLoading(true);
    try {
      console.log("Checking session...");
      const data = await getSession();
      console.log("Session data received:", data);
      setSession(data || null);
    } catch (error) {
      console.error("Failed to get session:", error);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        isLoading,
        isAuthenticated: !!session,
        refreshSession: checkSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  return context;
}
