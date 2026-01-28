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
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500">
            TodoMaster
          </h1>
          <p className={`text-xl md:text-2xl font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            The ultimate tool to organize your life and boost productivity
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link
            href="/register"
            className="premium-button bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className={`premium-button border-2 ${isDark ? 'border-slate-600 text-slate-200 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'} bg-transparent`}
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
