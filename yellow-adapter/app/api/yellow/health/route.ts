/**
 * GET /api/yellow/health
 * Health check con info de NitroRPC y chains configuradas
 */

import { NextResponse } from "next/server";
import { getChannelManager } from "@/src/yellow/channel";
import { getSupportedChains, CLEARNODE_SANDBOX } from "@/src/yellow/config";

export const runtime = "nodejs";

export async function GET() {
  try {
    const startTime = Date.now();
    const channelManager = getChannelManager();

    // Intentar conectar y medir latencia
    let nitroRpcStatus = {
      connected: false,
      latencyMs: 0,
      url: CLEARNODE_SANDBOX.wsUrl,
    };

    try {
      await channelManager["rpcClient"].ensureConnected();
      nitroRpcStatus.connected = true;
      nitroRpcStatus.latencyMs = Date.now() - startTime;
    } catch (error) {
      console.error("[Health] NitroRPC connection failed:", error);
      nitroRpcStatus.connected = false;
    }

    // Chains configuradas
    const chains = getSupportedChains().map((chain) => ({
      chainId: chain.chainId,
      name: chain.name,
      custodyContract: chain.custodyContract,
    }));

    return NextResponse.json({
      ok: true,
      service: "yellow-adapter",
      integration: "yellow-sandbox",
      timestamp: new Date().toISOString(),
      nitroRpc: nitroRpcStatus,
      chainsConfigured: chains,
    });
  } catch (error: any) {
    console.error("[Health] Error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "HEALTH_CHECK_ERROR",
          message: error.message || "Health check failed",
        },
      },
      { status: 500 }
    );
  }
}
