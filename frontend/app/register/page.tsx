// app/register/page.tsx
"use client";

import { RegisterForm } from '@/components/forms/RegisterForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function RegisterPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-300 ${isDark
        ? 'bg-gradient-to-br from-surface-dark via-surface-dark to-surface-dark_variant'
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
      }`}>
      <div className="absolute top-4 left-4">
        <Link href="/" className={`inline-flex items-center transition-colors group ${isDark
            ? 'text-slate-400 hover:text-white'
            : 'text-slate-600 hover:text-slate-900'
          }`}>
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600 mb-2 tracking-tight`}>
            Create Account
          </h1>
          <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} font-medium`}>
            Join the productivity revolution
          </p>
        </div>

        <div className={`rounded-2xl p-8 border backdrop-blur-lg transition-all duration-300 ${isDark
            ? 'bg-surface-dark_variant/80 border-primary-500/20 shadow-[0_0_30px_rgba(34,197,94,0.1)]'
            : 'bg-white/80 border-slate-200 shadow-xl shadow-slate-200/50'
          }`}>
          <RegisterForm />
        </div>

        <p className={`text-center mt-8 transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Already have an account?{' '}
          <Link href="/login" className={`font-bold transition-colors ${isDark
              ? 'text-primary-400 hover:text-primary-300 hover:underline underline-offset-4 decoration-primary-500/30'
              : 'text-primary-600 hover:text-primary-700'
            }`}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
