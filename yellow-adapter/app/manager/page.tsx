'use client';

import { useState } from 'react';
import { useWaap } from '@/src/components/WaapProvider';

export default function ManagerPage() {
  const { address, isConnected, login } = useWaap();
  const [influencerAddress, setInfluencerAddress] = useState('');
  const [budgetUsdc, setBudgetUsdc] = useState('1000000'); // 1 USDC
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [error, setError] = useState('');

  const handleCreateSession = async () => {
    if (!address || !influencerAddress) {
      setError('Conecta tu wallet e ingresa address del influencer');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/yellow/app-sessions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          budgetUsdc,
          managerAddress: address,
          influencerAddress,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setSessionId(data.data.appSessionId);
        setError('');
      } else {
        setError(data.error?.message || 'Error creando sesión');
      }
    } catch (err: any) {
      setError(err.message || 'Error de red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-2">Manager Dashboard</h1>
        <p className="text-blue-300">Crea campañas y asigna presupuesto a influencers</p>
      </div>

      {!isConnected ? (
        <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-8 border border-blue-700/50 text-center">
          <svg className="w-16 h-16 text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="text-xl font-semibold text-white mb-2">Conecta tu wallet</h3>
          <p className="text-blue-300 mb-6">Necesitas conectar tu wallet para crear campañas</p>
          <button
            onClick={login}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/50"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Wallet Info */}
          <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-400">Tu wallet (Manager)</p>
                <p className="text-white font-mono text-sm">{address}</p>
              </div>
            </div>
          </div>

          {/* Create Session Form */}
          <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-700/50">
            <h2 className="text-2xl font-bold text-white mb-6">Crear Nueva Campaña</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">
                  Influencer Address
                </label>
                <input
                  type="text"
                  value={influencerAddress}
                  onChange={(e) => setInfluencerAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-blue-950/50 border border-blue-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
                />
                <p className="text-xs text-blue-400/70 mt-1">
                  Address de la wallet del influencer que recibirá payouts
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">
                  Budget (USDC units)
                </label>
                <input
                  type="text"
                  value={budgetUsdc}
                  onChange={(e) => setBudgetUsdc(e.target.value)}
                  placeholder="1000000"
                  className="w-full bg-blue-950/50 border border-blue-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
                />
                <p className="text-xs text-blue-400/70 mt-1">
                  1 USDC = 1,000,000 units | Ejemplo: 1000000 = 1 USDC
                </p>
              </div>

              {error && (
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleCreateSession}
                disabled={loading || !influencerAddress}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg shadow-blue-500/50"
              >
                {loading ? 'Creando...' : 'Crear Campaña'}
              </button>
            </div>
          </div>

          {/* Success Message */}
          {sessionId && (
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">¡Campaña creada!</h3>
                  <p className="text-gray-300 text-sm mb-2">Session ID:</p>
                  <p className="text-white font-mono text-sm bg-gray-900 p-2 rounded break-all">{sessionId}</p>
                  <p className="text-gray-400 text-xs mt-3">
                    Ahora el Admin puede aplicar payouts a este influencer
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-900/20 backdrop-blur-sm border border-blue-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-3">ℹ️ Cómo funciona</h3>
            <ul className="text-blue-200 text-sm space-y-2">
              <li>1. Conectas tu wallet (Manager)</li>
              <li>2. Ingresas el address del Influencer</li>
              <li>3. Defines el budget virtual (off-chain)</li>
              <li>4. El sistema crea una App Session con Growi como Judge</li>
              <li>5. El Admin puede aplicar payouts al influencer</li>
              <li>6. El influencer puede hacer claim cuando quiera</li>
            </ul>
            <p className="text-blue-400 text-xs mt-4">
              🔐 Tu wallet NO se usa para firmar ahora, solo para identificarte como Manager
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
