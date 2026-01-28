"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { login } from "@/lib/auth/hooks";
import { useSession } from "@/lib/auth/provider";
import { loginSchema, type LoginSchema } from "@/lib/validation/schemas";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export function LoginForm() {
  const router = useRouter();
  const { theme } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { session, refreshSession } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔥 Redirect ONLY when session exists - to /tasks instead of /dashboard
  useEffect(() => {
    if (session && mounted) {
      router.push("/tasks");
    }
  }, [session, router, mounted]);

  const onSubmit = async (data: LoginSchema) => {
    setError(null);
    setIsLoading(true);

    try {
      await login(data.email, data.password);
      await refreshSession(); // just update session
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {error && (
        <div className={`p-4 text-sm border rounded-xl animate-pulse ${
          isDark
            ? 'text-red-400 bg-red-900/30 border-red-800'
            : 'text-red-600 bg-red-50 border-red-100'
        }`}>
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="email" className={`font-semibold ml-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@company.com"
          className="premium-input w-full"
          disabled={isLoading}
          {...register("email")}
        />
        {errors.email && <p className="text-xs text-red-500 font-medium ml-1">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between ml-1">
          <Label htmlFor="password" className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Password</Label>
          <a href="#" className={`text-xs font-semibold transition-colors ${isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'}`}>Forgot?</a>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          className="premium-input w-full"
          disabled={isLoading}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-red-500 font-medium ml-1">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="premium-button w-full bg-primary-600 text-white hover:bg-primary-700" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          </div>
        ) : "Sign In to TodoMaster"}
      </Button>

      <p className={`text-center text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        New here?{" "}
        <Link href="/register" className={`font-bold hover:underline underline-offset-4 decoration-2 transition-colors ${
          isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
        }`}>
          Create account
        </Link>
      </p>
    </form>
  );
}
