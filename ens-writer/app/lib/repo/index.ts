/**
 * Repository Layer - Barrel Export
 * 
 * Exporta todos los repositorios y types para importación centralizada.
 * 
 * Uso:
 * import { upsertCampaign, getCampaignByCode } from "@/app/lib/repo";
 */

// Types
export type * from "./types";

// Campaign Repository
export {
  upsertCampaign,
  getCampaignByCode,
  updateCampaignFinalize,
  listCampaignsByOwner,
  listAllCampaigns,
} from "./campaignRepo";

// Payout Repository
export {
  upsertPayouts,
  getPayoutsByCampaign,
  getPayoutsByWallet,
  getPayoutByCampaignAndWallet,
  countPayoutsByCampaign,
  getTotalPayoutMicrosByCampaign,
} from "./payoutRepo";

// Auth Repository
export {
  createNonce,
  consumeNonce,
  cleanupExpiredNonces,
  createSession,
  getSession,
  validateSession,
  destroySession,
  destroyAllSessionsForWallet,
  cleanupExpiredSessions,
} from "./authRepo";
