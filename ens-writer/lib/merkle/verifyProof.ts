/**
 * Merkle Proof Verification (Client-Side)
 * 
 * Verifica una proof de Merkle tree sin necesidad de tener todos los payouts.
 * Compatible con OpenZeppelin StandardMerkleTree.
 */

import { keccak256, encodePacked, encodeAbiParameters, parseAbiParameters } from "viem";

/**
 * Calcula el leaf hash para StandardMerkleTree
 * 
 * StandardMerkleTree usa doble hash:
 * leaf = keccak256(bytes.concat(keccak256(abi.encode(address, uint256))))
 * 
 * @param wallet - Wallet address (lowercase, 0x...)
 * @param amountMicros - Amount en micros (string)
 * @returns Leaf hash (0x...)
 */
function standardLeafHash(wallet: string, amountMicros: string): `0x${string}` {
  // 1. ABI encode (address, uint256)
  const encoded = encodeAbiParameters(
    parseAbiParameters("address, uint256"),
    [wallet as `0x${string}`, BigInt(amountMicros)]
  );

  // 2. Primera hash
  const firstHash = keccak256(encoded);

  // 3. Segunda hash (double hashing)
  const leafHash = keccak256(firstHash);

  return leafHash;
}

/**
 * Combina dos hashes en orden sorted (menor primero)
 * 
 * OpenZeppelin MerkleProof usa "sorted pairs" para evitar
 * second preimage attacks.
 * 
 * @param a - Hash A
 * @param b - Hash B
 * @returns Hash combinado
 */
function hashPair(a: `0x${string}`, b: `0x${string}`): `0x${string}` {
  // Compare lexicographically and sort
  const sorted = a < b ? ([a, b] as const) : ([b, a] as const);

  // Concatenate and hash
  return keccak256(encodePacked(["bytes32", "bytes32"], sorted));
}

/**
 * Verifica una proof de Merkle tree
 * 
 * @param params - Parámetros de verificación
 * @returns true si la proof es válida
 */
export function verifyPayoutProof(params: {
  root: string;
  wallet: string;
  amountMicros: string;
  proof: string[];
}): boolean {
  const { root, wallet, amountMicros, proof } = params;

  try {
    // Validar inputs
    if (!root.startsWith("0x") || root.length !== 66) {
      throw new Error("Invalid root format");
    }
    if (!wallet.startsWith("0x") || wallet.length !== 42) {
      throw new Error("Invalid wallet format");
    }

    // Normalizar wallet a lowercase
    const normalizedWallet = wallet.toLowerCase() as `0x${string}`;

    // 1. Calcular leaf hash
    let computed = standardLeafHash(normalizedWallet, amountMicros);

    // 2. Process proof (climb up the tree)
    for (const proofElement of proof) {
      computed = hashPair(computed, proofElement as `0x${string}`);
    }

    // 3. Comparar con root
    return computed.toLowerCase() === root.toLowerCase();
  } catch (error) {
    console.error("Error verifying proof:", error);
    return false;
  }
}

/**
 * Verifica una proof y devuelve resultado detallado
 */
export function verifyPayoutProofDetailed(params: {
  root: string;
  wallet: string;
  amountMicros: string;
  proof: string[];
}): {
  valid: boolean;
  computedRoot: string;
  expectedRoot: string;
  leafHash: string;
  steps: string[];
} {
  const { root, wallet, amountMicros, proof } = params;

  // Normalizar wallet a lowercase
  const normalizedWallet = wallet.toLowerCase() as `0x${string}`;

  // Calcular leaf hash
  const leafHash = standardLeafHash(normalizedWallet, amountMicros);
  let computed = leafHash;

  const steps: string[] = [computed];

  // Procesar proof
  for (const proofElement of proof) {
    computed = hashPair(computed, proofElement as `0x${string}`);
    steps.push(computed);
  }

  return {
    valid: computed.toLowerCase() === root.toLowerCase(),
    computedRoot: computed,
    expectedRoot: root,
    leafHash,
    steps,
  };
}
