// components/landing/Stats.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Users, CheckCircle, Zap } from "lucide-react";

const Stats = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const stats = [
    { icon: Users, label: "Active Users", value: "10k+" },
    { icon: CheckCircle, label: "Tasks Completed", value: "1M+" },
    { icon: Zap, label: "Uptime", value: "99.9%" },
  ];

  return (
    <section className={`py-20 md:py-32 px-4 ${isDark ? "bg-slate-900/30" : "bg-white/50"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`text-center p-8 rounded-3xl border transition-all duration-300 ${
                  isDark
                    ? "bg-slate-900/50 border-slate-700 hover:border-slate-600"
                    : "bg-white border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="mb-4 inline-flex p-3 rounded-full bg-primary-100 dark:bg-primary-900/30">
                  <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <p className={`text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600`}>
                  {stat.value}
                </p>
                <p className={`text-lg font-semibold ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
