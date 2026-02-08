import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-5xl w-full text-center">
        {/* Logo y Título */}
        <div className="mb-12">
          <div className="flex justify-center mb-8">
            <Image 
              src="/growi_manager.png" 
              alt="Growi" 
              width={180} 
              height={180}
              className="object-contain"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Growi Campaign Manager
          </h1>
          <p className="text-lg text-gray-800">
            Non-custodial campaign payouts powered by Yellow Network
          </p>
          <p className="text-sm text-gray-700 mt-2">
            Trusted Platform Model: Los usuarios controlan sus wallets, Growi firma payouts
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Manager Card */}
          <Link
            href="/manager"
            className="group bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/40 hover:border-blue-400/50 hover:bg-white/80 transition-all duration-300 shadow-lg"
          >
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Manager</h2>
            <p className="text-sm text-gray-700 mb-3">
              Crea campañas y asigna presupuesto a influencers
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>✓ Conecta tu wallet</li>
              <li>✓ Crea App Session</li>
              <li>✓ Define budget y influencer</li>
            </ul>
          </Link>

          {/* Influencer Card */}
          <Link
            href="/influencer"
            className="group bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/40 hover:border-green-400/50 hover:bg-white/80 transition-all duration-300 shadow-lg"
          >
            <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Influencer</h2>
            <p className="text-sm text-gray-700 mb-3">
              Ve tus payouts y retira fondos cuando quieras
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>✓ Conecta tu wallet</li>
              <li>✓ Ve tus earnings</li>
              <li>✓ Claim payouts</li>
            </ul>
          </Link>

          {/* Admin Card */}
          <Link
            href="/admin"
            className="group bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/40 hover:border-purple-400/50 hover:bg-white/80 transition-all duration-300 shadow-lg"
          >
            <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Admin</h2>
            <p className="text-sm text-gray-700 mb-3">
              Aplica payouts (Growi Judge firma automáticamente)
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>✓ Ve todas las sesiones</li>
              <li>✓ Aplica payouts</li>
              <li>✓ Growi Judge firma</li>
            </ul>
          </Link>
        </div>
      </div>
    </div>
  );
}
