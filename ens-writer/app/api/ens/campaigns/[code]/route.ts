import { NextRequest, NextResponse } from "next/server";
import { normalize } from "viem/ens";
import { publicClient } from "@/lib/chain/clients";
import { ENS_ROOT_NAME } from "@/lib/chain/config";

/**
 * Verifica la autenticación mediante x-api-key
 */
function checkAuth(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key");
  const expectedKey = process.env.ENS_WRITER_API_KEY;
  
  if (!expectedKey) {
    console.error("ENS_WRITER_API_KEY no está configurada");
    return false;
  }
  
  return apiKey === expectedKey;
}

/**
 * Lee un text record desde ENS, devuelve null si no existe
 */
async function getTextRecordSafe(fqdn: string, key: string): Promise<string | null> {
  try {
    const value = await publicClient.getEnsText({
      name: normalize(fqdn),
      key,
    });
    return value || null;
  } catch (error) {
    // Si el record no existe o hay error, devolver null
    console.warn(`  Record "${key}" not found or error:`, error);
    return null;
  }
}

/**
 * GET /api/ens/campaigns/[code]
 * Lee los text records de una campaña desde ENS (blockchain)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    // Verificar autenticación
    if (!checkAuth(request)) {
      return NextResponse.json(
        { ok: false, error: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    // Obtener código de la URL
    const { code } = await params;

    // Construir FQDN
    const fqdn = `${code.toLowerCase()}.${ENS_ROOT_NAME}`;

    console.log(`🔍 Reading ENS records for: ${fqdn}`);

    // Leer todos los text records en paralelo
    const [termsURI, termsHash, yellowChannelId, settlementTx, payoutRoot] =
      await Promise.all([
        getTextRecordSafe(fqdn, "growi:termsURI"),
        getTextRecordSafe(fqdn, "growi:termsHash"),
        getTextRecordSafe(fqdn, "growi:yellowChannelId"),
        getTextRecordSafe(fqdn, "growi:settlementTx"),
        getTextRecordSafe(fqdn, "growi:payoutRoot"),
      ]);

    console.log("✅ ENS records read:", {
      termsURI: termsURI ? "✓" : "✗",
      termsHash: termsHash ? "✓" : "✗",
      yellowChannelId: yellowChannelId ? "✓" : "✗",
      settlementTx: settlementTx ? "✓" : "✗",
      payoutRoot: payoutRoot ? "✓" : "✗",
    });

    return NextResponse.json(
      {
        ok: true,
        fqdn,
        records: {
          termsURI,
          termsHash,
          yellowChannelId,
          settlementTx,
          payoutRoot,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reading ENS records:", error);
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
