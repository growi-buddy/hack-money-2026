/**
 * Campaign Payouts Endpoint
 * 
 * Ejemplo de uso de los repositorios de Supabase.
 * 
 * GET  /api/campaigns/:code/payouts - Listar payouts de una campaña
 * POST /api/campaigns/:code/payouts - Agregar/actualizar payouts
 */

import { NextRequest, NextResponse } from "next/server";
import {
  getPayoutsByCampaign,
  upsertPayouts,
  getCampaignByCode,
  countPayoutsByCampaign,
  getTotalPayoutMicrosByCampaign,
} from "@/app/lib/repo";

interface RouteContext {
  params: Promise<{
    code: string;
  }>;
}

/**
 * GET /api/campaigns/:code/payouts
 * 
 * Lista todos los payouts de una campaña.
 */
export async function GET(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const { code } = await context.params;

    // Verificar que la campaña exista
    const campaign = await getCampaignByCode(code);
    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    // Obtener payouts
    const payouts = await getPayoutsByCampaign(code);
    const count = await countPayoutsByCampaign(code);
    const totalMicros = await getTotalPayoutMicrosByCampaign(code);

    return NextResponse.json({
      campaignCode: code,
      payouts,
      stats: {
        count,
        totalMicros,
      },
    });
  } catch (error) {
    console.error("[GET /api/campaigns/:code/payouts] Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/campaigns/:code/payouts
 * 
 * Agregar o actualizar payouts para una campaña.
 * 
 * Body:
 * {
 *   "payouts": [
 *     { "wallet": "0x...", "amount_micros": "1000000" },
 *     { "wallet": "0x...", "amount_micros": "2000000" }
 *   ]
 * }
 */
export async function POST(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const { code } = await context.params;

    // Verificar que la campaña exista
    const campaign = await getCampaignByCode(code);
    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    // Parsear body
    const body = await request.json();
    const { payouts } = body;

    if (!Array.isArray(payouts) || payouts.length === 0) {
      return NextResponse.json(
        { error: "payouts must be a non-empty array" },
        { status: 400 }
      );
    }

    // Validar estructura
    for (const payout of payouts) {
      if (!payout.wallet || typeof payout.wallet !== "string") {
        return NextResponse.json(
          { error: "Each payout must have a valid wallet address" },
          { status: 400 }
        );
      }
      if (!payout.amount_micros || typeof payout.amount_micros !== "string") {
        return NextResponse.json(
          { error: "Each payout must have amount_micros as string" },
          { status: 400 }
        );
      }
    }

    // Insertar/actualizar payouts
    const insertedPayouts = await upsertPayouts(code, payouts);

    return NextResponse.json(
      {
        message: "Payouts upserted successfully",
        campaignCode: code,
        count: insertedPayouts.length,
        payouts: insertedPayouts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[POST /api/campaigns/:code/payouts] Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
