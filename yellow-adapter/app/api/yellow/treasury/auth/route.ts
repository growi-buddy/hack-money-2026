/**
 * POST /api/yellow/treasury/auth
 * Conecta al WebSocket de Yellow y verifica configuración
 */

import { NextResponse } from "next/server";
import { getSimpleTreasuryManager } from "@/src/yellow/treasury-simple";

export const runtime = "nodejs";

export async function POST() {
  try {
    const treasury = getSimpleTreasuryManager();
    
    // Conectar al WebSocket
    await treasury.ensureConnected();
    
    const state = treasury.getState();
    
    return NextResponse.json({
      ok: true,
      data: {
        treasuryAddress: state.treasuryAddress,
        chainId: state.chainId,
        status: state.status,
        message: "Connected to Yellow Sandbox",
        note: "Full auth protocol implementation pending",
      },
    });
  } catch (error: any) {
    console.error("[API] /api/yellow/treasury/auth error:", error);
    
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "AUTH_ERROR",
          message: error.message || "Failed to connect to Yellow",
        },
      },
      { status: 500 }
    );
  }
}
