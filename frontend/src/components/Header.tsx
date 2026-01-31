'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Landmark } from 'lucide-react';

interface HeaderProps {
  user?: {
    name: string;
    subscription_tier: string;
  };
  transparent?: boolean;
}

export default function Header({ user, transparent = false }: HeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <header
      className={`border-b-4 border-amber-500 shadow-lg sticky top-0 z-50 ${transparent
          ? 'bg-gradient-to-r from-blue-900 to-blue-800'
          : 'bg-gradient-to-r from-blue-900 to-blue-800'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Branding */}
          <Link href="/dashboard" className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-blue-900 group-hover:scale-110 transition-transform">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Global Bond Market</h1>
              <p className="text-sm text-blue-200">Infrastructure Investment Platform</p>
            </div>
          </Link>

          {/* User Info & Actions */}
          <div className="flex items-center gap-6">
            {user && (
              <div className="text-right hidden sm:block">
                <p className="text-white font-semibold">{user.name}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${user.subscription_tier === 'premium'
                      ? 'bg-amber-500 text-amber-900'
                      : 'bg-blue-500 text-white'
                    }`}
                >
                  {user.subscription_tier.toUpperCase()}
                </span>
              </div>
            )}

            <button onClick={handleLogout} className="btn-secondary px-4 py-2">
              Exit
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
