/**
 * GET /api/yellow/treasury/balances
 * Obtiene el balance on-chain de la treasury
 */

import { NextResponse } from "next/server";
import { getSimpleTreasuryManager } from "@/src/yellow/treasury-simple";
import { formatEther } from "viem";

export const runtime = "nodejs";

export async function GET() {
  try {
    const treasury = getSimpleTreasuryManager();
    const state = treasury.getState();
    
    // Obtener balance on-chain
    const balance = await treasury.getChainBalance();
    
    return NextResponse.json({
      ok: true,
      data: {
        treasuryAddress: state.treasuryAddress,
        chainId: state.chainId,
        chainBalance: {
          wei: balance.toString(),
          eth: formatEther(balance),
        },
        note: "Showing on-chain balance. Yellow ledger balance integration pending.",
      },
    });
  } catch (error: any) {
    console.error("[API] /api/yellow/treasury/balances error:", error);
    
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "BALANCES_ERROR",
          message: error.message || "Failed to get balances",
        },
      },
      { status: 500 }
    );
  }
}
