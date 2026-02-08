/**
 * GET /api/v1/config
 * Devuelve la configuración del servicio
 */

import { NextResponse } from "next/server";
import { SERVICE_NAME, VERSION } from "@/src/lib/service";
import {
  getYellowEnv,
  getNitroRpcVersion,
  getClearnodeHttp,
  getClearnodeWs,
} from "@/src/lib/env";
import {
  getSupportedChains,
  getCustodyContractsByChain,
  isCustodyContractsValid,
} from "@/src/lib/allowlist";

interface ConfigResponse {
  ok: boolean;
  service: {
    name: string;
    version: string;
    env: string;
    nitroRpcVersion: string;
  };
  apiVersion: string;
  intentApi: {
    enabled: boolean;
    format: string;
  };
  chains: Array<{
    chainId: number;
    name: string;
    custodyContract: string | null;
  }>;
  clearnode: {
    http: string | null;
    ws: string | null;
  };
  warnings?: string[];
}

export async function GET(): Promise<NextResponse> {
  const warnings: string[] = [];

  // Verificar validez de custody contracts JSON
  if (!isCustodyContractsValid()) {
    warnings.push("invalid CUSTODY_CONTRACTS_JSON");
  }

  const supportedChains = getSupportedChains();
  const custodyContracts = getCustodyContractsByChain();

  const chains = supportedChains.map((chain) => ({
    chainId: chain.chainId,
    name: chain.name,
    custodyContract: custodyContracts[chain.chainId] || null,
  }));

  // Agregar warning si hay custody contracts sin configurar
  const hasMissingCustody = chains.some((c) => c.custodyContract === null);
  if (hasMissingCustody) {
    warnings.push("Some chains have no custody contract configured");
  }

  const response: ConfigResponse = {
    ok: true,
    service: {
      name: SERVICE_NAME,
      version: VERSION,
      env: getYellowEnv(),
      nitroRpcVersion: getNitroRpcVersion(),
    },
    apiVersion: "v1",
    intentApi: {
      enabled: true,
      format: "EVM_CALLDATA",
    },
    chains,
    clearnode: {
      http: getClearnodeHttp(),
      ws: getClearnodeWs(),
    },
  };

  if (warnings.length > 0) {
    response.warnings = warnings;
  }

  return NextResponse.json(response, { status: 200 });
}
