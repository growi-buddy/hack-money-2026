/**
 * POST /api/v1/tx/confirm
 * Confirma una transacción
 */

import { NextRequest } from "next/server";
import { ok, fail, ErrorCodes } from "@/src/lib/contracts/api";
import { ConfirmTxSchema, TxRecord } from "@/src/lib/contracts/tx";
import { store } from "@/src/lib/store/memory";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    // Parsear y validar body
    const body = await request.json();
    const input = ConfirmTxSchema.parse(body);

    // Crear record de transacción
    const txRecord: TxRecord = {
      intentId: input.intentId,
      txHash: input.txHash,
      status: input.status,
      createdAt: new Date().toISOString(),
    };

    // Guardar en store
    store.confirmTx(txRecord);

    // Responder con confirmación
    return ok({
      txRecord,
      message: `Transaction ${input.status.toLowerCase()}`,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return fail(400, ErrorCodes.VALIDATION_ERROR, "Validation failed", {
        errors: error.issues,
      });
    }

    return fail(500, ErrorCodes.INTERNAL_ERROR, "Failed to confirm transaction");
  }
}
