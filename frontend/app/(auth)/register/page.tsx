import { Metadata } from "next";
import { RegisterForm } from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your Todo App account",
};

export default function RegisterPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>
      <RegisterForm />
    </div>
  );
}
