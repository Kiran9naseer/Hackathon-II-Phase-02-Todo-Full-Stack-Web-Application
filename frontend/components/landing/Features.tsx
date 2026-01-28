// components/landing/Features.tsx
"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { CheckCircle, Users, BarChart3 } from 'lucide-react';

const Features = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  const features = [
    {
      icon: CheckCircle,
      title: 'Smart Task Management',
      description: 'Organize tasks with priorities, due dates, and custom categories.',
    },
    {
      icon: Users,
      title: 'Seamless Collaboration',
      description: 'Share tasks and collaborate with your team in real-time.',
    },
    {
      icon: BarChart3,
      title: 'Productivity Insights',
      description: 'Track progress and visualize your productivity with analytics.',
    },
  ];

  return (
    <section className={`py-20 md:py-32 px-4 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Powerful Features</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Everything you need to stay organized and productive
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`card-elevated group hover:scale-105 transition-transform duration-300 ${isDark ? 'dark' : ''}`}
              >
                <div className="mb-6 inline-flex p-3 rounded-2xl bg-primary-100 dark:bg-primary-900/30">
                  <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-slate-50' : 'text-slate-900'}`}>
                  {feature.title}
                </h3>
                <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
