"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { register as registerUser } from "@/lib/auth/hooks";
import { useSession } from "@/lib/auth/provider";
import { registerSchema, type RegisterSchema } from "@/lib/validation/schemas";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export function RegisterForm() {
  const router = useRouter();
  const { theme } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { refreshSession, session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to tasks after successful registration
  useEffect(() => {
    if (session && mounted) {
      router.push("/tasks");
    }
  }, [session, router, mounted]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    setError(null);
    setIsLoading(true);

    try {
      await registerUser(data.email, data.password, data.name || undefined);
      await refreshSession();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {error && (
        <div
          className={`p-4 text-sm border rounded-xl animate-pulse ${
            isDark
              ? 'text-red-400 bg-red-900/30 border-red-800'
              : 'text-red-600 bg-red-50 border-red-100'
          }`}
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="name" className={`font-semibold ml-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          className="premium-input w-full"
          autoComplete="name"
          disabled={isLoading}
          {...register("name")}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email" className={`font-semibold ml-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@company.com"
          className="premium-input w-full"
          autoComplete="email"
          disabled={isLoading}
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p className={`text-xs font-medium ml-1 ${isDark ? 'text-red-400' : 'text-red-500'}`} role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="password" className={`font-semibold ml-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="premium-input w-full"
            autoComplete="new-password"
            disabled={isLoading}
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <p className={`text-xs font-medium ml-1 ${isDark ? 'text-red-400' : 'text-red-500'}`} role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword" className={`font-semibold ml-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Confirm</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="premium-input w-full"
            autoComplete="new-password"
            disabled={isLoading}
            {...register("confirmPassword")}
            aria-invalid={errors.confirmPassword ? "true" : "false"}
          />
          {errors.confirmPassword && (
            <p className={`text-xs font-medium ml-1 ${isDark ? 'text-red-400' : 'text-red-500'}`} role="alert">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className="premium-button w-full bg-secondary-600 hover:bg-secondary-700 text-white mt-2" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          </div>
        ) : "Create Master Account"}
      </Button>

      <p className={`text-center text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Already registered?{" "}
        <Link
          href="/login"
          className={`font-bold hover:underline underline-offset-4 decoration-2 transition-colors ${
            isDark ? 'text-secondary-400 hover:text-secondary-300' : 'text-secondary-600 hover:text-secondary-700'
          }`}
        >
          Sign in here
        </Link>
      </p>
    </form>
  );
}
