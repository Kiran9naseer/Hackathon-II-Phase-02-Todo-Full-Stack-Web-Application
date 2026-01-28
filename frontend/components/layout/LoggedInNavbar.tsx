// components/layout/LoggedInNavbar.tsx
"use client";

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { LayoutDashboard, CheckSquare, User, LogOut, ChevronDown, Sun, Moon } from 'lucide-react';

const LoggedInNavbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-lg transition-all duration-300 ${
      isDark
        ? 'border-slate-700 bg-slate-900/80'
        : 'border-slate-200 bg-white/80'
    }`}>
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/tasks" className={`flex items-center gap-2 font-bold text-xl ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black transition-colors ${
              isDark
                ? 'bg-primary-600 text-white'
                : 'bg-primary-600 text-white'
            }`}>T</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">TodoMaster</span>
          </Link>
          <nav className={`hidden md:flex items-center gap-6 text-sm font-medium transition-colors ${
            isDark
              ? 'text-slate-400'
              : 'text-slate-600'
          }`}>
            <Link href="/dashboard" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>
              <LayoutDashboard className="w-4 h-4 mr-1 inline-block" />
              Dashboard
            </Link>
            <Link href="/tasks" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>
              <CheckSquare className="w-4 h-4 mr-1 inline-block" />
              Tasks
            </Link>
            <Link href="/calendar" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>
              <CheckSquare className="w-4 h-4 mr-1 inline-block" />
              Calendar
            </Link>
            <Link href="/profile" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>
              <User className="w-4 h-4 mr-1 inline-block" />
              Profile
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
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

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-2 rounded-full p-1 pr-2 text-sm font-medium transition-colors ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden md:inline text-xs truncate max-w-[80px]">{user?.name || 'User'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className={`absolute right-0 mt-2 w-56 origin-top-right rounded-xl shadow-lg ring-1 focus:outline-none transition-all ${
                isDark
                  ? 'bg-slate-800 ring-slate-700'
                  : 'bg-white ring-slate-200'
              }`}>
                <div className="py-1">
                  <div className={`px-4 py-2 text-sm border-b ${
                    isDark
                      ? 'text-slate-400 border-slate-700'
                      : 'text-slate-600 border-slate-200'
                  }`}>
                    <p className={`font-medium truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{user?.name}</p>
                    <p className="truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`w-full text-left flex items-center px-4 py-2 text-sm transition-colors ${
                      isDark
                        ? 'text-red-400 hover:bg-red-500/20'
                        : 'text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoggedInNavbar;
