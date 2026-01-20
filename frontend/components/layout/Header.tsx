"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth/hooks";
import { useSession } from "@/lib/auth/provider";
import { Button } from "@/components/ui/Button";
import { getEnv } from "@/lib/config";

export function Header() {
  const router = useRouter();
  const { session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const appName = getEnv().NEXT_PUBLIC_APP_NAME;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary-600">{appName}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 hidden sm:block">
              {session?.user?.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              disabled={isLoading}
            >
              {isLoading ? "Signing out..." : "Sign out"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
