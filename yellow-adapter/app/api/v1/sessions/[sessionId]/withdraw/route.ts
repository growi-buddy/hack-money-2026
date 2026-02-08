/**
 * POST /api/v1/sessions/[sessionId]/withdraw
 * Genera intents para withdraw (STUB)
 */

import { NextRequest } from "next/server";
import { fail, ErrorCodes } from "@/src/lib/contracts/api";
import { WithdrawSchema } from "@/src/lib/contracts/session";
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
    const input = WithdrawSchema.parse(body);

    // Validar que la sesión existe
    const session = store.getSession(sessionId);
    if (!session) {
      return fail(404, ErrorCodes.NOT_FOUND, "Session not found", {
        sessionId,
      });
    }

    // TODO: Construir intents reales para withdraw
    return fail(
      501,
      ErrorCodes.NOT_IMPLEMENTED,
      "Withdraw intents generation not yet implemented",
      {
        input: {
          amount: input.amount,
          toAddress: input.toAddress || session.managerAddress,
        },
        todoSteps: [
          "Generate state update with WITHDRAW intent",
          "Validate withdrawal against session balance",
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
      "Failed to generate withdraw intents"
    );
  }
}
