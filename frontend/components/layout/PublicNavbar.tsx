// components/layout/PublicNavbar.tsx
import Link from 'next/link';

const PublicNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          TodoMaster
        </Link>
        <div>
          <Link href="/login" className="mr-4">
            Sign In
          </Link>
          <Link href="/register" className="bg-white text-blue-600 px-4 py-2 rounded-md">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;