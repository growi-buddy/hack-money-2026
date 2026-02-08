/**
 * Yellow Environment Configuration
 * Valida y exporta variables de entorno para Yellow Sandbox
 */

export interface YellowEnvConfig {
  wsUrl: string;
  chainId: number;
  custodyAddress: `0x${string}`;
  adjudicatorAddress: `0x${string}`;
  treasuryPrivateKey: `0x${string}`;
  treasuryRpcUrl: string;
  faucetUrl: string;
}

function validateAddress(value: string | undefined, name: string): `0x${string}` {
  if (!value) {
    throw new Error(`${name} is required`);
  }
  
  if (!/^0x[a-fA-F0-9]{40}$/.test(value)) {
    throw new Error(`${name} must be a valid Ethereum address (0x + 40 hex chars)`);
  }
  
  return value as `0x${string}`;
}

function validatePrivateKey(value: string | undefined): `0x${string}` {
  if (!value) {
    throw new Error("TREASURY_PRIVATE_KEY is required");
  }
  
  if (!/^0x[a-fA-F0-9]{64}$/.test(value)) {
    throw new Error("TREASURY_PRIVATE_KEY must be a valid private key (0x + 64 hex chars)");
  }
  
  return value as `0x${string}`;
}

function validateChainId(value: string | undefined): number {
  if (!value) {
    throw new Error("YELLOW_CHAIN_ID is required");
  }
  
  const chainId = parseInt(value, 10);
  if (isNaN(chainId) || chainId <= 0) {
    throw new Error("YELLOW_CHAIN_ID must be a positive integer");
  }
  
  return chainId;
}

function validateUrl(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`${name} is required`);
  }
  
  try {
    new URL(value);
    return value;
  } catch {
    throw new Error(`${name} must be a valid URL`);
  }
}

/**
 * Carga y valida la configuración de Yellow desde variables de entorno
 */
export function loadYellowEnv(): YellowEnvConfig {
  return {
    wsUrl: validateUrl(
      process.env.YELLOW_WS_URL || "wss://clearnet-sandbox.yellow.com/ws",
      "YELLOW_WS_URL"
    ),
    chainId: validateChainId(process.env.YELLOW_CHAIN_ID),
    custodyAddress: validateAddress(
      process.env.YELLOW_CUSTODY_ADDRESS,
      "YELLOW_CUSTODY_ADDRESS"
    ),
    adjudicatorAddress: validateAddress(
      process.env.YELLOW_ADJUDICATOR_ADDRESS,
      "YELLOW_ADJUDICATOR_ADDRESS"
    ),
    treasuryPrivateKey: validatePrivateKey(process.env.TREASURY_PRIVATE_KEY),
    treasuryRpcUrl: validateUrl(process.env.TREASURY_RPC_URL, "TREASURY_RPC_URL"),
    faucetUrl: validateUrl(
      process.env.YELLOW_FAUCET_URL || "https://clearnet-sandbox.yellow.com/faucet/requestTokens",
      "YELLOW_FAUCET_URL"
    ),
  };
}

/**
 * Singleton de configuración
 */
let cachedConfig: YellowEnvConfig | null = null;

export function getYellowEnv(): YellowEnvConfig {
  if (!cachedConfig) {
    cachedConfig = loadYellowEnv();
  }
  return cachedConfig;
}
