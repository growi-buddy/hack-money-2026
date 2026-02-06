/**
 * Pinata Upload Functions
 * 
 * Funciones para subir JSON a IPFS via Pinata.
 */

import { pinata } from "./client";
import type { CanonicalTerms } from "../terms/canonical";

/**
 * Resultado de upload a Pinata
 */
export interface PinataUploadResult {
  ipfsHash: string; // CID del archivo en IPFS
  ipfsUri: string; // URI completa: ipfs://CID
  pinataUrl: string; // URL de Pinata gateway
}

/**
 * Sube un objeto JSON a Pinata
 * 
 * @param data - Objeto a subir (será serializado a JSON)
 * @param name - Nombre del archivo (metadata)
 * @returns { ipfsHash, ipfsUri, pinataUrl }
 */
export async function uploadJsonToPinata(
  data: CanonicalTerms,
  name: string
): Promise<PinataUploadResult> {
  try {
    console.log(`📤 Uploading JSON to Pinata: ${name}`);

    // Subir JSON a Pinata usando la API correcta
    const result = await pinata.upload.public.json(data, {
      metadata: {
        name,
      },
    });

    const ipfsHash = result.cid;
    const ipfsUri = `ipfs://${ipfsHash}`;
    const pinataUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

    console.log(`✅ JSON uploaded to Pinata:`, {
      ipfsHash,
      ipfsUri,
      pinataUrl,
    });

    return {
      ipfsHash,
      ipfsUri,
      pinataUrl,
    };
  } catch (error) {
    console.error("[Pinata] Upload error:", error);
    throw new Error(
      `Failed to upload to Pinata: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Sube terms.json canonical a Pinata
 * 
 * Conveniencia wrapper para uploadJsonToPinata con naming específico.
 */
export async function uploadTermsJson(
  terms: CanonicalTerms,
  campaignCode: string
): Promise<PinataUploadResult> {
  const name = `terms-${campaignCode}.json`;
  return uploadJsonToPinata(terms, name);
}
