/**
 * Campaign Repository (Server-Only)
 * 
 * CRUD operations para la tabla campaigns.
 * Solo usar en backend (Route Handlers, Server Actions).
 */

import "server-only";
import { supabaseAdmin } from "@/app/lib/supabase/admin";
import type {
  CampaignRow,
  CreateCampaignInput,
  UpdateCampaignFinalizeInput,
} from "./types";

/**
 * Normaliza wallet address a lowercase
 */
function normalizeWallet(wallet: string | null | undefined): string | null {
  if (!wallet) return null;
  return wallet.toLowerCase();
}

/**
 * Crear o actualizar una campaña
 */
export async function upsertCampaign(
  input: CreateCampaignInput
): Promise<CampaignRow> {
  const { data, error } = await supabaseAdmin
    .from("campaigns")
    .upsert(
      {
        code: input.code,
        ens_root_name: input.ens_root_name,
        fqdn: input.fqdn,
        node: input.node,
        owner_wallet: normalizeWallet(input.owner_wallet),
        yellow_channel_id: input.yellow_channel_id ?? null,
        terms_uri: input.terms_uri,
        terms_hash: input.terms_hash,
        status: input.status ?? "ACTIVE",
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "code",
      }
    )
    .select()
    .single();

  if (error) {
    console.error("[campaignRepo] upsertCampaign error:", error);
    throw new Error(`Failed to upsert campaign: ${error.message}`);
  }

  return data;
}

/**
 * Obtener campaña por código
 */
export async function getCampaignByCode(
  code: string
): Promise<CampaignRow | null> {
  const { data, error } = await supabaseAdmin
    .from("campaigns")
    .select("*")
    .eq("code", code)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No rows returned
      return null;
    }
    console.error("[campaignRepo] getCampaignByCode error:", error);
    throw new Error(`Failed to get campaign: ${error.message}`);
  }

  return data;
}

/**
 * Actualizar campaña al finalizar (settlement)
 */
export async function updateCampaignFinalize(
  code: string,
  input: UpdateCampaignFinalizeInput
): Promise<CampaignRow> {
  const { data, error } = await supabaseAdmin
    .from("campaigns")
    .update({
      settlement_tx: input.settlement_tx,
      payout_root: input.payout_root,
      status: input.status,
      updated_at: new Date().toISOString(),
    })
    .eq("code", code)
    .select()
    .single();

  if (error) {
    console.error("[campaignRepo] updateCampaignFinalize error:", error);
    throw new Error(`Failed to finalize campaign: ${error.message}`);
  }

  return data;
}

/**
 * Listar campañas por owner wallet
 */
export async function listCampaignsByOwner(
  ownerWallet: string
): Promise<CampaignRow[]> {
  const normalizedWallet = normalizeWallet(ownerWallet);
  if (!normalizedWallet) {
    return [];
  }

  const { data, error } = await supabaseAdmin
    .from("campaigns")
    .select("*")
    .eq("owner_wallet", normalizedWallet)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[campaignRepo] listCampaignsByOwner error:", error);
    throw new Error(`Failed to list campaigns: ${error.message}`);
  }

  return data || [];
}

/**
 * Listar todas las campañas (con paginación opcional)
 */
export async function listAllCampaigns(
  limit: number = 50,
  offset: number = 0
): Promise<CampaignRow[]> {
  const { data, error } = await supabaseAdmin
    .from("campaigns")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("[campaignRepo] listAllCampaigns error:", error);
    throw new Error(`Failed to list all campaigns: ${error.message}`);
  }

  return data || [];
}
