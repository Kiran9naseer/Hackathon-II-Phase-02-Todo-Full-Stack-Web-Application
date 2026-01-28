// components/layout/PublicNavbar.tsx
"use client";

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const PublicNavbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 backdrop-blur-lg border-b transition-all duration-300 ${
      isDark
        ? 'bg-slate-900/80 border-slate-700'
        : 'bg-white/80 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-4">
        <Link href="/" className={`text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600`}>
          TodoMaster
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <Link
            href="/login"
            className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
              isDark
                ? 'text-slate-300 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="px-6 py-2.5 rounded-xl font-bold bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;