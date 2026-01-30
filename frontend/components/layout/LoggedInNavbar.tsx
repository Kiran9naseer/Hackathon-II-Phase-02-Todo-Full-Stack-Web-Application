// components/layout/LoggedInNavbar.tsx
"use client";

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { LayoutDashboard, CheckSquare, User, LogOut, ChevronDown, Sun, Moon, Menu, X, Calendar } from 'lucide-react';

const LoggedInNavbar = () => {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (!mounted || isLoading) {
    return null;
  }

  const isDark = theme === 'dark';

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/calendar", label: "Calendar", icon: Calendar },
  ];

  return (
    <header className={`relative md:sticky md:top-0 z-40 w-full border-b backdrop-blur-lg transition-all duration-300 ${isDark
        ? 'border-slate-800 bg-slate-950/80'
        : 'border-slate-200 bg-white/80'
      }`}>
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 -ml-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <Link href="/tasks" className={`flex items-center gap-2 font-bold text-xl ${isDark ? 'text-white' : 'text-slate-900'
            }`}>
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black transition-all shadow-lg shadow-indigo-500/20 ${isDark
              ? 'bg-gradient-to-br from-indigo-500 to-indigo-700 text-white'
              : 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white'
              }`}>T</span>
            <span className="hidden sm:inline-block bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">TodoMaster</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 group ${isActive
                    ? (isDark ? 'bg-indigo-500/10 text-indigo-400 font-semibold' : 'bg-indigo-50 text-indigo-600 font-semibold')
                    : (isDark ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50')
                    }`}
                >
                  <item.icon className={`w-4 h-4 mr-2 transition-opacity ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-2 rounded-lg transition-all duration-200 ${isDark
              ? 'bg-slate-900 hover:bg-slate-800 text-yellow-400 ring-1 ring-slate-800'
              : 'bg-white hover:bg-slate-50 text-slate-600 ring-1 ring-slate-200 shadow-sm'
              }`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-3 rounded-full p-1 pl-1 pr-1 md:pr-4 transition-all duration-200 outline-none focus:ring-2 focus:ring-indigo-500/20 ${isDark
                ? 'hover:bg-slate-800 text-white'
                : 'hover:bg-slate-50 text-slate-900'
                }`}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20 ring-2 ring-white dark:ring-slate-950">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden md:flex flex-col items-start px-2">
                <span className="text-xs font-bold leading-none">{user?.name || 'User'}</span>
                <span className="text-[10px] opacity-60 leading-none mt-1">Pro Plan</span>
              </div>
              <ChevronDown className={`w-3 h-3 transition-transform opacity-50 hidden md:block ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className={`absolute right-0 mt-4 w-64 origin-top-right rounded-2xl shadow-xl ring-1 focus:outline-none transition-all animate-in fade-in slide-in-from-top-2 duration-200 z-50 ${isDark
                ? 'bg-slate-900/95 ring-slate-800 backdrop-blur-xl'
                : 'bg-white/95 ring-slate-200 backdrop-blur-xl'
                }`}>
                <div className="p-2">
                  <div className={`p-4 rounded-xl mb-2 ${isDark
                    ? 'bg-slate-800/50'
                    : 'bg-slate-50'
                    }`}>
                    <p className={`font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{user?.name}</p>
                    <p className="truncate text-xs text-slate-500">{user?.email}</p>
                  </div>

                  <Link href="/profile" className={`flex items-center px-4 py-2.5 text-sm rounded-lg transition-colors mb-1 ${isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}>
                    <User className="w-4 h-4 mr-3" />
                    Profile Settings
                  </Link>

                  <div className={`h-px my-2 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}></div>

                  <button
                    onClick={handleLogout}
                    className={`w-full text-left flex items-center px-4 py-2.5 text-sm rounded-lg transition-colors ${isDark
                      ? 'text-red-400 hover:bg-red-500/10'
                      : 'text-red-600 hover:bg-red-50'
                      }`}
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-4 duration-300 border-t border-slate-200 dark:border-slate-800">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center p-4 rounded-xl transition-all ${isActive
                    ? (isDark ? 'bg-indigo-500/10 text-indigo-400 font-bold' : 'bg-indigo-50 text-indigo-600 font-bold')
                    : (isDark ? 'text-slate-400 hover:bg-slate-900 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')
                    }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}

            <div className={`h-px my-4 ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}></div>

            <div className="flex items-center p-4">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-3">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className={`w-full flex items-center p-4 rounded-xl transition-colors font-medium ${isDark
                ? 'text-red-400 hover:bg-red-500/10'
                : 'text-red-600 hover:bg-red-50'
                }`}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default LoggedInNavbar;
