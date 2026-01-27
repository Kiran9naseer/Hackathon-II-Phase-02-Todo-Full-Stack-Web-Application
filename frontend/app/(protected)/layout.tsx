// app/(protected)/layout.tsx
import LoggedInNavbar from '@/components/layout/LoggedInNavbar';
import React from 'react';

export const dynamic = 'force-dynamic';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <LoggedInNavbar />
      <main className="flex-grow p-8">
        {children}
      </main>
    </div>
  );
}
