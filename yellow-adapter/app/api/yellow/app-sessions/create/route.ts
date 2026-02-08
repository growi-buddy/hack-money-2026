/**
 * POST /api/yellow/app-sessions/create
 * Crea una nueva App Session con presupuesto inicial
 */

import { NextRequest, NextResponse } from "next/server";
import { getAppSessionService } from "@/src/lib/yellow/appSessions/service";
import { CreateSessionSchema } from "@/src/lib/yellow/appSessions/types";
import { ZodError } from "zod";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // Parsear y validar body
    const body = await request.json();
    const input = CreateSessionSchema.parse(body);

    // Crear sesión
    const service = getAppSessionService();
    const session = await service.createSession(input);

    return NextResponse.json({
      ok: true,
      data: {
        appSessionId: session.appSessionId,
        definition: session.definition,
        allocations: session.allocations,
        version: session.version,
        createdAt: session.createdAt,
      },
    });
  } catch (error: any) {
    console.error("[API] /api/yellow/app-sessions/create error:", error);

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
          code: "SESSION_CREATE_ERROR",
          message: error.message || "Failed to create session",
        },
      },
      { status: 500 }
    );
  }
}
