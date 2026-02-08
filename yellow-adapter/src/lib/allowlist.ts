/**
 * Configuración de chains y assets soportados
 */

import { getSupportedChainIds, getCustodyContracts } from "./env";

export interface SupportedChain {
  chainId: number;
  name: string;
  type: "testnet" | "mainnet";
}

/**
 * Mapeo de chain IDs a nombres
 * TODO: actualizar con nombres oficiales cuando se definan
 */
const CHAIN_NAMES: Record<number, { name: string; type: "testnet" | "mainnet" }> = {
  11155111: { name: "Sepolia", type: "testnet" },
  84532: { name: "Base Sepolia", type: "testnet" },
  80002: { name: "Polygon Amoy", type: "testnet" },
  1: { name: "Ethereum", type: "mainnet" },
  8453: { name: "Base", type: "mainnet" },
  137: { name: "Polygon", type: "mainnet" },
};

/**
 * Obtiene las chains soportadas con metadata
 */
export function getSupportedChains(): SupportedChain[] {
  const chainIds = getSupportedChainIds();
  
  return chainIds.map((chainId) => {
    const info = CHAIN_NAMES[chainId];
    
    if (info) {
      return {
        chainId,
        name: info.name,
        type: info.type,
      };
    }
    
    // Fallback para chains no mapeados
    return {
      chainId,
      name: `Chain ${chainId}`,
      type: "testnet",
    };
  });
}

/**
 * Obtiene los custody contracts por chain
 * TODO: actualizar con addresses reales de Custody contract cuando estén definidos
 */
export function getCustodyContractsByChain(): Record<number, string | undefined> {
  const { contracts } = getCustodyContracts();
  return contracts;
}

/**
 * Verifica si el JSON de custody contracts es válido
 */
export function isCustodyContractsValid(): boolean {
  const { valid } = getCustodyContracts();
  return valid;
}
