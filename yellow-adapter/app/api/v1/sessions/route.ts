/**
 * POST /api/v1/sessions
 * Crea una nueva sesión
 */

import { NextRequest } from "next/server";
import { ok, fail, ErrorCodes } from "@/src/lib/contracts/api";
import { CreateSessionSchema } from "@/src/lib/contracts/session";
import { store } from "@/src/lib/store/memory";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    // Parsear y validar el body
    const body = await request.json();
    const input = CreateSessionSchema.parse(body);

    // Crear sesión en el store
    const session = store.createSession(input);

    // Responder con la sesión creada
    return ok({ session });
  } catch (error) {
    if (error instanceof ZodError) {
      return fail(400, ErrorCodes.VALIDATION_ERROR, "Validation failed", {
        errors: error.issues,
      });
    }

    return fail(500, ErrorCodes.INTERNAL_ERROR, "Failed to create session");
  }
}
