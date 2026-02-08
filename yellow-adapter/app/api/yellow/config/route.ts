/**
 * GET /api/yellow/config
 * Devuelve chains soportadas con custody contracts y RPCs
 */

import { NextResponse } from "next/server";
import { getSupportedChains, CLEARNODE_SANDBOX } from "@/src/yellow/config";

export const runtime = "nodejs";

export async function GET() {
  try {
    const chains = getSupportedChains().map((chain) => ({
      chainId: chain.chainId,
      name: chain.name,
      rpcUrl: chain.rpcUrl,
      custodyContract: chain.custodyContract,
      adjudicatorContract: chain.adjudicatorContract,
      usdcAddress: chain.usdcAddress,
      explorerUrl: chain.explorerUrl,
    }));

    return NextResponse.json({
      ok: true,
      data: {
        environment: CLEARNODE_SANDBOX.environment,
        clearNode: {
          wsUrl: CLEARNODE_SANDBOX.wsUrl,
          httpUrl: CLEARNODE_SANDBOX.httpUrl,
        },
        chains,
      },
    });
  } catch (error: any) {
    console.error("[API] /api/yellow/config error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "CONFIG_ERROR",
          message: error.message || "Failed to get config",
        },
      },
      { status: 500 }
    );
  }
}
