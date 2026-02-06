/**
 * Configuración de chain y ENS (server-only)
 */

// Validar que las variables de entorno existen
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// Private key of the wallet that will sign transactions
export const ENS_WRITER_PRIVATE_KEY = getEnvVar("ENS_WRITER_PRIVATE_KEY") as `0x${string}`;

// RPC URL
export const RPC_URL = getEnvVar("RPC_URL");

// Chain ID (e.g., 1 = mainnet, 11155111 = sepolia)
export const CHAIN_ID = parseInt(getEnvVar("CHAIN_ID"), 10);

// ENS root name
export const ENS_ROOT_NAME = getEnvVar("ENS_ROOT_NAME");

// Validar formato de private key
if (!ENS_WRITER_PRIVATE_KEY.startsWith("0x")) {
  throw new Error("ENS_WRITER_PRIVATE_KEY must start with 0x");
}

if (ENS_WRITER_PRIVATE_KEY.length !== 66) {
  throw new Error("ENS_WRITER_PRIVATE_KEY must be 66 characters (0x + 64 hex)");
}

// Validar chain ID
if (isNaN(CHAIN_ID) || CHAIN_ID <= 0) {
  throw new Error("CHAIN_ID must be a positive number");
}

// Log configuration (without exposing private key)
console.log("🔗 Chain Config:", {
  chainId: CHAIN_ID,
  rpcUrl: RPC_URL,
  ensRootName: ENS_ROOT_NAME,
  privateKeyConfigured: "✓",
});
