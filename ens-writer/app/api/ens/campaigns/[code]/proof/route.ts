/**
 * Proof Generation Endpoint
 * 
 * Genera Merkle proof on-demand para una wallet específica.
 * NO guarda proofs en base de datos.
 * 
 * GET /api/ens/campaigns/:code/proof?wallet=0x...
 */

import { NextRequest, NextResponse } from "next/server";
import { getCampaignByCode, getPayoutsByCampaign } from "@/app/lib/repo";
import { normalizePayouts } from "@/lib/payouts/normalizePayouts";
import { generateProofForWallet } from "@/lib/merkle/payoutMerkle";

interface RouteContext {
  params: Promise<{
    code: string;
  }>;
}

/**
 * Valida formato de wallet address
 */
function isValidWallet(wallet: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(wallet);
}

/**
 * GET /api/ens/campaigns/:code/proof?wallet=0x...
 * 
 * Genera proof para una wallet específica en una campaña.
 */
export async function GET(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  try {
    // Get code from URL
    const { code } = await context.params;
    const normalizedCode = code.toLowerCase();

    // Get wallet from query string
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet");

    // Validate that wallet is present
    if (!wallet) {
      return NextResponse.json(
        {
          ok: false,
          error: "VALIDATION_ERROR",
          details: "Missing required query parameter: wallet",
        },
        { status: 400 }
      );
    }

    // Validar formato de wallet
    if (!isValidWallet(wallet)) {
      return NextResponse.json(
        {
          ok: false,
          error: "VALIDATION_ERROR",
          details: "Invalid wallet address format. Must be 0x + 40 hex characters",
        },
        { status: 400 }
      );
    }

    // Normalize wallet to lowercase
    const normalizedWallet = wallet.toLowerCase();

    console.log(`🔍 Generating proof for:`, {
      code: normalizedCode,
      wallet: normalizedWallet,
    });

    // 1. Verify that campaign exists
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

    // Validate that campaign is finalized
    if (!campaign.payout_root) {
      return NextResponse.json(
        {
          ok: false,
          error: "CAMPAIGN_NOT_FINALIZED",
          details: "Campaign has not been finalized yet. Cannot generate proof.",
        },
        { status: 400 }
      );
    }

    console.log(`✅ Campaign found:`, {
      code: campaign.code,
      fqdn: campaign.fqdn,
      payoutRoot: campaign.payout_root,
    });

    // 2. Load all payouts for the campaign
    const payouts = await getPayoutsByCampaign(normalizedCode);

    if (payouts.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "NO_PAYOUTS",
          details: "Campaign has no payouts",
        },
        { status: 404 }
      );
    }

    console.log(`✅ Payouts loaded:`, { count: payouts.length });

    // 3. Normalizar payouts (mismo orden que finalize)
    // IMPORTANTE: Convertir amount_micros a string (viene como number de Supabase)
    const payoutTuples: Array<[string, string]> = payouts.map((p) => [
      p.wallet,
      String(p.amount_micros),
    ]);

    const normalized = normalizePayouts(payoutTuples);

    console.log(`✅ Payouts normalized and sorted`);

    // 4. Generate proof for the specific wallet
    let proofResult;
    try {
      proofResult = generateProofForWallet(normalized, normalizedWallet);
    } catch (error) {
      console.error(`❌ Wallet not found in payouts:`, normalizedWallet);
      return NextResponse.json(
        {
          ok: false,
          error: "PAYOUT_NOT_FOUND",
          details: `No payout found for wallet ${wallet} in campaign ${code}`,
        },
        { status: 404 }
      );
    }

    console.log(`✅ Proof generated:`, {
      wallet: normalizedWallet,
      amountMicros: proofResult.amountMicros,
      proofLength: proofResult.proof.length,
      root: proofResult.root,
    });

    // 5. Verificar consistencia con DB
    if (proofResult.root !== campaign.payout_root) {
      console.error(`⚠️ INCONSISTENT ROOT:`, {
        computed: proofResult.root,
        stored: campaign.payout_root,
      });
      return NextResponse.json(
        {
          ok: false,
          error: "INCONSISTENT_ROOT",
          details:
            "Computed Merkle root does not match stored root. Data may be corrupted.",
          computed: proofResult.root,
          stored: campaign.payout_root,
        },
        { status: 500 }
      );
    }

    // 6. Devolver proof
    return NextResponse.json({
      ok: true,
      code: normalizedCode,
      fqdn: campaign.fqdn,
      wallet: normalizedWallet,
      amountMicros: proofResult.amountMicros,
      payoutRoot: proofResult.root,
      proof: proofResult.proof,
    });
  } catch (error) {
    console.error("❌ Error generating proof:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "INTERNAL_ERROR",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
