/**
 * POST /api/yellow/app-sessions/payout
 * Aplica un payout (OPERATE intent) en una App Session
 */

import { NextRequest, NextResponse } from "next/server";
import { getAppSessionService } from "@/src/lib/yellow/appSessions/service";
import { PayoutSchema } from "@/src/lib/yellow/appSessions/types";
import { ZodError } from "zod";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // Parsear y validar body
    const body = await request.json();
    const input = PayoutSchema.parse(body);

    // Aplicar payout
    const service = getAppSessionService();
    const session = await service.applyPayout(input);

    return NextResponse.json({
      ok: true,
      data: {
        appSessionId: session.appSessionId,
        version: session.version,
        allocations: session.allocations,
        updatedAt: session.updatedAt,
      },
      message: `Payout applied: ${input.earnedUsdc} earned, ${input.feeBps} BPS fee`,
    });
  } catch (error) {
    const err = error as Error;
    console.error("[API] /api/yellow/app-sessions/payout error:", err);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Validation failed",
            details: { errors: error.issues },
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "PAYOUT_ERROR",
          message: err.message || "Failed to apply payout",
        },
      },
      { status: 500 }
    );
  }
}
