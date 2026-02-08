/**
 * POST /api/v1/sessions/[sessionId]/funding-intents
 * Genera intents para funding de una sesión (STUB)
 */

import { NextRequest } from "next/server";
import { fail, ErrorCodes } from "@/src/lib/contracts/api";
import { FundingIntentsSchema } from "@/src/lib/contracts/session";
import { store } from "@/src/lib/store/memory";
import { ZodError } from "zod";
import { randomUUID } from "crypto";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;

  try {
    // Parsear y validar body
    const body = await request.json();
    const input = FundingIntentsSchema.parse(body);

    // Validar que la sesión existe
    const session = store.getSession(sessionId);
    if (!session) {
      return fail(404, ErrorCodes.NOT_FOUND, "Session not found", {
        sessionId,
      });
    }

    // TODO: Construir intents reales para funding
    // Por ahora, retornar 501 con un bundle placeholder
    const placeholderBundle = {
      bundleId: randomUUID(),
      action: "FUNDING" as const,
      sessionId,
      intents: [],
      summary: {
        title: "Funding Session (Not Implemented)",
        steps: [
          `TODO: Approve ERC20 token for amount ${input.amount}`,
          "TODO: Call Yellow custody contract deposit()",
          "TODO: Wait for on-chain confirmation",
        ],
      },
      warnings: [
        "This endpoint is not yet implemented",
        "Calldata generation pending",
      ],
      createdAt: new Date().toISOString(),
    };

    return fail(
      501,
      ErrorCodes.NOT_IMPLEMENTED,
      "Funding intents generation not yet implemented",
      {
        placeholder: placeholderBundle,
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
      "Failed to generate funding intents"
    );
  }
}
