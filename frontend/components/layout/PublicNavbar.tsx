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
    <nav className="relative md:sticky md:top-0 w-full z-50 backdrop-blur-xl border-b border-primary-500/10 bg-surface-dark/90 px-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 md:py-6">
        <Link href="/" className="group flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center shadow-mist group-hover:shadow-mist-premium transition-all duration-500">
            <span className="text-white font-black text-xl italic">T</span>
          </div>
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-100 tracking-tighter italic">
            TodoMaster
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-8">
          <Link
            href="/login"
            className="hidden sm:block text-slate-400 hover:text-primary-400 font-bold transition-all duration-300 text-sm uppercase tracking-widest px-4 py-2"
          >
            Entry
          </Link>

          <Link
            href="/register"
            className="premium-button bg-primary-500 hover:bg-primary-400 text-white !py-3 !px-8 text-[10px]"
          >
            Initialize Account
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;