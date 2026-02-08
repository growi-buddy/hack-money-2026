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
  console.log('[API] ========================================');
  console.log('[API] POST /api/yellow/app-sessions/create');
  console.log('[API] ========================================');

  try {
    // Parsear body
    const body = await request.json();
    console.log('[API] Request body:', JSON.stringify(body, null, 2));

    // Validar
    console.log('[API] Validating with schema...');
    const input = CreateSessionSchema.parse(body);
    console.log('[API] ✅ Validation passed');

    // Crear sesión
    console.log('[API] Getting service instance...');
    const service = getAppSessionService();
    console.log('[API] Calling createSession...');
    const session = await service.createSession(input);
    console.log('[API] ✅ Session created:', session.appSessionId);

    return NextResponse.json({
      ok: true,
      data: {
        appSessionId: session.appSessionId,
        definition: session.definition,
        allocations: session.allocations,
      },
    });
  } catch (error) {
    const err = error as Error;
    
    console.error('[API] ========================================');
    console.error('[API] ❌ ERROR');
    console.error('[API] ========================================');
    console.error('[API] Error message:', err.message);
    console.error('[API] Error stack:', err.stack);

    if (error instanceof ZodError) {
      console.error('[API] Validation errors:', error.issues);
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
          message: err.message || "Failed to create session",
        },
      },
      { status: 500 }
    );
  }
}
