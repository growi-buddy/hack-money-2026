/**
 * POST /api/v1/sessions/[sessionId]/end
 * Finaliza una sesión
 */

import { NextRequest } from "next/server";
import { ok, fail, ErrorCodes } from "@/src/lib/contracts/api";
import { EndSessionSchema } from "@/src/lib/contracts/session";
import { store } from "@/src/lib/store/memory";
import { ZodError } from "zod";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;

  try {
    // Parsear y validar body
    const body = await request.json();
    const input = EndSessionSchema.parse(body);

    // Validar que la sesión existe
    const session = store.getSession(sessionId);
    if (!session) {
      return fail(404, ErrorCodes.NOT_FOUND, "Session not found", {
        sessionId,
      });
    }

    // Validar que la sesión no esté ya terminada
    if (session.status === "ENDED") {
      return fail(400, ErrorCodes.INVALID_STATE, "Session already ended", {
        sessionId,
        currentStatus: session.status,
      });
    }

    // Actualizar status a ENDED
    const updatedSession = store.updateSession(sessionId, {
      status: "ENDED",
    });

    if (!updatedSession) {
      return fail(500, ErrorCodes.INTERNAL_ERROR, "Failed to update session");
    }

    // Responder con sesión actualizada
    return ok(
      {
        session: updatedSession,
        reason: input.reason,
      },
      [`Session ended: ${input.reason}`]
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return fail(400, ErrorCodes.VALIDATION_ERROR, "Validation failed", {
        errors: error.issues,
      });
    }

    return fail(500, ErrorCodes.INTERNAL_ERROR, "Failed to end session");
  }
}
