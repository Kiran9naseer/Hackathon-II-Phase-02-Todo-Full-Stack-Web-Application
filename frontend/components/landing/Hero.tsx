// components/landing/Hero.tsx
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="text-white text-center py-40">
      <h1 className="text-6xl font-bold mb-4">TodoMaster</h1>
      <p className="text-xl mb-8">The ultimate tool to organize your life and work.</p>
      <div className="space-x-4">
        <Link href="/register" className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold">
          Get Started
        </Link>
        <Link href="/login" className="border border-white px-6 py-3 rounded-md font-semibold">
          Sign In
        </Link>
      </div>
    </section>
  );
};

export default Hero;
