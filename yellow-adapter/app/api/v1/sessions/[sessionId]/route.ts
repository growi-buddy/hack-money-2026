/**
 * GET /api/v1/sessions/[sessionId]
 * Obtiene información de una sesión
 */

import { NextRequest } from "next/server";
import { ok, fail, ErrorCodes } from "@/src/lib/contracts/api";
import { store } from "@/src/lib/store/memory";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;

  // Buscar sesión
  const session = store.getSession(sessionId);

  if (!session) {
    return fail(404, ErrorCodes.NOT_FOUND, "Session not found", {
      sessionId,
    });
  }

  // Obtener estadísticas
  const stats = store.getSessionStats(sessionId);

  // Responder con sesión completa
  return ok({
    session,
    bundlesCount: stats.bundlesCount,
    recentTxRecords: stats.recentTxRecords,
  });
}
