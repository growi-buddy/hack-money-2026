/**
 * Payout Repository (Server-Only)
 * 
 * CRUD operations para la tabla campaign_payouts.
 * Solo usar en backend (Route Handlers, Server Actions).
 */

import "server-only";
import { supabaseAdmin } from "@/app/lib/supabase/admin";
import type { PayoutRow, CreatePayoutInput } from "./types";

/**
 * Normaliza wallet address a lowercase
 */
function normalizeWallet(wallet: string): string {
  return wallet.toLowerCase();
}

/**
 * Insertar o actualizar múltiples payouts para una campaña
 * 
 * Usa upsert para evitar duplicados (constraint: campaign_code + wallet unique).
 */
export async function upsertPayouts(
  campaignCode: string,
  payouts: CreatePayoutInput[]
): Promise<PayoutRow[]> {
  if (payouts.length === 0) {
    return [];
  }

  // Normalizar wallets y preparar datos
  const rows = payouts.map((p) => ({
    campaign_code: campaignCode,
    wallet: normalizeWallet(p.wallet),
    amount_micros: p.amount_micros,
  }));

  const { data, error } = await supabaseAdmin
    .from("campaign_payouts")
    .upsert(rows, {
      onConflict: "campaign_code,wallet",
      ignoreDuplicates: false, // Actualizar si ya existe
    })
    .select();

  if (error) {
    console.error("[payoutRepo] upsertPayouts error:", error);
    throw new Error(`Failed to upsert payouts: ${error.message}`);
  }

  return data || [];
}

/**
 * Obtener todos los payouts de una campaña
 */
export async function getPayoutsByCampaign(
  campaignCode: string
): Promise<PayoutRow[]> {
  const { data, error } = await supabaseAdmin
    .from("campaign_payouts")
    .select("*")
    .eq("campaign_code", campaignCode)
    .order("wallet", { ascending: true });

  if (error) {
    console.error("[payoutRepo] getPayoutsByCampaign error:", error);
    throw new Error(`Failed to get payouts: ${error.message}`);
  }

  return data || [];
}

/**
 * Obtener payouts por wallet (todas las campañas)
 */
export async function getPayoutsByWallet(wallet: string): Promise<PayoutRow[]> {
  const normalizedWallet = normalizeWallet(wallet);

  const { data, error } = await supabaseAdmin
    .from("campaign_payouts")
    .select("*")
    .eq("wallet", normalizedWallet)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[payoutRepo] getPayoutsByWallet error:", error);
    throw new Error(`Failed to get payouts by wallet: ${error.message}`);
  }

  return data || [];
}

/**
 * Obtener un payout específico
 */
export async function getPayoutByCampaignAndWallet(
  campaignCode: string,
  wallet: string
): Promise<PayoutRow | null> {
  const normalizedWallet = normalizeWallet(wallet);

  const { data, error } = await supabaseAdmin
    .from("campaign_payouts")
    .select("*")
    .eq("campaign_code", campaignCode)
    .eq("wallet", normalizedWallet)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No rows returned
      return null;
    }
    console.error("[payoutRepo] getPayoutByCampaignAndWallet error:", error);
    throw new Error(`Failed to get payout: ${error.message}`);
  }

  return data;
}

/**
 * Contar payouts de una campaña
 */
export async function countPayoutsByCampaign(
  campaignCode: string
): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from("campaign_payouts")
    .select("*", { count: "exact", head: true })
    .eq("campaign_code", campaignCode);

  if (error) {
    console.error("[payoutRepo] countPayoutsByCampaign error:", error);
    throw new Error(`Failed to count payouts: ${error.message}`);
  }

  return count || 0;
}

/**
 * Calcular total de micros distribuidos en una campaña
 */
export async function getTotalPayoutMicrosByCampaign(
  campaignCode: string
): Promise<string> {
  const { data, error } = await supabaseAdmin.rpc(
    "sum_campaign_payouts_micros",
    {
      p_campaign_code: campaignCode,
    }
  );

  if (error) {
    // If RPC function doesn't exist, calculate manually
    console.warn(
      "[payoutRepo] RPC function not found, calculating manually:",
      error
    );
    const payouts = await getPayoutsByCampaign(campaignCode);
    const total = payouts.reduce(
      (sum, p) => sum + BigInt(p.amount_micros),
      BigInt(0)
    );
    return total.toString();
  }

  return data?.toString() || "0";
}
