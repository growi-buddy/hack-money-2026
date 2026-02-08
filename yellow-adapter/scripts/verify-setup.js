/**
 * Script de Verificación de Configuración
 * Verifica que todo esté listo para el MVP con Clearnode
 */

const fs = require('fs');
const path = require('path');

// Leer .env manualmente
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
});

const { createPublicClient, http, formatEther, formatUnits } = require('viem');
const { baseSepolia } = require('viem/chains');
const { privateKeyToAccount } = require('viem/accounts');

const USDC_ADDRESS = '0xDB9F293e3898c9E5536A3be1b0C56c89d2b32DEb'; // ytest.usd on Base Sepolia

// ABI mínimo para USDC
const USDC_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
];

async function verifySetup() {
  console.log('\n🔍 VERIFICACIÓN DE CONFIGURACIÓN - MVP CLEARNODE\n');
  console.log('='.repeat(60));

  let allGood = true;

  // 1. Verificar variables de entorno
  console.log('\n📋 1. Variables de Entorno\n');

  const requiredEnvs = {
    'YELLOW_WS_URL': env.YELLOW_WS_URL,
    'YELLOW_JUDGE_PK': env.YELLOW_JUDGE_PK,
    'YELLOW_FEE_ADDRESS': env.YELLOW_FEE_ADDRESS,
    'YELLOW_CUSTODY_ADDRESS': env.YELLOW_CUSTODY_ADDRESS,
    'BASE_SEPOLIA_RPC_URL': env.BASE_SEPOLIA_RPC_URL,
  };

  for (const [key, value] of Object.entries(requiredEnvs)) {
    if (!value) {
      console.log(`   ❌ ${key}: NO CONFIGURADO`);
      allGood = false;
    } else {
      console.log(`   ✅ ${key}: ${value.substring(0, 30)}...`);
    }
  }

  // 2. Verificar Judge Wallet
  console.log('\n🔑 2. Judge Wallet\n');

  let judgeAddress;
  try {
    const judgeAccount = privateKeyToAccount(env.YELLOW_JUDGE_PK);
    judgeAddress = judgeAccount.address;
    console.log(`   ✅ Address: ${judgeAddress}`);
  } catch (error) {
    console.log(`   ❌ Private key inválida: ${error.message}`);
    allGood = false;
    return;
  }

  // 3. Crear cliente RPC
  console.log('\n🌐 3. Conexión RPC\n');

  const client = createPublicClient({
    chain: baseSepolia,
    transport: http(env.BASE_SEPOLIA_RPC_URL),
  });

  // 4. Verificar balance de ETH del Judge
  console.log('\n💰 4. Balance del Judge (ETH para gas)\n');

  try {
    const balance = await client.getBalance({ address: judgeAddress });
    const eth = formatEther(balance);
    console.log(`   Balance: ${eth} ETH`);

    if (BigInt(balance) === 0n) {
      console.log('   ❌ Sin fondos para gas!');
      console.log('   🚰 Obtener ETH: https://www.alchemy.com/faucets/base-sepolia');
      allGood = false;
    } else if (BigInt(balance) < BigInt('10000000000000000')) { // < 0.01 ETH
      console.log('   ⚠️  Bajo balance (< 0.01 ETH), considera agregar más');
    } else {
      console.log('   ✅ Suficiente para testing');
    }
  } catch (error) {
    console.log(`   ❌ Error obteniendo balance: ${error.message}`);
    console.log('   ⚠️  RPC puede estar fallando o bloqueado');
    allGood = false;
  }

  // 5. Verificar balance de USDC del Judge (opcional pero útil)
  console.log('\n💵 5. Balance del Judge (USDC/ytest.usd)\n');

  try {
    const usdcBalance = await client.readContract({
      address: USDC_ADDRESS,
      abi: USDC_ABI,
      functionName: 'balanceOf',
      args: [judgeAddress],
    });

    const usdc = formatUnits(usdcBalance, 6);
    console.log(`   Balance: ${usdc} USDC`);

    if (BigInt(usdcBalance) === 0n) {
      console.log('   ℹ️  Sin USDC (no crítico para Judge)');
    } else {
      console.log('   ✅ Tiene USDC disponible');
    }
  } catch (error) {
    console.log(`   ⚠️  Error obteniendo balance USDC: ${error.message}`);
  }

  // 6. Verificar Fee Address
  console.log('\n💼 6. Fee Treasury Address\n');

  const feeAddress = env.YELLOW_FEE_ADDRESS;
  console.log(`   Address: ${feeAddress}`);

  if (!/^0x[a-fA-F0-9]{40}$/.test(feeAddress)) {
    console.log('   ❌ Address inválida!');
    allGood = false;
  } else {
    console.log('   ✅ Format válido');
  }

  // 7. Verificar Custody Contract
  console.log('\n🏦 7. Custody Contract\n');

  const custodyAddress = env.YELLOW_CUSTODY_ADDRESS;
  console.log(`   Address: ${custodyAddress}`);

  try {
    const code = await client.getBytecode({ address: custodyAddress });
    if (code && code !== '0x') {
      console.log('   ✅ Contract existe on-chain');
    } else {
      console.log('   ❌ Contract no encontrado!');
      allGood = false;
    }
  } catch (error) {
    console.log(`   ⚠️  Error verificando contract: ${error.message}`);
  }

  // 8. Verificar WebSocket URL
  console.log('\n🔌 8. Yellow Clearnode WebSocket\n');

  const wsUrl = env.YELLOW_WS_URL;
  console.log(`   URL: ${wsUrl}`);

  if (wsUrl === 'wss://clearnet-sandbox.yellow.com/ws') {
    console.log('   ✅ Sandbox URL correcta');
  } else {
    console.log('   ⚠️  URL no estándar (verifica que sea correcta)');
  }

  // 9. Verificar RPC (rate limiting check)
  console.log('\n⚡ 9. RPC Rate Limiting Check\n');

  const rpcUrl = env.BASE_SEPOLIA_RPC_URL;
  if (rpcUrl.includes('alchemy.com') || rpcUrl.includes('infura.io') || rpcUrl.includes('quicknode.com')) {
    console.log('   ✅ Usando RPC dedicado (recomendado)');
  } else {
    console.log('   ⚠️  Usando RPC público (puede tener rate limiting)');
    console.log('   💡 Recomendación: Usa Alchemy, Infura o QuickNode');
    console.log('   📖 Ver: https://www.alchemy.com/ (gratis)');
  }

  // Resumen final
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 RESUMEN\n');

  if (allGood) {
    console.log('   ✅ TODO LISTO PARA TESTING!');
    console.log('\n   Siguiente paso:');
    console.log('   1. npm run dev');
    console.log('   2. Abrir http://localhost:3001/manager');
    console.log('   3. Crear Payment Channel (deposit USDC)');
    console.log('   4. Crear App Session');
    console.log('\n');
  } else {
    console.log('   ❌ CONFIGURACIÓN INCOMPLETA');
    console.log('\n   Tareas pendientes:');
    console.log('   1. Obtener ETH para Judge wallet (faucet)');
    console.log('   2. Configurar RPC dedicado en .env (Alchemy/Infura)');
    console.log('   3. Volver a ejecutar: node scripts/verify-setup.js');
    console.log('\n');
  }
}

// Ejecutar
verifySetup().catch(console.error);
