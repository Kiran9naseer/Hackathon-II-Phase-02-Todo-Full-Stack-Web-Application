// app/(protected)/layout.tsx
"use client";

import LoggedInNavbar from '@/components/layout/LoggedInNavbar';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${
      isDark
        ? 'bg-slate-900 text-slate-50'
        : 'bg-white text-slate-900'
    }`}>
      <LoggedInNavbar />
      <main className={`flex-grow p-4 md:p-8 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
        {children}
      </main>
    </div>
  );
}
