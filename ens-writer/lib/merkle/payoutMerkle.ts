/**
 * Payout Merkle Tree
 * 
 * Genera Merkle tree y root para payouts usando OpenZeppelin StandardMerkleTree.
 */

import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import type { NormalizedPayout } from "../payouts/normalizePayouts";

/**
 * Resultado de generar Merkle tree
 */
export interface MerkleTreeResult {
  root: string; // Merkle root (0x + 64 hex)
  tree: StandardMerkleTree<[string, string]>; // Tree completo (para generar proofs)
}

/**
 * Genera Merkle tree y root para payouts
 * 
 * @param payouts - Array de payouts normalizados
 * @returns { root, tree }
 * 
 * IMPORTANTE: Los payouts deben estar normalizados y ordenados antes de llamar
 * esta función para garantizar determinismo del root.
 */
export function generatePayoutMerkleTree(
  payouts: NormalizedPayout[]
): MerkleTreeResult {
  if (payouts.length === 0) {
    throw new Error("Cannot generate Merkle tree from empty payouts array");
  }

  // Convertir a formato de valores para Merkle tree
  // Cada elemento es [wallet, amountMicros]
  const values: Array<[string, string]> = payouts.map((p) => [
    p.wallet,
    p.amountMicros,
  ]);

  // Generar Merkle tree con tipos ["address", "uint256"]
  // OpenZeppelin usa estos tipos para encoding consistente
  const tree = StandardMerkleTree.of(values, ["address", "uint256"]);

  // Obtener root (0x + 64 hex)
  const root = tree.root;

  // Validar que el root tenga formato correcto
  if (!root.startsWith("0x") || root.length !== 66) {
    throw new Error(
      `Invalid Merkle root generated: ${root}. Expected 0x + 64 hex characters`
    );
  }

  return {
    root,
    tree,
  };
}

/**
 * Genera proof para una wallet específica
 * 
 * @param tree - Merkle tree generado
 * @param wallet - Wallet address (lowercase)
 * @param amountMicros - Amount en micros (string)
 * @returns Proof array (array de hashes)
 */
export function generateProof(
  tree: StandardMerkleTree<[string, string]>,
  wallet: string,
  amountMicros: string
): string[] {
  // Buscar el leaf correspondiente y generar proof
  for (const [i, v] of tree.entries()) {
    if (v[0] === wallet && v[1] === amountMicros) {
      return tree.getProof(i);
    }
  }

  throw new Error(`Wallet ${wallet} not found in Merkle tree`);
}

/**
 * Valida que un root tenga formato correcto
 */
export function isValidMerkleRoot(root: string): boolean {
  return /^0x[0-9a-fA-F]{64}$/.test(root);
}

/**
 * Reconstruye el árbol Merkle desde payouts normalizados
 * 
 * IMPORTANTE: Esta función debe usar la misma normalización y orden
 * que se usó en finalize para garantizar que el root coincida.
 * 
 * @param payouts - Array de payouts normalizados (ya ordenados)
 * @returns StandardMerkleTree
 */
export function buildTreeFromPayouts(
  payouts: NormalizedPayout[]
): StandardMerkleTree<[string, string]> {
  if (payouts.length === 0) {
    throw new Error("Cannot build Merkle tree from empty payouts array");
  }

  // Convertir a formato de valores para Merkle tree
  const values: Array<[string, string]> = payouts.map((p) => [
    p.wallet,
    p.amountMicros,
  ]);

  // Generar Merkle tree con tipos ["address", "uint256"]
  const tree = StandardMerkleTree.of(values, ["address", "uint256"]);

  return tree;
}

/**
 * Genera proof para una wallet específica desde payouts completos
 * 
 * Reconstruye el árbol y genera la proof en un solo paso.
 * 
 * @param payouts - Array completo de payouts normalizados
 * @param wallet - Wallet para la que se genera proof (lowercase)
 * @returns { proof, amountMicros, root }
 */
export function generateProofForWallet(
  payouts: NormalizedPayout[],
  wallet: string
): { proof: string[]; amountMicros: string; root: string } {
  // Build tree
  const tree = buildTreeFromPayouts(payouts);

  // Find wallet in the tree
  for (const [i, v] of tree.entries()) {
    if (v[0] === wallet) {
      return {
        proof: tree.getProof(i),
        amountMicros: v[1],
        root: tree.root,
      };
    }
  }

  throw new Error(`Wallet ${wallet} not found in payouts`);
}
