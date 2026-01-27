// app/login/page.tsx
import { LoginForm } from '@/components/forms/LoginForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="absolute top-4 left-4">
        <Link href="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">TodoMaster</h1>
          <p className="text-white/80">Sign in to continue</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-8">
          <LoginForm />
        </div>
        
        <p className="text-center text-white/80 mt-8">
          Don't have an account?{' '}
          <Link href="/register" className="font-semibold text-white hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
