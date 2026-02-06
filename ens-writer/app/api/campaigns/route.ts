/**
 * Campaigns List Endpoint
 * 
 * Lista campañas asociadas a una wallet (como manager o como beneficiario).
 * 
 * GET /api/campaigns?wallet=0x...
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase/admin";

/**
 * Valida formato de wallet address
 */
function isValidWallet(wallet: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(wallet);
}

/**
 * GET /api/campaigns?wallet=0x...
 * 
 * Lista campañas donde la wallet es manager o beneficiario.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Obtener wallet de query string
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

    console.log(`📋 Listing campaigns for wallet:`, normalizedWallet);

    // Query 1: Campaigns where user is owner/manager
    const { data: ownedCampaigns, error: ownedError } = await supabaseAdmin
      .from("campaigns")
      .select("*")
      .eq("owner_wallet", normalizedWallet)
      .order("created_at", { ascending: false });

    if (ownedError) {
      console.error("[campaigns] Error fetching owned campaigns:", ownedError);
      throw new Error(`Failed to fetch owned campaigns: ${ownedError.message}`);
    }

    // Query 2: Campaigns where user has a payout
    const { data: payoutCampaigns, error: payoutError } = await supabaseAdmin
      .from("campaign_payouts")
      .select("campaign_code")
      .eq("wallet", normalizedWallet);

    if (payoutError) {
      console.error("[campaigns] Error fetching payout campaigns:", payoutError);
      throw new Error(`Failed to fetch payout campaigns: ${payoutError.message}`);
    }

    // Get unique codes of campaigns with payouts
    const payoutCodes = new Set(
      payoutCampaigns?.map((p) => p.campaign_code) || []
    );

    // Query 3: Load details of campaigns with payouts (if not already in owned)
    const ownedCodes = new Set(ownedCampaigns?.map((c) => c.code) || []);
    const additionalCodes = Array.from(payoutCodes).filter(
      (code) => !ownedCodes.has(code)
    );

    let additionalCampaigns: any[] = [];
    if (additionalCodes.length > 0) {
      const { data, error } = await supabaseAdmin
        .from("campaigns")
        .select("*")
        .in("code", additionalCodes)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("[campaigns] Error fetching additional campaigns:", error);
      } else {
        additionalCampaigns = data || [];
      }
    }

    // Combinar y eliminar duplicados
    const allCampaigns = [...(ownedCampaigns || []), ...additionalCampaigns];

    // Agregar flag de rol
    const campaignsWithRole = allCampaigns.map((campaign) => ({
      ...campaign,
      role: ownedCodes.has(campaign.code)
        ? "manager"
        : payoutCodes.has(campaign.code)
          ? "beneficiary"
          : "unknown",
    }));

    console.log(`✅ Found ${campaignsWithRole.length} campaigns`);

    return NextResponse.json({
      ok: true,
      wallet: normalizedWallet,
      campaigns: campaignsWithRole,
      count: campaignsWithRole.length,
    });
  } catch (error) {
    console.error("❌ Error listing campaigns:", error);

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
