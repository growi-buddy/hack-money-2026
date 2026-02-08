/**
 * Runtime Configuration Validation
 * Valida env vars requeridas con Zod para fail-fast
 */

import { z } from 'zod';

// Schema para validación de addresses Ethereum
const ethereumAddressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, 'Must be a valid Ethereum address (0x + 40 hex chars)');

// Schema para private keys
const privateKeySchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{64}$/, 'Must be a valid private key (0x + 64 hex chars)');

// Schema para URLs
const urlSchema = z.string().url('Must be a valid URL');

/**
 * Config para sistema OFF-CHAIN (Yellow App Sessions)
 */
const offChainConfigSchema = z.object({
  // Platform wallets (Growi)
  YELLOW_JUDGE_PK: privateKeySchema,
  YELLOW_FEE_ADDRESS: ethereumAddressSchema,
  
  // Yellow Network
  YELLOW_WS_URL: urlSchema.default('wss://clearnet-sandbox.yellow.com/ws'),
  YELLOW_CHAIN_ID: z.coerce.number().int().positive().default(84532),
});

/**
 * Config para sistema ON-CHAIN (Base Sepolia)
 */
const onChainConfigSchema = z.object({
  // Contratos Yellow Network
  YELLOW_CUSTODY_ADDRESS: ethereumAddressSchema,
  YELLOW_ADJUDICATOR_ADDRESS: ethereumAddressSchema,
  YELLOW_USDC_ADDRESS: ethereumAddressSchema,
  
  // RPC
  BASE_SEPOLIA_RPC_URL: urlSchema,
  YELLOW_CHAIN_ID: z.coerce.number().int().positive().default(84532),
  
  // Platform wallets (también necesarios on-chain)
  YELLOW_JUDGE_PK: privateKeySchema,
  YELLOW_FEE_ADDRESS: ethereumAddressSchema,
});

export type OffChainConfig = z.infer<typeof offChainConfigSchema>;
export type OnChainConfig = z.infer<typeof onChainConfigSchema>;

/**
 * Valida y retorna config OFF-CHAIN
 * Lanza error claro si falta algo
 */
export function validateOffChainConfig(): OffChainConfig {
  try {
    return offChainConfigSchema.parse({
      YELLOW_JUDGE_PK: process.env.YELLOW_JUDGE_PK,
      YELLOW_FEE_ADDRESS: process.env.YELLOW_FEE_ADDRESS,
      YELLOW_WS_URL: process.env.YELLOW_WS_URL,
      YELLOW_CHAIN_ID: process.env.YELLOW_CHAIN_ID,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missing = error.issues.map(issue => `  - ${issue.path.join('.')}: ${issue.message}`).join('\n');
      throw new Error(
        `❌ Configuración OFF-CHAIN incompleta:\n${missing}\n\n` +
        `Revisa tu archivo .env y asegúrate de tener:\n` +
        `  - YELLOW_JUDGE_PK (private key del Judge)\n` +
        `  - YELLOW_FEE_ADDRESS (address para fees)`
      );
    }
    throw error;
  }
}

/**
 * Valida y retorna config ON-CHAIN
 * Lanza error claro si falta algo
 */
export function validateOnChainConfig(): OnChainConfig {
  try {
    return onChainConfigSchema.parse({
      YELLOW_CUSTODY_ADDRESS: process.env.YELLOW_CUSTODY_ADDRESS,
      YELLOW_ADJUDICATOR_ADDRESS: process.env.YELLOW_ADJUDICATOR_ADDRESS,
      YELLOW_USDC_ADDRESS: process.env.YELLOW_USDC_ADDRESS,
      BASE_SEPOLIA_RPC_URL: process.env.BASE_SEPOLIA_RPC_URL,
      YELLOW_CHAIN_ID: process.env.YELLOW_CHAIN_ID,
      YELLOW_JUDGE_PK: process.env.YELLOW_JUDGE_PK,
      YELLOW_FEE_ADDRESS: process.env.YELLOW_FEE_ADDRESS,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missing = error.issues.map(issue => `  - ${issue.path.join('.')}: ${issue.message}`).join('\n');
      throw new Error(
        `❌ Configuración ON-CHAIN incompleta:\n${missing}\n\n` +
        `Revisa tu archivo .env y asegúrate de tener:\n` +
        `  - YELLOW_CUSTODY_ADDRESS\n` +
        `  - YELLOW_ADJUDICATOR_ADDRESS\n` +
        `  - YELLOW_USDC_ADDRESS (ytest.usd token)\n` +
        `  - BASE_SEPOLIA_RPC_URL\n` +
        `  - YELLOW_JUDGE_PK\n` +
        `  - YELLOW_FEE_ADDRESS`
      );
    }
    throw error;
  }
}

/**
 * Mapeo de errores comunes para mensajes amigables
 */
export function mapErrorToUserMessage(error: any): string {
  const errorMsg = error?.message?.toLowerCase() || '';
  
  // Errores de wallet/conexión
  if (errorMsg.includes('user rejected') || errorMsg.includes('user denied')) {
    return '❌ Transacción rechazada. Aprueba la transacción en tu wallet para continuar.';
  }
  
  if (errorMsg.includes('insufficient funds') || errorMsg.includes('insufficient balance')) {
    return '❌ Fondos insuficientes. Verifica que tengas suficiente ETH para gas y USDC para el depósito.';
  }
  
  if (errorMsg.includes('websocket') || errorMsg.includes('connection')) {
    return '❌ Error de conexión con Yellow Network. Verifica tu conexión a internet e intenta nuevamente.';
  }
  
  if (errorMsg.includes('invalid address')) {
    return '❌ Address inválida. Verifica que las addresses sean correctas (0x + 40 caracteres hex).';
  }
  
  if (errorMsg.includes('nonce')) {
    return '❌ Error de nonce. Intenta resetear tu wallet o espera unos segundos.';
  }
  
  // Errores de config
  if (errorMsg.includes('configuración') || errorMsg.includes('not configured')) {
    return '❌ Configuración incompleta. Contacta al administrador del sistema.';
  }
  
  // Default: mostrar error original pero limpio
  return `❌ ${error?.message || 'Error desconocido'}`;
}
