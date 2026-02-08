/**
 * App Session State Hashing
 * Genera hashes para estados de App Session siguiendo formato Yellow
 */

import { encodeAbiParameters, keccak256, parseAbiParameters } from 'viem';
import type { AppDefinition, Allocation } from './types';

/**
 * Estado de App Session para firmar
 */
export interface AppStateToHash {
  appSessionId: string;
  version: number;
  intent: string; // 'OPERATE' | 'WITHDRAW' | 'DEPOSIT'
  allocations: Allocation[];
}

/**
 * Calcula el ID determinístico de una App Session
 * Basado en AppDefinition (similar a calculateChannelId para channels)
 */
export function calculateAppSessionId(definition: AppDefinition): string {
  const packed = encodeAbiParameters(
    parseAbiParameters('string, address[], uint256[], uint256, uint256, uint256'),
    [
      definition.protocol,
      definition.participants,
      definition.weights.map(w => BigInt(w)),
      BigInt(definition.quorum),
      BigInt(definition.challenge),
      BigInt(definition.nonce),
    ]
  );

  return keccak256(packed);
}

/**
 * Hash del estado de App Session para firmar
 * 
 * Formato tentativo (puede requerir ajustes según implementación de Yellow):
 * keccak256(abi.encode(
 *   appSessionId,
 *   version,
 *   intent,
 *   allocations[]
 * ))
 */
export function hashAppState(state: AppStateToHash): `0x${string}` {
  // Encode allocations
  const allocationsEncoded = encodeAbiParameters(
    parseAbiParameters('(address participant, uint256 amount)[]'),
    [
      state.allocations.map(a => ({
        participant: a.participant,
        amount: BigInt(a.amount),
      })),
    ]
  );

  // Pack completo del estado
  const packed = encodeAbiParameters(
    parseAbiParameters('bytes32, uint256, string, bytes'),
    [
      state.appSessionId as `0x${string}`, // Asumir que es bytes32
      BigInt(state.version),
      state.intent,
      allocationsEncoded,
    ]
  );

  return keccak256(packed);
}

/**
 * Ordena firmas según el orden de participants
 * Similar a orderSignatures de channels
 */
export function orderAppSessionSignatures(
  participants: `0x${string}`[],
  signatures: Record<string, `0x${string}`>
): `0x${string}`[] {
  return participants.map(addr => {
    const addrLower = addr.toLowerCase();
    const sig = signatures[addrLower];
    return sig || '0x'; // Si no hay firma, usar '0x'
  });
}
