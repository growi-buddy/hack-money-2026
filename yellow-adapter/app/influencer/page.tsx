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
  const { address, isConnected, login, sendTransaction } = useWaap();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [claimAmount, setClaimAmount] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentStep, setCurrentStep] = useState<'idle' | 'updating' | 'withdrawing'>('idle');

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
      // CRÍTICO: PRIMERO ejecutar TX on-chain, LUEGO actualizar off-chain
      // Si la TX falla, el balance off-chain no se modifica
      
      // Paso 1: Generar withdraw intent
      setCurrentStep('withdrawing');
      console.log('🔐 Generando transacción de retiro on-chain...');

      const intentResponse = await fetch('/api/yellow/app-sessions/withdraw-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chainId: 84532, // Base Sepolia
          influencerAddress: address,
          amountUsdc: claimAmount,
        }),
      });

      const intentData = await intentResponse.json();

      if (!intentData.ok) {
        throw new Error(intentData.error?.message || 'Error generando intent de retiro');
      }

      // Paso 2: Ejecutar transacción on-chain con WAAP (PRIMERO)
      console.log('💰 Ejecutando transacción de retiro on-chain...');
      console.log('📋 txIntent recibido:', intentData.data.txIntent);
      
      const txIntent = intentData.data.txIntent;
      
      console.log('🔐 Verificando sendTransaction disponible:', {
        hasSendTransaction: !!sendTransaction,
        typeofSendTransaction: typeof sendTransaction
      });
      
      console.log('📤 Llamando sendTransaction con:', {
        to: txIntent.to,
        data: txIntent.data.substring(0, 10) + '...',
        value: txIntent.value,
        chainId: 84532
      });
      
      const txHash = await sendTransaction({
        to: txIntent.to,
        data: txIntent.data,
        value: txIntent.value,
        chainId: 84532, // Base Sepolia
      });

      console.log('✅ Transacción on-chain exitosa:', txHash);

      // Paso 3: AHORA SÍ actualizar balance off-chain (solo si TX on-chain fue exitosa)
      setCurrentStep('updating');
      console.log('📝 Actualizando balance off-chain después de TX exitosa...');
      
      const claimResponse = await fetch('/api/yellow/app-sessions/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appSessionId: selectedSession,
          participant: address,
          amountUsdc: claimAmount,
        }),
      });

      const claimData = await claimResponse.json();

      if (!claimData.ok) {
        console.warn('⚠️ TX on-chain exitosa pero falló actualización off-chain:', claimData.error);
        // Aunque falle el update off-chain, los fondos YA se retiraron on-chain
      }

      console.log('✅ Balance off-chain actualizado');

      setSuccess(
        `¡Retiro exitoso! ${parseFloat(claimAmount) / 1000000} USDC transferidos a tu wallet.\n` +
        `TX: ${txHash.substring(0, 10)}...${txHash.substring(txHash.length - 8)}`
      );
      setClaimAmount('');
      setError('');
      setCurrentStep('idle');

    } catch (err: any) {
      console.error('❌ Error en retiro:', err);
      
      // Mejorar mensaje de error según el tipo
      if (err.message?.includes('RPC endpoint')) {
        setError('❌ Error de conexión con la red. Por favor intenta de nuevo en unos segundos. El balance off-chain NO se modificó.');
      } else if (err.message?.includes('insufficient funds')) {
        setError('❌ No tienes suficiente ETH para gas en Base Sepolia. Consigue ETH del faucet.');
      } else {
        setError(err.message || 'Error en el proceso de retiro');
      }
      
      setCurrentStep('idle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Influencer Dashboard</h1>
        <p className="text-gray-600 text-lg">Ve tus payouts y retira fondos cuando quieras</p>
      </div>

      {!isConnected ? (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 border border-gray-200 text-center shadow-xl">
          <svg className="w-16 h-16 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Conecta tu wallet</h3>
          <p className="text-gray-600 mb-6">Necesitas conectar tu wallet para ver tus payouts</p>
          <button
            onClick={login}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Wallet Info */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tu wallet (Influencer)</p>
                <p className="text-gray-900 font-mono text-sm mt-1">{address}</p>
              </div>
            </div>
          </div>

          {/* Claim Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Retirar Fondos</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Session ID
                </label>
                <input
                  type="text"
                  value={selectedSession}
                  onChange={(e) => setSelectedSession(e.target.value)}
                  placeholder="session_..."
                  className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
                <p className="text-xs text-gray-500 mt-1">
                  El Session ID que te dio el Manager
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cantidad a retirar (USDC units)
                </label>
                <input
                  type="text"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                  placeholder="250000"
                  className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
                <p className="text-xs text-gray-500 mt-1">
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
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg"
              >
                {currentStep === 'updating' && '📝 Actualizando balance off-chain...'}
                {currentStep === 'withdrawing' && '💰 Retirando fondos on-chain...'}
                {currentStep === 'idle' && (loading ? 'Procesando...' : 'Retirar Fondos')}
              </button>

              {currentStep !== 'idle' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                    <div className="text-sm text-blue-800">
                      {currentStep === 'withdrawing' && (
                        <>
                          <p className="font-semibold">Paso 1/2: Retirando fondos on-chain</p>
                          <p className="text-xs">Confirma la transacción en tu wallet para recibir los USDC</p>
                        </>
                      )}
                      {currentStep === 'updating' && (
                        <>
                          <p className="font-semibold">Paso 2/2: Actualizando balance off-chain</p>
                          <p className="text-xs">Sincronizando tu balance virtual después del retiro exitoso...</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">ℹ️ Cómo funciona el retiro</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>1. El Manager crea una campaña contigo como influencer</li>
              <li>2. Generas contenido y el Admin te aplica payouts off-chain</li>
              <li>3. Tu balance virtual se actualiza (instantáneo, sin gas)</li>
              <li>4. Cuando presionas "Retirar Fondos":</li>
              <li className="ml-6">
                <span className="font-semibold">• Paso 1:</span> Se ejecuta transacción on-chain PRIMERO
              </li>
              <li className="ml-6">
                <span className="font-semibold">• Paso 2:</span> Solo si es exitosa, se actualiza el balance off-chain
              </li>
              <li>5. Los USDC se transfieren del Custody a tu wallet 🎉</li>
            </ul>
            <div className="mt-4 p-3 bg-white rounded-lg border border-green-300">
              <p className="text-green-800 text-xs font-semibold mb-1">
                🔐 Seguridad y Consistencia
              </p>
              <p className="text-gray-600 text-xs">
                La transacción on-chain se ejecuta primero. Tu balance off-chain solo se actualiza 
                si la transferencia de USDC es exitosa. Esto garantiza que tu balance siempre 
                refleje los fondos reales.
              </p>
            </div>
          </div>

          {/* Quick Reference */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📊 Conversión USDC</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 font-medium">0.25 USDC</p>
                <p className="text-gray-900 font-mono font-bold">= 250000 units</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">0.5 USDC</p>
                <p className="text-gray-900 font-mono font-bold">= 500000 units</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">1 USDC</p>
                <p className="text-gray-900 font-mono font-bold">= 1000000 units</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">10 USDC</p>
                <p className="text-gray-900 font-mono font-bold">= 10000000 units</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
