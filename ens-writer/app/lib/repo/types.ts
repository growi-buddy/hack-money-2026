/**
 * Types para repositorios de Supabase
 * 
 * Representan las tablas de la base de datos.
 * Usar solo en backend (Route Handlers, Server Actions).
 */

// ============================================================================
// Campaigns
// ============================================================================

export type CampaignStatus = "ACTIVE" | "FINALIZED" | "SETTLED";

export interface CampaignRow {
  code: string;
  ens_root_name: string;
  fqdn: string;
  node: string;
  owner_wallet: string | null;
  yellow_channel_id: string | null;
  terms_uri: string;
  terms_hash: string;
  settlement_tx: string | null;
  payout_root: string | null;
  status: CampaignStatus;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface CreateCampaignInput {
  code: string;
  ens_root_name: string;
  fqdn: string;
  node: string;
  owner_wallet?: string | null;
  yellow_channel_id?: string | null;
  terms_uri: string;
  terms_hash: string;
  status?: CampaignStatus;
}

export interface UpdateCampaignFinalizeInput {
  settlement_tx: string;
  payout_root: string;
  status: CampaignStatus;
}

// ============================================================================
// Payouts
// ============================================================================

export interface PayoutRow {
  id: string; // UUID
  campaign_code: string;
  wallet: string; // lowercase
  amount_micros: string; // numeric as string
  created_at: string; // ISO timestamp
}

export interface CreatePayoutInput {
  wallet: string;
  amount_micros: string; // string para evitar problemas con BigInt/numeric
}

// ============================================================================
// Auth Nonces
// ============================================================================

export interface AuthNonceRow {
  wallet: string; // lowercase
  nonce: string;
  expires_at: string; // ISO timestamp
  created_at: string; // ISO timestamp
}

// ============================================================================
// Wallet Sessions
// ============================================================================

export interface WalletSessionRow {
  session_id: string;
  wallet: string; // lowercase
  expires_at: string; // ISO timestamp
  created_at: string; // ISO timestamp
}
