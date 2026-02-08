/**
 * POST /api/yellow/treasury/faucet
 * Solicita tokens del faucet para la treasury
 */

import { NextResponse } from "next/server";
import { getSimpleTreasuryManager } from "@/src/yellow/treasury-simple";

export const runtime = "nodejs";

export async function POST() {
  try {
    const treasury = getSimpleTreasuryManager();
    
    // Solicitar tokens del faucet
    const faucetResponse = await treasury.requestFaucetTokens();
    
    return NextResponse.json({
      ok: true,
      data: faucetResponse,
      message: "Faucet tokens requested successfully",
    });
  } catch (error: any) {
    console.error("[API] /api/yellow/treasury/faucet error:", error);
    
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "FAUCET_ERROR",
          message: error.message || "Failed to request faucet tokens",
        },
      },
      { status: 500 }
    );
  }
}
