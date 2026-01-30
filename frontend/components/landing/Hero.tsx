// components/landing/Hero.tsx
"use client";

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Hero = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <section className={`text-center py-20 md:py-32 px-4 ${isDark ? 'text-slate-50' : 'text-slate-900'}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white">
            Master your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Workflow.</span>
          </h1>
          <p className={`text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            The ultimate tool to organize your life, boost productivity, and achieve your goals with clarity.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 px-4 sm:px-0">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/20 transition-all duration-200"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold border-2 transition-all duration-200 ${isDark
                ? 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              } bg-transparent`}
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
