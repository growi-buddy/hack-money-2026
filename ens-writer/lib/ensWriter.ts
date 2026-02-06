/**
 * ENS Writer - crear y finalizar campañas en ENS
 */

import { ensureCampaignSubname } from "./ens/subnames";
import { ensureResolver, setTextRecords, TextRecord } from "./ens/resolver";

export interface CreateCampaignInput {
  code: string;
  termsURI: string;
  termsHash: string;
  yellowChannelId?: string;
}

export interface FinalizeCampaignInput {
  code: string;
  settlementTx: string;
  payoutRoot: string;
}

export interface CampaignResult {
  fqdn: string;
  node: `0x${string}`;
  txHashes: `0x${string}`[];
}

/**
 * Crea una campaña en ENS creando un subdominio wrapped y escribiendo text records.
 * Por ejemplo: sd5sx.growi.eth
 *
 * @returns { fqdn, node, txHashes } - Nombre completo, node hash y transacciones
 */
export async function createCampaignOnEns(
  input: CreateCampaignInput
): Promise<CampaignResult> {
  console.log("🚀 Creating campaign on ENS:", {
    code: input.code,
    termsURI: input.termsURI,
    termsHash: input.termsHash,
    yellowChannelId: input.yellowChannelId,
  });

  const txHashes: `0x${string}`[] = [];

  // 1. Crear subdominio wrapped con NameWrapper
  const { fqdn, node } = await ensureCampaignSubname({
    code: input.code,
  });

  console.log("✅ Campaign subname ensured:", { fqdn, node });

  // 2. Asegurar que tenga el resolver correcto
  const resolverTxHash = await ensureResolver(node);
  if (resolverTxHash) {
    txHashes.push(resolverTxHash);
  }

  // 3. Escribir text records
  const records: TextRecord[] = [
    { key: "growi:termsURI", value: input.termsURI },
    { key: "growi:termsHash", value: input.termsHash },
  ];

  if (input.yellowChannelId) {
    records.push({ key: "growi:yellowChannelId", value: input.yellowChannelId });
  }

  const textTxHashes = await setTextRecords(node, records);
  txHashes.push(...textTxHashes);

  console.log("✅ Campaign created on ENS:", { fqdn, node, txCount: txHashes.length });

  return { fqdn, node, txHashes };
}

/**
 * Finaliza una campaña escribiendo settlement y payout records.
 * El subdominio ya debe existir (creado por createCampaignOnEns).
 *
 * @returns { fqdn, node, txHashes } - Nombre completo, node hash y transacciones
 */
export async function finalizeCampaignOnEns(
  input: FinalizeCampaignInput
): Promise<CampaignResult> {
  console.log("🏁 Finalizing campaign on ENS:", input);

  const txHashes: `0x${string}`[] = [];

  // 1. Obtener info del subdominio (debe existir ya)
  const { fqdn, node } = await ensureCampaignSubname({
    code: input.code,
  });

  console.log("✅ Campaign subname found:", { fqdn, node });

  // 2. Asegurar que tenga el resolver correcto
  const resolverTxHash = await ensureResolver(node);
  if (resolverTxHash) {
    txHashes.push(resolverTxHash);
  }

  // 3. Escribir text records de finalización
  const records: TextRecord[] = [
    { key: "growi:settlementTx", value: input.settlementTx },
    { key: "growi:payoutRoot", value: input.payoutRoot },
  ];

  const textTxHashes = await setTextRecords(node, records);
  txHashes.push(...textTxHashes);

  console.log("✅ Campaign finalized on ENS:", { fqdn, node, txCount: txHashes.length });

  return { fqdn, node, txHashes };
}
