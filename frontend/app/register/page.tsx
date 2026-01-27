// app/register/page.tsx
import { RegisterForm } from '@/components/forms/RegisterForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
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
          <h1 className="text-4xl font-bold text-white">Create your account</h1>
          <p className="text-white/80">Get started with TodoMaster</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-8">
          <RegisterForm />
        </div>
        
        <p className="text-center text-white/80 mt-8">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-white hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
