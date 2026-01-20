import { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Todo App account",
};

export default function LoginPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Welcome back</h2>
      <LoginForm />
    </div>
  );
}
