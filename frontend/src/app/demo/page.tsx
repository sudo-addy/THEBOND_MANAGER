'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DemoPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to paper trading as the demo arena
    router.replace('/paper-trade');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#050b14] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-400">Redirecting to Demo Arena...</p>
      </div>
    </div>
  );
}
