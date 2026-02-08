'use client';

import { useState } from 'react';
import { useWaap } from '@/src/components/WaapProvider';
import { mapErrorToUserMessage } from '@/src/lib/config/env';

interface OnChainChannelFlowProps {
  managerAddress: string;
}

type Step = 'form' | 'preflight' | 'approve' | 'deposit' | 'sign' | 'create' | 'success';

interface PreflightChecks {
  ready: boolean;
  checks: {
    configValid: boolean;
    hasEnoughEth: boolean;
    hasEnoughUsdc: boolean;
    ethBalance: string;
    usdcBalance: string;
    requiredUsdc: string;
  };
  warnings: string[];
}

export default function OnChainChannelFlow({ managerAddress }: OnChainChannelFlowProps) {
  const { address, isConnected, sendTransaction, signTypedData } = useWaap();
  
  const [influencerAddress, setInfluencerAddress] = useState('');
  const [budgetUsdc, setBudgetUsdc] = useState('1000000'); // 1 USDC por defecto
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState<Step>('form');
  const [channelId, setChannelId] = useState('');
  const [signData, setSignData] = useState<any>(null);
  const [preflightChecks, setPreflightChecks] = useState<PreflightChecks | null>(null);

  const chainId = 84532; // Base Sepolia
  
  // Debug: Verificar estado de conexión
  console.log('🔍 OnChainChannelFlow Debug:', {
    managerAddressProp: managerAddress,
    addressFromWaap: address,
    isConnected,
    match: managerAddress === address
  });

  // Paso 0: Preflight checks
  const handlePreflight = async () => {
    if (!influencerAddress || !budgetUsdc) {
      setError('Completa todos los campos');
      return null;
    }
    
    // Verificar que la wallet esté conectada
    if (!isConnected || !address) {
      setError('❌ Wallet no conectada. Reconecta tu wallet y autoriza los permisos.');
      return null;
    }
    
    if (managerAddress !== address) {
      setError(`❌ Address mismatch. Esperado: ${managerAddress}, Conectado: ${address}`);
      return null;
    }

    setCurrentStep('preflight');
    setError('');

    try {
      const response = await fetch('/api/yellow/channels/preflight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chainId,
          wallet: managerAddress,
          budgetUsdc,
        }),
      });

      const data = await response.json();

      if (!data.ok) {
        throw new Error(data.error?.message || 'Failed to run preflight checks');
      }

      setPreflightChecks(data.data);
      return data.data;
    } catch (err: any) {
      console.error('Preflight error:', err);
      setError(mapErrorToUserMessage(err));
      setCurrentStep('form');
      return null;
    }
  };

  // Paso 1: Aprobar USDC
  const handleApprove = async () => {
    console.log('✅ Starting approve with:', { address, managerAddress, isConnected });

    setLoading(true);
    setError('');
    setCurrentStep('approve');

    try {
      // 1. Obtener el intent de approve
      const response = await fetch('/api/yellow/channels/approve-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chainId,
          wallet: managerAddress,
          amountUsdc: budgetUsdc,
        }),
      });

      const data = await response.json();

      if (!data.ok) {
        throw new Error(data.error?.message || 'Failed to generate approve intent');
      }

      // 2. Ejecutar transacción con WAAP
      const txIntent = data.data.txIntent;
      const txHash = await sendTransaction({
        to: txIntent.to,
        data: txIntent.data,
        value: txIntent.value,
        chainId: chainId, // Base Sepolia
      });

      console.log('✅ Approve TX:', txHash);
      
      // Retornar éxito
      return true;
    } catch (err: any) {
      console.error('Approve error:', err);
      setError(mapErrorToUserMessage(err));
      setCurrentStep('form');
      setLoading(false);
      return false;
    }
  };

  // Paso 2: Depositar USDC
  const handleDeposit = async () => {
    setCurrentStep('deposit');
    setError('');

    try {
      // 1. Obtener el intent de deposit
      const response = await fetch('/api/yellow/channels/deposit-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chainId,
          wallet: managerAddress,
          amountUsdc: budgetUsdc,
        }),
      });

      const data = await response.json();

      if (!data.ok) {
        throw new Error(data.error?.message || 'Failed to generate deposit intent');
      }

      // 2. Ejecutar transacción con WAAP
      const txIntent = data.data.txIntent;
      const txHash = await sendTransaction({
        to: txIntent.to,
        data: txIntent.data,
        value: txIntent.value,
        chainId: chainId, // Base Sepolia
      });

      console.log('✅ Deposit TX:', txHash);
      
      // Retornar éxito
      return true;
    } catch (err: any) {
      console.error('Deposit error:', err);
      setError(mapErrorToUserMessage(err));
      setCurrentStep('form');
      setLoading(false);
      return false;
    }
  };

  // Paso 3: Obtener datos para firmar
  const handleGetSignData = async () => {
    setCurrentStep('sign');
    setError('');

    try {
      console.log('📡 Fetching sign data from API...');
      const response = await fetch('/api/yellow/channels/sign-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chainId,
          managerAddress,
          influencerAddress,
          budgetUsdc,
        }),
      });

      const data = await response.json();
      console.log('📥 Sign data response:', { 
        ok: data.ok, 
        hasData: !!data.data,
        hasTypedData: !!data.data?.typedData
      });

      if (!data.ok) {
        throw new Error(data.error?.message || 'Failed to get sign data');
      }

      console.log('✅ Setting channelId and signData...', {
        channelId: data.data.channelId,
        typedDataKeys: data.data.typedData ? Object.keys(data.data.typedData) : []
      });

      setChannelId(data.data.channelId);
      setSignData(data.data);
      
      console.log('✅ signData set successfully');
      
      // IMPORTANTE: Retornar los datos directamente en lugar de depender del state
      return data.data;
    } catch (err: any) {
      console.error('❌ Sign data error:', err);
      setError(mapErrorToUserMessage(err));
      setCurrentStep('form');
      setLoading(false);
      return null;
    }
  };

  // Paso 4: Firmar estado inicial (EIP-712)
  const handleSign = async (signDataParam: any) => {
    console.log('🔍 handleSign: Verificando signData...', { 
      hasSignData: !!signDataParam,
      signDataKeys: signDataParam ? Object.keys(signDataParam) : []
    });
    
    if (!signDataParam) {
      console.error('❌ signData is null or undefined');
      return null;
    }

    if (!signDataParam.typedData) {
      console.error('❌ signData.typedData is null or undefined');
      return null;
    }

    console.log('✅ signData exists, attempting to sign...');
    setError('');

    try {
      // Firmar con WAAP (EIP-712)
      console.log('🔐 Calling signTypedData with:', {
        domain: signDataParam.typedData.domain,
        primaryType: signDataParam.typedData.primaryType,
      });
      
      const signature = await signTypedData(signDataParam.typedData);
      
      console.log('✅ Manager signature:', signature);
      
      // Retornar la firma
      return signature;
    } catch (err: any) {
      console.error('❌ Sign error:', err);
      setError(mapErrorToUserMessage(err));
      setCurrentStep('form');
      setLoading(false);
      return null;
    }
  };

  // Paso 5: Crear canal on-chain
  const handleCreate = async (managerSignature: string) => {
    setCurrentStep('create');
    setError('');

    try {
      // 1. Obtener el intent de create (con firma)
      const response = await fetch('/api/yellow/channels/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chainId,
          managerAddress,
          influencerAddress,
          budgetUsdc,
          managerSignature,
        }),
      });

      const data = await response.json();

      if (!data.ok) {
        throw new Error(data.error?.message || 'Failed to generate create intent');
      }

      // 2. Ejecutar transacción con WAAP
      const txIntent = data.data.txIntent;
      const txHash = await sendTransaction({
        to: txIntent.to,
        data: txIntent.data,
        value: txIntent.value,
        chainId: chainId, // Base Sepolia
      });

      console.log('✅ Create Channel TX:', txHash);
      console.log('✅ Channel ID:', data.data.channelId);
      
      setChannelId(data.data.channelId);
      setCurrentStep('success');
      return true;
    } catch (err: any) {
      console.error('Create error:', err);
      setError(mapErrorToUserMessage(err));
      setCurrentStep('form');
      setLoading(false);
      return false;
    }
  };

  // Iniciar flujo completo
  const handleStartFlow = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Paso 0: Preflight checks
      console.log('🔄 Paso 0/5: Verificando pre-condiciones...');
      const preflight = await handlePreflight();
      if (!preflight) return;
      
      if (!preflight.ready) {
        setError(
          '❌ Pre-condiciones no cumplidas:\n' + 
          preflight.warnings.join('\n')
        );
        setCurrentStep('form');
        setLoading(false);
        return;
      }
      
      console.log('✅ Preflight OK. Iniciando flujo...');
      
      // Paso 1: Aprobar USDC
      console.log('🔄 Paso 1/5: Aprobando USDC...');
      const approveSuccess = await handleApprove();
      if (!approveSuccess) return;
      
      // Paso 2: Depositar USDC
      console.log('🔄 Paso 2/5: Depositando USDC...');
      const depositSuccess = await handleDeposit();
      if (!depositSuccess) return;
      
      // Paso 3: Obtener datos para firmar
      console.log('🔄 Paso 3/5: Obteniendo datos para firmar...');
      const fetchedSignData = await handleGetSignData();
      if (!fetchedSignData) {
        console.error('❌ No se pudo obtener signData');
        return;
      }
      console.log('✅ signData obtenido:', { 
        hasTypedData: !!fetchedSignData.typedData,
        channelId: fetchedSignData.channelId 
      });
      
      // Paso 4: Firmar estado inicial (pasar los datos directamente)
      console.log('🔄 Paso 4/5: Firmando estado inicial...');
      const signature = await handleSign(fetchedSignData);
      if (!signature) {
        console.error('❌ No se pudo obtener firma');
        return;
      }
      console.log('✅ Firma obtenida');
      
      // Paso 5: Crear canal
      console.log('🔄 Paso 5/5: Creando canal on-chain...');
      const createSuccess = await handleCreate(signature);
      if (!createSuccess) return;
      
      console.log('✅ Flujo completo exitoso!');
    } catch (err: any) {
      console.error('❌ Error en flujo:', err);
      setError(mapErrorToUserMessage(err));
      setCurrentStep('form');
    } finally {
      setLoading(false);
    }
  };

  // Resetear formulario
  const handleReset = () => {
    setCurrentStep('form');
    setInfluencerAddress('');
    setBudgetUsdc('1000000');
    setChannelId('');
    setError('');
    setSignData(null);
  };

  return (
    <div className="space-y-6">
      {/* Steps Progress */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Progreso del Canal On-Chain</h3>
        <div className="flex items-center justify-between">
          {['form', 'preflight', 'approve', 'deposit', 'sign', 'create', 'success'].map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep === step
                    ? 'bg-blue-600 text-white'
                    : ['preflight', 'approve', 'deposit', 'sign', 'create', 'success'].indexOf(currentStep) > index
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              {index < 6 && (
                <div
                  className={`w-12 h-1 ${
                    ['preflight', 'approve', 'deposit', 'sign', 'create', 'success'].indexOf(currentStep) > index
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>Formulario</span>
          <span>Checks</span>
          <span>Approve</span>
          <span>Deposit</span>
          <span>Firmar</span>
          <span>Crear</span>
          <span>Éxito</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">❌ {error}</p>
        </div>
      )}

      {/* Form Step */}
      {currentStep === 'form' && (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Crear Canal On-Chain</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Influencer Address
              </label>
              <input
                type="text"
                value={influencerAddress}
                onChange={(e) => setInfluencerAddress(e.target.value)}
                placeholder="0x..."
                className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Budget USDC (unidades)
              </label>
              <input
                type="text"
                value={budgetUsdc}
                onChange={(e) => setBudgetUsdc(e.target.value)}
                placeholder="1000000"
                className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                {(Number(budgetUsdc) / 1_000_000).toFixed(2)} USDC (6 decimales)
              </p>
            </div>

            <button
              onClick={handleStartFlow}
              disabled={loading || !influencerAddress || !budgetUsdc}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
            >
              {loading ? 'Procesando...' : 'Iniciar Creación de Canal'}
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-bold text-blue-900 mb-2">⚡ Flujo Completo:</h4>
            <ol className="text-xs text-blue-800 space-y-1 list-decimal list-inside">
              <li>Verificar balances y configuración</li>
              <li>Aprobar USDC al Custody contract</li>
              <li>Depositar USDC en Custody</li>
              <li>Firmar estado inicial (EIP-712)</li>
              <li>Crear canal on-chain</li>
            </ol>
            <p className="text-xs text-blue-700 mt-3 italic">
              💡 Asegúrate de tener ETH para gas y suficiente USDC
            </p>
          </div>
        </div>
      )}

      {/* Preflight Check Step */}
      {currentStep === 'preflight' && (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 border border-gray-200 shadow-lg">
          <div className="text-center mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Verificando Pre-condiciones...</h3>
            <p className="text-gray-600">Validando configuración y balances</p>
          </div>

          {preflightChecks && (
            <div className="space-y-3">
              <div className={`flex items-center gap-2 p-3 rounded-lg ${preflightChecks.checks.configValid ? 'bg-green-50' : 'bg-red-50'}`}>
                <span>{preflightChecks.checks.configValid ? '✅' : '❌'}</span>
                <span className="text-sm font-medium">Configuración del sistema</span>
              </div>
              
              <div className={`flex items-center gap-2 p-3 rounded-lg ${preflightChecks.checks.hasEnoughEth ? 'bg-green-50' : 'bg-yellow-50'}`}>
                <span>{preflightChecks.checks.hasEnoughEth ? '✅' : '⚠️'}</span>
                <span className="text-sm font-medium">Balance ETH: {preflightChecks.checks.ethBalance}</span>
              </div>
              
              <div className={`flex items-center gap-2 p-3 rounded-lg ${preflightChecks.checks.hasEnoughUsdc ? 'bg-green-50' : 'bg-yellow-50'}`}>
                <span>{preflightChecks.checks.hasEnoughUsdc ? '✅' : '⚠️'}</span>
                <span className="text-sm font-medium">
                  Balance USDC: {preflightChecks.checks.usdcBalance} (requerido: {preflightChecks.checks.requiredUsdc})
                </span>
              </div>

              {preflightChecks.warnings.length > 0 && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm font-bold text-yellow-800 mb-2">⚠️ Advertencias:</p>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {preflightChecks.warnings.map((warning, i) => (
                      <li key={i}>• {warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Processing Steps */}
      {['approve', 'deposit', 'sign', 'create'].includes(currentStep) && (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 border border-gray-200 shadow-lg text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {currentStep === 'approve' && 'Aprobando USDC...'}
            {currentStep === 'deposit' && 'Depositando USDC...'}
            {currentStep === 'sign' && 'Esperando firma...'}
            {currentStep === 'create' && 'Creando canal on-chain...'}
          </h3>
          <p className="text-gray-600">Por favor confirma en tu wallet</p>
        </div>
      )}

      {/* Success Step */}
      {currentStep === 'success' && (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 border border-gray-200 shadow-lg text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Canal Creado Exitosamente!</h3>
          <p className="text-gray-600 mb-4">Tu canal on-chain está listo</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">Channel ID:</p>
            <p className="text-xs font-mono text-gray-900 break-all">{channelId}</p>
          </div>

          <button
            onClick={handleReset}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
          >
            Crear Otro Canal
          </button>
        </div>
      )}
    </div>
  );
}
