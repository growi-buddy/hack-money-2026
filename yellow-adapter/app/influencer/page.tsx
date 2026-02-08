'use client';

import { useState } from 'react';
import { useWaap } from '@/src/components/WaapProvider';

interface Session {
  appSessionId: string;
  allocations: Array<{
    participant: string;
    amount: string;
  }>;
  version: number;
}

export default function InfluencerPage() {
  const { address, isConnected, login } = useWaap();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [claimAmount, setClaimAmount] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadSessions = async () => {
    if (!address) return;

    setLoading(true);
    try {
      // Aquí deberías implementar un endpoint que filtre por participant
      // Por ahora, esto es un placeholder
      setError('Próximamente: Ver tus sesiones automáticamente');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    if (!address || !selectedSession || !claimAmount) {
      setError('Completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/yellow/app-sessions/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appSessionId: selectedSession,
          participant: address,
          amountUsdc: claimAmount,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setSuccess(`¡Claim exitoso! ${parseFloat(claimAmount) / 1000000} USDC retirados`);
        setClaimAmount('');
        setError('');
      } else {
        setError(data.error?.message || 'Error en claim');
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
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent mb-2">Influencer Dashboard</h1>
        <p className="text-blue-300">Ve tus earnings y retira fondos</p>
      </div>

      {!isConnected ? (
        <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-8 border border-blue-700/50 text-center">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 className="text-xl font-semibold text-white mb-2">Conecta tu wallet</h3>
          <p className="text-blue-300 mb-6">Necesitas conectar tu wallet para ver tus payouts</p>
          <button
            onClick={login}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-green-500/50"
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
                <p className="text-sm text-blue-400">Tu wallet (Influencer)</p>
                <p className="text-white font-mono text-sm">{address}</p>
              </div>
            </div>
          </div>

          {/* Claim Form */}
          <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-700/50">
            <h2 className="text-2xl font-bold text-white mb-6">Retirar Fondos</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">
                  Session ID
                </label>
                <input
                  type="text"
                  value={selectedSession}
                  onChange={(e) => setSelectedSession(e.target.value)}
                  placeholder="session_..."
                  className="w-full bg-blue-950/50 border border-blue-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50"
                />
                <p className="text-xs text-blue-400/70 mt-1">
                  El Session ID que te dio el Manager
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">
                  Cantidad a retirar (USDC units)
                </label>
                <input
                  type="text"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                  placeholder="250000"
                  className="w-full bg-blue-950/50 border border-blue-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50"
                />
                <p className="text-xs text-blue-400/70 mt-1">
                  1 USDC = 1,000,000 units | Ejemplo: 250000 = 0.25 USDC
                </p>
              </div>

              {error && (
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
                  <p className="text-green-400 text-sm">{success}</p>
                </div>
              )}

              <button
                onClick={handleClaim}
                disabled={loading || !selectedSession || !claimAmount}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg shadow-green-500/50"
              >
                {loading ? 'Procesando...' : 'Retirar Fondos'}
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-900/20 backdrop-blur-sm border border-blue-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-3">ℹ️ Cómo funciona</h3>
            <ul className="text-blue-200 text-sm space-y-2">
              <li>1. El Manager crea una campaña contigo como influencer</li>
              <li>2. Generas contenido y el Admin te aplica payouts</li>
              <li>3. Tu balance se actualiza off-chain (instantáneo, sin gas)</li>
              <li>4. Puedes retirar (claim) cuando quieras</li>
              <li>5. Growi Judge firma tu withdrawal automáticamente</li>
            </ul>
            <p className="text-green-400 text-xs mt-4">
              🔐 Tu wallet firma el claim para confirmar que eres tú
            </p>
          </div>

          {/* Quick Reference */}
          <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-700/50">
            <h3 className="text-lg font-semibold text-blue-200 mb-3">📊 Conversión USDC</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-blue-400">0.25 USDC</p>
                <p className="text-white font-mono">= 250000 units</p>
              </div>
              <div>
                <p className="text-blue-400">0.5 USDC</p>
                <p className="text-white font-mono">= 500000 units</p>
              </div>
              <div>
                <p className="text-blue-400">1 USDC</p>
                <p className="text-white font-mono">= 1000000 units</p>
              </div>
              <div>
                <p className="text-blue-400">10 USDC</p>
                <p className="text-white font-mono">= 10000000 units</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
