'use client';

import { useState } from 'react';

export default function HumanTechPage() {
  // Wallet state
  const [ address, setAddress ] = useState<string>('');
  const [ signature, setSignature ] = useState<string>('');
  const [ error, setError ] = useState<string>('');
  const [ loading, setLoading ] = useState(false);
  const [ loginType, setLoginType ] = useState<'human' | 'walletconnect' | 'injected' | null>(null);
  
  // Connect Wallet (abre el modal de WaaP)
  const handleConnect = async () => {
    setLoading(true);
    setError('');
    try {
      if (!window.waap) {
        throw new Error('WaaP no está inicializado');
      }
      
      // Abre el modal de WaaP - el usuario elige Google, MetaMask, Email, etc.
      const type = await window.waap.login();
      setLoginType(type);
      console.log('Login type:', type);
      const accounts = await window.waap.request({
        method: 'eth_requestAccounts',
      });
      
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error al conectar wallet';
      setError(message);
      console.error('Connect error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Logout
  const handleLogout = async () => {
    try {
      if (window.waap) {
        await window.waap.logout();
      }
      
      setAddress('');
      setSignature('');
      setError('');
      setLoginType(null);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error al desconectar';
      setError(message);
      console.error('Logout error:', error);
    }
  };
  
  // Sign Message
  const handleSign = async () => {
    setLoading(true);
    setError('');
    try {
      if (!window.waap || !address) {
        throw new Error('Debes conectarte primero');
      }
      
      const message = `Firmando desde Human.Tech POC\nTimestamp: ${Date.now()}`;
      const sig = await window.waap.request({
        method: 'personal_sign',
        params: [ message, address ],
      });
      
      setSignature(typeof sig === 'string' ? sig : sig[0]);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error al firmar mensaje';
      setError(message);
      console.error('Sign error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Determinar el nombre del método de login
  const getLoginMethodName = () => {
    if (!loginType) return '';
    switch (loginType) {
      case 'human':
        return 'Google (Human Wallet)';
      case 'injected':
        return 'MetaMask';
      case 'walletconnect':
        return 'WalletConnect';
      default:
        return 'Wallet';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Human.Tech POC
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Integración de wallets y funcionalidades
        </p>
        
        <div className="grid gap-6">
          {/* WALLET CARD */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
              💰 Wallet
            </h2>
            
            <div className="space-y-4">
              {!address ? (
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    Conecta tu wallet usando el modal de Human.Tech WaaP. Podrás elegir entre Google, MetaMask, Email y
                    otras opciones.
                  </p>
                  <button
                    onClick={handleConnect}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    {loading ? 'Conectando...' : '🔗 Connect Wallet'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Login Type Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-4 py-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-medium">
                      ✓ Conectado con {getLoginMethodName()}
                    </span>
                  </div>
                  
                  {/* Address Display */}
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-semibold">
                      ADDRESS:
                    </p>
                    <p className="text-sm font-mono text-slate-900 dark:text-white break-all">
                      {address}
                    </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleSign}
                      disabled={loading}
                      className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
                    >
                      {loading ? '✍️ Firmando...' : '✍️ Sign Message'}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
                    >
                      🚪 Logout
                    </button>
                  </div>
                  
                  {/* Signature Display */}
                  {signature && (
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-semibold">
                        SIGNATURE:
                      </p>
                      <p className="text-xs font-mono text-slate-900 dark:text-white break-all">
                        {signature}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Error Display */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                    ⚠️ {error}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* ESCROW CARD (placeholder) */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-200 dark:border-slate-700 opacity-60">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              🔒 Escrow
            </h2>
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Funcionalidad de escrow próximamente...
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  disabled
                  className="bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-500 font-medium py-3 px-4 rounded-lg cursor-not-allowed"
                >
                  Deposit
                </button>
                <button
                  disabled
                  className="bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-500 font-medium py-3 px-4 rounded-lg cursor-not-allowed"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
          
          {/* YELLOW CARD (placeholder) */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-200 dark:border-slate-700 opacity-60">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              💛 Yellow
            </h2>
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Integración con Yellow Network próximamente...
              </p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  disabled
                  className="bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-500 font-medium py-3 px-4 rounded-lg cursor-not-allowed"
                >
                  Swap
                </button>
                <button
                  disabled
                  className="bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-500 font-medium py-3 px-4 rounded-lg cursor-not-allowed"
                >
                  Bridge
                </button>
                <button
                  disabled
                  className="bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-500 font-medium py-3 px-4 rounded-lg cursor-not-allowed"
                >
                  Trade
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
