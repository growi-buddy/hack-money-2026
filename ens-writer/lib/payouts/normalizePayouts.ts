/**
 * Normalize Payouts
 * 
 * Normaliza y valida payouts para garantizar determinismo en el Merkle tree.
 * 
 * IMPORTANTE: El orden debe ser determinístico (sort lexicográfico por wallet)
 * para que el Merkle root sea reproducible.
 */

export interface NormalizedPayout {
  wallet: string; // lowercase, 0x + 40 hex
  amountMicros: string; // numeric string without decimals
}

/**
 * Validates that a wallet has the correct format
 */
function isValidWallet(wallet: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(wallet);
}

/**
 * Validates that amountMicros is a valid numeric string
 */
function isValidAmountMicros(amount: string): boolean {
  // Must be a numeric string without decimals or signs
  if (typeof amount !== "string") return false;
  if (amount.trim().length === 0) return false;
  if (!/^\d+$/.test(amount)) return false;
  
  // Validate that it can be converted to BigInt
  try {
    const bn = BigInt(amount);
    if (bn < BigInt(0)) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Normalizes an array of payouts
 * 
 * @param payouts - Array of tuples [wallet, amountMicros]
 * @returns Normalized and sorted array
 * @throws Error if validations fail
 */
export function normalizePayouts(
  payouts: Array<[string, string]>
): NormalizedPayout[] {
  // Validate that it's not empty
  if (!Array.isArray(payouts) || payouts.length === 0) {
    throw new Error("Payouts array cannot be empty");
  }

  const normalized: NormalizedPayout[] = [];
  const walletsSeen = new Set<string>();

  for (let i = 0; i < payouts.length; i++) {
    const [wallet, amountMicros] = payouts[i];

    // Validar formato de wallet
    if (!isValidWallet(wallet)) {
      throw new Error(
        `Invalid wallet address at index ${i}: ${wallet}. Must be 0x + 40 hex characters`
      );
    }

    // Normalize wallet to lowercase
    const normalizedWallet = wallet.toLowerCase();

    // Detect duplicates
    if (walletsSeen.has(normalizedWallet)) {
      throw new Error(
        `Duplicate wallet address: ${normalizedWallet} (at index ${i})`
      );
    }
    walletsSeen.add(normalizedWallet);

    // Validar amountMicros
    if (!isValidAmountMicros(amountMicros)) {
      throw new Error(
        `Invalid amountMicros at index ${i}: ${amountMicros}. Must be a positive numeric string`
      );
    }

    normalized.push({
      wallet: normalizedWallet,
      amountMicros,
    });
  }

  // Sort lexicographically by wallet for determinism
  normalized.sort((a, b) => a.wallet.localeCompare(b.wallet));

  return normalized;
}

/**
 * Convierte payouts normalizados a formato de tuplas para Merkle tree
 */
export function payoutsToMerkleValues(
  normalized: NormalizedPayout[]
): Array<[string, string]> {
  return normalized.map((p) => [p.wallet, p.amountMicros]);
}
