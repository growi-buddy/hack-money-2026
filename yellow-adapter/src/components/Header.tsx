'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useWaap } from './WaapProvider';

export function Header() {
  const { address, isConnected, login, logout } = useWaap();

  return (
    <header className="border-b border-white/30 bg-white/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/growi.png" 
                alt="Growi" 
                width={40} 
                height={40}
                className="object-contain"
              />
              <span className="text-xl font-bold text-gray-900">Growi</span>
            </Link>
            <nav className="flex space-x-4">
              <Link
                href="/manager"
                className="text-gray-800 hover:text-gray-900 hover:bg-white/30 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Manager
              </Link>
              <Link
                href="/influencer"
                className="text-gray-800 hover:text-gray-900 hover:bg-white/30 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Influencer
              </Link>
              <Link
                href="/admin"
                className="text-gray-800 hover:text-gray-900 hover:bg-white/30 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Admin
              </Link>
            </nav>
          </div>
          
          <div>
            {isConnected && address ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-900 bg-white/40 px-3 py-1 rounded-lg font-mono">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
                <button
                  onClick={logout}
                  className="bg-white/60 hover:bg-white/80 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-lg"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
