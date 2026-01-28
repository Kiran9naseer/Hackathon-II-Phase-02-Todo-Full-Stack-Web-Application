// app/login/page.tsx
"use client";

import { LoginForm } from '@/components/forms/LoginForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800'
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
    }`}>
      <div className="absolute top-4 left-4">
        <Link href="/" className={`inline-flex items-center transition-colors group ${
          isDark
            ? 'text-slate-400 hover:text-white'
            : 'text-slate-600 hover:text-slate-900'
        }`}>
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 mb-2`}>
            TodoMaster
          </h1>
          <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Sign in to continue
          </p>
        </div>

        <div className={`rounded-2xl p-8 border backdrop-blur-lg transition-all duration-300 ${
          isDark
            ? 'bg-slate-900/80 border-slate-700 shadow-lg shadow-slate-900/50'
            : 'bg-white/80 border-slate-200 shadow-lg shadow-slate-100/50'
        }`}>
          <LoginForm />
        </div>

        <p className={`text-center mt-8 transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Don't have an account?{' '}
          <Link href="/register" className={`font-semibold transition-colors ${
            isDark
              ? 'text-primary-400 hover:text-primary-300'
              : 'text-primary-600 hover:text-primary-700'
          }`}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
