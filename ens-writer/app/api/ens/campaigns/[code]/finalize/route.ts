import { NextRequest, NextResponse } from "next/server";
import { finalizeCampaignOnEns } from "@/lib/ensWriter";

interface FinalizeCampaignBody {
  settlementTx: string;
  payoutRoot: string;
}

interface ValidationError {
  field: string;
  message: string;
}

/**
 * Valida un hash de transacción (0x + 64 caracteres hex = 66 total)
 */
function validateTxHash(value: unknown, fieldName: string): ValidationError | null {
  if (typeof value !== "string") {
    return { field: fieldName, message: `${fieldName} must be a string` };
  }
  if (!value.startsWith("0x")) {
    return { field: fieldName, message: `${fieldName} must start with 0x` };
  }
  if (value.length !== 66) {
    return { field: fieldName, message: `${fieldName} must be 66 characters (0x + 64 hex)` };
  }
  if (!/^0x[0-9a-fA-F]{64}$/.test(value)) {
    return { field: fieldName, message: `${fieldName} must be valid hex` };
  }
  return null;
}

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
 * PATCH /api/ens/campaigns/[code]/finalize
 * Finaliza una campaña escribiendo settlement y payout records
 */
export async function PATCH(
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

    // Parse body
    let body: FinalizeCampaignBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", details: [{ field: "body", message: "Invalid JSON" }] },
        { status: 400 }
      );
    }

    // Validar campos
    const errors: ValidationError[] = [];
    
    const settlementTxError = validateTxHash(body.settlementTx, "settlementTx");
    if (settlementTxError) errors.push(settlementTxError);
    
    const payoutRootError = validateTxHash(body.payoutRoot, "payoutRoot");
    if (payoutRootError) errors.push(payoutRootError);

    if (errors.length > 0) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", details: errors },
        { status: 400 }
      );
    }

    // Finalizar campaña en ENS
    const result = await finalizeCampaignOnEns({
      code,
      settlementTx: body.settlementTx,
      payoutRoot: body.payoutRoot,
    });

    return NextResponse.json(
      {
        ok: true,
        code,
        fqdn: result.fqdn,
        node: result.node,
        txHashes: result.txHashes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error finalizing campaign:", error);
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
