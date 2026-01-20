"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { getEnv } from "@/lib/config";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const appName = getEnv().NEXT_PUBLIC_APP_NAME;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary-600">{appName}</h1>
          </Link>
          <p className="mt-2 text-gray-600">Manage your tasks efficiently</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
