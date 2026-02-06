import { NextRequest, NextResponse } from "next/server";
import { finalizeCampaignOnEns } from "@/lib/ensWriter";
import { normalizePayouts } from "@/lib/payouts/normalizePayouts";
import { generatePayoutMerkleTree } from "@/lib/merkle/payoutMerkle";
import {
  getCampaignByCode,
  updateCampaignFinalize,
  upsertPayouts,
} from "@/app/lib/repo";

interface FinalizeCampaignBody {
  settlementTx: string;
  payouts: Array<[string, string]>; // [[wallet, amountMicros], ...]
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
 * Valida el código de campaña
 */
function validateCode(code: string): ValidationError | null {
  if (!/^[a-z0-9-]{3,32}$/i.test(code)) {
    return {
      field: "code",
      message: "Code must be 3-32 alphanumeric characters (including hyphens)",
    };
  }
  return null;
}

/**
 * Valida el array de payouts
 */
function validatePayouts(payouts: unknown): ValidationError | null {
  if (!Array.isArray(payouts)) {
    return { field: "payouts", message: "Payouts must be an array" };
  }
  if (payouts.length === 0) {
    return { field: "payouts", message: "Payouts array cannot be empty" };
  }
  
  // Validar estructura de cada payout
  for (let i = 0; i < payouts.length; i++) {
    const payout = payouts[i];
    if (!Array.isArray(payout) || payout.length !== 2) {
      return {
        field: "payouts",
        message: `Payout at index ${i} must be a tuple [wallet, amountMicros]`,
      };
    }
    if (typeof payout[0] !== "string" || typeof payout[1] !== "string") {
      return {
        field: "payouts",
        message: `Payout at index ${i} must have string values [wallet, amountMicros]`,
      };
    }
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
    // Verify authentication
    if (!checkAuth(request)) {
      return NextResponse.json(
        { ok: false, error: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    // Get code from URL
    const { code } = await params;

    // Validate code
    const codeError = validateCode(code);
    if (codeError) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", details: [codeError] },
        { status: 400 }
      );
    }

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
    
    const payoutsError = validatePayouts(body.payouts);
    if (payoutsError) errors.push(payoutsError);

    if (errors.length > 0) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", details: errors },
        { status: 400 }
      );
    }

    console.log(`🏁 Finalizing campaign: ${code}`);

    // 1. Verify that campaign exists
    const normalizedCode = code.toLowerCase();
    const campaign = await getCampaignByCode(normalizedCode);
    
    if (!campaign) {
      return NextResponse.json(
        {
          ok: false,
          error: "CAMPAIGN_NOT_FOUND",
          details: `Campaign with code ${code} not found`,
        },
        { status: 404 }
      );
    }

    console.log(`✅ Campaign found:`, { code: campaign.code, fqdn: campaign.fqdn });

    // 2. Normalizar payouts (lowercase, validar, ordenar)
    let normalized;
    try {
      normalized = normalizePayouts(body.payouts);
    } catch (error) {
      return NextResponse.json(
        {
          ok: false,
          error: "VALIDATION_ERROR",
          details: [{
            field: "payouts",
            message: error instanceof Error ? error.message : "Failed to normalize payouts",
          }],
        },
        { status: 400 }
      );
    }

    console.log(`✅ Payouts normalized:`, { count: normalized.length });

    // 3. Generar Merkle tree y root
    const { root: payoutRoot } = generatePayoutMerkleTree(normalized);
    console.log(`✅ Merkle root generated:`, { payoutRoot });

    // 4. Guardar payouts en Supabase
    const payoutsForDb = normalized.map((p) => ({
      wallet: p.wallet,
      amount_micros: p.amountMicros,
    }));

    await upsertPayouts(normalizedCode, payoutsForDb);
    console.log(`✅ Payouts saved to Supabase:`, { count: payoutsForDb.length });

    // 5. Escribir text records en ENS (on-chain)
    const ensResult = await finalizeCampaignOnEns({
      code,
      settlementTx: body.settlementTx,
      payoutRoot,
    });

    console.log(`✅ Text records written to ENS:`, {
      fqdn: ensResult.fqdn,
      txCount: ensResult.txHashes.length,
    });

    // 6. Update campaign in Supabase
    await updateCampaignFinalize(normalizedCode, {
      settlement_tx: body.settlementTx,
      payout_root: payoutRoot,
      status: "FINALIZED",
    });

    console.log(`✅ Campaign finalized in Supabase`);

    return NextResponse.json(
      {
        ok: true,
        code: normalizedCode,
        fqdn: ensResult.fqdn,
        node: ensResult.node,
        payoutRoot,
        txHashes: ensResult.txHashes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error finalizing campaign:", error);
    
    // Determinar tipo de error
    let errorMessage = "INTERNAL_ERROR";
    let errorDetails = "Unknown error occurred";
    
    if (error instanceof Error) {
      errorDetails = error.message;
      
      if (error.message.includes("ENS") || error.message.includes("transaction")) {
        errorMessage = "ENS_ERROR";
      } else if (error.message.includes("Supabase") || error.message.includes("database")) {
        errorMessage = "DATABASE_ERROR";
      } else if (error.message.includes("Merkle") || error.message.includes("payout")) {
        errorMessage = "PAYOUT_ERROR";
      }
    }
    
    return NextResponse.json(
      {
        ok: false,
        error: errorMessage,
        details: errorDetails,
      },
      { status: 500 }
    );
  }
}
