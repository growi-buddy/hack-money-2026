/**
 * GET /api/yellow/app-sessions/:id
 * Obtiene información de una App Session
 */

import { NextRequest, NextResponse } from "next/server";
import { getAppSessionService } from "@/src/lib/yellow/appSessions/service";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Buscar sesión
    const service = getAppSessionService();
    const session = service.getSession(id);

    if (!session) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "NOT_FOUND",
            message: "App Session not found",
            details: { appSessionId: id },
          },
        },
        { status: 404 }
      );
    }

    // Calcular totales
    const totalAllocated = session.allocations.reduce(
      (sum, alloc) => sum + BigInt(alloc.amount),
      BigInt(0)
    );

    return NextResponse.json({
      ok: true,
      data: {
        session,
        summary: {
          totalAllocated: totalAllocated.toString(),
          participantsCount: session.allocations.length,
          currentVersion: session.version,
        },
      },
    });
  } catch (error: any) {
    console.error("[API] /api/yellow/app-sessions/:id error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "SESSION_ERROR",
          message: error.message || "Failed to get session",
        },
      },
      { status: 500 }
    );
  }
}
