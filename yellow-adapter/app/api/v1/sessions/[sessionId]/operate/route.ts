/**
 * POST /api/v1/sessions/[sessionId]/operate
 * Genera intents para operación (STUB)
 */

import { NextRequest } from "next/server";
import { fail, ErrorCodes } from "@/src/lib/contracts/api";
import { OperateSchema } from "@/src/lib/contracts/session";
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
    const input = OperateSchema.parse(body);

    // Validar que la sesión existe
    const session = store.getSession(sessionId);
    if (!session) {
      return fail(404, ErrorCodes.NOT_FOUND, "Session not found", {
        sessionId,
      });
    }

    // TODO: Construir intents reales para operate
    return fail(
      501,
      ErrorCodes.NOT_IMPLEMENTED,
      "Operate intents generation not yet implemented",
      {
        input: {
          eventId: input.eventId,
          deltaToInfluencer: input.deltaToInfluencer,
          memo: input.memo,
        },
        todoSteps: [
          "Generate state update with OPERATE intent",
          "Collect required signatures based on quorum",
          "Submit to Yellow/Nitrolite clearnode",
        ],
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return fail(400, ErrorCodes.VALIDATION_ERROR, "Validation failed", {
        errors: error.issues,
      });
    }

    return fail(
      500,
      ErrorCodes.INTERNAL_ERROR,
      "Failed to generate operate intents"
    );
  }
}
