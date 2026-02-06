/**
 * ENS Text Record Reader (Server-Only)
 * 
 * Lee text records de ENS nombres sin exponer RPC_URL al cliente.
 * 
 * GET /api/ens/text?name=test1.growi.eth&key=growi:payoutRoot
 */

import { NextRequest, NextResponse } from "next/server";
import { publicClient } from "@/lib/chain/clients";
import { normalize } from "viem/ens";

/**
 * GET /api/ens/text?name=X&key=Y
 * 
 * Lee un text record de ENS.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Obtener query params
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const key = searchParams.get("key");

    // Validar params
    if (!name) {
      return NextResponse.json(
        {
          ok: false,
          error: "VALIDATION_ERROR",
          details: "Missing required query parameter: name",
        },
        { status: 400 }
      );
    }

    if (!key) {
      return NextResponse.json(
        {
          ok: false,
          error: "VALIDATION_ERROR",
          details: "Missing required query parameter: key",
        },
        { status: 400 }
      );
    }

    console.log(`📖 Reading ENS text record:`, { name, key });

    // Normalizar nombre ENS
    const normalizedName = normalize(name);

    // Leer text record usando viem
    const value = await publicClient.getEnsText({
      name: normalizedName,
      key,
    });

    console.log(`✅ Text record read:`, { name: normalizedName, key, value });

    return NextResponse.json({
      ok: true,
      name: normalizedName,
      key,
      value: value || null,
    });
  } catch (error) {
    console.error("❌ Error reading ENS text record:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "ENS_READ_ERROR",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
