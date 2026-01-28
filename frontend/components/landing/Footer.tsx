// components/landing/Footer.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

const Footer = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <footer
      className={`border-t transition-colors duration-300 ${
        isDark
          ? "bg-slate-900/50 border-slate-700"
          : "bg-white border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
              TodoMaster
            </Link>
            <p className={`text-sm mt-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Organize your life and boost productivity.
            </p>
          </div>

          <div>
            <h4 className={`font-bold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
              Product
            </h4>
            <ul className="space-y-2">
              {["Features", "Pricing", "Security"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`text-sm transition-colors ${
                      isDark
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`font-bold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
              Company
            </h4>
            <ul className="space-y-2">
              {["About", "Blog", "Careers"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`text-sm transition-colors ${
                      isDark
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`font-bold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
              Legal
            </h4>
            <ul className="space-y-2">
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`text-sm transition-colors ${
                      isDark
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`border-t pt-8 text-center ${
            isDark ? "border-slate-700" : "border-slate-100"
          }`}
        >
          <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            &copy; {new Date().getFullYear()} TodoMaster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
