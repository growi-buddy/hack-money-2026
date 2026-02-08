'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [sessionId, setSessionId] = useState('');
  const [earnedUsdc, setEarnedUsdc] = useState('');
  const [feeBps, setFeeBps] = useState('200'); // 2% default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sessionData, setSessionData] = useState<any>(null);

  const handleLoadSession = async () => {
    if (!sessionId) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/yellow/app-sessions/${sessionId}`);
      const data = await response.json();

      if (data.ok) {
        setSessionData(data.data.session);
        setError('');
      } else {
        setError(data.error?.message || 'Sesión no encontrada');
        setSessionData(null);
      }
    } catch (err: any) {
      setError(err.message || 'Error de red');
      setSessionData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPayout = async () => {
    if (!sessionId || !earnedUsdc) {
      setError('Completa Session ID y cantidad');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/yellow/app-sessions/payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appSessionId: sessionId,
          earnedUsdc,
          feeBps: parseInt(feeBps),
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setSuccess(`¡Payout aplicado! ${parseFloat(earnedUsdc) / 1000000} USDC al influencer`);
        setEarnedUsdc('');
        setError('');
        // Reload session data
        handleLoadSession();
      } else {
        setError(data.error?.message || 'Error aplicando payout');
      }
    } catch (err: any) {
      setError(err.message || 'Error de red');
    } finally {
      setLoading(false);
    }
  };

  const formatUsdc = (units: string) => {
    return (parseFloat(units) / 1000000).toFixed(6);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent mb-2">Admin Dashboard</h1>
        <p className="text-blue-300">Aplica payouts (Growi Judge firma automáticamente)</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Actions */}
        <div className="space-y-6">
          {/* Load Session */}
          <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-700/50">
            <h2 className="text-xl font-bold text-white mb-4">Cargar Sesión</h2>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                placeholder="session_..."
                className="flex-1 bg-blue-950/50 border border-blue-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50"
              />
              <button
                onClick={handleLoadSession}
                disabled={loading || !sessionId}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold px-6 py-2 rounded-lg transition-all shadow-lg shadow-purple-500/50"
              >
                {loading ? '...' : 'Cargar'}
              </button>
            </div>
          </div>

          {/* Apply Payout */}
          <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-700/50">
            <h2 className="text-xl font-bold text-white mb-4">Aplicar Payout</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">
                  Cantidad ganada (USDC units)
                </label>
                <input
                  type="text"
                  value={earnedUsdc}
                  onChange={(e) => setEarnedUsdc(e.target.value)}
                  placeholder="250000"
                  className="w-full bg-blue-950/50 border border-blue-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50"
                />
                <p className="text-xs text-blue-400/70 mt-1">
                  Ejemplo: 250000 = 0.25 USDC
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">
                  Fee (Basis Points)
                </label>
                <input
                  type="text"
                  value={feeBps}
                  onChange={(e) => setFeeBps(e.target.value)}
                  placeholder="200"
                  className="w-full bg-blue-950/50 border border-blue-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50"
                />
                <p className="text-xs text-blue-400/70 mt-1">
                  200 BPS = 2% | 100 BPS = 1%
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
                onClick={handleApplyPayout}
                disabled={loading || !sessionId || !earnedUsdc}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg shadow-purple-500/50"
              >
                {loading ? 'Aplicando...' : 'Aplicar Payout'}
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-900/20 backdrop-blur-sm border border-blue-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-3">ℹ️ Cómo funciona</h3>
            <ul className="text-blue-200 text-sm space-y-2">
              <li>1. Cargas la sesión por su ID</li>
              <li>2. Ingresas la cantidad ganada por el influencer</li>
              <li>3. El sistema calcula automáticamente el fee</li>
              <li>4. Growi Judge (servidor) firma el payout</li>
              <li>5. El balance del influencer se actualiza off-chain</li>
            </ul>
            <p className="text-purple-400 text-xs mt-4">
              🔐 Judge firma automáticamente (quorum 100%)
            </p>
          </div>
        </div>

        {/* Right Column - Session Data */}
        <div className="space-y-6">
          {sessionData ? (
            <>
              {/* Session Info */}
              <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-700/50">
                <h2 className="text-xl font-bold text-white mb-4">Información de Sesión</h2>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-blue-400">Session ID</p>
                    <p className="text-white font-mono text-sm break-all">{sessionData.appSessionId}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-blue-400">Version</p>
                    <p className="text-white font-semibold">{sessionData.version}</p>
                  </div>

                  <div>
                    <p className="text-xs text-blue-400">Protocol</p>
                    <p className="text-white">{sessionData.definition?.protocol}</p>
                  </div>

                  <div>
                    <p className="text-xs text-blue-400">Asset</p>
                    <p className="text-white">{sessionData.definition?.asset}</p>
                  </div>
                </div>
              </div>

              {/* Allocations */}
              <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-700/50">
                <h2 className="text-xl font-bold text-white mb-4">Allocations</h2>
                
                <div className="space-y-3">
                  {sessionData.allocations?.map((alloc: any, idx: number) => {
                    const role = ['Manager', 'Influencer', 'Judge (Growi)', 'Fee Treasury'][idx] || 'Unknown';
                    return (
                      <div key={idx} className="bg-blue-950/50 rounded-lg p-3 border border-blue-800/30">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs text-blue-400">{role}</p>
                            <p className="text-white font-mono text-xs break-all">{alloc.participant}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-semibold">{formatUsdc(alloc.amount)} USDC</p>
                            <p className="text-xs text-blue-400/70">{alloc.amount} units</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Participants */}
              <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-700/50">
                <h2 className="text-xl font-bold text-white mb-4">Participants</h2>
                
                <div className="space-y-2 text-sm">
                  {sessionData.definition?.participants?.map((addr: string, idx: number) => {
                    const role = ['Manager', 'Influencer', 'Judge', 'Fee'][idx];
                    const weight = sessionData.definition?.weights?.[idx] || 0;
                    return (
                      <div key={idx} className="flex justify-between">
                        <span className="text-blue-400">{role}:</span>
                        <span className="text-white font-mono text-xs">{addr.slice(0, 10)}...{addr.slice(-8)}</span>
                        <span className="text-purple-400 text-xs">({weight}%)</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-blue-400/70 mt-3">
                  Quorum: {sessionData.definition?.quorum || 0}% (Judge tiene control total)
                </p>
              </div>
            </>
          ) : (
            <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-8 border border-blue-700/50 text-center">
              <svg className="w-16 h-16 text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-blue-400">Carga una sesión para ver los detalles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
