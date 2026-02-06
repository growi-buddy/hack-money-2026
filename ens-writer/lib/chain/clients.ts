/**
 * Clientes de viem para interactuar con la blockchain (server-only)
 */

import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet, sepolia } from "viem/chains";
import { CHAIN_ID, RPC_URL, ENS_WRITER_PRIVATE_KEY } from "./config";

// Mapear chain ID a chain de viem
function getChain(chainId: number) {
  switch (chainId) {
    case 1:
      return mainnet;
    case 11155111:
      return sepolia;
    default:
      // Para chains custom, crear un objeto chain básico
      return {
        id: chainId,
        name: `Custom Chain ${chainId}`,
        nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
        rpcUrls: {
          default: { http: [RPC_URL] },
          public: { http: [RPC_URL] },
        },
      } as const;
  }
}

const chain = getChain(CHAIN_ID);

/**
 * Account derivada de la private key
 */
export const account = privateKeyToAccount(ENS_WRITER_PRIVATE_KEY);

/**
 * Public client para leer datos de la blockchain
 */
export const publicClient = createPublicClient({
  chain,
  transport: http(RPC_URL),
});

/**
 * Wallet client para firmar y enviar transacciones
 */
export const walletClient = createWalletClient({
  account,
  chain,
  transport: http(RPC_URL),
});

console.log("✅ Viem clients initialized:", {
  account: account.address,
  chainId: chain.id,
  chainName: chain.name,
});
