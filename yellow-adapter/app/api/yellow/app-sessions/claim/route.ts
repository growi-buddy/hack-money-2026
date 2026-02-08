/**
 * POST /api/yellow/app-sessions/claim
 * Ejecuta un claim/withdraw (WITHDRAW intent) de una App Session
 */

import { NextRequest, NextResponse } from "next/server";
import { getAppSessionService } from "@/src/lib/yellow/appSessions/service";
import { ClaimSchema } from "@/src/lib/yellow/appSessions/types";
import { ZodError } from "zod";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // Parsear y validar body
    const body = await request.json();
    const input = ClaimSchema.parse(body);

    // Ejecutar claim
    const service = getAppSessionService();
    const session = await service.claim(input);

    return NextResponse.json({
      ok: true,
      data: {
        appSessionId: session.appSessionId,
        version: session.version,
        allocations: session.allocations,
        updatedAt: session.updatedAt,
      },
      message: `Claim executed: ${input.amountUsdc} withdrawn by ${input.participant}`,
    });
  } catch (error) {
    const err = error as Error;
    console.error("[API] /api/yellow/app-sessions/claim error:", err);

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
          code: "CLAIM_ERROR",
          message: err.message || "Failed to execute claim",
        },
      },
      { status: 500 }
    );
  }
}
