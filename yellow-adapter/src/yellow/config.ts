/**
 * Yellow Network Configuration
 * Chain configs, RPC URLs, contract addresses
 */

export interface ChainConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  custodyContract: `0x${string}`;
  adjudicatorContract: `0x${string}`;
  usdcAddress: `0x${string}`;
  explorerUrl: string;
}

/**
 * Yellow ClearNode configuration
 */
export interface ClearNodeConfig {
  wsUrl: string;
  httpUrl?: string;
  environment: "sandbox" | "production";
}

/**
 * Chains soportadas en Yellow Sandbox
 * Fuente: https://docs.yellow.org/docs/learn/introduction/supported-chains#supported-assets
 */
export const YELLOW_CHAINS: Record<number, ChainConfig> = {
  // Base Sepolia
  84532: {
    chainId: 84532,
    name: "Base Sepolia",
    rpcUrl: process.env.BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org",
    custodyContract: "0x9f5314FB00C98Eb274B83001e37902c91b332e8A",
    adjudicatorContract: "0x0b86882d987ED2005d683bC24E70492C67F1FBE1",
    usdcAddress: "0xDB9F293e3898c9E5536A3be1b0C56c89d2b32DEb", // ytest.usd
    explorerUrl: "https://sepolia.basescan.org",
  },
  // Polygon Amoy
  80002: {
    chainId: 80002,
    name: "Polygon Amoy",
    rpcUrl: process.env.POLYGON_AMOY_RPC_URL || "https://rpc-amoy.polygon.technology",
    custodyContract: "0x9f5314FB00C98Eb274B83001e37902c91b332e8A",
    adjudicatorContract: "0x0b86882d987ED2005d683bC24E70492C67F1FBE1",
    usdcAddress: "0xDB9F293e3898c9E5536A3be1b0C56c89d2b32DEb", // ytest.usd
    explorerUrl: "https://amoy.polygonscan.com",
  },
  // Ethereum Sepolia (no soportado en Yellow según docs anteriores, pero dejamos para referencia)
  11155111: {
    chainId: 11155111,
    name: "Ethereum Sepolia",
    rpcUrl: process.env.SEPOLIA_RPC_URL || "https://rpc.sepolia.org",
    custodyContract: "0x9f5314FB00C98Eb274B83001e37902c91b332e8A",
    adjudicatorContract: "0x0b86882d987ED2005d683bC24E70492C67F1FBE1",
    usdcAddress: "0xDB9F293e3898c9E5536A3be1b0C56c89d2b32DEb", // ytest.usd
    explorerUrl: "https://sepolia.etherscan.io",
  },
};

/**
 * ClearNode configuration (Sandbox)
 */
export const CLEARNODE_SANDBOX: ClearNodeConfig = {
  wsUrl: process.env.YELLOW_WS_URL || "wss://clearnet-sandbox.yellow.com/ws",
  httpUrl: process.env.YELLOW_HTTP_URL,
  environment: "sandbox",
};

/**
 * Get chain config by chainId
 */
export function getChainConfig(chainId: number): ChainConfig | undefined {
  return YELLOW_CHAINS[chainId];
}

/**
 * Get all supported chains
 */
export function getSupportedChains(): ChainConfig[] {
  return Object.values(YELLOW_CHAINS);
}

/**
 * Validate chainId is supported
 */
export function isChainSupported(chainId: number): boolean {
  return chainId in YELLOW_CHAINS;
}
