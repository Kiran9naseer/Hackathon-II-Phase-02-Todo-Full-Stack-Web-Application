"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { register as registerUser } from "@/lib/auth/hooks";
import { useSession } from "@/lib/auth/provider";
import { registerSchema, type RegisterSchema } from "@/lib/validation/schemas";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { refreshSession, session } = useSession();

  // Redirect to tasks after successful registration
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {error && (
        <div
          className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl animate-pulse"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-slate-700 font-semibold ml-1">Full Name</Label>
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
        <Label htmlFor="email" className="text-slate-700 font-semibold ml-1">Email Address</Label>
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
          <p className="text-xs text-red-500 font-medium ml-1" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-slate-700 font-semibold ml-1">Password</Label>
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
            <p className="text-xs text-red-500 font-medium ml-1" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword" className="text-slate-700 font-semibold ml-1">Confirm</Label>
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
            <p className="text-xs text-red-500 font-medium ml-1" role="alert">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className="premium-button w-full bg-secondary-600 text-white hover:bg-secondary-700 mt-2" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          </div>
        ) : "Create Master Account"}
      </Button>

      <p className="text-center text-sm text-slate-500 font-medium">
        Already registered?{" "}
        <Link
          href="/login"
          className="text-secondary-600 font-bold hover:underline underline-offset-4 decoration-2"
        >
          Sign in here
        </Link>
      </p>
    </form>
  );
}
