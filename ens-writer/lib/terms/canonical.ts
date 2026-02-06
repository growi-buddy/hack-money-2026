/**
 * Canonical Terms Generator
 * 
 * Genera un objeto terms.json canonical con orden fijo de keys
 * y calcula el keccak256 hash del JSON serializado.
 */

import { keccak256, toBytes } from "viem";

/**
 * Metadata de campaña (input del usuario)
 */
export interface CampaignMetadata {
  campaignId: string;
  campaignName: string;
  description: string;
  startDate: number; // Unix timestamp
  endDate: number; // Unix timestamp
  campaignManager: string; // Wallet address
  yellowChannelId?: string;
}

/**
 * Estructura canonical de terms.json
 * 
 * IMPORTANTE: El orden de las keys DEBE mantenerse fijo
 * para que el hash sea reproducible.
 */
export interface CanonicalTerms {
  version: string;
  campaignId: string;
  campaignName: string;
  description: string;
  startDate: number;
  endDate: number;
  campaignManager: string;
  yellowChannelId: string | null;
  createdAt: number; // Timestamp de creación del terms.json
}

/**
 * Genera el objeto canonical terms desde metadata
 */
export function generateCanonicalTerms(
  metadata: CampaignMetadata
): CanonicalTerms {
  // Normalizar wallet a lowercase
  const normalizedManager = metadata.campaignManager.toLowerCase();

  return {
    version: "1.0",
    campaignId: metadata.campaignId,
    campaignName: metadata.campaignName,
    description: metadata.description,
    startDate: metadata.startDate,
    endDate: metadata.endDate,
    campaignManager: normalizedManager,
    yellowChannelId: metadata.yellowChannelId || null,
    createdAt: Math.floor(Date.now() / 1000), // Unix timestamp
  };
}

/**
 * Serializa el objeto canonical a JSON string (sin espacios)
 * 
 * IMPORTANTE: Usar JSON.stringify sin espacios para que el hash
 * sea reproducible. El orden de keys está garantizado por el
 * objeto CanonicalTerms.
 */
export function serializeCanonicalTerms(terms: CanonicalTerms): string {
  return JSON.stringify(terms);
}

/**
 * Calcula el keccak256 hash del JSON serializado
 * 
 * @returns Hash en formato 0x... (66 caracteres: 0x + 64 hex)
 */
export function calculateTermsHash(serializedJson: string): `0x${string}` {
  const bytes = toBytes(serializedJson);
  const hash = keccak256(bytes);
  return hash;
}

/**
 * Genera terms canonical + hash en un solo paso
 * 
 * @returns { terms, serialized, hash }
 */
export function generateTermsWithHash(metadata: CampaignMetadata): {
  terms: CanonicalTerms;
  serialized: string;
  hash: `0x${string}`;
} {
  const terms = generateCanonicalTerms(metadata);
  const serialized = serializeCanonicalTerms(terms);
  const hash = calculateTermsHash(serialized);

  return { terms, serialized, hash };
}

/**
 * Valida que un hash sea válido (0x + 64 hex = 66 chars)
 */
export function isValidTermsHash(hash: string): boolean {
  return /^0x[0-9a-fA-F]{64}$/.test(hash);
}
