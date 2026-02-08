/**
 * Lectura segura de variables de entorno con defaults
 */

export type YellowEnvironment = "sandbox" | "prod";

/**
 * Obtiene el entorno de Yellow (sandbox o prod)
 */
export function getYellowEnv(): YellowEnvironment {
  const env = process.env.YELLOW_ENV;
  if (env === "prod" || env === "sandbox") {
    return env;
  }
  return "sandbox";
}

/**
 * Obtiene la versión de Nitro RPC
 */
export function getNitroRpcVersion(): string {
  return process.env.YELLOW_NITRO_RPC_VERSION || "0.4";
}

/**
 * Obtiene la URL HTTP del Clearnode
 */
export function getClearnodeHttp(): string | null {
  return process.env.YELLOW_CLEARNODE_HTTP || null;
}

/**
 * Obtiene la URL WebSocket del Clearnode
 */
export function getClearnodeWs(): string | null {
  return process.env.YELLOW_CLEARNODE_WS || null;
}

/**
 * Obtiene los chain IDs soportados
 */
export function getSupportedChainIds(): number[] {
  const chainIdsStr = process.env.SUPPORTED_CHAIN_IDS || "11155111,84532,80002";
  return chainIdsStr
    .split(",")
    .map((id) => parseInt(id.trim(), 10))
    .filter((id) => !isNaN(id));
}

/**
 * Obtiene el mapeo de custody contracts por chain
 * Retorna un objeto con los contracts y un flag de validez
 */
export function getCustodyContracts(): {
  valid: boolean;
  contracts: Record<number, string>;
} {
  const jsonStr = process.env.CUSTODY_CONTRACTS_JSON;
  
  if (!jsonStr) {
    return { valid: true, contracts: {} };
  }

  try {
    const parsed = JSON.parse(jsonStr);
    
    // Convertir keys a números
    const contracts: Record<number, string> = {};
    for (const [key, value] of Object.entries(parsed)) {
      const chainId = parseInt(key, 10);
      if (!isNaN(chainId) && typeof value === "string") {
        contracts[chainId] = value;
      }
    }
    
    return { valid: true, contracts };
  } catch (error) {
    return { valid: false, contracts: {} };
  }
}
