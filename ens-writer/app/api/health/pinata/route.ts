/**
 * Health Check Endpoint para Pinata
 * 
 * Valida que la configuración de Pinata esté correcta y funcional.
 * 
 * GET /api/health/pinata
 * 
 * Respuestas:
 * - 200: Configuración correcta
 * - 500: Error en configuración o conexión
 */

import { NextResponse } from "next/server";
import { testPinataConnection } from "@/lib/pinata/client";

export async function GET() {
  try {
    // Validar que la variable de entorno exista
    const hasJWT = !!process.env.PINATA_JWT;

    if (!hasJWT) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing environment variable",
          details: "PINATA_JWT is not configured",
          env: {
            hasJWT: false,
          },
        },
        { status: 500 }
      );
    }

    // Test de conexión
    const isConnected = await testPinataConnection();

    if (!isConnected) {
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to connect to Pinata",
          details: "Connection test failed. Check your PINATA_JWT.",
          env: {
            hasJWT: true,
          },
        },
        { status: 500 }
      );
    }

    // Todo OK
    return NextResponse.json({
      ok: true,
      message: "Pinata connection successful",
      env: {
        hasJWT: true,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Pinata Health Check] Unexpected error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Unexpected error during health check",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
